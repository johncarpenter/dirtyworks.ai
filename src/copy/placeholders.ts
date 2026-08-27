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
      'Photo-led or type-led home hero',
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
    note:
      'Consent wording on the intake form is subject to legal review before launch. The stamp ' +
      'ships only if the sponsor explicitly accepts that state.',
  },
  {
    key: 'LEGAL_PAGES',
    state: 'LEGAL REVIEW',
    owner: 'counsel',
    severity: 'blocks-launch',
    blocksRoutes: [],
    note:
      'Privacy, terms and accessibility copy does not exist. Footer items stay inert text until ' +
      'it does — never a link to a placeholder page.',
  },
];

export const placeholdersBlocking = (route: RouteId): readonly Placeholder[] =>
  PLACEHOLDERS.filter((p) => p.blocksRoutes.includes(route));
