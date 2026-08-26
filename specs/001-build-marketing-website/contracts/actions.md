# Contract: Intake Action

**Consumers**: `src/actions/index.ts`, `schemas.ts`, `guards.ts`, `notify.ts`,
`src/components/islands/StartForm.tsx`, `tests/unit/actions.*.test.ts`, `tests/e2e/start.spec.ts`.

One action. Written before the handler, per Principle V. The table below is the specification that
both the server and the island's state machine implement — if they disagree, the table wins.

## Surface

| Property | Value |
|---|---|
| Action | `logOperatingGap` |
| Transport | client-side call from the `StartForm` island; Astro injects `/_actions/[...path]`, so the endpoint is `/_actions/logOperatingGap` |
| Input | `OperatingGapSubmission` — strict zod, unknown keys rejected ([data-model.md](../data-model.md#operatinggapsubmission--srcactionsschemasts)) |
| Success output | `{ received: true }` — no echo of submitted content |
| Bindings | `EMAIL` (`send_email`), `FORM_LIMITER` (`ratelimits`), accessed via `import { env } from 'cloudflare:workers'` |

No page reads the result server-side, so no page becomes on-demand rendered. The zero-JavaScript path
is a `<noscript>` block rendering the form's purpose, its fields, and a `mailto:` alternative — not a
`<form action={actions.logOperatingGap}>`, which would require `Astro.getActionResult()` in page
frontmatter and drag `/start` out of the prerendered set.

## Error contract

| Condition | Thrown code | Island state | Retryable | Visitor sees |
|---|---|---|---|---|
| Schema violation | `BAD_REQUEST` (via `ActionInputError`) | `invalid` | No | Message beside each invalid field; focus moves to the first |
| `decoy` non-empty | `BAD_REQUEST` | `refused` | No | Generic refusal, no explanation of which screen fired |
| `elapsedMs` < 1000 | `BAD_REQUEST` | `refused` | No | Generic refusal |
| `FORM_LIMITER.limit()` returns `success: false` | `TOO_MANY_REQUESTS` | `rateLimited` | Yes | Try again shortly + `mailto:` alternative; values kept |
| `FORM_LIMITER` throws | `TOO_MANY_REQUESTS` | `rateLimited` | Yes | Same — fails **closed** |
| `EMAIL` binding absent | `INTERNAL_SERVER_ERROR` | `deliveryFailed` | Yes | Retry + `mailto:`; values kept |
| `send()` throws (any `E_*` code) | `INTERNAL_SERVER_ERROR` | `deliveryFailed` | Yes | Retry + `mailto:`; values kept |
| `send()` resolves with a `messageId` | — | `confirmed` | — | Confirmation panel |

Code spellings are verified against `ACTION_ERROR_CODES` in `astro@5.18.2`
(`dist/actions/runtime/shared.js`): `BAD_REQUEST` → 400, `TOO_MANY_REQUESTS` → 429,
`INTERNAL_SERVER_ERROR` → 500. Field-level mapping uses `isInputError(error)` and `error.fields`.

**The load-bearing rule**: `confirmed` is reachable only after `send()` resolves. Every other
outcome — throw, rejection, missing binding, unknown error — is `deliveryFailed`. A success message
the code has not earned is a defect, not a UX nicety.

`FORM_LIMITER` behaviour differs by cause deliberately: a **missing** binding allows the request (so
`astro dev` works without one), while a binding that **throws** blocks it. Absence is a development
condition; failure is a signal.

## Guards

| Layer | Rule | Notes |
|---|---|---|
| Schema | per-field bounds, closed `needs` union, `.strict()` | rejects oversized paste (FR-034) and unknown keys |
| Honeypot | `decoy` must be empty | visually hidden input inside `aria-hidden="true"` with `tabIndex={-1}`; zero false positives for real users |
| Timing | `MIN_ELAPSED_MS = 1000`, measured from island mount | a person typing an address takes longer; scripted posts usually do not wait |
| Rate limit | `FORM_LIMITER.limit({ key })`, `key = sha256(CF-Connecting-IP)` | `simple: { limit: 5, period: 60 }` — `period` **must** be 10 or 60; `namespace_id` is a stringified integer |

No CAPTCHA and no third-party verification widget: both would add a third-party script and an
accessibility surface to a site that otherwise loads almost no JavaScript. Revisit only if observed
abuse justifies the cost.

Known limitation, accepted deliberately (research.md D-09): Cloudflare advises against IP-derived
keys, and limits are enforced per location. The limiter is a coarse damper; the honeypot and timing
floor are the primary screens.

## Notification

Built by `notify.ts` from a validated submission. Both `text` and `html` always populated.

```ts
await env.EMAIL.send({
  from:    { email: '<onboarded sender on dirtyworks.ai>', name: 'Dirtyworks.ai website' },
  to:      'hello@dirtyworks.ai',
  replyTo: { email: submission.email, name: submission.name },
  subject: `OPERATING GAP / INTAKE — ${submission.company}`,
  text, html,
});
```

- Every submitted field appears under its prototype label, in form order. Omitted optional fields are
  marked absent, never rendered as an empty label.
- Selected `needs` are listed; an empty selection is stated as such.
- `send()` resolves to `EmailSendResult { messageId }` — capture it for the log; it is the only
  correlation handle into Email Sending metrics.
- Thrown errors carry `.code` (`E_RATE_LIMIT_EXCEEDED`, `E_DAILY_LIMIT_EXCEEDED`, `E_DELIVERY_FAILED`,
  …). Record the code; do not surface it to the visitor.

## Logging

Exactly five fields, none derived from user content:

```ts
{ purpose: 'operating-gap-intake',
  outcome: 'accepted' | 'invalid' | 'refused' | 'rate-limited' | 'delivery-failed',
  durationMs: number, messageId?: string, errorCode?: string }
```

Names, addresses, message bodies, need selections, and raw IPs must never be logged. A unit test
asserts the emitted record against this exact shape (FR-040).

## Verification

| Assertion | Layer |
|---|---|
| Schema accepts a valid payload; rejects each missing required field, a bad email, an over-long field, an unknown key, an out-of-union `need` | unit |
| Honeypot non-empty and `elapsedMs` below the floor both refuse without sending | unit |
| Limiter returning `false` yields `TOO_MANY_REQUESTS`; limiter throwing also blocks; absent binding allows | unit |
| Notification contains every field under its label, sets `replyTo`, and uses the subject format | unit |
| Log record matches the five-field shape and contains no submitted value | unit |
| `send()` rejection maps to `deliveryFailed` and no confirmation is shown | unit + E2E |
| Paced submission reaches the confirmation panel; the notification is observable in `wrangler dev`'s simulated output | E2E |
| A ~50ms scripted submission is refused (the guard is asserted, not worked around) | E2E |
| Field errors render beside the right fields with focus on the first | E2E |
| `<noscript>` path shows purpose, fields, and a `mailto:` alternative | E2E (no-JS project) |
