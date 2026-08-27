/* The twenty semantic marks, shared by Icon.astro and Icon.tsx.

   Keys say what the mark MEANS in this brand; values are the Material Symbols ligature that draws
   it. The authority is design-system/assets/icons/registry.json, and tests/unit/icons.test.ts
   fails if this drifts from it. It is copied rather than imported because src/ may not import
   from the read-only authorities — see tests/unit/discipline.test.ts.

   The same list drives scripts/fetch-icon-font.sh, which cuts public/fonts/
   MaterialSymbolsSharp-Subset.woff2 to exactly these glyphs. A name added here without
   regenerating the font renders as its own literal text. */

export const GLYPHS = {
  verified: 'task_alt',
  'work-order': 'assignment_turned_in',
  register: 'list_alt',
  diagnostic: 'plagiarism',
  controlled: 'lock',
  'sla-clock': 'schedule',
  gap: 'cancel',
  annotate: 'edit_document',
  owner: 'assignment_ind',
  measured: 'monitoring',
  'verified-date': 'event_available',
  handoff: 'share',
  process: 'account_tree',
  improvement: 'published_with_changes',
  'quality-control': 'verified',
  monitoring: 'visibility',
  decision: 'alt_route',
  operations: 'manage_accounts',
  requirements: 'rule',
  calendar: 'calendar_month',
} as const;

export type IconName = keyof typeof GLYPHS;
