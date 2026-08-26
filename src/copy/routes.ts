/* Single source for routing, metadata, navigation membership and publication gating.
   Titles and descriptions are verbatim from mockups/README.md — content, not implementation
   detail. The one exception is /about, which the README scoped as an about page and which now
   also carries the contact register; its title says so. tests/unit/routes.test.ts asserts the
   invariants. */

export type RouteId =
  | 'home'
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
    title: 'Dirtyworks.ai | Managed AI operations for Alberta businesses',
    description:
      'An AI MSP for product selection, account and user management, training, integrations, ' +
      'knowledge, governance, monitoring, support, and cost control.',
    navLabel: 'Home',
    inHeaderNav: false,
    footerColumn: null,
    headerAction: 'buyer',
    ctaPrimary: 'start',
    ctaSecondary: 'msps',
    published: true,
  },
  {
    id: 'services',
    path: '/services',
    page: 'services',
    title: 'AI managed services | Dirtyworks.ai',
    description: null,
    navLabel: 'Services',
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
    inHeaderNav: true,
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
    navLabel: 'Method',
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
      'Who Dirtyworks.ai is, and how to reach us: email hello@dirtyworks.ai, the operating-gap ' +
      'intake, or a partner enquiry. Calgary, Alberta.',
    navLabel: 'About & contact',
    // In the header because the contact route is the one visitors hunt for. The label names both
    // halves of the page; "Contact us" on its own is a banned call to action (content-check RULE-3).
    inHeaderNav: true,
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
    ctaSecondary: 'services',
    published: true,
  },
  {
    id: 'start',
    path: '/start',
    page: 'start',
    title: 'Map your AI stack | Dirtyworks.ai',
    description: null,
    navLabel: 'Map your AI stack',
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

export const HEADER_ACTIONS: Record<HeaderAction, { label: string; href: string | null }> = {
  buyer: { label: 'Map your AI stack', href: '/start' },
  partner: { label: 'Design a partner pilot', href: '/start' },
  current: { label: 'Start', href: null },
};
