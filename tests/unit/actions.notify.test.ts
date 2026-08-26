import { describe, expect, it, vi } from 'vitest';
import { buildNotification, logSubmission, sendNotification } from '../../src/actions/notify';
import { operatingGapSchema, type OperatingGapSubmission } from '../../src/actions/schemas';

const submission: OperatingGapSubmission = operatingGapSchema.parse({
  name: 'Dana Okonkwo',
  company: 'Northline Engineering',
  role: 'Operations lead',
  email: 'dana@northline.ca',
  intent: 'Get a new hire access to the assistant the team already uses.',
  event: 'Two weeks in, nobody could say who owns the account.',
  system: 'Workforce assistant',
  owner: 'Nobody',
  mspRelationship: 'Foothills IT',
  needs: ['user administration', 'governance'],
  decoy: '',
  elapsedMs: 4200,
});

describe('notification', () => {
  it('identifies the form and the company in the subject', () => {
    expect(buildNotification(submission).subject).toBe(
      'OPERATING GAP / INTAKE — Northline Engineering',
    );
  });

  it('carries every submitted value under its form label', () => {
    const { text } = buildNotification(submission);
    for (const label of [
      'Name',
      'Company',
      'Role',
      'Work email',
      'What was somebody trying to do?',
      'What happened?',
      'Product or system involved',
      'Who owns it today, if anyone?',
      'Existing MSP relationship',
    ]) {
      expect(text, label).toContain(label);
    }
    expect(text).toContain('Northline Engineering');
    expect(text).toContain('nobody could say who owns the account');
    expect(text).toContain('Foothills IT');
  });

  it('lists the selected needs', () => {
    expect(buildNotification(submission).text).toContain('user administration, governance');
  });

  it('marks omitted optional context as absent rather than leaving a blank label', () => {
    const { text } = buildNotification(submission);
    expect(text).toContain('Approximate company size\n  not provided');
  });

  it('always populates both text and html', () => {
    const notification = buildNotification(submission);
    expect(notification.text.length).toBeGreaterThan(0);
    expect(notification.html).toContain('<dl>');
  });

  it('escapes html so submitted content cannot inject markup', () => {
    const hostile = operatingGapSchema.parse({
      ...submission,
      company: '<script>alert(1)</script>',
      needs: [],
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
      purpose: 'operating-gap-intake',
      outcome: 'accepted',
      durationMs: 42,
      messageId: 'msg_123',
    });

    const line = spy.mock.calls[0]?.[0] as string;
    spy.mockRestore();

    expect(JSON.parse(line)).toEqual({
      purpose: 'operating-gap-intake',
      outcome: 'accepted',
      durationMs: 42,
      messageId: 'msg_123',
    });

    for (const leak of [
      'Dana',
      'dana@northline.ca',
      'Northline',
      'Foothills',
      'assistant',
      '203.0.113',
    ]) {
      expect(line, leak).not.toContain(leak);
    }
  });
});
