import { NextRequest, NextResponse } from 'next/server';
import { convexQuery, convexMutation } from '@/lib/convexServer';
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

export async function GET(req: NextRequest) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();
  try {
    const searchParams = req.nextUrl.searchParams;
    const rawStatus = searchParams.get('status') || undefined;
    const status = rawStatus === 'all' ? undefined : rawStatus;
    const product = searchParams.get('product') || undefined;

    const result = await convexQuery("functions/reviews:listReviews", cleanArgs({ status, productId: product }));
    return NextResponse.json({ data: result || [], total: (result || []).length });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();
  try {
    const body = await req.json();
    const result = await convexMutation("functions/reviews:createReview", cleanArgs(body));
    return NextResponse.json({ data: result }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
