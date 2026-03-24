import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { supabaseAdmin } from '../../../lib/supabase';
import { generateCustomerId } from '../../../lib/customers';
import { rateLimit, getClientIp } from '../../../lib/rateLimit';

export async function POST(req: NextRequest) {
  // ── Rate Limiting: 10 requests per minute per IP ──────────────────────────
  const ip = getClientIp(req);
  const { allowed, remaining, resetAt } = rateLimit(`create-order:${ip}`, 10, 60_000);

  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait before placing another order.' },
      {
        status: 429,
        headers: {
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(Math.ceil(resetAt / 1000)),
          'Retry-After': String(Math.ceil((resetAt - Date.now()) / 1000)),
        },
      }
    );
  }

  try {
    const body = await req.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      items,
      subtotal,
      discount = 0,
      couponCode,
      total,
    } = body;

    // ── Validate required fields ───────────────────────────────────────────
    if (!customerName || !customerEmail || !shippingAddress || !items?.length || !total) {
      return NextResponse.json(
        { error: 'Missing required fields: customerName, customerEmail, shippingAddress, items, total' },
        { status: 400 }
      );
    }

    // ── Get or Create Customer ID ───────────────────────────────────────────
    const { data: existingCustomer } = await supabaseAdmin
      .from('customers')
      .select('id')
      .eq('email', customerEmail)
      .single();

    let customerId = existingCustomer?.id;

    if (!customerId) {
      customerId = await generateCustomerId();
      await supabaseAdmin.from('customers').insert({
        id: customerId,
        name: customerName,
        email: customerEmail,
        phone: customerPhone || '',
      });
    }

    // ── Generate human-readable order number ───────────────────────────────
    // Format: JMP-YYYYMMDD-XXXX (e.g. JMP-20260317-1042)
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
    const randSuffix = String(1000 + Math.floor(Math.random() * 8999));
    const orderNumber = `JMP-${dateStr}-${randSuffix}`;

    // ── Insert pending order into Supabase ─────────────────────────────────
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert({
        order_number: orderNumber,
        customer_id: customerId,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone || '',
        shipping_address: shippingAddress,
        items: items,
        subtotal: subtotal,
        discount: discount,
        coupon_code: couponCode || null,
        total: total,
        payment_status: 'pending',
        order_status: 'processing',  // Default to processing as per spec
      })
      .select('id, order_number')
      .single();

    if (orderError) {
      console.error('[create-order] Supabase insert error:', orderError);
      // Still return success to client; the order flow must not block
      // (Razorpay link is the source of truth)
      return NextResponse.json(
        { error: 'Database error saving order', detail: orderError.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        orderNumber: order.order_number,
        orderId: order.id,
      },
      {
        headers: {
          'X-RateLimit-Remaining': String(remaining),
          'X-RateLimit-Reset': String(Math.ceil(resetAt / 1000)),
        },
      }
    );
  } catch (err) {
    console.error('[create-order] Unexpected error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
