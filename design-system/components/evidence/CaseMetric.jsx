import React from "react";

/**
 * Case-study metric with its method and source attached. A metric without a
 * visible baseline, period and method is not publishable — the component makes
 * the attribution structurally required.
 */
export function CaseMetric({ value, unit, label, baseline, period, method, source, hypothesis = false, style }) {
  return (
    <div
      style={{
        borderTop: "var(--border-editorial) solid var(--line-editorial)",
        paddingTop: "var(--space-4)",
        display: "grid",
        gap: "10px",
        ...style,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-end", gap: "6px" }}>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(48px, 6vw, 96px)",
            lineHeight: 0.82,
            letterSpacing: "-0.04em",
          }}
        >
          {value}
        </span>
        {unit ? (
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--type-label)",
              letterSpacing: "var(--track-label)",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              paddingBottom: "6px",
            }}
          >
            {unit}
          </span>
        ) : null}
      </div>
      <div style={{ fontSize: "var(--type-body-sm)", fontWeight: 600, lineHeight: 1.3, maxWidth: "30ch" }}>
        {label}
      </div>
      <dl
        style={{
          margin: 0,
          display: "grid",
          gap: "4px",
          fontFamily: "var(--font-mono)",
          fontSize: "var(--type-label-sm)",
          letterSpacing: "0.04em",
          color: "var(--text-muted)",
          textTransform: "uppercase",
        }}
      >
        {baseline ? <Line k="BASELINE" v={baseline} /> : null}
        {period ? <Line k="PERIOD" v={period} /> : null}
        {method ? <Line k="METHOD" v={method} /> : null}
        {source ? <Line k="SOURCE" v={source} /> : null}
      </dl>
      {hypothesis ? (
        <span
          style={{
            justifySelf: "start",
            background: "var(--signal-orange)",
            color: "var(--ink)",
            padding: "3px 7px",
            fontFamily: "var(--font-mono)",
            fontSize: "var(--type-label-sm)",
            fontWeight: 600,
            letterSpacing: "var(--track-label)",
          }}
        >
          HYPOTHESIS — NOT MEASURED
        </span>
      ) : null}
    </div>
  );
}

function Line({ k, v }) {
  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <dt style={{ minWidth: "72px", color: "var(--text-faint)" }}>{k}</dt>
      <dd style={{ margin: 0, color: "var(--text-body)" }}>{v}</dd>
    </div>
  );
}
