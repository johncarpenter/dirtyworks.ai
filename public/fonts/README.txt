Self-hosted typefaces. The three text families are SIL Open Font License 1.1, which permits
self-hosted web embedding. Licence texts accompany the files, as the OFL requires.

  Archivo            Archivo-OFL.txt          github.com/Omnibus-Type/Archivo
                     Six static weights (400-900). The variable build ships only as a
                     658KB .ttf, so the static woff2 faces the site uses are served instead.

  IBM Plex Mono      IBMPlexMono-OFL.txt      github.com/IBM/plex
                     Variable roman build; one file covers 400-600.

  Instrument Serif   InstrumentSerif-OFL.txt  github.com/Instrument/instrument-serif
                     NOT variable: weight 400 upright and italic only. Never specify another
                     weight, or the browser will synthesise one.

  Material Symbols   MaterialSymbols-APACHE.txt   github.com/google/material-design-icons
  Sharp (subset)     Apache License 2.0, which permits redistribution with the notice above.
                     MaterialSymbolsSharp-Subset.woff2 — 4KB, and NOT the full 3600-glyph
                     family. It is subsetted to exactly the twenty semantic marks in the
                     design system's icon registry, cut at opsz 24 / wght 500 / FILL 0 /
                     GRAD 0, which is the only setting the brand permits. Regenerate it with
                     scripts/fetch-icon-font.sh if the registry changes.

                     Square-cornered by design: the 0-3px radius system rules out Lucide,
                     Feather and Heroicons, whose round caps contradict the surface rules.

This directory is the whole font surface. There are no external font URLs anywhere in the
CSS - self-hosting is what lets that stay true now that the site draws icons.
