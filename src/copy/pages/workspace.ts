/* /workspace content — the primary offer page. Shares its hero with the home page (see ../pilot.ts,
   which also carries the rules every string on this page follows: no invented duration, cohort,
   date, fee or allowance; Cloudflare OS as foundation, Dirtyworks.ai as operator, no partner
   claim). Headings are authored in sentence case and uppercased by CSS. */
import { hrefFor, inquiryHref } from '../routes';

export interface Action {
  label: string;
  href: string;
}

/* ------------------------------------------------------------------ 02 shaped around your business */

export const SHAPED = {
  folio: '02 / Shaped around your business',
  heading: 'A workspace shaped around your business.',
  paragraphs: [
    'The pilot is configured for one team and the work it actually does: selected users, the ' +
      'company information and connections that team is approved to use, and a small set of ' +
      'starter tools chosen for the work. The workspace is customized for your business as part ' +
      'of scoping.',
    'Inside that scope, employees can create and adapt tools as they learn what is useful. ' +
      'Customization is part of scoping the pilot; it is not unlimited development, and a tool ' +
      'the business comes to rely on gets an agreed owner and maintenance scope before it is ' +
      'supported.',
  ],
};

/* ------------------------------------------------------------------ 03 see an example */

export const EXAMPLE = {
  folio: '03 / See an example',
  heading: 'One process, one tool, one revision, one share.',
  intro:
    'The onboarding checklist is the example we use because it is small enough to finish and ' +
    'real enough to matter: a process the team already follows, turned into a tool the team can ' +
    'keep current.',
  /* Says what the asset is. A demonstration with sample data can replace the illustration when
     one exists; until then the page must not imply a screenshot of a deployed client environment. */
  provenance:
    'What is shown is an illustration of the workflow, not a recording of the deployed version. ' +
    'Approved-resource use is shown only once it has been demonstrated in the deployed workspace.',
};

/* ------------------------------------------------------------------ 04 pilot scope */

export interface Deliverable {
  deliverable: string;
  agreed: string;
}

export const PILOT_SCOPE = {
  id: 'pilot-scope',
  folio: '04 / Pilot scope',
  heading: 'Seven deliverables. Each agreed before work begins.',
  columns: { deliverable: 'Pilot deliverable', agreed: 'What is agreed before work begins' },
  rows: [
    {
      deliverable: 'Pilot brief',
      agreed: 'Team, use cases, success measures, duration, and review date',
    },
    {
      deliverable: 'Configured workspace',
      agreed: 'Client-specific configuration and agreed customization',
    },
    {
      deliverable: 'Users and connections',
      agreed: 'Initial user group and selected information sources and services',
    },
    {
      deliverable: 'Onboarding',
      agreed: 'Training, supported uses, and help channel',
    },
    {
      deliverable: 'Operation during the pilot',
      agreed: 'Support window, maintenance responsibilities, and cost review',
    },
    {
      deliverable: 'End-of-pilot review',
      agreed:
        'Useful outcomes, limitations, actual costs, and a continue, change, or stop ' +
        'recommendation',
    },
    {
      deliverable: 'Transition arrangements',
      agreed:
        'Account control, data and tool handling, configuration handover, and access removal',
    },
  ] satisfies readonly Deliverable[],
};

/* ------------------------------------------------------------------ 05 who does what */

export const WHO_DOES_WHAT = {
  folio: '05 / Who does what',
  heading: 'Three parties. One agreed scope.',
  body:
    'Employees use the workspace and create tools. The business approves the people, ' +
    'information, connections, and spending. Dirtyworks.ai configures, onboards, supports the ' +
    'agreed scope, and reviews changes and costs.',
  closing:
    'A tool that becomes something the business relies on needs an agreed owner and a ' +
    'maintenance scope. That agreement is how a team-created tool moves into a supported ' +
    'business role, and it is made deliberately rather than assumed.',
};

/* ------------------------------------------------------------------ 06 fit */

export const FIT = {
  folio: '06 / Fit',
  heading: 'A good place to start. And what this pilot is not.',
  segment: 'Alberta businesses with one team ready to try',
  label: 'Fit / Direct',
  summary:
    'A team with a repeatable internal task, a named sponsor, and time to participate is a good ' +
    'starting point. The offer stays focused on Alberta businesses.',
  included: [
    'A repeatable internal task the team already does',
    'A named sponsor who can approve people, information, and spending',
    'Time to participate and give feedback during the pilot',
    'Existing AI tools that can sit alongside the workspace',
  ],
  excluded: [
    'An immediate replacement for every business system',
    'Autonomous consequential decisions',
    'Unlimited custom development',
    'Automatic production support for everything a team creates',
  ],
};

/* ------------------------------------------------------------------ 07 costs */

export const COSTS = {
  folio: '07 / Costs',
  heading: 'Scoped for the team and the work.',
  body:
    'Each pilot is scoped for the team and the work. We agree setup and customization, support, ' +
    'and any platform or AI usage charges before work begins. Ongoing service is a separate ' +
    'decision after the pilot review.',
  /* Infrastructure and model usage are not assumed to be inside the service fee. */
  note: 'The quote determines billing and any usage allowance. No checkout, no plan selector.',
};

/* ------------------------------------------------------------------ 08 FAQ */

export interface Question {
  question: string;
  answer: string;
}

export const FAQ = {
  folio: '08 / Questions',
  heading: 'What people ask first.',
  items: [
    {
      question: 'Can our team build its own tools?',
      answer:
        'Yes. Creating and adapting tools is part of the workspace approach. We agree which uses ' +
        'and connections belong in the pilot, and how a tool moves into a supported business ' +
        'role.',
    },
    {
      question: 'Is this ready for a company-wide rollout?',
      answer:
        'This offer starts as a bounded pilot. Cloudflare OS is in early access; broader ' +
        'deployment depends on what the pilot demonstrates and the support arrangements agreed ' +
        'afterward.',
    },
    {
      question: 'Do we have to replace our existing AI tools?',
      answer:
        'No. The pilot can sit alongside existing tools. We assess what belongs in the workspace ' +
        'and what should remain elsewhere.',
    },
    {
      question: 'Can it connect to our systems?',
      answer:
        'We review the systems and information you need during scoping. Each connection depends ' +
        'on available integration support, permissions, and validation for your use case.',
    },
    {
      question: 'Who owns and controls the environment?',
      answer:
        'We document account control, data handling, administration, and handover before the ' +
        'pilot begins. The arrangement depends on how the environment is provisioned.',
    },
    {
      question: 'What happens afterward?',
      answer:
        'We review the work completed, team experience, support needs, and costs together. You ' +
        'can discuss ongoing operation, a revised scope, or closing the pilot under the agreed ' +
        'transition arrangements.',
    },
  ] satisfies readonly Question[],
};

/* ------------------------------------------------------------------ 09 pilot inquiry */

export const WORKSPACE_CTA = {
  folio: '09 / Pilot inquiry',
  heading: 'Bring one team and one piece of work.',
  support:
    'Tell us about the team and the work you want to improve. We will discuss fit and what a ' +
    'first scope could include. The inquiry form is shared with every route into the company.',
  primary: { label: 'Discuss a workspace pilot', href: inquiryHref('workspace-pilot') } as Action,
  secondary: { label: 'Read how it works', href: hrefFor('method') } as Action,
};
