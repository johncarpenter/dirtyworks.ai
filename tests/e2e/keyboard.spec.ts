import { expect, test } from '@playwright/test';
import { openNavIfCollapsed } from './support';

test.describe('keyboard', () => {
  test('reaches the skip link first and jumps to content', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    await expect(page.locator('.skip-link')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#main$/);
  });

  test('traverses the header without hitting a dead control', async ({ page }) => {
    await page.goto('/');
    await openNavIfCollapsed(page);
    const reachable: string[] = [];
    for (let index = 0; index < 12; index += 1) {
      await page.keyboard.press('Tab');
      const info = await page.evaluate(() => {
        const active = document.activeElement as HTMLElement | null;
        if (!active) return null;
        return {
          tag: active.tagName,
          href: active.getAttribute('href'),
          text: (active.textContent ?? '').trim().slice(0, 40),
        };
      });
      if (!info) continue;
      if (info.tag === 'A') {
        // Every focusable link must actually go somewhere.
        expect(info.href, info.text).toBeTruthy();
        expect(info.href, info.text).not.toBe('#');
      }
      reachable.push(info.text);
    }
    expect(reachable.join(' ')).toMatch(/services/i);
  });

  test('shows a visible focus indicator on every focus stop', async ({ page }) => {
    await page.goto('/');
    for (let index = 0; index < 6; index += 1) {
      await page.keyboard.press('Tab');
      const outline = await page.evaluate(() => {
        const active = document.activeElement;
        if (!active || active === document.body) return null;
        const style = window.getComputedStyle(active);
        return { width: style.outlineWidth, style: style.outlineStyle };
      });
      if (!outline) continue;
      expect(parseFloat(outline.width)).toBeGreaterThanOrEqual(2);
      expect(outline.style).not.toBe('none');
    }
  });

  test('opens and dismisses the mobile menu without a pointer', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 720 });
    await page.goto('/');

    const button = page.locator('.header-menu-button');
    await button.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('.header-panel')).toHaveAttribute('data-open', 'true');
    await expect(button).toHaveAttribute('aria-expanded', 'true');

    await page.keyboard.press('Escape');
    await expect(page.locator('.header-panel')).toHaveAttribute('data-open', 'false');
    await expect(button).toBeFocused();
  });

  test('keeps the primary action inside the opened panel', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 720 });
    await page.goto('/');
    await page.locator('.header-menu-button').click();
    await expect(
      page.locator('.header-panel').getByRole('link', { name: /map your ai stack/i }),
    ).toBeVisible();
  });

  test('completes the intake by keyboard alone', async ({ page }) => {
    await page.goto('/start');
    const values: Record<string, string> = {
      name: 'Dana Okonkwo',
      company: 'Northline Engineering',
      role: 'Operations lead',
      email: 'dana@northline.ca',
      intent: 'Get a new hire access to the assistant the team already uses.',
      event: 'Two weeks in, nobody could say who owns the account.',
      system: 'Workforce assistant',
      owner: 'Nobody',
    };

    for (const [field, value] of Object.entries(values)) {
      await page.locator(`#${field}`).focus();
      await page.keyboard.type(value);
    }

    await page.locator('.needs__option input').first().focus();
    await page.keyboard.press('Space');
    await expect(page.locator('.needs__option input').first()).toBeChecked();

    await page.waitForTimeout(1200);
    await page.locator('.intake__submit').focus();
    await page.keyboard.press('Enter');
    await expect(page.getByText('The gap is on the record.')).toBeVisible();
  });
});
