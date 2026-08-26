import { describe, expect, it } from 'vitest';
import { failsHoneypot, hashClientKey, tooFast, withinRateLimit } from '../../src/actions/guards';
import { MIN_ELAPSED_MS } from '../../src/actions/schemas';

describe('abuse guards', () => {
  it('treats a filled decoy as a bot', () => {
    expect(failsHoneypot('https://spam.example')).toBe(true);
    expect(failsHoneypot('   ')).toBe(false);
    expect(failsHoneypot('')).toBe(false);
  });

  it('refuses a submission faster than a person can type', () => {
    expect(tooFast(50)).toBe(true);
    expect(tooFast(MIN_ELAPSED_MS - 1)).toBe(true);
    expect(tooFast(MIN_ELAPSED_MS)).toBe(false);
    expect(tooFast(9_000)).toBe(false);
  });

  it('hashes the client key and never returns the address', async () => {
    const key = await hashClientKey('203.0.113.42');
    expect(key).toMatch(/^[0-9a-f]{64}$/);
    expect(key).not.toContain('203.0.113.42');
  });

  it('hashes deterministically, so the limiter counts the same client together', async () => {
    expect(await hashClientKey('203.0.113.42')).toBe(await hashClientKey('203.0.113.42'));
    expect(await hashClientKey('203.0.113.42')).not.toBe(await hashClientKey('203.0.113.43'));
  });

  it('still produces a key when the address header is absent', async () => {
    expect(await hashClientKey(null)).toMatch(/^[0-9a-f]{64}$/);
  });

  it('allows the request when no limiter is bound, so local dev works', async () => {
    expect(await withinRateLimit(undefined, 'key')).toBe(true);
  });

  it('blocks when the limiter says no', async () => {
    const limiter = { limit: async () => ({ success: false }) };
    expect(await withinRateLimit(limiter, 'key')).toBe(false);
  });

  it('fails closed when the limiter throws', async () => {
    const limiter = {
      limit: async () => {
        throw new Error('rate limit backend unavailable');
      },
    };
    expect(await withinRateLimit(limiter, 'key')).toBe(false);
  });

  it('passes the hashed key through to the limiter', async () => {
    const seen: string[] = [];
    const limiter = {
      limit: async ({ key }: { key: string }) => {
        seen.push(key);
        return { success: true };
      },
    };
    const key = await hashClientKey('198.51.100.7');
    await withinRateLimit(limiter, key);
    expect(seen).toEqual([key]);
  });
});
