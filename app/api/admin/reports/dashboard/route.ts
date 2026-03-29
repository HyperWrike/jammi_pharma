import { NextRequest, NextResponse } from 'next/server';
import { verifyAdmin, supabaseAdmin, unauthorized, serverError } from '@/lib/adminAuth';

export async function GET(req: NextRequest) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const now = new Date();
    const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const firstOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString();
    const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000).toISOString();

    const [
      { data: allOrders },
      { data: monthOrders },
      { data: lastMonthOrders },
      { count: totalCustomers },
      { count: newCustomers },
      { data: recentOrders },
      { data: lowStock },
    ] = await Promise.all([
      supabaseAdmin.from('orders').select('total_amount').eq('payment_status', 'paid'),
      supabaseAdmin.from('orders').select('total_amount').eq('payment_status', 'paid').gte('created_at', firstOfMonth),
      supabaseAdmin.from('orders').select('total_amount').eq('payment_status', 'paid').gte('created_at', firstOfLastMonth).lt('created_at', firstOfMonth),
      supabaseAdmin.from('site_users').select('id', { count: 'exact', head: true }),
      supabaseAdmin.from('site_users').select('id', { count: 'exact', head: true }).gte('created_at', thirtyDaysAgo),
      supabaseAdmin.from('orders').select('id, order_number, customer_name, total_amount, order_status, payment_status, created_at, site_users(user_code)').order('created_at', { ascending: false }).limit(10),
      supabaseAdmin.from('products').select('id, name, stock, low_stock_threshold, images').filter('stock', 'lte', 'low_stock_threshold' as any),
    ]);

    const totalSales = (allOrders || []).reduce((s: number, o: any) => s + parseFloat(o.total_amount || '0'), 0);
    const monthRevenue = (monthOrders || []).reduce((s: number, o: any) => s + parseFloat(o.total_amount || '0'), 0);
    const lastMonthRevenue = (lastMonthOrders || []).reduce((s: number, o: any) => s + parseFloat(o.total_amount || '0'), 0);
    const pctChange = lastMonthRevenue > 0
      ? ((monthRevenue - lastMonthRevenue) / lastMonthRevenue * 100).toFixed(1)
      : null;

    // Sales chart: last 12 months
    const chartData: any[] = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const start = d.toISOString();
      const end = new Date(d.getFullYear(), d.getMonth() + 1, 1).toISOString();
      const { data: mo } = await supabaseAdmin
        .from('orders')
        .select('total_amount')
        .eq('payment_status', 'paid')
        .gte('created_at', start)
        .lt('created_at', end);
      chartData.push({
        label: d.toLocaleString('default', { month: 'short' }),
        revenue: (mo || []).reduce((s: number, o: any) => s + parseFloat(o.total_amount || '0'), 0)
      });
    }

    return NextResponse.json({
      totalSales,
      totalOrders: allOrders?.length || 0,
      monthRevenue,
      lastMonthRevenue,
      pctChange,
      totalCustomers: totalCustomers || 0,
      newCustomers: newCustomers || 0,
      recentOrders: recentOrders || [],
      lowStock: lowStock || [],
      chartData
    });
  } catch (error) {
    return serverError(error);
  }
}
