export interface DeclarationProps {
  children: React.ReactNode;
  /** Small orange mono proof label above the rule */
  label?: string;
  /** Small mono descriptor below */
  descriptor?: string;
  align?: "left" | "center";
  tone?: "ink" | "bone" | "orange";
  /** Pull the display word off the left edge as the grid violation */
  crop?: boolean;
  rule?: boolean;
  size?: "display" | "h1" | "h2";
  style?: React.CSSProperties;
}
/**
 * Oversized declaration: one huge statement, one tiny label, one hard rule.
 * @startingPoint section="Editorial" subtitle="Oversized declaration with proof label" viewport="700x300"
 */
export declare function Declaration(props: DeclarationProps): JSX.Element;
