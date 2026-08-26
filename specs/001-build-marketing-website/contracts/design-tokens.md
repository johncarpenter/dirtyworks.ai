# Contract: Vendored Design System

**Consumers**: `src/styles/**`, `src/components/**`, `src/types/proof.ts`,
`scripts/check-content.ts` (CSS rules), `tests/unit/tokens.test.ts`.

`design-system/` and `mockups/` are read-only. Nothing under `src/` may import from them
(Principle II). All seven token files, `styles.css`, and `_ds_bundle.js` are **byte-identical**
between `design-system/` and the copy bundled under `mockups/design_files/_ds/…/`, so either source
is safe to copy; `design-system/readme.md` is the current copy and the bundled one is stale.

## Files to vendor

| Source | Destination | Treatment |
|---|---|---|
| `design-system/styles.css` | `src/styles/tokens.css` | entry point; keep the import order |
| `design-system/tokens/colors.css` | `src/styles/tokens/colors.css` | verbatim |
| `design-system/tokens/fonts.css` | `src/styles/tokens/fonts.css` | **rewrite** — see below |
| `design-system/tokens/typography.css` | `src/styles/tokens/typography.css` | verbatim; the `--deck-*` ramp may be stripped (deck-only) |
| `design-system/tokens/spacing.css` | `src/styles/tokens/spacing.css` | verbatim |
| `design-system/tokens/surfaces.css` | `src/styles/tokens/surfaces.css` | verbatim; also carries base resets and `.dw-sheet`/`.dw-rule*` |
| `design-system/tokens/motion.css` | `src/styles/tokens/motion.css` | verbatim |
| `design-system/tokens/texture.css` | `src/styles/tokens/texture.css` | optional — unused this build, ~2.1KB, zero requests |

Import order is `fonts → colors → typography → spacing → surfaces → motion → texture`. Custom
properties resolve at use time so order is not strictly required for correctness, but it is the
documented contract: `typography` references `--font-*`, and `surfaces`/`texture` reference
`--ink`/`--blueprint`.

**Do not vendor** `_ds_bundle.js`, `_ds_manifest.json`, `slides/`, `templates/`, `guidelines/`,
`ui_kits/`, or any `.jsx`. `mockups/design_files/support.js` and `ds-base.js` are explicitly
non-portable.

## Token surface

- **Colour** — 69 properties: six core brand colours (`--ink #11110f`, `--bone #f3ecdd`,
  `--signal-orange #ff5a1f`, `--blueprint #2855ff`, `--verified-acid #d8ff3e`, `--steel #636760`),
  derived neutrals and press states, `--error #c1200b` / `--error-field #f7dfd9`, plus `--text-*`,
  `--surface-*`, `--line-*`, `--status-*` aliases and a `.dw-dark` scope class. `.dw-dark` is exactly
  the ink-band case (Home §06/§10, Trust, For MSPs, the footer) and introduces two link colours not
  in the base palette (`#7d99ff`, `#a8bcff`) — they are part of the closed set.
- **Type** — weights 400/500/600/700/800/900; web ramp `--type-display` … `--type-caption`; mono
  `--type-label 13px`, `--type-label-sm 11px`, `--type-folio 12px`; leadings 0.86–1.52; trackings
  −0.03em to 0.18em; measures 64ch/44ch/36ch. Role classes `.dw-display` … `.dw-folio` exist but are
  **not** used for folio lines or status chips (see Adjudications).
- **Space** — `--unit: 8px`, `--space-0..11` (0–192px), rhythm 16/32/64/128, 12/6/4 grid with media
  queries at 900px and 600px, `--grid-gutter 24px` (16px ≤900px), `--grid-max 1440px`,
  `--page-margin clamp(20px, 4vw, 80px)`, `--band-pad-y clamp(48px, 7vw, 128px)`,
  `--target-min 44px`, `--focus-width 3px`.
- **Surface** — `--radius-0/1/2` = 0/2/**3px ceiling**; borders 1/1.5/3/6px; `--shadow-hard`
  `6px 6px 0 var(--ink)`, `--shadow-hard-sm` `3px 3px 0`, orange and blueprint variants;
  `--focus-ring` (blueprint) and `--focus-ring-inverse` (acid on dark).
- **Motion** — durations 80/120/220/420/700ms; `--ease-mech cubic-bezier(0.2, 0, 0.1, 1)`; hover and
  press shifts; a global `prefers-reduced-motion` override; keyframes
  `dw-slide-into-alignment` (the one this build uses), `dw-redaction-retract`, `dw-annotate-draw`.

## Fonts

`tokens/fonts.css` currently issues two Google Fonts `@import`s — the only external URLs in the
entire CSS surface. Both must go.

| Family | Licence | Needed | Form |
|---|---|---|---|
| Archivo | OFL-1.1 (`Omnibus-Type/Archivo`) | 400/500/600/700/800/900 upright | variable `wght 100–900` (one file) |
| Instrument Serif | OFL-1.1 (`Instrument/instrument-serif`) | 400 upright + 400 italic | two static faces; **not variable** — never specify another weight |
| IBM Plex Mono | OFL-1.1 (`IBM/plex`) | 400/500/600 upright | static faces, or the variable build from `packages/plex-mono-variable` |
| Material Symbols Sharp | — | **not needed** | this build has no icons; drop the import |

Ship `OFL.txt` alongside the files under `public/fonts/`. Preload the two above-the-fold faces
(Archivo, IBM Plex Mono). Keep the `--font-*` fallback stacks unchanged.

## Component contracts

Rebuild as `.astro` against these prop shapes (lifted from the `.d.ts` files) so the components stay
substitutable. `ProofStatus` is lifted verbatim into `src/types/proof.ts`; five contracts reference it.

| Component | Props | Client |
|---|---|---|
| `Button` | `children` req; `variant?: primary\|secondary\|evidence\|ghost`; `size?: sm\|md\|lg`; `href?`; `disabled?`; `fullWidth?` | none — CSS `:hover`/`:active`; drop `onClick`, `icon`, `iconAfter` |
| `ProofLabel` | `children` req; `value?`; `status?: ProofStatus`; `size?: sm\|md` | none |
| `ControlRegister` | `rows: { control, mechanism, holder, state, status? }[]` req; `caption?`; `note?` | none |
| `WorkOrder` | `steps: { name, detail, duration?, annotation?, marks: { label, value?, status? }[] }[]` req; `loopLabel?` | none |
| `AnnotatedComparison` | `leftTitle`, `rightTitle`, `rows: { left, right, decisive? }[]` req; `annotation?` | none |
| `FitField` | `segment`, `summary`, `included: string[]`, `excluded: string[]` req; `label?` | none |
| `CTABand` | `heading` req; `support?`; `primary?: { label, href }`; `secondary?`; `folio?`; `tone?: ink\|orange` | none — keep `href`, drop `onClick` |
| `EvidenceRail` | `items: { text, origin?, status?, statusLabel? }[]` req; `aligned?`; `title?` | **island** — scroll-triggered alignment |
| `Folio` | new composite: `index`, `label`, `tone: light\|dark` | none |
| `ClaimStamp` | `state: ClaimStamp` | none |

Not rebuilt: `Icon` (no icons), `Redaction` (unused), `DiagnosticForm` (hardcodes its own fields and
holds a `sent` boolean — read for field naming only), `SiteHeader`/`SiteFooter`/`ArticleRow` from the
DS (they use `href="#"` + `preventDefault` + `onNavigate`, the dead-control pattern Principle IV
forbids). `Declaration`, `PullQuote`, `OwnerRow`, `CaseMetric` are optional shape references.

## Adjudications carried from research.md D-07

1. **Declarations use per-page prototype clamps**, not `--type-display`/`--type-h1`. Home hero is
   `clamp(52px,7.6vw,134px)/0.84/-0.035em/900`. Do not override the DS tokens.
2. **Folio lines and status chips use `--type-label-sm` (11px) + `--weight-label` (600)**, not the
   `.dw-folio`/`.dw-label` role classes, which are 12px/400 and 13px/500.
3. Register hairlines are **not** interchangeable: `#D6CDB7` in Home §01/§03, `#C9C0AA` in §04.
   Match per section.
4. Alternating register grounds use bone-2 `#ECE3D0` only — bone-3 appears nowhere on Home.
5. Version marker renders **uppercase** in header and footer alike, wired to the build identity.
6. Home carries two discrete grid violations: the hero `-0.06em` inline-block pull and the §10 seam
   row (`margin-left:16px` **plus** `padding-left:24px`). Register-row offsets are pattern, not
   violation.

## Two CSS traps to solve once, before any page is built

```css
/* tokens set `h1..h6 { color: var(--fg-1) }`-style element rules: a dark section's
   `color` does NOT reach its heading. Solve per ground, never per instance. */
.band--ink h1, .band--ink h2, .band--ink h3 { color: var(--text-inverse); }

/* grid children default to min-width:auto, so a wide child grows its track past the
   viewport and the page scrolls horizontally at 320px. */
.split > *, .cols-2 > *, .cols-3 > *, .page-grid > * { min-width: 0; }
```

## Verification

| Assertion | Layer |
|---|---|
| No file under `src/` imports from `design-system/` or `mockups/` | unit (static check) |
| No `@import` of an external origin survives in the built CSS; no runtime third-party request | unit + E2E |
| Every `var(--…)` used in `src/` exists in the vendored token set (155-name allow-list from `_adherence.oxlintrc.json`) | unit |
| No `border-radius` above 3px anywhere; no `box-shadow` with a non-zero blur; no `gradient` | unit |
| Contrast meets AA on every band, and no light-on-orange text pairing exists | E2E |
