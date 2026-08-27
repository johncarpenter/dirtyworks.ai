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

  /**
   * Astro scopes a style to the component that DECLARES it. A child component's root element
   * carries its own scope id, not its caller's, so this:
   *
   *     <EditorialPhoto class="operate__photo" />
   *     <style>.operate__photo { margin: 72px 0 }</style>
   *
   * compiles to `.operate__photo[data-astro-cid-CALLER]` and matches nothing. It does not warn,
   * it does not error, and the page renders with the rule silently absent — which is exactly how
   * it survived review the first time. Spacing belongs on a prop the child implements, or in an
   * unscoped rule in src/styles/.
   */
  it('never styles a class it only puts on a child component', () => {
    const astro = files.filter((f) => extname(f) === '.astro');

    for (const file of astro) {
      const text = read(file);
      const styles = [...text.matchAll(/<style>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('\n');
      if (!styles.trim()) continue;

      /* Only the KEY compound of a selector — the part after the last combinator — receives the
         scope attribute. In `.lifecycle h2` the scoped element is the h2, and `.lifecycle` is just
         an ancestor that may live anywhere, including on a child component. It is a rule like
         `.company__photo { }`, whose key compound IS the class, that has to match an element this
         file actually owns. */
      const declared = new Set<string>();
      for (const block of styles.matchAll(/([^{}]+)\{/g)) {
        const prelude = block[1].trim();
        if (prelude.startsWith('@')) continue;
        for (const selector of prelude.split(',')) {
          // :global() opts out of scoping deliberately, so it is exempt.
          if (/:global\(/.test(selector)) continue;
          const key = selector.trim().split(/[\s>+~]+/).pop() ?? '';
          for (const cls of key.matchAll(/\.([a-z][\w-]*)/gi)) declared.add(cls[1]);
        }
      }
      if (declared.size === 0) continue;

      const frontmatter = text.match(/^---([\s\S]*?)\n---/)?.[1] ?? '';
      const template = text.replace(/^---[\s\S]*?\n---/, '').replace(/<style>[\s\S]*?<\/style>/g, '');

      /* Only an IMPORTED capitalised tag is a child component. A capitalised tag can also be a
         dynamic element name bound from props — Declaration.astro does `as: Tag = 'h2'` and then
         renders `<Tag>`, which is an ordinary h2 and does carry this file's scope. */
      const imported = new Set(
        [...frontmatter.matchAll(/^\s*import\s+(?:([A-Z][\w]*)|\{([^}]*)\})\s+from/gm)].flatMap(
          (m) => (m[1] ? [m[1]] : [...m[2].matchAll(/[A-Z][\w]*/g)].map((c) => c[0])),
        ),
      );

      const onComponent = new Set<string>();
      const onElement = new Set<string>();
      for (const tag of template.matchAll(
        /<([A-Za-z][\w.]*)\b([^>]*?)class(?::list)?=(?:"([^"]*)"|\{([^}]*)\})/g,
      )) {
        const isComponent = imported.has(tag[1]);
        const classes = [...`${tag[3] ?? ''} ${tag[4] ?? ''}`.matchAll(/[\w-]+/g)].map((m) => m[0]);
        for (const name of classes) (isComponent ? onComponent : onElement).add(name);
      }

      for (const name of declared) {
        if (onComponent.has(name) && !onElement.has(name)) {
          throw new Error(
            `${relative(ROOT, file)}: .${name} is styled here but only ever set on a child ` +
              `component, where this file's scope id does not reach. The rule silently does ` +
              `nothing. Give the child a prop, or move the rule to src/styles/.`,
          );
        }
      }
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
