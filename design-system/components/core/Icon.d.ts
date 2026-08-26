export interface IconProps {
  /** Material Symbols Sharp identifier, e.g. "folder_open" */
  name: string;
  size?: number;
  weight?: number;
  color?: string;
  /** Accessible label; omit for decorative glyphs */
  label?: string;
  style?: React.CSSProperties;
}
/** Square-cornered icon-font glyph. Substituted set — see readme ICONOGRAPHY. */
export declare function Icon(props: IconProps): JSX.Element;
