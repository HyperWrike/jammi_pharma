import { NextRequest, NextResponse } from 'next/server';
import { verifyAdmin, supabaseAdmin, unauthorized, serverError } from '@/lib/adminAuth';

export async function GET(req: NextRequest) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const searchParams = req.nextUrl.searchParams;
    const status = searchParams.get('status');
    const payment_status = searchParams.get('payment_status');
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    let query = supabaseAdmin
      .from('orders')
      .select('*, site_users(user_code, name, email)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    if (status) query = query.eq('order_status', status);
    if (payment_status) query = query.eq('payment_status', payment_status);
    if (from) query = query.gte('created_at', from);
    if (to) query = query.lte('created_at', to);
    if (search) query = query.or(`order_number.ilike.%${search}%,customer_name.ilike.%${search}%`);

    const { data, error, count } = await query;
    if (error) return serverError(error);
    
    return NextResponse.json({ data, total: count });
  } catch (error) {
    return serverError(error);
  }
}
