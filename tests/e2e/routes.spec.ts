import { expect, test } from '@playwright/test';
import { openNavIfCollapsed } from './support';

const PUBLISHED = [
  { path: '/', title: 'Dirtyworks.ai | Managed AI operations for Alberta businesses' },
  { path: '/services', title: 'AI managed services | Dirtyworks.ai' },
  { path: '/catalogue', title: 'Managed AI product catalogue | Dirtyworks.ai' },
  { path: '/method', title: 'Managed AI operating method | Dirtyworks.ai' },
  { path: '/trust', title: 'AI governance, controls, and operating boundaries | Dirtyworks.ai' },
  { path: '/msps', title: 'Managed AI operations for MSP partners | Dirtyworks.ai' },
  { path: '/notes', title: 'Notes on managed AI operations | Dirtyworks.ai' },
  { path: '/start', title: 'Map your AI stack | Dirtyworks.ai' },
];

test.describe('routes', () => {
  for (const route of PUBLISHED) {
    test(`${route.path} publishes its specified title`, async ({ page }) => {
      const response = await page.goto(route.path);
      expect(response?.status()).toBe(200);
      await expect(page).toHaveTitle(route.title);
    });
  }

  test('withholds /about while its founder content is unresolved', async ({ page }) => {
    const response = await page.goto('/about');
    expect(response?.status()).toBe(404);
  });

  test('never links to the withheld route', async ({ page }) => {
    for (const route of PUBLISHED) {
      await page.goto(route.path);
      await expect(page.locator('a[href="/about"]'), route.path).toHaveCount(0);
    }
  });

  test('keeps the site chrome on an unknown route', async ({ page }) => {
    const response = await page.goto('/no-such-page');
    expect(response?.status()).toBe(404);
    await expect(page.locator('header .wordmark')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.getByRole('link', { name: /services/i }).first()).toBeVisible();
  });

  test('never exposes the server bundle as an asset', async ({ request }) => {
    expect((await request.get('/_worker.js/index.js')).status()).toBe(404);
    expect((await request.get('/_routes.json')).status()).toBe(404);
  });

  test('shows the partner action only on the partner page', async ({ page }) => {
    await page.goto('/msps');
    await openNavIfCollapsed(page);
    await expect(
      page.locator('header').getByRole('link', { name: /design a partner pilot/i }).first(),
    ).toBeVisible();

    await page.goto('/services');
    await openNavIfCollapsed(page);
    await expect(
      page.locator('header').getByRole('link', { name: /map your ai stack/i }).first(),
    ).toBeVisible();
  });

  test('keeps legal footer items inert while their copy does not exist', async ({ page }) => {
    await page.goto('/');
    for (const label of ['Privacy', 'Terms', 'Accessibility']) {
      await expect(page.locator('footer').getByRole('link', { name: label })).toHaveCount(0);
      await expect(page.locator('footer').getByText(label, { exact: true })).toBeVisible();
    }
  });

  test('pins nothing but the header', async ({ page }) => {
    await page.goto('/');
    const floating = await page.locator('body *').evaluateAll((nodes) =>
      nodes.filter((node) => {
        const style = window.getComputedStyle(node);
        return style.position === 'fixed' && node.tagName !== 'HEADER';
      }).length,
    );
    expect(floating).toBe(0);
  });
});
