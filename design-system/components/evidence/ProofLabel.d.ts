export type ProofStatus =
  | "source" | "owner" | "permission" | "answer"
  | "gap" | "human" | "change" | "operated" | "neutral";
export interface ProofLabelProps {
  children: React.ReactNode;
  /** Right-hand half of a SOURCE / 03 pair */
  value?: string;
  status?: ProofStatus;
  size?: "sm" | "md";
  style?: React.CSSProperties;
}
/**
 * Square-cornered evidence chip / status stamp. Only apply a status that
 * corresponds to real content.
 * @startingPoint section="Evidence" subtitle="Status stamps for source, owner, gap, verified" viewport="700x160"
 */
export declare function ProofLabel(props: ProofLabelProps): JSX.Element;
