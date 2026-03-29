import { NextRequest, NextResponse } from 'next/server';
import { verifyAdmin, supabaseAdmin, unauthorized, serverError } from '@/lib/adminAuth';

export async function GET(req: NextRequest) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const searchParams = req.nextUrl.searchParams;
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    let query = supabaseAdmin
      .from('products')
      .select('*, categories(name)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    if (search) query = query.ilike('name', `%${search}%`);
    if (category) query = query.eq('category_id', category);
    if (status) query = query.eq('status', status);

    const { data, error, count } = await query;
    if (error) return serverError(error);
    
    return NextResponse.json({ data, total: count });
  } catch (error) {
    return serverError(error);
  }
}

export async function POST(req: NextRequest) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const body = await req.json();
    const { data, error } = await supabaseAdmin
      .from('products')
      .insert(body)
      .select()
      .single();
      
    if (error) return serverError(error);
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    return serverError(error);
  }
}
