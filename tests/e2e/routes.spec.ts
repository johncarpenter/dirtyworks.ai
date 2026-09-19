import { expect, test } from '@playwright/test';
import { openNavIfCollapsed } from './support';

const PUBLISHED = [
  { path: '/', title: 'Managed AI Workspace Pilot for Alberta Businesses | Dirtyworks.ai' },
  { path: '/workspace', title: 'Managed AI Workspace Pilot | Dirtyworks.ai' },
  { path: '/services', title: 'AI managed services | Dirtyworks.ai' },
  { path: '/catalogue', title: 'Managed AI product catalogue | Dirtyworks.ai' },
  { path: '/method', title: 'Managed AI operating method | Dirtyworks.ai' },
  { path: '/trust', title: 'AI governance, controls, and operating boundaries | Dirtyworks.ai' },
  { path: '/msps', title: 'Managed AI operations for MSP partners | Dirtyworks.ai' },
  { path: '/about', title: 'About and contact | Dirtyworks.ai' },
  { path: '/notes', title: 'Notes on managed AI operations | Dirtyworks.ai' },
  { path: '/start', title: 'Start an inquiry | Dirtyworks.ai' },
];

test.describe('routes', () => {
  for (const route of PUBLISHED) {
    test(`${route.path} publishes its specified title`, async ({ page }) => {
      const response = await page.goto(route.path);
      expect(response?.status()).toBe(200);
      await expect(page).toHaveTitle(route.title);
    });
  }

  test('publishes the workspace page with its canonical URL and social description', async ({
    page,
  }) => {
    await page.goto('/workspace');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://dirtyworks.ai/workspace',
    );
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
      'content',
      /Cloudflare OS workspace pilot/,
    );
  });

  test('serves a sitemap that includes the workspace route', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    expect(response.status()).toBe(200);
    const xml = await response.text();
    expect(xml).toContain('<loc>https://dirtyworks.ai/workspace</loc>');
    expect(xml).toContain('<loc>https://dirtyworks.ai/</loc>');
  });

  /* The pages are brief on purpose; the text behind them is served to agents as static files. */
  test('serves the agent-facing text files as prerendered assets', async ({ request }) => {
    const llms = await request.get('/llms.txt');
    expect(llms.status()).toBe(200);
    expect(llms.headers()['content-type']).toContain('text/plain');
    const text = await llms.text();
    expect(text.startsWith('# Dirtyworks.ai')).toBe(true);
    expect(text).toContain('https://dirtyworks.ai/workspace');
    expect(text).toContain('Cloudflare OS provides the open-source workspace foundation');

    const agents = await request.get('/agents.md');
    expect(agents.status()).toBe(200);
    expect(await agents.text()).toContain('https://dirtyworks.ai/llms.txt');

    const robots = await request.get('/robots.txt');
    expect(await robots.text()).toContain('/llms.txt');
  });

  /* Catalogue and About moved to the footer; their routes and inbound links stay useful. */
  test('reaches the contact page and the catalogue from every other page', async ({ page }) => {
    for (const route of PUBLISHED) {
      await page.goto(route.path);
      await expect(page.locator('a[href="/about"]:visible').first(), route.path).toBeVisible();
      await expect(page.locator('a[href="/catalogue"]:visible').first(), route.path).toBeVisible();
    }
  });

  test('leads the header navigation with the workspace pilot', async ({ page }) => {
    await page.goto('/');
    await openNavIfCollapsed(page);
    const header = page.locator('header');
    await expect(header.getByRole('link', { name: /workspace pilot/i }).first()).toBeVisible();
    await expect(header.getByRole('link', { name: /managed services/i }).first()).toBeVisible();
    await expect(header.getByRole('link', { name: /how it works/i }).first()).toBeVisible();
    await expect(header.getByRole('link', { name: /about & contact/i })).toHaveCount(0);
  });

  test('gives the contact page a working address and every inquiry route', async ({ page }) => {
    await page.goto('/about');
    const main = page.locator('main');
    await expect(main.locator('a[href="mailto:hello@dirtyworks.ai"]').first()).toBeVisible();
    await expect(main.locator('a[href="/start?interest=workspace-pilot"]').first()).toBeVisible();
    await expect(main.locator('a[href="/start?interest=existing-ai"]').first()).toBeVisible();
    await expect(main.locator('a[href="/msps"]').first()).toBeVisible();
  });

  test('publishes no founder record while its inputs are unresolved', async ({ page }) => {
    await page.goto('/about');
    const text = await page.locator('main').innerText();
    expect(text).not.toMatch(/OPEN GAP/i);
    expect(text).not.toMatch(/sponsor input/i);
  });

  test('keeps the site chrome on an unknown route', async ({ page }) => {
    const response = await page.goto('/no-such-page');
    expect(response?.status()).toBe(404);
    await expect(page.locator('header .wordmark')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.getByRole('link', { name: /managed services/i }).first()).toBeVisible();
  });

  test('never exposes the server bundle as an asset', async ({ request }) => {
    expect((await request.get('/_worker.js/index.js')).status()).toBe(404);
    expect((await request.get('/_routes.json')).status()).toBe(404);
  });

  test('shows the partner action only on the partner page, each with its interest', async ({
    page,
  }) => {
    await page.goto('/msps');
    await openNavIfCollapsed(page);
    await expect(
      page.locator('header').getByRole('link', { name: /discuss an msp pilot/i }).first(),
    ).toHaveAttribute('href', '/start?interest=msp-partner');

    await page.goto('/services');
    await openNavIfCollapsed(page);
    await expect(
      page.locator('header').getByRole('link', { name: /discuss a workspace pilot/i }).first(),
    ).toHaveAttribute('href', '/start?interest=workspace-pilot');
  });

  /* Publish real approved pages or omit the labels — never inert text, never an empty link. */
  test('carries no legal labels or links while their copy does not exist', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    for (const label of ['Privacy', 'Terms', 'Accessibility']) {
      await expect(footer.getByRole('link', { name: label })).toHaveCount(0);
      await expect(footer.getByText(label, { exact: true })).toHaveCount(0);
    }
    await expect(footer.getByText('Clear responsibilities. Human accountability.')).toBeVisible();
  });

  test('shows no public review placeholder anywhere in the changed journey', async ({ page }) => {
    for (const path of ['/', '/workspace', '/start', '/services', '/msps']) {
      await page.goto(path);
      const text = await page.locator('body').innerText();
      expect(text, path).not.toMatch(/legal review/i);
      expect(text, path).not.toMatch(/OPEN GAP/i);
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
