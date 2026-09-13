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
      /services; on this page it diluted the question the visitor came to ask.

   The workspace-pilot refresh applied the claim corrections from the brief: no guaranteed refusal
   ("we configure and test supported question types and refusal behaviour; outputs still require
   review"), no "never more than" inherited permissions ("we define and test access for each
   connected resource"), no "before anything writes" ("actions requiring approval are identified
   and tested in the pilot scope"), and one statement of what quality monitoring is and is not.
   Ownership is no longer "customer-owned by default" everywhere: a customer-direct product is, a
   partner-provisioned workspace documents account control explicitly, and the register says so. */
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
        'Answers are scoped to approved sources with a named owner. We configure and test ' +
        'supported question types and refusal behaviour, so \u201cI don\u2019t know\u201d is a ' +
        'configured response rather than a shortfall. AI outputs still require review.',
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
        'Named accounts, least privilege, and permission tests. We define and test access for ' +
        'each connected resource, rather than assuming the permissions of a source carry through ' +
        'every connection on their own.',
    },
    {
      failure: 'It acts on something consequential.',
      control:
        'Employment, financial, legal, safety, and regulatory decisions stay with people. ' +
        'Actions requiring approval are identified and tested in the pilot scope.',
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
    'for every AI product on the market are still not on offer. On quality: we test agreed use ' +
    'cases at setup and after relevant changes, and investigate reported output problems. ' +
    'Continuous review of every AI answer is not included.',
};

/* Eleven controls, and the test for admission is narrow: a row earns its place only if it answers
   "where does my data go" or "what is the AI allowed to do". Budgets and licence reconciliation are
   real operating work but they answer neither, so they live on /services now. Vendor change review
   folded into the data-position row, which is the part of a vendor change a visitor to THIS page
   actually cares about. The eleventh row is the workspace pilot's: agreed scope, and what it takes
   for a team-created tool to become a supported one. */
export const TRUST_REGISTER = {
  folio: '03 / Public control register',
  heading: 'Eleven controls. Each with a mechanism, a record, and a holder.',
  lead:
    'The register below is the public extract. The version inside an engagement names systems, ' +
    'people, and dates.',
  caption: 'Public control register / extract 0.4',
  note:
    'Clear responsibilities. Human accountability. Account control, data handling, and handover ' +
    'are agreed before deployment. Nothing in this register is a legal or regulatory ' +
    'certification.',
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
      control: 'Account control, data handling, and handover',
      mechanism:
        'Agreed before deployment. A customer-direct product stays customer-owned; a ' +
        'partner-provisioned workspace documents who controls the account, how data and tools ' +
        'are handled, and how they are handed over',
      holder: 'Customer + Dirtyworks.ai',
      state: 'Agreed',
      status: 'owner',
    },
    {
      control: 'Workspace scope and team-created tools',
      mechanism:
        'Agreed users, information, connections, and spending for the pilot workspace. A tool ' +
        'the business comes to rely on gets an agreed owner, tests, and maintenance scope before ' +
        'it is supported',
      holder: 'Customer approves; Dirtyworks.ai supports',
      state: 'Per pilot',
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
        'Supported question types and refusal behaviour configured and tested at setup and after ' +
        'relevant changes; outputs still require review',
      holder: 'Dirtyworks.ai operates',
      state: 'At change',
      status: 'answer',
    },
    {
      control: 'Human review',
      mechanism:
        'Consequential employment, financial, legal, engineering, safety, and regulatory ' +
        'decisions stay with people; actions requiring approval are identified and tested in scope',
      holder: 'Customer',
      state: 'Reserved',
      status: 'human',
    },
    {
      control: 'Boundary and access incidents',
      mechanism:
        'Alerting on access, integration, and configuration events; triage, containment, ' +
        'notification, and written follow-up. Reported output problems are investigated; ' +
        'continuous review of every AI answer is not included',
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
    'Bring the use case you are least sure about. We will map who controls what, what the ' +
    'service will refuse to do, and what a pilot would need to agree first.',
  primaryLabel: 'Discuss a workspace pilot',
  secondaryLabel: 'Explore managed services',
};
