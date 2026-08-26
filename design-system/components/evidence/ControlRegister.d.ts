import type { ProofStatus } from "./ProofLabel";
export interface ControlRow {
  control: string;
  mechanism: string;
  holder: string;
  state: string;
  status?: ProofStatus;
}
export interface ControlRegisterProps {
  rows: ControlRow[];
  caption?: string;
  /** Limitation note; the trust page leads with these */
  note?: string;
  style?: React.CSSProperties;
}
/**
 * Public-facing register of controls, mechanisms, holders and states.
 * @startingPoint section="Evidence" subtitle="Public control register table" viewport="700x340"
 */
export declare function ControlRegister(props: ControlRegisterProps): JSX.Element;
