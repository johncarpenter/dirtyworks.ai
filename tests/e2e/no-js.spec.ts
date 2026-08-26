import { expect, test } from '@playwright/test';

test.use({ javaScriptEnabled: false });

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

/**
 * A site that ships almost no JavaScript has no excuse for requiring it. These run with scripting
 * disabled entirely, which also covers the locked-down corporate machine case.
 */
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
    for (const path of ['/services', '/catalogue', '/method', '/trust', '/msps', '/about']) {
      await expect(page.locator(`a[href="${path}"]:visible`).first()).toBeVisible();
    }
  });

  test('navigates by following a link', async ({ page }) => {
    await page.goto('/');
    await page.locator('a[href="/services"]:visible').first().click();
    await expect(page).toHaveURL(/\/services$/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('offers an email alternative on the intake page', async ({ page }) => {
    await page.goto('/start');
    // <noscript> content is inert markup to the DOM API, so assert on the raw HTML.
    const html = await page.content();
    expect(html).toContain('mailto:hello@dirtyworks.ai');
    expect(html).toContain('What somebody was trying to do');
    expect(html).toMatch(/Do not include passwords/);
  });

  test('still states the purpose and fields of the intake', async ({ page }) => {
    await page.goto('/start');
    await expect(page.locator('h1')).toContainText(/SHOW US WHAT IS ALREADY IN THE/i);
  });
});
