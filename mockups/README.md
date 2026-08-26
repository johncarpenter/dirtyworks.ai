# Handoff: Dirtyworks.ai marketing website (9 pages)

## Overview

A complete public marketing site for **Dirtyworks.ai**, an Alberta-based AI managed service provider (AI MSP). Nine pages: Home, Services, Catalogue, Method, Trust, For MSPs, About, Notes, Start (diagnostic form).

The site's job is to move a qualified buyer through four questions in order: (1) is this an MSP, a consultancy, or a product? (2) what does it actually manage? (3) can I trust it with company systems and information? (4) what do I do next? The primary conversion is `MAP YOUR AI STACK` → `/start`.

Content authority: the client's `marketing-website-content-and-layout.md` (v0.2, 2026-08-25). Visual authority: the **Dirtyworks.ai "PROOF / WORK" design system** (bundled under `design_files/_ds/`).

## About the design files

The files in `design_files/` are **design references created in HTML** — prototypes showing intended look, copy, and behavior. They are **not production code to copy directly**.

They are authored in a proprietary streaming "Design Component" format: each `*.dc.html` file contains a template between `<x-dc>` tags plus a logic class, interpreted at runtime by `support.js`. **Do not try to port that runtime.** Read the files as design specification — the markup shows exact structure, the inline `style` attributes show exact values.

The task is to **recreate these designs in the target codebase's environment** (React/Next, Astro, Vue, plain templates — whatever exists) using its established patterns. If no environment exists yet, choose the appropriate framework; a static-site generator suits this content (nine mostly-static marketing pages plus one form).

To view a page as designed, open any `design_files/*.dc.html` in a browser with the sibling `support.js`, `ds-base.js`, and `_ds/` folder present.

## Fidelity

**High fidelity.** Final colors, typography, spacing, copy, and states. Recreate pixel-accurately using the design system's tokens. All colors, type sizes, and spacing values are literal in the inline styles — lift them exactly.

One deliberate exception: **imagery**. No photography is placed anywhere. The design is type-, register-, and field-led by direction. Do not add stock photography without the client's approval; the design system's photography direction (`assets/photography/` in the full DS project, not bundled here) has generated candidates only, licensed for editorial use.

---

## Design tokens

The bundled `_ds/…/tokens/*.css` files are the source of truth and can be used verbatim. Key values:

### Colors — six brand colors, nothing more

| Token | Hex | Meaning |
|---|---|---|
| ink | `#11110F` | primary text, dark grounds |
| ink-2 (dark surface) | `#1A1A17` | raised panels on ink |
| ink rule (dark) | `#2A2A26` | hairlines on ink |
| bone | `#F3ECDD` | primary page ground |
| bone-2 | `#ECE3D0` | alternate band ground |
| bone-3 | `#E3D9C4` | third step / alternating rows |
| sheet | `#FBF7EE` | card and input fill |
| rule (light) | `#D6CDB7`, `#C9C0AA`, `#E0D7C2` | hairlines, warm |
| signal-orange | `#FF5A1F` | **action, friction, "work here"** |
| blueprint | `#2855FF` | **source, connection, explanation** |
| verified-acid | `#D8FF3E` | **verified, changed, resolved** — must feel earned |
| steel | `#636760` | muted labels |
| muted-2 | `#8B8E86` | dimmest mono labels |
| body-muted | `#3A3A34` | secondary body on light |

Target ratio across a page: ~55 bone / 25 ink / 12 orange / 6 blueprint / 2 acid. Max two ground colors per page.

**Hard accessibility rules:** never bone (light) body text on orange — 2.2:1. Ink on orange is 7.4:1 and is the only permitted combination. Never encode state by color alone: every status chip carries its state as text (`GAP / OPEN`, `MANAGED`, `VERIFIED`).

### Typography — three roles, no fourth

| Role | Family | Usage |
|---|---|---|
| Display | **Archivo** 800/900 | headings, wordmark, all-caps labels. `letter-spacing: -0.03em` to `-0.04em`, `line-height: 0.84–0.94`, `text-transform: uppercase` |
| Countervoice | **Instrument Serif**, italic | pull quotes, annotations, closing lines, operating-emphasis column. Never body copy |
| Evidence | **IBM Plex Mono** | uppercase labels 10–13px, `letter-spacing: 0.10–0.18em`, folios, timestamps, status chips, every button label |
| Body | design system `--font-sans` | body copy 16–19px, `line-height: 1.45–1.52`, `text-wrap: pretty`, measure 44–64ch |

Headings are authored in sentence case and uppercased by CSS. Display type may occupy 20–45% of a viewport.

Font loading: `_ds/…/tokens/fonts.css` pulls Archivo, Instrument Serif, IBM Plex Mono and Material Symbols Sharp from the Google Fonts CDN. **Self-host before production** and verify licensing.

### Spacing, radius, borders, shadows

- Page margin: `clamp(20px, 4vw, 80px)`. Max content width: `1440px`. Grid: 12 col desktop / 6 tablet / 4 mobile, 24px gutter.
- Section padding: `clamp(48px, 7vw, 120px)` vertical. Rhythm exposed in large jumps: 16 / 32 / 64 / 128.
- **Border radius 0–3px only.** `0` for buttons, bands, chips; `1px` inputs; `2px` status chips; `3px` ceiling. There is no soft-card landscape in this brand.
- Borders: `1px` hairline, `1.5px` ordinary, `3px` emphasis (accent inset bars), `6px` editorial rule (above hero / manifesto).
- **Shadows: one hard offset or none. Zero blur, ever.** `3px 3px 0 #11110F` on buttons; `6px 6px 0 #11110F` on lifted sheets; `6px 6px 0 #FF5A1F` for editorial emphasis (used on the co-managed card and the Start confirmation panel). No ambient elevation, no glassmorphism, no glow.
- No gradients anywhere. Grounds are flat.

### Motion

Durations 80 / 120 / 220 / 420 / 700ms. Default easing `cubic-bezier(.2, 0, .1, 1)` — fast out, hard stop. `steps(6, end)` for incrementing folios/timestamps. **No bounce, spring, or overshoot.** `prefers-reduced-motion` collapses to 1ms (handled in `tokens/motion.css`).

Sanctioned motions only: source fragments slide into alignment on scroll (the homepage EvidenceRail does this); a redaction bar retracts to reveal a more precise statement; a status increments (`OPEN GAP` → `OWNER NAMED` → `VERIFIED`); annotations draw on after primary content lands. Body text is never animated.

### Hover and press

- Hover **darkens the fill** or fills a neutral with the sheet color. Nav items gain a 3px orange underline. Register rows gain a bone-2 background plus a 4px orange inset bar and shift 12px right. **No opacity fades, no lightening, no lift.**
- Press **collapses the hard offset**: shadow to `1px 1px 0`, element translates `1px, 1px`. **No scale transforms.**
- Focus: 3px `#2855FF` ring (acid on dark fields).
- Disabled: 40% opacity, no shadow. Minimum target 44px.

---

## Shared chrome

### SiteHeader

Sticky, `z-index: 50`, bone ground, `border-bottom: 1.5px solid #11110F`, height 76px, inner max-width 1440px with page margin, `display:flex; align-items:center; gap:24px`.

Order: wordmark (links home) · nav (margin-left auto, `gap:20px`, `white-space:nowrap`) · primary action · version marker.

- **Wordmark:** Archivo 900, 22px, `letter-spacing:-0.035em`, lowercase `dirtyworks.ai` with the **period in signal orange** as a registration point. This is a type setting, not a supplied logo file — if a licensed vector wordmark arrives, it replaces this in one place.
- **Nav:** IBM Plex Mono 12px/600, `letter-spacing:0.12em`, uppercase. Items: SERVICES · CATALOGUE · METHOD · TRUST · FOR MSPS. Inactive `#636760`; active is full ink with `padding-bottom:4px; border-bottom:3px solid #FF5A1F`.
- **Primary action:** orange fill, ink text, `1.5px solid #11110F`, `box-shadow:3px 3px 0 #11110F`, `padding:11px 16px`, mono 12px/600 uppercase, `white-space:nowrap`. Label `MAP YOUR AI STACK` (`DESIGN A PARTNER PILOT` on For MSPs). On Start it becomes a non-link ink pill reading `START`.
- **Version marker:** mono 11px `#8B8E86`, `SITE / 0.2`. Persistent folio device — not a certification mark. Wire it to the deploy date or build version.

**Mobile order (not yet built — build it):** wordmark, menu control, then the persistent primary action *inside* the opened menu. No floating screen button, no floating chat widget, no scroll-progress bar. Nothing else on the site is pinned.

### SiteFooter

Ink ground `#11110F`, bone text, padding `clamp(56px,7vw,104px) clamp(20px,4vw,80px) 36px`.

Top row: `grid-template-columns: minmax(280px,1.3fr) repeat(3, minmax(140px,1fr))`, `gap:48px`, `padding-bottom:56px`, `border-bottom:1px solid #2A2A26`.
- Col 1: wordmark at `clamp(30px,3.4vw,56px)`; brand promise in Instrument Serif italic 24px ("We do the work behind AI that works."); then mono 11px location + email (`Calgary, Alberta / Canada`, `hello@dirtyworks.ai`).
- Cols 2–4: `SERVICE` (Services, Catalogue, Method, Trust) · `COMPANY` (For MSPs, About, Notes, Map your AI stack) · `LEGAL` (Privacy, Terms, Accessibility — currently non-links, pending legal copy).

Bottom row: `padding-top:24px`, mono 11px `#8B8E86`, space-between: `Customer-owned by default. Human accountability stays human.` and `Site / 0.2 — 2026-08-25`.

**Note:** the col-1 minimum of 280px is load-bearing — the wordmark clamp overflows narrower tracks and collides with the next column. Do not switch to `auto-fit`.

**No newsletter form in the footer** until there is a real publishing cadence and consent workflow.

---

## Recurring pattern vocabulary

These composites repeat across pages; build them once as components.

1. **Folio line** — section marker above every heading: `display:flex; align-items:center; gap:14px`, a `1.5px × 40px` orange rule, then mono 11px/600 `letter-spacing:0.18em` uppercase `#636760` (`#8B8E86` on ink). Example: `03 / WHAT WE OPERATE`.
2. **Declaration** — oversized Archivo 800/900 heading, uppercase, `line-height 0.84–0.92`, negative tracking. One word or phrase may take signal orange. Hero sizes `clamp(46px,7vw,126px)`; section headings `clamp(30px,3.6vw,64px)`.
3. **Register row** — the workhorse. A CSS grid row with a mono label column, a body column, and a mono or serif detail column, separated by `1px` hairlines with a `1.5px` ink rule top and bottom. Alternating rows take a bone-2/bone-3 background **and** `padding-left:24px` — that 24px offset is the deliberate irregularity, not decoration. Never convert these into rounded feature cards.
4. **Status chip** — mono 11px/600 `letter-spacing:0.12em` uppercase, `border-radius:2px`, `padding:4px 8px`. Palette by meaning: acid + 1px ink border = verified/standard/managed; blueprint fill + bone text = source/registered/monitored/method; orange fill + ink text + ink border = gap/illustrative/stop; bone sheet + ink border = neutral/conditional/candidate.
5. **Evidence rail** — the homepage problem section; DS component. Fragments begin misaligned and resolve into an aligned register on scroll.
6. **Annotated comparison** — two fields, left column struck through, one `decisive` row filled with acid. Used once on Home (`ACCESS IS NOT THE SERVICE`) with the renewal row decisive.
7. **Work order** — vertical numbered lifecycle with per-step marks and a loop label returning improvement to review. DS component on Home; hand-built as a 5-column expanded grid on Method.
8. **Control register** — DS component. Rows of control / mechanism / holder / state + status. Public extract on Home (7 rows), full register on Trust (12 rows).
9. **Fit field** — DS component. Segment, summary, `included[]`, `excluded[]`. Exclusions are content, not a disclaimer — render them with equal weight.
10. **CTA band** — DS component. Full-bleed hard conversion block: folio, heading, support line, primary + secondary action. Closes every page.
11. **Claim stamp** — mono chip marking claim state: `ILLUSTRATIVE`, `VERIFY AT QUOTE`, `HYPOTHESIS — NOT MEASURED`, `OPEN GAP`, `LEGAL REVIEW`. **These must survive into production.** See "Claim discipline" below.

### Grid violation rule

Each page gets **one** intentional violation, occasionally two: a hard offset of 8–24px, a rotation between −3° and +3°, a display word cropped up to 15%, or one element crossing columns. In this build the violation is usually a negative `margin-left:-0.05em` on a hero's second line (pulling the display word off the left edge), plus the alternating register-row offsets. The For MSPs "co-managed" card uses `transform: translateY(-8px)` with an orange offset shadow. **Never break alignment everywhere.** Keep generous quiet zones after dense evidence fields.

---

## Pages

Every page: sticky header → hero with `border-bottom: 6px solid #11110F` → alternating bone / bone-2 / ink bands → CTA band → ink footer. Bands are separated by `1.5px solid #11110F`.

### 1. Home — `MarketingPage.dc.html`

Route `/`. Title `Dirtyworks.ai | Managed AI operations for Alberta businesses`. Meta description: `An AI MSP for product selection, account and user management, training, integrations, knowledge, governance, monitoring, support, and cost control.`

Twelve sections in order:

| # | Section | Content and layout |
|---|---|---|
| 01 | Hero | Folio `DIRTYWORKS.AI / MANAGED AI OPERATIONS`. Display: "AI IS ALREADY AT WORK. / IS ANYONE **OPERATING** IT?" (`operating` orange, offset `-0.06em`). Support paragraph at `clamp(19px,1.5vw,28px)`. Actions: `MAP YOUR AI STACK` (primary lg) + `SEE WHAT WE MANAGE` (secondary lg). Right column (`minmax(300px,1fr)`): `AI PORTFOLIO / ILLUSTRATIVE` register — 4 rows of product+owner+access+cost / status chip (MANAGED acid, REGISTERED blueprint, MONITORED blueprint, GAP / OPEN orange with a 3px orange left border). Caption: "Register shown to demonstrate the work. Not customer data." |
| 02 | Problem | Folio `02 / THE UNMANAGED STACK`. Heading "ANOTHER LICENCE IS NOT AN OPERATING MODEL." + two paragraphs. Right: EvidenceRail, 7 illustrative events, every one chipped `ILLUSTRATIVE`. Ground bone-2. |
| 03 | What we operate | Folio `03`. Heading "THE TOOL IS ONE LINE ITEM. THIS IS THE SERVICE." Eight register rows: mono orange label (`PORTFOLIO / SELECTED` … `COST / CONTROLLED`), public copy, typical records in mono. Alternating offset rows. Closes with an Instrument Serif line: "You keep the company decisions. We keep the operating work from disappearing between vendors, employees, IT, and policy." |
| 04 | Governed catalogue | Folio `04`. Heading "CHOOSE THE TOOLS. KEEP ONE OPERATING MODEL." Two paragraphs on resale vs. administration. Right: 7 menu rows (WORK/FIND/MAKE/BUILD/MOVE/HOLD/WATCH) — Archivo 26px menu word, job + candidate product names in mono, operating emphasis in blueprint serif. Product disclaimer in mono. Actions: `COMPOSE A PRODUCT MIX`, `SEE THE CATALOGUE METHOD`. Candidate names are **text, never a logo cloud**. |
| 05 | Comparison | Folio `05 / ACCESS VERSUS OPERATION`. Heading "ACCESS IS NOT THE SERVICE." AnnotatedComparison, 7 rows, renewal row `decisive`, margin annotation "The renewal row is where the money is." |
| 06 | Knowledge | **Ink band.** Folio `06 / THE COMPANY MEMORY`. Heading "YOUR AI CAN ONLY RELY ON WHAT THE COMPANY ACTUALLY OWNS." Two paragraphs, then the proof sequence as chips with `→` connectors: SOURCE / APPROVED → OWNER / NAMED → PERMISSION / TESTED → ANSWER / SUPPORTED (acid) → GAP / OPEN (orange) → CHANGE / LOGGED (outlined). Action `SEE HOW KNOWLEDGE IS OPERATED` (evidence variant). Right: serif pull quote, orange left border — "'I don't know' is a feature when the alternative is confident use of the wrong source." |
| 07 | Method | Folio `07 / FROM STACK TO SERVICE`. Heading "MAP IT. DEPLOY IT. OPERATE IT." Sticky left column with the stop-condition note. Right: WorkOrder, 7 steps with marks and two serif annotations, loop label "Operate returns to map and design". |
| 08 | Trust | Bone-2. Folio `08 / TRUST IS OPERATED`. Heading "COMPLIANCE IS NOT A STICKER." Two paragraphs including the explicit non-certification statement. Right: ControlRegister, 7-row public extract, note "Customer-owned by default. Human accountability stays human." |
| 09 | Fit | Folio `09 / INITIAL FIT`. Heading "START WHERE THE WORK IS VALUABLE AND THE BOUNDARY IS CLEAR." Two FitFields side by side (professional services, energy services), then one full-width (traditional MSPs). |
| 10 | MSP lane | **Ink band.** Folio `10 / FOR MSPs`. Heading "KEEP THE ACCOUNT. ADD THE AI PRACTICE." Two paragraphs. Right: three-party responsibility seam — MSP (blueprint), Dirtyworks.ai (orange, offset 24px with a 3px orange left border and `#1A1A17` fill — the section's violation), Customer (acid). Action `DESIGN A PARTNER PILOT` (lg). |
| 11 | Manifesto | Bone-2, `border-top: 6px solid #11110F`. Display "NO THEATRE. / NO MYSTERY. / WORK THAT **WORKS**." — `works` on an acid highlight, the only acid on the page besides status chips. Right: short paragraph, then the 14 work nouns as a mono run, then serif "That is the dirty work. That is the service." |
| 12 | Conversion | CTABand, folio `12 / MAP THE CURRENT STATE`, heading "SHOW US WHAT IS ALREADY IN THE STACK.", support naming six candidate events, actions `MAP YOUR AI STACK` + `DESIGN AN MSP PILOT`. Immediately below on ink: the safety note ("Do not send customer records, credentials, private documents, employee information, or other sensitive data through the website form.") above a `1px #2A2A26` rule. |

### 2. Services — `Services.dc.html`

Route `/services`. Title `AI managed services | Dirtyworks.ai`.

- **Hero:** "THE TOOL IS ONE LINE ITEM. / THIS IS THE **SERVICE**." + lifecycle support paragraph + `MAP THE MANAGED SCOPE`.
- **Scope register (bone-2):** eight rows, each a 3-column grid — mono orange label + service name (19px/700) · what's included · **boundary** in a `3px solid #FF5A1F` left-bordered cell with a mono `BOUNDARY` caption. The boundary column is the point of the page; give it equal visual weight. Alternating offset rows.
- **Engagement path:** five stages (REVIEW / DEPLOY / OPERATE / EXTEND / RENEW / EXIT), Archivo 24px stage name · public description · commercial treatment in blueprint serif. OPERATE row highlighted bone-2. Closing mono note: prices unpublished until the rate card is supported.
- **Responsibility boundary (ink):** heading "MANAGED DOES NOT MEAN UNBOUNDED." Three panels on `#1A1A17`, each with a 3px top border — Dirtyworks.ai operates (orange), the customer owns (acid), the MSP or IT provider may own (blueprint).
- **CTA:** "WHAT SHOULD SOMEBODY OWN BY MONDAY MORNING?"

### 3. Catalogue — `Catalogue.dc.html`

Route `/catalogue`. Title `Managed AI product catalogue | Dirtyworks.ai`.

- **Hero:** "CHOOSE THE TOOLS. / KEEP ONE **OPERATING MODEL**." + `COMPOSE A PRODUCT MIX`.
- **Approval questions (bone-2):** "A GOVERNED SHORTLIST. NOT AN OPEN APP STORE." Five rows, each a blueprint chip (`JOB / DEFINED`, `OWNER / NAMED`, `PATH / VERIFIED`, `CONTROL / ASSESSED`, `SERVICE / SCOPED`) plus the question at 18px.
- **Product menu:** seven expanded category rows — Archivo 34px menu word + mono operating tier (Register / Manage / Operate) · job title, prerequisites, candidate product names in mono · state chip (Standard acid / Conditional or Candidate bone-sheet), purchase route in mono, operating emphasis in blueprint serif. Alternating offset. Actions `ADD TO DRAFT PORTFOLIO` + `ASK ABOUT THIS CATEGORY` with a mono note: no prices, no buy button, the configurator is not a live application. **Do not add a buy button or per-seat pricing.**
- **Commercial route (ink):** "WHO SENDS THE SOFTWARE INVOICE DOES NOT DEFINE THE SERVICE." Four panels (customer-direct, authorized resale, customer cloud/marketplace, customer-owned managed deployment), then a serif boundary line on resale authority.
- **Quote sheet (bone-2):** an `ILLUSTRATIVE`-stamped composer output as a hard-shadowed sheet — 9 label/value rows; commercial values read `VERIFY AT QUOTE — CUSTOMER-DIRECT` or `SCOPED AT REVIEW` in orange mono rather than numbers.
- **CTA:** "BRING THE PRODUCTS YOU ALREADY HAVE. ADD ONLY WHAT THE WORK REQUIRES."

### 4. Method — `Method.dc.html`

Route `/method`. Title `Managed AI operating method | Dirtyworks.ai`.

- **Hero:** "GOOD AI OPERATIONS BEGIN BEFORE THE **LOGIN**."
- **Lifecycle (bone-2):** the seven steps expanded into a 5-column grid — step name (Archivo 30px + mono step number) · inputs · work performed · customer decision · output + a gate chip. Gate chips: blueprint for review gates, orange for the stop gate at APPROVE, acid for the release gate at STABILIZE, outlined `LOOP → MAP / DESIGN` at OPERATE, outlined `CLEAN REMOVAL` at RENEW OR EXIT. Alternating offset.
- **Valid outcomes (ink):** "SELLING ANOTHER TOOL IS NOT THE REQUIRED OUTCOME." Six outcome chips — DEPLOY (acid), CONSOLIDATE / REPAIR FIRST / USE A SIMPLER TOOL (blueprint), KEEP IT HUMAN (outlined), STOP (orange).
- **Monthly record (bone-2):** an `ILLUSTRATIVE` hard-shadowed sheet, `repeat(auto-fit, minmax(240px,1fr))` of ten labelled fields; the last ("next improvement / owner") carries a 3px orange left border.
- **CTA:** "START WITH THE LAST THING THAT FAILED, COST TOO MUCH, OR HAD NO OWNER."

### 5. Trust — `Trust.dc.html`

Route `/trust`. Title `AI governance, controls, and operating boundaries | Dirtyworks.ai`.

- **Hero:** "TRUST IS A RECORD OF **WORK**." + the no-logo-makes-you-trustworthy paragraph.
- **Limitations first (ink):** "WHAT WE DO NOT PROMISE." Eight numbered lines on `#1A1A17` panels, plus the serif pull quote "'I don't know' is a feature." **This section comes before the control register by design — do not reorder it.**
- **Control register (bone-2):** the full 12-row ControlRegister with the note "Customer-owned by default. Human accountability stays human. Nothing in this register is a legal or regulatory certification."
- **Compliance readiness:** "WE OPERATE CONTROLS. WE DO NOT SELL A COMPLIANCE STICKER." + the specialist-coordination paragraph.
- **Incident voice (ink):** an `ILLUSTRATIVE INCIDENT VOICE`-stamped timeline — four timestamped entries with colored left borders (orange, orange, blueprint, acid): signal received → scope contained → evidence preserved → owner named. Explicitly labelled as voice and sequence, **not a historical event**.
- **Exit (bone-2):** "DEPENDENCE SHOULD COME FROM VALUE. NOT CAPTIVITY." + exit-package paragraph + six chips ending in an acid `ACCESS REMOVED`.
- **CTA:** "WRITE THE RESPONSIBILITY SEAM BEFORE PRODUCTION."

### 6. For MSPs — `ForMSPs.dc.html`

Route `/msps`. Title `Managed AI operations for MSP partners | Dirtyworks.ai`. Header action becomes `DESIGN A PARTNER PILOT`.

- **Hero:** "KEEP THE ACCOUNT. / ADD THE **AI PRACTICE**."
- **What the practice adds (bone-2):** eight numbered items in a `repeat(auto-fit, minmax(300px,1fr))` hairline grid.
- **Three models:** three sheets with hard offsets — Referral and White-label with ink shadows, **Co-managed with an orange `6px 6px 0 #FF5A1F` shadow and `translateY(-8px)`** (the page's violation). Each: customer relationship / our visibility / working seam. Closing mono note: no discounts or wholesale percentages before partner validation.
- **Responsibility seam (ink):** a 10-row × 3-party matrix (MSP blueprint, Dirtyworks.ai orange, Customer acid) with a mono header row. The "AI account and product configuration" row is offset 24px on `#1A1A17` with an orange left border. Cells carry words (`OWNS`, `LEAD`, `PER MODEL`, `ESCALATION`, `—`), never color alone.
- **One-customer pilot (bone-2):** "PROVE THE SEAM WITH ONE CUSTOMER." Seven numbered steps ending in "Repeat, revise, or stop."
- **CTA:** "BRING ONE CLIENT. WRITE DOWN WHO OWNS WHAT."

### 7. About — `About.dc.html`

Route `/about`. Title `About Dirtyworks.ai | Operator-led managed AI services`.

- **Hero:** "BUILT BY AN OPERATOR. / FOR THE WORK **AFTER THE DEMO**."
- **Provisional founder copy (bone-2):** three paragraphs, no name, no photograph. Beside it, a bordered sheet stamped `OPEN GAP` listing the seven sponsor inputs still required (founder name and title, employment history, verifiable achievements, credentials, approved photograph, legal entity, why Alberta) and a serif line: "Relevant operating evidence is stronger than 'visionary.'"
- **Operating beliefs (ink):** seven numbered display-type beliefs, each on its own hairline row.
- **CTA:** "BRING US THE OPERATING PROBLEM. NOT THE AI PITCH."

**Implementation note:** the `OPEN GAP` panel is a production annotation. Replace it with real founder content, or hold the page back — do not ship the panel publicly and do not invent biography.

### 8. Notes — `Notes.dc.html`

Route `/notes`. Title `Notes on managed AI operations | Dirtyworks.ai`. Editorial index, **not blog cards**.

- **Hero:** "NOTES ON THE WORK BEHIND AI." + a publishing-state panel explaining that three notes are in preparation and the rest of the queue is a commitment, not links.
- **First three (bone-2):** three rows — index number · title (Archivo up to 38px) · thesis in Instrument Serif · a blueprint `METHOD` chip + `IN PREPARATION`.
- **Queue:** items 04–12 in two hairline columns, number + title only, with a closing mono note: "Queue only. No links, dates, or reading times until the note is written."
- **CTA:** "HAVE A BETTER QUESTION THAN THE ONES ON THIS LIST?"

**Do not fabricate dates or reading times.** They appear only when a note actually exists. Three complete articles beat twelve empty links.

### 9. Start — `Start.dc.html`

Route `/start`. Title `Map your AI stack | Dirtyworks.ai`. The site's single conversion surface.

- **Hero:** "SHOW US WHAT IS ALREADY IN THE **STACK**." + the one-recent-event paragraph.
- **Form (bone-2):** a hard-shadowed sheet, header strip `OPERATING GAP / INTAKE`. One column of fields, persistent labels above inputs, required fields marked with an orange `*`.
  - Required: Name, Company, Role, Work email (2-up grid) · What was somebody trying to do? (textarea) · What happened? (textarea) · Product or system involved, Who owns it today (2-up).
  - A hairline `OPTIONAL CONTEXT` divider, then: company size, current AI products or categories, people using them, existing environment, existing MSP relationship, preferred way and time to respond.
  - "What do you need?" as ten selectable chips (product selection, user administration, training, support, integration, governance, monitoring, cost control, knowledge, MSP partnership). **Currently static — implement as real multi-select checkboxes with 44px targets.**
  - Consent/safety block: bone ground, 3px orange left border, mono `DO NOT SEND` caption, the full sensitive-data warning, and a mono `LEGAL REVIEW — CONSENT WORDING PENDING` stamp.
  - Submit: `LOG THE OPERATING GAP` (primary lg) plus a mono note "Mockup — no data is sent" (remove on wiring).
- **Confirmation state:** replaces the form. Ink panel, orange hard offset, acid `RECEIVED / LOGGED` chip, heading "THE GAP IS ON THE RECORD.", the paragraph "We will review the event and respond using the contact details provided. Sending this form does not create a service relationship or authorize access to company systems.", and a `LOG ANOTHER GAP` secondary action returning to the form.
- **Sidebar (sticky, `top:108px`):** an ink "what happens next" panel (three numbered steps ending "If it does not, we say so. Stop is a valid outcome.") and a bone-sheet partner-enquiry panel linking to For MSPs.

**Form implementation requirements:** one column, persistent labels, visible inline errors (semantic red `#C1200B` — errors only, not a brand color), 44px minimum targets, 3px blueprint focus ring. Add server-side validation, spam/abuse protection, and a real data path. The consent wording is subject to legal review before launch.

---

## Interactions & behavior

### State

Only one page holds real state: **Start** — a single boolean (`submitted`) switching between the form and the confirmation panel. Everything else is static content with hover/focus states and one scroll-triggered alignment animation (homepage EvidenceRail).

Real implementation adds: form field state, validation errors, submit-in-flight, submit failure, and the multi-select "what do you need?" chips.

### Navigation

Flat: every page reachable from header nav and footer. CTA bands route as follows.

| From | Primary → | Secondary → |
|---|---|---|
| Home | `/start` | `/msps` |
| Services | `/start` | `/method` |
| Catalogue | `/start` | `/services` |
| Method | `/start` | `/trust` |
| Trust | `/start` | `/services` |
| For MSPs | `/start` | `/trust` |
| About | `/start` | `/method` |
| Notes | `/start` | `/services` |
| Start | — | `/msps` |

The prototypes link by filename (`Services.dc.html`); map to real routes: `/`, `/services`, `/catalogue`, `/method`, `/trust`, `/msps`, `/about`, `/notes`, `/start`.

### Responsive behavior — specified but NOT built

The prototypes are desktop-first with fluid clamps; they hold to roughly tablet width. **Mobile is unbuilt and must be implemented** against these content rules:

- Preserve headline meaning before extreme scale. Never crop a word needed to understand the offer.
- Registers become stacked records with the label above the value. **No horizontal scrolling for core content** — this applies to the Services boundary column, the MSP seam matrix, and the Catalogue menu.
- Comparisons stack row by row as `Product access` then `Managed AI operations`, preserving the pairing.
- Work-order steps stay numbered and sequential.
- Product categories become accordion/editorial rows: default state shows job + operating emphasis, candidate products expand.
- CTA labels stay specific. They may wrap to two lines. **Never shorten to `START` or `MORE`.**
- Forms: one column, persistent labels, visible errors, 44px targets.
- Mobile footer keeps legal and contact information even if editorial links collapse.
- Hero order on mobile: declaration, support, actions, then the register.

---

## Content and copy discipline

The copy is not placeholder. It was written to a voice specification and every line is load-bearing.

- **Headlines:** 2–10 words, declarative, hard stop. Authored in sentence case, uppercased by CSS — do not title-case.
- **Openings** name a recognisable event or contradiction, never a category.
- **Never use:** revolutionary, game-changing, unleash, unlock, harness, seamless, frictionless, magic, supercharge, transformative, cutting-edge, future-proof, autonomous workforce, replace employees, eliminate hallucinations, one-click, set-and-forget.
- **Banned CTAs:** `GET STARTED`, `LEARN MORE`, `BOOK A DEMO`, `CONTACT US`, `TALK TO SALES`. Only named next actions.
- **No emoji anywhere** — not in UI, not in labels. The proof-label vocabulary is the brand's emotive marker. `→` and `↑` are permitted inside diagrams as structural connectors only.
- Labels and proof marks are UPPERCASE. Brand is `Dirtyworks.ai` in prose; lowercase only in the wordmark. "We" when taking responsibility; "your team" / "your company", never "users".

### Claim discipline — carry this into production

| State | Treatment | Where it appears |
|---|---|---|
| `ILLUSTRATIVE` | keep the stamp visible | Home hero portfolio and evidence rail, Catalogue quote sheet, Method monthly record, Trust incident sequence |
| `VERIFY AT QUOTE` | publish the boundary, not a promise | Catalogue product names and commercial rows, Services engagement path, For MSPs economics |
| `OPEN GAP` | unresolved content, not for public launch | About founder inputs |
| `LEGAL REVIEW` | publish only after review | Start consent copy; privacy/terms/accessibility footer links are inert placeholders |
| `EVIDENCE REQUIRED` | do not publish as fact | any savings, accuracy, adoption, or customer-outcome number — **there are none anywhere in this build, deliberately** |

No prices, no customer logos, no testimonials, no metrics, no certifications appear anywhere. Do not add them. Any future metric needs baseline, period, method, and source attached, or a visible `HYPOTHESIS — NOT MEASURED` stamp.

Boundary claims that must survive rewording: "provide access" means authorized resale *or* administration of a customer-direct account; "compliance" means proportional controls and coordination, never certification; "monitoring" is scoped to the contract, never a vendor-uptime guarantee; "support" covers the managed AI scope only.

---

## Assets

- **No images, icons, or photography** are used. Everything is type, rules, fields, and CSS.
- **Fonts:** Archivo, Instrument Serif, IBM Plex Mono via Google Fonts CDN (`_ds/…/tokens/fonts.css`). Self-host before production.
- **Icons:** none in this build. If a glyph becomes unavoidable, the design system specifies **Material Symbols Sharp** (weight 500, unfilled, 20–24px, `currentColor`) for its square corners. Never mix in a rounded or filled set. Prefer a mono label over an icon in every ambiguous case — that is the identity.
- **Wordmark:** live type, not a vector file. A licensed wordmark should replace it in one component.
- **Texture:** `tokens/texture.css` provides code-native paper grain, halftone, blueprint grid and registration drift. Unused in this build; available if a surface needs it. Never on body copy or form inputs.

## Files

```
design_files/
  MarketingPage.dc.html   Home (12 sections)
  Services.dc.html        Services
  Catalogue.dc.html       Catalogue
  Method.dc.html          Method
  Trust.dc.html           Trust
  ForMSPs.dc.html         For MSPs
  About.dc.html           About
  Notes.dc.html           Notes
  Start.dc.html           Start / diagnostic form
  support.js              design-component runtime (reference only — do not port)
  ds-base.js              loads the design-system bundle
  _ds/dirtyworks-ai-design-system-.../
    styles.css            single stylesheet entry point
    tokens/*.css          colors, fonts, typography, spacing, surfaces, motion, texture
    _ds_bundle.js         compiled design-system components
    _ds_manifest.json     component inventory
    readme.md             full design-system guide
```

Design-system components referenced by the pages: `Button`, `EvidenceRail`, `AnnotatedComparison`, `WorkOrder`, `ControlRegister`, `FitField`, `CTABand`. Their compiled source is in `_ds_bundle.js`; read it for exact internal structure, or rebuild them from the pattern descriptions above.

## Before public launch — client's own checklist

Sponsor approval of public offer names · legal entity name, email, address treatment · founder name, biography, credentials, photograph · privacy notice, website terms, accessibility statement, form data path · confirmed supported product shortlist and any authorized-reseller statements · final support boundaries and availability wording · at least one real or visibly illustrative operating example · three complete Notes articles if Notes launches · analytics/cookie decision and consent · accessibility, performance, security-header, form-abuse and mobile QA · a review confirming no fabricated logos, testimonials, certifications, results, or vendor relationships appear.
