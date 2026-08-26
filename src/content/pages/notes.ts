/* /notes content. Copy is verbatim from mockups/design_files/Notes.dc.html; headings are authored
   in sentence case and uppercased by CSS (scripts/check-content.ts RULE-7).

   This page publishes deliberately incomplete. Three notes are in preparation and the remaining
   nine are titles only: no href, no date, no reading time, no author. Those fields do not exist
   on the queue type, so an unwritten note cannot acquire a fabricated one. */
import { SITE_VERSION } from '../site';

export const HERO = {
  /** the index carries the same build identity marker as the header and footer folios */
  folio: `Notes / Index ${SITE_VERSION}`,
  heading: 'Notes on the work behind AI.',
  lead:
    'Practical notes on AI products, user administration, knowledge, integrations, governance, ' +
    'monitoring, cost, MSP delivery, and accountable automation. Argument first — you can read ' +
    'the thesis without opening the note.',
} as const;

/** The panel beside the hero: the publishing state, stated rather than implied. */
export const PUBLISHING_STATE = {
  label: 'Publishing state',
  body:
    'Three notes are in preparation. The rest of the queue is listed as a commitment, not as ' +
    'links. No dates or reading times are shown until a note exists.',
} as const;

export interface NoteInPreparation {
  index: string;
  title: string;
  /** the argument, readable without opening the note */
  thesis: string;
  /** the note's series, rendered as a blueprint chip */
  series: string;
  /** the publication state, always carried as words and never by colour alone */
  state: string;
}

export const IN_PREPARATION_FOLIO = '01 / First three notes';

export const IN_PREPARATION: readonly NoteInPreparation[] = [
  {
    index: '01',
    title: 'A licence is not an AI operating model.',
    thesis: 'Buying seats creates a cost line. Operating them creates a capability.',
    series: 'Method',
    state: 'In preparation',
  },
  {
    index: '02',
    title: "Who owns the employee's first day with AI?",
    thesis: 'Onboarding is where AI policy either becomes real or becomes folklore.',
    series: 'Method',
    state: 'In preparation',
  },
  {
    index: '03',
    title: 'Your AI catalogue needs an exit column.',
    thesis: 'If leaving a product has no written path, the renewal decision is already made.',
    series: 'Method',
    state: 'In preparation',
  },
];

/** A queued note is a number and a title. There is deliberately nowhere to put anything else. */
export interface QueuedNote {
  index: string;
  title: string;
}

export const QUEUE_FOLIO = '02 / The rest of the queue';

export const QUEUE: readonly QueuedNote[] = [
  { index: '04', title: 'Customer-direct software can still be a managed service.' },
  { index: '05', title: 'Compliance is not a setting in the admin console.' },
  { index: '06', title: 'Permission is part of the answer.' },
  { index: '07', title: '“Ask Sarah” is your most expensive undocumented system.' },
  { index: '08', title: 'Before you automate the repeated question, find out why it repeats.' },
  { index: '09', title: 'A managed AI service needs a failure path.' },
  { index: '10', title: 'What an MSP owns — and what an AI operator should.' },
  { index: '11', title: 'The cheapest AI seat is expensive when nobody uses it.' },
  { index: '12', title: 'Model choice changes. Operating responsibility does not.' },
];

export const QUEUE_NOTE = 'Queue only. No links, dates, or reading times until the note is written.';

export const CTA = {
  folio: '03 / Conversion',
  heading: 'Have a better question than the ones on this list?',
  support: 'Send the operating problem. It is more useful to us than a topic suggestion.',
  primaryLabel: 'Map your AI stack',
  secondaryLabel: 'See what we manage',
} as const;
