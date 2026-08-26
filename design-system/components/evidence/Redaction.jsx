import React from "react";

/**
 * Redaction / reveal. A heavy bar covers an imprecise statement; retracting it
 * exposes the precise one underneath. The brand's signature reveal motif.
 */
export function Redaction({ covered, revealed, open = false, onToggle, size = "md", tone = "ink", style }) {
  const fs = size === "lg" ? "clamp(32px, 4vw, 64px)" : size === "sm" ? "18px" : "clamp(22px, 2.4vw, 36px)";
  /* The bar must contrast with its ground: ink bar on bone surfaces, bone bar on ink surfaces. */
  const bar = tone === "bone" ? "var(--bone)" : "var(--ink)";
  const coveredColor = tone === "bone" ? "var(--ink)" : "var(--text-body)";
  return (
    <span
      onClick={onToggle}
      style={{
        position: "relative",
        display: "inline-block",
        fontFamily: "var(--font-display)",
        fontWeight: 800,
        fontSize: fs,
        lineHeight: 1.05,
        letterSpacing: "var(--track-heading)",
        textTransform: "uppercase",
        cursor: onToggle ? "pointer" : "default",
        ...style,
      }}
    >
      <span style={{ visibility: "hidden" }} aria-hidden="true">
        {(covered || "").length > (revealed || "").length ? covered : revealed}
      </span>
      <span
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          color: coveredColor,
          opacity: open ? 0 : 1,
          transition: "opacity var(--dur-fast) var(--ease-mech)",
        }}
      >
        {covered}
      </span>
      <span
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          color: "var(--signal-orange)",
          opacity: open ? 1 : 0,
          transition: `opacity var(--dur-base) var(--ease-mech) ${open ? "var(--dur-fast)" : "0ms"}`,
        }}
      >
        {revealed}
      </span>
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-4px",
          right: "-4px",
          top: "-2px",
          bottom: "-2px",
          background: bar,
          clipPath: open ? "inset(0 0 0 100%)" : "inset(0 0 0 0)",
          transition: "clip-path var(--dur-slow) var(--ease-mech)",
        }}
      />
    </span>
  );
}
