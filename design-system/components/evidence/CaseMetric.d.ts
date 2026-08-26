export interface CaseMetricProps {
  value: string | number;
  unit?: string;
  label: string;
  baseline?: string;
  period?: string;
  method?: string;
  source?: string;
  /** Stamps HYPOTHESIS — NOT MEASURED; required for unvalidated numbers */
  hypothesis?: boolean;
  style?: React.CSSProperties;
}
/** Metric with baseline, period, method and source structurally attached. */
export declare function CaseMetric(props: CaseMetricProps): JSX.Element;
