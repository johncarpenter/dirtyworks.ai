/* The inquiry interest model, shared by the server schema, the form island and every page that
   links into /start with an interest preselected.

   This file deliberately imports nothing from `astro:schema`: the island bundles it for the
   browser, and the zod runtime has no business in a marketing page's client JavaScript. The
   server schema in src/actions/schemas.ts imports the list from here instead. */

export const INTERESTS = ['workspace-pilot', 'existing-ai', 'msp-partner', 'not-sure'] as const;

export type Interest = (typeof INTERESTS)[number];

/** The neutral selection: what a bare /start shows, and what an unrecognised query falls back to. */
export const NEUTRAL_INTEREST: Interest = 'not-sure';

export const INTEREST_LABELS: Record<Interest, string> = {
  'workspace-pilot': 'Workspace pilot',
  'existing-ai': 'Existing AI management',
  'msp-partner': 'MSP partnership',
  'not-sure': 'Not sure yet',
};

/**
 * Only the three recognised query values preselect anything. Everything else — a missing
 * parameter, an unknown value, or the neutral value itself — resolves to the neutral selection.
 * The visitor can always change it in the form.
 */
export const parseInterest = (search: string): Interest => {
  const value = new URLSearchParams(search).get('interest');
  if (value === 'workspace-pilot' || value === 'existing-ai' || value === 'msp-partner') {
    return value;
  }
  return NEUTRAL_INTEREST;
};

/** Helper text under the message field. Contextual: existing-AI may bring a recent problem; the
    MSP route asks for one client opportunity and never for identifiable client records. */
export const MESSAGE_HELP: Record<Interest, string> = {
  'workspace-pilot':
    'One team, one recurring task, or one tool you wish existed is enough to start.',
  'existing-ai':
    'If a recent problem prompted this — access nobody owned, spend nobody expected, an answer ' +
    'nobody could verify — describe it here. It is welcome, not required.',
  'msp-partner': 'Describe one client opportunity or the AI service you want to add.',
  'not-sure': 'Describe the work in your own words. We will help define a practical place to start.',
};

export const MESSAGE_MAX_LENGTH = 1000;
