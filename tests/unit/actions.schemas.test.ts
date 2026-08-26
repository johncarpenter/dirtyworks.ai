import { describe, expect, it } from 'vitest';
import { MIN_ELAPSED_MS, operatingGapSchema } from '../../src/actions/schemas';

const valid = {
  name: 'Dana Okonkwo',
  company: 'Northline Engineering',
  role: 'Operations lead',
  email: 'dana@northline.ca',
  intent: 'Get a new hire access to the assistant the team already uses.',
  event: 'Two weeks in, nobody could say who owns the account.',
  system: 'Workforce assistant',
  owner: 'Nobody',
  needs: ['user administration', 'governance'],
  decoy: '',
  elapsedMs: MIN_ELAPSED_MS + 500,
};

describe('operating gap schema', () => {
  it('accepts a complete submission', () => {
    const result = operatingGapSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it('treats every required field as required', () => {
    for (const field of ['name', 'company', 'role', 'email', 'intent', 'event', 'system', 'owner']) {
      const result = operatingGapSchema.safeParse({ ...valid, [field]: '' });
      expect(result.success, field).toBe(false);
    }
  });

  it('rejects an unusable email address', () => {
    expect(operatingGapSchema.safeParse({ ...valid, email: 'dana@' }).success).toBe(false);
    expect(operatingGapSchema.safeParse({ ...valid, email: 'dana' }).success).toBe(false);
  });

  it('rejects an over-long field instead of silently truncating it', () => {
    const result = operatingGapSchema.safeParse({ ...valid, event: 'x'.repeat(1001) });
    expect(result.success).toBe(false);
  });

  it('rejects unknown keys', () => {
    const result = operatingGapSchema.safeParse({ ...valid, budget: '50000' });
    expect(result.success).toBe(false);
  });

  it('rejects a need outside the closed set', () => {
    const result = operatingGapSchema.safeParse({ ...valid, needs: ['world domination'] });
    expect(result.success).toBe(false);
  });

  it('defaults an absent need selection to empty rather than failing', () => {
    const { needs, ...withoutNeeds } = valid;
    const result = operatingGapSchema.safeParse(withoutNeeds);
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.needs).toEqual([]);
  });

  it('normalises empty optional context to undefined', () => {
    const result = operatingGapSchema.safeParse({ ...valid, companySize: '' });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.companySize).toBeUndefined();
  });

  it('refuses a filled decoy field', () => {
    const result = operatingGapSchema.safeParse({ ...valid, decoy: 'https://spam.example' });
    expect(result.success).toBe(false);
  });

  it('trims surrounding whitespace', () => {
    const result = operatingGapSchema.safeParse({ ...valid, name: '  Dana Okonkwo  ' });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.name).toBe('Dana Okonkwo');
  });
});
