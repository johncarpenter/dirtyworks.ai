/* The workspace pilot: the copy the home page and /workspace share.

   Source: the workspace-pilot refresh brief (dirtyworks-company MKT-001, founder instruction of
   2026-09-12). Every string here is PROPOSED public copy for a pilot offer — not evidence of a
   completed operational capability. Three rules follow from that and are load-bearing:

   1. Nothing here states a duration, cohort size, launch date, fee, or usage allowance. Scope,
      connections, support and costs are agreed before work begins, and the copy says so instead
      of filling the gap with a number.
   2. Cloudflare OS is described as the open-source foundation and Dirtyworks.ai as the operator.
      No partner designation, badge, or entitlement is claimed, because none has been confirmed.
   3. The page is terse on purpose. Since the text-minimisation pass of 2026-09-19 every body
      string here is one or two short sentences. The long-form argument behind each section —
      the paragraphs that used to sit on the page — lives in src/copy/llms.ts and is served to AI
      agents at /llms.txt and /agents.md. Lengthen a string here only when a visitor needs the
      words on the page; extend the long-form there.

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
    'Employees create workflows, agents, scheduled tasks, and applications in one managed ' +
    'workspace. Data stays in your environment. Dirtyworks.ai handles setup, onboarding, and ' +
    'support.',
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
      detail: 'The team writes down how a new hire is set up in their first week.',
    },
    {
      name: 'Create the tool',
      detail: 'The workspace turns that into a checklist the team can open and use.',
    },
    {
      name: 'Revise a field',
      detail: 'One step is out of date. A colleague changes it.',
    },
    {
      name: 'Share it',
      detail: 'The next new hire follows the current checklist.',
    },
  ] satisfies readonly WorkflowStep[],
  /* States what the artefact is, in public, beside the stamp. */
  note: 'A worked example with synthetic data. Not a screenshot of a deployed client environment.',
};

/* ------------------------------------------------------------------ 02 what your team can do */

export interface ExampleUseCase {
  /** what kind of thing the team builds: workflow, agent, scheduled task, application */
  kind: string;
  name: string;
  body: string;
}

export const TEAM_CAN_DO = {
  folio: '02 / What your team can create',
  heading: 'Workflows. Agents. Scheduled tasks. Applications.',
  intro: 'Employees describe the work in their own words and build the tool that does it.',
  /** every example carries this label as text; none is a completed customer deployment */
  exampleLabel: 'Example pilot use case',
  examples: [
    {
      kind: 'Workflow',
      name: 'Prepare the weekly briefing',
      body: 'Drafted for a person to review before it goes anywhere.',
    },
    {
      kind: 'Agent',
      name: 'Answer policy questions',
      body: 'From approved documents. Cites sources. Says when it does not know.',
    },
    {
      kind: 'Scheduled task',
      name: 'Check the renewals every Monday',
      body: 'Reads the approved register. Flags what needs a decision.',
    },
    {
      kind: 'Application',
      name: 'Build an onboarding checklist',
      body: 'A process the team can open, use, revise, and share.',
    },
  ] satisfies readonly ExampleUseCase[],
  endnote: 'Examples are selected and validated for each pilot.',
};

/* ------------------------------------------------------------------ 03 why a managed workspace */

/** Each reason is a label and one sentence. The paragraph behind each is in src/copy/llms.ts. */
export interface Reason {
  label: string;
  heading: string;
}

/* The three reasons, in the founder's order: security, speed, cost. The cost line compares the
   workspace with a subscription for every employee and every tool; it is a positioning claim, not
   a price, and the actual costs are agreed before work begins. */
export const WHY_WORKSPACE = {
  folio: '03 / Why one managed workspace',
  heading: 'Secure. Faster to build with. Cheaper to run than a stack of subscriptions.',
  reasons: [
    { label: 'Security', heading: 'It solves the security problem.' },
    { label: 'Speed', heading: 'A faster, easier way into agentic development.' },
    { label: 'Cost', heading: 'More cost-effective than buying subscriptions.' },
  ] satisfies readonly Reason[],
};

/* ------------------------------------------------------------------ 04 who does what */

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
  folio: '04 / Freedom to build, managed operation',
  heading: 'Your team builds. You set the boundaries. We keep it running.',
  body:
    'Employees build within the agreed scope and share tools without sharing the data behind ' +
    'them. Everything is customizable. A tool the business comes to rely on gets agreed ' +
    'testing, maintenance, and support.',
  rowsTitle: 'Who does what',
};

/* ------------------------------------------------------------------ 05 what the pilot includes */

export interface PilotStage {
  name: string;
  detail: string;
}

/* Four stages, derived from the pilot deliverable table on /workspace. No duration, no cohort
   size, no launch time, no fee. */
export const PILOT_STAGES: readonly PilotStage[] = [
  {
    name: 'Scope',
    detail: 'The team, the work, the success measures, and the review date.',
  },
  {
    name: 'Configure',
    detail: 'Users, approved information and connections, and starter tools.',
  },
  {
    name: 'Use and support',
    detail: 'Onboard the team, support the agreed scope, review changes and costs.',
  },
  {
    name: 'Review',
    detail: 'What happened, what it cost, what it could not do. Decide together.',
  },
];

export const PILOT_INCLUDES = {
  folio: '05 / What the pilot includes',
  heading: 'Start with one team and work worth improving.',
  body: 'Four stages, and evidence for the next decision: continue, change the scope, or stop.',
  primary: { label: 'See the pilot deliverables', href: `${hrefFor('workspace')}#pilot-scope` } as Action,
  secondary: { label: 'Read how it works', href: hrefFor('method') } as Action,
};

/* ------------------------------------------------------------------ 06 secure by design */

/** Four points, each a single line. The explanation behind each is in src/copy/llms.ts. */
export interface SecurityPoint {
  heading: string;
}

export const TRUST_TECHNOLOGY = {
  folio: '06 / Secure by design',
  heading: 'Your data stays in your environment.',
  body: 'Access, connections, support, costs, and account control are agreed before the pilot starts.',
  points: [
    { heading: 'Data stays within your systems' },
    { heading: 'People reach only what they are allowed to' },
    { heading: 'It runs its own AI' },
    { heading: 'Tools are shared, data is not' },
  ] satisfies readonly SecurityPoint[],
  foundationTitle: 'The foundation',
  foundation:
    'Cloudflare OS provides the open-source workspace foundation, in early access. Dirtyworks.ai ' +
    'adapts and manages it.',
  action: { label: 'Read the trust approach', href: hrefFor('trust') } as Action,
};

/* ------------------------------------------------------------------ 07 existing AI route */

export const EXISTING_AI = {
  folio: '07 / Already using AI tools',
  heading: 'Already have AI tools? We can work with those too.',
  body:
    'We can manage accounts, onboarding, integrations, support, and costs for the AI tools you ' +
    'already have.',
  action: { label: 'Explore managed services', href: hrefFor('services') } as Action,
};

/* ------------------------------------------------------------------ 08 MSP route */

export const MSP_ROUTE = {
  folio: '08 / For MSPs',
  heading: 'Bring a managed AI workspace to your clients.',
  body:
    'One client, one defined pilot. We agree how onboarding, access, support, and the customer ' +
    'relationship are shared.',
  primary: { label: 'Discuss an MSP pilot', href: inquiryHref('msp-partner') } as Action,
  secondary: { label: 'Read the partner models', href: hrefFor('msps') } as Action,
};

/* ------------------------------------------------------------------ 09 final conversion */

export const PILOT_CONVERSION = {
  folio: '09 / A first tool',
  heading: 'What would your team build first?',
  support: 'Bring one team, one recurring task, or one tool you wish existed.',
  primary: { label: 'Discuss a workspace pilot', href: inquiryHref('workspace-pilot') } as Action,
};
