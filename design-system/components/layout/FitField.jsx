import React from "react";
import { ProofLabel } from "../evidence/ProofLabel.jsx";

/**
 * Bounded fit / non-fit field. A large editorial spread per segment, with the
 * included scope and the explicitly excluded decisions side by side.
 */
export function FitField({ segment, label, summary, included = [], excluded = [], style }) {
  return (
    <section
      style={{
        display: "grid",
        gap: "var(--space-5)",
        borderTop: "var(--border-editorial) solid var(--line-editorial)",
        paddingTop: "var(--space-5)",
        ...style,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "16px" }}>
        {label ? <ProofLabel status="neutral" size="sm">{label}</ProofLabel> : <span />}
      </div>
      <h3
        style={{
          margin: 0,
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "clamp(30px, 3.2vw, 56px)",
          lineHeight: 0.98,
          letterSpacing: "var(--track-display)",
          textTransform: "uppercase",
        }}
      >
        {segment}
      </h3>
      <p style={{ margin: 0, fontSize: "var(--type-body)", lineHeight: 1.5, maxWidth: "48ch", textWrap: "pretty" }}>
        {summary}
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-6)" }}>
        <Col heading="IN SCOPE" items={included} mark="+" color="var(--blueprint)" />
        <Col heading="EXCLUDED INITIALLY" items={excluded} mark="—" color="var(--signal-orange)" />
      </div>
    </section>
  );
}

function Col({ heading, items, mark, color }) {
  return (
    <div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--type-label-sm)",
          fontWeight: 600,
          letterSpacing: "var(--track-label-wide)",
          textTransform: "uppercase",
          color,
          borderBottom: `var(--border-ordinary) solid ${color}`,
          paddingBottom: "6px",
          marginBottom: "10px",
        }}
      >
        {heading}
      </div>
      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: "8px" }}>
        {items.map((it, i) => (
          <li
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "16px 1fr",
              gap: "8px",
              fontSize: "var(--type-caption)",
              lineHeight: 1.45,
              color: "var(--text-body)",
            }}
          >
            <span style={{ fontFamily: "var(--font-mono)", color }}>{mark}</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
