import { NextRequest, NextResponse } from 'next/server';
import { verifyAdmin, supabaseAdmin, unauthorized, serverError } from '@/lib/adminAuth';

export async function GET(req: NextRequest) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const searchParams = req.nextUrl.searchParams;
    const search = searchParams.get('search');
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    let query = supabaseAdmin
      .from('site_users')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    if (search) query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,user_code.ilike.%${search}%`);
    if (status) query = query.eq('status', status);

    const { data, error, count } = await query;
    if (error) return serverError(error);

    // For each customer get order count
    const enriched = await Promise.all(
      (data || []).map(async (u) => {
        const { count: orderCount } = await supabaseAdmin
          .from('orders')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', u.id);
        return { ...u, order_count: orderCount || 0 };
      })
    );

    return NextResponse.json({ data: enriched, total: count });
  } catch (error) {
    return serverError(error);
  }
}
