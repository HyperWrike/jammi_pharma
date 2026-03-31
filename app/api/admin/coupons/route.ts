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

function sanitizeCouponPayload(input: any) {
  return cleanArgs({
    code: input?.code ? String(input.code).trim().toUpperCase() : undefined,
    discount_type: input?.discount_type,
    discount_value: input?.discount_value !== undefined ? Number(input.discount_value) : undefined,
    min_order_value: input?.min_order_value !== undefined ? Number(input.min_order_value) : undefined,
    max_discount_amount: input?.max_discount_amount !== undefined ? Number(input.max_discount_amount) : undefined,
    expiry_date: input?.expiry_date,
    usage_limit: input?.usage_limit !== undefined && input?.usage_limit !== null ? Number(input.usage_limit) : undefined,
  });
}

export async function GET(req: NextRequest) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const data = await convexQuery("functions/coupons.js:listCoupons", {});
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
    const data = await convexMutation("functions/coupons.js:createCoupon", sanitizeCouponPayload(body));
    return NextResponse.json({ data }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
