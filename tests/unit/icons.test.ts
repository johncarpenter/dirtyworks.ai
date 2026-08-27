/**
 * The icon set has three copies of one fact, and they are kept in three different places by
 * necessity rather than by choice:
 *
 *   design-system/assets/icons/registry.json   the authority (semantic name -> glyph)
 *   src/components/ui/icons.ts                 GLYPHS, copied because src/ may not import from
 *                                              the read-only authorities (discipline.test.ts);
 *                                              shared by Icon.astro and Icon.tsx
 *   public/fonts/MaterialSymbolsSharp-Subset.woff2   cut to exactly those glyphs
 *
 * A copy that nothing checks is a copy that drifts, and the failure mode is quiet: a renamed
 * mark renders as the literal text "assignment_turned_in" in the middle of a diagram. So this
 * file asserts the three agree.
 *
 * Tests may read design-system/ even though src/ may not — the import ban is an architectural
 * boundary for the shipped bundle, not a rule about what may be verified.
 */
import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { GLYPHS } from '../../src/components/ui/icons';

const ROOT = process.cwd();

const registry = JSON.parse(
  readFileSync(join(ROOT, 'design-system/assets/icons/registry.json'), 'utf8'),
) as { mode: string; icons: { name: string; glyph: string; file: string }[] };

const glyphs: Record<string, string> = GLYPHS;

describe('icon registry', () => {
  it('maps exactly the semantic names the design system defines', () => {
    expect(Object.keys(glyphs).sort()).toEqual(registry.icons.map((i) => i.name).sort());
  });

  it('maps every name to the glyph the design system chose', () => {
    for (const icon of registry.icons) {
      expect(glyphs[icon.name], `${icon.name} in icons.ts`).toBe(icon.glyph);
    }
  });

  it('ships the subsetted font the component depends on', () => {
    // Not linked from the Google Fonts CDN: src/styles/tokens/fonts.css holds the line that no
    // stylesheet may reference an external URL.
    expect(existsSync(join(ROOT, 'public/fonts/MaterialSymbolsSharp-Subset.woff2'))).toBe(true);
    expect(existsSync(join(ROOT, 'public/fonts/MaterialSymbols-APACHE.txt'))).toBe(true);
  });

  it('still renders glyph fallbacks, not the SVG set that has not shipped', () => {
    /* registry.mode flips to 'svg' when the licensed IconScout files land in
       design-system/assets/icons/. This site draws the Material Symbols fallback, so when that
       day comes this test fails and points at the work: cut real SVGs into the build and retire
       the font. Until then the glyph names above are load-bearing. */
    expect(registry.mode).toBe('glyph');
    expect(registry.icons.every((i) => !existsSync(join(ROOT, 'design-system/assets/icons', i.file))))
      .toBe(true);
  });
});
