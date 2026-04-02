import { NextRequest, NextResponse } from 'next/server';
import { convexMutation, convexQuery } from '@/lib/convexServer';
import { verifyAdmin, unauthorized } from '@/lib/adminAuth';

function cleanArgs(args: any) {
  const cleaned: any = {};
  Object.keys(args).forEach(key => {
    if (args[key] !== null && args[key] !== undefined && args[key] !== '') {
      cleaned[key] = args[key];
    }
  });
  return cleaned;
}

function toSlug(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function sanitizeProductInput(input: any) {
  const payload: any = {
    name: input?.name,
    slug: input?.slug,
    description: input?.description,
    short_description: input?.short_description ?? input?.shortDesc,
    price: typeof input?.price === 'number' ? input.price : Number(input?.price ?? 0),
    discount_price: input?.discount_price ?? (input?.compare_at_price !== undefined ? Number(input.compare_at_price) : undefined),
    stock: input?.stock !== undefined ? Number(input.stock) : undefined,
    low_stock_threshold: input?.low_stock_threshold !== undefined ? Number(input.low_stock_threshold) : undefined,
    sku: input?.sku,
    category_id: input?.category_id,
    images: Array.isArray(input?.images) ? input.images : undefined,
    tags: Array.isArray(input?.tags) ? input.tags : undefined,
    ingredients: input?.ingredients,
    usage_instructions: input?.usage_instructions,
    benefits: Array.isArray(input?.benefits) ? input.benefits : undefined,
    meta_title: input?.meta_title,
    meta_description: input?.meta_description,
    status: input?.status,
    is_featured: typeof input?.is_featured === 'boolean' ? input.is_featured : undefined,
    display_order: input?.display_order !== undefined ? Number(input.display_order) : undefined,
  };

  if (!payload.slug && payload.name) {
    payload.slug = toSlug(payload.name);
  }
  return cleanArgs(payload);
}

export async function GET(req: NextRequest) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();
  try {
    const searchParams = req.nextUrl.searchParams;
    const search = searchParams.get('search') || undefined;
    const category = searchParams.get('category') || undefined;
    const status = searchParams.get('status') || undefined;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const result = await convexQuery("functions/products.js:listProducts", cleanArgs({
      search, category, status, page, limit
    }));
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();
  try {
    const body = await req.json();
    const result = await convexMutation("functions/products_mutations.js:createProduct", sanitizeProductInput(body));
    return NextResponse.json({ data: result }, { status: 201 });
  } catch (error: any) {
    if ((error?.message || '').toLowerCase().includes('already exists')) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
