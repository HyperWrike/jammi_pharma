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
    const payload = cleanArgs({
      code: body?.code ? String(body.code).trim().toUpperCase() : undefined,
      discount_type: body?.discount_type,
      discount_value: body?.discount_value !== undefined ? Number(body.discount_value) : undefined,
      min_order_value: body?.min_order_value !== undefined ? Number(body.min_order_value) : undefined,
      max_discount_amount: body?.max_discount_amount !== undefined ? Number(body.max_discount_amount) : undefined,
      expiry_date: body?.expiry_date,
      usage_limit: body?.usage_limit !== undefined && body?.usage_limit !== null ? Number(body.usage_limit) : undefined,
      status: body?.status,
    });
    const data = await convexMutation("functions/coupons.js:updateCoupon", { id, ...payload });
    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const { id } = await params;
    const body = await req.json();
    const data = await convexMutation("functions/coupons.js:updateCoupon", { id, status: body.status });
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
    await convexMutation("functions/coupons.js:deleteCoupon", { id });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
