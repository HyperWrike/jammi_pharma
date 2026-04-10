import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { createHmac } from 'crypto';
import { Resend } from 'resend';
import { convexMutation, convexQuery } from '../../../lib/convexServer';
import { rateLimit, getClientIp } from '../../../lib/rateLimit';
import { OrderConfirmationEmail } from '../../../components/emails/OrderConfirmationEmail';
import { OrderConfirmationInternal } from '../../../components/emails/OrderConfirmationInternal';

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

function verifyRazorpaySignature(body: string, signature: string | null, secret: string): boolean {
  if (!signature || !secret) return false;
  const expectedSignature = createHmac('sha256', secret).update(body).digest('hex');
  return expectedSignature === signature;
}

function normalizeItems(raw: any[]): { name: string; quantity: number; price: number }[] {
  return (raw || []).map((item: any) => ({
    name: item.name || item.productName || 'Product',
    quantity: Number(item.quantity) || 1,
    price: Number(item.price) || 0,
  }));
}

function formatAddress(addr: any): string {
  if (typeof addr === 'string') return addr;
  if (!addr) return '';
  return [addr.address || addr.line1, addr.city, addr.state, addr.pincode || addr.postal_code]
    .filter(Boolean)
    .join(', ');
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const { allowed } = rateLimit(`razorpay-webhook:${ip}`, 30, 60_000);

  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const body = await req.text();
  const signature = req.headers.get('x-razorpay-signature');
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || '';

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

  if (event.event === 'payment.captured') {
    const payment = event.payload?.payment?.entity;
    if (!payment) {
      return NextResponse.json({ error: 'Missing payment entity' }, { status: 400 });
    }

    const razorpayOrderId = payment.order_id;
    const razorpayPaymentId = payment.id;
    const amountPaid = payment.amount / 100;

    // Find order by razorpay_order_id
    let order: any = null;
    try {
      order = await convexQuery("functions/orders:getOrderByRazorpayOrderId", {
        razorpay_order_id: razorpayOrderId,
      });
    } catch (e) {
      console.error('[razorpay-webhook] Order lookup failed:', e);
    }

    // Update order to paid
    if (order?._id) {
      try {
        await convexMutation("functions/orders:updateOrderById", {
          id: order._id,
          updates: {
            payment_status: 'paid',
            order_status: 'processing',
            razorpay_payment_id: razorpayPaymentId,
          },
        });
      } catch (e) {
        console.error('[razorpay-webhook] Order update failed:', e);
      }
    }

    // Insert payment record
    try {
      await convexMutation("functions/orders:createPayment", {
        transaction_id: razorpayPaymentId,
        razorpay_order_id: razorpayOrderId,
        customer_name: order?.customer_name || payment.contact || '',
        order_id: order?._id || null,
        amount: amountPaid,
        method: payment.method || 'unknown',
        status: 'success',
      });
    } catch (e) {
      console.error('[razorpay-webhook] Payment insert failed:', e);
    }

    // Upsert customer
    if (payment.email) {
      try {
        await convexMutation("functions/orders:upsertCustomer", {
          email: payment.email,
          name: order?.customer_name || payment.contact || 'Customer',
          phone: payment.contact || order?.customer_phone || '',
        });
      } catch (e) {
        console.error('[razorpay-webhook] Customer upsert failed:', e);
      }
    }

    // Send confirmation emails
    const orderNumber = order?.order_number || `JMP-${razorpayPaymentId.slice(-8).toUpperCase()}`;
    const customerEmail = order?.customer_email || payment.email || '';
    const customerName = order?.customer_name || 'Customer';
    const items = normalizeItems(order?.items || []);
    const total = Number(order?.total_amount) || amountPaid;
    const subtotal = Number(order?.subtotal) || total;
    const discount = Number(order?.discount_amount) || 0;
    const shippingAddress = formatAddress(order?.shipping_address);

    const resend = getResend();
    if (customerEmail && resend) {
      try {
        await resend.emails.send({
          from: 'Jammi Pharmaceuticals <onboarding@resend.dev>',
          to: [customerEmail],
          subject: `Order Confirmed — ${orderNumber} | Jammi Pharmaceuticals`,
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
      } catch (e) {
        console.error('[razorpay-webhook] Customer email error:', e);
      }

      try {
        await resend.emails.send({
          from: 'Jammi Orders <onboarding@resend.dev>',
          to: ['frontdesk@jammi.org', 'njammi@gmail.com'],
          subject: `NEW ORDER ${orderNumber} — ₹${total.toLocaleString('en-IN')} | ${customerName}`,
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
      } catch (e) {
        console.error('[razorpay-webhook] Internal email error:', e);
      }
    }

    return NextResponse.json({ received: true, event: 'payment.captured' });
  }

  if (event.event === 'payment.failed') {
    const payment = event.payload?.payment?.entity;
    if (!payment) {
      return NextResponse.json({ received: true });
    }

    const razorpayOrderId = payment.order_id;

    if (razorpayOrderId) {
      try {
        const order = await convexQuery("functions/orders:getOrderByRazorpayOrderId", {
          razorpay_order_id: razorpayOrderId,
        });
        if (order?._id) {
          await convexMutation("functions/orders:updateOrderById", {
            id: order._id,
            updates: { payment_status: 'failed' },
          });
        }
      } catch (e) {
        console.error('[razorpay-webhook] Failed payment update error:', e);
      }
    }

    if (payment.id) {
      try {
        await convexMutation("functions/orders:createPayment", {
          transaction_id: payment.id,
          razorpay_order_id: razorpayOrderId,
          customer_name: payment.contact || '',
          amount: (payment.amount || 0) / 100,
          method: payment.method || 'unknown',
          status: 'failed',
        });
      } catch (e) {
        console.error('[razorpay-webhook] Failed payment record error:', e);
      }
    }

    console.log(`[razorpay-webhook] Payment failed for order: ${razorpayOrderId}`);
    return NextResponse.json({ received: true, event: 'payment.failed' });
  }

  return NextResponse.json({ received: true, event: event.event });
}
