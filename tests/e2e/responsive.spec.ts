import { expect, test } from '@playwright/test';
import { measureOverflow, waitForHeaderHydration } from './support';

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

  /**
   * The cases above measure the closed header only, which is how an open panel that pushed the
   * document 136px sideways at 320px went unseen. The panel is navigation: it has to hold at the
   * narrow widths it exists for.
   */
  for (const width of [320, 375, 480]) {
    test(`the open navigation panel does not scroll sideways at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 720 });
      await page.goto('/');
      await page.waitForLoadState('load');

      await waitForHeaderHydration(page);
      await page.locator('.header-menu-button').click();
      await page.locator('.header-panel[data-open="true"]').waitFor();

      const overflow = await measureOverflow(page);
      expect(
        overflow.scrollWidth,
        `panel open @ ${width}px — widest element: ${overflow.widest.tag} ` +
          `(right edge ${Math.round(overflow.widest.right)}px)`,
      ).toBeLessThanOrEqual(overflow.clientWidth + 1);
    });
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
