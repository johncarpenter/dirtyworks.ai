import type { ProofStatus } from "./ProofLabel";
export interface OwnerRowProps {
  item: string;
  /** Renders UNOWNED in orange when absent */
  owner?: string;
  checked?: string;
  status?: ProofStatus;
  statusLabel?: string;
  index?: number;
  style?: React.CSSProperties;
}
/** One accountability line: what, who owns it, when checked, what state. */
export declare function OwnerRow(props: OwnerRowProps): JSX.Element;
