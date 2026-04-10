import { NextRequest, NextResponse } from 'next/server';
import { convexQuery } from '@/lib/convexServer';
import {
  CUSTOMER_SESSION_COOKIE_NAME,
  getClearCustomerSessionCookieOptions,
  hashValue,
} from '@/lib/customerAuth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const token = req.cookies.get(CUSTOMER_SESSION_COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ authenticated: false });
  }

  try {
    const session = await convexQuery<any>('functions/customerAuth:getCustomerSessionByTokenHash', {
      token_hash: hashValue(token),
      now: new Date().toISOString(),
    });

    if (!session) {
      const response = NextResponse.json({ authenticated: false });
      response.cookies.set(CUSTOMER_SESSION_COOKIE_NAME, '', getClearCustomerSessionCookieOptions());
      return response;
    }

    return NextResponse.json({
      authenticated: true,
      email: session.email,
    });
  } catch (error: any) {
    console.error('[customer-auth:session] error:', error);
    return NextResponse.json({ authenticated: false, error: 'Could not validate session.' }, { status: 500 });
  }
}
