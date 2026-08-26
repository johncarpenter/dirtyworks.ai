import React from "react";

/**
 * Pull quote in the editorial serif countervoice. Reserved for human
 * statements, questions, and counterpoints — never decorative luxury.
 */
export function PullQuote({ children, attribution, context, tone = "ink", size = "md", style }) {
  const fs = size === "lg" ? "clamp(40px, 5vw, 84px)" : size === "sm" ? "clamp(24px, 2.4vw, 34px)" : "clamp(30px, 3.4vw, 56px)";
  return (
    <figure style={{ margin: 0, display: "grid", gap: "var(--space-5)", ...style }}>
      <blockquote
        style={{
          margin: 0,
          fontFamily: "var(--font-serif)",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: fs,
          lineHeight: 1.06,
          letterSpacing: "-0.015em",
          color: tone === "bone" ? "var(--bone)" : "var(--text-body)",
          maxWidth: "34ch",
          textWrap: "balance",
        }}
      >
        {children}
      </blockquote>
      {attribution || context ? (
        <figcaption
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "12px",
            flexWrap: "wrap",
            borderTop: "var(--border-ordinary) solid var(--line-ordinary)",
            paddingTop: "10px",
            fontFamily: "var(--font-mono)",
            fontSize: "var(--type-label-sm)",
            letterSpacing: "var(--track-label)",
            textTransform: "uppercase",
          }}
        >
          {attribution ? <span style={{ fontWeight: 600 }}>{attribution}</span> : null}
          {context ? <span style={{ color: "var(--text-muted)" }}>{context}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
