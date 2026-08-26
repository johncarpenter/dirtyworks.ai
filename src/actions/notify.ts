import type { SendEmailBinding } from '../types/bindings';
import { FIELD_LABELS, type OperatingGapSubmission } from './schemas';

/**
 * Turns a validated submission into one transactional notification, and records a
 * privacy-bounded log line.
 *
 * Cloudflare Email Service is transactional only. Both `text` and `html` are always populated,
 * `replyTo` is the submitter so a reply needs no copy-paste, and the subject identifies the form
 * so a subscription could never be mistaken for a setup request.
 */

export const NOTIFY_TO = 'hello@dirtyworks.ai';
export const NOTIFY_FROM = 'website@dirtyworks.ai';

export type SubmissionOutcome =
  | 'accepted'
  | 'invalid'
  | 'refused'
  | 'rate-limited'
  | 'delivery-failed';

/** Exactly five fields, none derived from user content. No names, addresses, bodies or raw IPs. */
export interface SubmissionLogRecord {
  purpose: 'operating-gap-intake';
  outcome: SubmissionOutcome;
  durationMs: number;
  messageId?: string;
  errorCode?: string;
}

export interface Notification {
  subject: string;
  text: string;
  html: string;
}

const ABSENT = 'not provided';

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export const buildNotification = (submission: OperatingGapSubmission): Notification => {
  const rows = FIELD_LABELS.map(([key, label]) => {
    const raw = submission[key];
    const value = typeof raw === 'string' && raw.length > 0 ? raw : ABSENT;
    return { label, value };
  });

  const needs = submission.needs.length > 0 ? submission.needs.join(', ') : 'none selected';

  const textBody = [
    'OPERATING GAP / INTAKE',
    '',
    ...rows.map(({ label, value }) => `${label}\n  ${value}`),
    `What do you need?\n  ${needs}`,
    '',
    'Submitted from the dirtyworks.ai website form. Reply directly to reach the sender.',
  ].join('\n');

  const htmlBody = [
    '<h1>Operating gap / intake</h1>',
    '<dl>',
    ...rows.map(
      ({ label, value }) =>
        `<dt><strong>${escapeHtml(label)}</strong></dt><dd>${escapeHtml(value)}</dd>`,
    ),
    `<dt><strong>What do you need?</strong></dt><dd>${escapeHtml(needs)}</dd>`,
    '</dl>',
    '<p>Submitted from the dirtyworks.ai website form. Reply directly to reach the sender.</p>',
  ].join('\n');

  return {
    subject: `OPERATING GAP / INTAKE — ${submission.company}`,
    text: textBody,
    html: htmlBody,
  };
};

/**
 * Sends the notification. Returns the platform `messageId`, which is the only correlation handle
 * into Email Sending metrics — and the only thing worth keeping afterwards.
 */
export const sendNotification = async (
  email: SendEmailBinding,
  submission: OperatingGapSubmission,
): Promise<string> => {
  const notification = buildNotification(submission);

  const result = await email.send({
    from: { email: NOTIFY_FROM, name: 'Dirtyworks.ai website' },
    to: NOTIFY_TO,
    replyTo: { email: submission.email, name: submission.name },
    subject: notification.subject,
    text: notification.text,
    html: notification.html,
  });

  return result.messageId;
};

export const logSubmission = (record: SubmissionLogRecord): void => {
  console.log(JSON.stringify(record));
};
