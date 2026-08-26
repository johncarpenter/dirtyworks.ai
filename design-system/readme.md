# Dirtyworks.ai Design System

**Territory:** `PROOF / WORK` · **Version:** 0.1 · **Compiled:** 2026-08-25

Dirtyworks.ai is a new Alberta company selling **managed knowledge and AI operations** — it connects a bounded set of approved company sources, makes answers verifiable, names owners, tests permissions, and then operates that system month over month. The brand promise is *"We do the work behind AI that works."* The market problem it names is *"Your company knows more than it can find."*

> **Content authority — sponsor clarification, 2026-08-25:** This system is authoritative only for visual foundations, tokens, components, interaction patterns, and layout behavior. All words, navigation, information architecture, offers, examples, metrics, and calls to action in its UI kits, templates, slides, and specimens are filler. Ignore them. For website content and structure, use [`../marketing-website-content-and-layout.md`](../marketing-website-content-and-layout.md).

Three audiences share one brand: direct SMB buyers (professional-services firms and energy-service companies in Alberta), the experienced employees who currently *are* the company search engine, and traditional MSP partners who want to add the practice without building the delivery method.

This design system exists so any agent or designer can produce website surfaces, decks, proposals and partner material that look and read like Dirtyworks.ai on the first attempt.

---

## Sources this system was built from

All inputs were markdown strategy documents in a mounted local folder named `documents/` (no codebase, no Figma file, no existing website). The reader may not have access; the paths are recorded for provenance.

| Source | What it supplied |
|---|---|
| `documents/marketing/creative-direction-and-design-brief.md` | The authoritative visual system: territory, colour tokens + hex + ratio, typography roles, composition rules, motion, surfaces, accessibility constraints, anti-reference list |
| `documents/marketing/brand-platform-and-voice.md` | Voice principles, personality sliders, vocabulary (owned / careful / rejected), message architecture, copy bank, proof labels |
| `documents/marketing/website-and-deck-content-blueprint.md` | Website IA + section-by-section copy, the **website component inventory** this system implements, deck narrative and slide archetypes |
| `documents/marketing/brand-and-message-strategy.md` | Brand thesis, tested message options, naming architecture |
| `documents/marketing/assets/proof-work-moodboard-v1.png` | Directional moodboard — colour, material, contrast, asymmetry, texture. Copied to `assets/moodboard/` |
| `documents/business-plan/offer-and-pricing-model.md` | Real offer names, scopes, durations and price hypotheses used in specimen copy |
| `documents/strategy/`, `documents/operations/`, `documents/tactics/` | Segment definitions, service model, and the fit / non-fit boundaries quoted in the UI kit |

**No logo, font binary, icon set, photography, or existing UI was supplied.** See *Gaps and substitutions* below.

---

## Index

**Foundations**
- `styles.css` — the single entry point consumers link. Imports only.
- `tokens/fonts.css` · `colors.css` · `typography.css` · `spacing.css` · `surfaces.css` · `motion.css` · `texture.css`
- `guidelines/*.html` — 23 specimen cards (Colors, Type, Spacing, Brand)
- `assets/moodboard/proof-work-moodboard-v1.png` — the directional moodboard

**Components** (`components/<group>/`)
- `core/` — **Button**, **Icon**, **Wordmark**
- `evidence/` — **ProofLabel**, **EvidenceRail**, **OwnerRow**, **ControlRegister**, **WorkOrder**, **CaseMetric**, **Redaction**
- `editorial/` — **Declaration**, **PullQuote**, **ArticleRow**
- `layout/` — **AnnotatedComparison**, **FitField**, **CTABand**, **SiteHeader**, **SiteFooter**
- `forms/` — **DiagnosticForm**

Each directory holds `<Name>.jsx`, `<Name>.d.ts`, `<Name>.prompt.md`, and one `@dsCard` HTML.

**UI kit**
- `ui_kits/website/` — the marketing site: five surfaces (WORK, METHOD, TRUST, FOR MSPs, NOTES) plus a contact surface, click-through. `README.md` inside.

**Slides**
- `slides/` — eight archetype slides at 1280×720 (`01-cover` … `08-decision`), `slides-kit.jsx`, `index.html` (all eight stacked).

**Templates** (`templates/<slug>/`) — what consuming projects start from
- `founder-deck/FounderDeck.dc.html` — six-slide 16:9 founder deck (cover, declaration, mechanism, comparison, quote, decision)
- `marketing-page/MarketingPage.dc.html` — web page: interruption hero + source strip, evidence register, managed comparison, hard CTA band

**Meta**
- `SKILL.md` — Agent Skills entry point
- `thumbnail.html` — project tile

---

## CONTENT FUNDAMENTALS

### The two archetypes
**The Operator** (accountable, practical, comfortable with unglamorous detail) and **The Constructive Provocateur** (names what others avoid, refuses false certainty). Not a rebel, not a cowboy consultant, not a cheerful SaaS mascot.

Position on the sliders that matter: **85% evidentiary** over promotional, **80% unorthodox** over conventional, **75% bold**, **75% plain-spoken**, **75% serious** (dry wit allowed; customer risk is never a joke).

### Sentence behaviour
- **Headlines:** 2–10 words, declarative, hard stop. *"AI was the easy part."* *"Somebody owns Monday morning."*
- **Openings:** one recognisable event or contradiction — never a category. Write *"The answer exists. Your team still cannot find it."*, not *"Organizations face growing knowledge-management challenges."*
- **Body:** short paragraphs, one mechanism each, 55–75 characters per line.
- **Fragments:** deliberate, not constant. *"Find it. Verify it. Use it."*
- **The long sentence:** used once, when accumulation is the point, then stop. *"A useful answer depends on the current source, the right access, a question the system understands, evidence a person can inspect, and someone accountable when any of that changes. That is the work."*
- **Punctuation:** periods, colons, slashes, brackets, occasional em dashes. No exclamation strings.
- **Contractions:** yes, naturally.

### Person and casing
- **"We"** when taking responsibility; **"Dirtyworks.ai"** when the brand must be explicit. Never "the company" in third person.
- **"Your team" / "your company"** — never "users" when addressing a buyer.
- Brand is **`Dirtyworks.ai`** in prose; lowercase `dirtyworks.ai` only in the wordmark.
- **Labels and proof marks are UPPERCASE:** `SOURCE`, `OWNER`, `VERIFIED`, `OPEN GAP`, `DO NOT AUTOMATE`.
- Display headings render uppercase via CSS but are **authored in sentence case** — do not title-case every heading.

### Vocabulary
**Own these:** work, managed, approved, source, evidence, answer, current, owner, permission, verify, reliable, gap, repair, operate, accountable, improve, change, useful, company knowledge, human decision, named responsibility.

**Use carefully, always with the specific:** *AI-powered* (say what the AI does), *secure* (name the control), *accurate* (define the question class), *automation* (describe action, approval, exception, rollback), *ROI* (show baseline, method, period).

**Never:** revolutionary, game-changing, unleash, unlock, harness, seamless, frictionless, magic, supercharge, transformative, cutting-edge, future-proof, autonomous workforce, replace employees, eliminate hallucinations, one-click, set-and-forget.

### Emoji
**No emoji. Anywhere.** Not in UI, not in decks, not in labels. The proof-label vocabulary (`SOURCE / 03`, `GAP / OPEN`) is the brand's equivalent of an emotive marker. Arrows (`→`, `↑`) are used sparingly in diagrams as structural glyphs, not decoration.

### Rewrite examples
| Generic | Dirtyworks.ai |
|---|---|
| Unlock the power of your organizational data. | Put approved company knowledge where the work happens. |
| A seamless AI-powered knowledge experience. | Ask the question. See the source. Know when the answer is missing. |
| Book a demo. | Show us the last answer your team had to chase. |
| Our solution eliminates information silos. | We connect a bounded set of approved sources and make the remaining gaps visible. |
| Enterprise-grade solutions for modern businesses. | A managed knowledge operation for companies too complex to keep asking around. |

### CTA policy
Named next actions only: *Show us where work gets stuck* · *Start with one question domain* · *Book a Knowledge Reliability Review* · *See the work behind the answer* · *Read the operating model* · *Design a partner pilot*. **Banned:** Get started, Learn more, Contact us.

### Claims policy
Every external claim must be a method claim, a scoped capability claim, a measured outcome with baseline/period/method/approval, an attributed customer statement, or dated market evidence. Any unvalidated number carries a visible `HYPOTHESIS — NOT MEASURED` stamp (`CaseMetric hypothesis`). Any invented example is labelled `ILLUSTRATIVE`.

---

## VISUAL FOUNDATIONS

### Design thesis: controlled irregularity
The underlying system is strict; the visible surface feels annotated, cropped, layered, revised and stamped. Irregularity is purposeful and repeatable. Evidence and ownership marks *are* the decoration. Reference world: *an independent editorial magazine, an industrial proofing desk, and an operations control room designed by the same exacting person.*

### Colour
Six colours, nothing more: `ink #11110F`, `bone #F3ECDD`, `signal-orange #FF5A1F`, `blueprint #2855FF`, `verified-acid #D8FF3E`, `steel #636760`. Target ratio **55 bone / 25 ink / 12 orange / 6 blueprint / 2 acid** — a guard against five-colour posters, not a per-page formula.

Meaning is fixed: **orange = action, friction, "work here."** **Blue = source, connection, explanation.** **Acid = verified, changed, resolved** — and must feel earned. Semantic red (`--error #C1200B`) exists for errors only and is not a brand colour. Maximum two ground colours per deck or page — bone and ink, with `--bone-2` as the third value step.

Hard rules: **never bone body text on orange** (2.2:1); ink text on orange is 7.4:1. Never encode a state by colour alone — the ProofLabel text carries the state.

### Type
Three roles, no fourth. **Archivo** (800/900) is architecture — declarations, headings, wordmark, uppercase, tracking −0.03em, line-height 0.86. **Instrument Serif italic** is the human countervoice — quotes, questions, annotations, counterpoints; never body copy, never luxury decoration. **IBM Plex Mono** is evidence and operations — uppercase labels at 11–14px with 0.12–0.18em tracking, folios, timestamps, and every button label.

Display type may occupy 20–45% of a viewport or slide. Body measure 55–75 characters. Body copy, forms, pricing and legal content are set in sans at 17–20px and never rotate, crop, or overlap.

### Backgrounds and imagery
Grounds are flat warm paper (`bone`) or flat carbon (`ink`) — **no gradients, ever**. Full-bleed bands alternate with quiet passages: oversized declaration → compact evidence field → quiet explanation → full-bleed diagram or photograph → hard conversion block.

Texture is **code-native** (`tokens/texture.css`): paper grain, halftone dot screen, carbon transfer drag, blueprint grid, registration drift, toner edge. It must be visible at display scale and disappear behind reading text — never on body copy or form inputs. No torn-paper scrapbook, no string-and-pin board, no grime.

**Photography direction** (none supplied yet): editorial documentary, 28–50mm, hard side light or direct flash, subjects absorbed in work rather than smiling at camera, hands marking and comparing, work surfaces with real artefacts, Alberta context via light and material. Tight crops that leave layout space; occasional monochrome halftone or single-colour duotone. Colour vibe: **warm and material**, not cool-toned tech. Banned: handshakes, boardroom lineups, holograms, glowing brains, robots, circuits, purple gradients, fake PPE staging.

### Corner radii, borders, cards
**Radius 0–3px only.** `--radius-0` for buttons, bands, and evidence chips; `--radius-1` (2px) for inputs and chips; `--radius-2` (3px) is the ceiling. There is no soft 16–24px card landscape in this brand.

Borders: `1px` hairline (`--rule`, warm), **1.5px ordinary**, 3px emphasis, 6px editorial rule above a declaration. Cards exist only for genuine comparison or containment — prefer **fields, bands, sheets, margins and cut-ins**. When a card is warranted it is a `--bone-3` sheet with a 1.5px ink border, square corners, and either no shadow or one hard offset.

### Shadows
**One hard offset shadow, or none.** `3px 3px 0 var(--ink)` on buttons, `6px 6px 0` on lifted sheets, orange/blueprint offsets for editorial emphasis. **Zero blur radius anywhere.** No ambient elevation, no glassmorphism, no glow.

### Transparency and blur
Effectively unused. Translucent planes and X-ray layering are borrowed from the `BLACK BOX / OPEN` territory **for motion and technical explanation only** — never as a UI surface treatment. No frosted panels, no backdrop-filter chrome. Where a dark field needs separation, use `--ink-2` and a `--ink-3` rule, not opacity.

### Protection: capsules, not gradients
Text over imagery sits on a **solid ink or bone capsule with square corners**, or in a margin beside the image. Protection gradients (the soft scrim) belong to the anti-reference list — they read as generic SaaS. If a photograph cannot carry a solid capsule, crop the photograph.

### Layout rules
12 columns desktop / 6 tablet / 4 mobile, 24px gutter, 1440px max, page margin `clamp(20px, 4vw, 80px)`. 8px implementation unit but rhythm is exposed through **large jumps: 16 / 32 / 64 / 128**.

Each page or slide gets **one** intentional grid violation, occasionally two: a hard offset of 8–24px (`--offset-hard`), a rotation between −3° and +3°, a display word cropped by up to 15%, or one element crossing columns. Never break alignment everywhere. Maintain generous quiet zones after dense evidence fields. Fixed elements: the site header is sticky with a persistent version marker; nothing else is pinned — no floating chat widget, no scroll-progress bar.

### Animation
Mechanical and deliberate, never elastic or playful. Durations 80 / 120 / 220 / 420 / 700ms; default easing `cubic-bezier(.2, 0, .1, 1)` (fast out, hard stop); `steps(6, end)` for incrementing folios, versions and timestamps. **No bounce, no spring, no overshoot.**

The four sanctioned motions: source fragments **slide into alignment** on scroll; a redaction bar **retracts** to reveal a more precise statement; a status **increments** (`OPEN GAP` → `OWNER NAMED` → `VERIFIED`); annotations **draw on** after primary content lands. Body text is never animated continuously. `prefers-reduced-motion` collapses everything to 1ms (already handled in `tokens/motion.css`).

### Hover and press
Hover **darkens the fill** (`--orange-press`, `--blueprint-press`) or fills a neutral with `--surface-sheet`; outlined and ghost variants gain a sheet background. Nav items gain a 3px orange underline. Rows gain a `--bone-2` background plus a 4px orange inset bar and shift 12px right. **No opacity fades, no lightening, no lift.**

Press **collapses the hard offset**: shadow goes to `1px 1px 0` and the element translates `1px, 1px` — it presses into the page. **No scale transforms.** Focus is a 3px `blueprint` ring (`--focus-ring`), or acid on dark fields. Disabled is 40% opacity with no shadow. Minimum target 44px.

---

## ICONOGRAPHY

**No icon set was supplied** — no icon font, no SVG sprite, no PNG glyphs. The creative brief also explicitly directs that brand marks, diagrams, icons and layout primitives be built as vectors or code rather than raster generations, and it lists a *motif* library rather than an icon library.

So this system runs two layers:

**1. The motif layer is primary.** Meaning is carried by typographic and geometric devices, not pictograms: bracketed source references `[01] [02] [03]`, redaction bars, proofreader underlines and strikes, file tabs, folios and timestamps, hard rules, registration targets, connector lines terminating in a named owner, and square-cornered evidence chips. These are specimened in `guidelines/brand-motifs.html` and implemented in `ProofLabel`, `Redaction`, `EvidenceRail`, `WorkOrder`. **Prefer a label over an icon** in every ambiguous case — that is the identity.

**2. Substituted pictogram set — FLAGGED.** Where a real glyph is unavoidable (form affordances, a nav toggle, a document marker), this system links **Material Symbols Sharp** from the Google Fonts CDN via `tokens/fonts.css`, wrapped by `components/core/Icon.jsx`. It was chosen because its corners are **square** (matching the 0–3px radius system) and its weight is variable (500 matches Archivo's optical weight). Lucide/Feather/Heroicons were rejected — round line caps and 8px-radius geometry contradict the surface rules.

Rules: weight 500, unfilled, 20–24px, `currentColor`. Never mix in a rounded or filled set. **Never emoji.** Unicode arrows (`→ ↑`) are permitted inside diagrams as structural connectors, not as UI affordances.

---

## Gaps and substitutions — needs your input

1. **Wordmark: Route 1, decided.** The lowercase working wordmark is the chosen direction — set in type by `components/core/Wordmark.jsx` (Archivo 900, tracking −0.035em, the period before `ai` in signal orange as a registration point). Usage rules — clear space, minimum size, placement, misuse — are specimened in `guidelines/brand-wordmark.html`.

   **Still a type setting, not a drawn mark.** No logo file was supplied and none has been invented; the component renders live type. A licensed vector wordmark should replace it, at which point only `Wordmark.jsx` and that one card need editing. Routes 2–4 (evidence brackets / correction mark / work-order stamp) are not pursued, and no secondary seal exists.
2. **No font binaries.** Archivo, Instrument Serif and IBM Plex Mono are named in the brief and loaded from the Google Fonts CDN. Self-host from `assets/fonts/` and swap the `@import` in `tokens/fonts.css` for `@font-face` before production, and verify deck-embedding rights.
3. **Icon set substituted** — Material Symbols Sharp, as above.
4. **No photography.** The photography direction is documented but no images exist; the UI kit and slides use type, fields and diagrams instead of image placeholders. No stock was invented.
5. **All numbers are illustrative.** Every metric in the UI kit and slides carries `HYPOTHESIS — NOT MEASURED` or `ILLUSTRATIVE`; the company has no customer results yet.

## Intentional additions

The website component inventory in the blueprint defines 13 components; all 13 are built. Six additions, each with a reason:

- **Button** — the brief specifies button behaviour (rectangular, high-contrast, specific labels) but the inventory has no primitive for it; every surface needs one.
- **Icon** — wrapper for the substituted glyph set, so the substitution lives in one file and can be swapped once.
- **Wordmark** — stands in for the absent logo, so the absence is consistent rather than improvised per file.
- **Redaction** — the brief's signature reveal motif, listed under graphic language rather than components; it needed a real implementation for the reveal to be reusable.
- **SiteHeader / SiteFooter** — the blueprint specifies nav items, the persistent folio/version device, and footer content; the UI kit cannot exist without chrome.
