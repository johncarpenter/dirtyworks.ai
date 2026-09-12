/* /msps content. Copy started verbatim from mockups/design_files/ForMSPs.dc.html; headings are
   authored in sentence case and uppercased by CSS (scripts/check-content.ts RULE-7).

   The workspace-pilot refresh added the managed workspace as a concrete delivery option
   (WORKSPACE_OPTION), one client at a time. Two things it deliberately does NOT say: that
   partnering with Dirtyworks.ai extends Dirtyworks.ai's own Cloudflare relationship to the
   partner, or that white-label deployment is instant. The 90-day review in the pilot steps is the
   existing partner pilot's; it is not copied to the direct workspace offer.

   The seam matrix is the load-bearing structure on this page: ten responsibility lines, three
   parties, and thirty cells that each carry a word. `lead` marks the party that carries the line —
   it selects that party's colour and the 600 weight, but the meaning is always in the text, never
   in the colour (constitution Principle IV, FR-047). */

/** 02 / The workspace as a delivery option. One client, one defined pilot. */
export const WORKSPACE_OPTION = {
  folio: '02 / A concrete delivery option',
  heading: 'Bring a managed AI workspace to your clients.',
  body:
    'Start with one client and a defined pilot: a Cloudflare OS workspace customized for one of ' +
    'their teams, with Dirtyworks.ai configuring, onboarding, and supporting the agreed scope. We ' +
    'agree how your team and Dirtyworks.ai share onboarding, access, support, and the customer ' +
    'relationship before anything is deployed. Managing the AI tools a client already has ' +
    'remains available on the same terms.',
  /* The boundary. A partner program's existence is not proof of enrolment, entitlement, or
     trademark permission, and a partnership with us does not transfer whatever relationship we
     hold to the partner. */
  boundary:
    'Partnering with Dirtyworks.ai is a relationship with Dirtyworks.ai. It does not extend our ' +
    'platform relationships to your practice, promise instant white-label deployment, or grant ' +
    'access to every Cloudflare product. Each pilot is delivered one client at a time.',
  action: 'Discuss an MSP pilot',
} as const;

export interface PracticeItem {
  /** two-digit index, authored rather than derived so the register reads as a record */
  index: string;
  text: string;
}

/** 03 / What the practice adds — eight things a partner does not have to build twice. */
export const PRACTICE_HEADING = 'Eight things you do not have to build twice.';

export const PRACTICE_ITEMS: readonly PracticeItem[] = [
  { index: '01', text: 'A managed workspace pilot, or governed product selection for existing tools.' },
  { index: '02', text: 'Client AI account and user administration.' },
  { index: '03', text: 'Role-based onboarding, training, and supported-use triage.' },
  { index: '04', text: 'Company knowledge, source, and evaluation operations.' },
  { index: '05', text: 'Application integration and controlled automation.' },
  { index: '06', text: 'AI use-case, control, and compliance-readiness records.' },
  { index: '07', text: 'Monitoring, incidents, vendor change, spend, and renewal review.' },
  { index: '08', text: 'Reusable runbooks, responsibility schedules, and offboarding.' },
];

export interface PartnerModel {
  name: string;
  /** 'orange' is the co-managed card: this page's single deliberate grid violation */
  emphasis: 'ink' | 'orange';
  customerRelationship: string;
  visibility: string;
  seam: string;
}

/** 04 / Three models. Each model states the same three things, so they can be compared. */
export const PARTNER_MODELS: readonly PartnerModel[] = [
  {
    name: 'Referral',
    emphasis: 'ink',
    customerRelationship: 'MSP introduces. Dirtyworks.ai contracts and delivers.',
    visibility: 'Visible.',
    seam: 'Commercial handoff and coordination.',
  },
  {
    name: 'Co-managed',
    emphasis: 'orange',
    customerRelationship: 'MSP and Dirtyworks.ai share delivery under named scopes.',
    visibility: 'Visible or co-branded.',
    seam: 'Explicit RACI, escalation, service desk, access, and margin.',
  },
  {
    name: 'White-label',
    emphasis: 'ink',
    customerRelationship:
      'MSP leads brand and contract. Dirtyworks.ai performs agreed subcontracted work.',
    visibility: 'Limited, as commercially and legally appropriate.',
    seam:
      'Subcontract, data role, access disclosure, support, liability, and customer transparency.',
  },
];

/** The three field labels every model answers, in order. */
export const MODEL_FIELD_LABELS = {
  customerRelationship: 'Customer relationship',
  visibility: 'Our visibility',
  seam: 'Working seam',
} as const;

/** Economics are withheld until a live partner has validated them. Not a teaser — a refusal. */
export const MODEL_NOTE =
  'Verify at quote — discounts and wholesale percentages are not published before live partner ' +
  'validation.';

export interface SeamCell {
  /** the word in the cell; never empty, never colour alone */
  text: string;
  /** this party carries the line */
  lead?: boolean;
}

export interface SeamRow {
  line: string;
  msp: SeamCell;
  dirtyworks: SeamCell;
  customer: SeamCell;
  /** the AI-account line: offset, raised ground, orange edge */
  emphasis?: boolean;
}

/** 05 / Responsibility seam. Column headers, in party order. */
export const SEAM_COLUMNS = {
  line: 'Responsibility line',
  msp: 'MSP',
  dirtyworks: 'Dirtyworks.ai',
  customer: 'Customer',
} as const;

export const SEAM_HEADING = 'Ten lines. Every one gets a name before the pilot starts.';

export const SEAM_ROWS: readonly SeamRow[] = [
  {
    line: 'Sales and qualification',
    msp: { text: 'Lead', lead: true },
    dirtyworks: { text: 'Support' },
    customer: { text: '—' },
  },
  {
    line: 'Contract and seller of record',
    msp: { text: 'Per model', lead: true },
    dirtyworks: { text: 'Per model', lead: true },
    customer: { text: 'Signs' },
  },
  {
    line: 'Product billing and renewal',
    msp: { text: 'Per route' },
    dirtyworks: { text: 'Reconciles', lead: true },
    customer: { text: 'Owns', lead: true },
  },
  {
    line: 'Identity, endpoint, network, cloud, cybersecurity',
    msp: { text: 'Owns', lead: true },
    dirtyworks: { text: 'Consumes' },
    customer: { text: 'Approves' },
  },
  {
    line: 'AI account and product configuration',
    msp: { text: 'Visibility' },
    dirtyworks: { text: 'Owns', lead: true },
    customer: { text: 'Approves' },
    emphasis: true,
  },
  {
    line: 'Source truth and access approval',
    msp: { text: '—' },
    dirtyworks: { text: 'Tests' },
    customer: { text: 'Owns', lead: true },
  },
  {
    line: 'Training and service desk',
    msp: { text: 'Tier 1', lead: true },
    dirtyworks: { text: 'AI scope', lead: true },
    customer: { text: 'Attends' },
  },
  {
    line: 'Evaluation, monitoring, incident, change',
    msp: { text: 'Escalation' },
    dirtyworks: { text: 'Owns', lead: true },
    customer: { text: 'Notified' },
  },
  {
    line: 'Privacy, security, legal specialist work',
    msp: { text: 'Coordinates' },
    dirtyworks: { text: 'Coordinates' },
    customer: { text: 'Owns', lead: true },
  },
  {
    line: 'Reporting, value review, offboarding',
    msp: { text: 'Joint' },
    dirtyworks: { text: 'Produces', lead: true },
    customer: { text: 'Accepts' },
  },
];

export interface PilotStep {
  index: string;
  text: string;
}

/** 06 / One-customer pilot. Seven steps, and the seventh admits stopping is an outcome. */
export const PILOT_HEADING = 'Prove the seam with one customer.';

export const PILOT_STEPS: readonly PilotStep[] = [
  { index: '01', text: 'Partner discovery and qualification.' },
  {
    index: '02',
    text: 'Select one low or medium-risk client problem and the current product environment.',
  },
  {
    index: '03',
    text:
      'Agree customer ownership, responsibilities, sales and contract model, support, and ' +
      'economics.',
  },
  { index: '04', text: 'Complete a paid review.' },
  {
    index: '05',
    text:
      'Deploy a bounded scope: a managed workspace pilot for one of their teams, or management ' +
      'of the tools they already use.',
  },
  { index: '06', text: 'Run a 90-day operating and partner review.' },
  { index: '07', text: 'Repeat, revise, or stop.' },
];

/** 01 — the hero, split so the accented fragment stays a fragment rather than a parsed string. */
export const HERO = {
  folio: 'For MSPs / 01 — Partner models',
  lineOne: 'Keep the account.',
  lineTwoBefore: 'Add the ',
  lineTwoAccent: 'AI practice',
  lineTwoAfter: '.',
  lead:
    'Dirtyworks.ai supplies the managed workspace pilot, the product review, enablement, ' +
    'knowledge, integration, governance, evaluation, and operating method behind a managed AI ' +
    'service. The partner model can be referral, co-managed, or white-label when the ' +
    'responsibilities and economics work.',
  action: 'Discuss an MSP pilot',
} as const;

/** 07 / Conversion. */
export const CTA = {
  folio: '07 / Conversion',
  heading: 'Bring one client. Write down who owns what.',
  support:
    'A partner pilot starts with one account, one defined scope, and a responsibility schedule ' +
    'both sides can sign.',
  primaryLabel: 'Discuss an MSP pilot',
  secondaryLabel: 'Read the trust approach',
} as const;
