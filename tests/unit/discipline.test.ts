import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join, relative } from 'node:path';

const ROOT = process.cwd();
const SRC = join(ROOT, 'src');

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });

const files = walk(SRC);
const cssLike = files.filter((f) => ['.css', '.astro'].includes(extname(f)));
const read = (f: string) => readFileSync(f, 'utf8');

describe('constitution discipline', () => {
  it('never imports from the read-only authorities', () => {
    for (const file of files) {
      const text = read(file);
      expect(text, relative(ROOT, file)).not.toMatch(/from\s+['"][^'"]*design-system/);
      expect(text, relative(ROOT, file)).not.toMatch(/from\s+['"][^'"]*mockups/);
      expect(text, relative(ROOT, file)).not.toMatch(/@import[^;]*design-system/);
    }
  });

  it('resolves every design token it references', () => {
    const defined = new Set<string>();
    for (const file of cssLike) {
      for (const match of read(file).matchAll(/(--[a-z0-9-]+)\s*:/gi)) defined.add(match[1]);
    }
    for (const file of cssLike) {
      for (const match of read(file).matchAll(/var\((--[a-z0-9-]+)/gi)) {
        expect(defined.has(match[1]), `${relative(ROOT, file)} uses ${match[1]}`).toBe(true);
      }
    }
  });

  it('never exceeds the 3px radius ceiling', () => {
    for (const file of cssLike) {
      for (const match of read(file).matchAll(/border-radius:\s*([^;}]+)/gi)) {
        for (const px of match[1].matchAll(/(\d+(?:\.\d+)?)px/g)) {
          expect(Number(px[1]), `${relative(ROOT, file)}: ${match[0]}`).toBeLessThanOrEqual(3);
        }
      }
    }
  });

  it('never blurs a shadow', () => {
    for (const file of cssLike) {
      for (const match of read(file).matchAll(/box-shadow:\s*([^;}]+)/gi)) {
        const value = match[1].trim();
        if (/^none|^var\(/.test(value)) continue;
        const lengths = [...value.matchAll(/(-?\d+(?:\.\d+)?)(?:px)?(?=\s|$)/g)].map((m) =>
          Number(m[1]),
        );
        if (lengths.length >= 3) {
          expect(lengths[2], `${relative(ROOT, file)}: ${value}`).toBe(0);
        }
      }
    }
  });

  it('uses no gradients and no external stylesheet imports', () => {
    for (const file of cssLike) {
      const text = read(file);
      expect(text, relative(ROOT, file)).not.toMatch(/(linear|radial|conic)-gradient\(/i);
      expect(text, relative(ROOT, file)).not.toMatch(/@import\s+url\(\s*["\']?https?:/i);
    }
  });

  it('keeps the closed palette: no raw hex outside the vendored token files', () => {
    const nonToken = cssLike.filter((f) => !f.includes(join('styles', 'tokens')));
    for (const file of nonToken) {
      const text = read(file).replace(/\/\*[\s\S]*?\*\//g, '');
      const hexes = [...text.matchAll(/#[0-9a-f]{3,8}\b/gi)].map((m) => m[0]);
      expect(hexes, relative(ROOT, file)).toEqual([]);
    }
  });
});
