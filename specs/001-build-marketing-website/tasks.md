---

description: "Task list for the Dirtyworks.ai public marketing website"
---

# Tasks: Dirtyworks.ai Public Marketing Website

**Input**: Design documents from `/specs/001-build-marketing-website/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md),
[data-model.md](./data-model.md), [contracts/](./contracts/), [quickstart.md](./quickstart.md)

**Tests**: Included. Not optional here — the constitution makes type check, unit tests, content check
and build a merge gate, and E2E against `wrangler dev` a deploy gate
(`.specify/memory/constitution.md` → Development Workflow And Quality Gates).

**Organization**: Grouped by user story so each is independently implementable and testable. US1
alone is a deployable MVP.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: US1–US6, mapping to the six prioritised stories in spec.md
- Exact file paths are given in every task

## Path Conventions

Single Astro project at the repository root: `src/`, `public/`, `scripts/`, `tests/`.
`design-system/` and `mockups/` are read-only authorities and are **never** imported from `src/`.

## Authority quick reference

| Need | Read |
|---|---|
| Copy, section order, IA, CTA labels | `mockups/README.md`, then the matching `mockups/design_files/*.dc.html` |
| Exact numbers (grid, clamp, hex, offsets) | inline `style` attributes in the prototypes |
| Tokens, component prop shapes, voice | `design-system/`, plus [contracts/design-tokens.md](./contracts/design-tokens.md) |
| Adjudicated conflicts — do not re-litigate | [research.md](./research.md) §D-07 |

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Toolchain that compiles, serves, and deploys before any content exists.

- [X] T001 Record the PATCH amendment to `.specify/memory/constitution.md` correcting the `@astrojs/react` line to 4.x for Astro 5 and noting that this package declares no `astro` peer (run `/speckit.constitution`; rationale in plan.md → Complexity Tracking). Blocks T003.
- [X] T002 Create `package.json` with `"type": "module"`, `"private": true`, and empty `scripts` block at repository root
- [X] T003 Install pinned runtime dependencies into `package.json`: `astro@5.18.2 @astrojs/cloudflare@12.6.13 @astrojs/react@4.4.2 react@19.2.8 react-dom@19.2.8` (see research.md D-01 — **not** `@astrojs/react@^5`)
- [X] T004 Install pinned dev dependencies into `package.json` — `typescript@5.9.3 @astrojs/check @types/react @types/react-dom vitest@4.1.11 @playwright/test@1.62.1 wrangler@4.126.0 @cloudflare/workers-types@5.20260826.1` — and run `npx playwright install chromium`
- [X] T005 [P] Create `astro.config.mjs`: `site: 'https://dirtyworks.ai'`, `output: 'static'`, `adapter: cloudflare({ imageService: 'compile', platformProxy: { enabled: !process.env.VITEST } })`, `integrations: [react()]`, `trailingSlash: 'never'`, `build: { format: 'file' }`
- [X] T006 [P] Create `wrangler.jsonc` exactly per research.md D-05, including the `send_email` binding `EMAIL`, the `ratelimits` binding `FORM_LIMITER` with `simple.period: 60` (only 10 or 60 are accepted), and a comment stating that `"remote"` must stay unset so local runs never send real mail
- [X] T007 [P] Create `tsconfig.json` extending `astro/tsconfigs/strict` with `@cloudflare/workers-types` in `types` and `verbatimModuleSyntax` enabled
- [X] T008 [P] Create `src/env.d.ts` declaring the `EMAIL` (`SendEmail`) and `FORM_LIMITER` (`RateLimit`) bindings so `cloudflare:workers` env access is typed
- [X] T009 [P] Create `vitest.config.ts` using `getViteConfig()` from `astro/config`
- [X] T010 [P] Create `playwright.config.ts` with two projects (`desktop` 1440×900, `mobile` 320×720), `webServer: { command: 'npm run build && npx wrangler dev', port: 8787, reuseExistingServer: !process.env.CI, timeout: 120_000 }`, `use.baseURL: 'http://localhost:8787'`
- [X] T011 [P] Create `public/.assetsignore` containing `_worker.js` and `_routes.json`
- [X] T012 [P] Create `.gitignore` covering `node_modules/`, `dist/`, `.astro/`, `.wrangler/`, `.DS_Store`
- [X] T013 Create the directory skeleton from plan.md → Source Code: `src/{actions,components/{layout,ui,patterns,sections,islands},content/pages,layouts,pages,styles/tokens,types}`, `public/{fonts,og}`, `scripts/`, `tests/{unit,e2e}`
- [X] T014 Prove the toolchain: a placeholder `src/pages/index.astro` builds, `npx wrangler dev` serves it on `:8787`, `npx wrangler deploy --dry-run` reports no `_worker.js` error, and `curl -o /dev/null -w '%{http_code}' http://localhost:8787/_worker.js/index.js` returns 404

**Checkpoint**: The pipeline builds, serves, and passes the asset-exposure check.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Tokens, the page frame, the route model, shared chrome, and the release gate. Order
matters here — T015–T018 exist to kill two whole classes of bug (invisible dark-band headings, 320px
horizontal overflow) before a single page is written.

**⚠️ CRITICAL**: No user story work begins until this phase is complete.

- [X] T015 Vendor the seven token files plus the entry point from `design-system/` into `src/styles/tokens.css` and `src/styles/tokens/{colors,typography,spacing,surfaces,motion,texture}.css`, preserving import order `fonts → colors → typography → spacing → surfaces → motion → texture` (see contracts/design-tokens.md)
- [X] T016 Rewrite `src/styles/tokens/fonts.css`: delete both Google Fonts `@import`s (the only external URLs in the CSS surface), drop Material Symbols entirely, and declare local `@font-face` rules for Archivo (variable), Instrument Serif (regular + italic only — it is not variable), and IBM Plex Mono
- [X] T017 [P] Add self-hosted `woff2` files and `OFL.txt` under `public/fonts/`, and preload the two above-the-fold faces from `src/layouts/BaseLayout.astro`
- [X] T018 Create `src/styles/site.css` with the band frame (grounds, `1.5px` separators, the two `6px` editorial rules, section padding clamps), **explicit heading-colour rules for every dark and brand band** (element selectors beat inherited `color`), and `min-width: 0` on all shared grid-child selectors (grid children default to `min-width: auto` and overflow at 320px)
- [X] T019 [P] Create `src/types/proof.ts` with the `ProofStatus` union lifted verbatim from the design-system contract
- [X] T020 [P] Create `src/types/claims.ts` with the closed `ClaimStamp` union (note the em dash in `HYPOTHESIS — NOT MEASURED`)
- [X] T021 Create `src/content/routes.ts` implementing the `RouteEntry` model for all nine routes with verbatim titles, Home's description, header-action variant, CTA pair, and `published` flag (contracts/routes.md)
- [X] T022 Create `src/content/navigation.ts` deriving header, footer, and mobile-panel navigation from `routes.ts` — derived, never hand-authored, so a renamed page cannot orphan a link
- [X] T023 [P] Create `src/content/placeholders.ts` with the founder-content entry (`OPEN_GAP`, blocks `about`) and the intake consent entry (`LEGAL_REVIEW`, blocks `start`)
- [X] T024 [P] Create `src/content/claim-artefacts.ts` registering each illustrative artefact and its required stamp, so the release gate is data-driven rather than hard-coding page internals
- [X] T025 Create `src/layouts/BaseLayout.astro`: head (title, description, social preview, font preloads), skip link, header, `<slot />`, footer
- [X] T026 [P] Create `src/components/layout/Band.astro` (ground, optional borders, padding override) in `src/components/layout/`
- [X] T027 [P] Create `src/components/layout/Container.astro` (`max-width: 1440px; margin: 0 auto`)
- [X] T028 [P] Create `src/components/ui/Folio.astro` — the `1.5px × 40px` orange rule plus mono `11px/600` label at `0.18em`, with a tone prop for `#636760` on light and `#8B8E86` on ink (uses `--type-label-sm` + `--weight-label`, not `.dw-folio`; research.md D-07 #2)
- [X] T029 [P] Create `src/components/ui/Button.astro` with variants `primary|secondary|evidence|ghost` and sizes `sm|md|lg`, CSS-only hover (fill darkens) and press (offset collapses to `1px 1px 0` with a 1px translate) — no scale transforms, no opacity fades
- [X] T030 [P] Create `src/components/ui/ProofLabel.astro` (status chip) rendering its state as text plus colour, never colour alone
- [X] T031 [P] Create `src/components/ui/ClaimStamp.astro` rendering a `ClaimStamp` value
- [X] T032 Create `src/components/layout/SiteHeader.astro`: sticky, `z-index: 50`, bone ground, `1.5px` bottom border, 76px height, wordmark → nav → action → uppercase version marker; **all destinations rendered at all times**, panel visibility driven by a `data-open` attribute
- [X] T033 Create `src/components/islands/HeaderNav.tsx` (`client:load`) upgrading the header: mobile disclosure, Escape to dismiss, focus containment while open, primary action inside the opened panel
- [X] T034 Create `src/components/layout/SiteFooter.astro`: ink ground, `minmax(280px,1.3fr) repeat(3, minmax(140px,1fr))` (never `auto-fit` — the wordmark clamp collides), Service/Company/Legal columns with Legal as inert `<span>`s, and the bottom accountability + version line
- [X] T035 Create `src/pages/404.astro` retaining header and footer and offering navigation
- [X] T036 Create `scripts/check-content.ts` implementing all eight rules in contracts/content-check.md, exiting non-zero with `path:line RULE-n message` per violation
- [X] T037 Wire `package.json` scripts: `dev`, `build`, `typecheck` (`astro check`), `test:unit`, `check:content`, `test:e2e`
- [X] T038 [P] Create `tests/unit/routes.test.ts` asserting every path resolves to a file in `src/pages/`, every published route appears in navigation, ids and paths are unique, every CTA target is published, and no unpublished route appears anywhere
- [X] T039 [P] Create `tests/unit/discipline.test.ts` asserting no file under `src/` imports from `design-system/` or `mockups/`, every `var(--…)` used exists in the vendored token set, no `border-radius` above 3px, no blurred `box-shadow`, no gradient outside `texture.css`, and no external-origin `@import`
- [X] T040 [P] Create `tests/unit/check-content.test.ts` with one fixture per rule proving each fires, plus a clean-tree fixture exiting 0

**Checkpoint**: Any page can now be added on a correct frame, and the release gate can already refuse
a bad build.

---

## Phase 3: User Story 1 - Log an operating gap (Priority: P1) 🎯 MVP

**Goal**: Home explains the offer and `/start` converts — validated, guarded, and notified. This is
the only transaction on the site.

**Independent Test**: From `/`, follow the header action to `/start`, complete the eight required
fields, pace the submission past one second, and confirm both the confirmation panel and a
notification carrying every field with the submitter as reply-to (quickstart.md → Story 1).

**Note**: The pattern components here (T042–T051) are built once in this story and reused by US2–US5.

### Content and patterns

- [X] T041 [US1] Create `src/content/pages/home.ts` with all twelve sections' content verbatim from `mockups/design_files/MarketingPage.dc.html` and its `renderVals()` block: 4 portfolio rows, 7 evidence items, 8 register rows, 7 catalogue entries, 7 comparison rows, 6 knowledge chips, 7 work-order steps, 7 control rows, 3 fit fields, 3 seam rows, the 14 work nouns, and the CTA band
- [X] T042 [P] [US1] Create `src/components/patterns/RegisterRow.astro` — mono label / body / detail columns, hairlines, `1.5px` ink top and bottom, alternating bone-2 ground with the `24px` left offset (pattern, not a page violation)
- [X] T043 [P] [US1] Create `src/components/patterns/Declaration.astro` accepting per-section clamp/leading/tracking values (per-page prototype literals win; do not override `--type-display`)
- [X] T044 [P] [US1] Create `src/components/patterns/PullQuote.astro` — Instrument Serif italic with a `3px` orange left border
- [X] T045 [P] [US1] Create `src/components/patterns/CTABand.astro` taking `folio`, `heading`, `support`, `primary`, `secondary` and real `href`s
- [X] T046 [P] [US1] Create `src/components/patterns/AnnotatedComparison.astro` — left column struck through, one `decisive` row filled acid, margin annotation
- [X] T047 [P] [US1] Create `src/components/patterns/WorkOrder.astro` — numbered lifecycle with per-step marks, serif annotations, and a loop label
- [X] T048 [P] [US1] Create `src/components/patterns/ControlRegister.astro` — control / mechanism / holder / state + textual status, with caption and note slots
- [X] T049 [P] [US1] Create `src/components/patterns/FitField.astro` rendering `excluded` at the same weight as `included`
- [X] T050 [US1] Create `src/components/patterns/EvidenceRail.astro` whose static output renders in the **aligned** state, so the animation is purely additive
- [X] T051 [US1] Create `src/components/islands/EvidenceRail.tsx` (`client:visible`) animating fragments into alignment on scroll via `IntersectionObserver`, using `dw-slide-into-alignment` and collapsing under `prefers-reduced-motion`

### Home sections

- [X] T052 [US1] Build Home §01 hero in `src/components/sections/home/Hero.astro`: `minmax(0,1.5fr) minmax(300px,1fr)`, `clamp(52px,7.6vw,134px)/0.84`, the `-0.06em` inline-block pull on `operating`, and the `ILLUSTRATIVE`-stamped 4-row portfolio register with its `GAP / OPEN` orange left border and "not customer data" caption
- [X] T053 [P] [US1] Build Home §02 problem band in `src/components/sections/home/Problem.astro` (bone-2, `minmax(0,1fr) minmax(0,1.35fr)`) using `EvidenceRail` with all 7 items stamped `ILLUSTRATIVE`
- [X] T054 [P] [US1] Build Home §03 what-we-operate in `src/components/sections/home/WhatWeOperate.astro` — 8 `RegisterRow`s with `minmax(180px,0.6fr) minmax(0,1.4fr) minmax(0,1fr)`, `#D6CDB7` hairlines, row 8 closed with `1.5px` ink, and the closing serif line
- [X] T055 [P] [US1] Build Home §04 governed catalogue in `src/components/sections/home/Catalogue.astro` — 7 menu rows (`88px minmax(0,1fr) minmax(0,1fr)`, `#C9C0AA` hairlines), candidate products as text only, and the `VERIFY AT QUOTE` disclaimer
- [X] T056 [P] [US1] Build Home §05 comparison in `src/components/sections/home/Comparison.astro` with the renewal row decisive
- [X] T057 [P] [US1] Build Home §06 knowledge ink band in `src/components/sections/home/Knowledge.astro` — chip sequence with `→` connectors (hidden from assistive technology), evidence-variant action, and the orange-bordered pull quote
- [X] T058 [P] [US1] Build Home §07 method in `src/components/sections/home/Method.astro` with a `position: sticky; top: 108px` left column and the 7-step `WorkOrder`
- [X] T059 [P] [US1] Build Home §08 trust in `src/components/sections/home/Trust.astro` — 7-row `ControlRegister` extract plus the customer-owned note
- [X] T060 [P] [US1] Build Home §09 fit in `src/components/sections/home/Fit.astro` — two `FitField`s in `repeat(auto-fit,minmax(320px,1fr))` plus one full-width
- [X] T061 [P] [US1] Build Home §10 MSP lane ink band in `src/components/sections/home/MspLane.astro` — three seam rows, the Dirtyworks.ai row carrying `margin-left:16px` **and** `padding-left:24px` with a `3px` orange left border on `#1A1A17` (this is the page's second violation)
- [X] T062 [P] [US1] Build Home §11 manifesto in `src/components/sections/home/Manifesto.astro` — `6px` top rule, `clamp(44px,6.4vw,116px)/0.84`, acid highlight on `works`, the 14 work nouns, closing serif line, no folio
- [X] T063 [US1] Build Home §12 conversion in `src/components/sections/home/Conversion.astro` — `CTABand` plus the ink safety-note strip with the rule **above** the paragraph (research.md D-07 #6)
- [X] T064 [US1] Assemble `src/pages/index.astro` from the twelve sections in order

### Intake action

- [X] T065 [US1] Create `src/actions/schemas.ts` — strict zod `OperatingGapSubmission` with every field bound per data-model.md, the closed ten-value `needs` union, and the `decoy` / `elapsedMs` guard fields
- [X] T066 [US1] Create `src/actions/guards.ts` — honeypot check, `MIN_ELAPSED_MS = 1000` floor, and `FORM_LIMITER.limit({ key: sha256(CF-Connecting-IP) })` where an absent binding allows and a throwing binding blocks
- [X] T067 [US1] Create `src/actions/notify.ts` — build `text` and `html` with every field under its prototype label in form order, set `replyTo` to the submitter and subject `OPERATING GAP / INTAKE — {company}`, call `env.EMAIL.send()`, capture `messageId`, and emit the five-field bounded log record
- [X] T068 [US1] Create `src/actions/index.ts` defining `logOperatingGap` and mapping every outcome exactly to the error table in contracts/actions.md, returning success only after `send()` resolves
- [X] T069 [US1] Create `src/components/islands/StartForm.tsx` (`client:load`) implementing the state machine in data-model.md §3: real multi-select need checkboxes with ≥44px targets, inline field errors in `#C1200B` with focus moved to the first invalid field, in-flight disabling, and retry paths preserving entered values
- [X] T070 [US1] Create `src/pages/start.astro` — hero, the hard-shadowed form sheet with `OPERATING GAP / INTAKE` header strip, the `OPTIONAL CONTEXT` divider, the `DO NOT SEND` consent block with its `LEGAL REVIEW` stamp, the sticky sidebar (what-happens-next + partner enquiry), the confirmation panel markup, and a `<noscript>` block rendering purpose, fields, and a `mailto:` alternative

### Tests for User Story 1

- [X] T071 [P] [US1] Create `tests/unit/actions.schemas.test.ts` — valid payload accepted; each missing required field, malformed email, over-long value, unknown key, and out-of-union need rejected
- [X] T072 [P] [US1] Create `tests/unit/actions.guards.test.ts` — non-empty decoy refuses, sub-floor `elapsedMs` refuses, limiter `false` yields `TOO_MANY_REQUESTS`, limiter throwing blocks, absent binding allows
- [X] T073 [P] [US1] Create `tests/unit/actions.notify.test.ts` — payload contains every field under its label with `replyTo` and subject format; the log record matches the five-field shape and contains no submitted value; a `send()` rejection maps to `deliveryFailed`
- [X] T074 [P] [US1] Create `tests/e2e/home.spec.ts` — title and description, twelve sections present in order, `ILLUSTRATIVE` stamps rendered, no price or purchase control, header action label
- [X] T075 [US1] Create `tests/e2e/start.spec.ts` — paced submission reaches the confirmation panel and the simulated notification is observable; empty submit shows inline errors with focus on the first; a ~50ms submission is refused (guard asserted deliberately); six submissions in a minute yield the rate-limited message; an unbound `EMAIL` yields delivery-failed with values preserved and **no** confirmation

**Checkpoint**: US1 is deployable on its own — a visitor can understand the offer and reach the
business, and no failure path can claim a success it has not earned.

---

## Phase 4: User Story 2 - Managed scope and boundaries (Priority: P2)

**Goal**: `/services` and `/catalogue` answer "what does it actually manage, and who invoices?"

**Independent Test**: Every scope row shows its boundary at equal weight; every catalogue category
shows tier, state, and purchase route; no price or buy control exists anywhere (quickstart.md → Story 2).

- [X] T076 [P] [US2] Create `src/content/pages/services.ts` — 8 scope rows with boundary text, the 5 engagement stages with commercial treatment, the 3 responsibility panels, the unpublished-prices note verbatim, and the CTA band
- [X] T077 [P] [US2] Create `src/content/pages/catalogue.ts` — 5 approval questions, 7 expanded categories with tier/state/purchase route/emphasis, 4 commercial-route panels, and the 9-row quote sheet whose commercial values read as `VERIFY AT QUOTE — CUSTOMER-DIRECT` or `SCOPED AT REVIEW`
- [X] T078 [US2] Build the scope register in `src/components/sections/services/ScopeRegister.astro` — 3-column grid whose boundary cell carries a `3px` orange left border and a mono `BOUNDARY` caption at equal visual weight
- [X] T079 [P] [US2] Build the engagement path in `src/components/sections/services/EngagementPath.astro` with the OPERATE row highlighted and the mono price note
- [X] T080 [P] [US2] Build the responsibility panels in `src/components/sections/services/ResponsibilityBoundary.astro` — three `#1A1A17` panels with `3px` top borders in orange, acid, and blueprint, each stating its owner in text
- [X] T081 [US2] Assemble `src/pages/services.astro`
- [X] T082 [P] [US2] Build the approval questions in `src/components/sections/catalogue/ApprovalQuestions.astro` — five blueprint chips plus their questions
- [X] T083 [US2] Build the product menu in `src/components/sections/catalogue/ProductMenu.astro` — 7 expanded rows, Archivo 34px menu word, candidate products as text, state chips, purchase route, and the mono note forbidding a buy button
- [X] T084 [P] [US2] Build the commercial route ink band in `src/components/sections/catalogue/CommercialRoute.astro` — four panels plus the serif resale-authority line
- [X] T085 [US2] Build the quote sheet in `src/components/sections/catalogue/QuoteSheet.astro` as a hard-shadowed sheet stamped `ILLUSTRATIVE`, registering it in `src/content/claim-artefacts.ts`
- [X] T086 [US2] Assemble `src/pages/catalogue.astro`
- [X] T087 [P] [US2] Create `tests/e2e/services-catalogue.spec.ts` — boundary cells present on all 8 rows, all 7 categories complete, quote sheet stamped with no numeric values, and a whole-page scan finding no currency symbol or purchase control

**Checkpoint**: US1 and US2 both work independently.

---

## Phase 5: User Story 3 - Trust and method (Priority: P3)

**Goal**: `/trust` and `/method` let a cautious buyer judge risk before granting access.

**Independent Test**: Limitations precede the control register in DOM order; the incident sequence is
labelled illustrative; stopping appears as a valid outcome (quickstart.md → Story 3).

- [X] T088 [P] [US3] Create `src/content/pages/trust.ts` — the 8 what-we-do-not-promise lines verbatim, the full 12-row control register, the 4-entry incident sequence with its border roles, and the 6 exit chips ending in the acid one
- [X] T089 [P] [US3] Create `src/content/pages/method.ts` — the 7 lifecycle steps with inputs / work / customer decision / output + gate chip, the 6 valid outcomes with colour roles, and the 10-field monthly record
- [X] T090 [US3] Build the limitations ink band in `src/components/sections/trust/Limitations.astro` — 8 numbered `#1A1A17` panels plus the "I don't know" pull quote
- [X] T091 [P] [US3] Build the incident timeline in `src/components/sections/trust/IncidentVoice.astro` — 4 timestamped entries with coloured left borders, stamped `ILLUSTRATIVE INCIDENT VOICE` and explicitly labelled as voice and sequence, registered in `src/content/claim-artefacts.ts`
- [X] T092 [P] [US3] Build the exit section in `src/components/sections/trust/Exit.astro` — exit-package copy plus six chips ending in acid `ACCESS REMOVED`
- [X] T093 [US3] Assemble `src/pages/trust.astro` with the 12-row register and its non-certification note, keeping limitations **before** the register (a reordering must fail T098)
- [X] T094 [US3] Build the lifecycle grid in `src/components/sections/method/Lifecycle.astro` — 5-column grid, alternating offsets, and gate chips (blueprint review, orange stop at APPROVE, acid release at STABILIZE, outlined loop at OPERATE, outlined clean removal at RENEW OR EXIT)
- [X] T095 [P] [US3] Build valid outcomes in `src/components/sections/method/ValidOutcomes.astro` — six chips whose meanings are stated in text
- [X] T096 [P] [US3] Build the monthly record in `src/components/sections/method/MonthlyRecord.astro` — `repeat(auto-fit,minmax(240px,1fr))` of ten fields, the last with a `3px` orange left border, stamped `ILLUSTRATIVE`
- [X] T097 [US3] Assemble `src/pages/method.astro`
- [X] T098 [P] [US3] Create `tests/e2e/trust-method.spec.ts` — asserts limitations precede the register by DOM position, the register carries its note, the timeline is labelled illustrative, and stop is present as a valid outcome

**Checkpoint**: US1–US3 independently functional.

---

## Phase 6: User Story 4 - MSP partner lane (Priority: P4)

**Goal**: `/msps` lets a partner evaluate the three models and the responsibility seam.

**Independent Test**: The header action reads as the partner action; every seam cell holds a word
(quickstart.md → Story 4).

- [X] T099 [P] [US4] Create `src/content/pages/msps.ts` — 8 practice items, 3 partnership models with their three fields each, the 10×3 seam matrix using the `OWNS / LEAD / PER MODEL / ESCALATION / —` vocabulary, and the 7 pilot steps
- [X] T100 [P] [US4] Build the practice items in `src/components/sections/msps/PracticeAdds.astro` — `repeat(auto-fit,minmax(300px,1fr))` hairline grid
- [X] T101 [US4] Build the three models in `src/components/sections/msps/Models.astro` — referral and white-label with ink offsets, co-managed with `6px 6px 0 #FF5A1F` and `translateY(-8px)` (this page's violation), plus the note declining wholesale percentages
- [X] T102 [US4] Build the seam matrix in `src/components/sections/msps/SeamMatrix.astro` — 10 rows × 3 parties with a mono header row, the AI-account row offset `24px` on `#1A1A17` with an orange left border, and every cell carrying a word
- [X] T103 [P] [US4] Build the pilot steps in `src/components/sections/msps/Pilot.astro` — seven numbered steps ending "Repeat, revise, or stop."
- [X] T104 [US4] Assemble `src/pages/msps.astro` and confirm the route's `headerAction: 'partner'` resolves to the partner label
- [X] T105 [P] [US4] Create `tests/e2e/msps.spec.ts` — partner header action, all 30 seam cells non-empty of text, three models each stating their three fields

**Checkpoint**: US1–US4 independently functional.

---

## Phase 7: User Story 5 - About and Notes (Priority: P5)

**Goal**: `/notes` publishes the editorial index honestly; `/about` is built but withheld until real
founder content exists.

**Independent Test**: No fabricated name, biography, date, or reading time exists, and the content
check fails if `/about` is published while its marker is unresolved (quickstart.md → Story 5).

- [X] T106 [P] [US5] Create `src/content/pages/about.ts` — the three provisional paragraphs, the seven sponsor inputs still required, the serif line, and the seven operating beliefs verbatim
- [X] T107 [P] [US5] Create `src/content/pages/notes.ts` — the publishing-state copy, the first three notes with titles and theses and their chips, and the 04–12 queue titles with the closing mono note
- [X] T108 [P] [US5] Build the operating beliefs ink band in `src/components/sections/about/Beliefs.astro` — seven numbered display-type rows
- [X] T109 [US5] Assemble `src/pages/about.astro` reading its content through the placeholder registry so the unresolved marker renders as a marker, and confirm `published: false` removes the route from the build, navigation, and CTA targets
- [X] T110 [US5] Build the notes index in `src/components/sections/notes/Index.astro` — three in-preparation rows with `METHOD` + `IN PREPARATION` chips, then the title-only queue in two hairline columns
- [X] T111 [US5] Assemble `src/pages/notes.astro`
- [X] T112 [P] [US5] Create `tests/e2e/about-notes.spec.ts` plus a unit assertion — queue items expose no link, date, or reading time; `/about` is absent from navigation and returns the 404 page while unpublished; `npm run check:content` fails if it is published with the marker unresolved

**Checkpoint**: All content stories complete. Every page exists; one is deliberately withheld.

---

## Phase 8: User Story 6 - Constrained visitors (Priority: P6)

**Goal**: Every page usable at 320px, without scripting, by keyboard, and with assistive technology.

**Independent Test**: Nine routes at six widths with no horizontal scroll; every destination
followable with scripting disabled; no dead controls (quickstart.md → Story 6).

- [X] T113 [US6] Add narrow-viewport rules to `src/styles/site.css`: registers stack label-above-value, comparisons stack preserving their pairing, work-order steps stay numbered and sequential, the seam matrix and services boundary column stop requiring horizontal scroll, and hero order becomes declaration → support → actions → register
- [X] T114 [US6] Make catalogue categories collapse to expandable editorial rows in `src/components/sections/catalogue/ProductMenu.astro` — default state shows job and operating emphasis, candidate products expand, using a disclosure that works without scripting
- [X] T115 [US6] Complete the mobile panel in `src/components/islands/HeaderNav.tsx` — wordmark, menu control, primary action inside the panel, Escape dismissal, focus containment, and no floating control anywhere
- [X] T116 [US6] Audit and fix focus indicators and target sizes across `src/components/**` — `3px` blueprint ring (acid on dark fields), ≥44px targets, disabled state at 40% opacity without shadow
- [X] T117 [P] [US6] Create `tests/e2e/responsive.spec.ts` — all nine routes at six widths from 320px to 1440px asserting `scrollWidth <= clientWidth`, with explicit cases for the services boundary column, the seam matrix, and the catalogue menu
- [X] T118 [P] [US6] Create `tests/e2e/no-js.spec.ts` — with scripting disabled, every page renders, every navigation destination is followable, and `/start` shows purpose, fields, and a `mailto:` alternative
- [X] T119 [P] [US6] Create `tests/e2e/keyboard.spec.ts` — header traversal, mobile menu open and Escape-dismiss, need-chip toggling, and form submission entirely by keyboard with a visible focus indicator at every stop
- [X] T120 [P] [US6] Create `tests/e2e/a11y.spec.ts` — one `h1` per page with a correctly ordered outline, AA contrast on every band, no light-on-orange text, decorative connectors hidden from assistive technology, and every status chip's state readable as text

**Checkpoint**: All six stories independently functional and verified.

---

## Phase 9: Polish & Cross-Cutting Concerns

- [X] T121 [P] Add `public/og/` social preview image and `public/robots.txt`
- [X] T122 Wire the version marker in `src/components/layout/SiteHeader.astro` and `SiteFooter.astro` to the build identity rather than a literal, rendering uppercase in both
- [X] T123 [P] Verify font licences and record them in `public/fonts/OFL.txt`, confirming Instrument Serif is used at weight 400 only (it is not variable, and other weights synthesise)
- [X] T124 Create the CI pipeline in `.github/workflows/deploy.yml` running `typecheck → test:unit → check:content → build → test:e2e → wrangler deploy --dry-run` before deploy, with build command `npm run build` and deploy command `npx wrangler deploy` (never a combined script — it builds twice)
- [X] T125 Rewrite `ARCHITECTURE.md` for this repository, applying every correction in research.md (nine pages, `dirtyworks.ai`, `@astrojs/react@4.4.2`, hybrid build output, no `wrangler email` command group, `ratelimits.simple.period` ∈ {10, 60}, `remote` unset) and dropping the Jotbrain test counts
- [X] T126 Record launch-blocker status in `specs/001-build-marketing-website/` — sponsor founder content, approved consent/privacy/terms/accessibility copy, sending-domain onboarding, and the analytics decision, each with its gating route
- [X] T127 Run the full validation in `specs/001-build-marketing-website/quickstart.md` end to end against a real deploy target and confirm every deploy gate passes
- [X] T128 Remove the placeholder `src/pages/index.astro` scaffolding from T014 and any remaining development-only markers (for example the prototype's "Mockup — no data is sent" note)

---

## Dependencies & Execution Order

### Phase dependencies

- **Setup (Phase 1)**: T001 blocks T003 (the pin must be legitimate before it is installed). T002 → T003 → T004. T005–T012 are parallel once dependencies are installed. T013 → T014.
- **Foundational (Phase 2)**: depends on Setup. **Blocks every user story.** Internal order: T015 → T016 → T017; T018 depends on T015; T019/T020 independent; T021 → T022; T025 depends on T015–T020; T032 → T033; T036 depends on T023/T024; T038–T040 depend on their targets.
- **User stories (Phases 3–8)**: all depend on Foundational. US2–US5 additionally depend on the pattern components T042–T051 built in US1 — the only genuine cross-story dependency, and the reason US1 is both the MVP and the widest phase.
- **US6 (Phase 8)** depends on the pages existing; it can begin as soon as any page is complete and should run continuously rather than being deferred to the end.
- **Polish (Phase 9)**: depends on all desired stories.

### User story dependencies

- **US1 (P1)**: Foundational only. Fully independent. Deployable alone.
- **US2 (P2)**: Foundational + T042–T051. Independently testable.
- **US3 (P3)**: Foundational + T042–T051. Independently testable.
- **US4 (P4)**: Foundational + T042–T051. Independently testable.
- **US5 (P5)**: Foundational + T042–T051. Independently testable.
- **US6 (P6)**: needs pages to verify against; verifies all of them without modifying their content.

### Parallel opportunities

- Setup: T005–T012 (8 config files, no overlap)
- Foundational: T019/T020, T026–T031 (6 presentational components), T038–T040 (3 test files)
- US1: T042–T049 (8 patterns), T053–T062 (10 Home sections after the hero establishes the frame), T071–T073 (3 unit test files)
- US2–US5: content modules and section components within each story; whole stories in parallel across developers
- US6: T117–T120 (4 E2E spec files)

---

## Parallel Example: User Story 1

```bash
# Pattern components — different files, no interdependencies:
Task: "Create src/components/patterns/RegisterRow.astro"
Task: "Create src/components/patterns/Declaration.astro"
Task: "Create src/components/patterns/PullQuote.astro"
Task: "Create src/components/patterns/CTABand.astro"
Task: "Create src/components/patterns/AnnotatedComparison.astro"
Task: "Create src/components/patterns/WorkOrder.astro"
Task: "Create src/components/patterns/ControlRegister.astro"
Task: "Create src/components/patterns/FitField.astro"

# Home sections, once Hero has established the band frame:
Task: "Build Home §02 problem band"     # … through §11 manifesto

# Action unit tests:
Task: "Create tests/unit/actions.schemas.test.ts"
Task: "Create tests/unit/actions.guards.test.ts"
Task: "Create tests/unit/actions.notify.test.ts"
```

---

## Implementation Strategy

### MVP first (User Story 1 only)

1. Phase 1 Setup — including the constitution amendment, before the wrong pin gets installed.
2. Phase 2 Foundational — tokens, frame, route model, chrome, release gate.
3. Phase 3 US1 — Home plus `/start` plus the action.
4. **STOP and VALIDATE**: run quickstart.md → Story 1, including all five failure paths.
5. Deploy. A single-page site that converts honestly beats nine pages that lose submissions.

### Incremental delivery

1. Setup + Foundational → frame ready, gate already able to refuse a bad build
2. US1 → validate → deploy (MVP)
3. US2 → validate → deploy
4. US3 → validate → deploy
5. US4, US5 → validate → deploy
6. US6 runs alongside from the first page onward, not as a final sweep
7. Phase 9 → launch readiness

### Parallel team strategy

Setup and Foundational together, then US1's patterns (T042–T051) as a shared prerequisite, then:
Developer A takes US1's action and `/start`; B takes US2; C takes US3; D takes US4 + US5; and US6's
E2E suites grow as pages land.

---

## Notes

- **Never re-litigate an adjudicated conflict.** research.md D-07 settles six disagreements between
  the authorities; treat them as decided.
- **Copy is load-bearing.** Never paraphrase, retitle, or title-case a heading — headings are
  authored in sentence case and uppercased by CSS.
- **Claim stamps ship.** `ILLUSTRATIVE` and `VERIFY AT QUOTE` must survive to production; `OPEN GAP`
  and `LEGAL REVIEW` must never reach a published route.
- **Never widen the palette, the radius ceiling, or the shadow model** to make something look right.
  If a value is missing, it comes from the prototype's inline style, not from invention.
- Commit after each task or logical group; run `npm run check:content` before every commit that
  touches `src/content/`.
- Stop at any checkpoint to validate a story independently.
