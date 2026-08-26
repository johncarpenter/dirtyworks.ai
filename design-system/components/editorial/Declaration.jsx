import React from "react";

/**
 * Oversized declaration. One huge statement, one tiny evidence label, one
 * decisive rule. Optional single grid violation via `crop` and `offset`.
 */
export function Declaration({
  children,
  label,
  descriptor,
  align = "left",
  tone = "ink",
  crop = false,
  rule = true,
  size = "display",
  style,
}) {
  const fs = size === "h1" ? "var(--type-h1)" : size === "h2" ? "var(--type-h2)" : "var(--type-display)";
  return (
    <div style={{ display: "grid", gap: "var(--space-5)", textAlign: align, ...style }}>
      {label ? (
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--type-label)",
            fontWeight: 600,
            letterSpacing: "var(--track-label-wide)",
            textTransform: "uppercase",
            color: "var(--signal-orange)",
          }}
        >
          {label}
        </span>
      ) : null}
      {rule ? <hr style={{ border: 0, borderTop: "var(--border-editorial) solid var(--line-editorial)", margin: 0 }} /> : null}
      <h2
        style={{
          margin: 0,
          fontFamily: "var(--font-display)",
          fontWeight: 900,
          fontSize: fs,
          lineHeight: "var(--leading-display)",
          letterSpacing: "var(--track-display)",
          textTransform: "uppercase",
          color: tone === "bone" ? "var(--bone)" : tone === "orange" ? "var(--signal-orange)" : "var(--text-body)",
          marginLeft: crop ? "calc(var(--crop-max) * -0.5)" : 0,
          textWrap: "balance",
        }}
      >
        {children}
      </h2>
      {descriptor ? (
        <p
          style={{
            margin: 0,
            fontFamily: "var(--font-mono)",
            fontSize: "var(--type-label)",
            letterSpacing: "var(--track-label)",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            maxWidth: "48ch",
            marginInline: align === "center" ? "auto" : 0,
            lineHeight: 1.5,
          }}
        >
          {descriptor}
        </p>
      ) : null}
    </div>
  );
}
