# UI kit — Dirtyworks.ai marketing website

Click-through recreation of the marketing site defined in `documents/marketing/website-and-deck-content-blueprint.md`. There is no existing website; this kit builds the blueprint's information architecture and copy exactly as written, in the `PROOF / WORK` visual system. Nothing here is invented design — where the blueprint is silent (e.g. photography), the surface is left to type and fields.

> **Content status — sponsor clarification, 2026-08-25:** Treat this kit only as a visual, component, interaction, and layout-behavior reference. All copy, navigation, information architecture, offers, examples, metrics, and calls to action are filler. Ignore them rather than adapting or reconciling them. Use `documents/marketing/marketing-website-content-and-layout.md` for website content and structure.

## Files

| File | Contents |
|---|---|
| `index.html` | The app shell: nav, routing between six surfaces, footer. Also the `@dsCard` thumbnail and a `@startingPoint`. |
| `home-sections.jsx` | `Band` / `Folio` layout helpers plus homepage sections 01–03 (Hero, Problem, Contrarian). |
| `page-sections.jsx` | Sections 04–11 plus the NOTES index, reused across surfaces. |

## Surfaces

- **WORK** (home) — hero interruption with the source strip, the misaligned evidence register that aligns on scroll, the redaction reveal, the managed comparison, MSP lane, manifesto, conversion band.
- **METHOD** — the annotated work-order lifecycle with its five valid conclusions, the managed comparison, and three case metrics (all stamped as hypotheses).
- **TRUST** — stated limitations *before* credentials, the public control register, the incident-voice example, and both fit / non-fit fields.
- **FOR MSPs** — three partner models, the three-party responsibility seam, and the one-customer design pilot as a work order.
- **NOTES** — editorial index rows, six real article titles from the blueprint.
- **CONTACT** — the diagnostic form (stuck-event questions only; no documents, no sensitive data).

## Interactions

- Hero source strip animates from misaligned to aligned once, on load.
- Problem evidence rail aligns via `IntersectionObserver` at 30% visibility.
- Contrarian panel: click to retract the redaction; the six operating layers fade up from `--ink-3` to bone.
- Nav routes with scroll-to-top; the active item takes a 3px orange underline.
- The diagnostic form submits to a `RECEIVED / LOGGED` acid confirmation state.

## Composition notes

Every band is one of five rhythms (declaration / evidence field / quiet explanation / full-bleed diagram / hard conversion) and no two adjacent bands share a ground colour beyond bone→sheet steps. Each band carries at most one grid violation: the offer sheet is offset 16px, the MSP seam row is offset 16px, the work-order steps alternate. Body copy never rotates.

All components come from the design system's namespace — no primitive is re-implemented here.
