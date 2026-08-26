import type { Page } from '@playwright/test';

/**
 * Below 1025px the header collapses: the nav list and the primary action move into the disclosure
 * panel. Tests that need either must open the panel first — that is the specified behaviour, not a
 * workaround.
 */
export const openNavIfCollapsed = async (page: Page): Promise<void> => {
  const button = page.locator('.header-menu-button');
  if (await button.isVisible()) {
    await button.click();
    await page.locator('.header-panel[data-open="true"]').waitFor();
  }
};
