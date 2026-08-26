export interface FooterColumn { title: string; links: { id: string; label: string }[] }
export interface SiteFooterProps {
  columns: FooterColumn[];
  location?: string;
  version?: string;
  onNavigate?: (id: string) => void;
  style?: React.CSSProperties;
}
/** Index-sheet footer with operating location and document version device. */
export declare function SiteFooter(props: SiteFooterProps): JSX.Element;
