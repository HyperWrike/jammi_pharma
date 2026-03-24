import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { createHmac } from 'crypto';
import { Resend } from 'resend';
import { supabaseAdmin } from '../../../lib/supabase';
import { rateLimit, getClientIp } from '../../../lib/rateLimit';
import { OrderConfirmationEmail } from '../../../components/emails/OrderConfirmationEmail';
import { OrderConfirmationInternal } from '../../../components/emails/OrderConfirmationInternal';
import { generateCustomerId } from '../../../lib/customers';

// Lazy initialization — avoids build failures when RESEND_API_KEY is not set
function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

// ── Signature verification ─────────────────────────────────────────────────
function verifyRazorpaySignature(body: string, signature: string | null, secret: string): boolean {
  if (!signature || !secret) return false;
  const expectedSignature = createHmac('sha256', secret).update(body).digest('hex');
  return expectedSignature === signature;
}

// ── Normalize items from Supabase JSON ────────────────────────────────────
function normalizeItems(raw: any[]): { name: string; quantity: number; price: number }[] {
  return (raw || []).map((item: any) => ({
    name: item.name || item.productName || 'Product',
    quantity: Number(item.quantity) || 1,
    price: Number(item.price) || 0,
  }));
}

// ── Format address object or string ───────────────────────────────────────
function formatAddress(addr: any): string {
  if (typeof addr === 'string') return addr;
  if (!addr) return '';
  return [addr.address || addr.line1, addr.city, addr.state, addr.pincode || addr.postal_code]
    .filter(Boolean)
    .join(', ');
}

export async function POST(req: NextRequest) {
  // ── Rate Limiting: 30 requests per minute per IP ───────────────────────
  const ip = getClientIp(req);
  const { allowed } = rateLimit(`razorpay-webhook:${ip}`, 30, 60_000);

  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  // ── Read raw body for signature verification ───────────────────────────
  const body = await req.text();
  const signature = req.headers.get('x-razorpay-signature');
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || '';

  // ── Verify signature (skip in dev if secret not yet set) ──────────────
  if (webhookSecret) {
    const isValid = verifyRazorpaySignature(body, signature, webhookSecret);
    if (!isValid) {
      console.error('[razorpay-webhook] Invalid signature');
      return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
    }
  } else {
    console.warn('[razorpay-webhook] RAZORPAY_WEBHOOK_SECRET not set — skipping signature check');
  }

  let event: any;
  try {
    event = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
  }

  console.log(`[razorpay-webhook] Event received: ${event.event}`);

  // ── payment.captured — SUCCESS ─────────────────────────────────────────
  if (event.event === 'payment.captured') {
    const payment = event.payload?.payment?.entity;
    if (!payment) {
      return NextResponse.json({ error: 'Missing payment entity' }, { status: 400 });
    }

    const razorpayOrderId = payment.order_id;
    const razorpayPaymentId = payment.id;
    const amountPaid = payment.amount / 100; // Convert paise → ₹

    // ── 1. Find the order by razorpay_order_id ─────────────────────────
    const { data: order, error: fetchError } = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('razorpay_order_id', razorpayOrderId)
      .single();

    if (fetchError || !order) {
      // Try matching by razorpay_payment_id in case order_id not stored
      console.error('[razorpay-webhook] Order not found for razorpay_order_id:', razorpayOrderId);
      // Don't fail — record the payment anyway
    }

    // ── 2. Update order to paid ────────────────────────────────────────
    if (order) {
      await supabaseAdmin
        .from('orders')
        .update({
          payment_status: 'paid',
          order_status: 'processing',
          razorpay_payment_id: razorpayPaymentId,
          updated_at: new Date().toISOString(),
        })
        .eq('id', order.id);
    }

    // ── 3. Insert payment record ───────────────────────────────────────
    await supabaseAdmin.from('payments').insert({
      transaction_id: razorpayPaymentId,
      razorpay_order_id: razorpayOrderId,
      customer_name: order?.customer_name || payment.contact || '',
      order_id: order?.id || null,
      amount: amountPaid,
      method: payment.method || 'unknown',
      status: 'success',
      created_at: new Date().toISOString(),
    });

    // ── 4. Upsert customer record ──────────────────────────────────────
    if (payment.email) {
      const { data: existingCustomer } = await supabaseAdmin
        .from('customers')
        .select('id, total_orders, total_spent')
        .eq('email', payment.email)
        .single();
      
      if (existingCustomer) {
        await supabaseAdmin.from('customers').update({
          total_orders: (existingCustomer.total_orders || 0) + 1,
          total_spent: (existingCustomer.total_spent || 0) + amountPaid,
          name: order?.customer_name || payment.contact || 'Customer',
          phone: payment.contact || order?.customer_phone || '',
        }).eq('id', existingCustomer.id);
      } else {
        const customerId = await generateCustomerId();
        await supabaseAdmin.from('customers').insert({
          id: customerId,
          email: payment.email,
          name: order?.customer_name || payment.contact || 'Customer',
          phone: payment.contact || order?.customer_phone || '',
          total_orders: 1,
          total_spent: amountPaid,
        });
      }
    }

    // ── 5. Send confirmation emails ────────────────────────────────────
    const orderNumber = order?.order_number || `JMP-${razorpayPaymentId.slice(-8).toUpperCase()}`;
    const customerEmail = order?.customer_email || payment.email || '';
    const customerName = order?.customer_name || 'Customer';
    const items = normalizeItems(order?.items || []);
    const total = Number(order?.total) || amountPaid;
    const subtotal = Number(order?.subtotal) || total;
    const discount = Number(order?.discount) || 0;
    const shippingAddress = formatAddress(order?.shipping_address);

    // Send to customer
    const resend = getResend();
    if (customerEmail && resend) {
      const { error: customerEmailError } = await resend.emails.send({
        from: 'Jammi Pharmaceuticals <onboarding@resend.dev>',
        to: [customerEmail],
        subject: `✅ Order Confirmed — ${orderNumber} | Jammi Pharmaceuticals`,
        react: OrderConfirmationEmail({
          customerName,
          orderNumber,
          items,
          subtotal,
          discount,
          total,
          shippingAddress,
          phone: order?.customer_phone,
        }),
      });
      if (customerEmailError) {
        console.error('[razorpay-webhook] Customer email error:', customerEmailError);
      }
    }

    // Send to internal team (frontdesk + njammi)
    if (resend) {
      const { error: internalEmailError } = await resend.emails.send({
        from: 'Jammi Orders <onboarding@resend.dev>',
        to: ['frontdesk@jammi.org', 'njammi@gmail.com'],
        subject: `🔔 NEW ORDER ${orderNumber} — ₹${total.toLocaleString('en-IN')} | ${customerName}`,
        react: OrderConfirmationInternal({
          customerName,
          customerEmail,
          customerPhone: order?.customer_phone || payment.contact || '',
          orderNumber,
          items,
          subtotal,
          discount,
          total,
          shippingAddress,
          paymentMethod: payment.method,
          orderedAt: new Date().toISOString(),
        }),
      });
      if (internalEmailError) {
        console.error('[razorpay-webhook] Internal email error:', internalEmailError);
      }
    }

    return NextResponse.json({ received: true, event: 'payment.captured' });
  }

  // ── payment.failed — CAPTURE FAILED ORDER ─────────────────────────────
  if (event.event === 'payment.failed') {
    const payment = event.payload?.payment?.entity;
    if (!payment) {
      return NextResponse.json({ received: true });
    }

    const razorpayOrderId = payment.order_id;

    // Update order status to failed (order stays in DB for records)
    if (razorpayOrderId) {
      await supabaseAdmin
        .from('orders')
        .update({
          payment_status: 'failed',
          order_status: 'placed',
          updated_at: new Date().toISOString(),
        })
        .eq('razorpay_order_id', razorpayOrderId);
    }

    // Also insert a failed payment record for audit trail
    if (payment.id) {
      await supabaseAdmin.from('payments').insert({
        transaction_id: payment.id,
        razorpay_order_id: razorpayOrderId,
        customer_name: payment.contact || '',
        amount: (payment.amount || 0) / 100,
        method: payment.method || 'unknown',
        status: 'failed',
        created_at: new Date().toISOString(),
      });
    }

    console.log(`[razorpay-webhook] Payment failed for order: ${razorpayOrderId}`);
    return NextResponse.json({ received: true, event: 'payment.failed' });
  }

  // ── All other events — acknowledge and ignore ──────────────────────────
  return NextResponse.json({ received: true, event: event.event });
}
