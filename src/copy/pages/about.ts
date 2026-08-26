/* /about content. Copy is verbatim from mockups/design_files/About.dc.html; headings are authored
   in sentence case and uppercased by CSS (scripts/check-content.ts RULE-7).

   Nothing here names a founder, a company history, a credential, or a photograph. Those are
   outstanding sponsor inputs, held in src/copy/placeholders.ts as FOUNDER_PROFILE, and the
   route stays unpublished until they arrive. The paragraphs below are the provisional copy the
   prototype authored around that gap — they describe the company, never a person. */

export const HERO = {
  folio: 'About / 01 — Operator-led',
  /** the display heading is set as two lines; `lineTwoEmphasis` takes the orange treatment */
  lineOne: 'Built by an operator.',
  lineTwoBefore: 'For the work ',
  lineTwoEmphasis: 'after the demo',
  lineTwoAfter: '.',
} as const;

export const FOUNDER_FOLIO = '02 / Provisional founder copy';

/** Three paragraphs. The first is the lead; the other two run at body size. */
export const FOUNDER_PARAGRAPHS: readonly string[] = [
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

/** Header of the sponsor-input panel. The list itself comes from the placeholder registry. */
export const FOUNDER_GAP_TITLE = 'Sponsor inputs required';

/** Closes the panel: why the gap is held open rather than filled with adjectives. */
export const FOUNDER_GAP_NOTE = 'Relevant operating evidence is stronger than “visionary.”';

export interface Belief {
  /** two-digit index, authored rather than derived so the band reads as a numbered record */
  index: string;
  text: string;
}

export const BELIEFS_FOLIO = '03 / Operating beliefs';

export const BELIEFS: readonly Belief[] = [
  { index: '01', text: 'A licence is not an operating model.' },
  { index: '02', text: 'Customer ownership is the default.' },
  { index: '03', text: 'Experienced employees are not bottlenecks to remove.' },
  { index: '04', text: 'Unsupported answers should fail visibly.' },
  { index: '05', text: 'Compliance claims require evidence and accountable specialists.' },
  { index: '06', text: 'Automation follows understanding.' },
  { index: '07', text: 'Exit is part of deployment.' },
];

export const CTA = {
  folio: '04 / Conversion',
  heading: 'Bring us the operating problem. Not the AI pitch.',
  support:
    'We are more useful when the conversation starts with what broke than with what is possible.',
  primaryLabel: 'Map your AI stack',
  secondaryLabel: 'Read the operating method',
} as const;
