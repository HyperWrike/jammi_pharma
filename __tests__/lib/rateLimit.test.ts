// @vitest-environment node
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { rateLimit, getClientIp } from '../../lib/rateLimit';

// The rateLimit module uses a module-level Map. Reset between tests by
// re-importing fresh or by manipulating time. We use vi.useFakeTimers().

describe('rateLimit', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('allows requests within the limit', () => {
    const key = `test-${Math.random()}`;
    const { allowed, remaining } = rateLimit(key, 3, 60_000);
    expect(allowed).toBe(true);
    expect(remaining).toBe(2);
  });

  it('tracks consecutive allowed requests correctly', () => {
    const key = `test-${Math.random()}`;
    rateLimit(key, 3, 60_000);
    rateLimit(key, 3, 60_000);
    const third = rateLimit(key, 3, 60_000);
    expect(third.allowed).toBe(true);
    expect(third.remaining).toBe(0);
  });

  it('blocks requests once the limit is reached', () => {
    const key = `test-${Math.random()}`;
    rateLimit(key, 2, 60_000);
    rateLimit(key, 2, 60_000);
    const blocked = rateLimit(key, 2, 60_000);
    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
  });

  it('allows requests again after the window expires', () => {
    const key = `test-${Math.random()}`;
    rateLimit(key, 1, 60_000);
    // Exhaust limit
    const blocked = rateLimit(key, 1, 60_000);
    expect(blocked.allowed).toBe(false);

    // Advance past the window
    vi.advanceTimersByTime(61_000);

    const fresh = rateLimit(key, 1, 60_000);
    expect(fresh.allowed).toBe(true);
  });

  it('returns a resetAt timestamp in the future', () => {
    const key = `test-${Math.random()}`;
    const now = Date.now();
    const { resetAt } = rateLimit(key, 5, 60_000);
    expect(resetAt).toBeGreaterThanOrEqual(now);
  });

  it('uses independent counters per key', () => {
    const keyA = `test-a-${Math.random()}`;
    const keyB = `test-b-${Math.random()}`;
    rateLimit(keyA, 1, 60_000);
    rateLimit(keyA, 1, 60_000); // keyA exhausted

    const resultB = rateLimit(keyB, 1, 60_000);
    expect(resultB.allowed).toBe(true);
  });
});

describe('getClientIp', () => {
  const makeRequest = (headers: Record<string, string>) =>
    new Request('http://localhost', { headers });

  it('reads x-forwarded-for header', () => {
    const req = makeRequest({ 'x-forwarded-for': '1.2.3.4, 5.6.7.8' });
    expect(getClientIp(req)).toBe('1.2.3.4');
  });

  it('falls back to x-real-ip when x-forwarded-for is absent', () => {
    const req = makeRequest({ 'x-real-ip': '9.9.9.9' });
    expect(getClientIp(req)).toBe('9.9.9.9');
  });

  it('returns "unknown" when no IP header is present', () => {
    const req = makeRequest({});
    expect(getClientIp(req)).toBe('unknown');
  });

  it('strips whitespace from x-forwarded-for entries', () => {
    const req = makeRequest({ 'x-forwarded-for': '  10.0.0.1  , 10.0.0.2' });
    expect(getClientIp(req)).toBe('10.0.0.1');
  });
});
