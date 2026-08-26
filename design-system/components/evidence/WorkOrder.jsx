import React from "react";
import { ProofLabel } from "./ProofLabel.jsx";

/**
 * Work-order lifecycle. A vertical work order with annotations and a loop
 * returning improvement to review — deliberately not four equal cards.
 */
export function WorkOrder({ steps = [], loopLabel = "IMPROVEMENT RETURNS TO REVIEW", style }) {
  return (
    <div style={{ position: "relative", ...style }}>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "27px",
          top: "14px",
          bottom: "52px",
          width: "var(--border-ordinary)",
          background: "var(--ink)",
        }}
      />
      <div style={{ display: "grid", gap: "var(--space-2)" }}>
        {steps.map((s, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "56px 1fr",
              gap: "var(--space-5)",
              alignItems: "start",
              position: "relative",
              paddingBottom: "var(--space-5)",
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                background: i === steps.length - 1 ? "var(--verified-acid)" : "var(--ink)",
                color: i === steps.length - 1 ? "var(--ink)" : "var(--bone)",
                display: "grid",
                placeItems: "center",
                fontFamily: "var(--font-mono)",
                fontWeight: 600,
                fontSize: "18px",
                position: "relative",
                zIndex: 1,
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </div>
            <div
              style={{
                borderTop: "var(--border-ordinary) solid var(--line-ordinary)",
                paddingTop: "10px",
                marginLeft: i % 2 ? "var(--offset-hard)" : "0",
                transition: "margin var(--dur-base) var(--ease-mech)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "var(--space-4)",
                  flexWrap: "wrap",
                }}
              >
                <h4
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "clamp(24px, 2.4vw, 38px)",
                    letterSpacing: "var(--track-heading)",
                    textTransform: "uppercase",
                    lineHeight: 1,
                  }}
                >
                  {s.name}
                </h4>
                {s.duration ? <ProofLabel status="neutral" size="sm">{s.duration}</ProofLabel> : null}
              </div>
              <p
                style={{
                  margin: "10px 0 0",
                  fontSize: "var(--type-body-sm)",
                  lineHeight: 1.5,
                  maxWidth: "56ch",
                  color: "var(--text-body)",
                  textWrap: "pretty",
                }}
              >
                {s.detail}
              </p>
              {s.annotation ? (
                <p
                  style={{
                    margin: "10px 0 0",
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontSize: "20px",
                    lineHeight: 1.2,
                    color: "var(--signal-orange)",
                    maxWidth: "40ch",
                    transform: "rotate(-0.8deg)",
                  }}
                >
                  {s.annotation}
                </p>
              ) : null}
              {s.marks?.length ? (
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "12px" }}>
                  {s.marks.map((m, j) => (
                    <ProofLabel key={j} status={m.status} value={m.value} size="sm">
                      {m.label}
                    </ProofLabel>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginTop: "-8px",
          paddingLeft: "6px",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            width: "44px",
            height: "44px",
            border: "var(--border-ordinary) solid var(--blueprint)",
            borderTop: "none",
            borderRight: "none",
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--type-label-sm)",
            letterSpacing: "var(--track-label)",
            textTransform: "uppercase",
            color: "var(--blueprint)",
          }}
        >
          ↑ {loopLabel}
        </span>
      </div>
    </div>
  );
}
