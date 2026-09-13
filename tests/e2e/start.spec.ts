import { expect, test, type Page } from '@playwright/test';

/**
 * The only transaction on the site. Coverage boundary: the rate-limited and delivery-failed
 * branches are asserted in tests/unit/actions.*.test.ts, because neither can be provoked from a
 * browser without unbinding a live service. Everything a visitor can actually reach is here,
 * exercised against `wrangler dev`, which simulates delivery and sends no real email.
 */

const REQUIRED = {
  name: 'Dana Okonkwo',
  company: 'Northline Engineering',
  email: 'dana@northline.ca',
  message: 'Turn our new-hire setup process into a checklist the team can keep current.',
};

const fillRequired = async (page: Page) => {
  for (const [field, value] of Object.entries(REQUIRED)) {
    await page.locator(`#${field}`).fill(value);
  }
};

const checkedInterest = (page: Page) =>
  page.locator('input[name="interest"]:checked').inputValue();

test.describe('inquiry', () => {
  test('shows the inquiry form and the current-page marker', async ({ page }) => {
    await page.goto('/start');
    await expect(page).toHaveTitle('Start an inquiry | Dirtyworks.ai');
    await expect(page.locator('form.intake')).toBeVisible();
    await expect(page.locator('h1')).toContainText(/scope a useful place to start/i);

    // On /start the header action is a non-link marker, not another way to the same page.
    const header = page.locator('header');
    await expect(header.getByRole('link', { name: /discuss a workspace pilot/i })).toHaveCount(0);
    await expect(header.locator('.header-action--current').first()).toContainText(/start/i);
  });

  test('requires no incident: name, company, email, interest and one answer', async ({ page }) => {
    await page.goto('/start');
    for (const field of Object.keys(REQUIRED)) {
      await expect(page.locator(`label[for="${field}"]`)).toBeVisible();
    }
    await expect(page.locator('#event')).toHaveCount(0);
    await expect(page.locator('#system')).toHaveCount(0);
    await expect(page.locator('#owner')).toHaveCount(0);
    await expect(page.locator('input[name="interest"]')).toHaveCount(4);
    expect(await page.locator('.field__required').count()).toBeGreaterThanOrEqual(5);
  });

  test('assumes nothing on a bare visit: the neutral interest is selected', async ({ page }) => {
    await page.goto('/start');
    await page.locator('.site-header astro-island:not([ssr])').waitFor();
    expect(await checkedInterest(page)).toBe('not-sure');
  });

  for (const interest of ['workspace-pilot', 'existing-ai', 'msp-partner']) {
    test(`preselects ${interest} from the query string`, async ({ page }) => {
      await page.goto(`/start?interest=${interest}`);
      await expect(page.locator(`input[name="interest"][value="${interest}"]`)).toBeChecked();
    });
  }

  test('falls back to the neutral selection for an unknown interest', async ({ page }) => {
    await page.goto('/start?interest=incident-report');
    await page.locator('.site-header astro-island:not([ssr])').waitFor();
    await expect(page.locator('input[name="interest"][value="not-sure"]')).toBeChecked();
  });

  test('lets the visitor change a preselected interest', async ({ page }) => {
    await page.goto('/start?interest=workspace-pilot');
    await expect(page.locator('input[name="interest"][value="workspace-pilot"]')).toBeChecked();
    await page.locator('input[name="interest"][value="existing-ai"]').check();
    expect(await checkedInterest(page)).toBe('existing-ai');
  });

  test('changes the message helper text with the interest', async ({ page }) => {
    await page.goto('/start?interest=msp-partner');
    await expect(page.locator('#message-help')).toContainText(
      'Describe one client opportunity or the AI service you want to add.',
    );
    await page.locator('input[name="interest"][value="existing-ai"]').check();
    await expect(page.locator('#message-help')).toContainText(/recent problem/i);
    await expect(page.locator('#message-help')).toContainText(/not required/i);
  });

  test('accepts a paced submission and confirms it', async ({ page }) => {
    await page.goto('/start?interest=workspace-pilot');
    await fillRequired(page);

    // The timing floor is 1000ms from island mount. A person filling a form clears it; a script
    // does not. Pace deliberately rather than working around the guard.
    await page.waitForTimeout(1200);
    await page.getByRole('button', { name: /send inquiry/i }).click();

    await expect(page.getByRole('heading', { name: /your inquiry has been received/i })).toBeVisible();
    await expect(page.getByText(/follow up using the email address you provided/i)).toBeVisible();
    await expect(page.getByText(/does not start a pilot/i)).toBeVisible();
    await expect(page.locator('form.intake')).toHaveCount(0);
  });

  test('returns to a blank form from the confirmation', async ({ page }) => {
    await page.goto('/start');
    await fillRequired(page);
    await page.waitForTimeout(1200);
    await page.getByRole('button', { name: /send inquiry/i }).click();
    await expect(page.getByRole('heading', { name: /your inquiry has been received/i })).toBeVisible();

    await page.getByRole('button', { name: /send another inquiry/i }).click();
    await expect(page.locator('form.intake')).toBeVisible();
    await expect(page.locator('#company')).toHaveValue('');
  });

  test('refuses an empty submission with inline errors and focus on the first', async ({ page }) => {
    await page.goto('/start');
    await page.waitForTimeout(1200);
    await page.getByRole('button', { name: /send inquiry/i }).click();

    await expect(page.locator('.field__error').first()).toBeVisible();
    await expect(page.locator('#name')).toBeFocused();
    await expect(page.getByRole('heading', { name: /your inquiry has been received/i })).toHaveCount(0);
  });

  test('refuses a submission faster than a person can type, keeping the values', async ({
    page,
  }) => {
    await page.goto('/start');
    await fillRequired(page);
    // No wait: this is the scripted-speed path the timing guard exists to catch.
    await page.getByRole('button', { name: /send inquiry/i }).click();

    await expect(page.getByRole('alert')).toContainText(/could not be accepted/i);
    await expect(page.getByRole('heading', { name: /your inquiry has been received/i })).toHaveCount(0);
    await expect(page.locator('#company')).toHaveValue(REQUIRED.company);
    await expect(page.locator('#message')).toHaveValue(REQUIRED.message);
  });

  test('offers an email alternative whenever it refuses', async ({ page }) => {
    await page.goto('/start');
    await fillRequired(page);
    await page.getByRole('button', { name: /send inquiry/i }).click();
    await expect(
      page.getByRole('alert').getByRole('link', { name: /hello@dirtyworks.ai/i }),
    ).toBeVisible();
  });

  test('gives every interactive target at least 44px', async ({ page }) => {
    await page.goto('/start');
    for (const selector of ['.interest__option', '.intake__submit', '#name']) {
      const box = await page.locator(selector).first().boundingBox();
      expect(box?.height ?? 0, selector).toBeGreaterThanOrEqual(44);
    }
  });

  test('warns against sending sensitive data and carries no review placeholder', async ({
    page,
  }) => {
    await page.goto('/start');
    await expect(
      page.getByText(/Please do not include credentials, private documents/i).first(),
    ).toBeVisible();
    const text = await page.locator('main').innerText();
    expect(text).not.toMatch(/legal review/i);
    expect(text).not.toMatch(/privacy notice/i);
  });

  test('states the next steps without a response-time promise', async ({ page }) => {
    await page.goto('/start');
    const sidebar = page.locator('.start__panel');
    await expect(sidebar).toContainText(/No pilot begins from submitting this form alone/i);
    expect(await sidebar.innerText()).not.toMatch(/\b\d+\s*(hours|business days|days)\b/i);
  });

  test('keeps the decoy field away from keyboard and assistive technology', async ({ page }) => {
    await page.goto('/start');
    const decoy = page.locator('#decoy');
    await expect(decoy).toHaveAttribute('tabindex', '-1');
    await expect(page.locator('.decoy')).toHaveAttribute('aria-hidden', 'true');
  });
});
