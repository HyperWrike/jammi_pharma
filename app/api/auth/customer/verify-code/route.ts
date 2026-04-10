import { NextRequest, NextResponse } from 'next/server';
import { convexMutation } from '@/lib/convexServer';
import {
  CUSTOMER_SESSION_COOKIE_NAME,
  generateSessionToken,
  getCustomerSessionCookieOptions,
  getSessionExpiryIso,
  hashValue,
  isValidEmail,
  normalizeEmail,
} from '@/lib/customerAuth';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = normalizeEmail(body?.email || '');
    const code = String(body?.code || '').trim();

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    if (!/^\d{6}$/.test(code)) {
      return NextResponse.json({ error: 'Please enter a valid 6-digit code.' }, { status: 400 });
    }

    const verifyResult = await convexMutation<any>('functions/customerAuth:validateLoginCode', {
      email,
      code_hash: hashValue(code),
      now: new Date().toISOString(),
    });

    if (!verifyResult?.ok) {
      return NextResponse.json({ error: 'Invalid or expired code. Please request a new one.' }, { status: 400 });
    }

    const sessionToken = generateSessionToken();
    const tokenHash = hashValue(sessionToken);

    await convexMutation('functions/customerAuth:createCustomerSession', {
      email,
      token_hash: tokenHash,
      expires_at: getSessionExpiryIso(),
    });

    const response = NextResponse.json({ ok: true, email });
    response.cookies.set(CUSTOMER_SESSION_COOKIE_NAME, sessionToken, getCustomerSessionCookieOptions());
    return response;
  } catch (error: any) {
    console.error('[customer-auth:verify-code] error:', error);
    return NextResponse.json({ error: error?.message || 'Could not verify sign-in code.' }, { status: 500 });
  }
}
