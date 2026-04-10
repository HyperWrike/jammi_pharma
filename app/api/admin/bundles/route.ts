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

function sanitizeBundlePayload(input: any) {
  return cleanArgs({
    name: input?.name,
    description: input?.description,
    image_url: input?.image_url,
    extra_discount_percent: input?.extra_discount_percent !== undefined ? Number(input.extra_discount_percent) : undefined,
    show_in_shop: typeof input?.show_in_shop === 'boolean' ? input.show_in_shop : undefined,
  });
}

export async function GET(req: NextRequest) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const data = await convexQuery("functions/bundles:listBundles", {});
    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const body = await req.json();
    const { product_ids, ...bundleData } = body;
    const productIds = Array.isArray(product_ids) ? product_ids : [];
    if (productIds.length < 2) {
      return NextResponse.json({ error: 'Bundle must include at least 2 products.' }, { status: 400 });
    }

    const bundleId = await convexMutation("functions/bundles:createBundle", sanitizeBundlePayload(bundleData));

    await convexMutation("functions/bundles:setBundleProducts", {
      bundle_id: bundleId,
      product_ids: productIds
    });

    return NextResponse.json({ data: { _id: bundleId, ...bundleData } }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
