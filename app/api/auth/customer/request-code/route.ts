import { NextRequest, NextResponse } from 'next/server';
import { convexAction, convexMutation } from '@/lib/convexServer';
import { getClientIp, rateLimit } from '@/lib/rateLimit';
import {
  generateOtpCode,
  getOtpExpiryIso,
  hashValue,
  isValidEmail,
  normalizeEmail,
} from '@/lib/customerAuth';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const ipLimit = rateLimit(`customer-auth:request:${ip}`, 5, 60_000);
  if (!ipLimit.allowed) {
    return NextResponse.json({ error: 'Too many requests. Please try again shortly.' }, { status: 429 });
  }

  try {
    const body = await req.json();
    const email = normalizeEmail(body?.email || '');

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const emailLimit = rateLimit(`customer-auth:request-email:${email}`, 3, 5 * 60_000);
    if (!emailLimit.allowed) {
      return NextResponse.json({ error: 'Please wait before requesting another code.' }, { status: 429 });
    }

    const otp = generateOtpCode();
    const codeHash = hashValue(otp);
    const expiresAt = getOtpExpiryIso();

    await convexMutation('functions/customerAuth:createLoginCode', {
      email,
      code_hash: codeHash,
      expires_at: expiresAt,
    });

    const expiresInMinutes = 10;

    const sendResult = await convexAction<any>('functions/customerAuth:sendLoginCodeEmail', {
      email,
      otp,
      expiresInMinutes,
    });

    if (sendResult?.ok === false) {
      return NextResponse.json(
        { error: sendResult.message || 'We could not send the sign-in code to that email address.' },
        { status: 400 }
      );
    }

    return NextResponse.json({ ok: true, message: 'A sign-in code has been sent to your email.' });
  } catch (error: any) {
    console.error('[customer-auth:request-code] error:', error);
    return NextResponse.json({ error: error?.message || 'Could not process your request.' }, { status: 500 });
  }
}
