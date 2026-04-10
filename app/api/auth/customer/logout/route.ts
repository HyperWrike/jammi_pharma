import { NextRequest, NextResponse } from 'next/server';
import { convexMutation } from '@/lib/convexServer';
import {
  CUSTOMER_SESSION_COOKIE_NAME,
  getClearCustomerSessionCookieOptions,
  hashValue,
} from '@/lib/customerAuth';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const token = req.cookies.get(CUSTOMER_SESSION_COOKIE_NAME)?.value;

  if (token) {
    try {
      await convexMutation('functions/customerAuth:revokeCustomerSession', {
        token_hash: hashValue(token),
        revoked_at: new Date().toISOString(),
      });
    } catch (error) {
      console.error('[customer-auth:logout] revoke error:', error);
    }
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(CUSTOMER_SESSION_COOKIE_NAME, '', getClearCustomerSessionCookieOptions());
  return response;
}
