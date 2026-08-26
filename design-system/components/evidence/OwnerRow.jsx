import React from "react";
import { ProofLabel } from "./ProofLabel.jsx";

/**
 * Owner / status row. The atomic accountability line: what it is, who owns it,
 * when it was last checked, what state it is in.
 */
export function OwnerRow({ item, owner, checked, status = "neutral", statusLabel, index, style }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto minmax(0, 2fr) minmax(0, 1.1fr) auto auto",
        alignItems: "center",
        gap: "var(--space-4)",
        padding: "12px 0",
        borderBottom: "var(--border-hair) solid var(--line-hairline)",
        ...style,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--type-label-sm)",
          color: "var(--text-faint)",
          width: "24px",
        }}
      >
        {index != null ? String(index).padStart(2, "0") : ""}
      </span>
      <span style={{ fontSize: "var(--type-body-sm)", fontWeight: 500, lineHeight: 1.3 }}>{item}</span>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--type-label)",
          letterSpacing: "0.04em",
          color: owner ? "var(--text-body)" : "var(--signal-orange)",
        }}
      >
        {owner || "UNOWNED"}
      </span>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--type-label-sm)",
          letterSpacing: "0.04em",
          color: "var(--text-muted)",
          whiteSpace: "nowrap",
        }}
      >
        {checked || "—"}
      </span>
      <ProofLabel status={status} size="sm">
        {statusLabel || status}
      </ProofLabel>
    </div>
  );
}
