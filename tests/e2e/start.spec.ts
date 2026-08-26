import { expect, test, type Page } from '@playwright/test';

/**
 * The only transaction on the site. Coverage boundary: the rate-limited and delivery-failed
 * branches are asserted in tests/unit/actions.*.test.ts, because neither can be provoked from a
 * browser without unbinding a live service. Everything a visitor can actually reach is here.
 */

const REQUIRED = {
  name: 'Dana Okonkwo',
  company: 'Northline Engineering',
  role: 'Operations lead',
  email: 'dana@northline.ca',
  intent: 'Get a new hire access to the assistant the team already uses.',
  event: 'Two weeks in, nobody could say who owns the account.',
  system: 'Workforce assistant',
  owner: 'Nobody',
};

const fillRequired = async (page: Page) => {
  for (const [field, value] of Object.entries(REQUIRED)) {
    await page.locator(`#${field}`).fill(value);
  }
};

test.describe('intake', () => {
  test('shows the intake form and the current-page marker', async ({ page }) => {
    await page.goto('/start');
    await expect(page).toHaveTitle('Map your AI stack | Dirtyworks.ai');
    await expect(page.locator('form.intake')).toBeVisible();

    // On /start the header action is a non-link marker, not another way to the same page.
    const header = page.locator('header');
    await expect(header.getByRole('link', { name: /map your ai stack/i })).toHaveCount(0);
    await expect(header.locator('.header-action--current').first()).toContainText(/start/i);
  });

  test('marks required fields and keeps labels visible', async ({ page }) => {
    await page.goto('/start');
    for (const field of Object.keys(REQUIRED)) {
      await expect(page.locator(`label[for="${field}"]`)).toBeVisible();
    }
    expect(await page.locator('.field__required').count()).toBeGreaterThanOrEqual(8);
  });

  test('accepts a paced submission and confirms it', async ({ page }) => {
    await page.goto('/start');
    await fillRequired(page);

    // The timing floor is 1000ms from island mount. A person filling a form clears it; a script
    // does not. Pace deliberately rather than working around the guard.
    await page.waitForTimeout(1200);
    await page.getByRole('button', { name: /log the operating gap/i }).click();

    await expect(page.getByText('The gap is on the record.')).toBeVisible();
    await expect(page.getByText(/Received \/ Logged/i)).toBeVisible();
    await expect(page.getByText(/does not create a service relationship/i)).toBeVisible();
    await expect(page.locator('form.intake')).toHaveCount(0);
  });

  test('returns to a blank form from the confirmation', async ({ page }) => {
    await page.goto('/start');
    await fillRequired(page);
    await page.waitForTimeout(1200);
    await page.getByRole('button', { name: /log the operating gap/i }).click();
    await expect(page.getByText('The gap is on the record.')).toBeVisible();

    await page.getByRole('button', { name: /log another gap/i }).click();
    await expect(page.locator('form.intake')).toBeVisible();
    await expect(page.locator('#company')).toHaveValue('');
  });

  test('refuses an empty submission with inline errors and focus on the first', async ({ page }) => {
    await page.goto('/start');
    await page.waitForTimeout(1200);
    await page.getByRole('button', { name: /log the operating gap/i }).click();

    await expect(page.locator('.field__error').first()).toBeVisible();
    await expect(page.locator('#name')).toBeFocused();
    await expect(page.getByText('The gap is on the record.')).toHaveCount(0);
  });

  test('refuses a submission faster than a person can type', async ({ page }) => {
    await page.goto('/start');
    await fillRequired(page);
    // No wait: this is the scripted-speed path the timing guard exists to catch.
    await page.getByRole('button', { name: /log the operating gap/i }).click();

    await expect(page.getByRole('alert')).toContainText(/could not be accepted/i);
    await expect(page.getByText('The gap is on the record.')).toHaveCount(0);
    // Values survive a refusal.
    await expect(page.locator('#company')).toHaveValue(REQUIRED.company);
  });

  test('offers an email alternative whenever it refuses', async ({ page }) => {
    await page.goto('/start');
    await fillRequired(page);
    await page.getByRole('button', { name: /log the operating gap/i }).click();
    await expect(
      page.getByRole('alert').getByRole('link', { name: /hello@dirtyworks.ai/i }),
    ).toBeVisible();
  });

  test('offers the ten needs as real, independent checkboxes', async ({ page }) => {
    await page.goto('/start');
    const boxes = page.locator('.needs__option input[type="checkbox"]');
    await expect(boxes).toHaveCount(10);

    await boxes.nth(0).check();
    await boxes.nth(3).check();
    await expect(boxes.nth(0)).toBeChecked();
    await expect(boxes.nth(3)).toBeChecked();
    await expect(boxes.nth(1)).not.toBeChecked();

    await boxes.nth(0).uncheck();
    await expect(boxes.nth(0)).not.toBeChecked();
    await expect(boxes.nth(3)).toBeChecked();
  });

  test('gives every interactive target at least 44px', async ({ page }) => {
    await page.goto('/start');
    for (const selector of ['.needs__option', '.intake__submit', '#name']) {
      const box = await page.locator(selector).first().boundingBox();
      expect(box?.height ?? 0, selector).toBeGreaterThanOrEqual(44);
    }
  });

  test('warns against sending sensitive data, and says the wording is under review', async ({
    page,
  }) => {
    await page.goto('/start');
    await expect(page.getByText(/Do not include passwords, API keys/i)).toBeVisible();
    await expect(page.getByText(/consent wording pending/i)).toBeVisible();
  });

  test('keeps the decoy field away from keyboard and assistive technology', async ({ page }) => {
    await page.goto('/start');
    const decoy = page.locator('#decoy');
    await expect(decoy).toHaveAttribute('tabindex', '-1');
    await expect(page.locator('.decoy')).toHaveAttribute('aria-hidden', 'true');
  });
});
