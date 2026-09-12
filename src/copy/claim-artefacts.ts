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
  /* The workspace pilot's visual. No real workspace asset exists, so the hero shows a worked
     example of the onboarding-checklist use case as a numbered record, labelled "Illustrative
     workflow" — never rendered as a functioning product interface. Home and /workspace share it. */
  {
    id: 'home-illustrative-workflow',
    route: 'home',
    stamp: 'ILLUSTRATIVE',
    marker: 'Illustrative workflow',
    what: 'Onboarding-checklist example workflow in the hero',
  },
  {
    id: 'workspace-illustrative-workflow',
    route: 'workspace',
    stamp: 'ILLUSTRATIVE',
    marker: 'Illustrative workflow',
    what: 'Onboarding-checklist example workflow in the hero',
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
    what: 'Quote structure sheet',
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
     make the release gate fail if one stops rendering. Captions: src/copy/photography.ts.

     The home page carries no photograph since the workspace-pilot refresh: its hero is text and
     the illustrative workflow, and the brief asked for fewer dense rows above the fold. */
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
