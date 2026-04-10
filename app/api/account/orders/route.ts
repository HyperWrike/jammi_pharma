import { NextRequest, NextResponse } from 'next/server';
import { convexQuery } from '@/lib/convexServer';
import { CUSTOMER_SESSION_COOKIE_NAME, hashValue } from '@/lib/customerAuth';

export const dynamic = 'force-dynamic';

function toInt(value: string | null, fallback: number) {
  const parsed = parseInt(value || '', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get(CUSTOMER_SESSION_COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const session = await convexQuery<any>('functions/customerAuth:getCustomerSessionByTokenHash', {
      token_hash: hashValue(token),
      now: new Date().toISOString(),
    });

    if (!session?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = req.nextUrl.searchParams;
    const page = toInt(searchParams.get('page'), 1);
    const limit = toInt(searchParams.get('limit'), 20);
    const status = searchParams.get('status') || undefined;

    const result = await convexQuery('functions/orders:listOrdersByCustomerEmail', {
      email: String(session.email).toLowerCase(),
      page,
      limit,
      status,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('[account-orders] error:', error);
    return NextResponse.json({ error: error?.message || 'Could not load orders.' }, { status: 500 });
  }
}
