import { NextRequest, NextResponse } from 'next/server';
import { verifyAdmin, supabaseAdmin, unauthorized, serverError } from '@/lib/adminAuth';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const { id } = await params;
    const { data, error } = await supabaseAdmin
      .from('products')
      .select('*, categories(name), product_variants(*)')
      .eq('id', id)
      .single();
      
    if (error) return serverError(error);
    return NextResponse.json({ data });
  } catch (error) {
    return serverError(error);
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const { id } = await params;
    const body = await req.json();
    const { data, error } = await supabaseAdmin
      .from('products')
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

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const { id } = await params;
    
    // First get product images to delete from storage
    const { data: product } = await supabaseAdmin
      .from('products')
      .select('images')
      .eq('id', id)
      .single();

    // Delete all product images from storage
    if (product?.images?.length) {
      for (const url of product.images) {
        const path = url.split('/product-images/')[1];
        if (path) {
          await supabaseAdmin.storage.from('product-images').remove([path]);
        }
      }
    }

    const { error } = await supabaseAdmin.from('products').delete().eq('id', id);
    if (error) return serverError(error);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return serverError(error);
  }
}
