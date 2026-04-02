import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { convexMutation, convexQuery } from '../../../lib/convexServer';
import { rateLimit, getClientIp } from '../../../lib/rateLimit';
import { Resend } from 'resend';
import { OrderConfirmationEmail } from '../../../components/emails/OrderConfirmationEmail';
import { OrderConfirmationInternal } from '../../../components/emails/OrderConfirmationInternal';

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

function getFromAddress() {
  return process.env.RESEND_FROM_EMAIL || 'Jammi Pharmaceuticals <onboarding@resend.dev>';
}

async function getEmailSettings() {
  const defaults = {
    fromEmail: getFromAddress(),
    internalRecipients: ['frontdesk@jammi.org', 'njammi@gmail.com'],
  };

  try {
    const rows = await convexQuery<any[]>('functions/cms:getCmsContent', {
      page: 'email_settings',
      section: 'notifications',
    });

    const fromEmail = rows.find((r) => r.content_key === 'from_email')?.content_value;
    const recipientsRaw = rows.find((r) => r.content_key === 'internal_recipients')?.content_value;
    const internalRecipients = String(recipientsRaw || '')
      .split(',')
      .map((v) => v.trim())
      .filter(Boolean);

    return {
      fromEmail: fromEmail || defaults.fromEmail,
      internalRecipients: internalRecipients.length > 0 ? internalRecipients : defaults.internalRecipients,
    };
  } catch {
    return defaults;
  }
}

export async function POST(req: NextRequest) {
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
      paymentMethod = 'UPI',
    } = body;

    if (!customerName || !customerEmail || !shippingAddress || !items?.length || !total) {
      return NextResponse.json(
        { error: 'Missing required fields: customerName, customerEmail, shippingAddress, items, total' },
        { status: 400 }
      );
    }

    // Upsert customer in Convex
    await convexMutation("functions/orders:upsertCustomer", {
      email: customerEmail,
      name: customerName,
      phone: customerPhone || '',
      address: shippingAddress?.address || '',
      city: shippingAddress?.city || '',
      pincode: shippingAddress?.pincode || '',
    });

    // Generate order number
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
    const randSuffix = String(1000 + Math.floor(Math.random() * 8999));
    const orderNumber = `JMP-${dateStr}-${randSuffix}`;

    // Create order in Convex
    const orderId = await convexMutation("functions/orders:createOrder", {
      order_number: orderNumber,
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone || '',
      shipping_address: shippingAddress,
      items: items,
      subtotal: subtotal,
      discount_amount: discount,
      coupon_code: couponCode || undefined,
      total_amount: total,
      payment_method: paymentMethod,
      payment_status: paymentMethod === 'COD' ? 'pending' : 'pending',
      order_status: paymentMethod === 'COD' ? 'pending' : 'processing',
    });

    // Create order items
    for (const item of items) {
      await convexMutation("functions/orders:createOrderItem", {
        order_id: orderId,
        product_id: item.productId || item.product_id,
        product_name: item.name || item.productName || 'Product',
        product_image: item.image || item.product_image,
        quantity: item.quantity || 1,
        unit_price: item.price || item.unit_price || 0,
        line_total: (item.price || 0) * (item.quantity || 1),
      });
    }

    // Send Emails (Non-blocking)
    try {
      const resend = getResend();
      if (resend) {
        const emailSettings = await getEmailSettings();
        const addressStr = typeof shippingAddress === 'string' ? shippingAddress : Object.values(shippingAddress).filter(Boolean).join(', ');

        await resend.emails.send({
          from: emailSettings.fromEmail,
          to: [customerEmail],
          subject: `Order Confirmed: ${orderNumber}`,
          react: OrderConfirmationEmail({
            customerName,
            orderNumber,
            items: items.map((i: any) => ({
              name: i.name || i.productName,
              quantity: i.quantity,
              price: i.price,
            })),
            subtotal,
            discount,
            total,
            shippingAddress: addressStr,
            phone: customerPhone,
          }),
        });

        await resend.emails.send({
          from: emailSettings.fromEmail,
          to: emailSettings.internalRecipients,
          subject: `New Order: ${orderNumber} (₹${total})`,
          react: OrderConfirmationInternal({
            customerName,
            customerEmail,
            customerPhone,
            orderNumber,
            items: items.map((i: any) => ({
              name: i.name || i.productName,
              quantity: i.quantity,
              price: i.price,
            })),
            subtotal,
            discount,
            total,
            shippingAddress: addressStr,
            paymentMethod,
            orderedAt: new Date().toISOString(),
          }),
        });
      }
    } catch (e) {
      console.error('[create-order] Email trigger failed:', e);
    }

    return NextResponse.json(
      {
        success: true,
        orderNumber,
        orderId,
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
