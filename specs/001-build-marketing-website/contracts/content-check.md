# Contract: Release Gate (`scripts/check-content.ts`)

**Consumers**: `npm run check:content`, CI before deploy, `tests/unit/check-content.test.ts`.

The gate is the difference between "we intend not to ship placeholder text" and "we cannot". It exits
non-zero and names every violation with file and line. Principle III requires it; SC-008 requires it
to be proven by introducing a deliberate violation.

Scope: everything under `src/` plus the built HTML in `dist/` for the stamp and marker rules (a stamp
can only be verified as *rendered* from the output). `design-system/`, `mockups/`, and `specs/` are
excluded — they are authorities and may legitimately contain the banned strings.

## Rule 1 — Unresolved placeholders

Placeholders carry a `severity`, because two different situations were being conflated:

- **`blocks-build`** — the page would have to invent content to exist. Fails whenever the route is
  published. `FOUNDER_PROFILE` is this: `/about` ships `published: false` until real content arrives.
- **`blocks-launch`** — the copy on the page is real and honest; an approval is outstanding. Reported
  as a note by `check:content`, promoted to a failure by `check:launch --launch`. The intake consent
  wording is this: the page ships pre-launch carrying a visible `LEGAL REVIEW` stamp.

Without that split the gate would be permanently red on `/start`, which is the only conversion
surface on the site — and a gate that is always failing teaches people to ignore it.

Rendered-marker scanning is word-boundary matched and also accepts the `data-claim-state` attribute.
A substring match is wrong: `/method` legitimately contains the copy "Evaluated failures / open
gaps", which is content, not an unresolved marker.

## Rule 2 — Prohibited vocabulary

Case-insensitive, word-boundary matched, against prose and attribute text in `src/`:

```
revolutionary, game-changing, unleash, unlock, harness, seamless, frictionless,
magic, supercharge, transformative, cutting-edge, future-proof,
autonomous workforce, replace employees, eliminate hallucinations,
one-click, set-and-forget
```

Warn (do not fail) on the use-carefully list, which requires an adjacent specific:
`AI-powered`, `secure`, `accurate`, `automation`, `ROI`.

## Rule 3 — Banned calls to action

Matched against link, button, and CTA label text only — never body prose, so a page may legitimately
discuss the phrase. Union of both authorities, case-insensitive:

```
Get started, Learn more, Book a demo, Contact us, Talk to sales
```

The positive allow-list is built from the prototypes' actual labels (`Map your AI stack`, `See what we
manage`, `Compose a product mix`, `See the catalogue method`, `See how knowledge is operated`,
`Design a partner pilot`, `Design an MSP pilot`, `Log the operating gap`, `Log another gap`, …). Note
`design-system/readme.md:109`'s CTA list is filler and disagrees with the prototypes — do not build
the allow-list from it (research.md D-07).

## Rule 4 — Illustrative artefacts must carry their stamp

Fail if any of these renders without its claim stamp in the built output:

| Artefact | Route | Required stamp |
|---|---|---|
| Hero portfolio register | `/` §01 | `ILLUSTRATIVE` |
| Evidence rail items (all 7) | `/` §02 | `ILLUSTRATIVE` |
| Catalogue product disclaimer | `/`, `/catalogue` | `VERIFY AT QUOTE` |
| Quote sheet | `/catalogue` | `ILLUSTRATIVE` |
| Monthly record sheet | `/method` | `ILLUSTRATIVE` |
| Incident timeline | `/trust` | `ILLUSTRATIVE` (voice and sequence, not history) |

## Rule 5 — No fabricated proof

Fail on any occurrence in `src/` of: a currency symbol or price pattern adjacent to a product or
service name; a percentage or "x faster/cheaper" construction without an adjacent
`HYPOTHESIS — NOT MEASURED` stamp; an image asset under `src/assets/` other than the social preview;
the words `testimonial`, `certified`, `ISO`, `SOC 2` used as a claim; a publication date or reading
time on a `/notes` entry that has no article body.

## Rule 6 — Emoji and glyphs

Fail on any `Extended_Pictographic` or `Emoji_Presentation` codepoint in `src/`. Allow exactly
`→` (U+2192) and `↑` (U+2191), and only inside diagram components.

## Rule 7 — Casing

- Brand is `Dirtyworks.ai` in prose. Fail on `DirtyWorks`, `Dirty Works`, or bare lowercase
  `dirtyworks` outside the wordmark component.
- Heading source strings in `src/content/` must be sentence case — fail on an all-caps or Title Cased
  heading string, because `text-transform: uppercase` is what does the visual work.
- Fail on `users` as a way of addressing the buyer (use `your team` / `your company`), and on
  third-person `the company` referring to Dirtyworks.ai.

## Rule 8 — Token and surface discipline

- Every `var(--…)` referenced in `src/` must exist in the vendored token set (155-name allow-list
  extracted from `design-system/_adherence.oxlintrc.json` `x-omelette.tokens`).
- Fail on `border-radius` > 3px, on any `box-shadow` with a non-zero blur radius, on any
  `linear-gradient`/`radial-gradient` outside `texture.css`, and on any `@import` of an external
  origin.

The DS's own oxlint config is **not** reusable as-is: its selectors are `JSXOpeningElement`, so it is
inert against `.astro`; it bans raw hex and raw `px` literals, which the constitution explicitly
permits when lifted from the prototypes; it requires an `index.js` that does not exist here; and it
allow-lists Material Symbols, which this build drops. The portable artefact is the token array.

## Exit behaviour

```bash
npm run check:content   # exits 1 while the site is not fit to publish
```

Output is one line per violation: `path:line  RULE-n  <what and why>`. Non-zero exit blocks the deploy
step. Wire it into CI **before** deploy, not after.

## Verification

| Assertion | Layer |
|---|---|
| Each of the eight rules fires on a fixture containing exactly one violation | unit |
| A clean tree exits 0 | unit |
| Deliberately introducing a banned term, an unresolved marker, a banned CTA label, and an unstamped illustrative artefact each fail the check | unit (SC-008) |
| CI refuses to deploy when the check fails | pipeline |
