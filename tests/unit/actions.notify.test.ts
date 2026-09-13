import { describe, expect, it, vi } from 'vitest';
import { buildNotification, logSubmission, sendNotification } from '../../src/actions/notify';
import { inquirySchema, type InquirySubmission } from '../../src/actions/schemas';

const submission: InquirySubmission = inquirySchema.parse({
  name: 'Dana Okonkwo',
  company: 'Northline Engineering',
  email: 'dana@northline.ca',
  interest: 'workspace-pilot',
  message: 'Turn our new-hire setup process into a checklist the team can keep current.',
  role: 'Operations lead',
  mspRelationship: 'Foothills IT',
  decoy: '',
  elapsedMs: 4200,
});

describe('notification', () => {
  it('identifies the form, the interest and the company in the subject', () => {
    expect(buildNotification(submission).subject).toBe(
      'WEBSITE INQUIRY / WORKSPACE PILOT — Northline Engineering',
    );
  });

  it('carries every submitted value under its form label', () => {
    const { text } = buildNotification(submission);
    for (const label of [
      'Name',
      'Company',
      'Work email',
      'Interest',
      'What would you like your team to do, build, or improve?',
      'Role',
      'Existing MSP relationship',
    ]) {
      expect(text, label).toContain(label);
    }
    expect(text).toContain('Northline Engineering');
    expect(text).toContain('checklist the team can keep current');
    expect(text).toContain('Foothills IT');
  });

  it('prints the interest as its visible label, not its wire value', () => {
    const { text } = buildNotification(submission);
    expect(text).toContain('Interest\n  Workspace pilot');
    expect(text).not.toContain('workspace-pilot');
  });

  it('marks omitted optional context as absent rather than leaving a blank label', () => {
    const { text } = buildNotification(submission);
    expect(text).toContain('Approximate team size\n  not provided');
  });

  it('always populates both text and html', () => {
    const notification = buildNotification(submission);
    expect(notification.text.length).toBeGreaterThan(0);
    expect(notification.html).toContain('<dl>');
  });

  it('escapes html so submitted content cannot inject markup', () => {
    const hostile = inquirySchema.parse({
      ...submission,
      company: '<script>alert(1)</script>',
    });
    expect(buildNotification(hostile).html).not.toContain('<script>');
    expect(buildNotification(hostile).html).toContain('&lt;script&gt;');
  });

  it('sets the submitter as the reply path and returns the platform message id', async () => {
    const sent: unknown[] = [];
    const email = {
      send: async (message: unknown) => {
        sent.push(message);
        return { messageId: 'msg_123' };
      },
    };

    const messageId = await sendNotification(email, submission);

    expect(messageId).toBe('msg_123');
    expect(sent[0]).toMatchObject({
      to: 'hello@dirtyworks.ai',
      replyTo: { email: 'dana@northline.ca', name: 'Dana Okonkwo' },
    });
  });

  it('propagates a delivery failure instead of reporting success', async () => {
    const email = {
      send: async () => {
        throw Object.assign(new Error('rejected'), { code: 'E_DELIVERY_FAILED' });
      },
    };
    await expect(sendNotification(email, submission)).rejects.toThrow('rejected');
  });
});

describe('logging', () => {
  it('records purpose, outcome and duration only — never submitted content', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});

    logSubmission({
      purpose: 'website-inquiry',
      outcome: 'accepted',
      durationMs: 42,
      messageId: 'msg_123',
    });

    const line = spy.mock.calls[0]?.[0] as string;
    spy.mockRestore();

    expect(JSON.parse(line)).toEqual({
      purpose: 'website-inquiry',
      outcome: 'accepted',
      durationMs: 42,
      messageId: 'msg_123',
    });

    for (const leak of [
      'Dana',
      'dana@northline.ca',
      'Northline',
      'Foothills',
      'checklist',
      '203.0.113',
    ]) {
      expect(line, leak).not.toContain(leak);
    }
  });
});
