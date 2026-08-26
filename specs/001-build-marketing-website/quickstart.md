# Quickstart: Validating the Dirtyworks.ai Marketing Website

**Date**: 2026-08-25 | **Plan**: [plan.md](./plan.md)

How to stand the project up and prove each user story end to end. This is a run-and-verify guide;
implementation steps belong in `tasks.md`.

## Prerequisites

- Node 20+ (`astro@5.18.2` requires `18.20.8 || ^20.3.0 || >=22.0.0`; `vitest@4.1.11` requires
  `^20 || ^22 || >=24`).
- A Cloudflare account on the **Workers Paid** plan with `dirtyworks.ai` on Cloudflare DNS — required
  only for real delivery. Local validation needs neither: `wrangler dev` simulates the email binding.
- Self-hosted font files under `public/fonts/` with `OFL.txt`. Until they land, the site builds and
  renders with the fallback stacks.

## Setup

```bash
npm install astro@5.18.2 @astrojs/cloudflare@12.6.13 @astrojs/react@4.4.2 \
            react@19.2.8 react-dom@19.2.8
npm install -D typescript@5.9.3 @astrojs/check @types/react @types/react-dom \
               vitest@4.1.11 @playwright/test@1.62.1 wrangler@4.126.0 \
               @cloudflare/workers-types@5.20260826.1
npx playwright install chromium
```

`@astrojs/react` **4.4.2**, not 5.x — see research.md D-01. The wrong pin installs cleanly and breaks
later.

## Run

```bash
npm run dev            # astro dev — bindings via platformProxy
npm run build          # emits dist/ + dist/_worker.js/
npx wrangler dev       # serves the built output on :8787 (astro preview is unsupported)
```

`wrangler dev` with no remote binding **simulates** email: the message is logged and written to a file
under the Miniflare temp directory. Do **not** set `"remote": true` — that sends real mail from a local
run, including from CI.

## Gates

```bash
npm run typecheck      # astro check
npm run test:unit      # vitest
npm run build          # must precede check:content and test:e2e
npm run check:content  # release gate — exits 1 while the site is not fit to publish
npm run test:e2e       # playwright, webServer runs build && wrangler dev
npx wrangler deploy --dry-run
npm run check:launch   # same rules, but outstanding approvals become failures
```

`build` comes before `check:content` because three of the gate's eight rules inspect the **built
output** — a claim stamp can only be verified as rendered. Merge requires the first four. Deploy
requires all of them plus:

```bash
curl -o /dev/null -w '%{http_code}\n' http://localhost:8787/_worker.js/index.js   # expect 404
```

A dry run free of `_worker.js` errors plus that 404 together prove `public/.assetsignore` is doing its
job. Both are cheap; run them every time.

## Story validation

Each block is runnable proof for one user story in [spec.md](./spec.md). Story 1 alone is a viable
MVP — Home plus `/start` with a working notification.

### Story 1 (P1) — Log an operating gap

```bash
npm run build && npx wrangler dev
```

1. Open `http://localhost:8787/` — the header action reads `MAP YOUR AI STACK`.
2. Follow it to `/start`; the header action is now a non-link `START` pill.
3. Fill the eight required fields. **Wait at least one second** before submitting — a faster
   submission trips the timing floor by design.
4. Expect the confirmation panel: `RECEIVED / LOGGED`, "The gap is on the record.", the
   no-service-relationship paragraph, and `LOG ANOTHER GAP`.
5. In the `wrangler dev` console, expect `send_email binding called with MessageBuilder:` and a file
   path. Open the file and confirm: every submitted field under its prototype label, `replyTo` set to
   the submitter, subject `OPERATING GAP / INTAKE — <company>`.
6. Negative paths, all expected to be visible without leaving the page: submit empty (inline errors,
   focus on the first invalid field, no send); submit in under a second (generic refusal); submit six
   times inside a minute (rate-limited message plus `mailto:`); with `EMAIL` unbound, submit
   (delivery-failed message, values preserved, **no** confirmation).

### Story 2 (P2) — Managed scope and boundaries

Visit `/services` and `/catalogue`. Confirm each of the eight scope rows shows its boundary cell with
equal weight, each of the seven catalogue categories shows tier/state/purchase route, the quote sheet
carries `ILLUSTRATIVE` with no numbers, and a full-text search of the built pages finds no currency
symbol and no purchase control.

### Story 3 (P3) — Trust and method

Visit `/trust`: the eight limitations must appear **before** the control register in DOM order; the
register carries the non-certification note; the incident timeline is labelled illustrative. Visit
`/method`: stop is present as a valid outcome alongside deploy.

### Story 4 (P4) — MSP partner lane

Visit `/msps`: the header action reads `DESIGN A PARTNER PILOT`; every seam-matrix cell contains a
word; the three models each state relationship, visibility, and seam.

### Story 5 (P5) — About and Notes

`/notes`: queue items 04–12 show number and title only — no link, date, or reading time. `/about`
must **not** be reachable while its founder placeholder is unresolved; `npm run check:content` fails if
it is published.

### Story 6 (P6) — Constrained visitors

```bash
npm run test:e2e -- --project=mobile   # 320×720
npm run test:e2e -- --grep @no-js
```

Manually, at 320px: no horizontal scrolling anywhere, including the Services boundary column, the MSP
seam matrix, and the Catalogue menu. With JavaScript disabled: every navigation destination is
followable and `/start` shows purpose, fields, and a `mailto:` alternative. Keyboard only: tab the
header, open and dismiss the mobile menu with Escape, toggle need chips, and submit — every stop shows
a visible focus ring and nothing is unreachable.

## Test split

| Layer | Tool | Scope |
|---|---|---|
| Unit | `vitest` via `getViteConfig()` | input schema, guards, notification payload, log redaction, route/navigation consistency, content-check rules, token allow-list, no-cross-import check |
| E2E | `playwright`, two projects (1440×900, 320×720) | routes and metadata, header action variants, keyboard operation, focus management, responsive overflow at six widths, form success and every failure state, no-JavaScript rendering, heading outline and contrast |

Do not carry over `ARCHITECTURE.md`'s test counts — they belong to a different, five-page site.

## Known gotchas

| Symptom | Cause | Fix |
|---|---|---|
| `ERESOLVE` on adapter install | `@astrojs/cloudflare` 14.x wants Astro 7 | pin `12.6.13` |
| Two Vite majors in the tree, no install error | `@astrojs/react` declares no `astro` peer | pin `4.4.2` |
| Vitest never exits | `platformProxy` spawns `workerd` | `platformProxy: { enabled: !process.env.VITEST }` |
| `astro preview` fails | adapter supplies no preview entrypoint | `wrangler dev` against `dist/` |
| Deploy refuses: `_worker.js` as an asset | server bundle sits inside the asset directory | `public/.assetsignore` with `_worker.js` and `_routes.json` |
| Rate-limit binding rejected | `simple.period` must be exactly 10 or 60 | use 60 |
| Dark section headings invisible | element selectors beat inherited `color` | explicit heading rules per dark and brand band |
| Page scrolls sideways at 320px | grid children default to `min-width: auto` | `min-width: 0` on shared grid child selectors |
| Real email sent from a local run | `"remote": true` on the `send_email` binding | leave it unset |
| E2E form test "fails" as a bot | fills and submits in ~50ms | pace past 1000ms, and assert the refusal separately |
