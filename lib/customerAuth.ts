import { createHash, randomBytes } from 'crypto';

export const CUSTOMER_SESSION_COOKIE_NAME = 'jammi_customer_session';

const OTP_TTL_MS = 10 * 60 * 1000;
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000;
const OTP_LENGTH = 6;

export function normalizeEmail(email: string): string {
  return String(email || '').trim().toLowerCase();
}

export function isValidEmail(email: string): boolean {
  const normalized = normalizeEmail(email);
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized);
}

function getAuthSecret(): string {
  return (
    process.env.CUSTOMER_AUTH_SECRET ||
    process.env.JAMMI_BYPASS_TOKEN ||
    'jammi-customer-auth-dev-secret'
  );
}

export function hashValue(value: string): string {
  return createHash('sha256').update(`${getAuthSecret()}:${value}`).digest('hex');
}

export function generateOtpCode(): string {
  const min = 10 ** (OTP_LENGTH - 1);
  const max = 10 ** OTP_LENGTH - 1;
  return String(Math.floor(min + Math.random() * (max - min + 1)));
}

export function generateSessionToken(): string {
  return randomBytes(32).toString('hex');
}

export function getOtpExpiryIso(): string {
  return new Date(Date.now() + OTP_TTL_MS).toISOString();
}

export function getSessionExpiryIso(): string {
  return new Date(Date.now() + SESSION_TTL_MS).toISOString();
}

export function getSessionCookieMaxAgeSeconds(): number {
  return Math.floor(SESSION_TTL_MS / 1000);
}

export function getCustomerSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: getSessionCookieMaxAgeSeconds(),
  };
}

export function getClearCustomerSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 0,
  };
}
