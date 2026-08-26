# Launch Blockers

**Date**: 2026-08-25 | **Status of the build**: all merge and deploy gates pass; the site is
technically deployable today.

Everything below is outside engineering control. Each item names what gates on it and how the
gate behaves, so nothing here can be forgotten by accident — the release gate reports it on every
run, and `npm run check:launch` turns the reports into failures.

## Blocking the build

Nothing. `/about` was the only entry here; see below for what replaced it.

## Blocking public launch

These ship pre-launch carrying honest, visible signage. `npm run check:launch` fails on each until
resolved; the day-to-day `check:content` records them as notes so the gate stays meaningful instead
of permanently red.

| # | Blocker | Owner | Gates | Behaviour today |
|---|---|---|---|---|
| 2 | Approved consent wording for the intake form | Counsel | `/start` | The form carries the real consent sentence from the prototype plus a visible `Legal review — consent wording pending` stamp. |
| 3 | Privacy notice, website terms, accessibility statement | Counsel | footer | Rendered as inert text, never as links to empty pages (FR-008). |
| 4 | Sending-domain onboarding for `dirtyworks.ai` | Sponsor + engineering | live email delivery | Requires Cloudflare DNS for the zone, a Workers Paid plan (Email Sending is Beta), and the dashboard flow Compute → Email Service → Email Sending → Onboard Domain. Cloudflare adds MX on `cf-bounce`, plus SPF, DKIM and `_dmarc` TXT records. Until then `wrangler dev` simulates delivery and a deployed form would fail closed with the retryable delivery-failed state — visitors are told, and given `hello@dirtyworks.ai`. |
| 5 | Analytics and cookie decision | Sponsor | — | Nothing is included, so the site sets no non-essential storage and needs no consent banner. Adding any of it requires a constitution amendment (Principle I excludes third-party scripts). |
| 6 | Sponsor approval of public offer names, support boundaries and availability wording | Sponsor | all pages | Copy currently ships exactly as the handoff specifies. |
| 7 | Confirmed supported product shortlist and any authorized-reseller statements | Sponsor | `/catalogue` | Every product name renders as a candidate example under a `VERIFY AT QUOTE` stamp, with no price and no purchase route. |

## Outstanding, blocking nothing

| # | Input | Owner | Behaviour today |
|---|---|---|---|
| 8 | Founder name, title, employment history, verifiable achievements, credentials, approved photograph, legal entity, and why Alberta | Sponsor | `/about` publishes as the about-and-contact page. It describes the company, carries the contact register, and names no person — so it needs none of these to be true. `FOUNDER_PROFILE` stays in `src/copy/placeholders.ts` with `blocksRoutes: []`, and the founder band is simply absent rather than stubbed. Release-gate rule 1 still fails the build if an `OPEN GAP` marker is ever rendered on a published route, so the annotation panel cannot return by accident. **Do not invent biography.** |

## Already satisfied

| Item | Evidence |
|---|---|
| At least one visibly illustrative operating example | 7 registered claim artefacts, each verified by the release gate to render its stamp |
| No fabricated logos, testimonials, certifications, results or vendor relationships | Release gate rules 4 and 5; `tests/e2e/home.spec.ts` asserts zero images and zero price patterns |
| Three complete Notes articles *if* Notes launches | `/notes` ships as an index with three notes in preparation and a title-only queue — the intended design, with no fabricated dates or reading times |
| Accessibility QA | `tests/e2e/a11y.spec.ts` (heading outline, AA contrast on every band, no colour-only state, hidden decorative glyphs), `keyboard.spec.ts`, `no-js.spec.ts` |
| Mobile QA | `tests/e2e/responsive.spec.ts` — 9 routes × 6 widths from 320px |
| Form abuse QA | Decoy, 1000ms timing floor, 10/60s hashed-IP rate limit; unit-tested including the fail-closed path |
| Security headers | **Not yet configured** — see below |
| Gates in front of the deploy | `npm run ci:verify` is the Workers Builds build command; a failing content gate stops the deploy. E2E runs at push time via `.githooks/pre-push`. See [`DEPLOYMENT.md`](../../DEPLOYMENT.md). |

## Recommended before launch, not blocking

- **Security headers.** Add a `public/_headers` file (CSP, `X-Content-Type-Options`,
  `Referrer-Policy`, `Permissions-Policy`). The site loads no third-party resources, so a strict CSP
  is unusually easy here: `default-src 'self'` plus `'unsafe-inline'` for the two small inline
  scripts, or hashes for them.
- **Font subsetting.** Six static Archivo faces plus two others is ~464KB of fonts. Subsetting to
  latin would cut it substantially.
- **`from` address.** `src/actions/notify.ts` sends from `website@dirtyworks.ai`. Confirm that
  mailbox exists on the onboarded domain.
- **Open mobile menu overflows.** With the disclosure panel open at 320-375px the document scrolls
  sideways (456px against a 320px viewport). Pre-dates the `/about` work and is present on every
  page; `responsive.spec.ts` only measures the closed state, which is why it went unseen.
