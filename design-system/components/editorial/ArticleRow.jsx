import React from "react";

/**
 * Article index row. NOTES is an editorial index, not a blog-card grid: each
 * note shows thesis, evidence type, date, and reading time.
 */
export function ArticleRow({ index, title, thesis, evidence, date, readingTime, href = "#", style }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "48px minmax(0, 1.5fr) minmax(0, 1fr) auto",
        gap: "var(--space-5)",
        alignItems: "start",
        padding: "var(--space-5) 0",
        borderBottom: "var(--border-hair) solid var(--line-hairline)",
        textDecoration: "none",
        color: "inherit",
        background: hover ? "var(--surface-sheet)" : "transparent",
        boxShadow: hover ? "inset 4px 0 0 var(--signal-orange)" : "none",
        paddingLeft: hover ? "12px" : "0",
        transition: "background var(--dur-fast) var(--ease-mech), padding var(--dur-fast) var(--ease-mech), box-shadow var(--dur-fast) var(--ease-mech)",
        ...style,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--type-label)",
          color: "var(--blueprint)",
          paddingTop: "4px",
        }}
      >
        [{String(index).padStart(2, "0")}]
      </span>
      <span>
        <span
          style={{
            display: "block",
            fontFamily: "var(--font-sans)",
            fontWeight: 700,
            fontSize: "clamp(20px, 1.9vw, 30px)",
            lineHeight: 1.12,
            letterSpacing: "var(--track-heading)",
            textDecoration: hover ? "underline" : "none",
            textDecorationThickness: "3px",
            textUnderlineOffset: "4px",
          }}
        >
          {title}
        </span>
      </span>
      <span
        style={{
          fontSize: "var(--type-caption)",
          lineHeight: 1.5,
          color: "var(--text-muted)",
          textWrap: "pretty",
        }}
      >
        {thesis}
      </span>
      <span
        style={{
          display: "grid",
          gap: "4px",
          justifyItems: "end",
          fontFamily: "var(--font-mono)",
          fontSize: "var(--type-label-sm)",
          letterSpacing: "var(--track-label)",
          textTransform: "uppercase",
          color: "var(--text-muted)",
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ color: "var(--text-body)" }}>{evidence}</span>
        <span>{date}</span>
        <span>{readingTime}</span>
      </span>
    </a>
  );
}
