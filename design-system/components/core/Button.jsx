import React from "react";

/**
 * Rectangular, high-contrast, specific-label button. Radius 0–2px, hard offset
 * shadow that collapses on press. No pills (those are ProofLabel's job).
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  icon,
  iconAfter,
  disabled = false,
  fullWidth = false,
  onClick,
  ...rest
}) {
  const pads = {
    sm: "10px 16px",
    md: "16px 24px",
    lg: "22px 34px",
  };
  const fonts = { sm: 12, md: 13, lg: 15 };

  const skins = {
    primary: {
      background: "var(--signal-orange)",
      color: "var(--ink)",
      border: "var(--border-ordinary) solid var(--ink)",
      boxShadow: "var(--shadow-hard-sm)",
    },
    secondary: {
      background: "transparent",
      color: "var(--text-body)",
      border: "var(--border-ordinary) solid var(--line-ordinary)",
      boxShadow: "none",
    },
    evidence: {
      background: "var(--blueprint)",
      color: "#fff",
      border: "var(--border-ordinary) solid var(--ink)",
      boxShadow: "var(--shadow-hard-sm)",
    },
    ghost: {
      background: "transparent",
      color: "var(--text-body)",
      border: "var(--border-ordinary) solid transparent",
      boxShadow: "none",
    },
  };

  const style = {
    ...skins[variant],
    display: fullWidth ? "flex" : "inline-flex",
    width: fullWidth ? "100%" : "auto",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    minHeight: "var(--target-min)",
    padding: pads[size],
    borderRadius: "var(--radius-0)",
    fontFamily: "var(--font-mono)",
    fontWeight: 600,
    fontSize: fonts[size],
    letterSpacing: "var(--track-label)",
    textTransform: "uppercase",
    textDecoration: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.4 : 1,
    transition: `background var(--dur-fast) var(--ease-mech), box-shadow var(--dur-fast) var(--ease-mech), transform var(--dur-fast) var(--ease-mech)`,
    textAlign: "center",
    boxSizing: "border-box",
    whiteSpace: "nowrap",
  };

  const press = (e, on) => {
    if (disabled) return;
    e.currentTarget.style.transform = on ? "translate(1px, 1px)" : "translate(0,0)";
    e.currentTarget.style.boxShadow = on
      ? "1px 1px 0 var(--ink)"
      : skins[variant].boxShadow;
  };
  const hover = (e, on) => {
    if (disabled) return;
    if (variant === "primary")
      e.currentTarget.style.background = on
        ? "var(--orange-press)"
        : "var(--signal-orange)";
    if (variant === "evidence")
      e.currentTarget.style.background = on
        ? "var(--blueprint-press)"
        : "var(--blueprint)";
    if (variant === "secondary" || variant === "ghost")
      e.currentTarget.style.background = on ? "var(--surface-sheet)" : "transparent";
  };

  const Tag = href ? "a" : "button";
  return (
    <Tag
      href={href}
      style={style}
      disabled={Tag === "button" ? disabled : undefined}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={(e) => hover(e, true)}
      onMouseLeave={(e) => {
        hover(e, false);
        press(e, false);
      }}
      onMouseDown={(e) => press(e, true)}
      onMouseUp={(e) => press(e, false)}
      {...rest}
    >
      {icon ? <Glyph name={icon} /> : null}
      <span>{children}</span>
      {iconAfter ? <Glyph name={iconAfter} /> : null}
    </Tag>
  );
}

function Glyph({ name }) {
  return (
    <span
      aria-hidden="true"
      className="material-symbols-sharp"
      style={{
        fontFamily: "var(--font-icon)",
        fontSize: "1.25em",
        lineHeight: 1,
        fontWeight: 400,
      }}
    >
      {name}
    </span>
  );
}
