/* /method content. Copy is verbatim from mockups/design_files/Method.dc.html. */

/** Gate chip role. The chip's meaning is always in its label; the colour only reinforces it. */
export type GateTone = 'review' | 'stop' | 'release' | 'outlined';

export interface LifecycleStep {
  /** step name, e.g. "Map" */
  name: string;
  /** mono step marker, e.g. "Step 01" */
  step: string;
  inputs: string;
  work: string;
  decision: string;
  output: string;
  gate: string;
  gateTone: GateTone;
}

/** Outcome chip role. DEPLOY is one valid answer among six; STOP is another. */
export type OutcomeTone = 'deploy' | 'alternative' | 'human' | 'stop';

export interface Outcome {
  label: string;
  tone: OutcomeTone;
}

export interface RecordField {
  label: string;
  value: string;
  /** the closing field carries the 3px orange left border */
  emphasis?: boolean;
}

export const METHOD_HERO = {
  folio: 'Method / 01 — Before production',
  headingLead: 'Good AI operations begin before the ',
  headingAccent: 'login',
  headingTail: '.',
  lead:
    'Product choice matters. So do account ownership, source quality, access, training, ' +
    'integrations, support, tests, cost controls, incidents, and exit. We make those decisions ' +
    'visible before production and keep them current afterward.',
};

export const METHOD_LIFECYCLE = {
  folio: '02 / Lifecycle work order',
  heading: 'Map it. Deploy it. Operate it.',
  steps: [
    {
      name: 'Map',
      step: 'Step 01',
      inputs:
        'Current products, accounts, people, information, integrations, spend, and recent ' +
        'failure events.',
      work: 'Inventory, interviews, permission spot checks, cost pull, problem framing.',
      decision: 'Confirm scope of the map and who can be interviewed.',
      output: 'Current-state record.',
      gate: 'Gate / Scope agreed',
      gateTone: 'review',
    },
    {
      name: 'Design',
      step: 'Step 02',
      inputs: 'Current-state record, business priorities, existing systems.',
      work:
        'Smallest viable product mix, overlap and prerequisite analysis, owner and control ' +
        'design, commercial route.',
      decision: 'Choose the mix, or choose to consolidate instead.',
      output: 'Scope, route, and owner map.',
      gate: 'Gate / Design review',
      gateTone: 'review',
    },
    {
      name: 'Approve',
      step: 'Step 03',
      inputs: 'Proposed scope, data boundary, cost estimate, responsibilities.',
      work: 'Write purpose, permitted use, exclusions, tests, and stop conditions.',
      decision: 'Named approver signs the operating scope.',
      output: 'Approved use record.',
      gate: 'Stop gate',
      gateTone: 'stop',
    },
    {
      name: 'Deploy',
      step: 'Step 04',
      inputs: 'Approved scope, identity environment, approved sources.',
      work:
        'Customer-owned accounts, roles and settings, approved connections, tests, ' +
        'documentation, training.',
      decision: 'Approve access grants and the pilot cohort.',
      output: 'Runbook and training record.',
      gate: 'Gate / Test pass',
      gateTone: 'review',
    },
    {
      name: 'Stabilize',
      step: 'Step 05',
      inputs: 'Deployed configuration, bounded cohort, support channel.',
      work: 'Resolve access and quality problems, confirm cost signals, tune guidance.',
      decision: 'Accept, extend the pilot, or stop.',
      output: 'Acceptance record.',
      gate: 'Release gate',
      gateTone: 'release',
    },
    {
      name: 'Operate',
      step: 'Step 06 / monthly',
      inputs: 'Live service, tickets, telemetry, vendor notices, spend.',
      work:
        'Users, support, monitoring, controls, incidents, vendor change, spend, renewals, one ' +
        'improvement.',
      decision: 'Approve changes with material risk or cost.',
      output: 'Monthly operating record.',
      gate: 'Loop → map / design',
      gateTone: 'outlined',
    },
    {
      name: 'Renew or exit',
      step: 'Step 07',
      inputs: 'Usage, value review, licence position, renewal dates.',
      work:
        'Reconcile licences, re-price, replace, export records, transfer ownership, remove ' +
        'access.',
      decision: 'Renew, change, or leave.',
      output: 'Portable exit package.',
      gate: 'Clean removal',
      gateTone: 'outlined',
    },
  ] satisfies LifecycleStep[],
};

export const METHOD_OUTCOMES = {
  folio: '03 / Valid review outcomes',
  heading: 'Selling another tool is not the required outcome.',
  body:
    'A useful review removes uncertainty. Sometimes that supports deployment. Sometimes it ' +
    'exposes duplicate tools, weak sources, missing ownership, unacceptable risk, or work that ' +
    'does not need AI.',
  outcomes: [
    { label: 'Deploy', tone: 'deploy' },
    { label: 'Consolidate', tone: 'alternative' },
    { label: 'Repair first', tone: 'alternative' },
    { label: 'Use a simpler tool', tone: 'alternative' },
    { label: 'Keep it human', tone: 'human' },
    { label: 'Stop', tone: 'stop' },
  ] satisfies Outcome[],
};

export const METHOD_RECORD = {
  folio: '04 / Monthly operating record',
  heading: 'The service leaves a paper trail on purpose.',
  body:
    "One record per month, in the customer's hands, with the next improvement and its owner " +
    'already named.',
  sheetTitle: 'Operating record / period 07',
  fields: [
    {
      label: 'Managed products / owners',
      value: '4 products. Every one has a named business owner.',
    },
    {
      label: 'Users added / removed',
      value: '6 added, 3 removed. Both leavers de-provisioned same day.',
    },
    {
      label: 'Support and adoption',
      value: '11 requests. One team blocked by a template nobody owned.',
    },
    {
      label: 'Integration / service condition',
      value: '3 connections healthy. One vendor API change reviewed.',
    },
    {
      label: 'Evaluated failures / open gaps',
      value: '2 answer classes failed evaluation. Both now refuse rather than guess.',
    },
    {
      label: 'Access / control changes',
      value: 'One permission test failed and was corrected. Logged.',
    },
    {
      label: 'Incidents / corrective actions',
      value: 'One material quality incident. Contained, notified, written up.',
    },
    {
      label: 'Spend against budget',
      value: 'Within ceiling. Two dormant seats removed before renewal.',
    },
    {
      label: 'Vendor change / renewal decisions',
      value: 'One plan change assessed. Renewal recommended with reduced seats.',
    },
    {
      label: 'Next improvement / owner',
      value: 'Repair the estimating template source. Owner named, due next period.',
      emphasis: true,
    },
  ] satisfies RecordField[],
};

export const METHOD_CTA = {
  folio: '05 / Conversion',
  heading: 'Start with the last thing that failed, cost too much, or had no owner.',
  support:
    'A scoped review ends in a decision — including the decision not to deploy anything.',
  primaryLabel: 'Start with a scoped review',
  secondaryLabel: 'Read the trust model',
};
