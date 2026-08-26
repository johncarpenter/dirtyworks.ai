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
const WIDTHS = [320, 375, 480, 768, 1024, 1440];

/**
 * The prototypes are desktop-first and were never built below tablet width, so every one of these
 * is new behaviour rather than a regression check.
 */
test.describe('responsive', () => {
  for (const width of WIDTHS) {
    for (const route of ROUTES) {
      test(`${route} does not scroll sideways at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(route);
        await page.waitForLoadState('load');

        const overflow = await page.evaluate(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          widest: (() => {
            let worst = { tag: '', width: 0 };
            for (const node of document.querySelectorAll('main *')) {
              const rect = node.getBoundingClientRect();
              if (rect.width > worst.width) {
                worst = { tag: `${node.tagName}.${node.className}`, width: rect.width };
              }
            }
            return worst;
          })(),
        }));

        expect(
          overflow.scrollWidth,
          `${route} @ ${width}px — widest element: ${overflow.widest.tag} ` +
            `(${Math.round(overflow.widest.width)}px)`,
        ).toBeLessThanOrEqual(overflow.clientWidth + 1);
      });
    }
  }

  test('keeps call-to-action labels specific rather than shortening them', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 720 });
    await page.goto('/');
    const labels = await page.locator('main a.btn, main button.btn').allInnerTexts();
    for (const label of labels) {
      expect(label.trim().toLowerCase()).not.toBe('start');
      expect(label.trim().toLowerCase()).not.toBe('more');
      expect(label.trim().toLowerCase()).not.toBe('learn more');
    }
  });
});
