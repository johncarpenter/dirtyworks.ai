/* /trust content. Copy is verbatim from mockups/design_files/Trust.dc.html; the section order here
   is the order the page renders — limitations before the control register, by design
   (mockups/README.md: "This section comes before the control register by design"). */
import type { ProofStatus } from '../../types/proof';

export interface TrustControlRow {
  control: string;
  mechanism: string;
  holder: string;
  state: string;
  status: ProofStatus;
}

/** The 3px left border on a timeline entry. The entry's meaning is always in its text. */
export type IncidentTone = 'orange' | 'blueprint' | 'acid';

export interface IncidentEntry {
  /** timestamp or sequence position, e.g. "10:14 MT" */
  time: string;
  /** what happened, e.g. "Signal received" */
  event: string;
  detail: string;
  tone: IncidentTone;
}

export interface ExitChip {
  label: string;
  tone: 'sheet' | 'acid';
}

export const TRUST_HERO = {
  folio: 'Trust / 01 — Boundaries and records',
  headingLead: 'Trust is a record of ',
  headingAccent: 'work',
  headingTail: '.',
  lead:
    'No vendor logo, policy document, or confidence score makes an AI service trustworthy by ' +
    'itself. Trust is built through named ownership, tested access, visible evidence, monitored ' +
    'operation, honest failure, and a clean way out.',
};

export const TRUST_LIMITATIONS = {
  folio: '02 / Limitations first',
  heading: 'What we do not promise.',
  pullQuote: "“I don't know” is a feature.",
  items: [
    'Perfect answers.',
    'Complete security.',
    'Universal regulatory compliance.',
    'Uninterrupted third-party services.',
    'Unrestricted support or development.',
    'Autonomous consequential decisions.',
    'Savings before a baseline and measurement method exist.',
    'Support for every AI product or use case.',
  ],
};

export const TRUST_REGISTER = {
  folio: '03 / Public control register',
  heading: 'Twelve controls. Each with a mechanism, a record, and a holder.',
  lead:
    'The register below is the public extract. The version inside an engagement names systems, ' +
    'people, and dates.',
  caption: 'Public control register / extract 0.2',
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
      control: 'Approved users and use',
      mechanism:
        'Intended users, information, decisions, and exclusions recorded in a use-case register',
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
      mechanism: 'Proportional vendor review with a written position per product',
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
      control: 'Evaluation and failure paths',
      mechanism:
        'Question-class evaluation set; unsupported answers refuse rather than guess',
      holder: 'Dirtyworks.ai operates',
      state: 'Operated',
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
      control: 'Usage and cost controls',
      mechanism: 'Budgets, alerts, licence reconciliation, dormant-access removal',
      holder: 'Dirtyworks.ai within scope',
      state: 'Monthly',
      status: 'operated',
    },
    {
      control: 'Monitoring and incidents',
      mechanism: 'Supported alerts, triage, containment, notification, and written follow-up',
      holder: 'Dirtyworks.ai within scope',
      state: 'Operated',
      status: 'operated',
    },
    {
      control: 'Vendor and change review',
      mechanism: 'Vendor notice review, regression testing, and a logged change decision',
      holder: 'Shared',
      state: 'Logged',
      status: 'change',
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

export const TRUST_INCIDENT = {
  folio: '05 / Illustrative incident voice',
  heading: 'How a bad answer gets handled.',
  body:
    'This is the voice and sequence of an incident record — not a historical event. No customer ' +
    'incident has occurred, and none would be published without approval.',
  /** must match the marker registered for trust-incident-voice in claim-artefacts.ts */
  stampLabel: 'Illustrative incident voice',
  entries: [
    {
      time: '10:14 MT',
      event: 'Signal received',
      detail: 'Materially incorrect answer reported in a supported question class.',
      tone: 'orange',
    },
    {
      time: '10:22 MT',
      event: 'Scope contained',
      detail: 'Affected connector disabled. Designated customer contact notified.',
      tone: 'orange',
    },
    {
      time: '11:05 MT',
      event: 'Evidence preserved',
      detail: 'Relevant configuration, source, access, and event records retained for review.',
      tone: 'blueprint',
    },
    {
      time: 'Next',
      event: 'Owner named',
      detail: 'Root cause, customer impact, corrective action, and release decision recorded.',
      tone: 'acid',
    },
  ] satisfies IncidentEntry[],
};

export const TRUST_EXIT = {
  folio: '06 / Exit',
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
  folio: '07 / Conversion',
  heading: 'Write the responsibility seam before production.',
  support:
    'Bring the use case you are least sure about. We will map who owns what, and what the ' +
    'service will refuse to do.',
  primaryLabel: 'Review the operating boundary',
  secondaryLabel: 'See what we manage',
};
