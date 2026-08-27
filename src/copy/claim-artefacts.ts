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
    id: 'home-portfolio',
    route: 'home',
    stamp: 'ILLUSTRATIVE',
    marker: 'Illustrative',
    what: 'Hero AI portfolio register',
  },
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
];
