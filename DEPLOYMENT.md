# Deployment

Cloudflare Workers Builds is connected directly to GitHub; there is no CI workflow in this
repository. A push to `main` builds and deploys.

## Workers Builds settings

Set these in the Cloudflare dashboard under the Worker → Settings → Builds.

| Field | Value |
|---|---|
| Repository | `johncarpenter/dirtyworks.ai` |
| Branch | `main` |
| Build command | `npm run ci:verify` |
| Deploy command | `npx wrangler deploy` |
| Build output directory | *(leave empty)* |
| Root directory | *(leave empty)* |

Three things about that table are load-bearing:

- **The build command is `ci:verify`, not `build`.** It runs the type check, the unit tests, the
  build, and the content gate, in that order. Any failure fails the build, so nothing deploys. The
  constitution requires the content gate to block a deploy; with no CI workflow, this is the only
  place that can still be true.
- **Never make the build command `npm run build && npx wrangler deploy`.** Workers Builds runs the
  build and deploy commands separately, so a combined command builds twice.
- **The build output directory stays empty.** Assets are served from `./dist` via the `assets` block
  in `wrangler.jsonc`; Workers Builds does not need to know about it.

If the `name` in `wrangler.jsonc` (`dirtyworks-ai`) does not match the Worker, Workers Builds
overrides it and opens a reconciliation pull request.

## What runs where

| Gate | Where it runs | Blocks |
|---|---|---|
| `astro check` | pre-push hook, Workers Builds | deploy |
| `vitest` (52 tests) | pre-push hook, Workers Builds | deploy |
| `astro build` | pre-push hook, Workers Builds | deploy |
| `check:content` (8 rules) | pre-push hook, Workers Builds | deploy |
| `playwright` (242 cases) | **pre-push hook only** | the push |
| `wrangler deploy --dry-run` | pre-push hook only | the push |
| `check:launch` | run by hand before a public launch | judgement |

Playwright is deliberately not in the build command: downloading a browser on every deploy makes
each one slower and flakier, for a suite that has already had its chance to fail at push time.

Enable the hook once per clone:

```bash
git config core.hooksPath .githooks
```

Without that, nothing runs the end-to-end suite automatically. `git push --no-verify` skips it
deliberately — which is fine occasionally and a bad habit permanently.

## Before the first real deploy

The site deploys and serves today. The intake form will fail closed — honestly, with a retryable
message and a `mailto:` alternative — until the sending domain is onboarded.

1. **Onboard the sending domain.** Cloudflare dashboard → Compute → Email Service → Email Sending →
   Onboard Domain, for `dirtyworks.ai`. Requires the zone on Cloudflare DNS and a Workers Paid plan
   (Email Sending is Beta). Cloudflare adds MX on `cf-bounce.dirtyworks.ai` plus SPF, DKIM and
   `_dmarc` TXT records. Propagation is usually 5–15 minutes.
2. **Confirm the sender mailbox.** `src/actions/notify.ts` sends from `website@dirtyworks.ai` to
   `hello@dirtyworks.ai`.
3. **Never set `"remote": true`** on the `send_email` binding in `wrangler.jsonc`. The Cloudflare
   docs recommend remote bindings for local development; in that mode a local run — or a CI run —
   sends real email to real recipients.
4. **Check the remaining launch blockers** in
   [`specs/001-build-marketing-website/launch-blockers.md`](specs/001-build-marketing-website/launch-blockers.md),
   then run `npm run check:launch`, which promotes outstanding approvals from notes to failures.

## Verifying a deploy

```bash
curl -s -o /dev/null -w '%{http_code}\n' https://dirtyworks.ai/                     # 200
curl -s -o /dev/null -w '%{http_code}\n' https://dirtyworks.ai/_worker.js/index.js  # 404
curl -s -o /dev/null -w '%{http_code}\n' https://dirtyworks.ai/about                # 200
```

The middle one matters: a 200 there means the server bundle is being served as a public asset and
`public/.assetsignore` has stopped working.

## Rollback

Worker → Deployments → select the previous version → Rollback. Content and code ship together, so a
rollback reverts both.
