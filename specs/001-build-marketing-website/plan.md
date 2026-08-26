# Implementation Plan: Dirtyworks.ai Public Marketing Website

**Branch**: `001-build-marketing-website` | **Date**: 2026-08-25 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-build-marketing-website/spec.md`

## Summary

Build nine prerendered pages plus one guarded server action. Content is served as static assets from
Cloudflare's edge with zero Worker invocations; the only per-request code is the `/start` intake
action, which validates, screens for abuse, and sends one transactional notification.

The design is already final and literal: `mockups/design_files/*.dc.html` carry exact values in inline
styles, and `design-system/tokens/*.css` are usable verbatim (verified byte-identical to the copy
bundled under `mockups/`). So the technical work is not design work — it is faithful reconstruction
plus three things the prototypes do not contain: narrow-viewport behaviour, real form behaviour, and
an automated release gate that refuses to publish unresolved claims.

Three hydrated islands, justified individually (§Constitution Check). Everything else is `.astro`
with no client JavaScript.

## Technical Context

**Language/Version**: TypeScript 5.9.3 (`astro/tsconfigs/strict`, `verbatimModuleSyntax`), Node 20+

**Primary Dependencies**: `astro@5.18.2`, `@astrojs/cloudflare@12.6.13`, `@astrojs/react@4.4.2`,
`react@19.2.8` / `react-dom@19.2.8`, `astro/zod` (bundled), `wrangler@4.126.0`

**Storage**: None. Submissions are transient — validated, sent as one notification, never persisted.
No database, no KV, no D1, no object storage.

**Testing**: `vitest@4.1.11` via `getViteConfig()` from `astro/config`; `@playwright/test@1.62.1`
with two projects (1440×900 desktop, 320×720 mobile) and `webServer` running `wrangler dev` against
the built output

**Target Platform**: Cloudflare Workers — static assets for all nine routes plus one Worker route at
`/_actions/[...path]`. Evergreen browsers, 320px–1440px, keyboard-only and no-JavaScript supported.

**Project Type**: Static marketing site with a single server action (no backend service, no API
surface for third parties)

**Performance Goals**: Page text readable within 2s on a mid-range phone over 4G (SC-010); zero
Worker invocations for content routes; client JavaScript limited to the React runtime plus three
islands; no third-party requests at runtime (fonts self-hosted, no analytics)

**Constraints**: Closed six-colour palette plus derived neutrals and one semantic error colour;
border radius ≤3px; shadows are a single hard offset with zero blur or none; WCAG 2.1 AA; no
horizontal scroll of core content at 320px; state never conveyed by colour alone; privacy-bounded
logging (purpose, outcome, duration, `messageId` only); transactional email only

**Scale/Scope**: 9 routes, 51 functional requirements, 12 success criteria, 6 user stories, ~30
components of which 3 hydrate, 1 action with 2 guard layers plus schema validation, 1 release gate

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Evaluated against [`.specify/memory/constitution.md`](../../.specify/memory/constitution.md) v1.0.0.

| Gate | Constitution rule | Design decision | Status |
|---|---|---|---|
| I. Static by default | All routes prerender; exactly one on-demand surface | 9 routes prerendered; only the injected `/_actions/[...path]` route is on-demand. Actions are invoked client-side from the island, so no page reads a server action result and no page needs `prerender = false`. | PASS |
| I. Island justification | Hydrate only for behaviour HTML cannot express | 3 islands, each justified below. `Button`, `CTABand`, `ControlRegister`, `WorkOrder`, `AnnotatedComparison`, `FitField`, `ProofLabel` are all presentational and ship as `.astro` with CSS-only hover/press. | PASS |
| I. Excluded dependencies | No router, CSS framework, state library, third-party or analytics script | None introduced. Fonts self-hosted, so zero runtime third-party requests. | PASS |
| II. Vendored design system | `src/` never imports `design-system/` or `mockups/`; literal token values | 8 CSS files copied into `src/styles/`; `fonts.css` rewritten for self-hosting (its two Google Fonts `@import`s are the only external URLs in the whole CSS surface). No `.jsx` vendored — the DS components target a UMD global and use inline style objects; they are rebuilt as `.astro` against their `.d.ts` prop contracts. | PASS |
| II. Closed palette / radius / shadow | Palette closed, radius ≤3px, single hard offset shadows | Enforced by a CSS check against the 155-name token allow-list extracted from `design-system/_adherence.oxlintrc.json`, plus a radius ceiling rule that the DS config does not encode. | PASS |
| II. ≤2 grid violations per page | At most two sanctioned violations | Home appeared to carry three. Adjudicated: the alternating register-row 24px offsets are part of the register-row *pattern* (systemic, `mockups/README.md:135`), not a page violation — `README:143` groups them with the hero offset as one build-wide device. Home therefore has two discrete violations: the hero `-0.06em` pull and the §10 seam row. Recorded in research.md D-07. | PASS |
| III. Claim discipline as build gate | Release fails on unresolved markers, banned vocabulary, banned CTAs, unstamped mocks | `scripts/check-content.ts` implements all four plus emoji and casing rules; contract in [contracts/content-check.md](./contracts/content-check.md). Verified by introducing a deliberate violation (SC-008). | PASS |
| III. `/about` gating | Not published while the founder marker is unresolved | `/about` is built but its route and navigation entries are suppressed by a single `published` flag in the route model; the check fails if an `OPEN GAP` marker reaches a published route. | PASS |
| IV. Useful before hydration | Nav destinations always in DOM; `<noscript>` form path | Header renders all destinations always; the mobile panel toggles via `data-open` + CSS. `/start` renders fields and a `mailto:` alternative in `<noscript>`. | PASS |
| IV. Accessibility | AA contrast, 3px blueprint focus, 44px targets, no colour-only state, reduced motion | Tokens already encode `--focus-ring`, `--target-min: 44px`, and a global `prefers-reduced-motion` override. Every chip carries text. Ink-on-orange only. | PASS |
| V. Honest server behaviour | Strict schemas, error table first, success only after delivery, layered guards, bounded logging | Error contract table written before the handler in [contracts/actions.md](./contracts/actions.md). Success returned only after `send()` resolves to `EmailSendResult`. | PASS |
| V. Verification | Unit coverage for schemas/guards/payload/redaction; E2E for observable behaviour | Split defined in [quickstart.md](./quickstart.md). | PASS |
| Platform constraints | Pinned stack per the constitution's Technology section | **One deviation** — see Complexity Tracking. The constitution's `@astrojs/react` 5.x claim is factually wrong; 4.4.2 is the Astro 5 line. | DEVIATION |

### Island justification (Principle I)

| Island | Directive | Behaviour HTML cannot express |
|---|---|---|
| `HeaderNav` | `client:load` | Mobile disclosure state, Escape-to-dismiss, focus containment while open. `client:load` because a keyboard user must never reach a dead control. All destinations remain in the DOM; JS only upgrades the interaction. |
| `StartForm` | `client:load` | Action invocation, per-field error mapping, in-flight and failure states, multi-select chip state. Above the fold on `/start`. |
| `EvidenceRail` | `client:visible` | The one scroll-triggered animation: fragments begin misaligned and resolve into an aligned register (`mockups/README.md:82`, `:132`). Below the fold on Home only; hydrating it eagerly on every page would be waste. |

The static fallback for `EvidenceRail` renders in the aligned state, so the animation is purely
additive and `prefers-reduced-motion` collapses it to the same output.

### Post-design re-evaluation (after Phase 1)

Re-checked once the contracts existed. No gate changed status, and the design work closed three
risks that the pre-research check could not see:

- **Principle I held under scrutiny.** Research proved the build output is forced to `server`
  (hybrid), not static (research.md D-02). The *guarantee* the constitution cares about — every page
  prerendered, one on-demand route — still holds, because pages prerender individually and the only
  on-demand route is the injected `/_actions/[...path]`. The rule needs no amendment; only
  `ARCHITECTURE.md`'s explanation of it was wrong.
- **Principle III got sharper.** The gate now has eight enumerated rules with a fixture-per-rule test
  ([contracts/content-check.md](./contracts/content-check.md)), including two the constitution
  implies but does not state: the radius ceiling and the token allow-list, neither of which the
  design system's own lint config encodes.
- **Principle V got its table.** The error contract exists in
  [contracts/actions.md](./contracts/actions.md) before any handler, as required, and names the
  fail-closed asymmetry (absent limiter allows, throwing limiter blocks) that would otherwise have
  been decided at the keyboard.

One deviation remains open and is a prerequisite for implementation, not a note: the
`@astrojs/react` pin contradicts a factual claim in the constitution's Technology section and needs a
PATCH amendment (see Complexity Tracking).

## Project Structure

### Documentation (this feature)

```text
specs/001-build-marketing-website/
├── plan.md              # This file (/speckit.plan command output)
├── spec.md              # Feature specification
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
│   ├── actions.md       # Intake action: schema, error table, guards, notification
│   ├── routes.md        # 9 routes, metadata, navigation model, CTA map
│   ├── design-tokens.md # Vendored token contract and adjudicated scale conflicts
│   └── content-check.md # Release gate rules
├── checklists/
│   └── requirements.md  # Spec quality checklist
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── actions/
│   ├── index.ts             # the one action, error mapping
│   ├── schemas.ts           # strict zod input contract
│   ├── guards.ts            # honeypot, elapsed-time floor, hashed-key rate limit
│   └── notify.ts            # notification builders, send, bounded logging
├── components/
│   ├── layout/              # SiteHeader.astro, SiteFooter.astro, Band.astro, Container.astro
│   ├── ui/                  # Button.astro, ProofLabel.astro, Folio.astro, ClaimStamp.astro
│   ├── patterns/            # RegisterRow, StatusChip, AnnotatedComparison, WorkOrder,
│   │                        # ControlRegister, FitField, CTABand, Declaration, PullQuote
│   ├── sections/            # one .astro per page section (Home §01-§12, and per page)
│   └── islands/             # HeaderNav.tsx, StartForm.tsx, EvidenceRail.tsx
├── content/
│   ├── navigation.ts        # single source for header, footer, mobile panel
│   ├── routes.ts            # route table: path, title, description, cta pair, published flag
│   ├── placeholders.ts      # unresolved-fact registry
│   └── pages/               # per-page content data (register rows, chips, catalogue entries)
├── layouts/
│   └── BaseLayout.astro     # head, header, footer, band frame, heading-colour rules
├── pages/                   # index.astro, services, catalogue, method, trust, msps,
│                            # about, notes, start, 404
├── styles/
│   ├── tokens.css           # entry point; imports the 7 token files
│   ├── tokens/              # colors, fonts (rewritten), typography, spacing, surfaces, motion, texture
│   └── site.css             # band frame, heading colour per ground, grid min-width fixes
├── types/
│   └── proof.ts             # ProofStatus union lifted from the DS contract
└── env.d.ts                 # EMAIL and FORM_LIMITER binding declarations

public/
├── .assetsignore            # _worker.js, _routes.json
├── fonts/                   # self-hosted woff2 + OFL.txt
├── og/                      # social preview image
└── robots.txt

scripts/
└── check-content.ts         # release gate

tests/
├── unit/                    # schemas, guards, notification payload, log redaction,
│                            # navigation/route consistency, content-check rules
└── e2e/                     # routes+metadata, keyboard, focus, responsive overflow,
                             # form success/failure, no-JS, accessibility structure
```

**Structure Decision**: Single Astro project at the repository root. There is no frontend/backend
split to make: the server code is four files in `src/actions/` that compile into the same Worker as
the site. `design-system/` and `mockups/` stay at the root as read-only authorities and are never
imported from `src/` (Principle II). Section components are split per page rather than per pattern
because the prototypes' section grids differ only by `minmax` ratio — the ratio is data, so `Band` +
`Container` + `Folio` carry the frame and each section owns only its content and grid values.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| `@astrojs/react@4.4.2`, not the `5.x` the constitution's Technology section names | Verified from the registry: `@astrojs/react` declares **no** `astro` peer at any version, so the mismatch never raises `ERESOLVE`. The real coupling is the bundled Vite major — `4.4.2` ships `vite: ^6.4.1`, matching `astro@5.18.2`; `5.0.0` moved to Vite 7 for Astro 6 and requires Node ≥22.12.0; `6.x` is Vite 8 for Astro 7. Installing `5.x` here silently duplicates a Vite major in the tree. | Obeying the constitution literally produces a broken dependency tree with no install-time error. The constitution states a wrong fact, not a wrong intent — its intent (pin the integration to the Astro major) is exactly what `4.4.2` satisfies. **Requires a PATCH amendment to the constitution's Technology And Platform Constraints section before implementation begins**; `/speckit.constitution` should record `@astrojs/react` 4.x as the Astro 5 line and note that peer-range checking does not work for this package. |
| Rate-limit key derived from a hashed client IP | The constitution mandates a hashed-IP key with fail-closed behaviour (Principle V). | Cloudflare documents guidance *against* IP-derived keys (shared IPs, mobile networks, privacy proxies) and notes limits are per-location, not global. Retained as a deliberate privacy trade — no account exists to key on, and the alternative (a cookie or fingerprint) is worse for privacy and trivially bypassed. Recorded as a knowing deviation in research.md D-09, not silently adopted. |
