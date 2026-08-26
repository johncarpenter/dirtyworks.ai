import React from "react";
import { ProofLabel } from "./ProofLabel.jsx";

/**
 * Trust / control register. A public-facing table of controls: what is
 * controlled, how, who holds it, and its state. Leads with limitations.
 */
export function ControlRegister({ rows = [], caption, note, style }) {
  return (
    <div style={{ ...style }}>
      {caption ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            borderTop: "var(--border-editorial) solid var(--line-editorial)",
            paddingTop: "10px",
            marginBottom: "var(--space-2)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--type-label)",
              letterSpacing: "var(--track-label-wide)",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            {caption}
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--type-label-sm)",
              color: "var(--text-muted)",
              letterSpacing: "var(--track-label)",
            }}
          >
            REGISTER / {String(rows.length).padStart(2, "0")}
          </span>
        </div>
      ) : null}
      <div role="table">
        <div
          role="row"
          style={{
            display: "grid",
            gridTemplateColumns: "40px minmax(0,1.1fr) minmax(0,1.6fr) minmax(0,0.9fr) auto",
            gap: "var(--space-4)",
            padding: "8px 0",
            borderBottom: "var(--border-ordinary) solid var(--line-ordinary)",
            fontFamily: "var(--font-mono)",
            fontSize: "var(--type-label-sm)",
            letterSpacing: "var(--track-label)",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          <span>REF</span>
          <span>CONTROL</span>
          <span>HOW IT WORKS</span>
          <span>HELD BY</span>
          <span>STATE</span>
        </div>
        {rows.map((r, i) => (
          <div
            key={i}
            role="row"
            style={{
              display: "grid",
              gridTemplateColumns: "40px minmax(0,1.1fr) minmax(0,1.6fr) minmax(0,0.9fr) auto",
              gap: "var(--space-4)",
              padding: "14px 0",
              borderBottom: "var(--border-hair) solid var(--line-hairline)",
              alignItems: "start",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--type-label-sm)",
                color: "var(--blueprint)",
              }}
            >
              C{String(i + 1).padStart(2, "0")}
            </span>
            <span style={{ fontSize: "var(--type-body-sm)", fontWeight: 600, lineHeight: 1.35 }}>
              {r.control}
            </span>
            <span
              style={{
                fontSize: "var(--type-caption)",
                lineHeight: 1.5,
                color: "var(--text-muted)",
                textWrap: "pretty",
              }}
            >
              {r.mechanism}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--type-label-sm)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              {r.holder}
            </span>
            <ProofLabel status={r.status || "neutral"} size="sm">
              {r.state}
            </ProofLabel>
          </div>
        ))}
      </div>
      {note ? (
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--type-label-sm)",
            letterSpacing: "0.04em",
            color: "var(--text-muted)",
            marginTop: "var(--space-4)",
            maxWidth: "70ch",
            lineHeight: 1.6,
          }}
        >
          {note}
        </p>
      ) : null}
    </div>
  );
}
