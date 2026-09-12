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

/** Workspace pilot · Managed services · How it works · Trust · For MSPs */
export const headerNav: readonly NavItem[] = ROUTES.filter((r) => published(r) && r.inHeaderNav).map(
  toItem,
);

export interface FooterColumn {
  title: string;
  items: readonly NavItem[];
}

/* No Legal column. Privacy, terms and accessibility copy does not exist yet, and the refresh
   brief is explicit: publish real approved pages or omit the labels — never inert text that
   implies completed content and never a link to an empty page. LEGAL_PAGES in
   src/copy/placeholders.ts records the dependency. */
export const footerColumns: readonly FooterColumn[] = [
  {
    title: 'Service',
    items: ROUTES.filter((r) => published(r) && r.footerColumn === 'service').map(toItem),
  },
  {
    title: 'Company',
    items: ROUTES.filter((r) => published(r) && r.footerColumn === 'company').map(toItem),
  },
];

/** The mobile panel shows the header items; the primary action is rendered inside the panel. */
export const mobileNav: readonly NavItem[] = headerNav;
