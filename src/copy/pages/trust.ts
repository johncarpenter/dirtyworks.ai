/* /trust content. The page answers one question in two halves — where does my data go, and what is
   the AI allowed to do — and every section has to earn its place against that question. Copy
   started verbatim from mockups/design_files/Trust.dc.html and has since diverged; the section
   order is still the prototype's rule, limitations before the control register, by design
   (mockups/README.md: "This section comes before the control register by design").

   Two things were removed on purpose and should not come back without a decision behind them:

   1. The illustrative incident timeline ("How a bad answer gets handled"). It opened on a signal
      received at 10:14 and containment at 10:22, which reads as continuous monitoring of answer
      quality with a response time. We do not monitor answer quality and cannot promise a model
      gets better, so the section was cut and its containment work moved into the
      "Boundary and access incidents" control, which is scoped to events we can actually detect.
      TRUST_BEHAVIOUR states the non-promise in words.
   2. The usage-and-cost control row. Cost is a real part of the service and it is argued on
      /services; on this page it diluted the question the visitor came to ask. */
import type { ProofStatus } from '../../types/proof';

export interface TrustControlRow {
  control: string;
  mechanism: string;
  holder: string;
  state: string;
  status: ProofStatus;
}

export interface ExitChip {
  label: string;
  tone: 'sheet' | 'acid';
}

export const TRUST_HERO = {
  folio: 'Trust / 01 — Boundaries and records',
  headingLead: 'Your data has a ',
  headingAccent: 'boundary',
  headingTail: '. So does the AI.',
  lead:
    'Before anything runs, a deployment states where information may go, who can reach it, what ' +
    'the AI may act on, and what it must refuse. Those positions are written down, tested, and ' +
    'held by a named person — so the answer to \u201cis this controlled?\u201d is a record somebody ' +
    'can read, not a reassurance.',
};

export interface BehaviourPair {
  /** the failure mode, named the way it actually shows up */
  failure: string;
  /** the control that constrains it — what governance actually buys */
  control: string;
}

/* This section used to be a seven-item list headed "What we do not promise", and it read as a wall
   of refusals — a visitor arriving with a real worry got told seven times that we would not fix it.
   The worry is legitimate and the answer is better than "no": a model that invents things or sends
   data somewhere it should not is exactly what governance constrains. So each panel now names the
   failure mode and the control that holds it.

   The honesty did not move — it concentrated. The pull quote is the thesis of the entire page, and
   the closing paragraph keeps every non-promise the list used to carry. What we cannot do is still
   said plainly; it is simply no longer the only thing said. */
export const TRUST_BEHAVIOUR = {
  folio: '02 / What governance controls',
  heading: 'Governance is how you make it behave.',
  pullQuote: "We can't make the model better. Just better behaved.",
  pairs: [
    {
      failure: 'It makes things up.',
      control:
        'Answers are scoped to approved sources with a named owner, and a question outside the ' +
        'supported classes refuses instead of guessing. \u201cI don\u2019t know\u201d is a configured ' +
        'behaviour, not a shortfall.',
    },
    {
      failure: 'It sends data somewhere it should not.',
      control:
        'Retention, region, training use, and subprocessors get a written position per product ' +
        'before deployment, and a connector reaches only the sources on the register.',
    },
    {
      failure: 'It answers people who should not be asking.',
      control:
        'Named accounts, least privilege, and permission spot tests, so the assistant inherits ' +
        'the access the person already had and never more than that.',
    },
    {
      failure: 'It acts on something consequential.',
      control:
        'Employment, financial, legal, safety, and regulatory decisions stay with people, and an ' +
        'integration stops at a human approval before anything writes.',
    },
    {
      failure: 'It changes underneath you.',
      control:
        'A vendor changing terms, subprocessors, or the model behind the product re-runs the ' +
        'question-class tests and produces a logged decision before it stays in production.',
    },
  ] satisfies readonly BehaviourPair[],
  /* Every non-promise the old list carried, kept in one paragraph rather than seven panels. */
  closing:
    'None of this improves the model. A vendor ships what it ships and we are as stuck with it ' +
    'as you are. What changes is everything around it — what it can read, who can ask, what it ' +
    'may act on, what it must refuse, and what gets written down when it is wrong. Complete ' +
    'security, universal regulatory compliance, uninterrupted third-party services, and support ' +
    'for every AI product on the market are still not on offer. Neither is monitoring of answer ' +
    'quality: a wrong answer is found by the person reading it, and then worked through the ' +
    'configuration, the sources, and the vendor.',
};

/* Ten controls, and the test for admission is narrow: a row earns its place only if it answers
   "where does my data go" or "what is the AI allowed to do". Budgets and licence reconciliation are
   real operating work but they answer neither, so they live on /services now. Vendor change review
   folded into the data-position row, which is the part of a vendor change a visitor to THIS page
   actually cares about. */
export const TRUST_REGISTER = {
  folio: '03 / Public control register',
  heading: 'Ten controls. Each with a mechanism, a record, and a holder.',
  lead:
    'The register below is the public extract. The version inside an engagement names systems, ' +
    'people, and dates.',
  caption: 'Public control register / extract 0.3',
  note:
    'Customer-owned by default. Human accountability stays human. Nothing in this register is a ' +
    'legal or regulatory certification.',
  rows: [
    {
      control: 'Purpose and accountable owner',
      mechanism:
        'Written purpose, named customer owner, and approver of record before deployment',
      holder: 'Customer owner',
      state: 'Per scope',
      status: 'owner',
    },
    {
      control: 'Product, tenant, and data ownership',
      mechanism:
        'Customer-owned tenants, billing recovery path, and exportable records by default',
      holder: 'Customer + Dirtyworks.ai',
      state: 'Default',
      status: 'owner',
    },
    {
      control: 'Approved use and written boundary',
      mechanism:
        'Intended users, information, and decisions recorded with the prohibitions beside them — ' +
        'what the deployment may never read, never act on, and never send',
      holder: 'Customer approves',
      state: 'Recorded',
      status: 'source',
    },
    {
      control: 'Access and identity',
      mechanism: 'Named accounts, MFA where available, least privilege, revocable administration',
      holder: 'Shared with MSP or IT',
      state: 'Tested',
      status: 'permission',
    },
    {
      control: 'Data location, retention, training use, subprocessors',
      mechanism:
        'Proportional vendor review with a written position per product, re-checked when the ' +
        'vendor changes terms, subprocessors, or the model behind the product',
      holder: 'Shared',
      state: 'Reviewed',
      status: 'source',
    },
    {
      control: 'Source and permission integrity',
      mechanism: 'Source register, owner map, freshness checks, and permission spot tests',
      holder: 'Dirtyworks.ai operates',
      state: 'Per cycle',
      status: 'permission',
    },
    {
      control: 'Refusal and failure behaviour',
      mechanism:
        'Question-class tests at deployment and after any vendor or configuration change; ' +
        'unsupported questions refuse rather than guess',
      holder: 'Dirtyworks.ai operates',
      state: 'At change',
      status: 'answer',
    },
    {
      control: 'Human review',
      mechanism:
        'Consequential employment, financial, legal, engineering, safety, and regulatory ' +
        'decisions stay with people',
      holder: 'Customer',
      state: 'Reserved',
      status: 'human',
    },
    {
      control: 'Boundary and access incidents',
      mechanism:
        'Alerting on access, integration, and configuration events; triage, containment, ' +
        'notification, and written follow-up. Answer quality is customer-reported, not monitored',
      holder: 'Dirtyworks.ai within scope',
      state: 'Operated',
      status: 'operated',
    },
    {
      control: 'Export, transfer, deletion, revocation',
      mechanism: 'Exit package plus documented removal of Dirtyworks.ai access',
      holder: 'Shared',
      state: 'On exit',
      status: 'change',
    },
  ] satisfies TrustControlRow[],
};

export const TRUST_COMPLIANCE = {
  folio: '04 / Compliance readiness',
  heading: 'We operate controls. We do not sell a compliance sticker.',
  body:
    'Dirtyworks.ai helps translate the approved use case into practical configuration, access, ' +
    'records, monitoring, review, and escalation work. When legal, privacy, security, ' +
    'employment, engineering, safety, or industry-specific judgment is required, the accountable ' +
    'customer owner and qualified specialists remain part of the process.',
};

export const TRUST_EXIT = {
  folio: '05 / Exit',
  heading: 'Dependence should come from value. Not captivity.',
  body:
    'At offboarding, Dirtyworks.ai removes its access and provides the current inventory, agreed ' +
    'configurations, runbooks, operating records, evaluation material, customer artefacts, ' +
    'vendor actions, and residual-risk list in portable form.',
  chips: [
    { label: 'Inventory', tone: 'sheet' },
    { label: 'Configurations', tone: 'sheet' },
    { label: 'Runbooks', tone: 'sheet' },
    { label: 'Operating records', tone: 'sheet' },
    { label: 'Evaluation material', tone: 'sheet' },
    { label: 'Access removed', tone: 'acid' },
  ] satisfies ExitChip[],
};

export const TRUST_CTA = {
  folio: '06 / Conversion',
  heading: 'Write the responsibility seam before production.',
  support:
    'Bring the use case you are least sure about. We will map who owns what, and what the ' +
    'service will refuse to do.',
  primaryLabel: 'Review the operating boundary',
  secondaryLabel: 'See what we manage',
};
