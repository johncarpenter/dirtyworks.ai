export interface SiteNavItem { id: string; label: string }
export interface SiteHeaderProps {
  items: SiteNavItem[];
  active?: string;
  onNavigate?: (id: string) => void;
  cta?: { label: string; onClick?: () => void };
  /** Persistent folio/version detail */
  version?: string;
  tone?: "bone" | "ink";
  style?: React.CSSProperties;
}
/** Compact site nav with a persistent version marker. */
export declare function SiteHeader(props: SiteHeaderProps): JSX.Element;
