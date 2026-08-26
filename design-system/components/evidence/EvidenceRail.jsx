import React from "react";
import { ProofLabel } from "./ProofLabel.jsx";

/**
 * Evidence rail / source fragment. A register of source sheets that begins
 * misaligned and can align on scroll. Each fragment carries a bracketed
 * reference number, a statement, and optional origin/status marks.
 */
export function EvidenceRail({ items = [], aligned = false, title, style }) {
  return (
    <div style={{ display: "grid", gap: "var(--space-2)", ...style }}>
      {title ? (
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "12px",
            borderBottom: "var(--border-ordinary) solid var(--line-ordinary)",
            paddingBottom: "8px",
            marginBottom: "var(--space-3)",
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
            {title}
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--type-label-sm)", color: "var(--text-muted)" }}>
            {String(items.length).padStart(2, "0")} ITEMS
          </span>
        </div>
      ) : null}
      {items.map((it, i) => (
        <div
          key={i}
          style={{
            display: "grid",
            gridTemplateColumns: "52px 1fr auto",
            alignItems: "start",
            gap: "var(--space-4)",
            background: "var(--surface-lift)",
            border: "var(--border-hair) solid var(--line-hairline)",
            borderLeft: "var(--border-emphasis) solid var(--ink)",
            padding: "12px 14px",
            transform: aligned
              ? "none"
              : `translateX(${(i % 3) * 10}px) rotate(${i % 2 ? "-0.5" : "0.6"}deg)`,
            transition: "transform var(--dur-slow) var(--ease-mech)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--type-label)",
              fontWeight: 600,
              color: "var(--blueprint)",
              letterSpacing: "0.04em",
              paddingTop: "2px",
            }}
          >
            [{String(i + 1).padStart(2, "0")}]
          </span>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--type-body-sm)",
              lineHeight: 1.4,
              color: "var(--text-body)",
            }}
          >
            {it.text}
            {it.origin ? (
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--type-label-sm)",
                  letterSpacing: "var(--track-label)",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  marginTop: "6px",
                }}
              >
                {it.origin}
              </span>
            ) : null}
          </span>
          {it.status ? (
            <ProofLabel status={it.status} size="sm">
              {it.statusLabel || it.status}
            </ProofLabel>
          ) : (
            <span />
          )}
        </div>
      ))}
    </div>
  );
}
