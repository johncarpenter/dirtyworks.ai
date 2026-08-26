import { z } from 'astro:schema';

/**
 * Wire contract for the one transaction on the site. Strict: unknown keys are rejected, every
 * field is bounded, and `needs` is a closed union — so an oversized paste or an unexpected field
 * fails validation instead of reaching the notification.
 *
 * Field names and labels track data-model.md; the labels are also what the notification prints,
 * so they must stay in step with the form.
 */

export const NEEDS = [
  'product selection',
  'user administration',
  'training',
  'support',
  'integration',
  'governance',
  'monitoring',
  'cost control',
  'knowledge',
  'msp partnership',
] as const;

export type Need = (typeof NEEDS)[number];

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

export const operatingGapSchema = z
  .object({
    // Required — identity and the event
    name: required(80, 'Name'),
    company: required(120, 'Company'),
    role: required(80, 'Role'),
    email: z
      .string()
      .trim()
      .min(1, 'Work email is required')
      .max(254, 'Work email must be 254 characters or fewer')
      .email('Enter a work email address we can reply to'),
    intent: required(1000, 'What was somebody trying to do'),
    event: required(1000, 'What happened'),
    system: required(160, 'Product or system involved'),
    owner: required(160, 'Who owns it today'),

    // Optional context
    companySize: optional(80, 'Approximate company size'),
    aiProducts: optional(300, 'Current AI products or categories'),
    peopleUsing: optional(80, 'People using them'),
    environment: optional(160, 'Existing environment'),
    mspRelationship: optional(160, 'Existing MSP relationship'),
    contactPreference: optional(160, 'Preferred way and time to respond'),
    needs: z.array(z.enum(NEEDS)).max(NEEDS.length).default([]),

    // Guards. Never rendered as real inputs.
    decoy: z.string().max(0).default(''),
    elapsedMs: z.number().int().min(0).max(MAX_ELAPSED_MS),
  })
  .strict();

export type OperatingGapSubmission = z.infer<typeof operatingGapSchema>;

/** Field order and visible labels for the notification, matching the form. */
export const FIELD_LABELS: readonly (readonly [keyof OperatingGapSubmission, string])[] = [
  ['name', 'Name'],
  ['company', 'Company'],
  ['role', 'Role'],
  ['email', 'Work email'],
  ['intent', 'What was somebody trying to do?'],
  ['event', 'What happened?'],
  ['system', 'Product or system involved'],
  ['owner', 'Who owns it today, if anyone?'],
  ['companySize', 'Approximate company size'],
  ['aiProducts', 'Current AI products or categories'],
  ['peopleUsing', 'People using them'],
  ['environment', 'Existing environment'],
  ['mspRelationship', 'Existing MSP relationship'],
  ['contactPreference', 'Preferred way and time to respond'],
];
