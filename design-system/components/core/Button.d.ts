export interface ButtonProps {
  children: React.ReactNode;
  /** primary = orange action; evidence = blueprint; secondary/ghost = outlined */
  variant?: "primary" | "secondary" | "evidence" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  /** Material Symbols Sharp glyph name, rendered before the label */
  icon?: string;
  iconAfter?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
}
/**
 * Rectangular, high-contrast action with a specific label. Radius 0, hard
 * offset shadow that collapses on press. Never a pill.
 * @startingPoint section="Core" subtitle="Rectangular actions, four variants" viewport="700x200"
 */
export declare function Button(props: ButtonProps): JSX.Element;
