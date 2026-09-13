/* /notes content. Headings are authored in sentence case and uppercased by CSS
   (scripts/check-content.ts RULE-7).

   This page is deliberately an empty state. It used to publish three notes "in preparation" and
   a nine-title queue; the workspace-pilot refresh removed that public backlog of unwritten
   articles, because a list of titles is neither customer evidence nor a resource library. The
   route stays so nothing that links here breaks, and it is reachable from the footer only. The
   first real note — why Dirtyworks.ai is piloting Cloudflare OS — becomes the first entry once
   it is written. Nothing here carries a date or a reading time. */
import { SITE_VERSION } from '../site';

export const HERO = {
  /** the index carries the same build identity marker as the header and footer folios */
  folio: `Notes / Index ${SITE_VERSION}`,
  heading: 'Notes on the work behind AI.',
  lead:
    'Practical notes on managed AI workspaces, user administration, company knowledge, ' +
    'integrations, governance, cost, MSP delivery, and accountable automation. Argument first — ' +
    'the thesis is readable without opening the note.',
} as const;

/** The empty state, stated rather than dressed up as a publication. */
export const EMPTY_STATE = {
  label: 'Publishing state',
  heading: 'Nothing published yet.',
  body:
    'The first note explains why Dirtyworks.ai is piloting Cloudflare OS as a managed workspace ' +
    'for Alberta businesses, and it is published here when it is written. Until then this page ' +
    'lists no titles, dates, or reading times, because none of those exist yet.',
} as const;

export const CTA = {
  folio: '02 / Conversion',
  heading: 'Have a question the notes should answer?',
  support:
    'Send the work you want to improve. It is more useful to us than a topic suggestion, and it ' +
    'is where the next note usually comes from.',
  primaryLabel: 'Discuss a workspace pilot',
  secondaryLabel: 'Explore the workspace',
} as const;
