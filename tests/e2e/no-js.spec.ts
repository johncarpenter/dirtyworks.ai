import { expect, test } from '@playwright/test';
import { measureOverflow } from './support';

test.use({ javaScriptEnabled: false });

const ROUTES = [
  '/',
  '/workspace',
  '/services',
  '/catalogue',
  '/method',
  '/trust',
  '/msps',
  '/about',
  '/notes',
  '/start',
];

/**
 * A site that ships almost no JavaScript has no excuse for requiring it. These run with scripting
 * disabled entirely, which also covers the locked-down corporate machine case.
 */

test('shows the pilot status and the neutral interest without scripting', async ({ page }) => {
  await page.goto('/start?interest=workspace-pilot');
  // The query string is parsed on the client; without scripting the server-rendered neutral
  // selection stands, which is the honest fallback rather than a guess.
  await expect(page.locator('input[name="interest"][value="not-sure"]')).toBeChecked();
  await page.goto('/');
  await expect(page.getByText('Pilot offering')).toBeVisible();
});
test.describe('without scripting', () => {
  for (const route of ROUTES) {
    test(`${route} still renders its content`, async ({ page }) => {
      await page.goto(route);
      const text = await page.locator('main').innerText();
      expect(text.trim().length).toBeGreaterThan(400);
    });
  }

  test('keeps every navigation destination followable', async ({ page }) => {
    await page.goto('/');
    // Two copies of each destination exist by design (desktop list + disclosure panel); which one
    // is visible depends on width. Without scripting the panel cannot collapse, so one is always
    // visible — that is the guarantee being asserted.
    for (const path of [
      '/workspace',
      '/services',
      '/method',
      '/trust',
      '/msps',
      '/catalogue',
      '/about',
    ]) {
      await expect(page.locator(`a[href="${path}"]:visible`).first()).toBeVisible();
    }
  });

  // The panel cannot collapse here, so its layout is the header's layout at every narrow width.
  for (const width of [320, 375, 480]) {
    test(`does not scroll sideways at ${width}px with the panel always open`, async ({ page }) => {
      await page.setViewportSize({ width, height: 720 });
      await page.goto('/');

      const overflow = await measureOverflow(page);
      expect(
        overflow.scrollWidth,
        `no scripting @ ${width}px — widest element: ${overflow.widest.tag} ` +
          `(right edge ${Math.round(overflow.widest.right)}px)`,
      ).toBeLessThanOrEqual(overflow.clientWidth + 1);
    });
  }

  test('navigates by following a link', async ({ page }) => {
    await page.goto('/');
    await page.locator('a[href="/workspace"]:visible').first().click();
    await expect(page).toHaveURL(/\/workspace$/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('offers an email alternative on the intake page', async ({ page }) => {
    await page.goto('/start');
    // <noscript> content is inert markup to the DOM API, so assert on the raw HTML.
    const html = await page.content();
    expect(html).toContain('mailto:hello@dirtyworks.ai');
    expect(html).toContain('What you would like your team to do, build, or improve');
    expect(html).toMatch(/Please do not include credentials/);
  });

  test('still states the purpose and fields of the intake', async ({ page }) => {
    await page.goto('/start');
    await expect(page.locator('h1')).toContainText(/SCOPE A USEFUL PLACE TO/i);
  });
});
