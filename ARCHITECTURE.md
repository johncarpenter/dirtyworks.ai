# Architecture

How the Dirtyworks.ai marketing website is built, why each piece was chosen, and what you need to
know to build another one like it. Written to be replicable: exact versions, real gotchas, working
configuration. Every version and API below was verified against a primary source, and the numbers
are measured from this repository rather than carried over from another project.

Governance rules this architecture serves: [`.specify/memory/constitution.md`](.specify/memory/constitution.md).
Feature-level detail: [`specs/001-build-marketing-website/`](specs/001-build-marketing-website/).
Outstanding non-engineering work: [`specs/001-build-marketing-website/launch-blockers.md`](specs/001-build-marketing-website/launch-blockers.md).

## 1. The shape of the problem

A nine-page marketing site with one transactional capability: turning a form submission into an
email. Everything else is content.

That asymmetry drives every decision below. Content should cost nothing to serve and never break;
the one dynamic path should be small, observable, and honest about failure. Anything that makes the
content pipeline pay for the dynamic path — a server-rendered site, a client-side router, a
database — is the wrong trade at this size.

```mermaid
graph TD
  V[Visitor] -->|GET /any-page| A[Cloudflare static assets]
  V -->|POST /_actions/logOperatingGap| W[Worker: Astro Actions]
  W --> G[Guards: decoy, timing floor, hashed-IP rate limit]
  G --> E[Cloudflare Email Service]
  E --> I[hello@dirtyworks.ai]
  A -.->|hydrates 3 islands| V
```

## 2. Stack

| Layer | Choice | Version | Why this one |
|---|---|---|---|
| Framework | Astro | 5.18.2 | Ships zero JavaScript by default and makes per-component hydration explicit. A marketing site is mostly static documents; Astro treats that as the default case rather than an optimisation. |
| UI islands | React + `@astrojs/react` | 19.2.8 / **4.4.2** | Only three components are interactive. React for team familiarity and because the product app that follows will use it. |
| Hosting / runtime | Cloudflare Workers + `@astrojs/cloudflare` | 12.6.13 | Static assets served from the edge with one Worker for the action endpoint. No container, no origin server. |
| Email | Cloudflare Email Service (`send_email` binding) | platform | No third-party API key, no vendor account, no egress dependency. Transactional only — see §8. |
| Validation | `astro/zod` via `astro:schema` | bundled | Already in the Astro dependency tree; Actions accept a zod schema directly as their input contract. |
| Language | TypeScript (strict) | 5.9.3 | `astro/tsconfigs/strict` plus `verbatimModuleSyntax`. Pinned to the last 5.x deliberately — TS 7 exists. |
| Unit tests | Vitest | 4.1.11 | Astro ships `getViteConfig()`, so tests share the app's resolution and aliases. |
| E2E tests | Playwright | 1.62.1 | The only way to verify keyboard operation, focus management, responsive layout, contrast, and no-JavaScript behaviour. |
| Tooling | Wrangler | 4.126.0 | Local Worker runtime, bindings simulation, deploys. |

Node 20+ for the build. No CSS framework, no state library, no client-side router, no analytics, no
third-party script of any kind, and no component library beyond the vendored design system.

### The version trap that actually bites

Two different traps, and only one of them announces itself.

**`@astrojs/cloudflare` 14.x requires Astro 7.** Installing it on Astro 5 produces an `ERESOLVE`
failure that reads like a broken registry (`peer astro@"^7.2.0" from @astrojs/cloudflare@14.2.5`).
Pin `12.6.13`. Loud, and therefore harmless.

**`@astrojs/react` declares no `astro` peer dependency at any version.** There is no `ERESOLVE` to
catch a mismatch — it fails later and stranger. The real coupling is the bundled Vite major:

| `@astrojs/react` | bundles | Astro line |
|---|---|---|
| **4.4.2** | `vite ^6.4.1` | **Astro 5** |
| 5.x | `vite ^7.3.2` (Node ≥22.12.0) | Astro 6 |
| 6.x | `vite ^8.0.13` | Astro 7 |

Install `5.x` here and you silently get two Vite majors in the tree. Verify after installing:

```bash
npm ls vite   # expect one version, deduped everywhere
```

## 3. Rendering model

`output: 'static'` **with** an adapter. Every page prerenders at build time; Astro injects the
Actions endpoint as the one on-demand route.

```js
// astro.config.mjs
export default defineConfig({
  site: 'https://dirtyworks.ai',
  output: 'static',
  adapter: cloudflare({
    imageService: 'compile',                       // sharp is unavailable in Workers
    platformProxy: { enabled: !process.env.VITEST },
  }),
  session: { driver: 'memory' },                   // the adapter otherwise wants a KV binding
  integrations: [react()],
  trailingSlash: 'never',
  build: { format: 'file' },
});
```

Why `static` rather than `server` with `prerender = true` per page: the default should be the safe
case. A new page is prerendered automatically, and opting into server rendering is a deliberate
`export const prerender = false`. Invert that and a page becomes dynamic by accident.

**What `output: 'static'` does *not* mean here.** With this adapter the build is a *hybrid* build.
`@astrojs/cloudflare` declares `adapterFeatures.buildOutput: 'server'`, and Astro then forces
`settings.buildOutput = 'server'` unconditionally (`astro@5.18.2` `dist/integrations/hooks.js:284`).
Pages still prerender individually, so the guarantee holds — but the adapter's
`staticOutput: 'unsupported'` is a red herring that never fires, and no warning is emitted either
way. Worth knowing before you spend an afternoon on it.

**Result:** 9 HTML files, 20–70 KB each. Zero Worker invocations for content.

## 4. Islands: what gets JavaScript, and what does not

Three components, each with behaviour HTML cannot express:

| Island | Directive | Why hydrated | Shipped |
|---|---|---|---|
| `HeaderNav` | `client:load` | Mobile disclosure, Escape to dismiss, focus containment. `client:load` because a keyboard user must never reach a dead control. | 1.9 KB |
| `StartForm` | `client:load` | Action call, per-field errors, in-flight state, failure states, multi-select chips. Above the fold on `/start`. | 15 KB |
| `EvidenceRail` | `client:visible` | The one scroll-triggered animation. Below the fold on Home only. | 0.6 KB |

Everything else — 60 `.astro` components — ships no JavaScript.

**The rule that makes this work:** an island's server-rendered output must be useful before
hydration. `HeaderNav` keeps every destination in the DOM at all times and toggles a `data-open`
attribute; `EvidenceRail` renders in its *finished, aligned* state so the animation is purely
additive.

**The subtlety that nearly broke it.** Collapsible chrome cannot be the default, because a visitor
without JavaScript can never expand it. So the panel is visible until an inline script proves
scripting exists:

```html
<script is:inline>document.documentElement.classList.add('js');</script>
```

```css
.js .header-panel[data-open='false'] { display: none; }
```

Without JavaScript the mobile menu is simply part of the page. With it, the panel collapses. The
same pattern gives `/catalogue` its narrow-viewport disclosure.

Shipped client JS: ~187 KB React runtime plus 0.6–15 KB per island. If that runtime matters more
than team familiarity, Preact via `@astrojs/preact` is a drop-in for components this simple.

## 5. Server code: Astro Actions

All server logic is four files in `src/actions/`, compiled into the Worker.

```text
src/actions/
├── schemas.ts   strict zod input contract, field bounds, closed `needs` union
├── guards.ts    decoy, submit-timing floor, hashed-key rate limiting
├── notify.ts    notification builders, delivery, privacy-bounded logging
└── index.ts     the action and the error mapping
```

Actions were chosen over a hand-written `src/pages/api/*.ts` endpoint because they give typed input
parsing, a `{ data, error }` result the island can branch on, and `isInputError` for field-level
mapping — without writing a request parser.

**Client-side invocation, not form POST.** Calling the action from the island keeps every page
prerendered. A zero-JS `<form action={actions.x}>` works in Astro, but reading the result requires
`Astro.getActionResult()` in the *hosting page's* frontmatter, which would drag `/start` out of the
static pipeline for one form. The no-JavaScript requirement is met instead by rendering the form's
purpose, its fields, and a `mailto:` alternative in a `<noscript>` block.

**Binding access uses `context.locals.runtime.env`, not `import { env } from 'cloudflare:workers'.**
The module-scope import is what the adapter itself uses, and it works in production — but Vite
cannot resolve it under `astro dev`, so every dev request fails with `ActionsCantBeLoaded`. The
`locals` route is populated by `platformProxy` in dev and by the Worker in production, and it is
safe here precisely because the actions route is on-demand; the usual caveat about `locals.runtime`
being undefined applies to *prerendered* pages.

### Error contract

One table governs the action and the island. Getting this explicit before writing the handler is
what stops a form from ever showing a success message it has not earned.

| Condition | Code | Island state | Retryable | Visitor sees |
|---|---|---|---|---|
| Schema violation | `BAD_REQUEST` | `invalid` | No | Message beside each invalid field, focus on the first |
| Decoy filled / too fast | `BAD_REQUEST` | `refused` | No | Generic refusal + `mailto:` |
| Rate limit exceeded | `TOO_MANY_REQUESTS` | `rateLimited` | Yes | Try again shortly + `mailto:`, values kept |
| Delivery rejected or threw | `INTERNAL_SERVER_ERROR` | `deliveryFailed` | Yes | Retry + `mailto:`, values kept |

Success is returned only after `env.EMAIL.send()` resolves to an `EmailSendResult`. Every
non-accepting outcome — throw, rejection, missing binding — becomes `deliveryFailed`.

## 6. Abuse handling without a third-party widget

Four layers, no CAPTCHA, no tracker:

1. **Strict schemas.** `.strict()` rejects unknown keys; every field has a length bound; `needs` is
   a closed ten-value union.
2. **Decoy field.** Visually hidden inside `aria-hidden="true"` with `tabIndex={-1}`. Non-empty
   means bot. Zero false positives for real users.
3. **Submit timing.** `MIN_ELAPSED_MS = 1000`, measured from island mount.
4. **Rate limiting.** Workers rate-limit binding keyed by a SHA-256 hash of `CF-Connecting-IP`, so
   no raw address is retained. A missing binding allows the request (local dev); a binding that
   throws blocks it (fails closed).

Turnstile was rejected: it adds a third-party script and an accessibility surface to a site that
otherwise loads almost no JavaScript. Add it when observed abuse justifies the cost.

**Two things the platform docs will tell you, and one they will not.** `simple.period` must be
exactly `10` or `60` — no other value is accepted — and `namespace_id` must be a stringified
integer. What the docs *also* say, and which is worth heeding, is that IP-derived keys are
inaccurate: shared NAT, mobile networks and privacy proxies all collapse into one bucket, and limits
apply per Cloudflare location rather than globally. This project keeps the hashed IP because there
is no account to key on and a cookie would be worse, but treats the limiter as a coarse damper: the
decoy and the timing floor are the real screens. The limit is 10/60s, not 5, precisely because one
office NAT — or one CI runner running two Playwright projects — legitimately shares a bucket.

**Note on timing guards and tests:** a Playwright test fills and submits in ~50 ms, so it trips the
timing guard and looks like a bot. Either pace the test past the floor or assert the rejection
deliberately. This suite does both.

## 7. Design system: vendor, don't reference

`design-system/` and `mockups/` are read-only references. Nothing in `src/` imports from them
(enforced by `tests/unit/discipline.test.ts`). Tokens were copied into `src/`:

```text
src/styles/tokens.css        ← design-system/styles.css (import order preserved)
src/styles/tokens/*.css      ← the six token files, verbatim
src/styles/tokens/fonts.css  ← rewritten: self-hosted @font-face, no CDN
src/styles/site.css          ← page frame, band grounds, the traps below
src/styles/chrome.css        ← header, mobile panel, footer
```

The `.jsx` components were **not** vendored. They publish to a UMD global
(`window.DirtyworksAiDesignSystem_9135ac`), use inline style objects, and — fatally — wire
navigation as `href="#"` plus `preventDefault` plus an `onNavigate` callback, which is exactly the
dead-control pattern the accessibility rules forbid. They were rebuilt as `.astro` against their
`.d.ts` prop contracts, which is also what makes them substitutable later.

### Four CSS traps worth knowing

**Element selectors beat inheritance.** The token layer styles `h1..h6` directly, so setting
`color: #fff` on a dark `<section>` does **not** make its heading white — the heading stays charcoal
and disappears. Solve it once with explicit rules for every dark and brand band, never per instance.

**Grid children default to `min-width: auto`.** A wide child grows its track past the viewport, so
the page scrolls horizontally at 320 px:

```css
.split > *, .cols-2 > *, .cols-3 > *, .page-grid > *, .grid > * { min-width: 0; }
```

**Brand colour is not text colour.** Signal orange on bone is 2.65:1 and fails AA at *every* size,
including display type; `--steel-2` on bone is 2.6–3.1:1. This is not a detail you can defer, because
it is spread across every page once the design is built. The resolution:

| Where | Use |
|---|---|
| Small text on light grounds | `--ink`, with orange kept as a rule or marker bar |
| Display text on light grounds | `--orange-press` (3.3–3.9:1, clears the large-text threshold) |
| Muted mono on light grounds | `--steel` (4.5–5.4:1); `--steel-2` is a *dark-field* tone |
| Muted mono on ink | `--steel-2` (5.1–5.7:1) |
| Blueprint as text on ink | `--blueprint-light` (6.3–7.1:1); plain blueprint is 3.1–3.5:1 |
| Text on an orange fill | `--ink` only, never bone |

A scoped custom-property override in `site.css` does the muted case in one place:

```css
.band--bone, .band--bone-2, .site-header { --steel-2: var(--steel); }
```

**`<Band class="x">` does not give you `.x h1`.** Astro scopes styles by adding a `data-astro-cid`
attribute for the component that *renders* the element. A class passed as a prop lands on an element
carrying **Band's** id, so a page-scoped `.x h1 { font-size: … }` rule matches nothing, silently.
Two page heroes shipped at 34 px instead of ~100 px before a test caught it. Style the child by its
own class, and keep a test that asserts display scale:

```ts
expect(heroFontSize).toBeGreaterThanOrEqual(60);
```

## 8. Email

The `send_email` binding sends transactional mail from a Worker with no API key:

```jsonc
// wrangler.jsonc
"send_email": [{ "name": "EMAIL" }]
```

Onboarding the sending domain is a **dashboard** flow, not a Wrangler command: Compute → Email
Service → Email Sending → Onboard Domain. (There is no `wrangler email` command group. If a guide
tells you otherwise, it predates the product.) Requirements: the zone must use Cloudflare DNS, and
the account must be on Workers Paid — Email Sending is Beta. Cloudflare adds MX records on
`cf-bounce.<domain>` plus SPF, DKIM and `_dmarc` TXT records.

The runtime API is `send()` with a structured message; it resolves to `{ messageId }` and throws
`Error`s carrying a `.code` (`E_RATE_LIMIT_EXCEEDED`, `E_DAILY_LIMIT_EXCEEDED`, …). Capture the
`messageId`: it is the only correlation handle into Email Sending metrics, and sends made through
this binding show up as **dropped** in the Email Routing summary even when they were delivered.

`wrangler dev` simulates delivery, writing the message to `.wrangler/tmp/email/…`, which is what
lets the E2E suite exercise the real accepted path without sending mail. **Do not set
`"remote": true`** on the binding: the docs recommend remote bindings, and in that mode a local run
— including CI — sends real email to real people.

**Cloudflare Email Service is transactional, not bulk.** Both notifications populate `text` and
`html`, set `replyTo` to the submitter, and use a subject that identifies the form.

**Logging is privacy-bounded by design:** purpose, outcome, duration, and `messageId` only. No
names, no addresses, no message bodies, no raw IPs. A unit test asserts the exact log shape and
greps it for leaked values.

## 9. Content safety as a build gate

Marketing copy carries claims, and claims can be wrong in ways that cost trust. Three mechanisms:

1. **Placeholder registry** (`src/content/placeholders.ts`). Unresolved facts render as visible
   markers, never as invented text.
2. **Claim-artefact registry** (`src/content/claim-artefacts.ts`). Each illustrative artefact
   declares the stamp it must render, so the gate checks the *output*, not the intent.
3. **`scripts/check-content.ts`** — eight rules: unresolved markers, prohibited vocabulary, banned
   CTA labels, missing claim stamps, fabricated proof (prices, comparatives, certifications), emoji,
   casing (including all-caps authored headings, since CSS does the uppercasing), and token/surface
   discipline (unknown `var(--…)`, radius > 3px, blurred shadows, gradients, external `@import`).

```bash
npm run check:content   # merge gate
npm run check:launch    # same rules; outstanding approvals become failures
```

The two modes matter. A gate that is permanently red teaches people to ignore it, so an honest page
carrying a visible `LEGAL REVIEW` stamp passes day to day and fails only at launch. An `OPEN GAP`
never passes: that one means content would have to be invented.

Rule precision matters too. Matching `OPEN GAP` as a substring flagged the legitimate copy
"Evaluated failures / open gaps"; the rule now uses word boundaries plus the stamp attribute.

## 10. Testing split

| Layer | Tool | Scope |
|---|---|---|
| Unit | Vitest via `getViteConfig()` | Input schema, abuse guards, notification payload and HTML escaping, log redaction, route/navigation consistency, token and surface discipline, and one fixture per release-gate rule |
| E2E | Playwright, two projects (1440×900, 320×720) | Routes and metadata, header action variants, twelve Home sections, claim stamps, the intake's success and every failure state, keyboard operation, focus rings, responsive overflow at six widths, no-JavaScript rendering, heading outline, AA contrast, display fidelity |

Current: **52 unit tests, 252 declared E2E cases** (242 executing, 10 project-scoped skips — the
display-scale suite does not run in the mobile project).

Configuration details that cost time:

- **The Cloudflare adapter does not support `astro preview`** (no `previewEntrypoint`). Playwright's
  `webServer` must run `wrangler dev` against the built output.
- **`platformProxy` spawns a `workerd` process** that keeps Vitest from exiting. Disable it under
  test: `platformProxy: { enabled: !process.env.VITEST }`.
- **`getViteConfig()` needs vitest's type augmentation** for `test` to type-check:
  `/// <reference types="vitest/config" />`.
- **Tests share the rate-limit bucket.** Two projects × three successful submissions is six posts
  from one address inside a minute.

## 11. Layout

```text
src/
├── actions/          server code — the only thing that runs per request
├── components/
│   ├── layout/       Band, Container, SiteHeader, SiteFooter
│   ├── ui/           Button, ProofLabel, Folio, ClaimStamp
│   ├── patterns/     the recurring composites: register row, control register, work order,
│   │                 annotated comparison, fit field, CTA band, declaration, pull quote
│   ├── sections/     one .astro per page section, zero client JS
│   └── islands/      the three hydrated React components
├── content/          routes, navigation, placeholders, claim artefacts, per-page copy
├── layouts/          BaseLayout (head, chrome, skip link)
├── pages/            one file per route, plus 404
├── styles/           vendored tokens + site frame + chrome + intake
└── types/            ProofStatus, ClaimStamp, bindings

public/               fonts (self-hosted, with OFL texts), og image, robots.txt, .assetsignore
scripts/              check-content.ts release gate
tests/unit/           Vitest
tests/e2e/            Playwright
design-system/        visual authority — never imported from src/
mockups/              content authority — never imported from src/
specs/                feature spec, plan, contracts, tasks, launch blockers
```

Routing and navigation live in `src/content/routes.ts` as data. The header, footer, mobile panel,
CTA targets and publication state all derive from it, and a unit test asserts every route resolves
to a page file and every published route appears in navigation — so a renamed page cannot silently
orphan a link. The same table gates `/about`: `published: false` removes it from the build, from
navigation, and from every CTA.

## 12. Replicating this

```bash
mkdir my-site && cd my-site && npm init -y
npm pkg set type=module private=true

# check the adapter's peer range AND the integration's bundled vite major
npm install astro@5.18.2 @astrojs/cloudflare@12.6.13 @astrojs/react@4.4.2 \
            react@19.2.8 react-dom@19.2.8
npm install -D typescript@5.9.3 @astrojs/check @types/react @types/react-dom \
               vitest@4.1.11 @playwright/test@1.62.1 wrangler@4.126.0 \
               @cloudflare/workers-types tsx
npm install-scripts approve esbuild workerd sharp   # npm 11 gates install scripts
npx playwright install chromium
```

Then, in order — the order is the point, because each step removes a class of rework:

1. `astro.config.mjs` — `output: 'static'`, the adapter, `imageService: 'compile'`,
   `session: { driver: 'memory' }`.
2. `wrangler.jsonc` — `main: "./dist/_worker.js/index.js"`, an `assets` block pointing at `./dist`,
   a pinned `compatibility_date`, your bindings, and a `name` matching the Worker in Cloudflare. Use
   the first-class `ratelimits` field, not `unsafe.bindings`.
3. `tsconfig.json` extending `astro/tsconfigs/strict`, with `@cloudflare/workers-types` in `types`.
4. `src/env.d.ts` declaring bindings on `App.Locals.runtime.env`. Keep binding types in a module —
   reusing `@cloudflare/workers-types`' global `EmailAddress` collides, because it requires `name`.
5. `public/.assetsignore` containing `_worker.js` and `_routes.json` — see below.
6. Vendor design tokens into `src/styles/`, then **solve the heading-colour, grid-overflow and
   contrast problems once**, before building a single page (§7).
7. Model routing and navigation as data before writing any header markup.
8. Build pages as `.astro` sections; add an island only when a control needs behaviour, and make its
   static output useful first.
9. Write the action error contract as a table before writing the handler. It is the specification
   both the server and the form state machine implement.
10. `vitest.config.ts` with `getViteConfig()`; `playwright.config.ts` with `webServer` running
    `wrangler dev`.
11. Wire the content gate into CI *before* deploy. `build → check:content → e2e → deploy --dry-run`.

### The `_worker.js` upload error

Serving assets straight out of `dist/` means the adapter's server bundle sits inside the asset
directory, and Wrangler refuses to deploy it. It is a real exposure check, not noise. Emit
`dist/.assetsignore` with `_worker.js` and `_routes.json` (the adapter does still emit the latter,
a Pages leftover the Workers runtime ignores). Astro copies `public/` dotfiles into `dist/`, so
`public/.assetsignore` is the simplest place to author it. Confirm with a dry run plus a live
request:

```bash
npx wrangler deploy --dry-run                                   # no _worker.js error
curl -o /dev/null -w '%{http_code}\n' \
  http://localhost:8787/_worker.js/index.js                     # 404
```

### Workers Builds

Build command `npm run build`, deploy command `npx wrangler deploy`, build output directory empty.
A combined `build && deploy` script as the build command makes CI build twice. If the config `name`
does not match the Worker, Workers Builds overrides it and opens a reconciliation PR.

## 13. Where this stops scaling

Honest limits of the design, so you know when to change it:

- **Content volume.** Hand-authored `.astro` sections with typed copy modules are right for nine
  pages. Past roughly twenty, move to Astro content collections with typed frontmatter.
- **Submission volume.** Email-as-a-database works at single-digit submissions per day. Once anyone
  wants to search, segment, or report on submissions, add D1 or a CRM and treat the email as a
  notification.
- **Interactivity.** Three islands is comfortable. If islands start needing to share state, that is
  the signal you have an application, not a marketing site, and it belongs behind its own route with
  its own architecture.
- **Client bundle.** The React runtime dominates the payload at ~187 KB. If it becomes the
  constraint before the app arrives, switch these three components to Preact.
- **Fonts.** ~464 KB unsubsetted, and the largest single asset class on the site. Subset to latin
  before optimising anything else.
