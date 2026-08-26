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
import { hrefFor } from '../routes';

export const HERO = {
  folio: 'About / 01 — Operator-led',
  /** the display heading is set as two lines; `lineTwoEmphasis` takes the orange treatment */
  lineOne: 'Built by an operator.',
  lineTwoBefore: 'For the work ',
  lineTwoEmphasis: 'after the demo',
  lineTwoAfter: '.',
  support:
    'Who we are, and the three ways to reach us: email, the operating-gap intake, or a partner ' +
    'enquiry.',
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
  heading: 'Three ways in.',
  support:
    'Email for anything general. The intake form when there is a specific operating event to ' +
    'look at. The partner route if you run an MSP and want a seam written down.',
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
    label: 'Operating gap',
    value: 'Map your AI stack',
    href: hrefFor('start'),
    body:
      'One recent event is enough: missing access, an unmanaged account, abandoned licences, an ' +
      'integration failure, unexpected spend, or an answer nobody could verify. We read it and ' +
      'reply with what we would look at first.',
    detail: 'Structured intake',
  },
  {
    label: 'MSP partners',
    value: 'Design a partner pilot',
    href: hrefFor('msps'),
    body: 'MSPs bring one client, one problem, and the seam they want written down.',
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
    'alongside traditional MSPs.',
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
  { index: '02', text: 'Customer ownership is the default.' },
  { index: '03', text: 'Experienced employees are not bottlenecks to remove.' },
  { index: '04', text: 'Unsupported answers should fail visibly.' },
  { index: '05', text: 'Compliance claims require evidence and accountable specialists.' },
  { index: '06', text: 'Automation follows understanding.' },
  { index: '07', text: 'Exit is part of deployment.' },
];

/* ------------------------------------------------------------------ 05 / Conversion */

export const CTA = {
  folio: '05 / Conversion',
  heading: 'Bring us the operating problem. Not the AI pitch.',
  support:
    'We are more useful when the conversation starts with what broke than with what is possible.',
  primaryLabel: 'Map your AI stack',
  secondaryLabel: 'Read the operating method',
} as const;
