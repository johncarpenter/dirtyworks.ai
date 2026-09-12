import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { ROUTES, routeById, HEADER_ACTIONS, inquiryHref } from '../../src/copy/routes';
import { headerNav, footerColumns } from '../../src/copy/navigation';

const PAGES = join(process.cwd(), 'src', 'pages');
const navIds = [
  ...headerNav.map((i) => i.id),
  ...footerColumns.flatMap((c) => c.items.map((i) => i.id)),
];

describe('route model', () => {
  it('declares the ten routes and nothing else', () => {
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
      '/workspace',
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

  it('preselects the matching inquiry interest from each header action', () => {
    expect(HEADER_ACTIONS.current.href).toBeNull();
    expect(HEADER_ACTIONS.buyer).toEqual({
      label: 'Discuss a workspace pilot',
      href: '/start?interest=workspace-pilot',
    });
    expect(HEADER_ACTIONS.partner).toEqual({
      label: 'Discuss an MSP pilot',
      href: '/start?interest=msp-partner',
    });
  });

  it('builds interest links against the shared inquiry route', () => {
    expect(inquiryHref('workspace-pilot')).toBe('/start?interest=workspace-pilot');
    expect(inquiryHref('existing-ai')).toBe('/start?interest=existing-ai');
    expect(inquiryHref('msp-partner')).toBe('/start?interest=msp-partner');
  });

  it('leads the header with the pilot and keeps the five items in order', () => {
    expect(headerNav.map((i) => i.label)).toEqual([
      'Workspace pilot',
      'Managed services',
      'How it works',
      'Trust',
      'For MSPs',
    ]);
  });

  /* Moved to the footer by the refresh, routes and inbound links preserved. */
  it('keeps the catalogue and the contact page reachable from the footer', () => {
    const service = footerColumns.find((c) => c.title === 'Service');
    const company = footerColumns.find((c) => c.title === 'Company');
    expect(service?.items.map((i) => i.id)).toContain('catalogue');
    expect(company?.items.map((i) => i.id)).toContain('about');
    expect(headerNav.map((i) => i.id)).not.toContain('catalogue');
    expect(headerNav.map((i) => i.id)).not.toContain('about');
  });

  /* RULE-3 of the release gate bans "Contact us" as a call to action; a navigation label that
     normalised to exactly that string would be caught in dist/ rather than here. */
  it('never labels a destination with a banned call to action', () => {
    const banned = ['get started', 'learn more', 'book a demo', 'contact us', 'talk to sales'];
    for (const route of ROUTES) {
      expect(banned, route.id).not.toContain(route.navLabel.toLowerCase());
    }
  });

  /* No inert labels and no empty links: the footer carries no legal column until approved copy
     exists (LEGAL_PAGES in src/copy/placeholders.ts). */
  it('publishes no legal column while the legal copy does not exist', () => {
    expect(footerColumns.map((c) => c.title)).toEqual(['Service', 'Company']);
    for (const column of footerColumns) {
      for (const item of column.items) expect(item.href.startsWith('/')).toBe(true);
    }
  });

  it('keeps the neutral inquiry route in the footer company column', () => {
    const company = footerColumns.find((c) => c.title === 'Company');
    expect(company?.items.find((i) => i.id === 'start')?.href).toBe('/start');
  });

  it('gives the home and workspace pages the pilot titles and descriptions', () => {
    expect(routeById('home').title).toBe(
      'Managed AI Workspace Pilot for Alberta Businesses | Dirtyworks.ai',
    );
    expect(routeById('home').description).toMatch(/managed AI workspace pilot/);
    expect(routeById('workspace').title).toBe('Managed AI Workspace Pilot | Dirtyworks.ai');
    expect(routeById('workspace').description).toMatch(/Cloudflare OS workspace pilot/);
  });
});
