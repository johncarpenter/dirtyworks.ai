import { expect, test } from '@playwright/test';

const ROUTES = [
  '/',
  '/services',
  '/catalogue',
  '/method',
  '/trust',
  '/msps',
  '/about',
  '/notes',
  '/start',
];

/** Relative luminance per WCAG 2.1. */
const contrast = (a: [number, number, number], b: [number, number, number]) => {
  const channel = (value: number) => {
    const v = value / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  const lum = ([r, g, b2]: [number, number, number]) =>
    0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b2);
  const [light, dark] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
};

const parseRgb = (value: string): [number, number, number] | null => {
  const match = value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  return match ? [Number(match[1]), Number(match[2]), Number(match[3])] : null;
};

test.describe('accessibility structure', () => {
  for (const route of ROUTES) {
    test(`${route} exposes one h1 and an ordered outline`, async ({ page }) => {
      await page.goto(route);
      await expect(page.locator('h1')).toHaveCount(1);

      const levels = await page
        .locator('main h1, main h2, main h3, main h4')
        .evaluateAll((nodes) => nodes.map((node) => Number(node.tagName.slice(1))));

      let previous = levels[0] ?? 1;
      for (const level of levels) {
        expect(level - previous, `${route} outline jumps ${previous} -> ${level}`).toBeLessThanOrEqual(1);
        previous = level;
      }
    });
  }

  test('never states a status by colour alone', async ({ page }) => {
    await page.goto('/');
    const chips = page.locator('[data-status]');
    const count = await chips.count();
    expect(count).toBeGreaterThan(0);
    for (let index = 0; index < count; index += 1) {
      const text = (await chips.nth(index).innerText()).trim();
      expect(text.length, `chip ${index} has no text`).toBeGreaterThan(0);
    }
  });

  test('never puts light text on the orange ground', async ({ page }) => {
    await page.goto('/');
    const offenders = await page.locator('main *').evaluateAll((nodes) =>
      nodes
        .filter((node) => {
          // Only text matters here: a 1.5px orange folio rule has a background and no content.
          const ownText = [...node.childNodes]
            .filter((child) => child.nodeType === Node.TEXT_NODE)
            .map((child) => child.textContent ?? '')
            .join('')
            .trim();
          if (ownText.length === 0) return false;

          const style = window.getComputedStyle(node);
          const background = style.backgroundColor.replace(/\s/g, '');
          const isOrange = background === 'rgb(255,90,31)' || background === 'rgb(226,68,13)';
          if (!isOrange) return false;
          const colour = style.color.replace(/\s/g, '');
          return colour !== 'rgb(17,17,15)' && colour !== 'rgb(29,29,26)';
        })
        .map((node) => `${node.tagName}.${node.className}`),
    );
    expect(offenders).toEqual([]);
  });

  test('meets AA contrast for body text on every band', async ({ page }) => {
    await page.goto('/');
    const samples = await page.locator('main p, main li').evaluateAll((nodes) =>
      nodes.slice(0, 60).map((node) => {
        const style = window.getComputedStyle(node);
        let background = style.backgroundColor;
        let parent = node.parentElement;
        while (parent && (background === 'rgba(0, 0, 0, 0)' || background === 'transparent')) {
          background = window.getComputedStyle(parent).backgroundColor;
          parent = parent.parentElement;
        }
        return {
          colour: style.color,
          background,
          size: parseFloat(style.fontSize),
          tag: `${node.tagName}.${node.className}`,
        };
      }),
    );

    for (const sample of samples) {
      const fg = parseRgb(sample.colour);
      const bg = parseRgb(sample.background);
      if (!fg || !bg) continue;
      const ratio = contrast(fg, bg);
      const threshold = sample.size >= 24 ? 3 : 4.5;
      expect(ratio, `${sample.tag} ${sample.colour} on ${sample.background}`).toBeGreaterThanOrEqual(
        threshold,
      );
    }
  });

  test('hides decorative connectors from assistive technology', async ({ page }) => {
    await page.goto('/');
    const exposed = await page.locator('main *').evaluateAll((nodes) =>
      nodes
        .filter((node) => {
          const text = (node.textContent ?? '').trim();
          if (text !== '\u2192' && text !== '\u2191') return false;
          return node.closest('[aria-hidden="true"]') === null;
        })
        .map((node) => node.tagName),
    );
    expect(exposed).toEqual([]);
  });

  test('gives the page a language and a viewport', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('meta[name="viewport"]')).toHaveAttribute(
      'content',
      /width=device-width/,
    );
  });
});
