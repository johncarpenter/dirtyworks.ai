import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { ROUTES, routeById, HEADER_ACTIONS } from '../../src/copy/routes';
import { headerNav, footerColumns } from '../../src/copy/navigation';

const PAGES = join(process.cwd(), 'src', 'pages');
const navIds = [
  ...headerNav.map((i) => i.id),
  ...footerColumns.flatMap((c) => c.items.map((i) => i.id)),
];

describe('route model', () => {
  it('declares the nine specified routes and nothing else', () => {
    expect(ROUTES.map((r) => r.path).sort()).toEqual([
      '/',
      '/about',
      '/catalogue',
      '/method',
      '/msps',
      '/notes',
      '/services',
      '/start',
      '/trust',
    ]);
  });

  it('has unique ids and paths', () => {
    expect(new Set(ROUTES.map((r) => r.id)).size).toBe(ROUTES.length);
    expect(new Set(ROUTES.map((r) => r.path)).size).toBe(ROUTES.length);
  });

  it('resolves every route to a page file', () => {
    for (const route of ROUTES) {
      expect(existsSync(join(PAGES, `${route.page}.astro`)), route.page).toBe(true);
    }
  });

  it('shows every published route in navigation', () => {
    for (const route of ROUTES.filter((r) => r.published && r.id !== 'home')) {
      expect(navIds, route.id).toContain(route.id);
    }
  });

  it('never shows an unpublished route in navigation', () => {
    for (const route of ROUTES.filter((r) => !r.published)) {
      expect(navIds, route.id).not.toContain(route.id);
    }
  });

  it('points every CTA at a published route', () => {
    for (const route of ROUTES) {
      for (const target of [route.ctaPrimary, route.ctaSecondary]) {
        if (target === null) continue;
        expect(routeById(target).published, `${route.id} -> ${target}`).toBe(true);
      }
    }
  });

  it('uses the partner action only on /msps and the current-page marker only on /start', () => {
    expect(ROUTES.filter((r) => r.headerAction === 'partner').map((r) => r.id)).toEqual(['msps']);
    expect(ROUTES.filter((r) => r.headerAction === 'current').map((r) => r.id)).toEqual(['start']);
  });

  it('gives the current-page action no destination', () => {
    expect(HEADER_ACTIONS.current.href).toBeNull();
    expect(HEADER_ACTIONS.buyer.href).toBe('/start');
    expect(HEADER_ACTIONS.partner.href).toBe('/start');
  });

  it('puts the six primary items in the header, in order', () => {
    expect(headerNav.map((i) => i.label)).toEqual([
      'Services',
      'Catalogue',
      'Method',
      'Trust',
      'For MSPs',
      'About & contact',
    ]);
  });

  /* The reason /about was published: the address was reachable only through the footer. */
  it('keeps the contact route in the header navigation', () => {
    expect(headerNav.map((i) => i.id)).toContain('about');
  });

  /* RULE-3 of the release gate bans "Contact us" as a call to action; a navigation label that
     normalised to exactly that string would be caught in dist/ rather than here. */
  it('never labels a destination with a banned call to action', () => {
    const banned = ['get started', 'learn more', 'book a demo', 'contact us', 'talk to sales'];
    for (const route of ROUTES) {
      expect(banned, route.id).not.toContain(route.navLabel.toLowerCase());
    }
  });

  it('keeps legal footer items as inert text, never links', () => {
    const legal = footerColumns.find((c) => c.title === 'Legal');
    expect(legal?.items).toEqual([]);
    expect(legal?.inert).toEqual(['Privacy', 'Terms', 'Accessibility']);
  });

  it('keeps the conversion action in the footer company column', () => {
    const company = footerColumns.find((c) => c.title === 'Company');
    expect(company?.items.map((i) => i.label)).toContain('Map your AI stack');
  });
});
