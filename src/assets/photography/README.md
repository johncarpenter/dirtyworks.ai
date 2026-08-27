# Photography originals

Four files belong here, named exactly:

    hero-operations-leader-v1.png              1672 x 941
    training-onboarding-v1.png                 1536 x 1024
    energy-services-project-office-v1.png      1672 x 941
    support-incident-operations-v1.png         1672 x 941

Export them from the Claude Design pane of "Dirtyworks.ai Design System" (they are also in that
project under assets/photography/). They are not synced with the rest of the design system because
they exceed the per-file read limit of the design-sync tool.

`src/assets`, not `public`: these go through astro:assets, so sharp cuts the avif and webp
derivatives the treatment rules require at build time and the untreated original is preserved.
The build fails loudly while they are missing, which is the intended behaviour — a missing
editorial photograph should not ship as a silent gap.

Alt text, captions and crop focus: src/copy/photography.ts
Direction, placement plan and provenance register:
design-system/guidelines/photography-direction-and-image-library.md

All four are generated originals with fictional people. Every use renders an ILLUSTRATIVE stamp
and is registered in src/copy/claim-artefacts.ts. Never caption one as a customer, an employee, a
partner, or the founder.
