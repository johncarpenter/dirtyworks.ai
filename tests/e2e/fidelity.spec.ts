import { expect, test } from '@playwright/test';

const ROUTES = ['/', '/services', '/catalogue', '/method', '/trust', '/msps', '/notes', '/start'];

/**
 * Guards against silent style loss. `<Band class="x">` renders that class on an element carrying
 * Band's scope id, so a page-scoped `.x h1` rule matches nothing and the heading quietly falls back
 * to the inherited size. Two pages shipped at 34px instead of ~100px before this existed.
 */
test.describe('display fidelity', () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) < 900, 'display scale is desktop-specific');

  for (const route of ROUTES) {
    test(`${route} renders its hero at display scale`, async ({ page }) => {
      await page.goto(route);
      const heading = await page.locator('main h1').first().evaluate((node) => {
        const style = window.getComputedStyle(node);
        return {
          size: parseFloat(style.fontSize),
          weight: Number(style.fontWeight),
          transform: style.textTransform,
          family: style.fontFamily,
        };
      });

      // Prototype hero clamps bottom out at 42-52px and reach 112-140px at 1440px.
      expect(heading.size, `${route} hero font-size`).toBeGreaterThanOrEqual(60);
      expect(heading.weight, `${route} hero weight`).toBeGreaterThanOrEqual(800);
      expect(heading.transform).toBe('uppercase');
      expect(heading.family).toContain('Archivo');
    });
  }

  test('renders section headings above body scale', async ({ page }) => {
    await page.goto('/');
    const sizes = await page
      .locator('main h2')
      .evaluateAll((nodes) => nodes.map((node) => parseFloat(window.getComputedStyle(node).fontSize)));
    expect(sizes.length).toBeGreaterThan(5);
    for (const size of sizes) {
      expect(size).toBeGreaterThanOrEqual(28);
    }
  });

  test('serves self-hosted fonts and makes no third-party request', async ({ page }) => {
    const external: string[] = [];
    page.on('request', (request) => {
      const url = new URL(request.url());
      if (url.hostname !== 'localhost') external.push(request.url());
    });
    await page.goto('/');
    await page.waitForLoadState('load');
    expect(external).toEqual([]);
  });
});
