/* Single source for routing, metadata, navigation membership and publication gating.

   The table was rebuilt for the workspace-pilot refresh (dirtyworks-company MKT-001): the pilot
   leads the header, the catalogue and the contact page move to the footer with their routes and
   inbound links preserved, and every primary action carries the inquiry interest it should
   preselect on /start. tests/unit/routes.test.ts asserts the invariants. */

export type RouteId =
  | 'home'
  | 'workspace'
  | 'services'
  | 'catalogue'
  | 'method'
  | 'trust'
  | 'msps'
  | 'about'
  | 'notes'
  | 'start';

export type HeaderAction = 'buyer' | 'partner' | 'current';

export interface RouteEntry {
  id: RouteId;
  path: string;
  /** page file under src/pages, relative and without extension */
  page: string;
  title: string;
  description: string | null;
  navLabel: string;
  inHeaderNav: boolean;
  footerColumn: 'service' | 'company' | null;
  headerAction: HeaderAction;
  ctaPrimary: RouteId | null;
  ctaSecondary: RouteId | null;
  /** false removes the route from the build, navigation and every CTA target */
  published: boolean;
}

export const ROUTES: readonly RouteEntry[] = [
  {
    id: 'home',
    path: '/',
    page: 'index',
    title: 'Managed AI Workspace Pilot for Alberta Businesses | Dirtyworks.ai',
    description:
      'Start a managed AI workspace pilot with Dirtyworks.ai. A Cloudflare OS environment ' +
      'customized for your team, with onboarding and support.',
    navLabel: 'Home',
    inHeaderNav: false,
    footerColumn: null,
    headerAction: 'buyer',
    ctaPrimary: 'start',
    ctaSecondary: 'workspace',
    published: true,
  },
  {
    id: 'workspace',
    path: '/workspace',
    page: 'workspace',
    title: 'Managed AI Workspace Pilot | Dirtyworks.ai',
    description:
      'Explore a Cloudflare OS workspace pilot customized for your team, with onboarding, ' +
      'approved connections, and support from Dirtyworks.ai.',
    navLabel: 'Workspace pilot',
    inHeaderNav: true,
    footerColumn: 'service',
    headerAction: 'buyer',
    ctaPrimary: 'start',
    ctaSecondary: 'method',
    published: true,
  },
  {
    id: 'services',
    path: '/services',
    page: 'services',
    title: 'AI managed services | Dirtyworks.ai',
    description: null,
    navLabel: 'Managed services',
    inHeaderNav: true,
    footerColumn: 'service',
    headerAction: 'buyer',
    ctaPrimary: 'start',
    ctaSecondary: 'method',
    published: true,
  },
  {
    id: 'catalogue',
    path: '/catalogue',
    page: 'catalogue',
    title: 'Managed AI product catalogue | Dirtyworks.ai',
    description: null,
    navLabel: 'Catalogue',
    inHeaderNav: false,
    footerColumn: 'service',
    headerAction: 'buyer',
    ctaPrimary: 'start',
    ctaSecondary: 'services',
    published: true,
  },
  {
    id: 'method',
    path: '/method',
    page: 'method',
    title: 'Managed AI operating method | Dirtyworks.ai',
    description: null,
    navLabel: 'How it works',
    inHeaderNav: true,
    footerColumn: 'service',
    headerAction: 'buyer',
    ctaPrimary: 'start',
    ctaSecondary: 'trust',
    published: true,
  },
  {
    id: 'trust',
    path: '/trust',
    page: 'trust',
    title: 'AI governance, controls, and operating boundaries | Dirtyworks.ai',
    description: null,
    navLabel: 'Trust',
    inHeaderNav: true,
    footerColumn: 'service',
    headerAction: 'buyer',
    ctaPrimary: 'start',
    ctaSecondary: 'services',
    published: true,
  },
  {
    id: 'msps',
    path: '/msps',
    page: 'msps',
    title: 'Managed AI operations for MSP partners | Dirtyworks.ai',
    description: null,
    navLabel: 'For MSPs',
    inHeaderNav: true,
    footerColumn: 'company',
    headerAction: 'partner',
    ctaPrimary: 'start',
    ctaSecondary: 'trust',
    published: true,
  },
  {
    id: 'about',
    path: '/about',
    page: 'about',
    title: 'About and contact | Dirtyworks.ai',
    description:
      'Who Dirtyworks.ai is, and how to reach us: email hello@dirtyworks.ai, a workspace pilot ' +
      'or existing-AI inquiry, or a partner enquiry. Calgary, Alberta.',
    navLabel: 'About & contact',
    // Footer, not header: the header carries the pilot journey. The route and every inbound link
    // are preserved; "Contact us" on its own is a banned call to action (content-check RULE-3).
    inHeaderNav: false,
    footerColumn: 'company',
    headerAction: 'buyer',
    ctaPrimary: 'start',
    ctaSecondary: 'method',
    // Publishes without founder content. The page describes the company and how to reach it; it
    // names no person, so nothing on it is invented. FOUNDER_PROFILE stays open in
    // src/copy/placeholders.ts and gates the founder band, which is withheld rather than filled.
    published: true,
  },
  {
    id: 'notes',
    path: '/notes',
    page: 'notes',
    title: 'Notes on managed AI operations | Dirtyworks.ai',
    description: null,
    navLabel: 'Notes',
    inHeaderNav: false,
    footerColumn: 'company',
    headerAction: 'buyer',
    ctaPrimary: 'start',
    ctaSecondary: 'workspace',
    published: true,
  },
  {
    id: 'start',
    path: '/start',
    page: 'start',
    title: 'Start an inquiry | Dirtyworks.ai',
    description: null,
    navLabel: 'Start an inquiry',
    inHeaderNav: false,
    footerColumn: 'company',
    headerAction: 'current',
    ctaPrimary: null,
    ctaSecondary: 'msps',
    published: true,
  },
];

export const routeById = (id: RouteId): RouteEntry => {
  const found = ROUTES.find((r) => r.id === id);
  if (!found) throw new Error(`Unknown route id: ${id}`);
  return found;
};

export const hrefFor = (id: RouteId): string => routeById(id).path;

export const isPublished = (id: RouteId): boolean => routeById(id).published;

/* The three inquiry interests /start recognises in its query string. Anything else falls back to
   the neutral selection; see src/copy/inquiry.ts, which owns the list and the parser. */
export type InquiryInterestParam = 'workspace-pilot' | 'existing-ai' | 'msp-partner';

/** `/start?interest=…` — the shared inquiry form with one interest preselected. */
export const inquiryHref = (interest: InquiryInterestParam): string =>
  `${hrefFor('start')}?interest=${interest}`;

export const HEADER_ACTIONS: Record<HeaderAction, { label: string; href: string | null }> = {
  buyer: { label: 'Discuss a workspace pilot', href: inquiryHref('workspace-pilot') },
  partner: { label: 'Discuss an MSP pilot', href: inquiryHref('msp-partner') },
  current: { label: 'Start', href: null },
};
