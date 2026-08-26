export interface FitFieldProps {
  segment: string;
  label?: string;
  summary: string;
  included: string[];
  /** Excluded decisions are content, not a disclaimer */
  excluded: string[];
  style?: React.CSSProperties;
}
/** Bounded fit / non-fit editorial spread for one segment. */
export declare function FitField(props: FitFieldProps): JSX.Element;
