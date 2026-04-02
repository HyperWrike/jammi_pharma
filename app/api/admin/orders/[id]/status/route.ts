import { NextRequest, NextResponse } from 'next/server';
import { convexMutation, convexQuery } from '@/lib/convexServer';
import { verifyAdmin, unauthorized } from '@/lib/adminAuth';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const { id } = await params;
    const body = await req.json();
    const { order_status, payment_status, tracking_number, courier_name, admin_notes } = body;

    // Get current order to check previous status
    const currentOrder = await convexQuery("functions/orders:getOrder", { id });

    const data = await convexMutation("functions/orders:updateOrderStatus", {
      id,
      order_status,
      payment_status,
      tracking_number,
      courier_name,
      admin_notes
    });

    // Trigger shipping email if status changed to 'completed'
    if (
      order_status === 'completed' &&
      currentOrder?.order_status !== 'completed'
    ) {
      try {
        const protocol = req.headers.get('x-forwarded-proto') || 'http';
        const host = req.headers.get('host');
        const baseUrl = `${protocol}://${host}`;

        await fetch(`${baseUrl}/api/send-shipping-email`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: id,
            courierName: data.courier_name || courier_name,
            trackingId: data.tracking_number || tracking_number
          })
        });
      } catch (e) {
        console.error('[order-status] Failed to trigger shipping email:', e);
      }
    }

    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
