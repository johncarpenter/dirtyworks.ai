export interface PullQuoteProps {
  children: React.ReactNode;
  attribution?: string;
  context?: string;
  tone?: "ink" | "bone";
  size?: "sm" | "md" | "lg";
  style?: React.CSSProperties;
}
/** Instrument Serif countervoice: human statements, questions, counterpoints. */
export declare function PullQuote(props: PullQuoteProps): JSX.Element;
