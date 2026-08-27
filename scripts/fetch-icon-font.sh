#!/usr/bin/env bash
# Regenerate public/fonts/MaterialSymbolsSharp-Subset.woff2.
#
# The site self-hosts its icon font rather than linking the Google Fonts CDN, because
# src/styles/tokens/fonts.css holds the line that no stylesheet may reference an external URL.
# Google's CSS API will cut a subset for us via `icon_names`, so the file we host contains only
# the marks the brand actually defines — currently 20, for about 4KB.
#
# The glyph list is derived from the design system's registry so the two cannot drift:
#   design-system/assets/icons/registry.json  ->  .icons[].glyph
#
# Axis values are fixed at opsz 24 / wght 500 / FILL 0 / GRAD 0. That is not a default; it is
# the only setting design-system/guidelines/iconography.html permits (line only, never filled).
#
# Usage:  ./scripts/fetch-icon-font.sh
set -euo pipefail

cd "$(dirname "$0")/.."

REGISTRY="design-system/assets/icons/registry.json"
OUT="public/fonts/MaterialSymbolsSharp-Subset.woff2"
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"

[ -f "$REGISTRY" ] || { echo "missing $REGISTRY — sync the design system first" >&2; exit 1; }

# Sorted and de-duplicated: two registry entries may share a fallback glyph.
ICONS=$(node -e '
  const r = require("./'"$REGISTRY"'");
  console.log([...new Set(r.icons.map(i => i.glyph))].sort().join(","));
')
echo "subsetting $(echo "$ICONS" | tr "," "\n" | wc -l | tr -d " ") glyphs: $ICONS"

CSS=$(curl -fsS -A "$UA" \
  "https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@24,500,0,0&icon_names=${ICONS}")

URL=$(printf '%s' "$CSS" | grep -o 'https://fonts.gstatic.com[^)]*')
[ -n "$URL" ] || { echo "no woff2 URL in the Google Fonts response" >&2; exit 1; }

curl -fsS "$URL" -o "$OUT"
echo "wrote $OUT ($(wc -c < "$OUT" | tr -d ' ') bytes)"
