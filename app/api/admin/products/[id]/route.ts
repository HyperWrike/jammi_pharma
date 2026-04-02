import { NextRequest, NextResponse } from 'next/server';
import { convexMutation, convexQuery } from '@/lib/convexServer';
import { verifyAdmin, unauthorized } from '@/lib/adminAuth';

function cleanArgs(args: any) {
  const cleaned: any = {};
  Object.keys(args || {}).forEach((key) => {
    if (args[key] !== null && args[key] !== undefined && args[key] !== '') {
      cleaned[key] = args[key];
    }
  });
  return cleaned;
}

function sanitizeProductUpdate(input: any) {
  return cleanArgs({
    name: input?.name,
    slug: input?.slug,
    description: input?.description,
    short_description: input?.short_description ?? input?.shortDesc,
    price: input?.price !== undefined ? Number(input.price) : undefined,
    discount_price: input?.discount_price ?? (input?.compare_at_price !== undefined ? Number(input.compare_at_price) : undefined),
    stock: input?.stock !== undefined ? Number(input.stock) : undefined,
    sku: input?.sku,
    category_id: input?.category_id,
    images: Array.isArray(input?.images) ? input.images : undefined,
    tags: Array.isArray(input?.tags) ? input.tags : undefined,
    status: input?.status,
    is_featured: typeof input?.is_featured === 'boolean' ? input.is_featured : undefined,
  });
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const { id } = await params;
    const data = await convexQuery("functions/products:getProduct", { id });
    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const { id } = await params;
    const body = await req.json();
    const data = await convexMutation("functions/products_mutations:updateProduct", { id, ...sanitizeProductUpdate(body) });
    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const { id } = await params;
    await convexMutation("functions/products_mutations:deleteProduct", { id });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
