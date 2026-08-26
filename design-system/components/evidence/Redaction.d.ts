export interface RedactionProps {
  /** The imprecise statement under the bar */
  covered: string;
  /** The precise statement the retract reveals */
  revealed: string;
  open?: boolean;
  onToggle?: () => void;
  size?: "sm" | "md" | "lg";
  /** Ground the bar sits on — "bone" inverts the bar to bone for dark surfaces */
  tone?: "ink" | "bone";
  style?: React.CSSProperties;
}
/** Redaction bar that retracts to reveal a more precise statement. */
export declare function Redaction(props: RedactionProps): JSX.Element;
