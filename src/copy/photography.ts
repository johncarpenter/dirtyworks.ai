/* Every photograph on the site, with the words that must travel with it.
   Direction and provenance register: design-system/guidelines/photography-direction-and-image-library.md

   All four images are GENERATED ORIGINALS. The people in them are fictional. That single fact
   determines everything in this file:

   - `alt` describes the visible work and nothing else. Not the marketing claim. The design
     system gives the pattern verbatim: "An operations manager compares an annotated procedure
     with a laptop at a wooden desk."
   - `caption` says what the image is, in public, on the page. No photograph here may be
     captioned or positioned as a customer, an employee, a partner, or the founder — that is the
     one thing the direction forbids outright, and /about is where it would be easiest to do by
     accident.
   - every use renders an ILLUSTRATIVE stamp, registered per route in ./claim-artefacts.ts so the
     release gate fails if a stamp stops appearing in the built HTML.

   The whole set is a launch blocker, tracked as EDITORIAL_PHOTOGRAPHY in ./placeholders.ts: the
   working recommendation is to run generated imagery through the private launch and commission
   real Alberta photography before the public one. */

export interface Photograph {
  /** file in src/assets/photography, without extension */
  file: string;
  /** describes the visible work — never the claim */
  alt: string;
  /** printed under the frame, beside the stamp */
  caption: string;
  /**
   * object-position. The generated compositions each park the subject off-centre so a solid copy
   * capsule has somewhere to sit; these values keep the people in frame as the crop tightens to
   * 4:3 and then to mobile 4:5.
   */
  focus: string;
}

const EDITORIAL = 'Editorial illustration. Generated image, not a photograph of a real engagement.';

export const OPERATIONS_LEADER: Photograph = {
  file: 'hero-operations-leader-v1',
  alt: 'An operations leader compares an annotated printed procedure with a laptop at a wooden desk.',
  /* /about is the page where a reader is most likely to assume the person shown is the founder,
     so this caption says outright that she is not. FOUNDER_PROFILE in ./placeholders.ts holds
     the real founder record; when it lands, this image comes off /about. */
  caption: `${EDITORIAL} Not the founder, and not a customer.`,
  /* Subject sits right of centre; the quiet wall is on the left. */
  focus: '68% 46%',
};

export const TRAINING_ONBOARDING: Photograph = {
  file: 'training-onboarding-v1',
  alt: 'A mixed-age team works through a laptop and a printed process sheet in a practical meeting room.',
  caption: `${EDITORIAL} Not a customer session.`,
  /* Dense working table — hold the centre, drop the ceiling. */
  focus: '50% 58%',
};

export const ENERGY_SERVICES: Photograph = {
  file: 'energy-services-project-office-v1',
  alt: 'A project coordinator and a service manager compare project documents in an industrial office.',
  /* The direction is explicit that these two must not read as making an engineering or safety
     decision, which is exactly what an energy-services context invites a reader to assume. */
  caption: `${EDITORIAL} Project administration, not engineering or safety approval.`,
  focus: '42% 50%',
};

export const SUPPORT_INCIDENT: Photograph = {
  file: 'support-incident-operations-v1',
  alt: 'Two operators work through a support incident with laptops, a desk phone, and a printed runbook.',
  caption: `${EDITORIAL} Not a record of an actual incident.`,
  /* People centre-left; the quiet dark field is on the right. */
  focus: '38% 50%',
};

/** Copy capsules laid over a photograph. Solid field, square corners — never a gradient scrim. */
export const CAPSULES = {
  operationsLeader: { heading: 'Somebody owns Monday morning.', label: 'Service / watched' },
  training: { heading: 'The team is the deliverable.', label: 'Team / enabled' },
  supportIncident: { heading: 'The record is the product.', label: 'Change / logged' },
} as const;
