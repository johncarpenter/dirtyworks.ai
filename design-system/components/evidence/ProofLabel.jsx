import React from "react";

/**
 * Proof label / status stamp. Square-cornered evidence chip, never a rounded
 * SaaS pill. Only ever apply a status that corresponds to real content.
 * Statuses: source | owner | permission | answer | gap | human | change | operated | neutral
 */
const SKINS = {
  source: { bg: "var(--blueprint)", fg: "#fff", bd: "var(--blueprint)" },
  owner: { bg: "transparent", fg: "var(--text-body)", bd: "var(--line-ordinary)" },
  permission: { bg: "transparent", fg: "var(--blueprint)", bd: "var(--blueprint)" },
  answer: { bg: "var(--verified-acid)", fg: "var(--ink)", bd: "var(--ink)" },
  gap: { bg: "var(--signal-orange)", fg: "var(--ink)", bd: "var(--ink)" },
  human: { bg: "transparent", fg: "var(--signal-orange)", bd: "var(--signal-orange)" },
  change: { bg: "var(--ink)", fg: "var(--bone)", bd: "var(--ink)" },
  operated: { bg: "var(--verified-acid)", fg: "var(--ink)", bd: "var(--ink)" },
  neutral: { bg: "transparent", fg: "var(--text-muted)", bd: "var(--line-hairline)" },
};

export function ProofLabel({ children, value, status = "neutral", size = "md", style }) {
  const s = SKINS[status] || SKINS.neutral;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: size === "sm" ? "3px 6px" : "5px 9px",
        background: s.bg,
        color: s.fg,
        border: `var(--border-hair) solid ${s.bd}`,
        borderRadius: "var(--radius-1)",
        fontFamily: "var(--font-mono)",
        fontWeight: 600,
        fontSize: size === "sm" ? "var(--type-label-sm)" : "var(--type-label)",
        letterSpacing: "var(--track-label)",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      <span>{children}</span>
      {value ? (
        <>
          <span style={{ opacity: 0.5 }}>/</span>
          <span>{value}</span>
        </>
      ) : null}
    </span>
  );
}
