/* Catalogue page content.

   Copy is verbatim from mockups/design_files/Catalogue.dc.html and mockups/README.md §3, except
   §02 — see the note on TEAM_MIX, which is later than the prototype. Headings are authored in
   sentence case and uppercased by CSS.

   Three standing rules for this page, all of them load-bearing:
   1. Candidate product names are TEXT. No logo, no mark, no image.
   2. There is no price, no currency, no per-seat figure and no buy button. Every commercial value
      resolves to "Verify at quote" or "Scoped at review".
   3. The quote sheet is a structure, not an offer, and renders its ILLUSTRATIVE stamp — see
      src/copy/claim-artefacts.ts, which the release gate reads. */
import { hrefFor } from '../routes';
import type { ProofStatus } from '../../types/proof';

export interface Action {
  label: string;
  href: string;
}

/** A hero declaration split so one phrase can carry the orange emphasis. */
export interface SplitHeading {
  first: string;
  secondPrefix: string;
  emphasis: string;
  secondSuffix: string;
}

export interface ApprovalQuestion {
  /** first half of the chip, e.g. "Job" */
  label: string;
  /** second half of the chip, e.g. "Defined" */
  state: string;
  question: string;
}

export interface TeamMix {
  /** the team, named the way a company names it */
  team: string;
  /** the products that team actually uses, as text — never a logo */
  tools: string;
  /** the work those products do for that team */
  job: string;
  /** the operating work the service runs around them */
  managed: string;
}

export interface ProductCategory {
  /** the menu word: WORK / FIND / MAKE / BUILD / MOVE / HOLD / WATCH */
  word: string;
  /** operating tier — Register, Manage, or Operate */
  tier: string;
  job: string;
  /** what the category does, then its prerequisites */
  detail: string;
  /** candidate product names, as text — never a logo */
  candidates: string;
  /** Standard, Conditional, or Candidate */
  state: string;
  status: ProofStatus;
  /** how the software is bought — never who operates it */
  route: string;
  /** the operating work the service adds on top of the licence */
  emphasis: string;
}

export interface CommercialPanel {
  route: string;
  body: string;
}

/** `commercial` values are the ones that must never carry a number. */
export type QuoteValueKind = 'plain' | 'commercial' | 'chip';

export interface QuoteLine {
  label: string;
  value: string;
  kind: QuoteValueKind;
}

export const CATALOGUE_HERO = {
  folio: 'Catalogue / 01 — The governed mix',
  heading: {
    first: 'Choose the tools.',
    secondPrefix: 'Keep one ',
    emphasis: 'operating model',
    secondSuffix: '.',
  } satisfies SplitHeading,
  lead:
    'The catalogue helps a client select a practical product mix without turning every vendor ' +
    'into a separate operating problem. Products are organized by the job they perform, then ' +
    'assessed for fit, ownership, commercial path, controls, deployment work, and recurring ' +
    'support.',
  action: { label: 'Compose a product mix', href: hrefFor('start') } satisfies Action,
};

/* The argument of this section is vendor plurality, and it is the first thing a visitor should
   read after the hero: a real company does not standardise on one AI vendor, and a catalogue that
   implies otherwise loses the room in the first meeting. Four teams, four vendors, four renewal
   dates — and the chip on every row says the same word, because the service is the thing that makes
   that mix behave like one operating model.

   Rule 1 at the top of this file applies here more than anywhere: these are the most recognisable
   names on the site and they are TEXT. Naming a product is a statement of what we operate, never a
   claim of resale authority or vendor endorsement — §05 draws that line explicitly. */
export const TEAM_MIX = {
  folio: '02 / The mix in practice',
  heading: 'Finance and engineering will never pick the same tool.',
  intro:
    'A working portfolio is four or five vendors chosen by the teams that use them, not one vendor ' +
    'chosen by procurement. Tools that arrived before we did are registered on the same terms — ' +
    'given an owner and a cost line, then operated or retired.',
  /** the second half of every row chip; the whole argument in one word */
  managedLabel: 'Managed',
  rows: [
    {
      team: 'Finance',
      tools: 'ChatGPT Business',
      job:
        'Variance commentary, vendor contract review, and the policy questions that used to wait ' +
        'for the controller.',
      managed:
        'Named seats, a written rule on what never goes into a prompt, retention set, spend ' +
        'reconciled monthly.',
    },
    {
      team: 'Administration',
      tools: 'Microsoft 365 Copilot',
      job:
        'Mail, documents, and meeting follow-up inside the tenant the company already pays for.',
      managed:
        'Licence fit against the existing Microsoft seats, admin roles, joiner and leaver ' +
        'process, overlap checked before renewal.',
    },
    {
      team: 'Engineering',
      tools: 'Claude Team and Claude Code',
      job:
        'Code review, refactors, and the long-context work a general assistant handles badly.',
      managed:
        'Repository scope, key custody, budget ceilings, an evaluation set, and a monthly usage ' +
        'read.',
    },
    {
      team: 'Marketing',
      tools: 'Midjourney and Apollo.io',
      job: 'Campaign imagery, and the outbound list a sales conversation starts from.',
      managed:
        'Brand and consent guidance, contact-data ownership, and named accounts instead of ' +
        'personal logins.',
    },
  ] satisfies readonly TeamMix[],
  closing: 'Four vendors, four renewal dates, one operating model.',
};

export const APPROVAL_QUESTIONS = {
  folio: '03 / What the catalogue is',
  heading: 'A governed shortlist. Not an open app store.',
  intro: 'Nothing enters the catalogue until five questions have answers a customer can inspect.',
  questions: [
    { label: 'Job', state: 'Defined', question: 'What company job does the product perform?' },
    {
      label: 'Owner',
      state: 'Named',
      question: 'Who owns tenant, billing recovery, data, renewal, and exit?',
    },
    {
      label: 'Path',
      state: 'Verified',
      question: 'Customer-direct, authorized resale, cloud marketplace, or managed deployment?',
    },
    {
      label: 'Control',
      state: 'Assessed',
      question: 'What information, people, systems, and decisions can it affect?',
    },
    {
      label: 'Service',
      state: 'Scoped',
      question:
        'What deployment, administration, support, monitoring, and change work is required?',
    },
  ] satisfies readonly ApprovalQuestion[],
};

export const PRODUCT_MENU = {
  folio: '04 / Product menu — seven jobs',
  categories: [
    {
      word: 'Work',
      tier: 'Tier / Operate',
      job: 'General workforce assistants',
      detail:
        'Everyday drafting, summarising, and question answering for whole teams. Prerequisites: ' +
        'identity provider, acceptable-use policy, named admin.',
      candidates:
        'ChatGPT Business / Claude Team / Microsoft 365 Copilot / Google Workspace with Gemini',
      state: 'State / Standard',
      status: 'operated',
      route: 'Route: customer-direct or authorized resale',
      emphasis: 'Account, identity, policy, training, support',
    },
    {
      word: 'Find',
      tier: 'Tier / Operate',
      job: 'Research and company knowledge',
      detail:
        'Answers from approved company sources and external research. Prerequisites: source ' +
        'register, owner map, permission model.',
      candidates: 'Perplexity Enterprise / approved assistant and knowledge configurations',
      state: 'State / Standard',
      status: 'operated',
      route: 'Route: customer-direct or managed deployment',
      emphasis: 'Sources, permissions, retention, evidence, evaluation',
    },
    {
      word: 'Make',
      tier: 'Tier / Manage',
      job: 'Images, meetings, documents, and content',
      detail:
        'Marketing and administrative production work. Prerequisites: brand and records policy, ' +
        'consent practice for recordings.',
      candidates: 'Midjourney / Canva Business / Fathom / Notion Business',
      state: 'State / Conditional',
      status: 'neutral',
      route: 'Route: customer-direct',
      emphasis: 'Named accounts, records policy, brand and use guidance',
    },
    {
      word: 'Build',
      tier: 'Tier / Operate',
      job: 'Coding, models, and APIs',
      detail:
        'Developer assistance and application model access. Prerequisites: key custody, budget ' +
        'ceilings, evaluation set, change control.',
      candidates:
        'GitHub Copilot / OpenAI API / Anthropic API / OpenRouter / Azure / AWS / Google Cloud',
      state: 'State / Standard',
      status: 'operated',
      route: 'Route: customer cloud or marketplace',
      emphasis: 'Keys, budgets, evaluations, model and change control',
    },
    {
      word: 'Move',
      tier: 'Tier / Operate',
      job: 'Integration and automation',
      detail:
        'Connections between approved applications, with human approval on consequential steps. ' +
        'Prerequisites: credential custody, test cases, rollback plan.',
      candidates: 'Zapier / Make / n8n',
      state: 'State / Conditional',
      status: 'neutral',
      route: 'Route: customer-direct or managed deployment',
      emphasis: 'Credentials, testing, exceptions, monitoring, rollback',
    },
    {
      word: 'Hold',
      tier: 'Tier / Manage',
      job: 'Application data and semantic search',
      detail:
        'Storage and retrieval behind a company application. Prerequisites: region decision, ' +
        'backup and retention rules, capacity plan.',
      candidates: 'Supabase / Pinecone',
      state: 'State / Candidate',
      status: 'neutral',
      route: 'Route: customer-direct',
      emphasis: 'Access, region, backup, retention, capacity',
    },
    {
      word: 'Watch',
      tier: 'Tier / Register',
      job: 'Tracing and evaluation',
      detail:
        'Telemetry behind assisted and automated workflows, so a quality failure can be found ' +
        'and priced. Prerequisites: evaluation set, alert owner.',
      candidates: 'Langfuse / LangSmith',
      state: 'State / Candidate',
      status: 'neutral',
      route: 'Route: customer-direct',
      emphasis: 'Telemetry, tests, alerts, incidents, cost review',
    },
  ] satisfies readonly ProductCategory[],
  primary: { label: 'Add to draft portfolio', href: hrefFor('start') } satisfies Action,
  secondary: { label: 'Ask about this category', href: hrefFor('start') } satisfies Action,
  /** Registered as the catalogue's VERIFY AT QUOTE artefact in src/copy/claim-artefacts.ts. */
  disclaimer: 'No prices and no buy button. The configurator is not a live application yet.',
};

export const COMMERCIAL_ROUTE = {
  folio: '05 / Commercial route',
  heading: 'Who sends the software invoice does not define the service.',
  panels: [
    {
      route: 'Customer-direct',
      body:
        'The client contracts with the vendor. Dirtyworks.ai deploys and administers the approved ' +
        'account.',
    },
    {
      route: 'Authorized resale',
      body:
        'Dirtyworks.ai or an authorized channel supplies the applicable product under current ' +
        'contractual rights.',
    },
    {
      route: 'Customer cloud / marketplace',
      body:
        "The product runs in the client's cloud subscription. Dirtyworks.ai manages the agreed " +
        'architecture and operation.',
    },
    {
      route: 'Customer-owned managed deployment',
      body:
        'Approved software is deployed into client-controlled infrastructure under applicable ' +
        'licence terms.',
    },
  ] satisfies readonly CommercialPanel[],
  boundary:
    'Partner-program membership, a public price page, or technical access does not establish ' +
    'resale authority. The quote confirms the seller of record.',
};

export const QUOTE_SHEET = {
  folio: '06 / What a quote contains',
  heading: 'Every line has an owner and a validity date.',
  intro:
    'The composer output below is a structure, not an offer. Vendor prices and internal fees are ' +
    'confirmed at quote.',
  sheetLabel: 'Draft portfolio / composer output',
  lines: [
    {
      label: 'Selected product / plan',
      value: 'Workforce assistant — business tier',
      kind: 'plain',
    },
    {
      label: 'Licence quantity / usage budget',
      value: '24 seats + monthly API ceiling',
      kind: 'plain',
    },
    { label: 'Managed users', value: '24 named, 3 admin', kind: 'plain' },
    {
      label: 'Vendor charge / who pays it',
      value: 'Verify at quote — customer-direct',
      kind: 'commercial',
    },
    {
      label: 'One-time deployment / onboarding',
      value: 'Scoped at review',
      kind: 'commercial',
    },
    {
      label: 'Monthly Dirtyworks.ai management',
      value: 'Scoped at review',
      kind: 'commercial',
    },
    {
      label: 'Prerequisites and minimums',
      value: 'Identity provider, use policy, named admin',
      kind: 'plain',
    },
    {
      label: 'Approval / verification state',
      value: 'Awaiting customer approval',
      kind: 'chip',
    },
    {
      label: 'Assumptions / exclusions / validity',
      value: 'Listed in full on the quote, dated',
      kind: 'plain',
    },
  ] satisfies readonly QuoteLine[],
};

export const CATALOGUE_CTA = {
  folio: '07 / Conversion',
  heading: 'Bring the products you already have. Add only what the work requires.',
  support:
    'We start from the current stack — including the licences that should be cancelled.',
  primary: { label: 'Compose a product mix', href: hrefFor('start') } satisfies Action,
  secondary: { label: 'See what we manage', href: hrefFor('services') } satisfies Action,
};
