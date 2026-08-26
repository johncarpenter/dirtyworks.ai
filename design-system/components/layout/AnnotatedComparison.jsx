import React from "react";

/**
 * Annotated comparison. Two fields with one decisive contrast — the right
 * column carries the brand's position and is marked, not merely coloured.
 */
export function AnnotatedComparison({ leftTitle, rightTitle, rows = [], annotation, style }) {
  return (
    <div style={{ ...style }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0",
          borderTop: "var(--border-editorial) solid var(--line-editorial)",
        }}
      >
        <Head>{leftTitle}</Head>
        <Head accent>{rightTitle}</Head>
        {rows.map((r, i) => (
          <React.Fragment key={i}>
            <div
              style={{
                padding: "16px 20px 16px 0",
                borderBottom: "var(--border-hair) solid var(--line-hairline)",
                fontSize: "var(--type-body-sm)",
                color: "var(--text-muted)",
                textDecoration: "line-through",
                textDecorationColor: "var(--steel-2)",
                textDecorationThickness: "1px",
              }}
            >
              {r.left}
            </div>
            <div
              style={{
                padding: "16px 0 16px 20px",
                borderBottom: "var(--border-hair) solid var(--line-hairline)",
                borderLeft: "var(--border-ordinary) solid var(--line-ordinary)",
                fontSize: "var(--type-body-sm)",
                fontWeight: 600,
                color: "var(--text-body)",
                background: r.decisive ? "var(--verified-acid)" : "transparent",
              }}
            >
              {r.right}
            </div>
          </React.Fragment>
        ))}
      </div>
      {annotation ? (
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "clamp(22px, 2vw, 32px)",
            lineHeight: 1.15,
            color: "var(--signal-orange)",
            maxWidth: "38ch",
            margin: "var(--space-5) 0 0",
            transform: "rotate(-1deg)",
            marginLeft: "var(--offset-hard)",
          }}
        >
          {annotation}
        </p>
      ) : null}
    </div>
  );
}

function Head({ children, accent }) {
  return (
    <div
      style={{
        padding: "10px 20px 10px 0",
        paddingLeft: accent ? "20px" : 0,
        borderBottom: "var(--border-ordinary) solid var(--line-ordinary)",
        borderLeft: accent ? "var(--border-ordinary) solid var(--line-ordinary)" : "none",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--type-label)",
        fontWeight: 600,
        letterSpacing: "var(--track-label-wide)",
        textTransform: "uppercase",
        color: accent ? "var(--signal-orange)" : "var(--text-muted)",
      }}
    >
      {children}
    </div>
  );
}
