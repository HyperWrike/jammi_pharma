import { NextRequest, NextResponse } from 'next/server';
import { verifyAdmin, supabaseAdmin, unauthorized, serverError } from '@/lib/adminAuth';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const { id } = await params;
    const body = await req.json();
    const { order_status, payment_status, tracking_number, courier_name, admin_notes } = body;

    const updates: any = { updated_at: new Date().toISOString() };
    if (order_status) updates.order_status = order_status;
    if (payment_status) updates.payment_status = payment_status;
    if (tracking_number !== undefined) updates.tracking_number = tracking_number;
    if (courier_name !== undefined) updates.courier_name = courier_name;
    if (admin_notes !== undefined) updates.admin_notes = admin_notes;

    // First get the current order to check previous status
    const { data: currentOrder } = await supabaseAdmin
      .from('orders')
      .select('order_status')
      .eq('id', id)
      .single();

    const { data, error } = await supabaseAdmin
      .from('orders')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) return serverError(error);

    // Trigger shipping email if status changed to 'completed'
    if (
      order_status === 'completed' && 
      currentOrder?.order_status !== 'completed'
    ) {
      try {
        // Construct absolute URL for the fetch call since this is server-side
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

    if (error) return serverError(error);
    return NextResponse.json({ data });
  } catch (error) {
    return serverError(error);
  }
}
