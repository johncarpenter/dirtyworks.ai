/* Registry of unresolved facts. A present entry IS unresolved — resolution means deleting the
   entry and replacing its render site with real content.

   scripts/check-content.ts fails the release while any entry names a published route, so an
   unresolved fact cannot reach production as invented text (constitution Principle III). */
import type { ClaimStamp } from '../types/claims';
import type { RouteId } from './routes';

export interface Placeholder {
  key: string;
  state: Extract<ClaimStamp, 'OPEN GAP' | 'LEGAL REVIEW'>;
  owner: 'sponsor' | 'counsel';
  /**
   * `blocks-build` — the page would have to invent content to exist. The release gate fails while
   * the route is published, so the only honest options are real content or an unpublished route.
   *
   * `blocks-launch` — the copy on the page is real and honest; an approval is outstanding. The
   * page ships pre-launch carrying a visible stamp, and `check:content --launch` refuses the
   * final public launch until the approval lands. This distinction is what keeps the gate
   * meaningful rather than permanently red.
   */
  severity: 'blocks-build' | 'blocks-launch';
  blocksRoutes: readonly RouteId[];
  note: string;
  /** the inputs still required, rendered inside the marker */
  requires?: readonly string[];
}

export const PLACEHOLDERS: readonly Placeholder[] = [
  {
    key: 'FOUNDER_PROFILE',
    state: 'OPEN GAP',
    owner: 'sponsor',
    severity: 'blocks-launch',
    /* Blocks no route. /about publishes as an about-and-contact page: it describes the company
       and how to reach it, and names no person, so nothing on it depends on these inputs. The
       founder band is withheld rather than filled, exactly as LEGAL_PAGES holds the legal links
       as inert text. The entry stays because the fact is still unresolved — resolution means
       deleting it and adding the real founder band to src/pages/about.astro. */
    blocksRoutes: [],
    note:
      'A founder record does not exist yet. /about carries no biography, no credential and no ' +
      'photograph until these land. Do not invent biography.',
    requires: [
      'Founder name and title',
      'Employment history',
      'Verifiable achievements',
      'Credentials',
      'Approved photograph',
      'Legal entity',
      'Why Alberta',
    ],
  },
  {
    key: 'EDITORIAL_PHOTOGRAPHY',
    state: 'OPEN GAP',
    owner: 'sponsor',
    severity: 'blocks-launch',
    /* Blocks no route. The four photographs are honest as published: each is captioned as a
       generated editorial illustration and each renders an ILLUSTRATIVE stamp, so no page claims
       them as a real engagement, a customer, an employee or the founder. What is unresolved is
       the sponsor decision behind them — the design system's working recommendation is generated
       imagery through the private launch and commissioned Alberta photography before the public
       one. Resolution means either commissioning the shoot or the sponsor accepting generated
       imagery in public, and then deleting this entry.

       Captions and alt text: src/copy/photography.ts. Direction and provenance register:
       design-system/guidelines/photography-direction-and-image-library.md */
    blocksRoutes: [],
    note:
      'Every photograph on the site is a generated original with fictional people. The public ' +
      'launch needs either a commissioned Alberta shoot for the hero and About, or an explicit ' +
      'sponsor decision to publish generated imagery. Never caption one as a customer or the founder.',
    requires: [
      'Which generated candidates survive public-launch review',
      'Commissioned founder and operations photography, or a decision not to commission',
    ],
  },
  {
    key: 'INTAKE_CONSENT_WORDING',
    state: 'LEGAL REVIEW',
    owner: 'counsel',
    severity: 'blocks-launch',
    blocksRoutes: ['start'],
    /* The inquiry form no longer renders a public "Legal review" stamp: the refresh brief removed
       that internal placeholder from the customer journey. The dependency is recorded HERE
       instead, and `check:content --launch` still refuses the public launch while it stands. The
       data-use sentence on the form deliberately references no privacy notice, because none
       exists to link to; inventing one would be worse than omitting it. */
    note:
      'The data-use sentence on the inquiry form needs counsel approval, and it needs a real, ' +
      'approved privacy notice to link to. Until then the form states only what actually happens ' +
      'to the information: it is used to respond to the inquiry.',
    requires: ['Approved privacy notice', 'Approved consent wording'],
  },
  {
    key: 'LEGAL_PAGES',
    state: 'LEGAL REVIEW',
    owner: 'counsel',
    severity: 'blocks-launch',
    blocksRoutes: [],
    note:
      'Privacy, terms and accessibility copy does not exist. The footer carries no legal column ' +
      'until it does — never inert labels that imply completed content, and never a link to a ' +
      'placeholder page.',
  },
  {
    key: 'WORKSPACE_PILOT_INPUTS',
    state: 'OPEN GAP',
    owner: 'sponsor',
    severity: 'blocks-launch',
    /* Blocks no route. Home and /workspace publish with the conservative proposed copy from the
       refresh brief: no duration, cohort size, fee, allowance, or partner designation is stated,
       and the hero visual is a stamped text example rather than a product screenshot. What is
       unresolved is the set of founder inputs the brief lists for publication; resolution means
       supplying them and updating src/copy/pilot.ts, or the founder accepting the copy as it
       stands. Nothing is invented to fill the gap in the meantime. */
    blocksRoutes: [],
    note:
      'The workspace pilot publishes with proposed copy and a text-first illustrative workflow. ' +
      'Do not add a duration, cohort limit, price, partner badge, or product screenshot without ' +
      'the input behind it.',
    requires: [
      'Real demonstration asset with sample data (recording, poster image, captions)',
      'Pilot support terms and any publicly stated limits',
      'Verified account control and handover model for partner-provisioned workspaces',
      'Any intended Cloudflare partner designation and its use rights',
    ],
  },
];

export const placeholdersBlocking = (route: RouteId): readonly Placeholder[] =>
  PLACEHOLDERS.filter((p) => p.blocksRoutes.includes(route));
