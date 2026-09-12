import { expect, test } from '@playwright/test';
import { openNavIfCollapsed } from './support';

test.describe('home', () => {
  test('publishes the specified title and description', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(
      'Managed AI Workspace Pilot for Alberta Businesses | Dirtyworks.ai',
    );
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      /Start a managed AI workspace pilot with Dirtyworks\.ai/,
    );
  });

  /* Acceptance: the offer, the pilot status, the Cloudflare foundation and the next step are all
     readable from the first screen's content — the hero band, not a tooltip. */
  test('states the offer, pilot status, foundation and next step in the hero', async ({ page }) => {
    await page.goto('/');
    const hero = page.locator('main section').first();
    await expect(hero.locator('h1')).toContainText(/YOUR COMPANY'S AI WORKSPACE/i);
    await expect(hero.getByText('Pilot offering')).toBeVisible();
    await expect(
      hero.getByText('Scope, connections, support, and costs are agreed before work begins.'),
    ).toBeVisible();
    await expect(hero.getByText(/Built on Cloudflare OS/i)).toBeVisible();
    await expect(hero.getByRole('link', { name: /discuss a workspace pilot/i })).toHaveAttribute(
      'href',
      '/start?interest=workspace-pilot',
    );
    await expect(hero.getByRole('link', { name: /explore the workspace/i })).toHaveAttribute(
      'href',
      '/workspace',
    );
  });

  test('renders eight sections in the specified order', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('main section')).toHaveCount(8);
    const body = await page.locator('main').innerText();
    const order = [
      'WORK WITH AI. BUILD WHAT THE WORK NEEDS.',
      'YOUR TEAM BUILDS. YOU SET THE BOUNDARIES. WE KEEP IT RUNNING.',
      'START WITH ONE TEAM AND WORK WORTH IMPROVING.',
      'KNOW WHO CAN USE IT, WHAT IT CAN REACH, AND WHO SUPPORTS IT.',
      'ALREADY HAVE AI TOOLS? WE CAN WORK WITH THOSE TOO.',
      'BRING A MANAGED AI WORKSPACE TO YOUR CLIENTS.',
      'WHAT WOULD YOUR TEAM BUILD FIRST?',
    ];
    let cursor = -1;
    for (const heading of order) {
      const index = body.indexOf(heading);
      expect(index, heading).toBeGreaterThan(cursor);
      cursor = index;
    }
  });

  test('labels the workflow as illustrative and never as a product interface', async ({ page }) => {
    await page.goto('/');
    const stamp = page.locator('[data-claim-state="ILLUSTRATIVE"]');
    await expect(stamp.first()).toBeVisible();
    await expect(stamp.first()).toContainText(/illustrative workflow/i);
    await expect(page.getByText(/Not a screenshot of a deployed client environment/i)).toBeVisible();
    // No invented controls: the sheet carries no buttons and no inputs.
    await expect(page.locator('.workflow button, .workflow input, .workflow textarea')).toHaveCount(
      0,
    );
  });

  test('labels every example as an example pilot use case', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Example pilot use case')).toHaveCount(3);
    await expect(page.getByText('Examples are selected and validated for each pilot.')).toBeVisible();
  });

  test('names the three parties in text on the responsibility rows', async ({ page }) => {
    await page.goto('/');
    const rows = page.locator('.roles__row');
    await expect(rows).toHaveCount(3);
    await expect(rows.nth(0)).toContainText('Your team');
    await expect(rows.nth(1)).toContainText('Your business');
    await expect(rows.nth(2)).toContainText('Dirtyworks.ai');
  });

  test('describes Cloudflare OS as the foundation without a partner badge', async ({ page }) => {
    await page.goto('/');
    const text = await page.locator('main').innerText();
    expect(text).toMatch(/Cloudflare OS provides the open-source workspace foundation/);
    expect(text).toMatch(/early access/i);
    expect(text).not.toMatch(/certified partner|partner badge|official partner/i);
    await expect(page.locator('main img')).toHaveCount(0);
  });

  test('carries no price, duration, cohort size or purchase control', async ({ page }) => {
    await page.goto('/');
    const text = await page.locator('main').innerText();
    expect(text).not.toMatch(/\$\s?\d/);
    expect(text).not.toMatch(/per seat|per user\/month/i);
    expect(text).not.toMatch(/\b\d+[- ]day\b/i);
    expect(text).not.toMatch(/\b\d+[- ]week\b/i);
    await expect(page.getByRole('button', { name: /buy|add to cart|purchase/i })).toHaveCount(0);
  });

  test('routes the two secondary lanes to their pages and the MSP lane to its interest', async ({
    page,
  }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: /explore managed services/i })).toHaveAttribute(
      'href',
      '/services',
    );
    await expect(page.getByRole('link', { name: /discuss an msp pilot/i })).toHaveAttribute(
      'href',
      '/start?interest=msp-partner',
    );
    await expect(page.getByRole('link', { name: /read the partner models/i })).toHaveAttribute(
      'href',
      '/msps',
    );
    await expect(page.getByRole('link', { name: /see the pilot deliverables/i })).toHaveAttribute(
      'href',
      '/workspace#pilot-scope',
    );
  });

  test('routes the conversion band to the pilot inquiry', async ({ page }) => {
    await page.goto('/');
    const cta = page.locator('main section').last();
    await expect(cta.getByRole('link', { name: /discuss a workspace pilot/i })).toHaveAttribute(
      'href',
      '/start?interest=workspace-pilot',
    );
  });

  test('warns against sending sensitive data through the form', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText(/Please do not include credentials, private documents/i)).toBeVisible();
  });

  test('reaches the pilot inquiry from the header', async ({ page }) => {
    await page.goto('/');
    await openNavIfCollapsed(page);
    await page
      .locator('header')
      .getByRole('link', { name: /discuss a workspace pilot/i })
      .first()
      .click();
    await expect(page).toHaveURL(/\/start\?interest=workspace-pilot$/);
    await expect(page.locator('input[name="interest"][value="workspace-pilot"]')).toBeChecked();
  });
});
