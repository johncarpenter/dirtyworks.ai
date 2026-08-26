# Feature Specification: Dirtyworks.ai Public Marketing Website

**Feature Branch**: `main` (no branch hook configured; spec directory is the feature identifier)

**Created**: 2026-08-25

**Status**: Draft

**Input**: User description: "please implement the mockup at @mockups/ use the design system under @design-system/ for guidance"

## Overview

Build the complete nine-page public marketing website for Dirtyworks.ai, an Alberta-based managed
AI operations provider, recreating the high-fidelity prototypes in `mockups/design_files/` at their
specified copy, structure, and behaviour, styled by the `PROOF / WORK` design system in
`design-system/`, with the single conversion surface (`/start`) wired to a real, guarded submission
path that notifies the business.

Authority split, per the project constitution:

- `mockups/README.md` governs words, information architecture, page structure, and calls to action.
- `design-system/` governs tokens, components, interaction patterns, and voice.
- Where the two disagree, the mockups handoff wins on content and the design system wins on visuals.

The prototypes are design specification, not production code. Nothing in them is ported verbatim as
runtime behaviour; the designs are recreated in the target environment.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - A buyer names their operating gap and gets a response path (Priority: P1)

An owner or operations lead at an Alberta professional-services or energy-services firm arrives on
the home page, recognises the described problem (AI tools in use with nobody operating them),
follows the primary action to `/start`, describes one recent event that failed, cost too much, or
had no owner, and submits. They see an unambiguous confirmation that the gap is on the record, and
the business receives the submission with a working reply path.

**Why this priority**: This is the only transaction on the site. Every other page exists to move a
qualified buyer into it. A site that explains the offer perfectly and loses the submission has
delivered nothing.

**Independent Test**: Load the home page, use the header action to reach `/start`, complete the
required fields, submit, and confirm both that the visitor sees the confirmation state and that the
business receives a notification containing the submitted detail and a reply-to address. Fully
testable with only the home page and `/start` built.

**Acceptance Scenarios**:

1. **Given** a visitor on the home page, **When** they activate the primary action, **Then** they
   arrive at `/start` with the intake form visible and the header action shown as a non-link
   current-page marker.
2. **Given** the intake form with all required fields completed, **When** the visitor submits,
   **Then** the form is replaced by the confirmation panel showing a received-and-logged state, the
   statement that submitting does not create a service relationship or authorise system access, and
   an action returning to a blank form.
3. **Given** a submission the business must act on, **When** the confirmation is shown to the
   visitor, **Then** a notification has been accepted for delivery to the business containing every
   submitted field and the visitor's email as the reply address.
4. **Given** a required field left empty or containing an invalid email, **When** the visitor
   submits, **Then** submission is refused, each invalid field shows an inline error beside it,
   focus moves to the first invalid field, and no notification is sent.
5. **Given** the notification cannot be delivered, **When** the visitor submits, **Then** they see a
   retry-able failure message with an alternative email contact, their entered values are preserved,
   and no confirmation of success is shown.
6. **Given** a visitor answering the optional "what do you need?" question, **When** they select
   several of the ten needs, **Then** each selection is independently togglable and all selections
   appear in the notification.

---

### User Story 2 - A buyer establishes what is actually managed and where the boundary sits (Priority: P2)

A buyer who accepts the problem needs to know what the service does and does not cover before
involving anyone else. They read `/services` for the managed scope and its explicit boundary per
line item, and `/catalogue` for how products are chosen, who invoices, and what a quote looks like.

**Why this priority**: This is the second of the four qualifying questions the site must answer in
order. Without it the conversion in Story 1 attracts unqualified enquiries.

**Independent Test**: Visit `/services` and `/catalogue` and confirm every scope row shows its
boundary with equal visual weight, every product category shows its operating tier and purchase
route, and no price or purchase control appears anywhere.

**Acceptance Scenarios**:

1. **Given** the services scope register, **When** a visitor reads any of its eight rows, **Then**
   the row states the service, what is included, and its boundary, with the boundary presented as
   content of equal weight rather than fine print.
2. **Given** the catalogue product menu, **When** a visitor reads any of its seven categories,
   **Then** they see the job it does, prerequisites, candidate product names as text, the operating
   tier, the state (standard, conditional, or candidate), and the purchase route.
3. **Given** any page on the site, **When** a visitor looks for a price, a per-seat rate, or a
   purchase control, **Then** none exists, and the commercial rows read as boundaries to verify at
   quote instead of numbers.
4. **Given** the illustrative quote sheet on `/catalogue`, **When** it is displayed, **Then** it
   carries a visible illustrative stamp and contains no monetary values.

---

### User Story 3 - A buyer decides whether to trust the service with company systems (Priority: P3)

A buyer who understands the scope must judge risk before granting access to systems and
information. They read `/trust` for what is not promised, the control register, the exit terms, and
`/method` for how work proceeds and where it stops.

**Why this priority**: The third qualifying question. It is the page that converts interest into a
submission that mentions real systems, and the page most likely to lose a cautious buyer.

**Independent Test**: Visit `/trust` and `/method` and confirm the limitations section appears
before the control register, the non-certification statement is present, the illustrative incident
sequence is labelled as voice rather than history, and the method shows a valid outcome of stopping.

**Acceptance Scenarios**:

1. **Given** `/trust`, **When** the page is read top to bottom, **Then** the eight
   what-we-do-not-promise limitations appear before the control register.
2. **Given** the control register, **When** it is displayed, **Then** each row states control,
   mechanism, holder, and state, and the register carries the note that nothing in it is a legal or
   regulatory certification.
3. **Given** the incident timeline on `/trust`, **When** it is displayed, **Then** it is explicitly
   labelled an illustrative voice and sequence, not a historical event.
4. **Given** `/method`, **When** a visitor reads the valid outcomes, **Then** stopping,
   consolidating, repairing first, using a simpler tool, and keeping it human appear as legitimate
   outcomes alongside deploying.

---

### User Story 4 - An MSP partner evaluates the partner lane (Priority: P4)

A traditional managed service provider wants to add an AI practice without building the delivery
method. They read `/msps`, compare the three partnership models, see the ten-row responsibility
seam, and follow a partner-specific action to propose a one-customer pilot.

**Why this priority**: A distinct audience with its own action label and its own conversion, but
smaller in volume than direct buyers and dependent on the same intake surface.

**Independent Test**: Visit `/msps` and confirm the header action reads as the partner action, the
three models are distinguishable without relying on colour, and the responsibility seam states
ownership per party in words.

**Acceptance Scenarios**:

1. **Given** `/msps`, **When** the page loads, **Then** the header primary action reads as the
   partner pilot action rather than the standard buyer action.
2. **Given** the responsibility seam matrix, **When** any cell is read, **Then** the party's
   responsibility is stated as a word, never conveyed by colour alone.
3. **Given** the three partnership models, **When** they are compared, **Then** each states the
   customer relationship, our visibility, and the working seam, and the closing note declines to
   publish discounts or wholesale percentages before partner validation.

---

### User Story 5 - A visitor assesses who is behind the company and how it thinks (Priority: P5)

A visitor doing diligence looks for the people and the point of view. They read `/about` for the
operator-led positioning and operating beliefs, and `/notes` for the editorial queue.

**Why this priority**: Supports credibility but is not on the critical qualifying path, and both
pages depend on content the sponsor has not yet supplied.

**Independent Test**: Visit `/about` and `/notes` and confirm no founder name, biography,
photograph, publication date, or reading time is invented, and that unwritten notes are presented
as a queue rather than as links.

**Acceptance Scenarios**:

1. **Given** `/notes`, **When** a visitor reads the queue, **Then** unwritten items show a number
   and title only, with no link, date, or reading time, and the in-preparation state is stated.
2. **Given** `/about` while sponsor founder content is outstanding, **When** publication is
   attempted, **Then** the release is refused rather than publishing the open-gap annotation
   panel or invented biography.
3. **Given** the operating beliefs section, **When** it is displayed, **Then** all seven beliefs are
   present as individual rows.

---

### User Story 6 - A constrained visitor can still use the whole site (Priority: P6)

A visitor on a 320px phone, on a locked-down corporate machine with scripting disabled, using only
a keyboard, or using a screen reader, can read every page, navigate to every route, and reach the
business.

**Why this priority**: Cross-cutting resilience. It is last only because it is verified against the
pages the earlier stories deliver, not because it is optional — it is a release gate.

**Independent Test**: Traverse all nine routes at six viewport widths from 320px to 1440px, then
repeat with scripting disabled and with keyboard only, confirming no dead controls, no horizontal
scrolling of core content, and a reachable contact path.

**Acceptance Scenarios**:

1. **Given** any page at 320px width, **When** the visitor scrolls, **Then** no core content
   requires horizontal scrolling, including the services boundary column, the MSP seam matrix, and
   the catalogue menu.
2. **Given** any page with scripting disabled, **When** the visitor opens the page, **Then** every
   navigation destination is present and followable, and `/start` presents its purpose, its fields,
   and a direct email alternative.
3. **Given** a keyboard-only visitor, **When** they tab through the header, the mobile menu, the
   need-selection chips, and the form, **Then** every control is reachable, operable, and shows a
   visible focus indicator, and the opened mobile menu can be dismissed without a pointer.
4. **Given** a visitor with reduced-motion preferences, **When** they load any page, **Then** no
   scroll-triggered or decorative animation plays.
5. **Given** any status, state, or responsibility indicator on any page, **When** it is read without
   colour perception, **Then** its meaning is still stated in text.

---

### Edge Cases

- A visitor submits the intake form twice in quick succession: the second submission is refused as
  rate-limited with a retry message and an email alternative, not silently accepted or duplicated.
- An automated script posts the form instantly or fills the hidden decoy field: the submission is
  refused with a generic refusal and no notification is sent, without any visitor-facing puzzle or
  third-party challenge.
- The notification service is unavailable or rejects the message: the visitor sees an honest
  retry-able failure with an alternative email address, and the entered values remain in the form.
- A visitor pastes 5,000 characters into a free-text field: the field enforces a stated maximum and
  the submission is refused with an inline message rather than truncating content silently.
- A visitor requests a route that does not exist: they get a page that keeps the site chrome and
  offers navigation, not a bare error.
- A visitor follows a footer legal link while privacy, terms, and accessibility copy is outstanding:
  the item is presented as inert text, never as a link to an empty or placeholder page.
- A visitor reads a page containing an illustrative register, quote sheet, monthly record, or
  incident sequence: the illustrative stamp is present, so no example can be mistaken for customer
  data or a historical event.
- Sponsor content is still outstanding at release time: the release is refused rather than
  publishing an unresolved marker.
- A visitor on a slow mobile connection: page text is readable before any interactive enhancement
  finishes loading.
- A visitor prints or saves a page: content remains legible without the dark bands rendering as
  solid ink blocks over text.

## Requirements *(mandatory)*

### Functional Requirements

#### Site structure and navigation

- **FR-001**: The site MUST publish exactly nine routes: `/` (Home), `/services`, `/catalogue`,
  `/method`, `/trust`, `/msps`, `/about`, `/notes`, `/start`.
- **FR-002**: Each route MUST carry the page title and, where specified, the meta description given
  in the mockups handoff, and MUST expose a shareable social preview.
- **FR-003**: Every route MUST be reachable from the header navigation or the footer on every page;
  navigation MUST be flat with no nested menus.
- **FR-004**: The header MUST present, in order, the wordmark linking home, the five primary
  navigation items (Services, Catalogue, Method, Trust, For MSPs), the primary action, and the site
  version marker; the active item MUST be visually distinguished and programmatically identifiable.
- **FR-005**: The primary header action MUST read as the buyer action on all pages except `/msps`,
  where it reads as the partner action, and `/start`, where it becomes a non-link current-page
  marker.
- **FR-006**: Every page MUST close with a conversion band whose primary and secondary destinations
  match the handoff routing table exactly.
- **FR-007**: The footer MUST present the wordmark, the brand promise, the Calgary location and
  contact email, the three link columns (Service, Company, Legal), and the bottom accountability
  and version line.
- **FR-008**: Legal footer items (Privacy, Terms, Accessibility) MUST render as inert text until
  their copy exists and MUST NOT link to placeholder pages.
- **FR-009**: The site MUST NOT include a newsletter signup, a floating action button, a chat
  widget, or a scroll-progress indicator.
- **FR-010**: A request for an unknown route MUST return a not-found page that retains the site
  header and footer and offers navigation back into the site.
- **FR-011**: The site version marker MUST reflect the actual build or deploy identity, not a
  hard-coded string.

#### Page content

- **FR-012**: Each of the nine pages MUST reproduce the section inventory, section order, and copy
  specified for it in the mockups handoff and prototypes. Copy is load-bearing and MUST NOT be
  paraphrased, shortened, or retitled.
- **FR-013**: Home MUST present its twelve sections in the specified order, ending with the
  conversion band followed by the sensitive-data safety note.
- **FR-014**: The `/trust` limitations section MUST precede the control register.
- **FR-015**: `/notes` MUST present the first three notes as in-preparation rows and items 04–12 as
  a title-only queue, with no dates, reading times, or links for unwritten notes.
- **FR-016**: Recurring content patterns (folio line, declaration, register row, status chip,
  evidence rail, annotated comparison, work order, control register, fit field, conversion band,
  claim stamp) MUST be implemented once as shared components and reused across pages.
- **FR-017**: Exclusions in fit fields, boundaries in the services register, and limitations on
  `/trust` MUST be presented with the same visual weight as inclusions — never as disclaimers.
- **FR-018**: No photography, stock imagery, decorative icon, or customer logo may appear on any
  page.

#### Claim and content discipline

- **FR-019**: Every illustrative artefact (home portfolio register and evidence rail, catalogue
  quote sheet, method monthly record, trust incident sequence) MUST display its illustrative stamp
  in the published output.
- **FR-020**: Commercial values MUST display as a boundary to verify at quote or scope at review,
  never as a number.
- **FR-021**: The site MUST NOT contain prices, per-seat rates, purchase controls, customer logos,
  testimonials, certifications, outcome metrics, fabricated publication dates, fabricated reading
  times, or invented biography.
- **FR-022**: Prohibited marketing vocabulary and banned generic call-to-action labels MUST NOT
  appear in any published page, and no emoji may appear anywhere.
- **FR-023**: Unresolved sponsor content MUST render as a visible marker rather than invented text,
  and the release process MUST fail while any marker remains unresolved.
- **FR-024**: `/about` MUST NOT be published while the founder-content marker is unresolved; the
  route and its navigation entries are withheld until real content arrives.
- **FR-025**: Any future metric MUST carry baseline, period, method, and source, or a visible
  not-measured stamp.

#### Visual fidelity

- **FR-026**: Colour, typography, spacing, radius, border, shadow, and motion MUST be taken from the
  design system tokens or lifted literally from the prototype values; no invented values.
- **FR-027**: Headings MUST be authored in sentence case and presented uppercase by presentation
  rules, never title-cased in the source content.
- **FR-028**: Each page MUST carry at most two intentional layout violations, and only of the
  sanctioned kinds described in the handoff.
- **FR-029**: Interaction feedback MUST follow the specified model: hover darkens or fills, press
  collapses the hard offset, focus shows the specified ring; no opacity fades, lifts, scale
  transforms, gradients, blur, or glow.
- **FR-030**: Typefaces MUST be served from the site's own origin in the published build, with
  licensing verified.

#### Intake submission

- **FR-031**: The `/start` form MUST collect as required: name, company, role, work email, what
  somebody was trying to do, what happened, the product or system involved, and who owns it today.
- **FR-032**: The form MUST collect as optional: company size, current AI products or categories,
  number of people using them, existing environment, existing MSP relationship, preferred response
  method and time, and a multi-select of the ten stated needs.
- **FR-033**: The needs selector MUST be a real multi-select control with independently togglable
  options and touch targets of at least 44px.
- **FR-034**: Every field MUST have a persistent visible label above its input, a stated maximum
  length, and an inline error message on invalid input using the semantic error colour reserved for
  errors.
- **FR-035**: The consent and safety block MUST display the do-not-send warning for customer
  records, credentials, private documents, employee information, and other sensitive data, and MUST
  carry the pending-legal-review marker until the wording is approved.
- **FR-036**: On accepted submission the form MUST be replaced by the confirmation panel with the
  received-and-logged state, the no-service-relationship statement, and an action to submit another
  gap.
- **FR-037**: A success state MUST be shown only after the notification has been accepted for
  delivery. Any refusal, error, or unavailability MUST surface as a retry-able failure that
  preserves entered values and offers a direct email alternative.
- **FR-038**: The notification to the business MUST contain every submitted field, set the
  submitter's address as the reply path, and use a subject that identifies it as an operating-gap
  intake.
- **FR-039**: The submission path MUST reject automated abuse using a hidden decoy field, a minimum
  elapsed-time floor, strict field validation, and per-client rate limiting, without any
  visitor-facing challenge or third-party verification widget.
- **FR-040**: Submitted content MUST NOT be stored by the website beyond the notification, and
  operational records of submissions MUST be limited to purpose, outcome, and duration — never
  names, addresses, message content, or raw network identifiers.
- **FR-041**: Content pages MUST remain fully readable when the submission path is unavailable.

#### Accessibility and responsive behaviour

- **FR-042**: All nine pages MUST be readable and navigable from 320px to 1440px width with no
  horizontal scrolling of core content.
- **FR-043**: Registers MUST stack as label-above-value on narrow viewports, comparisons MUST stack
  preserving their pairing, work-order steps MUST stay numbered and sequential, and product
  categories MUST collapse to expandable rows showing job and operating emphasis by default.
- **FR-044**: Call-to-action labels MUST remain the specified named actions at every width; they may
  wrap but MUST NOT be shortened to generic labels.
- **FR-045**: Navigation destinations MUST be present and followable without scripting; the mobile
  menu MUST contain the primary action and MUST be dismissible by keyboard.
- **FR-046**: `/start` MUST present its purpose, its fields, and a direct email alternative when
  scripting is unavailable.
- **FR-047**: State MUST NEVER be conveyed by colour alone; every status chip and responsibility
  cell MUST state its meaning in text.
- **FR-048**: Text and interface contrast MUST meet WCAG 2.1 AA, and the prohibited light-on-orange
  text pairing MUST NOT occur.
- **FR-049**: All interactive controls MUST be keyboard-operable with a visible focus indicator and
  a minimum 44px target.
- **FR-050**: Every page MUST expose one top-level heading and a correctly ordered heading outline,
  and decorative structural glyphs MUST be hidden from assistive technology.
- **FR-051**: Reduced-motion preferences MUST suppress scroll-triggered and decorative animation;
  body text MUST NEVER animate.

### Key Entities

- **Page**: One of nine public routes. Attributes: route, title, meta description, ordered section
  list, conversion-band destinations, header action variant.
- **Navigation item**: A label and destination consumed by header, footer, and mobile menu from a
  single source, so a renamed route cannot orphan a link.
- **Content pattern instance**: A reusable structure (register row, status chip, work-order step,
  control-register row, fit field, responsibility-seam row) with its own labelled fields and a
  textual state.
- **Claim marker**: A publication-state stamp attached to content — illustrative, verify at quote,
  open gap, legal review, or hypothesis-not-measured — with a rule for whether the marked content
  may ship.
- **Operating gap submission**: The intake payload — required identity and event fields, optional
  context fields, selected needs — transient, converted to a notification and not retained.
- **Catalogue entry**: One of seven categories with job, prerequisites, candidate product names,
  operating tier, state, purchase route, and operating emphasis.
- **Control register entry**: Control, mechanism, holder, state, and textual status; a seven-row
  public extract on Home and a twelve-row full register on `/trust`.
- **Responsibility seam row**: A capability and the stated responsibility of each of the three
  parties (MSP, Dirtyworks.ai, customer).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time visitor can answer all four qualifying questions — what this is, what it
  manages, whether it can be trusted, what to do next — using only the published pages, and reach
  the intake form from any page in one action.
- **SC-002**: 100% of submissions with valid required fields either show the visitor a confirmation
  and produce a notification to the business, or show an honest failure with an alternative contact.
  No submission is ever reported as successful without a delivered notification.
- **SC-003**: The business receives a submission notification within one minute of the visitor
  seeing the confirmation, containing every submitted field and a working reply address.
- **SC-004**: All nine pages show no horizontal scrolling of core content at each of six widths from
  320px to 1440px.
- **SC-005**: All nine pages are fully readable and every navigation destination is followable with
  scripting disabled, and `/start` still offers a direct contact path.
- **SC-006**: Every interactive control on the site is reachable and operable by keyboard alone with
  a visible focus indicator; zero dead controls.
- **SC-007**: An automated submission that fills the decoy field or submits within the minimum time
  floor is rejected 100% of the time, while paced human-speed submissions are accepted 100% of the
  time in testing.
- **SC-008**: The release check refuses publication whenever an unresolved content marker, a
  prohibited vocabulary term, a banned generic call to action, or an unstamped illustrative artefact
  is present — verified by a deliberately introduced violation failing the check.
- **SC-009**: Zero prices, customer logos, testimonials, certifications, outcome metrics, fabricated
  dates, or fabricated reading times appear in the published site.
- **SC-010**: Page text is readable within two seconds on a mid-range mobile device over a typical
  4G connection, and content pages remain readable when the submission path is unavailable.
- **SC-011**: Text and interface contrast meets WCAG 2.1 AA on every page, and every status
  indicator communicates its state in text as well as colour.
- **SC-012**: Every navigation destination resolves to a published page and every published page
  appears in navigation, verified automatically rather than by inspection.

## Out of Scope

- Sending newsletter or marketing campaigns, and any footer subscription capture.
- Storing, searching, segmenting, or reporting on submissions; there is no customer-facing account,
  login, or dashboard.
- Publishing prices, rate cards, discounts, wholesale percentages, or an online purchase path.
- Writing the Notes articles themselves; this feature delivers the index and its publishing state.
- Authoring privacy, terms, and accessibility copy, or the founder biography — sponsor inputs.
- Analytics, cookie consent, chat, or any third-party visitor-facing script.
- Porting the prototype design-component runtime in `mockups/design_files/support.js`.
- Localisation and any language other than English.

## Assumptions

- **Content and visual authority**: `mockups/README.md` (content, IA, copy, calls to action) plus the
  `*.dc.html` prototypes (exact structure and values) and `design-system/` (tokens, components,
  voice) are complete and current as of 2026-08-25. No new copy is written for this feature; where a
  fact is missing it becomes a visible marker rather than invented text.
- **Submission destination**: submissions are notified to the published company address
  (`hello@dirtyworks.ai`) as a transactional notification. No submission store, CRM, or ticketing
  integration is introduced, consistent with single-digit daily submission volume.
- **About page gating**: because founder name, biography, credentials, and photograph are
  outstanding sponsor inputs, `/about` is built completely but withheld from publication — route and
  navigation entries suppressed — until real content arrives. The open-gap panel is never published.
- **Legal copy gating**: privacy, terms, and accessibility remain inert footer text, and the intake
  consent wording ships with its pending-review marker only if the sponsor accepts that state;
  otherwise launch waits on approved wording.
- **Notes launch state**: launching `/notes` with three in-preparation notes and a title-only queue
  is the intended design, not a gap.
- **No analytics at launch**: no visitor measurement, cookie banner, or consent tooling is included,
  so the site sets no non-essential storage.
- **Mobile is new work**: the prototypes are desktop-first and hold to roughly tablet width; all
  narrow-viewport behaviour is implemented against the handoff's content rules rather than derived
  from the prototypes.
- **Prototypes as specification**: the streaming design-component format is read as design intent;
  inline style values are the source of exact numbers.
- **Fonts**: Archivo, Instrument Serif, and IBM Plex Mono are licensed for self-hosted web use;
  verification is a launch checklist item.
- **Wordmark**: the wordmark is live type until a licensed vector arrives, replaceable in one place.
- **Sensitive data**: visitors may still paste sensitive content into free-text fields despite the
  warning, so submissions are treated as transient and never persisted by the site.
- **Delivery platform**: the platform, framework, and hosting constraints are already fixed by the
  project constitution and `ARCHITECTURE.md`; this specification does not restate or revisit them.
