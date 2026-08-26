import React from "react";
import { Wordmark } from "../core/Wordmark.jsx";

/**
 * Site footer. Index-sheet layout with an operating location line and a
 * document/version marker used as a visual device, not a legal claim.
 */
export function SiteFooter({ columns = [], location, version, onNavigate, style }) {
  return (
    <footer
      className="dw-dark"
      style={{ background: "var(--ink)", color: "var(--bone)", padding: "var(--space-9) var(--page-margin) var(--space-6)", ...style }}
    >
      <div style={{ maxWidth: "var(--grid-max)", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "var(--space-6)",
            borderTop: "var(--border-ordinary) solid var(--steel)",
            paddingTop: "var(--space-5)",
          }}
        >
          {columns.map((col, i) => (
            <div key={i} style={{ display: "grid", gap: "10px", alignContent: "start" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--type-label-sm)",
                  letterSpacing: "var(--track-label-wide)",
                  textTransform: "uppercase",
                  color: "var(--steel-2)",
                }}
              >
                {col.title}
              </span>
              {col.links.map((l, j) => (
                <a
                  key={j}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate?.(l.id);
                  }}
                  style={{
                    color: "var(--bone)",
                    textDecoration: "none",
                    fontSize: "var(--type-body-sm)",
                    lineHeight: 1.4,
                  }}
                >
                  {l.label}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "var(--space-6)",
            flexWrap: "wrap",
            marginTop: "var(--space-9)",
          }}
        >
          <Wordmark size={"clamp(40px, 8vw, 96px)"} tone="bone" />
          <div
            style={{
              display: "grid",
              gap: "4px",
              textAlign: "right",
              fontFamily: "var(--font-mono)",
              fontSize: "var(--type-label-sm)",
              letterSpacing: "var(--track-label)",
              textTransform: "uppercase",
              color: "var(--steel-2)",
            }}
          >
            <span>{location}</span>
            <span>{version}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
