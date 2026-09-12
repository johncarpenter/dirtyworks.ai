/* The workspace pilot: the copy the home page and /workspace share.

   Source: the workspace-pilot refresh brief (dirtyworks-company MKT-001, founder instruction of
   2026-09-12). Every string here is PROPOSED public copy for a pilot offer — not evidence of a
   completed operational capability. Two rules follow from that and are load-bearing:

   1. Nothing here states a duration, cohort size, launch date, fee, or usage allowance. Scope,
      connections, support and costs are agreed before work begins, and the copy says so instead
      of filling the gap with a number.
   2. Cloudflare OS is described as the open-source foundation and Dirtyworks.ai as the operator.
      No partner designation, badge, or entitlement is claimed, because none has been confirmed.

   Headings are authored in sentence case and uppercased by CSS (scripts/check-content.ts RULE-7).
   The brand is "Dirtyworks.ai" in prose, including where the brief wrote "Dirtyworks". */
import { hrefFor, inquiryHref } from './routes';

export interface Action {
  label: string;
  href: string;
}

/* ------------------------------------------------------------------ hero (home and /workspace) */

export const PILOT_HERO = {
  eyebrow: 'Managed AI workspace / Pilot',
  headingLine1: "Your company's AI workspace.",
  headingLine2Before: 'Managed by ',
  /** the orange word, pulled left of the margin: the page's one deliberate grid violation */
  headingEmphasis: 'Dirtyworks.ai',
  headingLine2After: '.',
  body:
    'Give your team a place to work with AI, use approved company information, and build tools ' +
    'for the way your business operates. Start with a pilot configured around one team and a ' +
    'defined set of work, with Dirtyworks.ai handling setup, onboarding, and support.',
  primary: { label: 'Discuss a workspace pilot', href: inquiryHref('workspace-pilot') } as Action,
  secondary: { label: 'Explore the workspace', href: hrefFor('workspace') } as Action,
  foundation: 'Built on Cloudflare OS. Customized and managed by Dirtyworks.ai.',
  /** visible, never a tooltip — and it must stay visible on a phone */
  availabilityLabel: 'Pilot offering',
  availability: 'Scope, connections, support, and costs are agreed before work begins.',
};

/* ------------------------------------------------------------------ the illustrative workflow */

/* No real workspace asset exists yet, so the hero's visual is a worked example of the onboarding
   checklist use case, stamped "Illustrative workflow". It is a numbered record of what the work
   is — deliberately NOT a mock of the product: no invented controls, no fake window chrome, no
   chat prompt. When a real recording with sample data exists it replaces this (poster image,
   captions, user-controlled playback); until then the text example ships and nothing is blocked.
   Registered per route in ./claim-artefacts.ts so the release gate fails if the stamp disappears. */
export interface WorkflowStep {
  name: string;
  detail: string;
}

export const ILLUSTRATIVE_WORKFLOW = {
  sheetLabel: 'Example / Onboarding checklist',
  stamp: 'Illustrative workflow',
  steps: [
    {
      name: 'Describe the process',
      detail: 'The team writes down, in plain words, how a new hire gets set up in their first week.',
    },
    {
      name: 'Create the tool',
      detail: 'The workspace turns that description into a checklist the team can open and use.',
    },
    {
      name: 'Revise a field',
      detail: 'One step is out of date. A colleague changes it, and the checklist is current again.',
    },
    {
      name: 'Share it',
      detail: 'The checklist is shared with the team, and the next new hire follows it.',
    },
  ] satisfies readonly WorkflowStep[],
  /* States what the artefact is, in public, beside the stamp. */
  note: 'A worked example with synthetic data. Not a screenshot of a deployed client environment.',
};

/* ------------------------------------------------------------------ 02 what your team can do */

export interface ExampleUseCase {
  name: string;
  body: string;
}

export const TEAM_CAN_DO = {
  folio: '02 / What your team can do',
  heading: 'Work with AI. Build what the work needs.',
  intro: 'Start with useful everyday work. Explore tools your team can shape as it learns.',
  /** every example carries this label as text; none is a completed customer deployment */
  exampleLabel: 'Example pilot use case',
  examples: [
    {
      name: 'Prepare an internal briefing',
      body: 'Bring selected information together and draft a briefing for a person to review.',
    },
    {
      name: 'Build an onboarding checklist',
      body: 'Turn a repeatable internal process into a tool the team can use and improve.',
    },
    {
      name: 'Create a project tracker',
      body:
        'Describe the fields and views the team needs, then develop and share a tracker inside ' +
        'the workspace.',
    },
  ] satisfies readonly ExampleUseCase[],
  endnote: 'Examples are selected and validated for each pilot.',
};

/* ------------------------------------------------------------------ 03 who does what */

export interface ResponsibilityRow {
  party: string;
  body: string;
}

export const RESPONSIBILITY_ROWS: readonly ResponsibilityRow[] = [
  {
    party: 'Your team',
    body: 'Use AI, create tools, share feedback, and identify useful work.',
  },
  {
    party: 'Your business',
    body: 'Approve people, information, connections, and spending.',
  },
  {
    party: 'Dirtyworks.ai',
    body:
      'Configure the workspace, onboard users, support the agreed scope, and review changes and ' +
      'costs.',
  },
];

export const DIFFERENTIATOR = {
  folio: '03 / Freedom to build, managed operation',
  heading: 'Your team builds. You set the boundaries. We keep it running.',
  body:
    'Employees can explore and create tools within the agreed workspace scope. Dirtyworks.ai ' +
    'configures the environment, helps the team get started, and manages the support and ' +
    'changes included in the pilot. When a tool becomes something the business relies on, we ' +
    'agree how it will be tested, maintained, and supported.',
  rowsTitle: 'Who does what',
};

/* ------------------------------------------------------------------ 04 what the pilot includes */

export interface PilotStage {
  name: string;
  detail: string;
}

/* Four stages, derived from the pilot deliverable table on /workspace. No duration, no cohort
   size, no launch time, no fee. */
export const PILOT_STAGES: readonly PilotStage[] = [
  {
    name: 'Scope',
    detail: 'Define the team, the work, the success measures, and the review date.',
  },
  {
    name: 'Configure',
    detail:
      'Set up the workspace for that work: users, approved information and connections, and ' +
      'starter tools.',
  },
  {
    name: 'Use and support',
    detail: 'Onboard the team, support the agreed scope, and review changes and costs as they come up.',
  },
  {
    name: 'Review',
    detail: 'Look at what happened in use, what it cost, and what it could not do. Decide together.',
  },
];

export const PILOT_INCLUDES = {
  folio: '04 / What the pilot includes',
  heading: 'Start with one team and work worth improving.',
  body:
    'We define the work, configure the workspace, onboard the team, and review what happens in ' +
    'use. The pilot gives you evidence for the next decision: continue, change the scope, or stop.',
  primary: { label: 'See the pilot deliverables', href: `${hrefFor('workspace')}#pilot-scope` } as Action,
  secondary: { label: 'Read how it works', href: hrefFor('method') } as Action,
};

/* ------------------------------------------------------------------ 05 trust and technology */

export const TRUST_TECHNOLOGY = {
  folio: '05 / Trust and technology',
  heading: 'Know who can use it, what it can reach, and who supports it.',
  body:
    'Before the pilot starts, we agree user access, approved information and connections, ' +
    'support responsibilities, and costs. We also document account control and what happens to ' +
    'data, configuration, and tools when the pilot ends.',
  foundationTitle: 'The foundation',
  foundation:
    'Cloudflare OS provides the open-source workspace foundation. Dirtyworks.ai adapts it to ' +
    'your business and manages the agreed service around it. The platform is in early access, ' +
    'so each pilot has a defined scope and review point.',
  action: { label: 'Read the trust approach', href: hrefFor('trust') } as Action,
};

/* ------------------------------------------------------------------ 06 existing AI route */

export const EXISTING_AI = {
  folio: '06 / Already using AI tools',
  heading: 'Already have AI tools? We can work with those too.',
  body:
    'If your team already uses AI products, Dirtyworks.ai can help manage accounts, onboarding, ' +
    'integrations, support, and costs. We will work out whether a workspace pilot, your existing ' +
    'tools, or a combination fits the job.',
  action: { label: 'Explore managed services', href: hrefFor('services') } as Action,
};

/* ------------------------------------------------------------------ 07 MSP route */

export const MSP_ROUTE = {
  folio: '07 / For MSPs',
  heading: 'Bring a managed AI workspace to your clients.',
  body:
    'Start with one client and a defined pilot. We agree how your team and Dirtyworks.ai share ' +
    'onboarding, access, support, and the customer relationship.',
  primary: { label: 'Discuss an MSP pilot', href: inquiryHref('msp-partner') } as Action,
  secondary: { label: 'Read the partner models', href: hrefFor('msps') } as Action,
};

/* ------------------------------------------------------------------ 08 final conversion */

export const PILOT_CONVERSION = {
  folio: '08 / A first tool',
  heading: 'What would your team build first?',
  support:
    'Bring one team, one recurring task, or one tool you wish existed. We will explore whether a ' +
    'managed workspace pilot is a useful place to start.',
  primary: { label: 'Discuss a workspace pilot', href: inquiryHref('workspace-pilot') } as Action,
};
