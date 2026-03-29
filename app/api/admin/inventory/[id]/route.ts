import { NextRequest, NextResponse } from 'next/server';
import { verifyAdmin, supabaseAdmin, unauthorized, serverError } from '@/lib/adminAuth';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const { id } = await params;
    const body = await req.json();
    const { stock, low_stock_alert, reason } = body;

    // Get old stock for logging
    const { data: product } = await supabaseAdmin
      .from('products')
      .select('stock')
      .eq('id', id)
      .single();

    const updates: any = { updated_at: new Date().toISOString() };
    if (stock !== undefined) updates.stock = stock;
    if (low_stock_alert !== undefined) updates.low_stock_alert = low_stock_alert;

    const { data, error } = await supabaseAdmin
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
      
    if (error) return serverError(error);

    // Log the inventory change
    if (stock !== undefined && product) {
      await supabaseAdmin.from('inventory_log').insert({
        product_id: id,
        previous_stock: product.stock,
        new_stock: stock,
        change_amount: stock - product.stock,
        reason: reason || 'Manual update by admin'
      });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return serverError(error);
  }
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const { id } = await params;
    const { data, error } = await supabaseAdmin
      .from('inventory_log')
      .select('*')
      .eq('product_id', id)
      .order('created_at', { ascending: false })
      .limit(50);
      
    if (error) return serverError(error);
    return NextResponse.json({ data });
  } catch (error) {
    return serverError(error);
  }
}
