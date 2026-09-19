/* The long-form text for AI agents: /llms.txt and /agents.md.

   The pages are short on purpose. The text-minimisation pass of 2026-09-19 cut every body string
   on the home page to one or two sentences, and the paragraphs that used to carry the argument
   moved HERE, verbatim, so that an assistant reading the site on somebody's behalf still gets the
   whole case. Everything a page still says is imported from its copy module rather than retyped,
   so the two cannot drift; only the text that left the page is authored in this file.

   Two files are built from it, both prerendered like sitemap.xml:

   - /llms.txt   the site's full text, in the llms.txt shape (H1, blockquote summary, H2 sections,
                 a link list of every published page). Served as text/plain.
   - /agents.md  guidance for an agent acting on a person's behalf: how to describe the offer
                 accurately, what the site does not claim, and how to make contact. Served as
                 text/markdown.

   The same claim discipline applies here as on the pages, and the release gate enforces the
   mechanical parts because this file lives under src/copy: no price, no duration, no cohort size,
   no partner designation, no certification, no customer, no founder biography, brand cased
   "Dirtyworks.ai". If a fact is not on a page, it does not belong here either. */
import { ROUTES, type RouteId, hrefFor } from './routes';
import { CONTACT_EMAIL, LOCATION, BRAND_PROMISE, SENSITIVE_DATA_NOTE_EMAIL } from './site';
import { INTERESTS, INTEREST_LABELS, MESSAGE_HELP, type Interest } from './inquiry';
import { PILOT_HERO, ILLUSTRATIVE_WORKFLOW, TEAM_CAN_DO, WHY_WORKSPACE, RESPONSIBILITY_ROWS, PILOT_STAGES, TRUST_TECHNOLOGY } from './pilot';
import { PILOT_SCOPE, FIT, COSTS, FAQ, SHAPED } from './pages/workspace';
import { SERVICE_MODELS, SCOPE_REGISTER, ENGAGEMENT_PATH, RESPONSIBILITY_BOUNDARY } from './pages/services';
import { METHOD_HERO, METHOD_LIFECYCLE, METHOD_OUTCOMES, METHOD_RECORD } from './pages/method';
import { TRUST_HERO, TRUST_BEHAVIOUR, TRUST_REGISTER, TRUST_COMPLIANCE, TRUST_EXIT } from './pages/trust';
import { HERO as MSP_HERO, WORKSPACE_OPTION, PRACTICE_ITEMS, PARTNER_MODELS, MODEL_NOTE, SEAM_ROWS, SEAM_COLUMNS, PILOT_STEPS } from './pages/msps';
import { CATALOGUE_HERO, FEATURED_PILOT, TEAM_MIX, APPROVAL_QUESTIONS, PRODUCT_MENU, COMMERCIAL_ROUTE } from './pages/catalogue';
import { COMPANY_PARAGRAPHS, BELIEFS, CONTACT_ROWS } from './pages/about';

/* ------------------------------------------------------------------ text that left the page */

/* The home page as it read before 2026-09-19. Each entry is the paragraph the page used to carry
   for that section; the page now carries a one-line version. Kept verbatim so nothing the founder
   approved in the refresh brief is lost, only relocated. */
const LONG_FORM = {
  hero:
    'One managed workspace where your employees create workflows, agents, scheduled tasks, and ' +
    'even applications, using approved company information. Data stays in your environment and ' +
    'people reach only what they are allowed to. Start with a pilot configured around one team ' +
    'and a defined set of work, with Dirtyworks.ai handling setup, onboarding, and support.',
  workflowSteps: [
    'The team writes down, in plain words, how a new hire gets set up in their first week.',
    'The workspace turns that description into a checklist the team can open and use.',
    'One step is out of date. A colleague changes it, and the checklist is current again.',
    'The checklist is shared with the team, and the next new hire follows it.',
  ],
  teamCanDo:
    'Employees describe the work in their own words and build the tool that does it, inside one ' +
    'managed workspace. Start with useful everyday work and let the team shape it as it learns.',
  examples: [
    'Bring selected information together and draft a briefing for a person to review before it ' +
      'goes anywhere.',
    'An agent that answers from the approved policy documents, cites where it looked, and says ' +
      'when it does not know.',
    'A task that runs on a schedule, reads the approved register, and flags what needs a ' +
      'decision this week.',
    'Turn a repeatable internal process into an application the team can open, use, revise, and ' +
      'share.',
  ],
  reasons: [
    'Company data stays in your environment. Employees reach only what they are already allowed ' +
      'to, and the workspace runs its own AI so information does not have to be sent to an ' +
      'outside service to be used.',
    'Employees do not wait for a project, a vendor, or a developer. They describe the work, ' +
      'build the workflow, agent, task, or application, and improve it as they use it.',
    'One managed workspace in place of a subscription for every employee and every tool, with ' +
      'setup, support, and usage agreed before work begins and reviewed as you go. This is a ' +
      'positioning claim, not a price; the actual costs are agreed before work begins.',
  ],
  differentiator:
    'Employees can explore and create tools within the agreed workspace scope, and share them ' +
    'with each other without sharing the data behind them: a colleague who opens a shared tool ' +
    'sees only what they are allowed to see. Everything is customizable, from the workspace ' +
    'itself to the tools inside it. Dirtyworks.ai configures the environment, helps the team ' +
    'get started, and manages the support and changes included in the pilot. When a tool becomes ' +
    'something the business relies on, we agree how it will be tested, maintained, and supported. ' +
    'That is not unlimited custom development, and not automatic production support for ' +
    'everything a team creates.',
  stages: [
    'Define the team, the work, the success measures, and the review date.',
    'Set up the workspace for that work: users, approved information and connections, and ' +
      'starter tools.',
    'Onboard the team, support the agreed scope, and review changes and costs as they come up.',
    'Look at what happened in use, what it cost, and what it could not do. Decide together.',
  ],
  pilotIncludes:
    'We define the work, configure the workspace, onboard the team, and review what happens in ' +
    'use. The pilot gives you evidence for the next decision: continue, change the scope, or stop.',
  trust:
    'The workspace is built so that company information does not have to leave your systems to ' +
    'be useful. Before the pilot starts, we agree user access, approved information and ' +
    'connections, support responsibilities, and costs, and we document account control and what ' +
    'happens to data, configuration, and tools when the pilot ends.',
  securityPoints: [
    'The workspace runs in your environment and works with the information already there.',
    'Access is defined and tested for each connected resource, not assumed.',
    'Models run inside the workspace, so company data is not sent to an outside AI service to ' +
      'be used.',
    'An employee can share a workflow, agent, or application with a colleague without sharing ' +
      'the data behind it.',
  ],
  foundation:
    'Cloudflare OS provides the open-source workspace foundation. Dirtyworks.ai adapts it to ' +
    'your business and manages the agreed service around it. The platform is in early access, ' +
    'so each pilot has a defined scope and review point. No Cloudflare partner designation, ' +
    'badge, or entitlement is claimed.',
  existingAi:
    'If your team already uses AI products, Dirtyworks.ai can help manage accounts, onboarding, ' +
    'integrations, support, and costs. We will work out whether a workspace pilot, your existing ' +
    'tools, or a combination fits the job.',
  msp:
    'Start with one client and a defined pilot. We agree how your team and Dirtyworks.ai share ' +
    'onboarding, access, support, and the customer relationship.',
  conversion:
    'Bring one team, one recurring task, or one tool you wish existed: a workflow, an agent, a ' +
    'scheduled task, or an application. We will explore whether a managed workspace pilot is a ' +
    'useful place to start.',
} as const;

/* ------------------------------------------------------------------ page summaries */

/** One line per route. Typed against RouteId so a new route cannot ship without a summary. */
export const PAGE_SUMMARIES: Record<RouteId, string> = {
  home: 'The managed AI workspace pilot in nine short sections, and the two other ways in.',
  workspace:
    'The offer page: what the pilot is, the seven deliverables agreed before work begins, who ' +
    'does what, fit, costs, and the questions people ask first.',
  services:
    'Managed services in two delivery routes: a workspace pilot, or management of the AI tools a ' +
    'team already has. Eight operating capabilities, each with a boundary.',
  catalogue:
    'A governed shortlist of separate vendor products organised by the job they do. No prices, ' +
    'no buy button; fit and commercial route are confirmed at quote.',
  method: 'The seven-step operating method, the valid review outcomes, and the monthly record.',
  trust:
    'Where data goes and what the AI is allowed to do: five failure modes and their controls, ' +
    'the public control register, compliance readiness, and exit.',
  msps: 'Referral, co-managed, and white-label partner models, the responsibility seam, and the one-customer pilot.',
  about: 'What the company is, what it believes, and every way to reach it.',
  notes: 'Practical notes on managed AI. Nothing is published yet.',
  start: 'The inquiry form. One form for a pilot, existing tools, or a partner conversation.',
};

/* ------------------------------------------------------------------ helpers */

const abs = (site: string, path: string): string => new URL(path, site).href;

/** "Calgary, Alberta / Canada" is a register value; in prose it reads as a plain place name. */
const PLACE = LOCATION.replace(' / ', ', ');

const published = ROUTES.filter((r) => r.published);

const bullets = (items: readonly string[]): string[] => items.map((item) => `- ${item}`);

const section = (heading: string, ...blocks: (string | readonly string[])[]): string[] => [
  `## ${heading}`,
  '',
  ...blocks.flatMap((block) => (typeof block === 'string' ? [block, ''] : [...block, ''])),
];

const interestUrl = (site: string, interest: Interest): string =>
  interest === 'not-sure'
    ? abs(site, hrefFor('start'))
    : abs(site, `${hrefFor('start')}?interest=${interest}`);

/* ------------------------------------------------------------------ /llms.txt */

export const buildLlmsTxt = (site: string): string => {
  const lines: string[] = [
    '# Dirtyworks.ai',
    '',
    `> Dirtyworks.ai is a managed AI operations company in ${PLACE}. Its featured offer is a ` +
      'managed AI workspace pilot: a Cloudflare OS environment customized for one team, with ' +
      'setup, onboarding, and support from Dirtyworks.ai. It also manages the AI tools a business ' +
      `already has, and works alongside traditional MSPs. ${BRAND_PROMISE}`,
    '',
    'This file is the full text behind the website. The pages are deliberately brief; the ' +
      'argument behind each section is here, and the pages link to it. Guidance for an agent ' +
      `acting on a person's behalf is at ${abs(site, '/agents.md')}.`,
    '',
    'Everything below describes a pilot offer, not a completed operational capability. No ' +
      'duration, cohort size, launch date, fee, or usage allowance is published, because those ' +
      'are agreed with each customer before work begins. Cloudflare OS is the open-source ' +
      'foundation and Dirtyworks.ai is the operator; no Cloudflare partner designation is ' +
      'claimed. No customer, customer quote, certification, or outcome metric is published. Every ' +
      'example is labelled as an example, and every photograph on the site is a generated ' +
      'editorial illustration of fictional people.',
    '',

    ...section(
      'The managed AI workspace pilot',
      `**The offer.** ${LONG_FORM.hero} ${PILOT_HERO.foundation} ${PILOT_HERO.availabilityLabel}. ${PILOT_HERO.availability}`,
      `**What your team can create.** ${TEAM_CAN_DO.heading} ${LONG_FORM.teamCanDo} ${TEAM_CAN_DO.endnote} None is a completed customer deployment and none promises a specific external integration.`,
      bullets(
        TEAM_CAN_DO.examples.map(
          (example, i) => `${example.kind}: ${example.name}. ${LONG_FORM.examples[i]}`,
        ),
      ),
      `**A worked example: the onboarding checklist.** ${ILLUSTRATIVE_WORKFLOW.note}`,
      ILLUSTRATIVE_WORKFLOW.steps.map(
        (step, i) => `${i + 1}. ${step.name}. ${LONG_FORM.workflowSteps[i]}`,
      ),
      `**Why one managed workspace.** ${WHY_WORKSPACE.heading}`,
      bullets(
        WHY_WORKSPACE.reasons.map(
          (reason, i) => `${reason.label}. ${reason.heading} ${LONG_FORM.reasons[i]}`,
        ),
      ),
      `**Freedom to build, managed operation.** ${LONG_FORM.differentiator}`,
      '**Who does what.**',
      bullets(RESPONSIBILITY_ROWS.map((row) => `${row.party}: ${row.body}`)),
      `**A workspace shaped around your business.** ${SHAPED.paragraphs.join(' ')}`,
      `**What the pilot includes.** ${LONG_FORM.pilotIncludes} Four stages:`,
      PILOT_STAGES.map((stage, i) => `${i + 1}. ${stage.name}. ${LONG_FORM.stages[i]}`),
      `**${PILOT_SCOPE.heading}** ${PILOT_SCOPE.columns.deliverable} / ${PILOT_SCOPE.columns.agreed}:`,
      bullets(PILOT_SCOPE.rows.map((row) => `${row.deliverable}: ${row.agreed}.`)),
      `**Secure by design.** ${LONG_FORM.trust}`,
      bullets(
        TRUST_TECHNOLOGY.points.map(
          (point, i) => `${point.heading}. ${LONG_FORM.securityPoints[i]}`,
        ),
      ),
      `**The foundation.** ${LONG_FORM.foundation}`,
      `**Fit.** ${FIT.summary} A good place to start:`,
      bullets(FIT.included),
      'What this pilot is not:',
      bullets(FIT.excluded),
      `**Costs.** ${COSTS.body} ${COSTS.note}`,
      '**Questions people ask first.**',
      bullets(FAQ.items.map((item) => `${item.question} ${item.answer}`)),
    ),

    ...section(
      'Managed services for the AI tools a team already has',
      LONG_FORM.existingAi,
      ...SERVICE_MODELS.models.map(
        (model) => `**${model.label}.** ${model.brings} ${model.supplies}`,
      ),
      SERVICE_MODELS.closing,
      `**${SCOPE_REGISTER.heading}**`,
      bullets(
        SCOPE_REGISTER.rows.map(
          (row) => `${row.service}. Included: ${row.included} Boundary: ${row.boundary}`,
        ),
      ),
      `**Engagement path.** ${ENGAGEMENT_PATH.heading}`,
      ENGAGEMENT_PATH.stages.map(
        (stage, i) => `${i + 1}. ${stage.name}. ${stage.description} Commercial basis: ${stage.commercial}.`,
      ),
      ENGAGEMENT_PATH.priceNote,
      `**Responsibility boundary.** ${RESPONSIBILITY_BOUNDARY.heading}`,
      bullets(RESPONSIBILITY_BOUNDARY.panels.map((panel) => `${panel.owner}: ${panel.body}`)),
    ),

    ...section(
      'How it works: the operating method',
      METHOD_HERO.lead,
      `**${METHOD_LIFECYCLE.heading}**`,
      METHOD_LIFECYCLE.steps.map(
        (step, i) =>
          `${i + 1}. ${step.name}. Inputs: ${step.inputs} Work: ${step.work} Decision: ${step.decision} Output: ${step.output} ${step.gate}.`,
      ),
      `**Valid review outcomes.** ${METHOD_OUTCOMES.heading} ${METHOD_OUTCOMES.body} The outcomes: ${METHOD_OUTCOMES.outcomes.map((o) => o.label).join(', ')}.`,
      `**Monthly operating record.** ${METHOD_RECORD.body} The record covers: ${METHOD_RECORD.fields.map((f) => f.label.toLowerCase()).join('; ')}. The example record on the method page is illustrative.`,
    ),

    ...section(
      'Trust: boundaries and records',
      TRUST_HERO.lead,
      `**${TRUST_BEHAVIOUR.heading}** ${TRUST_BEHAVIOUR.pullQuote}`,
      bullets(TRUST_BEHAVIOUR.pairs.map((pair) => `${pair.failure} ${pair.control}`)),
      TRUST_BEHAVIOUR.closing,
      `**${TRUST_REGISTER.heading}** ${TRUST_REGISTER.lead} ${TRUST_REGISTER.note}`,
      bullets(
        TRUST_REGISTER.rows.map(
          (row) => `${row.control}: ${row.mechanism}. Holder: ${row.holder}. State: ${row.state}.`,
        ),
      ),
      `**Compliance readiness.** ${TRUST_COMPLIANCE.heading} ${TRUST_COMPLIANCE.body}`,
      `**Exit.** ${TRUST_EXIT.heading} ${TRUST_EXIT.body}`,
    ),

    ...section(
      'For MSPs',
      MSP_HERO.lead,
      `**A concrete delivery option.** ${WORKSPACE_OPTION.body} ${WORKSPACE_OPTION.boundary}`,
      '**What the practice adds.**',
      bullets(PRACTICE_ITEMS.map((item) => item.text)),
      '**Three partner models.**',
      bullets(
        PARTNER_MODELS.map(
          (model) =>
            `${model.name}. Customer relationship: ${model.customerRelationship} Visibility: ${model.visibility} Working seam: ${model.seam}`,
        ),
      ),
      MODEL_NOTE,
      '**The responsibility seam.** Ten lines. Every one gets a name before the pilot starts. ' +
        `Cells read ${SEAM_COLUMNS.msp} / ${SEAM_COLUMNS.dirtyworks} / ${SEAM_COLUMNS.customer}.`,
      bullets(
        SEAM_ROWS.map(
          (row) => `${row.line}: ${row.msp.text} / ${row.dirtyworks.text} / ${row.customer.text}`,
        ),
      ),
      '**The one-customer pilot.**',
      PILOT_STEPS.map((step) => `${Number(step.index)}. ${step.text}`),
    ),

    ...section(
      'Catalogue',
      CATALOGUE_HERO.lead,
      `**Featured: the workspace pilot.** ${FEATURED_PILOT.body}`,
      `**The mix in practice.** ${TEAM_MIX.intro} ${TEAM_MIX.closing}`,
      `**What the catalogue is.** ${APPROVAL_QUESTIONS.heading} ${APPROVAL_QUESTIONS.intro}`,
      bullets(APPROVAL_QUESTIONS.questions.map((q) => `${q.label} ${q.state.toLowerCase()}: ${q.question}`)),
      '**Product menu, seven jobs.** Candidate product names are separate vendor products, ' +
        'named as text. Naming a product is a statement of what Dirtyworks.ai operates, never a ' +
        `claim of resale authority or vendor endorsement. ${PRODUCT_MENU.pilotNote}`,
      bullets(
        PRODUCT_MENU.categories.map(
          (c) => `${c.word}: ${c.job}. ${c.detail} Candidates: ${c.candidates}. ${c.state}. ${c.route}.`,
        ),
      ),
      PRODUCT_MENU.disclaimer,
      `**Commercial route.** ${COMMERCIAL_ROUTE.heading}`,
      bullets(COMMERCIAL_ROUTE.panels.map((panel) => `${panel.route}: ${panel.body}`)),
      COMMERCIAL_ROUTE.boundary,
    ),

    ...section(
      'About the company',
      ...COMPANY_PARAGRAPHS,
      '**Operating beliefs.**',
      BELIEFS.map((belief) => `${Number(belief.index)}. ${belief.text}`),
      'The founder is not named on the site, and no biography, credential, or photograph of a ' +
        'real person is published.',
    ),

    ...section(
      'How to reach Dirtyworks.ai',
      bullets(
        CONTACT_ROWS.map((row) =>
          row.href
            ? `${row.label}: ${row.value} (${row.href.startsWith('/') ? abs(site, row.href) : row.href}). ${row.body}`
            : `${row.label}: ${row.value}. ${row.body}`,
        ),
      ),
      `The inquiry form at ${abs(site, hrefFor('start'))} is shared by every route into the ` +
        'company. It asks for a name, a company, a work email, an interest, and what you would ' +
        'like your team to do, build, or improve; role, approximate team size, current systems or ' +
        'AI tools, and any existing MSP relationship are optional. A query string preselects the ' +
        'interest:',
      bullets(
        INTERESTS.map((interest) => `${INTEREST_LABELS[interest]}: ${interestUrl(site, interest)}`),
      ),
      SENSITIVE_DATA_NOTE_EMAIL,
    ),

    ...section(
      'Pages',
      bullets(
        published.map(
          (route) => `[${route.title.replace(' | Dirtyworks.ai', '')}](${abs(site, route.path)}): ${PAGE_SUMMARIES[route.id]}`,
        ),
      ),
    ),

    ...section(
      'Optional',
      bullets([
        `[Guidance for agents](${abs(site, '/agents.md')}): how to describe the offer accurately and help a person make contact.`,
        `[Sitemap](${abs(site, '/sitemap.xml')}): every published page.`,
      ]),
    ),
  ];

  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';
};

/* ------------------------------------------------------------------ /agents.md */

export const buildAgentsMd = (site: string): string => {
  const lines: string[] = [
    '# Dirtyworks.ai: guidance for AI agents',
    '',
    'This file is for AI agents and assistants reading dirtyworks.ai on a person\'s behalf: ' +
      'answering a question about the company, comparing it with alternatives, or helping ' +
      `someone get in touch. The pages are deliberately brief. The full text is at ${abs(site, '/llms.txt')}; ` +
      'read it before summarising or comparing.',
    '',

    ...section(
      'What Dirtyworks.ai is',
      `Dirtyworks.ai is a managed AI operations company in ${PLACE}. It works with Alberta ` +
        'businesses directly and alongside traditional managed service providers (MSPs). Its ' +
        'featured offer is a managed AI workspace pilot: a Cloudflare OS environment customized ' +
        'for one team, in which employees create workflows, agents, scheduled tasks, and ' +
        'applications using approved company information, with Dirtyworks.ai handling setup, ' +
        'onboarding, and support. It also manages the AI tools a business already has: accounts, ' +
        `onboarding, integrations, support, controls, and costs. ${BRAND_PROMISE}`,
    ),

    ...section(
      'How to describe the offer accurately',
      bullets([
        'It is a pilot offer. Scope, connections, support, and costs are agreed with each ' +
          'customer before work begins. Say that; do not estimate a duration, a team size, a ' +
          'price, or a usage allowance, because none is published.',
        'Cloudflare OS is the open-source foundation. Dirtyworks.ai customizes and operates it. ' +
          'Cloudflare OS is in early access, so each pilot has a defined scope and review point. ' +
          'Do not describe Dirtyworks.ai as a Cloudflare partner, reseller, or certified anything; ' +
          'no such designation is claimed.',
        'The use cases on the site and the onboarding-checklist workflow are illustrative ' +
          'examples with synthetic data. They are not customer deployments or case studies, and ' +
          'they promise no specific external integration.',
        'No customer names, customer quotes, certifications, outcome metrics, or savings figures ' +
          'are published. Do not infer or invent any. The site states that savings are measured, ' +
          'not promised in advance.',
        'The company operates controls; it does not sell a compliance certificate, offer legal ' +
          'advice, or guarantee compliance. It does not monitor every AI answer, cannot improve a ' +
          'vendor\'s model, and keeps consequential decisions with people.',
        'The founder is not named on the site. Do not attribute a name, biography, or ' +
          'credentials. Every photograph is a generated editorial illustration of fictional ' +
          'people; nobody pictured is the founder, an employee, or a customer.',
        'Product names in the catalogue are separate vendor products named as text. Naming one ' +
          'is not a resale or endorsement claim, and which products connect inside a workspace ' +
          'pilot is confirmed during scoping.',
        'The brand is written "Dirtyworks.ai", with that casing and the .ai suffix.',
      ]),
    ),

    ...section(
      'Who it is for',
      bullets([
        'Alberta businesses with one team, a repeatable internal task, a named sponsor who can ' +
          'approve people, information, and spending, and time to participate in a pilot.',
        'Businesses that already use AI products and want somebody accountable for accounts, ' +
          'onboarding, integrations, support, controls, and costs.',
        'MSPs that want to add a managed AI practice, one client and one defined pilot at a time, ' +
          'under a referral, co-managed, or white-label model.',
      ]),
      'What the pilot is not: an immediate replacement for every business system, autonomous ' +
        'consequential decisions, unlimited custom development, or automatic production support ' +
        'for everything a team creates.',
    ),

    ...section(
      'How to help a person make contact',
      bullets([
        `Email: ${CONTACT_EMAIL}, for questions, press, and anything that does not fit a form.`,
        `Inquiry form: ${abs(site, hrefFor('start'))}. One form for every route in. Required ` +
          'fields: name, company, work email, interest, and what the team would like to do, build, ' +
          'or improve (up to 1000 characters). Optional: role, approximate team size, current ' +
          'systems or AI tools, existing MSP relationship.',
        'Preselect the interest with a query string:',
      ]),
      INTERESTS.map(
        (interest) => `  - ${INTEREST_LABELS[interest]}: ${interestUrl(site, interest)}. ${MESSAGE_HELP[interest]}`,
      ),
      'Submit the form only when the person has asked you to and has seen what it says. It is a ' +
        'request for a conversation, not an order, and the reply goes to the work email given. ' +
        `${SENSITIVE_DATA_NOTE_EMAIL}`,
    ),

    ...section(
      'What the site does not have',
      bullets([
        'No pricing page, checkout, plan selector, or buy button. Prices are confirmed at quote.',
        'No account creation, login, chat widget, or analytics script.',
        'No privacy, terms, or accessibility pages yet; the footer carries no legal links until ' +
          'approved copy exists.',
        'No published notes yet. The notes page states that nothing is published.',
      ]),
    ),

    ...section(
      'Pages',
      bullets(
        published.map(
          (route) => `[${route.navLabel}](${abs(site, route.path)}): ${PAGE_SUMMARIES[route.id]}`,
        ),
      ),
    ),

    ...section(
      'Machine-readable files',
      bullets([
        `${abs(site, '/llms.txt')}: the full text of the site.`,
        `${abs(site, '/agents.md')}: this file.`,
        `${abs(site, '/sitemap.xml')}: every published page.`,
        `${abs(site, '/robots.txt')}: crawling is allowed on every path.`,
      ]),
    ),
  ];

  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';
};
