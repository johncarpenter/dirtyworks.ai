import { expect, test } from '@playwright/test';
import { openNavIfCollapsed, waitForHeaderHydration } from './support';

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
    expect(reachable.join(' ')).toMatch(/workspace pilot/i);
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
    await waitForHeaderHydration(page);

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
    await waitForHeaderHydration(page);
    await page.locator('.header-menu-button').click();
    await expect(
      page.locator('.header-panel').getByRole('link', { name: /discuss a workspace pilot/i }),
    ).toBeVisible();
  });

  test('completes the inquiry by keyboard alone', async ({ page }) => {
    await page.goto('/start');
    const values: Record<string, string> = {
      name: 'Dana Okonkwo',
      company: 'Northline Engineering',
      email: 'dana@northline.ca',
      message: 'Turn our new-hire setup process into a checklist the team can keep current.',
    };

    for (const [field, value] of Object.entries(values)) {
      await page.locator(`#${field}`).focus();
      await page.keyboard.type(value);
    }

    // Radios: arrow keys move the selection within the group.
    await page.locator('input[name="interest"]:checked').focus();
    await page.keyboard.press('ArrowLeft');
    await expect(page.locator('input[name="interest"][value="msp-partner"]')).toBeChecked();

    await page.waitForTimeout(1200);
    await page.locator('.intake__submit').focus();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('heading', { name: /your inquiry has been received/i })).toBeVisible();
  });
});
