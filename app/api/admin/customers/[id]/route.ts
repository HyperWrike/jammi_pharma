import { NextRequest, NextResponse } from 'next/server';
import { verifyAdmin, supabaseAdmin, unauthorized, serverError } from '@/lib/adminAuth';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const { id } = await params;
    
    const { data: user, error } = await supabaseAdmin
      .from('site_users')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) return serverError(error);

    const { data: orders } = await supabaseAdmin
      .from('orders')
      .select('*, order_items(*)')
      .eq('user_id', id)
      .order('created_at', { ascending: false });

    return NextResponse.json({ data: { ...user, orders: orders || [] } });
  } catch (error) {
    return serverError(error);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const { id } = await params;
    const body = await req.json();
    
    const { data, error } = await supabaseAdmin
      .from('site_users')
      .update({ ...body, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
      
    if (error) return serverError(error);
    return NextResponse.json({ data });
  } catch (error) {
    return serverError(error);
  }
}
