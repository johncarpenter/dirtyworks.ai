/* /about content — the about-and-contact page. Copy is drawn from
   mockups/design_files/About.dc.html; headings are authored in sentence case and uppercased by
   CSS (scripts/check-content.ts RULE-7).

   Nothing here names a founder, a company history, a credential or a photograph. Those are
   outstanding sponsor inputs, held in src/copy/placeholders.ts as FOUNDER_PROFILE. The prototype
   answered that gap with an OPEN GAP annotation panel and an unpublished route; this page answers
   it by publishing only what is true — what the company is, how to reach it, and what it believes
   — and leaving the founder band unwritten until the record exists.

   Every contact detail below resolves to a real destination: the address in src/copy/site.ts, the
   intake form on /start, the partner route on /msps. No phone number, no street address and no
   response-time promise are invented to fill the register. */
import { CONTACT_EMAIL, LOCATION } from '../site';
import { hrefFor, inquiryHref } from '../routes';

export const HERO = {
  folio: 'About / 01 — Operator-led',
  /** the display heading is set as two lines; `lineTwoEmphasis` takes the orange treatment */
  lineOne: 'Built by an operator.',
  lineTwoBefore: 'For the work ',
  lineTwoEmphasis: 'after the demo',
  lineTwoAfter: '.',
  support:
    'Who we are, and the ways to reach us: email, a workspace pilot inquiry, a conversation ' +
    'about the AI tools you already have, or a partner enquiry.',
} as const;

/* ------------------------------------------------------------------ 02 / Contact */

export interface ContactRow {
  /** mono label column */
  label: string;
  /** the destination itself, rendered as a link when `href` is set */
  value: string;
  href?: string;
  /** what the channel is for */
  body: string;
  /** mono classification column */
  detail: string;
}

export const CONTACT = {
  folio: '02 / How to reach us',
  heading: 'Four ways in.',
  support:
    'Email for anything general. The pilot inquiry when there is a team and a piece of work you ' +
    'want to improve. The existing-tools route when the AI is already in the building. The ' +
    'partner route if you run an MSP and want a seam written down.',
} as const;

export const CONTACT_ROWS: readonly ContactRow[] = [
  {
    label: 'Email',
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    body: 'Questions, press, and anything that does not fit a form.',
    detail: 'Direct / general',
  },
  {
    label: 'Workspace pilot',
    value: 'Discuss a workspace pilot',
    href: inquiryHref('workspace-pilot'),
    body:
      'Bring one team, one recurring task, or one tool you wish existed. We will discuss fit and ' +
      'what a first scope could include.',
    detail: 'Pilot inquiry',
  },
  {
    label: 'Existing AI tools',
    value: 'Discuss your existing tools',
    href: inquiryHref('existing-ai'),
    body:
      'If your team already uses AI products, we can help manage accounts, onboarding, ' +
      'integrations, support, and costs. A recent problem is welcome, not required.',
    detail: 'Managed services',
  },
  {
    label: 'MSP partners',
    value: 'Read the partner models',
    href: hrefFor('msps'),
    body: 'MSPs bring one client, one defined pilot, and the seam they want written down.',
    detail: 'Partner route',
  },
  {
    label: 'Where we are',
    value: LOCATION,
    body: 'We work with Alberta businesses directly, and alongside traditional MSPs.',
    detail: 'Mountain Time',
  },
];

/* ------------------------------------------------------------------ 03 / The company */

export const COMPANY_FOLIO = '03 / The company';

/** Three paragraphs. The first is the lead; the other two run at body size. */
export const COMPANY_PARAGRAPHS: readonly string[] = [
  'Dirtyworks.ai was founded by an experienced CTO and company operator who has spent a career ' +
    'working across technology, people, risk, budgets, vendors, and the less visible work ' +
    'required to keep systems useful after launch.',
  'The company exists because smaller businesses increasingly depend on AI but cannot always ' +
    'justify building a complete internal AI operations function. They need more than a product ' +
    'recommendation. They need somebody accountable for deployment, administration, training, ' +
    'integration, controls, support, monitoring, cost, and change.',
  'Dirtyworks.ai is being built as that operating partner — directly for Alberta businesses and ' +
    'alongside traditional MSPs. Its featured offer is a managed AI workspace pilot: a Cloudflare ' +
    'OS environment customized for one team, with onboarding and support from Dirtyworks.ai, ' +
    'alongside management of the AI tools a business already has.',
];

/* ------------------------------------------------------------------ 04 / Operating beliefs */

export interface Belief {
  /** two-digit index, authored rather than derived so the band reads as a numbered record */
  index: string;
  text: string;
}

export const BELIEFS_FOLIO = '04 / Operating beliefs';

export const BELIEFS: readonly Belief[] = [
  { index: '01', text: 'A licence is not an operating model.' },
  { index: '02', text: 'Account control and handover are agreed before deployment.' },
  { index: '03', text: 'Experienced employees are not bottlenecks to remove.' },
  { index: '04', text: 'Unsupported answers should fail visibly.' },
  { index: '05', text: 'Compliance claims require evidence and accountable specialists.' },
  { index: '06', text: 'Automation follows understanding.' },
  { index: '07', text: 'Exit is part of deployment.' },
];

/* ------------------------------------------------------------------ 05 / Conversion */

export const CTA = {
  folio: '05 / Conversion',
  heading: 'Bring the work you want to improve.',
  support: 'We will help define a practical place to start.',
  primaryLabel: 'Discuss a workspace pilot',
  secondaryLabel: 'Read how it works',
} as const;
