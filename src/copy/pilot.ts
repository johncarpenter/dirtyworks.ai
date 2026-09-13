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
    'One managed workspace where your employees create workflows, agents, scheduled tasks, and ' +
    'even applications, using approved company information. Data stays in your environment and ' +
    'people reach only what they are allowed to. Start with a pilot configured around one team ' +
    'and a defined set of work, with Dirtyworks.ai handling setup, onboarding, and support.',
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
  /** what kind of thing the team builds: workflow, agent, scheduled task, application */
  kind: string;
  name: string;
  body: string;
}

export const TEAM_CAN_DO = {
  folio: '02 / What your team can create',
  heading: 'Workflows. Agents. Scheduled tasks. Applications.',
  intro:
    'Employees describe the work in their own words and build the tool that does it, inside one ' +
    'managed workspace. Start with useful everyday work and let the team shape it as it learns.',
  /** every example carries this label as text; none is a completed customer deployment */
  exampleLabel: 'Example pilot use case',
  examples: [
    {
      kind: 'Workflow',
      name: 'Prepare the weekly briefing',
      body:
        'Bring selected information together and draft a briefing for a person to review before ' +
        'it goes anywhere.',
    },
    {
      kind: 'Agent',
      name: 'Answer policy questions',
      body:
        'An agent that answers from the approved policy documents, cites where it looked, and ' +
        'says when it does not know.',
    },
    {
      kind: 'Scheduled task',
      name: 'Check the renewals every Monday',
      body:
        'A task that runs on a schedule, reads the approved register, and flags what needs a ' +
        'decision this week.',
    },
    {
      kind: 'Application',
      name: 'Build an onboarding checklist',
      body:
        'Turn a repeatable internal process into an application the team can open, use, revise, ' +
        'and share.',
    },
  ] satisfies readonly ExampleUseCase[],
  endnote: 'Examples are selected and validated for each pilot.',
};

/* ------------------------------------------------------------------ 03 why a managed workspace */

export interface Reason {
  label: string;
  heading: string;
  body: string;
}

/* The three reasons, in the founder's order: security, speed, cost. The cost line compares the
   workspace with a subscription for every employee and every tool; it is a positioning claim, not
   a price, and the actual costs are agreed before work begins. */
export const WHY_WORKSPACE = {
  folio: '03 / Why one managed workspace',
  heading: 'Secure. Faster to build with. Cheaper to run than a stack of subscriptions.',
  reasons: [
    {
      label: 'Security',
      heading: 'It solves the security problem.',
      body:
        'Company data stays in your environment. Employees reach only what they are already ' +
        'allowed to, and the workspace runs its own AI so information does not have to be sent ' +
        'to an outside service to be used.',
    },
    {
      label: 'Speed',
      heading: 'A faster, easier way into agentic development.',
      body:
        'Employees do not wait for a project, a vendor, or a developer. They describe the work, ' +
        'build the workflow, agent, task, or application, and improve it as they use it.',
    },
    {
      label: 'Cost',
      heading: 'More cost-effective than buying subscriptions.',
      body:
        'One managed workspace in place of a subscription for every employee and every tool, with ' +
        'setup, support, and usage agreed before work begins and reviewed as you go.',
    },
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
    'Employees can explore and create tools within the agreed workspace scope, and share them ' +
    'with each other without sharing the data behind them: a colleague who opens a shared tool ' +
    'sees only what they are allowed to see. Everything is customizable, from the workspace ' +
    'itself to the tools inside it. Dirtyworks.ai configures the environment, helps the team ' +
    'get started, and manages the support and changes included in the pilot. When a tool becomes ' +
    'something the business relies on, we agree how it will be tested, maintained, and supported.',
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
  folio: '05 / What the pilot includes',
  heading: 'Start with one team and work worth improving.',
  body:
    'We define the work, configure the workspace, onboard the team, and review what happens in ' +
    'use. The pilot gives you evidence for the next decision: continue, change the scope, or stop.',
  primary: { label: 'See the pilot deliverables', href: `${hrefFor('workspace')}#pilot-scope` } as Action,
  secondary: { label: 'Read how it works', href: hrefFor('method') } as Action,
};

/* ------------------------------------------------------------------ 06 secure by design */

export interface SecurityPoint {
  heading: string;
  body: string;
}

export const TRUST_TECHNOLOGY = {
  folio: '06 / Secure by design',
  heading: 'Your data stays in your environment.',
  body:
    'The workspace is built so that company information does not have to leave your systems to ' +
    'be useful. Before the pilot starts, we agree user access, approved information and ' +
    'connections, support responsibilities, and costs, and we document account control and what ' +
    'happens to data, configuration, and tools when the pilot ends.',
  points: [
    {
      heading: 'Data stays within your systems',
      body: 'The workspace runs in your environment and works with the information already there.',
    },
    {
      heading: 'People reach only what they are allowed to',
      body: 'Access is defined and tested for each connected resource, not assumed.',
    },
    {
      heading: 'It runs its own AI',
      body:
        'Models run inside the workspace, so company data is not sent to an outside AI service ' +
        'to be used.',
    },
    {
      heading: 'Tools are shared, data is not',
      body:
        'An employee can share a workflow, agent, or application with a colleague without ' +
        'sharing the data behind it.',
    },
  ] satisfies readonly SecurityPoint[],
  foundationTitle: 'The foundation',
  foundation:
    'Cloudflare OS provides the open-source workspace foundation. Dirtyworks.ai adapts it to ' +
    'your business and manages the agreed service around it. The platform is in early access, ' +
    'so each pilot has a defined scope and review point.',
  action: { label: 'Read the trust approach', href: hrefFor('trust') } as Action,
};

/* ------------------------------------------------------------------ 07 existing AI route */

export const EXISTING_AI = {
  folio: '07 / Already using AI tools',
  heading: 'Already have AI tools? We can work with those too.',
  body:
    'If your team already uses AI products, Dirtyworks.ai can help manage accounts, onboarding, ' +
    'integrations, support, and costs. We will work out whether a workspace pilot, your existing ' +
    'tools, or a combination fits the job.',
  action: { label: 'Explore managed services', href: hrefFor('services') } as Action,
};

/* ------------------------------------------------------------------ 08 MSP route */

export const MSP_ROUTE = {
  folio: '08 / For MSPs',
  heading: 'Bring a managed AI workspace to your clients.',
  body:
    'Start with one client and a defined pilot. We agree how your team and Dirtyworks.ai share ' +
    'onboarding, access, support, and the customer relationship.',
  primary: { label: 'Discuss an MSP pilot', href: inquiryHref('msp-partner') } as Action,
  secondary: { label: 'Read the partner models', href: hrefFor('msps') } as Action,
};

/* ------------------------------------------------------------------ 09 final conversion */

export const PILOT_CONVERSION = {
  folio: '09 / A first tool',
  heading: 'What would your team build first?',
  support:
    'Bring one team, one recurring task, or one tool you wish existed: a workflow, an agent, a ' +
    'scheduled task, or an application. We will explore whether a managed workspace pilot is a ' +
    'useful place to start.',
  primary: { label: 'Discuss a workspace pilot', href: inquiryHref('workspace-pilot') } as Action,
};
