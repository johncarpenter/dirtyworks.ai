# Phase 0 Research: Dirtyworks.ai Public Marketing Website

**Date**: 2026-08-25 | **Plan**: [plan.md](./plan.md)

Every version number and API name below was verified against a primary source (npm registry
manifests, package source, official Cloudflare and Astro documentation) or against the in-repo
authority files. Items that could not be verified are listed under §Unverified rather than inferred.

`ARCHITECTURE.md` was treated as a hypothesis, not a source. It documents a different site
(Jotbrain, five pages) and three of its claims are wrong in ways that would have failed the build.

---

## D-01: Dependency pins

**Decision**

```bash
npm install astro@5.18.2 @astrojs/cloudflare@12.6.13 @astrojs/react@4.4.2 \
            react@19.2.8 react-dom@19.2.8
npm install -D typescript@5.9.3 @astrojs/check @types/react @types/react-dom \
               vitest@4.1.11 @playwright/test@1.62.1 wrangler@4.126.0 \
               @cloudflare/workers-types@5.20260826.1
npx playwright install chromium
```

**Rationale**

| Package | Latest | Astro 5 line | Declared `peerDependencies.astro` |
|---|---|---|---|
| `astro` | 7.2.7 | **5.18.2** | — |
| `@astrojs/cloudflare` | 14.2.5 | **12.6.13** | 12.6.x `^5.7.0`; 13.x `^6.3.0`; 14.2.1+ `^7.2.0` |
| `@astrojs/react` | 6.0.4 | **4.4.2** | **none declared, at any version** |
| `react` / `react-dom` | 19.2.8 | 19.2.8 | integration peer `^17 \|\| ^18 \|\| ^19` |
| `typescript` | 7.0.2 | **5.9.3** (last 5.x) | — |
| `vitest` | 4.1.11 | 4.1.11 (peer `vite ^6 \|\| ^7 \|\| ^8`; Astro 5 ships `vite ^6.4.1`) | — |

`astro@5.18.2` declares `engines.node: "18.20.8 || ^20.3.0 || >=22.0.0"`; `vitest@4.1.11` declares
`^20 || ^22 || >=24`. Node 20 satisfies both.

**Alternatives considered**: `@astrojs/react@^5` as `ARCHITECTURE.md` instructs — rejected, it is the
Astro 6 line (`vite: ^7.3.2`, Node ≥22.12.0) and pulls a second Vite major into the tree with **no
install-time error**, because the package declares no `astro` peer. Peer-range checking works for
`@astrojs/cloudflare` only. This is the single most expensive error the research prevented.

---

## D-02: Rendering model — `output: 'static'` is honoured in effect, not in mechanism

**Decision** Keep `output: 'static'` with the adapter. Invoke actions from the client only. Never
add `export const prerender = false` to a page.

**Rationale** With `@astrojs/cloudflare@12.6.13`, `settings.buildOutput` is forced to `"server"`
unconditionally (`astro@5.18.2` `dist/integrations/hooks.js:284-285`, because the adapter declares
`adapterFeatures.buildOutput: "server"`). The build is therefore a *hybrid* build — the adapter
declares `hybridOutput: "stable"`, and the `staticOutput: "unsupported"` declaration never fires
because that validator only runs when `buildOutput === "static"`. Consequences that matter:

- Pages still prerender individually, so the guarantee in the spec holds — but not for the reason
  `ARCHITECTURE.md` gives, and no warning is emitted either way.
- `ActionsWithoutServerOutputError` can never trigger here, so Actions are safe.
- Output lands in `dist/` with the server bundle at `dist/_worker.js/`.
- Any page containing the literal source `export const prerender = false` flips build output. The
  detector is a regex (`dist/core/routing/manifest/prerender.js`), so a computed value is not seen.

**Alternatives considered**: `output: 'server'` with per-page `prerender = true` — rejected per the
constitution: it inverts the safe default, making a new page dynamic by accident.

---

## D-03: Actions surface and error contract

**Decision** One action, invoked from the `StartForm` island as a client-side call. Map every
outcome through the table in [contracts/actions.md](./contracts/actions.md).

**Rationale** Verified in `astro@5.18.2` source:

- Injected route pattern is `/_actions/[...path]` (`dist/actions/consts.js`), registered with
  `prerender: false, origin: "internal"`.
- Result shape is `{ data, error }`; `isInputError` is exported from `astro:actions` and matches
  `error.type === "AstroActionInputError"` with an `issues` array; input errors carry `fields` and
  are constructed with `code: "BAD_REQUEST"` (`dist/actions/runtime/shared.js`).
- Error code spellings confirmed verbatim in `ACTION_ERROR_CODES` / `codeToStatusMap`:
  `BAD_REQUEST` → 400, `TOO_MANY_REQUESTS` → 429, `INTERNAL_SERVER_ERROR` → 500. `ActionError`
  defaults to `INTERNAL_SERVER_ERROR`.

Client-side invocation is a plain `POST` to `/_actions/<name>` and does not affect the calling page's
prerender status. What *would* force a page on-demand is reading the result server-side via
`Astro.getActionResult()` in frontmatter — which is why the zero-JS path is a `<noscript>` block with
a `mailto:` alternative, not a `<form action={actions.x}>`.

**Alternatives considered**: a hand-written `src/pages/api/*.ts` endpoint — rejected, it means
writing a request parser and a field-error protocol that Actions already provide.

---

## D-04: Binding access and adapter options

**Decision** `import { env } from 'cloudflare:workers'` at module scope in `src/actions/`.
`imageService: 'compile'`. `platformProxy: { enabled: !process.env.VITEST }`.

**Rationale** The adapter itself does exactly this import (`@astrojs/cloudflare@12.6.13`
`dist/utils/handler.js:1`), so it resolves inside the adapter's own bundle. The alternative,
`Astro.locals.runtime.env`, is `undefined` in prerendered pages and in the build's prerender pass,
and requires wiring the exported `Runtime` type into `App.Locals`; action handlers receive only
`context.locals`, so the direct import is both simpler and correct.

`imageService: 'compile'` runs sharp at **build time** for prerendered routes and uses a passthrough
service at runtime; sharp is unavailable in Workers because it is a native libvips addon and
`workerd` has no Node native-module loader. Setting the option also suppresses the sharp warning.

`astro preview` is unsupported — the adapter supplies `serverEntrypoint` but no `previewEntrypoint`.
Use `wrangler dev` against `dist/`.

**Caution for implementers**: the live Astro docs page for this integration now documents **v14.2.5**,
whose option set differs materially (it delegates to `@cloudflare/vite-plugin` and no longer lists
`platformProxy`). Do not read it as authority for the 12.x pin.

---

## D-05: `wrangler.jsonc` contract

**Decision**

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "dirtyworks-ai",
  "main": "./dist/_worker.js/index.js",
  "compatibility_date": "2026-08-25",
  "compatibility_flags": ["nodejs_compat"],
  "assets": { "directory": "./dist", "binding": "ASSETS" },
  "send_email": [{ "name": "EMAIL" }],
  "ratelimits": [
    { "name": "FORM_LIMITER", "namespace_id": "1001", "simple": { "limit": 5, "period": 60 } }
  ]
}
```

**Rationale** `name`, `main`, `compatibility_date` are the required trio. Do **not** set
`run_worker_first`: the default serves a matching static asset first (correct for nine prerendered
pages) and falls through to the Worker for `/_actions/*`.

Rate-limit constraints verified against the runtime-apis binding reference, and they are stricter
than `ARCHITECTURE.md` records: `namespace_id` must be a **stringified positive integer**;
`simple` is the only supported type; **`simple.period` must be either `10` or `60`** — no other value
is accepted; requires Wrangler ≥ 4.36.0; bindings sharing a `namespace_id` share counters across
every Worker on the account. Runtime API is `const { success } = await env.FORM_LIMITER.limit({ key })`.

`public/.assetsignore` must contain `_worker.js` and `_routes.json`. Adapter 12.6.13 does emit
`_routes.json` (`dist/utils/generate-routes-json.js`) — a Pages artifact the Workers assets runtime
ignores. Astro copies `public/` dotfiles into `dist/`, so authoring it there is sufficient.

**Alternatives considered**: `unsafe.bindings` for the rate limiter — rejected; `ratelimits` is
first-class and the `unsafe` key is no longer documented in the wrangler configuration reference.

---

## D-06: Email

**Decision** `send_email` binding named `EMAIL`, structured `send()`, `remote` deliberately unset.

**Rationale** Verified API surface:

```ts
interface SendEmail { send(message: EmailMessage | EmailMessageBuilder): Promise<EmailSendResult>; }
interface EmailSendResult { messageId: string; }
// builder: to | from | subject | html? | text? | cc? | bcc? | replyTo? | attachments? | headers?
```

`replyTo` is camelCase and accepts a string or `{ email, name }`. Errors are thrown `Error`s carrying
a `.code`: `E_SENDER_NOT_VERIFIED`, `E_RECIPIENT_NOT_ALLOWED`, `E_RECIPIENT_SUPPRESSED`,
`E_SENDER_DOMAIN_NOT_AVAILABLE`, `E_RATE_LIMIT_EXCEEDED`, `E_DAILY_LIMIT_EXCEEDED`,
`E_DELIVERY_FAILED`, `E_INTERNAL_SERVER_ERROR`. That `.code` is what lets the handler distinguish a
retryable failure from a permanent one, and `messageId` is the only correlation handle into Email
Sending metrics — capture it in the bounded log.

Onboarding is a **dashboard** flow (Compute → Email Service → Email Sending → Onboard Domain), not a
Wrangler command. Requirements: the domain must be on Cloudflare DNS; the account must be on Workers
Paid (Email Sending is Beta). Cloudflare adds MX records on `cf-bounce.<domain>` plus SPF, DKIM, and
`_dmarc` TXT records; propagation is usually 5–15 minutes, up to 24 hours.

Before onboarding, sends are restricted to verified destination addresses in the account; **after**
onboarding, any recipient is allowed immediately. Limits worth knowing: 50 recipients per message,
5 MiB total message size, 998-character subject, ≤32 attachments. Operational gotcha: sends via the
binding appear as **dropped** in the Email Routing summary even when delivered — use Email Sending
metrics instead.

Local dev: with no remote binding, `wrangler dev` **simulates** delivery, logging the message and
writing it to a file under the Miniflare temp directory. Setting `"remote": true` makes a locally-run
Worker **send real email** — the docs recommend it, which is precisely why this project must leave it
unset and say so in the config comment, so nobody "follows the docs" and mails real people from CI.

**Alternatives considered**: a third-party transactional provider — rejected, it adds an API key, a
vendor account, and an egress dependency for one message type.

---

## D-07: Adjudicating the design authorities

The two authority documents disagree in six places. Each is resolved here so implementation never
has to guess. Authority order: `mockups/README.md` > prototypes for content/IA/copy;
`design-system/` > prototypes for tokens/visuals.

| # | Conflict | Resolution |
|---|---|---|
| 1 | Declaration type scale. `typography.css` has `--type-display: clamp(64px,10vw,168px)`, `--type-h1: clamp(40px,5.4vw,104px)`. `README:131` specifies hero `clamp(46px,7vw,126px)`; `MarketingPage.dc.html:15` uses `clamp(52px,7.6vw,134px)`. Home §05/§10/§11 headings range outside both. | **Per-page literals from the prototypes win** for declarations — the constitution explicitly permits values "lifted literally from the prototype inline styles", and these are composite per-section values. Keep DS tokens for body, lead, label, and measure. Do **not** override `--type-display`/`--type-h1`; add named per-section values in the section component. `README:131` is a floor/ceiling guide, not a spec. |
| 2 | Folio and status-chip scale. `README:128`/`:131` say mono 11px/600 at 0.18em (folio) and 0.12em (chip). `typography.css` `.dw-folio` is 12px/400, `.dw-label` is 13px/500. | **Prototype wins**: `--type-label-sm` (11px) + `--weight-label` (600). Both values already exist as tokens, so no new token is needed — the DS *role classes* are what diverge, and this build does not use them for these two patterns. |
| 3 | Footer "Company" column, 4th item. `README:118` and `MarketingPage.dc.html:163` say `Map your AI stack` → `/start`. `Start.dc.html:88` says `Home` → `/`. | **`Map your AI stack` → `/start`.** README plus the Home prototype outvote a single page's copy; keeping the conversion action in the footer is also the stated intent. |
| 4 | Home grid violations: three present (hero `-0.06em` pull, §03 register-row 24px offsets, §10 seam row) against a budget of "one, occasionally two". | The **register-row offset is part of the pattern**, not a page violation — `README:135` calls it intrinsic to the register row and `README:143` groups it with the hero pull as one build-wide device. Home therefore has two discrete violations. §10's seam row is `margin-left:16px` **plus** `padding-left:24px` (box shifts 16px, text indents 40px) — implement both, not README's single "24px". |
| 5 | Version marker case. Header instance has no `text-transform` (renders `Site / 0.2`); the footer instance inherits `uppercase`. `README:106` shows `SITE / 0.2`. | **Uppercase in both.** One component, one casing; the constitution's casing rule makes labels and proof marks uppercase. Wire the value to the build identity, not a literal. |
| 6 | Safety-note rule position under Home §12. `README:169` says the note sits above a rule; `MarketingPage.dc.html:155` puts `border-top` on the paragraph, so the rule is above the note. | **Prototype wins** (visual authority for a visual detail). |

Two further notes, not conflicts: register hairline colours are **not** interchangeable in practice
(`#D6CDB7` in Home §01/§03, `#C9C0AA` in §04) — match per section; and alternating register grounds
use bone-2 `#ECE3D0` only, never bone-3, anywhere on Home.

---

## D-08: Vendoring the design system

**Decision** Copy all seven token files plus `styles.css` into `src/styles/`; rewrite `fonts.css`;
rebuild the components as `.astro` from their `.d.ts` contracts. Never import from `design-system/`.

**Rationale** All seven `design-system/tokens/*.css`, `styles.css`, and `_ds_bundle.js` are
**byte-identical** to the copies bundled under `mockups/design_files/_ds/…/` — either source is safe.
(`design-system/readme.md` is the current copy; the bundled `readme.md` and `_ds_manifest.json` are
stale.) The token surface is 69 colour properties including a `.dw-dark` scope class that is exactly
the ink-band case, a full type/space/surface/motion scale, `--target-min: 44px`, `--focus-width: 3px`,
and a global `prefers-reduced-motion` override. `texture.css` is unused in this build but costs
~2.1KB and zero requests (all gradients code-native) — vendor it or drop it, no correctness impact.

The `.jsx` components are **not** vendorable: they are React components using inline `style` objects
that publish to a UMD global (`window.DirtyworksAiDesignSystem_9135ac`), and four of them
(`EvidenceRail`, `ControlRegister`, `OwnerRow`, `WorkOrder`) hard-import `ProofLabel` as a sibling,
while `CTABand` and `SiteHeader` import `Button` across group directories — any flattening copy
breaks. `SiteFooter`/`SiteHeader` use `href="#"` + `preventDefault` + `onNavigate`, which is exactly
the dead-control pattern Principle IV forbids. The one artefact worth lifting verbatim is the
`ProofStatus` union (five contracts reference it) → `src/types/proof.ts`.

Required components and their client needs (full prop contracts in
[contracts/design-tokens.md](./contracts/design-tokens.md)): `Button`, `ProofLabel`,
`ControlRegister`, `WorkOrder`, `AnnotatedComparison`, `FitField`, `CTABand` — all presentational.
`EvidenceRail` is the only genuinely scroll-reactive component in the build. `Icon` is unused (no
icons in this build). `DiagnosticForm` must **not** be vendored — it hardcodes its own field list and
holds a `sent` boolean; read it for field naming only.

**Alternatives considered**: loading the compiled `_ds_bundle.js` at runtime as `ds-base.js` does —
rejected; it is a 107KB UMD bundle requiring a global namespace and a stylesheet injected into
`document.head`, which would put the whole design system behind JavaScript.

---

## D-09: Abuse handling, and a knowing deviation

**Decision** Four layers, no CAPTCHA: strict schema with per-field bounds, hidden honeypot,
`MIN_ELAPSED_MS = 1000` from island mount, and `FORM_LIMITER.limit({ key })` where `key` is a
SHA-256 hash of `CF-Connecting-IP`. Missing binding allows (local dev); a binding that throws blocks.

**Knowing deviation** Cloudflare's own guidance advises **against** IP-derived rate-limit keys —
shared IPs, mobile networks, and privacy proxies make them inaccurate, and limits are enforced per
Cloudflare location rather than globally. The constitution mandates a hashed-IP key, and there is no
account or session to key on instead; a cookie or fingerprint would be worse for privacy and
trivially bypassed. Retained deliberately, recorded here rather than resolved silently. Practical
consequence: treat the limiter as a coarse abuse damper, not an exact quota, and keep the honeypot
and timing floor as the primary screens.

**Test consequence** A Playwright test fills and submits in ~50ms and therefore trips the 1000ms
floor. The suite must both pace a submission past the floor (to test success) and assert the
rejection deliberately (to test the guard). This is a design consequence, not a version issue.

---

## D-10: Fonts

**Decision** Self-host from the outset. Archivo (variable, `wght 100–900`), Instrument Serif
(static regular + italic), IBM Plex Mono (static 400/500/600, or the variable build from the IBM
repo). Drop Material Symbols Sharp entirely.

**Rationale** All three are **OFL-1.1**, which permits self-hosted web embedding; obligations are to
retain `OFL.txt`, not sell the fonts alone, and not reuse the Reserved Font Name on modifications.
Sources: `Omnibus-Type/Archivo`, `Instrument/instrument-serif` (ships `fonts/webfonts/*.woff2`),
`IBM/plex`. Instrument Serif is **not variable** and exists only at weight 400 upright + italic —
specifying any other weight will synthesise. Material Symbols is not needed: this build has no icons.

`tokens/fonts.css` currently issues two Google Fonts CDN `@import`s — the only external URLs in the
entire CSS surface. Replacing them with local `@font-face` also removes the `@import`-ordering
hazard when Vite inlines the stylesheet. Preload the two above-the-fold faces (Archivo variable,
IBM Plex Mono); keep the `--font-*` fallback stacks unchanged.

---

## D-11: Testing wiring

**Decision**

```ts
// playwright.config.ts
webServer: { command: 'npm run build && npx wrangler dev', port: 8787,
             reuseExistingServer: !process.env.CI, timeout: 120_000 },
use: { baseURL: 'http://localhost:8787' },
```

```ts
// vitest.config.ts
import { getViteConfig } from 'astro/config';
export default getViteConfig({ test: { /* … */ } });
```

**Rationale** 8787 is Wrangler's default dev port. Specifying `port` rather than `url` makes
Playwright derive `baseURL`. The build must precede `wrangler dev` because `main` points into
`dist/`. `getViteConfig` is exported from `astro/config` and returns a `ViteUserConfigFn` — Vitest
resolves it, so do not call it yourself. Because it boots Astro's config pipeline (which instantiates
the adapter), the `platformProxy` disable flag is evaluated at config time, not test time.

---

## Unverified

Stated explicitly so none of these becomes a surprise build failure:

1. Whether `nodejs_compat` is actually required by the emitted Astro Worker bundle — added
   defensively; remove only if a build proves it unnecessary.
2. The `platformProxy` → `workerd` → Vitest-hang causation. The `enabled` option is real and typed;
   the hang is project experience in `ARCHITECTURE.md`, not documented behaviour. Keep the workaround
   (cheap, harmless) but do not present it as platform-documented.
3. The exact `_worker.js` upload error string quoted in `ARCHITECTURE.md`. The `.assetsignore`
   mechanism and the need for it are confirmed; the message text is not canonical.
4. The former `unsafe.bindings` shape — no longer documented anywhere in the live wrangler reference.
5. The starting daily email quota. Documented only as "conservative" and account-dependent, raised
   via a Limit Increase Request Form.
6. IBM Plex Mono variable-font axis ranges — read `packages/plex-mono-variable` before committing to
   axis values, or use the static faces.
7. The `npm install-scripts approve …` subcommand spelling from `ARCHITECTURE.md` §12.

## Corrections applied to ARCHITECTURE.md's guidance

| Claim | Correction |
|---|---|
| `@astrojs/react` 5.x is the Astro 5 line; check its `peerDependencies.astro` | 4.4.2 is the Astro 5 line; the package declares no `astro` peer at any version, so peer-checking cannot catch the mismatch (D-01) |
| `output: 'static'` means the build output is static | Build output is forced to `server`; it is a hybrid build. Pages still prerender individually (D-02) |
| `npx wrangler email sending enable <domain>` | No `email` command group exists in Wrangler; onboarding is a dashboard flow (D-06) |
| `wrangler dev` simulates delivery | True only while `remote` is unset; remote bindings send real mail and are the documented recommendation (D-06) |
| Rate limiter needs the `ratelimits` field | Correct, but `simple.period` must be exactly 10 or 60, and `namespace_id` must be a stringified integer (D-05) |
| Five pages, `site: 'https://jotbrain.ai'`, `documentation/` as design source, 64 unit / 274 E2E counts | All stale: nine pages, `https://dirtyworks.ai`, `design-system/` + `mockups/`, and test counts must be recomputed |
