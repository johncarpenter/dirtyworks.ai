export type IconName =
  | "verified" | "work-order" | "register" | "diagnostic" | "controlled"
  | "sla-clock" | "gap" | "annotate" | "owner" | "measured"
  | "verified-date" | "handoff" | "process" | "improvement" | "quality-control"
  | "monitoring" | "decision" | "operations" | "requirements" | "calendar";

export interface IconProps {
  /** Semantic icon name from the registry; a raw Material Symbols id also works as an escape hatch */
  name: IconName | string;
  size?: number;
  /** Glyph-mode weight only; ignored in svg mode */
  weight?: number;
  color?: string;
  /** Path to assets/icons/ relative to the page; defaults to window.DS_ICON_BASE */
  base?: string;
  /** Accessible label; omit for decorative marks */
  label?: string;
  style?: React.CSSProperties;
}
/** Line icon from the Dirtyworks.ai set. Semantic names — see assets/icons/registry.json. */
export declare function Icon(props: IconProps): JSX.Element;
export declare const ICON_MODE: "glyph" | "svg";
export declare const ICONS: Record<string, { file: string; glyph: string }>;
