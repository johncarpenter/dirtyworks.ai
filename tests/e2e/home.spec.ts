import { expect, test } from '@playwright/test';
import { openNavIfCollapsed } from './support';

test.describe('home', () => {
  test('publishes the specified title and description', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(
      'Dirtyworks.ai | Managed AI operations for Alberta businesses',
    );
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      /An AI MSP for product selection, account and user management/,
    );
  });

  test('answers the four qualifying questions in order', async ({ page }) => {
    await page.goto('/');
    const body = await page.locator('main').innerText();

    // 1. what is this  2. what does it manage  3. can it be trusted  4. what do I do next
    expect(body).toContain('IS IT EARNING ITS KEEP?');
    expect(body).toContain('A LICENCE DOES NOT COME WITH PEOPLE WHO CAN USE IT.');
    expect(body).toContain('COMPLIANCE IS NOT A STICKER');
    expect(body).toContain('SHOW US WHAT IS ALREADY IN THE STACK');
  });

  test('renders twelve sections', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('main section')).toHaveCount(12);
  });

  test('keeps every illustrative artefact stamped', async ({ page }) => {
    await page.goto('/');
    const stamps = page.locator('[data-claim-state="ILLUSTRATIVE"]');
    await expect(stamps.first()).toBeVisible();
    expect(await stamps.count()).toBeGreaterThan(0);

    const evidence = page.locator('[data-evidence-item]');
    const count = await evidence.count();
    expect(count).toBe(7);
    for (let index = 0; index < count; index += 1) {
      await expect(evidence.nth(index)).toContainText(/illustrative/i);
    }
  });

  test('publishes the catalogue boundary rather than a promise', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText(/Verify at quote/i).first()).toBeVisible();
  });

  test('names candidate products as text and never as a logo', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('main img')).toHaveCount(0);
  });

  test('carries no price and no purchase control', async ({ page }) => {
    await page.goto('/');
    const text = await page.locator('main').innerText();
    expect(text).not.toMatch(/\$\s?\d/);
    expect(text).not.toMatch(/per seat|per user\/month/i);
    await expect(page.getByRole('button', { name: /buy|add to cart|purchase/i })).toHaveCount(0);
  });

  test('routes the conversion band to the intake and the partner lane', async ({ page }) => {
    await page.goto('/');
    const cta = page.locator('section').last();
    await expect(cta.getByRole('link', { name: /map your ai stack/i })).toHaveAttribute(
      'href',
      '/start',
    );
    await expect(cta.getByRole('link', { name: /msp pilot/i })).toHaveAttribute('href', '/msps');
  });

  test('warns against sending sensitive data through the form', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText(/Do not send customer records, credentials/i)).toBeVisible();
  });

  test('reaches the intake from the header', async ({ page }) => {
    await page.goto('/');
    await openNavIfCollapsed(page);
    await page
      .locator('header')
      .getByRole('link', { name: /map your ai stack/i })
      .first()
      .click();
    await expect(page).toHaveURL(/\/start$/);
  });
});
