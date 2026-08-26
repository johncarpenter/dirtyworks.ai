# Contract: Routes, Metadata, and Navigation

**Consumers**: `src/content/routes.ts`, `src/content/navigation.ts`, `src/pages/*`,
`src/components/layout/SiteHeader.astro`, `SiteFooter.astro`, `tests/unit/routes.test.ts`,
`tests/e2e/routes.spec.ts`.

Titles and descriptions are verbatim from `mockups/README.md`. Any change here is a content change
requiring sponsor sign-off, not an implementation detail.

## Route table

| id | path | Title | Header action | CTA primary | CTA secondary |
|---|---|---|---|---|---|
| `home` | `/` | `Dirtyworks.ai \| Managed AI operations for Alberta businesses` | buyer | `/start` | `/msps` |
| `services` | `/services` | `AI managed services \| Dirtyworks.ai` | buyer | `/start` | `/method` |
| `catalogue` | `/catalogue` | `Managed AI product catalogue \| Dirtyworks.ai` | buyer | `/start` | `/services` |
| `method` | `/method` | `Managed AI operating method \| Dirtyworks.ai` | buyer | `/start` | `/trust` |
| `trust` | `/trust` | `AI governance, controls, and operating boundaries \| Dirtyworks.ai` | buyer | `/start` | `/services` |
| `msps` | `/msps` | `Managed AI operations for MSP partners \| Dirtyworks.ai` | **partner** | `/start` | `/trust` |
| `about` | `/about` | `About Dirtyworks.ai \| Operator-led managed AI services` | buyer | `/start` | `/method` |
| `notes` | `/notes` | `Notes on managed AI operations \| Dirtyworks.ai` | buyer | `/start` | `/services` |
| `start` | `/start` | `Map your AI stack \| Dirtyworks.ai` | **current** | — | `/msps` |

`trailingSlash: 'never'`. Home's meta description, verbatim:

> An AI MSP for product selection, account and user management, training, integrations, knowledge,
> governance, monitoring, support, and cost control.

Pages without a specified description inherit no default — the tag is omitted rather than
auto-generated, so nothing unreviewed reaches a search result.

Additionally: `/404` — retains header and footer, offers navigation (FR-010). Not in navigation, not
in the route table's nav derivations.

## Header action variants

| Variant | Label | Target | Presentation |
|---|---|---|---|
| `buyer` | `Map your AI stack` | `/start` | orange fill, ink text, `1.5px` ink border, `3px 3px 0` ink offset |
| `partner` | `Design a partner pilot` | `/start` | same treatment, partner label |
| `current` | `Start` | none | non-link ink pill; not focusable as a link |

Labels are authored in sentence case and uppercased by CSS. They may wrap at narrow widths and must
never be shortened (FR-044).

## Navigation membership

- **Header nav** (5 items, in order): Services, Catalogue, Method, Trust, For MSPs. Inactive `#636760`;
  active is full ink with `padding-bottom:4px; border-bottom:3px solid #FF5A1F`. Home is not a nav
  item — the wordmark is the route home.
- **Footer / Service**: Services, Catalogue, Method, Trust.
- **Footer / Company**: For MSPs, About, Notes, `Map your AI stack` → `/start`.
  (Adjudicated in research.md D-07 #3 against `Start.dc.html:88`, which says `Home`.)
- **Footer / Legal**: Privacy, Terms, Accessibility — rendered as `<span>`, never `<a>`, while their
  copy does not exist (FR-008).
- **Mobile panel**: all header nav items plus the primary action inside the panel. No floating
  control, no chat widget, no scroll-progress bar; only the header is pinned (FR-009, FR-045).

## Publication gating

`published: false` removes a route from the build output, every navigation surface, and every CTA
target. `/about` ships with `published: false` until the founder-content placeholder is resolved
(FR-024). The content check fails if a placeholder names a route that is still published.

## Verification

| Assertion | Layer |
|---|---|
| Every `path` resolves to a file in `src/pages/`; every published route appears in navigation | unit |
| `id` and `path` unique; every CTA target is a published route | unit |
| Each page emits exactly the title above, and Home emits the description verbatim | E2E |
| Header action variant is correct per route, and `/start` renders it as a non-link | E2E |
| Legal footer items are not links | E2E |
| Unknown route returns a 404 page retaining header and footer | E2E |
| Every destination is followable with scripting disabled | E2E (no-JS project) |
