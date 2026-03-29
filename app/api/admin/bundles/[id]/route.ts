import { NextRequest, NextResponse } from 'next/server';
import { verifyAdmin, supabaseAdmin, unauthorized, serverError } from '@/lib/adminAuth';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const { id } = await params;
    const body = await req.json();
    const { product_ids, ...bundleData } = body;

    const { data, error } = await supabaseAdmin
      .from('bundles')
      .update({ ...bundleData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
      
    if (error) return serverError(error);

    if (product_ids !== undefined) {
      await supabaseAdmin.from('bundle_products').delete().eq('bundle_id', id);
      if (product_ids.length > 0) {
        await supabaseAdmin.from('bundle_products').insert(
          product_ids.map((pid: string) => ({ bundle_id: id, product_id: pid }))
        );
      }
    }

    return NextResponse.json({ data });
  } catch (error) {
    return serverError(error);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const { id } = await params;
    await supabaseAdmin.from('bundle_products').delete().eq('bundle_id', id);
    const { error } = await supabaseAdmin.from('bundles').delete().eq('id', id);
    if (error) return serverError(error);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return serverError(error);
  }
}
