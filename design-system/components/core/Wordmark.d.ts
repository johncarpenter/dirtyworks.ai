export interface WordmarkProps {
  size?: number | string;
  tone?: "ink" | "bone" | "orange";
  /** Colour the period before "ai" as a registration point */
  showDot?: boolean;
  style?: React.CSSProperties;
}
/** Type-set brand wordmark. No logo files exist yet; this is plain heavy grotesk. */
export declare function Wordmark(props: WordmarkProps): JSX.Element;
