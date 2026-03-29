import { NextRequest, NextResponse } from 'next/server';
import { verifyAdmin, supabaseAdmin, unauthorized, serverError } from '@/lib/adminAuth';

export async function GET(req: NextRequest) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const { data, error } = await supabaseAdmin
      .from('bundles')
      .select('*, bundle_products(product_id, products(id, name, images, price))')
      .order('created_at', { ascending: false });
      
    if (error) return serverError(error);
    return NextResponse.json({ data });
  } catch (error) {
    return serverError(error);
  }
}

export async function POST(req: NextRequest) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const body = await req.json();
    const { product_ids, ...bundleData } = body;

    const { data: bundle, error } = await supabaseAdmin
      .from('bundles')
      .insert(bundleData)
      .select()
      .single();
      
    if (error) return serverError(error);

    if (product_ids && product_ids.length > 0) {
      await supabaseAdmin.from('bundle_products').insert(
        product_ids.map((pid: string) => ({ bundle_id: bundle.id, product_id: pid }))
      );
    }

    return NextResponse.json({ data: bundle }, { status: 201 });
  } catch (error) {
    return serverError(error);
  }
}
