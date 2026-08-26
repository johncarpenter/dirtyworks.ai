<!--
Sync Impact Report
- Version change: none (unfilled template) → 1.0.0
- Bump rationale: MAJOR-line initial ratification. The previous file contained only unresolved
  template placeholders, so this is the first governing version rather than an amendment.
- Principles defined (all new):
  - I. Static By Default, Dynamic By Exception
  - II. Vendored Design System, Literal Values
  - III. Claim Discipline Is A Build Gate
  - IV. Accessibility And No-JavaScript Resilience
  - V. Honest Server Behaviour, Verified Before Merge
- Added sections: Technology And Platform Constraints; Development Workflow And Quality Gates;
  Governance (all previously placeholder-only).
- Removed sections: none.
- Template placeholders resolved: PROJECT_NAME, PRINCIPLE_1..5_NAME/_DESCRIPTION, SECTION_2_NAME,
  SECTION_2_CONTENT, SECTION_3_NAME, SECTION_3_CONTENT, GOVERNANCE_RULES, CONSTITUTION_VERSION,
  RATIFICATION_DATE, LAST_AMENDED_DATE. No bracket tokens remain.
- Deferred items: none. RATIFICATION_DATE is set to the date of this first adoption because no
  earlier adoption exists in the repository.

Amendment 1.0.0 → 1.0.1 (PATCH, 2026-08-25)
- Trigger: registry verification during `/speckit.plan` (specs/001-build-marketing-website/research.md
  D-01) proved the `@astrojs/react` version fact wrong.
- Change: Technology And Platform Constraints now pins `@astrojs/react` 4.x as the Astro 5 line and
  records that the package declares no `astro` peer, so the Astro major must be identified by the
  bundled Vite major instead of by peer-range checking.
- Classification: PATCH — a factual correction to an existing constraint. No principle added,
  removed, or redefined; the intent (pin integrations to the Astro major) is unchanged.
-->

# Dirtyworks.ai Marketing Website Constitution

## Core Principles

### I. Static By Default, Dynamic By Exception

Every route MUST prerender to HTML at build time. The build MUST use `output: 'static'` with the
Cloudflare adapter so that a new page is prerendered automatically and server rendering is an
explicit, reviewed opt-out — never an accident.

- The nine routes (`/`, `/services`, `/catalogue`, `/method`, `/trust`, `/msps`, `/about`,
  `/notes`, `/start`) MUST serve as static assets with zero Worker invocations.
- Exactly one on-demand surface is permitted: the diagnostic intake action behind `/start`.
  Adding a second dynamic path REQUIRES an amendment recording why static delivery cannot serve it.
- A component MAY be hydrated only when it has behaviour HTML cannot express. Each island MUST be
  listed with its hydration directive and the behaviour that justifies it.
- PROHIBITED without amendment: client-side router, CSS framework, state-management library,
  third-party component library, analytics or chat script, web font loaded from a third-party CDN.

Rationale: the site is content plus one transactional path. Anything that makes the content
pipeline pay for the dynamic path buys cost and fragility for no visitor benefit.

### II. Vendored Design System, Literal Values

`design-system/` and `mockups/` are read-only sources of record. Nothing under `src/` may import
from them. Tokens, stylesheets, and required assets MUST be copied into `src/` and edited there.

- Colour, type, spacing, radius, border, shadow, and motion values MUST come from the vendored
  token files or be lifted literally from the prototype inline styles. Inventing a value is a defect.
- The brand palette is closed: ink, ink-2, ink-rule, bone, bone-2, bone-3, sheet, rule, signal
  orange, blueprint, verified acid, steel, muted-2, body-muted, plus semantic error `#C1200B`.
  A new colour REQUIRES an amendment.
- Border radius MUST be 0–3px. Shadows MUST be a single hard offset with zero blur, or none.
  Gradients, ambient elevation, blur, glow, opacity-fade hover, and scale-transform press are
  PROHIBITED.
- Type roles are exactly four: Archivo display, Instrument Serif countervoice, IBM Plex Mono
  evidence, and the design-system sans for body. Headings are authored in sentence case and
  uppercased by CSS; never title-cased in source.
- The recurring pattern vocabulary (folio line, declaration, register row, status chip, evidence
  rail, annotated comparison, work order, control register, fit field, CTA band, claim stamp) MUST
  be built once as shared components and reused. Register rows MUST NOT be converted into rounded
  feature cards.
- Each page carries at most two intentional grid violations, and only of the sanctioned kinds
  (hard offset 8–24px, rotation −3°..+3°, display crop ≤15%, one element crossing columns).

Rationale: the design is high fidelity and already final. Copying keeps designers able to edit the
source without breaking the build, and keeps the build from reaching outside `src/`.

### III. Claim Discipline Is A Build Gate

Unresolved facts MUST render as visible markers, and the release MUST fail while any marker is
unresolved. Intent is not a control; a failing exit code is.

- A placeholder registry under `src/content/` MUST back every unresolved fact. Unresolved values
  render through a marker component, never as invented text.
- A content check script MUST exit non-zero when: any placeholder is unresolved; any prohibited
  vocabulary string appears in `src/`; any banned CTA label appears in `src/`; an illustrative mock
  lacks its visible claim stamp; or any `OPEN GAP` or `LEGAL REVIEW` stamp remains in shipped copy.
- Prohibited vocabulary (non-exhaustive, enforced as a list in the check): revolutionary,
  game-changing, unleash, unlock, harness, seamless, frictionless, magic, supercharge,
  transformative, cutting-edge, future-proof, autonomous workforce, replace employees, eliminate
  hallucinations, one-click, set-and-forget. Banned CTAs: GET STARTED, LEARN MORE, BOOK A DEMO,
  CONTACT US, TALK TO SALES. No emoji anywhere in source, UI, or labels.
- Claim stamps (`ILLUSTRATIVE`, `VERIFY AT QUOTE`, `OPEN GAP`, `LEGAL REVIEW`,
  `HYPOTHESIS — NOT MEASURED`) MUST survive into production wherever the prototypes place them.
- PROHIBITED: prices, per-seat pricing, buy buttons, customer logos, testimonials, certifications,
  outcome metrics, fabricated publication dates or reading times, invented biography, and stock
  photography. A metric MAY appear only with baseline, period, method, and source attached, or
  under a visible `HYPOTHESIS — NOT MEASURED` stamp.
- The About founder panel and any page still carrying an `OPEN GAP` stamp MUST be held back from
  public launch rather than shipped with the panel visible.

Rationale: marketing copy carries claims, and a wrong claim costs trust that no redesign recovers.

### IV. Accessibility And No-JavaScript Resilience

An island's server-rendered output MUST be useful before hydration. Interactive upgrades layer on
top of working HTML; they never create it.

- Navigation destinations MUST exist in the prerendered DOM at all times and be toggled by
  attribute and CSS, never conditionally rendered. A keyboard user MUST never reach a dead control.
- The intake form MUST render its purpose, fields, and a `mailto:` alternative inside `<noscript>`.
- State MUST NEVER be encoded by colour alone; every status chip and responsibility cell carries its
  state as text.
- Ink on signal orange is the only permitted text/orange pairing. Bone body text on orange is
  PROHIBITED.
- Focus MUST be visible as a 3px blueprint ring (acid on dark fields). Interactive targets MUST be
  at least 44px. `prefers-reduced-motion` MUST collapse motion. Body text MUST NEVER animate.
- No horizontal scrolling of core content at 320px. Registers stack as label-above-value;
  comparisons stack preserving their pairing; work-order steps stay numbered and sequential; CTA
  labels stay specific and MAY wrap, and MUST NEVER be shortened to `START` or `MORE`.
- Mobile chrome MUST keep the primary action inside the opened menu. No floating button, chat
  widget, or scroll-progress bar. Only the header is pinned.

Rationale: the audience includes buyers on locked-down corporate machines and assistive technology.
A site that ships almost no JavaScript has no excuse for requiring it.

### V. Honest Server Behaviour, Verified Before Merge

The one dynamic path MUST be small, typed, guarded, observable, and honest about failure.

- Input contracts MUST be strict schemas with per-field length bounds that reject unknown keys.
- The error contract MUST be written as an explicit table before the handler is implemented, and
  both the server and the form state machine MUST implement that table. Every condition maps to a
  code, a client status, and whether it is retryable.
- Success MUST be returned only after delivery resolves. Every non-accepting outcome — throw,
  rejection, missing binding — MUST surface as a delivery failure that keeps the visitor's values
  and offers a `mailto:` alternative. A success message the code has not earned is a defect.
- Abuse handling MUST be layered and dependency-free: strict schemas, hidden honeypot, minimum
  submit-elapsed floor, and rate limiting keyed by a hash of the client IP. A missing rate-limit
  binding allows the request (local dev); a binding that throws blocks it (fails closed).
- Logging MUST be privacy-bounded: purpose, status, and duration only. Names, addresses, message
  bodies, and raw IPs MUST NEVER be logged or retained.
- Server logic MUST have unit coverage for schemas, guards, payload construction, and log
  redaction. Behaviour a visitor can observe — routing, metadata, keyboard operation, focus
  management, responsive overflow, form success and failure states, no-JavaScript rendering — MUST
  have end-to-end coverage.

Rationale: this is the only code that runs per request and the only place the site can lose a lead
or leak data. It earns disproportionate rigour.

## Technology And Platform Constraints

The stack is fixed for this site. Substitutions REQUIRE an amendment.

- Astro 5 (`output: 'static'`), React 19 islands via `@astrojs/react` 4.x, `@astrojs/cloudflare`
  12.x, TypeScript strict via `astro/tsconfigs/strict`, Vitest via `getViteConfig()`, Playwright,
  Wrangler 4.x. Node 20+ for the build.
- Adapter and integration versions MUST be pinned against the Astro major. `@astrojs/cloudflare`
  14.x requires Astro 7 and MUST NOT be installed here; check `peerDependencies.astro` before any
  adapter install.
- `@astrojs/react` declares **no** `astro` peer dependency at any version, so a mismatch raises no
  install error. Its Astro major is identified by the Vite major it bundles: 4.x ships Vite 6 and is
  the Astro 5 line; 5.x ships Vite 7 (Astro 6); 6.x ships Vite 8 (Astro 7). Installing 5.x here
  silently duplicates a Vite major in the dependency tree. Pin 4.x and verify by comparing the
  integration's bundled `vite` version against Astro's.
- `imageService: 'compile'` is REQUIRED — sharp is unavailable in Workers.
- `platformProxy` MUST be disabled under test (`{ enabled: !process.env.VITEST }`); its `workerd`
  process otherwise prevents Vitest from exiting.
- Binding access in server code MUST use `import { env } from 'cloudflare:workers'`.
- `wrangler.jsonc` MUST declare `main` pointing at the adapter's server entry, an `assets` block, a
  pinned `compatibility_date`, a `name` matching the deployed Worker, the `send_email` binding, and
  rate limits via the first-class `ratelimits` field — never `unsafe.bindings`.
- `public/.assetsignore` MUST contain `_worker.js` and `_routes.json`. Deploying the server bundle
  as a public asset is an exposure defect, not a warning to silence.
- Email is Cloudflare Email Service, transactional only. The sending domain MUST be onboarded
  before deploy. Notifications MUST populate both `text` and `html`, set `replyTo` to the
  submitter, and use a distinct subject per form so submissions cannot be confused.
- Fonts MUST be self-hosted before production, with licensing verified. Google Fonts CDN is
  acceptable in development only.
- If a glyph becomes unavoidable, it is Material Symbols Sharp (weight 500, unfilled, 20–24px,
  `currentColor`). A mono text label is preferred in every ambiguous case.
- Workers Builds: build command `npm run build`, deploy command `npx wrangler deploy`, empty build
  output directory. A combined build-and-deploy build command is PROHIBITED — it builds twice.

## Development Workflow And Quality Gates

Work flows through the Spec Kit lifecycle: specify, plan, tasks, implement. Feature artifacts live
under `specs/`; `ARCHITECTURE.md` records the technical rationale this constitution governs.

Order of construction is mandatory because each step removes a class of rework:

1. Vendor tokens into `src/styles/`, then build the base layout and solve heading colour once with
   explicit rules per dark and brand band. Element selectors beat inheritance; setting `color` on a
   section does not recolour its headings.
2. Apply `min-width: 0` to grid children in shared layout classes before building any page. Grid
   children default to `min-width: auto` and will overflow at 320px.
3. Model navigation as data in `src/content/`, consumed by header, footer, mobile panel, and a unit
   test asserting every route resolves to a page file and every page appears in navigation.
4. Build pages as `.astro` sections; add an island only when a control needs behaviour.
5. Write the action error contract table before the handler.

Gates that MUST pass before merge: type check, unit tests, content check, production build.
Gates that MUST pass before deploy: all of the above plus end-to-end tests against `wrangler dev`
on the built output (the Cloudflare adapter does not support `astro preview`), a
`wrangler deploy --dry-run` free of `_worker.js` errors, and a request to `/_worker.js/index.js`
returning 404.

- Tests MUST NEVER be disabled or narrowed to pass. Timing-guard interactions in end-to-end tests
  MUST either pace past the minimum-elapsed floor or assert the rejection deliberately.
- Public launch additionally REQUIRES the sponsor checklist in `mockups/README.md` to be satisfied:
  approved offer names, legal entity details, founder content, privacy/terms/accessibility copy,
  confirmed product shortlist, support boundaries, consent and analytics decisions, and a review
  confirming no fabricated logos, testimonials, certifications, results, or vendor relationships.
- Known scaling limits, and the trigger to revisit this architecture: more than roughly twenty
  pages (move to content collections); any need to search, segment, or report on submissions (add a
  datastore and treat email as notification only); islands needing to share state (that is an
  application, not a marketing site); client bundle size becoming the binding constraint (switch
  islands to Preact).

## Governance

This constitution supersedes other conventions for this repository. Where a plan, task list,
prototype, or agent instruction conflicts with it, this document wins and the conflicting artifact
MUST be corrected.

- **Amendment procedure.** Amendments are proposed as a change to this file that states the rule
  being added, changed, or removed, the rationale, and the migration required for existing code.
  An amendment MUST be approved by the project sponsor before dependent work proceeds, and MUST
  update the Sync Impact Report at the top of this file.
- **Versioning policy.** Semantic versioning of governance. MAJOR for removing or redefining a
  principle in a backward-incompatible way. MINOR for a new principle or materially expanded
  guidance. PATCH for clarifications, wording, and non-semantic refinements.
- **Compliance review.** Every pull request MUST state which principles its changes touch and how
  they are satisfied. Reviewers MUST reject work that adds an unjustified island, a new colour or
  radius, an unlabelled claim, a colour-only state, a success path not earned by a resolved
  delivery, or a dependency the Technology And Platform Constraints section excludes.
- **Complexity justification.** Any new dependency, abstraction, or dynamic route MUST be
  justified in the feature plan against the simplest alternative that was rejected. Absent that
  justification, the simpler option is the required option.
- **Runtime guidance.** Agents and contributors read this file for governance,
  [`ARCHITECTURE.md`](../../ARCHITECTURE.md) for technical rationale,
  [`mockups/README.md`](../../mockups/README.md) for content and layout authority, and
  [`design-system/readme.md`](../../design-system/readme.md) for visual and voice authority.
  Where content and visual authority disagree, `mockups/README.md` governs words, structure, and
  calls to action; `design-system/readme.md` governs tokens, components, and interaction patterns.

**Version**: 1.0.1 | **Ratified**: 2026-08-25 | **Last Amended**: 2026-08-25
