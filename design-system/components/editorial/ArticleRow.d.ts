export interface ArticleRowProps {
  index: number;
  title: string;
  /** One-line thesis; the index shows argument, not excerpt */
  thesis: string;
  /** Evidence type, e.g. "MARKET EVIDENCE" or "METHOD" */
  evidence: string;
  date: string;
  readingTime: string;
  href?: string;
  style?: React.CSSProperties;
}
/** Editorial index row for NOTES. Not a blog card. */
export declare function ArticleRow(props: ArticleRowProps): JSX.Element;
