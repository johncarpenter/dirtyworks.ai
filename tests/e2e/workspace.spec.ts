import { expect, test } from '@playwright/test';

/**
 * Acceptance for the offer page: deliverables, team-created tools, scope boundaries, costs and
 * the end-of-pilot decision are all explained; nothing is sold as generally available software.
 */
test.describe('workspace', () => {
  test('shares the pilot hero with the home page', async ({ page }) => {
    await page.goto('/workspace');
    const hero = page.locator('main section').first();
    await expect(hero.locator('h1')).toContainText(/YOUR COMPANY'S AI WORKSPACE/i);
    await expect(hero.getByText('Pilot offering')).toBeVisible();
    await expect(hero.getByText(/Built on Cloudflare OS/i)).toBeVisible();
    await expect(hero.locator('[data-claim-state="ILLUSTRATIVE"]')).toContainText(
      /illustrative workflow/i,
    );
  });

  test('anchors the seven deliverables at #pilot-scope', async ({ page }) => {
    await page.goto('/workspace#pilot-scope');
    const scope = page.locator('#pilot-scope');
    await expect(scope).toBeVisible();
    for (const deliverable of [
      'Pilot brief',
      'Configured workspace',
      'Users and connections',
      'Onboarding',
      'Operation during the pilot',
      'End-of-pilot review',
      'Transition arrangements',
    ]) {
      await expect(scope.getByText(deliverable, { exact: true })).toBeVisible();
    }
  });

  test('explains team-created tools, boundaries, costs and the end-of-pilot decision', async ({
    page,
  }) => {
    await page.goto('/workspace');
    const text = await page.locator('main').innerText();
    // Headings are uppercased by CSS, and innerText reports the rendered case.
    expect(text).toMatch(/Can our team build its own tools\?/i);
    expect(text).toMatch(/not unlimited development/i);
    expect(text).toMatch(/agreed owner and maintenance scope/i);
    expect(text).toMatch(/Unlimited custom development/i);
    expect(text).toMatch(/Autonomous consequential decisions/i);
    expect(text).toMatch(/Ongoing service is a separate decision after the pilot review/);
    expect(text).toMatch(/continue, change, or stop/i);
  });

  test('presents Cloudflare OS as an early-access foundation, not as available software', async ({
    page,
  }) => {
    await page.goto('/workspace');
    const text = await page.locator('main').innerText();
    expect(text).toMatch(/Cloudflare OS is in early access/);
    expect(text).toMatch(/starts as a bounded pilot/i);
    expect(text).not.toMatch(/generally available|certified partner|official partner/i);
  });

  test('offers no checkout, plan selector, price or duration', async ({ page }) => {
    await page.goto('/workspace');
    const text = await page.locator('main').innerText();
    expect(text).not.toMatch(/\$\s?\d/);
    expect(text).not.toMatch(/\b\d+[- ](day|week|month)s?\b/i);
    await expect(page.locator('main select')).toHaveCount(0);
    await expect(page.getByRole('button', { name: /buy|checkout|purchase|select plan/i })).toHaveCount(
      0,
    );
  });

  test('states what the example is and links every action to a real destination', async ({
    page,
  }) => {
    await page.goto('/workspace');
    await expect(
      page.getByText(/illustration of the workflow, not a recording of the deployed version/i),
    ).toBeVisible();
    const hrefs = await page.locator('main a[href]').evaluateAll((nodes) =>
      nodes.map((node) => node.getAttribute('href') ?? ''),
    );
    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) {
      expect(href, href).not.toBe('#');
      expect(href, href).not.toBe('');
    }
    await expect(page.locator('main').getByRole('link', { name: /discuss a workspace pilot/i }).last()).toHaveAttribute(
      'href',
      '/start?interest=workspace-pilot',
    );
  });
});
