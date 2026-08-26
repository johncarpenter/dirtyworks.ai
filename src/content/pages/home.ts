/* Home page content. Every string is verbatim from mockups/design_files/MarketingPage.dc.html
   and its renderVals() block; headings are authored in sentence case and uppercased by CSS.
   Section components import from here and never inline copy of their own. */
import type { ProofStatus } from '../../types/proof';
import { hrefFor } from '../routes';

export interface Action {
  label: string;
  href: string;
}

/* ------------------------------------------------------------------ 01 hero */

export interface PortfolioRow {
  name: string;
  /** owner / access / cost, rendered as one mono line */
  meta: string;
  /** the chip text — the state is always readable, never colour alone */
  status: string;
  statusKind: ProofStatus;
  /** the open row carries the 3px orange left border */
  flagged?: boolean;
}

export const PORTFOLIO_ROWS: readonly PortfolioRow[] = [
  {
    name: 'Workforce assistant',
    meta: 'Operations / Company account / Cost known',
    status: 'Managed',
    statusKind: 'operated',
  },
  {
    name: 'Image generation',
    meta: 'Marketing / Named users / Cost known',
    status: 'Registered',
    statusKind: 'source',
  },
  {
    name: 'Model API',
    meta: 'Development / Scoped keys / Budgeted',
    status: 'Monitored',
    statusKind: 'permission',
  },
  {
    name: 'Personal AI account',
    meta: 'Owner unknown / Access unknown / Cost unknown',
    status: 'Gap / Open',
    statusKind: 'gap',
    flagged: true,
  },
];

export const HERO = {
  folio: 'Dirtyworks.ai / Managed AI operations',
  headingLine1: 'AI is already at work.',
  headingLine2Before: 'Is anyone ',
  /** pulled left by -0.06em: the page's first of two grid violations */
  headingPull: 'operating',
  headingLine2After: ' it?',
  support:
    'Dirtyworks.ai is the AI MSP for companies that need more than licences. We select and deploy ' +
    'approved AI products, manage users, train teams, support integrations, operate controls, ' +
    'monitor the service, and keep costs visible.',
  primary: { label: 'Map your AI stack', href: hrefFor('start') } as Action,
  secondary: { label: 'See what we manage', href: hrefFor('services') } as Action,
  registerTitle: 'AI portfolio',
  registerStamp: 'Illustrative',
  registerCaption: 'Register shown to demonstrate the work. Not customer data.',
};

/* ------------------------------------------------------------------ 02 problem */

export interface EvidenceItem {
  text: string;
  status: ProofStatus;
  /** every event ships its claim stamp */
  statusLabel: string;
}

export const EVIDENCE_ITEMS: readonly EvidenceItem[] = [
  {
    text: 'A new employee still has no approved AI account after two weeks.',
    status: 'gap',
    statusLabel: 'Illustrative',
  },
  {
    text: 'A former employee still appears on a vendor seat list.',
    status: 'gap',
    statusLabel: 'Illustrative',
  },
  {
    text: 'Marketing and operations bought different tools for the same job.',
    status: 'gap',
    statusLabel: 'Illustrative',
  },
  {
    text: 'An automation stopped after a vendor changed an API.',
    status: 'change',
    statusLabel: 'Illustrative',
  },
  {
    text: 'A public AI account is being used with company information.',
    status: 'gap',
    statusLabel: 'Illustrative',
  },
  {
    text: 'Nobody can explain the current monthly AI spend.',
    status: 'gap',
    statusLabel: 'Illustrative',
  },
  {
    text: 'A team received an answer, but nobody knows which source it relied on.',
    status: 'source',
    statusLabel: 'Illustrative',
  },
];

export const PROBLEM = {
  folio: '02 / The unmanaged stack',
  heading: 'Another licence is not an operating model.',
  paragraphs: [
    'AI tools arrive one person, one team, and one expense claim at a time. Soon the company has ' +
      'accounts nobody inventories, data rules nobody can explain, integrations nobody monitors, ' +
      'overlapping subscriptions, and employees asking one another what is safe to use.',
    'The cost appears as abandoned licences, repeated work, support interruptions, uncontrolled ' +
      'consumption, failed connections, and risk that remains invisible until something happens.',
  ],
  railTitle: 'Illustrative events',
};

/* ------------------------------------------------------------------ 03 what we operate */

export interface OperateRow {
  label: string;
  body: string;
  /** typical records, mono detail column */
  records: string;
}

export const OPERATE_ROWS: readonly OperateRow[] = [
  {
    label: 'Portfolio / Selected',
    body:
      'Compare products, prerequisites, overlap, commercial routes, and fit with the systems you ' +
      'already use.',
    records: 'Approved catalogue / decision record / vendor and renewal register',
  },
  {
    label: 'Access / Managed',
    body:
      'Create the company-owned account structure, assign licences, manage roles, and handle ' +
      'joiners, movers, and leavers.',
    records: 'Tenant owner / user register / admin roles / recovery path',
  },
  {
    label: 'Team / Enabled',
    body:
      'Onboard people, teach supported use, provide role-specific guidance, and give them ' +
      'somewhere to get help.',
    records: 'Training record / use guidance / support path / adoption issues',
  },
  {
    label: 'Knowledge / Owned',
    body:
      'Connect approved company information, name source owners, test permissions, and make ' +
      'unsupported answers visible.',
    records: 'Source register / owner map / evaluation set / gap log',
  },
  {
    label: 'Systems / Connected',
    body:
      'Integrate approved applications and build assisted or automated workflows with tests, ' +
      'exceptions, and rollback.',
    records: 'Connection inventory / workflow runbook / approvals / recovery procedure',
  },
  {
    label: 'Control / Operated',
    body:
      'Maintain practical policy, privacy, security, data, and compliance-readiness controls for ' +
      'the managed scope.',
    records: 'Use-case register / access evidence / risk and decision log / control review',
  },
  {
    label: 'Service / Watched',
    body:
      'Monitor supported services, integrations, incidents, material quality failures, and vendor ' +
      'changes.',
    records: 'Health record / incident log / change log / escalation path',
  },
  {
    label: 'Cost / Controlled',
    body:
      'Track licences and usage, set budgets and alerts, remove abandoned access, and review ' +
      'overlap before renewal.',
    records: 'Spend view / budget and alert record / licence reconciliation / renewal decision',
  },
];

export const OPERATE = {
  folio: '03 / What we operate',
  heading: 'The tool is one line item. This is the service.',
  intro:
    'Dirtyworks.ai manages the operating work around a defined AI portfolio. The scope can begin ' +
    'with one product or one team and expand only when ownership, controls, value, and support ' +
    'remain clear.',
  closing:
    'You keep the company decisions. We keep the operating work from disappearing between ' +
    'vendors, employees, IT, and policy.',
};

/* ------------------------------------------------------------------ 04 governed catalogue */

export interface MenuEntry {
  /** the Archivo menu word */
  word: string;
  job: string;
  /** candidate product names — always text, never a logo */
  candidates: string;
  /** the operating emphasis, blueprint serif */
  emphasis: string;
}

export const MENU_ENTRIES: readonly MenuEntry[] = [
  {
    word: 'Work',
    job: 'General workforce assistants',
    candidates:
      'ChatGPT Business / Claude Team / Microsoft 365 Copilot / Google Workspace with Gemini',
    emphasis: 'Account, identity, policy, training, support',
  },
  {
    word: 'Find',
    job: 'Research and company knowledge',
    candidates: 'Perplexity Enterprise / approved assistant and knowledge configurations',
    emphasis: 'Sources, permissions, retention, evidence, evaluation',
  },
  {
    word: 'Make',
    job: 'Images, meetings, documents, and content',
    candidates: 'Midjourney / Canva Business / Fathom / Notion Business',
    emphasis: 'Named accounts, records policy, brand and use guidance',
  },
  {
    word: 'Build',
    job: 'Coding, models, and APIs',
    candidates:
      'GitHub Copilot / OpenAI API / Anthropic API / OpenRouter / Azure / AWS / Google Cloud',
    emphasis: 'Keys, budgets, evaluations, model and change control',
  },
  {
    word: 'Move',
    job: 'Integration and automation',
    candidates: 'Zapier / Make / n8n',
    emphasis: 'Credentials, testing, exceptions, monitoring, rollback',
  },
  {
    word: 'Hold',
    job: 'Application data and semantic search',
    candidates: 'Supabase / Pinecone',
    emphasis: 'Access, region, backup, retention, capacity',
  },
  {
    word: 'Watch',
    job: 'Tracing and evaluation',
    candidates: 'Langfuse / LangSmith',
    emphasis: 'Telemetry, tests, alerts, incidents, cost review',
  },
];

export const CATALOGUE = {
  folio: '04 / The governed catalogue',
  heading: 'Choose the tools. Keep one operating model.',
  paragraphs: [
    'A client can choose from a governed mix of workforce AI, research, creative, developer, ' +
      'automation, data, and monitoring products. We assess the fit, confirm how the account can ' +
      'be purchased, deploy it into the company, and attach the operating work it requires.',
    'When Dirtyworks.ai is authorized to resell a product, it can be quoted through that channel. ' +
      'Otherwise the client contracts with the vendor and Dirtyworks.ai administers the account. ' +
      'Customer ownership remains the default either way.',
  ],
  primary: { label: 'Compose a product mix', href: hrefFor('catalogue') } as Action,
  secondary: { label: 'See the catalogue method', href: hrefFor('method') } as Action,
  /** the VERIFY AT QUOTE stamp opens this line and must survive into production */
  disclaimerStamp: 'Verify at quote',
  disclaimer:
    ' — product names are candidate examples, not a promise of availability, resale ' +
    'authorization, suitability, or fixed price. Every quote confirms current terms, ' +
    'prerequisites, ownership, support, and commercial route.',
};

/* ------------------------------------------------------------------ 05 comparison */

export interface ComparisonRow {
  left: string;
  right: string;
  /** the renewal row — filled acid, named by the annotation */
  decisive?: boolean;
}

export const COMPARISON_ROWS: readonly ComparisonRow[] = [
  { left: 'Product selected', right: 'Fit, overlap, prerequisite, and commercial route recorded' },
  { left: 'Seat assigned', right: 'Named user, role, owner, recovery, and offboarding managed' },
  {
    left: 'Training link sent',
    right: 'Role-specific onboarding, use guidance, support, and adoption review',
  },
  {
    left: 'Connector enabled',
    right: 'Data boundary, permission, test, exception, and failure path documented',
  },
  {
    left: 'Vendor says “secure”',
    right: 'Relevant controls and limitations reviewed for the actual use case',
  },
  {
    left: 'Usage dashboard exists',
    right: 'Budget, licence, quality, incident, and value signals reviewed',
  },
  {
    left: 'Renewal notice arrives',
    right: 'Need, overlap, price, ownership, and exit assessed before renewal',
    decisive: true,
  },
];

export const COMPARISON = {
  folio: '05 / Access versus operation',
  heading: 'Access is not the service.',
  support:
    'Buying the product answers “what can we use?” Managed operations answer “who owns it, how ' +
    'does it fit, what can it access, who supports it, what changed, and should we keep paying ' +
    'for it?”',
  leftTitle: 'Product access',
  rightTitle: 'Managed AI operations',
  annotation: 'The renewal row is where the money is.',
};

/* ------------------------------------------------------------------ 06 knowledge */

export interface KnowledgeChip {
  text: string;
  status: ProofStatus;
  /** the final chip is outlined rather than filled */
  outlined?: boolean;
}

export const KNOWLEDGE_CHIPS: readonly KnowledgeChip[] = [
  { text: 'Source / Approved', status: 'source' },
  { text: 'Owner / Named', status: 'source' },
  { text: 'Permission / Tested', status: 'permission' },
  { text: 'Answer / Supported', status: 'answer' },
  { text: 'Gap / Open', status: 'gap' },
  { text: 'Change / Logged', status: 'change', outlined: true },
];

export const KNOWLEDGE = {
  folio: '06 / The company memory',
  heading: 'Your AI can only rely on what the company actually owns.',
  paragraphs: [
    'Company information is scattered, duplicated, stale, overexposed, under-owned, and carried ' +
      'in people’s heads. Connecting a model does not repair any of that.',
    'We identify approved sources, name owners, test access, evaluate real questions, expose ' +
      'contradictions, and record what the system should not answer. That makes knowledge ' +
      'operations part of the AI service — not a separate filing project nobody maintains.',
  ],
  action: { label: 'See how knowledge is operated', href: hrefFor('method') } as Action,
  quote:
    '“I don’t know” is a feature when the alternative is confident use of the wrong source.',
};

/* ------------------------------------------------------------------ 07 method */

export interface StepMark {
  label: string;
  value?: string;
  status?: ProofStatus;
}

export interface WorkOrderStep {
  name: string;
  detail: string;
  annotation?: string;
  marks: readonly StepMark[];
}

export const WORK_ORDER_STEPS: readonly WorkOrderStep[] = [
  {
    name: 'Map',
    detail:
      'Products, accounts, people, company information, integrations, spend, problems, and ' +
      'desired outcomes.',
    marks: [{ label: 'Output', value: 'Current-state record' }],
  },
  {
    name: 'Design',
    detail:
      'Choose the smallest viable product mix; identify overlap, prerequisites, owners, ' +
      'controls, support, and commercial route.',
    annotation: 'Smallest viable, not widest possible.',
    marks: [{ label: 'Output', value: 'Scope and route' }],
  },
  {
    name: 'Approve',
    detail:
      'Agree purpose, scope, data, responsibilities, costs, permitted use, tests, and stop ' +
      'conditions.',
    marks: [{ label: 'Gate', value: 'Customer approval', status: 'owner' }],
  },
  {
    name: 'Deploy',
    detail:
      'Establish customer-owned accounts, configure roles and settings, connect approved ' +
      'systems, test, document, and train.',
    marks: [{ label: 'Output', value: 'Runbook + training record' }],
  },
  {
    name: 'Stabilize',
    detail:
      'Support a bounded cohort, resolve access and quality problems, confirm cost signals, and ' +
      'complete acceptance.',
    marks: [{ label: 'Gate', value: 'Acceptance', status: 'answer' }],
  },
  {
    name: 'Operate',
    detail:
      'Manage users, support, monitoring, controls, incidents, vendor changes, spend, renewals, ' +
      'and monthly improvement.',
    annotation: 'This is the part nobody budgets for.',
    marks: [{ label: 'Cadence', value: 'Monthly', status: 'operated' }],
  },
  {
    name: 'Renew or exit',
    detail:
      'Reconcile value and licences, re-price, replace, export, transfer, or remove cleanly.',
    marks: [{ label: 'Output', value: 'Portable exit package' }],
  },
];

export const METHOD = {
  folio: '07 / From stack to service',
  heading: 'Map it. Deploy it. Operate it.',
  support:
    'A valid review can conclude: deploy, repair first, use a simpler product, keep the work ' +
    'human, or stop. Selling another tool is not the required outcome.',
  action: { label: 'Read the operating method', href: hrefFor('method') } as Action,
  loopLabel: 'Operate returns to map and design',
};

/* ------------------------------------------------------------------ 08 trust */

export interface HomeControlRow {
  control: string;
  mechanism: string;
  holder: string;
  state: string;
  status?: ProofStatus;
}

export const CONTROL_ROWS: readonly HomeControlRow[] = [
  {
    control: 'Customer ownership',
    mechanism:
      'Tenant, data, billing recovery, and exportable records remain customer-controlled by ' +
      'default',
    holder: 'Customer + Dirtyworks.ai',
    state: 'Default',
    status: 'owner',
  },
  {
    control: 'Approved use',
    mechanism:
      'Intended users, information, decisions, and exclusions are written before deployment',
    holder: 'Customer approves; Dirtyworks.ai records',
    state: 'Per scope',
    status: 'source',
  },
  {
    control: 'Access',
    mechanism:
      'Named accounts, MFA where available, least privilege, role and permission tests, ' +
      'revocable administration',
    holder: 'Shared',
    state: 'Tested',
    status: 'permission',
  },
  {
    control: 'Data and vendors',
    mechanism:
      'Location, retention, training use, subprocessors, and deletion reviewed proportionally',
    holder: 'Shared',
    state: 'Reviewed',
    status: 'source',
  },
  {
    control: 'Human decisions',
    mechanism:
      'Consequential employment, financial, legal, engineering, safety, and regulatory decisions ' +
      'remain accountable to people',
    holder: 'Customer',
    state: 'Reserved',
    status: 'human',
  },
  {
    control: 'Monitoring and incidents',
    mechanism:
      'Supported alerts, reporting, containment, notification, and written follow-up are defined',
    holder: 'Dirtyworks.ai within scope',
    state: 'Operated',
    status: 'operated',
  },
  {
    control: 'Portability',
    mechanism:
      'Current inventory, configuration, records, customer artefacts, and access removal form ' +
      'the exit package',
    holder: 'Shared',
    state: 'On exit',
    status: 'change',
  },
];

export const TRUST = {
  folio: '08 / Trust is operated',
  heading: 'Compliance is not a sticker.',
  paragraphs: [
    'Dirtyworks.ai helps clients identify relevant obligations, configure practical controls, ' +
      'maintain operating evidence, monitor the managed scope, and bring in privacy, security, ' +
      'legal, or industry specialists when the work requires them.',
    'We do not certify legal or regulatory compliance. We do not replace the customer’s ' +
      'accountable officers, counsel, security provider, or professional judgment.',
  ],
  action: { label: 'Read the trust model', href: hrefFor('trust') } as Action,
  caption: 'Public control extract',
  note: 'Customer-owned by default. Human accountability stays human.',
};

/* ------------------------------------------------------------------ 09 fit */

export interface FitFieldContent {
  segment: string;
  label: string;
  summary: string;
  included: readonly string[];
  /** exclusions are content at equal weight, not a disclaimer */
  excluded: readonly string[];
}

export const FIT_FIELDS: readonly FitFieldContent[] = [
  {
    segment: 'Professional services',
    label: 'Fit / Direct',
    summary:
      'Manage workforce AI, research, internal methods, templates, software procedures, ' +
      'engagement administration, onboarding, and low-risk workflow assistance.',
    included: [
      'Workforce AI accounts and policy',
      'Research and internal methods',
      'Templates and software procedures',
      'Engagement administration and onboarding',
      'Low-risk workflow assistance',
    ],
    excluded: [
      'Unsupervised professional judgment',
      'Employee decisions',
      'Client-record use without a specific approved scope',
    ],
  },
  {
    segment: 'Energy services',
    label: 'Fit / Direct',
    summary:
      'Manage workforce AI, commercial and project information, client requirements, internal ' +
      'systems, project administration, closeout, and bounded workflow assistance.',
    included: [
      'Workforce AI accounts and policy',
      'Commercial and project information',
      'Client requirements and internal systems',
      'Project administration and closeout',
      'Bounded workflow assistance',
    ],
    excluded: [
      'Safety, engineering, and field-control decisions',
      'Regulatory decisions without specialist governance',
      'Anything without a separately approved operating model',
    ],
  },
  {
    segment: 'Traditional MSPs',
    label: 'Fit / Partner',
    summary:
      'Add product selection, AI administration, enablement, knowledge operations, governance, ' +
      'and managed AI workflows to an existing client relationship.',
    included: [
      'Governed product selection',
      'AI account administration',
      'Enablement and supported-use triage',
      'Knowledge and evaluation operations',
      'Governance and managed AI workflows',
    ],
    excluded: [
      'Partner work without an explicit responsibility seam for identity, security, service ' +
        'desk, customer access, data roles, sales, support, margin, and liability',
    ],
  },
];

export const FIT = {
  folio: '09 / Initial fit',
  heading: 'Start where the work is valuable and the boundary is clear.',
};

/* ------------------------------------------------------------------ 10 MSP lane */

export interface SeamRow {
  party: string;
  body: string;
  /** the Dirtyworks.ai row is offset and bordered: the page's second grid violation */
  tone: 'msp' | 'dirtyworks' | 'customer';
}

export const SEAM_ROWS: readonly SeamRow[] = [
  {
    party: 'MSP / Accountable',
    body: 'Agreed infrastructure, identity, security, service desk, and client relationship.',
    tone: 'msp',
  },
  {
    party: 'Dirtyworks.ai / Accountable',
    body:
      'Agreed AI product, enablement, knowledge, evaluation, integration, and recurring ' +
      'operating scope.',
    tone: 'dirtyworks',
  },
  {
    party: 'Customer / Accountable',
    body:
      'Business purpose, policy, access approval, source truth, employee use, and consequential ' +
      'decisions.',
    tone: 'customer',
  },
];

export const MSP_LANE = {
  folio: '10 / For MSPs',
  heading: 'Keep the account. Add the AI practice.',
  paragraphs: [
    'Dirtyworks.ai gives traditional MSPs a managed AI operations capability without requiring ' +
      'them to build every catalogue, review, training, knowledge, evaluation, governance, and ' +
      'operating method from scratch.',
    'Referral, co-managed, and white-label structures are available when the client relationship, ' +
      'tenant access, product billing, service desk, data responsibilities, support, brand, ' +
      'margin, and liability are written down.',
  ],
  action: { label: 'Design a partner pilot', href: hrefFor('msps') } as Action,
  seamTitle: 'Responsibility seam',
};

/* ------------------------------------------------------------------ 11 manifesto */

export const WORK_NOUNS: readonly string[] = [
  'Product decisions',
  'Account ownership',
  'User access',
  'Training',
  'Company information',
  'Integrations',
  'Tests',
  'Support',
  'Policy',
  'Monitoring',
  'Incidents',
  'Cost',
  'Change',
  'Exit',
];

export const MANIFESTO = {
  headingLines: ['No theatre.', 'No mystery.'],
  headingFinalBefore: 'Work that ',
  /** the only acid on the page besides status chips */
  headingHighlight: 'works',
  headingFinalAfter: '.',
  lede: 'AI gets the spotlight. The work behind it does not.',
  closing: 'That is the dirty work. That is the service.',
};

/* ------------------------------------------------------------------ 12 conversion */

export const CONVERSION = {
  folio: '12 / Map the current state',
  heading: 'Show us what is already in the stack.',
  support:
    'Bring one recent event: an account nobody owned, a person who could not get access, a tool ' +
    'nobody supports, an integration that failed, a cost nobody expected, or an answer nobody ' +
    'could verify. We will start there.',
  primary: { label: 'Map your AI stack', href: hrefFor('start') } as Action,
  secondary: { label: 'Design an MSP pilot', href: hrefFor('msps') } as Action,
};
