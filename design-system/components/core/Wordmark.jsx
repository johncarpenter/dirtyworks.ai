import React from "react";

/**
 * Type-set wordmark. No logo files were supplied with the brand materials, so
 * the brand is set in plain heavy grotesk (creative-direction Route 1:
 * lowercase working wordmark). The period before `ai` takes the signal-orange
 * registration colour. Replace with a licensed vector mark when one exists.
 */
export function Wordmark({ size = 20, tone = "ink", showDot = true, style }) {
  const color =
    tone === "bone" ? "var(--bone)" : tone === "orange" ? "var(--signal-orange)" : "var(--ink)";
  return (
    <span
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 900,
        fontSize: size,
        letterSpacing: "-0.035em",
        lineHeight: 1,
        color,
        whiteSpace: "nowrap",
        display: "inline-block",
        ...style,
      }}
    >
      dirtyworks
      <span style={{ color: showDot ? "var(--signal-orange)" : color }}>.</span>
      ai
    </span>
  );
}
