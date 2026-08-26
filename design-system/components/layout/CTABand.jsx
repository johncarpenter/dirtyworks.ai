import React from "react";
import { Button } from "../core/Button.jsx";

/**
 * Hard CTA band. Full-bleed ink or orange field, one specific primary action,
 * one optional secondary. Never a gradient, never a centred SaaS box.
 */
export function CTABand({ heading, support, primary, secondary, folio, tone = "ink", style }) {
  const dark = tone === "ink";
  return (
    <section
      className={dark ? "dw-dark dw-tex-carbon" : undefined}
      style={{
        background: dark ? "var(--ink)" : "var(--signal-orange)",
        color: dark ? "var(--bone)" : "var(--ink)",
        padding: "var(--band-pad-y) var(--page-margin)",
        ...style,
      }}
    >
      <div style={{ maxWidth: "var(--grid-max)", margin: "0 auto", display: "grid", gap: "var(--space-6)" }}>
        {folio ? (
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--type-label-sm)",
              letterSpacing: "var(--track-label-wide)",
              textTransform: "uppercase",
              color: dark ? "var(--verified-acid)" : "var(--ink)",
              opacity: dark ? 1 : 0.6,
            }}
          >
            {folio}
          </span>
        ) : null}
        <h2
          style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(36px, 5.2vw, 96px)",
            lineHeight: 0.9,
            letterSpacing: "var(--track-display)",
            textTransform: "uppercase",
            maxWidth: "22ch",
            textWrap: "balance",
          }}
        >
          {heading}
        </h2>
        {support ? (
          <p
            style={{
              margin: 0,
              fontSize: "var(--type-lead)",
              lineHeight: 1.35,
              maxWidth: "44ch",
              color: dark ? "var(--steel-2)" : "var(--ink)",
            }}
          >
            {support}
          </p>
        ) : null}
        <div style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap", alignItems: "center" }}>
          {primary ? (
            <Button variant={dark ? "primary" : "secondary"} size="lg" onClick={primary.onClick} href={primary.href}>
              {primary.label}
            </Button>
          ) : null}
          {secondary ? (
            <Button variant={dark ? "secondary" : "ghost"} size="lg" onClick={secondary.onClick} href={secondary.href}>
              {secondary.label}
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
