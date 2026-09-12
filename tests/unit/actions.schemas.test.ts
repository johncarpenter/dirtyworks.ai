import { describe, expect, it } from 'vitest';
import { MIN_ELAPSED_MS, inquirySchema } from '../../src/actions/schemas';

const valid = {
  name: 'Dana Okonkwo',
  company: 'Northline Engineering',
  email: 'dana@northline.ca',
  interest: 'workspace-pilot',
  message: 'Turn our new-hire setup process into a checklist the team can keep current.',
  decoy: '',
  elapsedMs: MIN_ELAPSED_MS + 500,
};

describe('inquiry schema', () => {
  it('accepts a complete submission', () => {
    const result = inquirySchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it('requires exactly the five required fields', () => {
    for (const field of ['name', 'company', 'email', 'message']) {
      const result = inquirySchema.safeParse({ ...valid, [field]: '' });
      expect(result.success, field).toBe(false);
    }
    const { interest, ...withoutInterest } = valid;
    expect(inquirySchema.safeParse(withoutInterest).success).toBe(false);
  });

  /* Nobody has to report an incident to express interest. */
  it('does not require a task, an event, a system, or an owner', () => {
    const result = inquirySchema.safeParse(valid);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).not.toHaveProperty('event');
      expect(result.data).not.toHaveProperty('system');
    }
  });

  it('accepts every interest, including the neutral one', () => {
    for (const interest of ['workspace-pilot', 'existing-ai', 'msp-partner', 'not-sure']) {
      expect(inquirySchema.safeParse({ ...valid, interest }).success, interest).toBe(true);
    }
  });

  it('rejects an interest outside the closed set', () => {
    expect(inquirySchema.safeParse({ ...valid, interest: 'incident' }).success).toBe(false);
  });

  it('rejects an unusable email address', () => {
    expect(inquirySchema.safeParse({ ...valid, email: 'dana@' }).success).toBe(false);
    expect(inquirySchema.safeParse({ ...valid, email: 'dana' }).success).toBe(false);
  });

  it('holds the message to 1,000 characters instead of silently truncating it', () => {
    expect(inquirySchema.safeParse({ ...valid, message: 'x'.repeat(1000) }).success).toBe(true);
    expect(inquirySchema.safeParse({ ...valid, message: 'x'.repeat(1001) }).success).toBe(false);
  });

  it('rejects unknown keys', () => {
    const result = inquirySchema.safeParse({ ...valid, budget: '50000' });
    expect(result.success).toBe(false);
  });

  it('accepts the optional context and normalises empty values to undefined', () => {
    const full = inquirySchema.safeParse({
      ...valid,
      role: 'Operations lead',
      teamSize: '12',
      aiProducts: 'Microsoft 365 Copilot',
      mspRelationship: 'Foothills IT',
    });
    expect(full.success).toBe(true);

    const blank = inquirySchema.safeParse({ ...valid, teamSize: '' });
    expect(blank.success).toBe(true);
    if (blank.success) expect(blank.data.teamSize).toBeUndefined();
  });

  it('refuses a filled decoy field', () => {
    const result = inquirySchema.safeParse({ ...valid, decoy: 'https://spam.example' });
    expect(result.success).toBe(false);
  });

  it('trims surrounding whitespace', () => {
    const result = inquirySchema.safeParse({ ...valid, name: '  Dana Okonkwo  ' });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.name).toBe('Dana Okonkwo');
  });
});
