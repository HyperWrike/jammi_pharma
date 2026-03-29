import { NextRequest, NextResponse } from 'next/server';
import { verifyAdmin, supabaseAdmin, unauthorized, serverError } from '@/lib/adminAuth';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const { id } = await params;
    const { data, error } = await supabaseAdmin
      .from('orders')
      .select('*, order_items(*), site_users(user_code, name, email, phone)')
      .eq('id', id)
      .single();
      
    if (error) return serverError(error);
    return NextResponse.json({ data });
  } catch (error) {
    return serverError(error);
  }
}
