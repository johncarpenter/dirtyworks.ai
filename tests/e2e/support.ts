import type { Page } from '@playwright/test';

/**
 * Below 1025px the header collapses: the nav list and the primary action move into the disclosure
 * panel. Tests that need either must open the panel first — that is the specified behaviour, not a
 * workaround.
 */
export const openNavIfCollapsed = async (page: Page): Promise<void> => {
  const button = page.locator('.header-menu-button');
  if (await button.isVisible()) {
    await waitForHeaderHydration(page);
    await button.click();
    await page.locator('.header-panel[data-open="true"]').waitFor();
  }
};

/**
 * The header is an Astro island. The menu button is rendered and styled server-side, so it is
 * visible and clickable before React has attached anything to it — a press that lands in that
 * window is simply lost. Astro drops the `ssr` attribute from `<astro-island>` once the component
 * takes over, which is the observable signal that the disclosure is live.
 */
export const waitForHeaderHydration = async (page: Page): Promise<void> => {
  await page.locator('.site-header astro-island:not([ssr])').waitFor();
};

/**
 * Sideways scroll and the widest offender behind it. Scans the whole body rather than `main`
 * because the header chrome is a real source of overflow — the open disclosure panel was one.
 */
export const measureOverflow = async (page: Page) =>
  page.evaluate(() => {
    const clientWidth = document.documentElement.clientWidth;
    let widest = { tag: '', right: 0 };
    for (const node of document.querySelectorAll('body *')) {
      const rect = node.getBoundingClientRect();
      if (rect.right > widest.right) {
        widest = { tag: `${node.tagName}.${node.className}`, right: rect.right };
      }
    }
    return { scrollWidth: document.documentElement.scrollWidth, clientWidth, widest };
  });
