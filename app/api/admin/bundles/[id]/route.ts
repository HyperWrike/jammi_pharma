import { NextRequest, NextResponse } from 'next/server';
import { convexMutation } from '@/lib/convexServer';
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

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const { id } = await params;
    const body = await req.json();
    const productIds = Array.isArray(body?.product_ids) ? body.product_ids : [];
    if (productIds.length < 2) {
      return NextResponse.json({ error: 'Bundle must include at least 2 products.' }, { status: 400 });
    }

    const payload = cleanArgs({
      name: body?.name,
      description: body?.description,
      image_url: body?.image_url,
      extra_discount_percent: body?.extra_discount_percent !== undefined ? Number(body.extra_discount_percent) : undefined,
      show_in_shop: typeof body?.show_in_shop === 'boolean' ? body.show_in_shop : undefined,
      status: body?.status,
    });

    const data = await convexMutation("functions/bundles.js:updateBundle", { id, ...payload });
    await convexMutation("functions/bundles.js:setBundleProducts", { bundle_id: id, product_ids: productIds });
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
    await convexMutation("functions/bundles.js:deleteBundle", { id });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
