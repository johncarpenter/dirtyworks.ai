export interface DiagnosticFormProps {
  heading?: string;
  /** Data-handling note; never request customer documents here */
  note?: string;
  onSubmit?: () => void;
  style?: React.CSSProperties;
}
/**
 * Diagnostic intake asking about one real stuck event.
 * @startingPoint section="Forms" subtitle="Stuck-event diagnostic intake" viewport="700x400"
 */
export declare function DiagnosticForm(props: DiagnosticFormProps): JSX.Element;
