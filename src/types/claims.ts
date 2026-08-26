/* Publication-state stamps. ILLUSTRATIVE and VERIFY AT QUOTE must survive into production
   wherever the prototypes place them. OPEN GAP and LEGAL REVIEW must never reach a published
   route — scripts/check-content.ts fails the release if they do. */
export type ClaimStamp =
  | 'ILLUSTRATIVE'
  | 'VERIFY AT QUOTE'
  | 'OPEN GAP'
  | 'LEGAL REVIEW'
  | 'HYPOTHESIS — NOT MEASURED';

export const SHIPPABLE_STAMPS: readonly ClaimStamp[] = [
  'ILLUSTRATIVE',
  'VERIFY AT QUOTE',
  'HYPOTHESIS — NOT MEASURED',
];

export const BLOCKING_STAMPS: readonly ClaimStamp[] = ['OPEN GAP', 'LEGAL REVIEW'];
