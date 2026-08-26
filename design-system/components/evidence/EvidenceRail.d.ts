import type { ProofStatus } from "./ProofLabel";
export interface EvidenceItem {
  text: string;
  /** Small mono origin line, e.g. "SHAREPOINT / OPS-PROCEDURES" */
  origin?: string;
  status?: ProofStatus;
  statusLabel?: string;
}
export interface EvidenceRailProps {
  items: EvidenceItem[];
  /** false = misaligned source sheets; true = aligned register */
  aligned?: boolean;
  title?: string;
  style?: React.CSSProperties;
}
/**
 * Register of source fragments that begins misaligned and aligns on scroll.
 * @startingPoint section="Evidence" subtitle="Misaligned source sheets that align" viewport="700x320"
 */
export declare function EvidenceRail(props: EvidenceRailProps): JSX.Element;
