/* Navigation is DERIVED from the route table, never hand-authored. That is what makes a renamed
   or unpublished page unable to orphan a link (FR-003, SC-012). */
import { ROUTES, type RouteEntry, type RouteId } from './routes';

export interface NavItem {
  id: RouteId;
  label: string;
  href: string;
}

const published = (r: RouteEntry) => r.published;

const toItem = (r: RouteEntry): NavItem => ({ id: r.id, label: r.navLabel, href: r.path });

/** Services · Catalogue · Method · Trust · For MSPs */
export const headerNav: readonly NavItem[] = ROUTES.filter((r) => published(r) && r.inHeaderNav).map(
  toItem,
);

export interface FooterColumn {
  title: string;
  items: readonly NavItem[];
  /** inert text, pending copy — never rendered as links */
  inert?: readonly string[];
}

export const footerColumns: readonly FooterColumn[] = [
  {
    title: 'Service',
    items: ROUTES.filter((r) => published(r) && r.footerColumn === 'service').map(toItem),
  },
  {
    title: 'Company',
    items: ROUTES.filter((r) => published(r) && r.footerColumn === 'company').map(toItem),
  },
  {
    title: 'Legal',
    items: [],
    inert: ['Privacy', 'Terms', 'Accessibility'],
  },
];

/** The mobile panel shows the header items; the primary action is rendered inside the panel. */
export const mobileNav: readonly NavItem[] = headerNav;
