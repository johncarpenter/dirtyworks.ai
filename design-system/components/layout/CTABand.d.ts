export interface CTABandAction { label: string; href?: string; onClick?: () => void }
export interface CTABandProps {
  heading: string;
  support?: string;
  primary?: CTABandAction;
  secondary?: CTABandAction;
  /** Folio/version device, e.g. "11 / CONVERSION" */
  folio?: string;
  tone?: "ink" | "orange";
  style?: React.CSSProperties;
}
/**
 * Full-bleed hard conversion band with one specific action.
 * @startingPoint section="Layout" subtitle="Full-bleed conversion band" viewport="700x300"
 */
export declare function CTABand(props: CTABandProps): JSX.Element;
