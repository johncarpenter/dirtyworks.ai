# Specification Quality Checklist: Dirtyworks.ai Public Marketing Website

**Purpose**: Validate specification completeness and quality before proceeding to planning
**Created**: 2026-08-25
**Feature**: [spec.md](../spec.md)

## Content Quality

- [x] No implementation details (languages, frameworks, APIs)
- [x] Focused on user value and business needs
- [x] Written for non-technical stakeholders
- [x] All mandatory sections completed

## Requirement Completeness

- [x] No [NEEDS CLARIFICATION] markers remain
- [x] Requirements are testable and unambiguous
- [x] Success criteria are measurable
- [x] Success criteria are technology-agnostic (no implementation details)
- [x] All acceptance scenarios are defined
- [x] Edge cases are identified
- [x] Scope is clearly bounded
- [x] Dependencies and assumptions identified

## Feature Readiness

- [x] All functional requirements have clear acceptance criteria
- [x] User scenarios cover primary flows
- [x] Feature meets measurable outcomes defined in Success Criteria
- [x] No implementation details leak into specification

## Validation Record

Iteration 1 — 2026-08-25. All items pass. Findings and resolutions:

- **Implementation-detail scan**: the spec contains no framework, language, runtime, hosting, or
  library reference. One occurrence of "database" in the Assumptions section was replaced with
  "submission store" so the boundary reads as a business constraint rather than a technology choice.
  Platform and stack decisions are deliberately deferred to `ARCHITECTURE.md` and the constitution,
  referenced but not restated (final Assumptions bullet).
- **Clarification markers**: zero. Five genuinely open questions were resolved as documented
  assumptions rather than blocking markers, each traceable to an existing authority:
  submission destination (footer contact address in `mockups/README.md`), About-page gating (the
  handoff's "replace it with real founder content, or hold the page back"), legal-copy gating
  (`LEGAL REVIEW` claim state), Notes launch state (deliberate design), and no-analytics-at-launch
  (constitution Principle I excludes third-party scripts without amendment).
- **Testability**: all 51 functional requirements are stated as observable site behaviour. The
  requirements most at risk of vagueness were tightened — FR-023 and FR-037 name the failing
  condition rather than an intention, and FR-040 enumerates what may not be recorded.
- **Measurability**: all 12 success criteria are verifiable from outside the system. SC-007 and
  SC-008 are stated so that verification requires introducing a deliberate violation, which makes
  the release gate itself testable rather than assumed.
- **Scope boundary**: an explicit `Out of Scope` section was added beyond the template's sections
  because several exclusions (newsletter, pricing, submission storage, analytics, writing the Notes
  articles, porting the prototype runtime) are load-bearing brand and legal constraints, not
  omissions.
- **Coverage**: 6 prioritised user stories, each independently testable and independently
  deployable — P1 delivers a working conversion path from Home and `/start` alone. 10 edge cases.
  8 key entities.

## Notes

- Items marked incomplete require spec updates before `/speckit.clarify` or `/speckit.plan`
- Two launch dependencies sit outside engineering control and are tracked as assumptions, not
  requirements: sponsor founder content (gates `/about` publication) and approved consent, privacy,
  terms, and accessibility copy (gates the footer legal links and the intake consent block).
