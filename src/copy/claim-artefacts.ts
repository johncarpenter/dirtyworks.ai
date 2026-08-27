/* Every illustrative artefact and the stamp it must render. The release gate reads this registry
   instead of hard-coding page internals, so adding an artefact without its stamp fails the build
   (contracts/content-check.md Rule 4). */
import type { ClaimStamp } from '../types/claims';
import type { RouteId } from './routes';

export interface ClaimArtefact {
  id: string;
  route: RouteId;
  stamp: ClaimStamp;
  /** text that must appear in the rendered output of that route */
  marker: string;
  what: string;
}

export const CLAIM_ARTEFACTS: readonly ClaimArtefact[] = [
  {
    id: 'home-evidence-rail',
    route: 'home',
    stamp: 'ILLUSTRATIVE',
    marker: 'Illustrative',
    what: 'Problem section evidence rail, all 7 events',
  },
  {
    id: 'home-catalogue-disclaimer',
    route: 'home',
    stamp: 'VERIFY AT QUOTE',
    marker: 'Verify at quote',
    what: 'Governed catalogue product disclaimer',
  },
  {
    id: 'catalogue-disclaimer',
    route: 'catalogue',
    stamp: 'VERIFY AT QUOTE',
    marker: 'Verify at quote',
    what: 'Product menu commercial disclaimer',
  },
  {
    id: 'catalogue-quote-sheet',
    route: 'catalogue',
    stamp: 'ILLUSTRATIVE',
    marker: 'Illustrative',
    what: 'Composer output quote sheet',
  },
  {
    id: 'method-monthly-record',
    route: 'method',
    stamp: 'ILLUSTRATIVE',
    marker: 'Illustrative',
    what: 'Monthly operating record sheet',
  },

  /* Photography. Every image on the site is a generated original with fictional people, so each
     one is an illustrative artefact in exactly the sense this registry means: it would read as
     evidence if nothing said otherwise. EditorialPhoto renders the stamp; these entries are what
     make the release gate fail if one stops rendering. Captions: src/copy/photography.ts. */
  {
    id: 'home-photo-operations-leader',
    route: 'home',
    stamp: 'ILLUSTRATIVE',
    marker: 'Illustrative',
    /* Replaced the hero AI portfolio register, which was this route's other illustrative
       artefact. The stamp requirement transfers with the slot. */
    what: 'Operations-leader photograph in the hero',
  },
  {
    id: 'services-photo-training',
    route: 'services',
    stamp: 'ILLUSTRATIVE',
    marker: 'Illustrative',
    what: 'Training photograph in the hero',
  },
  {
    id: 'trust-photo-support-incident',
    route: 'trust',
    stamp: 'ILLUSTRATIVE',
    marker: 'Illustrative',
    what: 'Support and incident photograph in the hero',
  },
  {
    id: 'msps-photo-energy-services',
    route: 'msps',
    stamp: 'ILLUSTRATIVE',
    marker: 'Illustrative',
    what: 'Energy-services project office photograph in the hero',
  },
  {
    id: 'about-photo-operations-leader',
    route: 'about',
    stamp: 'ILLUSTRATIVE',
    marker: 'Illustrative',
    /* The one that matters most: /about is where a reader assumes a person shown is the founder.
       FOUNDER_PROFILE is unresolved and this image is the direction's designated temporary
       substitute, so the caption denies both readings outright. */
    what: 'Operations-leader photograph beside the company copy',
  },
];
