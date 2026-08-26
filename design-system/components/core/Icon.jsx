import React from "react";

/**
 * Material Symbols Sharp glyph wrapper. Square-cornered icon font substituted
 * for the (undefined) brand icon set — see readme.md ICONOGRAPHY.
 * Names are Material Symbols identifiers, e.g. "folder_open", "search", "bolt".
 */
export function Icon({ name, size = 20, weight = 500, color = "currentColor", label, style }) {
  return (
    <span
      className="material-symbols-sharp"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : "true"}
      style={{
        fontFamily: "var(--font-icon)",
        fontVariationSettings: `'FILL' 0, 'wght' ${weight}, 'GRAD' 0, 'opsz' 24`,
        fontSize: size,
        lineHeight: 1,
        color,
        display: "inline-block",
        flex: "0 0 auto",
        userSelect: "none",
        ...style,
      }}
    >
      {name}
    </span>
  );
}
