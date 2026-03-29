import { NextRequest, NextResponse } from 'next/server';
import { verifyAdmin, supabaseAdmin, unauthorized, serverError } from '@/lib/adminAuth';

export async function GET(req: NextRequest) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const searchParams = req.nextUrl.searchParams;
    const status = searchParams.get('status') || 'pending';
    const product = searchParams.get('product');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    let query = supabaseAdmin
      .from('reviews')
      .select('*, products!inner(name, images)', { count: 'exact' })
      .order('createdAt', { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    if (status !== 'all') {
      const matchStatus = status === 'pending' ? 'Pending' : (status === 'approved' ? 'Approved' : 'Rejected');
      query = query.eq('status', matchStatus);
    }
    if (product) query = query.eq('productId', product);

    const { data: rawData, error, count } = await query;
    if (error) return serverError(error);
    
    // map to UI expectations
    const data = rawData.map((r: any) => ({
      ...r,
      review_text: r.comment,
      reviewer_name: r.customerName,
      status: r.status.toLowerCase(),
    }));
    
    return NextResponse.json({ data, total: count });
  } catch (error) {
    return serverError(error);
  }
}
