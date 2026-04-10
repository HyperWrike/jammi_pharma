import { NextRequest, NextResponse } from 'next/server';
import { convexMutation, convexQuery } from '@/lib/convexServer';
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

function validatePassword(password: string) {
  return typeof password === 'string' && password.trim().length >= 8;
}

async function createSession(email: string) {
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
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const action = String(body?.action || 'login');
    const email = normalizeEmail(body?.email || '');
    const password = String(body?.password || '');

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    if (!validatePassword(password)) {
      return NextResponse.json({ error: 'Password must be at least 8 characters long.' }, { status: 400 });
    }

    if (action === 'setup') {

      await convexMutation('functions/customerAuth:upsertCustomerPassword', {
        email,
        password_hash: hashValue(password),
        last_set_by_order_number: undefined,
      });

      return await createSession(email);
    }

    const passwordRecord = await convexQuery<any>('functions/customerAuth:getCustomerPasswordByEmail', { email });
    if (!passwordRecord) {
      return NextResponse.json(
        { error: 'No password is set for this email yet. Use the Set Password tab first.' },
        { status: 404 }
      );
    }

    if (passwordRecord.password_hash !== hashValue(password)) {
      return NextResponse.json({ error: 'Incorrect password.' }, { status: 400 });
    }

    return await createSession(email);
  } catch (error: any) {
    console.error('[customer-auth:password] error:', error);
    return NextResponse.json({ error: error?.message || 'Could not sign in with password.' }, { status: 500 });
  }
}