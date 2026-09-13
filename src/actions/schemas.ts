import { z } from 'astro:schema';
import { INTERESTS, MESSAGE_MAX_LENGTH } from '../copy/inquiry';

/**
 * Wire contract for the one transaction on the site. Strict: unknown keys are rejected, every
 * field is bounded, and `interest` is a closed union — so an oversized paste or an unexpected
 * field fails validation instead of reaching the notification.
 *
 * Five required fields (name, company, work email, interest, message) and four optional ones.
 * Nothing here asks the visitor to report an incident: the refresh replaced the incident-first
 * intake with an inquiry that fits a pilot, an existing stack, or a partner conversation alike.
 * The labels are also what the notification prints, so they must stay in step with the form.
 */

/** Minimum time from island mount to submit. A person typing an address takes longer. */
export const MIN_ELAPSED_MS = 1000;

/** Sanity ceiling: a form open for more than a day is not a live session. */
export const MAX_ELAPSED_MS = 86_400_000;

const required = (max: number, label: string) =>
  z.string().trim().min(1, `${label} is required`).max(max, `${label} must be ${max} characters or fewer`);

const optional = (max: number, label: string) =>
  z
    .string()
    .trim()
    .max(max, `${label} must be ${max} characters or fewer`)
    .optional()
    .transform((value) => (value === '' ? undefined : value));

export const inquirySchema = z
  .object({
    // Required
    name: required(80, 'Name'),
    company: required(120, 'Company'),
    email: z
      .string()
      .trim()
      .min(1, 'Work email is required')
      .max(254, 'Work email must be 254 characters or fewer')
      .email('Enter a work email address we can reply to'),
    interest: z.enum(INTERESTS, { message: 'Choose the interest that fits best' }),
    message: required(MESSAGE_MAX_LENGTH, 'What you would like your team to do, build, or improve'),

    // Optional context
    role: optional(80, 'Role'),
    teamSize: optional(80, 'Approximate team size'),
    aiProducts: optional(300, 'Current systems or AI tools'),
    mspRelationship: optional(160, 'Existing MSP relationship'),

    // Guards. Never rendered as real inputs.
    decoy: z.string().max(0).default(''),
    elapsedMs: z.number().int().min(0).max(MAX_ELAPSED_MS),
  })
  .strict();

export type InquirySubmission = z.infer<typeof inquirySchema>;

/** Field order and visible labels for the notification, matching the form. */
export const FIELD_LABELS: readonly (readonly [keyof InquirySubmission, string])[] = [
  ['name', 'Name'],
  ['company', 'Company'],
  ['email', 'Work email'],
  ['interest', 'Interest'],
  ['message', 'What would you like your team to do, build, or improve?'],
  ['role', 'Role'],
  ['teamSize', 'Approximate team size'],
  ['aiProducts', 'Current systems or AI tools'],
  ['mspRelationship', 'Existing MSP relationship'],
];
