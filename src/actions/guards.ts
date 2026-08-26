import { MIN_ELAPSED_MS } from './schemas';

/**
 * Four layers of abuse handling, no CAPTCHA and no third-party widget: strict schemas (see
 * schemas.ts), a hidden decoy field, a submit-timing floor, and per-client rate limiting.
 *
 * A third-party challenge would add a script and an accessibility surface to a site that
 * otherwise loads almost no JavaScript. Revisit only if observed abuse justifies the cost.
 */

export type GuardOutcome = 'pass' | 'refuse' | 'rate-limited';

/** Non-empty decoy means a script filled every input it could find. */
export const failsHoneypot = (decoy: string): boolean => decoy.trim().length > 0;

/** Scripted posts usually do not wait. Real submissions take a person longer than a second. */
export const tooFast = (elapsedMs: number): boolean => elapsedMs < MIN_ELAPSED_MS;

/**
 * Rate-limit key. Hashed so no raw address is retained anywhere, including in memory longer than
 * the request.
 *
 * Known trade-off (research.md D-09): Cloudflare advises against IP-derived keys because shared
 * IPs, mobile networks and privacy proxies make them inaccurate, and limits apply per Cloudflare
 * location rather than globally. There is no account or session to key on instead, and a cookie
 * would be worse for privacy and trivially bypassed. The limiter is therefore a coarse damper;
 * the decoy and the timing floor are the primary screens.
 */
export const hashClientKey = async (clientIp: string | null): Promise<string> => {
  const source = clientIp && clientIp.length > 0 ? clientIp : 'unknown-client';
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(source));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
};

interface RateLimiter {
  limit(options: { key: string }): Promise<{ success: boolean }>;
}

/**
 * Absence and failure mean different things on purpose. A missing binding is a development
 * condition — `astro dev` has no limiter, and the form must still work. A binding that throws is a
 * signal, so the request is blocked: fail closed.
 */
export const withinRateLimit = async (
  limiter: RateLimiter | undefined,
  key: string,
): Promise<boolean> => {
  if (!limiter) return true;

  try {
    const { success } = await limiter.limit({ key });
    return success;
  } catch {
    return false;
  }
};
