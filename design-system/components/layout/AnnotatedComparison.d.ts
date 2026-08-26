export interface ComparisonRow {
  left: string;
  right: string;
  /** Fills the right cell with verified acid — use once per table */
  decisive?: boolean;
}
export interface AnnotatedComparisonProps {
  leftTitle: string;
  rightTitle: string;
  rows: ComparisonRow[];
  /** Serif margin note, rotated within the -3deg..+3deg allowance */
  annotation?: string;
  style?: React.CSSProperties;
}
/**
 * Two fields with one decisive contrast; left column struck through.
 * @startingPoint section="Layout" subtitle="Two-field comparison with one decisive row" viewport="700x340"
 */
export declare function AnnotatedComparison(props: AnnotatedComparisonProps): JSX.Element;
