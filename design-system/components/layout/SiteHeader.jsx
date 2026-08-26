import React from "react";
import { Wordmark } from "../core/Wordmark.jsx";
import { Button } from "../core/Button.jsx";

/**
 * Site header. Compact nav with a persistent folio/version detail. Mobile
 * behaves like an index sheet rather than a rounded drawer.
 */
export function SiteHeader({ items = [], active, onNavigate, cta, version = "V0.1", tone = "bone", style }) {
  const [open, setOpen] = React.useState(false);
  const dark = tone === "ink";
  return (
    <header
      className={dark ? "dw-dark" : undefined}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: dark ? "var(--ink)" : "var(--bone)",
        borderBottom: "var(--border-ordinary) solid var(--line-ordinary)",
        ...style,
      }}
    >
      <div
        style={{
          maxWidth: "var(--grid-max)",
          margin: "0 auto",
          padding: "0 var(--page-margin)",
          height: "72px",
          display: "flex",
          alignItems: "center",
          gap: "var(--space-6)",
        }}
      >
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onNavigate?.(items[0]?.id);
          }}
          style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}
        >
          <Wordmark size={22} tone={dark ? "bone" : "ink"} />
        </a>
        <nav style={{ display: "flex", gap: "var(--space-5)", marginLeft: "auto" }} className="dw-nav-desktop">
          {items.map((it) => (
            <button
              key={it.id}
              onClick={() => onNavigate?.(it.id)}
              style={{
                background: "none",
                border: "none",
                padding: "6px 0",
                cursor: "pointer",
                fontFamily: "var(--font-mono)",
                fontSize: "var(--type-label)",
                fontWeight: 600,
                letterSpacing: "var(--track-label)",
                textTransform: "uppercase",
                color: active === it.id ? "var(--text-body)" : "var(--text-muted)",
                borderBottom:
                  active === it.id
                    ? "var(--border-emphasis) solid var(--signal-orange)"
                    : "var(--border-emphasis) solid transparent",
              }}
            >
              {it.label}
            </button>
          ))}
        </nav>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--type-label-sm)",
            letterSpacing: "var(--track-label)",
            color: "var(--text-faint)",
            whiteSpace: "nowrap",
          }}
        >
          {version}
        </span>
        {cta ? (
          <Button size="sm" onClick={cta.onClick}>
            {cta.label}
          </Button>
        ) : null}
      </div>
    </header>
  );
}
