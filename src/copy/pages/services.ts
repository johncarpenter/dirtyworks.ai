/* Services page content.

   Copy is verbatim from mockups/design_files/Services.dc.html and mockups/README.md §2, except
   the hero — see the note on SERVICES_HERO. Headings are authored in sentence case and uppercased
   by CSS.

   The boundary text on every scope row is the argument of the page: a capability without a stated
   limit is a promise nobody can operate. Eight capabilities, eight boundaries, no exceptions. */
import { inquiryHref } from '../routes';

export interface Action {
  label: string;
  href: string;
}

export interface ServiceModel {
  /** mono register label, e.g. "Model 01 / Take it over" */
  label: string;
  /** what the customer brings — the panel's headline */
  brings: string;
  /** what we supply in return */
  supplies: string;
  /** how somebody in this model describes their own situation, in their words */
  voices: readonly string[];
  /** the inquiry route for this model, with its interest preselected */
  action: Action;
}

/** A hero declaration split so one phrase can carry the orange emphasis. */
export interface SplitHeading {
  first: string;
  secondPrefix: string;
  emphasis: string;
  secondSuffix: string;
}

export interface ScopeRow {
  /** mono orange register label, e.g. "Portfolio / Selected" */
  label: string;
  service: string;
  included: string;
  /** what the managed scope explicitly does not cover */
  boundary: string;
}

export interface EngagementStage {
  name: string;
  description: string;
  /** how the stage is charged — never a number until a rate card is supported */
  commercial: string;
  /** the recurring stage the whole service turns on */
  highlight?: boolean;
}

export interface ResponsibilityPanel {
  owner: string;
  /** orange = we operate it, acid = the customer owns it, blueprint = a third party may own it */
  tone: 'orange' | 'acid' | 'blueprint';
  body: string;
}

/* The hero states what the managed service is for — getting AI genuinely used — and names the two
   delivery routes the page then explains: a managed workspace pilot, or management of the tools a
   team already has. The boundary argument is left to the scope register below. */
export const SERVICES_HERO = {
  folio: 'Managed services / 01 — Two delivery routes',
  heading: {
    first: 'Buying AI is easy.',
    secondPrefix: 'Getting it ',
    emphasis: 'used',
    secondSuffix: ' is not.',
  } satisfies SplitHeading,
  lead:
    'Dirtyworks.ai gets your people genuinely using AI — in a managed workspace pilot configured ' +
    'for one team, or across the tools you already have. Either way: training that fits the job, ' +
    'accounts and access somebody owns, and spend that gets reviewed instead of quietly renewed.',
  action: { label: 'Discuss a workspace pilot', href: inquiryHref('workspace-pilot') } satisfies Action,
};

/* The two delivery routes, and the first thing a visitor should read after the hero. The
   workspace pilot leads — it is the featured offer — and managing the tools a team already has
   follows. Everything else on this page describes what the service covers once it is running;
   nobody gets that far without first recognising themselves.

   The voices are quoted because they are close to verbatim — a visitor who has said one of these
   sentences out loud should find it here. Both routes converge on the same managed scope, which
   is what keeps this section from reading as two different companies. Each route links to the
   shared inquiry form with its interest preselected. */
export const SERVICE_MODELS = {
  folio: '02 / Two delivery routes',
  heading: 'Start a pilot, or start with what you have.',
  models: [
    {
      label: 'Route 01 / Start a managed workspace pilot',
      brings: 'You bring one team and one piece of work.',
      supplies:
        'We configure a Cloudflare OS workspace around that team — customized for your business ' +
        'as part of scoping — onboard the people who will use it, support the agreed scope, and ' +
        'review changes and costs. Your team works with AI and builds tools inside the agreed ' +
        'boundaries; we keep the environment running and review what happens in use.',
      voices: [
        'We want a place where the team can actually work with AI.',
        'We have a process we keep redoing by hand and nobody has time to build the tool.',
      ],
      action: { label: 'Discuss a workspace pilot', href: inquiryHref('workspace-pilot') },
    },
    {
      label: 'Route 02 / Manage your existing AI tools',
      brings: 'You bring the AI you already have.',
      supplies:
        'The products and licences are already yours. We take over running them — accounts and ' +
        'access, the training that makes them stick, integrations, support, controls, vendor ' +
        'changes, and the spend nobody has looked at since it was approved. We will also say ' +
        'whether a workspace pilot, the existing tools, or a combination fits the job.',
      voices: [
        'We bought AI and nobody can use it.',
        'The licences keep renewing and no one owns the bill.',
      ],
      action: { label: 'Discuss your existing tools', href: inquiryHref('existing-ai') },
    },
  ] satisfies readonly ServiceModel[],
  /** mono caption above each panel's quoted situations */
  voicesCaption: 'Sounds like',
  closing:
    'Neither route ends at a deployment. Both end in the same place — a scope with a named ' +
    'owner, a written boundary, a support path, and a cost line somebody reads every month.',
};

export const SCOPE_REGISTER = {
  folio: '03 / Scope register — included and bounded',
  heading: 'Eight operating capabilities. Every one has a boundary.',
  /** mono caption above every boundary cell */
  boundaryCaption: 'Boundary',
  rows: [
    {
      label: 'Portfolio / Selected',
      service: 'Portfolio planning and vendor management',
      included:
        'Requirements, comparison, prerequisites, overlap, purchasing path, inventory, and the ' +
        'renewal decision.',
      boundary: 'No claim that every product can be resold or supported.',
    },
    {
      label: 'Access / Managed',
      service: 'Account and user administration',
      included:
        'Tenant and account setup, named admins, roles, licences, joiner/mover/leaver, recovery, ' +
        'and offboarding.',
      boundary:
        'Customer approves access. General identity administration may remain with the MSP or IT.',
    },
    {
      label: 'Team / Enabled',
      service: 'Training, adoption, and support',
      included:
        'Role-based onboarding, acceptable-use guidance, office hours and materials, ' +
        'supported-use triage, adoption blockers.',
      boundary: 'Not unlimited training, unlimited development, or general IT support.',
    },
    {
      label: 'Knowledge / Owned',
      service: 'Knowledge and data reliability',
      included:
        'Source selection, ownership, freshness, permissions, evaluation, gaps, and company ' +
        'knowledge workflows.',
      boundary: 'Customer owns source truth and consequential decisions.',
    },
    {
      label: 'Systems / Connected',
      service: 'Integration and automation',
      included:
        'Approved connectors, low-code and custom integration, tests, exceptions, human ' +
        'approval, monitoring, rollback.',
      boundary: 'Each production action requires separate risk and operating scope.',
    },
    {
      label: 'Control / Operated',
      service: 'Governance and compliance readiness',
      included:
        'Use-case register, policy implementation, risk and decision record, data and vendor ' +
        'review, control evidence, specialist coordination.',
      boundary: 'No legal advice, certification, or guaranteed compliance.',
    },
    {
      label: 'Service / Watched',
      service: 'Monitoring, incident, and change operations',
      included:
        'Supported health and cost signals, triage, containment, notification, vendor-change ' +
        'review, regression work, and investigation of reported output problems.',
      boundary:
        'Third-party uptime and events outside the managed scope are excluded. Continuous review ' +
        'of every AI answer is not included.',
    },
    {
      label: 'Cost / Controlled',
      service: 'Licence, usage, and cost control',
      included: 'Spend inventory, budgets, alerts, reconciliation, overlap review, renewal and exit.',
      boundary: 'Savings are measured, not promised in advance.',
    },
  ] satisfies readonly ScopeRow[],
};

export const ENGAGEMENT_PATH = {
  folio: '04 / Engagement path',
  heading: 'Start with the uncertainty. End with a managed scope.',
  stages: [
    {
      name: 'Review',
      description:
        'Map the current stack, recent failure events, users, information, integrations, costs, ' +
        'owners, risks, and next decision.',
      commercial: 'Paid fixed scope when analysis or architecture is required',
    },
    {
      name: 'Deploy',
      description:
        'Configure the selected products or the pilot workspace, access, controls, integrations, ' +
        'tests, documentation, and training. Account control and handover are agreed first.',
      commercial: 'Fixed project or milestone scope',
    },
    {
      name: 'Operate',
      description:
        'Manage the defined portfolio, users, support, monitoring, controls, incidents, spend, ' +
        'vendor changes, and reporting.',
      commercial: 'Monthly managed service',
      highlight: true,
    },
    {
      name: 'Extend',
      description:
        'Add knowledge domains, integrations, assisted workflows, or controlled automation when ' +
        'evidence supports the change.',
      commercial: 'Scoped change plus recurring operating impact',
    },
    {
      name: 'Renew / exit',
      description:
        'Reconcile use and value, change plans, replace products, export records, transfer ' +
        'ownership, or remove access.',
      commercial: 'Included cadence or scoped transition',
    },
  ] satisfies readonly EngagementStage[],
  /** Why there is no price on this page. Verbatim; do not soften into a promise of one. */
  priceNote:
    'Verify at quote — package prices are not published until the offer names and live sales ' +
    'evidence support a rate card.',
};

export const RESPONSIBILITY_BOUNDARY = {
  folio: '05 / Responsibility boundary',
  heading: 'Managed does not mean unbounded.',
  panels: [
    {
      owner: 'Dirtyworks.ai operates',
      tone: 'orange',
      body:
        'The contracted AI portfolio, configuration, users and admin process, knowledge and ' +
        'integration scope, tests, enablement, monitoring, support, change, records, and reporting.',
    },
    {
      owner: 'The customer owns',
      tone: 'acid',
      body:
        'Business policy, data and source truth, access approvals, employee use, legal and ' +
        'regulatory accountability, budget decisions, and final consequential judgment.',
    },
    {
      owner: 'The MSP or IT provider may own',
      tone: 'blueprint',
      body:
        'Tenant-wide identity, endpoints, network, backup, cybersecurity, service desk, and ' +
        'infrastructure. Every account receives a written seam.',
    },
  ] satisfies readonly ResponsibilityPanel[],
};

export const SERVICES_CTA = {
  folio: '06 / Conversion',
  heading: 'What should somebody own by Monday morning?',
  support:
    'Bring one team and the work you want to improve, or the products and people you already ' +
    'have. We will scope from there.',
  primary: { label: 'Discuss a workspace pilot', href: inquiryHref('workspace-pilot') } satisfies Action,
  secondary: { label: 'Discuss your existing tools', href: inquiryHref('existing-ai') } satisfies Action,
};
