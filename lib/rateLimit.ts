/**
 * Sliding window in-memory rate limiter.
 * Works per-IP, per-route. Resets automatically as the window slides.
 *
 * NOTE: This is process-local. For multi-instance deployments (e.g. multiple
 * Vercel serverless instances), use Upstash Redis instead. For single-server
 * or preview deployments this is fine.
 */

interface RateLimitEntry {
  timestamps: number[];
}

const store = new Map<string, RateLimitEntry>();

/**
 * @param key      Unique key (e.g. `${route}:${ip}`)
 * @param limit    Maximum requests allowed within the window
 * @param windowMs Window duration in milliseconds
 * @returns        `{ allowed: boolean, remaining: number, resetAt: number }`
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const entry = store.get(key) ?? { timestamps: [] };

  // Slide the window — drop timestamps older than windowMs
  entry.timestamps = entry.timestamps.filter((t) => now - t < windowMs);

  const allowed = entry.timestamps.length < limit;

  if (allowed) {
    entry.timestamps.push(now);
  }

  store.set(key, entry);

  // Oldest timestamp in the current window + windowMs = reset time
  const oldest = entry.timestamps[0] ?? now;
  const resetAt = oldest + windowMs;
  const remaining = Math.max(0, limit - entry.timestamps.length);

  return { allowed, remaining, resetAt };
}

/**
 * Get IP from Next.js Request headers.
 * Falls back to 'unknown' if no header is present.
 */
export function getClientIp(req: Request): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  );
}
