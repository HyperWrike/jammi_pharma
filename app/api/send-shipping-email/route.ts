import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { Resend } from 'resend';
import { convexQuery } from '../../../lib/convexServer';
import { rateLimit, getClientIp } from '../../../lib/rateLimit';
import { OrderShippedEmail } from '../../../components/emails/OrderShippedEmail';

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const { allowed, remaining, resetAt } = rateLimit(`send-shipping-email:${ip}`, 5, 60_000);

  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((resetAt - Date.now()) / 1000)),
        },
      }
    );
  }

  try {
    const body = await req.json();
    const { orderId, courierName, trackingId } = body;

    if (!orderId) {
      return NextResponse.json({ error: 'orderId is required' }, { status: 400 });
    }

    // Fetch order from Convex
    const order = await convexQuery("functions/orders.js:getOrder", { id: orderId });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const items = Array.isArray(order.items)
      ? order.items.map((item: any) => ({
          name: item.name || item.productName || 'Product',
          quantity: Number(item.quantity) || 1,
          price: Number(item.price) || 0,
        }))
      : [];

    const shippingAddress =
      typeof order.shipping_address === 'object'
        ? [order.shipping_address.address, order.shipping_address.city, order.shipping_address.pincode]
            .filter(Boolean)
            .join(', ')
        : String(order.shipping_address || '');

    const resend = getResend();
    if (!resend) {
      console.warn('[send-shipping-email] RESEND_API_KEY not set — skipping email');
      return NextResponse.json({ success: true, message: 'Email skipped (no API key)' });
    }

    const { error: emailError } = await resend.emails.send({
      from: 'Jammi Pharmaceuticals <onboarding@resend.dev>',
      to: [order.customer_email],
      subject: `Your Jammi order ${order.order_number} is on its way!`,
      react: OrderShippedEmail({
        customerName: order.customer_name,
        orderNumber: order.order_number,
        items,
        total: Number(order.total_amount),
        shippingAddress,
        courierName,
        trackingId,
      }),
    });

    if (emailError) {
      console.error('[send-shipping-email] Resend error:', emailError);
      return NextResponse.json({ error: 'Email send failed', detail: emailError }, { status: 500 });
    }

    return NextResponse.json(
      { success: true, message: `Shipping email sent to ${order.customer_email}` },
      {
        headers: {
          'X-RateLimit-Remaining': String(remaining),
        },
      }
    );
  } catch (err) {
    console.error('[send-shipping-email] Unexpected error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
