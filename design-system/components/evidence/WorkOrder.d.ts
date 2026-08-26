import type { ProofStatus } from "./ProofLabel";
export interface WorkOrderStep {
  name: string;
  detail: string;
  duration?: string;
  /** Handwritten-voice serif annotation in signal orange */
  annotation?: string;
  marks?: { label: string; value?: string; status?: ProofStatus }[];
}
export interface WorkOrderProps {
  steps: WorkOrderStep[];
  loopLabel?: string;
  style?: React.CSSProperties;
}
/**
 * Vertical annotated work order with a loop returning improvement to review.
 * @startingPoint section="Evidence" subtitle="Annotated lifecycle work order" viewport="700x400"
 */
export declare function WorkOrder(props: WorkOrderProps): JSX.Element;
