/* @ds-bundle: {"format":4,"namespace":"DirtyworksAiDesignSystem_9135ac","components":[{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"Wordmark","sourcePath":"components/core/Wordmark.jsx"},{"name":"ArticleRow","sourcePath":"components/editorial/ArticleRow.jsx"},{"name":"Declaration","sourcePath":"components/editorial/Declaration.jsx"},{"name":"PullQuote","sourcePath":"components/editorial/PullQuote.jsx"},{"name":"CaseMetric","sourcePath":"components/evidence/CaseMetric.jsx"},{"name":"ControlRegister","sourcePath":"components/evidence/ControlRegister.jsx"},{"name":"EvidenceRail","sourcePath":"components/evidence/EvidenceRail.jsx"},{"name":"OwnerRow","sourcePath":"components/evidence/OwnerRow.jsx"},{"name":"ProofLabel","sourcePath":"components/evidence/ProofLabel.jsx"},{"name":"Redaction","sourcePath":"components/evidence/Redaction.jsx"},{"name":"WorkOrder","sourcePath":"components/evidence/WorkOrder.jsx"},{"name":"DiagnosticForm","sourcePath":"components/forms/DiagnosticForm.jsx"},{"name":"AnnotatedComparison","sourcePath":"components/layout/AnnotatedComparison.jsx"},{"name":"CTABand","sourcePath":"components/layout/CTABand.jsx"},{"name":"FitField","sourcePath":"components/layout/FitField.jsx"},{"name":"SiteFooter","sourcePath":"components/layout/SiteFooter.jsx"},{"name":"SiteHeader","sourcePath":"components/layout/SiteHeader.jsx"}],"sourceHashes":{"components/core/Button.jsx":"bfa8aa7730af","components/core/Icon.jsx":"f913656964d8","components/core/Wordmark.jsx":"ca63ab01bf0f","components/editorial/ArticleRow.jsx":"58143a85aa3d","components/editorial/Declaration.jsx":"02f2a8da7a17","components/editorial/PullQuote.jsx":"feac3e8dff1c","components/evidence/CaseMetric.jsx":"a9a92582bc55","components/evidence/ControlRegister.jsx":"0dadd65d97ce","components/evidence/EvidenceRail.jsx":"6762c1f730a2","components/evidence/OwnerRow.jsx":"8b180eb838f9","components/evidence/ProofLabel.jsx":"9c7b554abc64","components/evidence/Redaction.jsx":"6e3ef33150f4","components/evidence/WorkOrder.jsx":"a0fb8d95c1d5","components/forms/DiagnosticForm.jsx":"0de2741a1f9b","components/layout/AnnotatedComparison.jsx":"05d8fd768b16","components/layout/CTABand.jsx":"4888fd9daa35","components/layout/FitField.jsx":"63e327b51730","components/layout/SiteFooter.jsx":"252871c0bb55","components/layout/SiteHeader.jsx":"5d4275995a26","slides/slides-kit.jsx":"f1c7f18efdc6","ui_kits/website/home-sections.jsx":"1ddbbbeed1b9","ui_kits/website/page-sections.jsx":"8224ba5fa77c"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DirtyworksAiDesignSystem_9135ac = window.DirtyworksAiDesignSystem_9135ac || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Rectangular, high-contrast, specific-label button. Radius 0–2px, hard offset
 * shadow that collapses on press. No pills (those are ProofLabel's job).
 */
function Button({
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
    lg: "22px 34px"
  };
  const fonts = {
    sm: 12,
    md: 13,
    lg: 15
  };
  const skins = {
    primary: {
      background: "var(--signal-orange)",
      color: "var(--ink)",
      border: "var(--border-ordinary) solid var(--ink)",
      boxShadow: "var(--shadow-hard-sm)"
    },
    secondary: {
      background: "transparent",
      color: "var(--text-body)",
      border: "var(--border-ordinary) solid var(--line-ordinary)",
      boxShadow: "none"
    },
    evidence: {
      background: "var(--blueprint)",
      color: "#fff",
      border: "var(--border-ordinary) solid var(--ink)",
      boxShadow: "var(--shadow-hard-sm)"
    },
    ghost: {
      background: "transparent",
      color: "var(--text-body)",
      border: "var(--border-ordinary) solid transparent",
      boxShadow: "none"
    }
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
    whiteSpace: "nowrap"
  };
  const press = (e, on) => {
    if (disabled) return;
    e.currentTarget.style.transform = on ? "translate(1px, 1px)" : "translate(0,0)";
    e.currentTarget.style.boxShadow = on ? "1px 1px 0 var(--ink)" : skins[variant].boxShadow;
  };
  const hover = (e, on) => {
    if (disabled) return;
    if (variant === "primary") e.currentTarget.style.background = on ? "var(--orange-press)" : "var(--signal-orange)";
    if (variant === "evidence") e.currentTarget.style.background = on ? "var(--blueprint-press)" : "var(--blueprint)";
    if (variant === "secondary" || variant === "ghost") e.currentTarget.style.background = on ? "var(--surface-sheet)" : "transparent";
  };
  const Tag = href ? "a" : "button";
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    style: style,
    disabled: Tag === "button" ? disabled : undefined,
    onClick: disabled ? undefined : onClick,
    onMouseEnter: e => hover(e, true),
    onMouseLeave: e => {
      hover(e, false);
      press(e, false);
    },
    onMouseDown: e => press(e, true),
    onMouseUp: e => press(e, false)
  }, rest), icon ? /*#__PURE__*/React.createElement(Glyph, {
    name: icon
  }) : null, /*#__PURE__*/React.createElement("span", null, children), iconAfter ? /*#__PURE__*/React.createElement(Glyph, {
    name: iconAfter
  }) : null);
}
function Glyph({
  name
}) {
  return /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    className: "material-symbols-sharp",
    style: {
      fontFamily: "var(--font-icon)",
      fontSize: "1.25em",
      lineHeight: 1,
      fontWeight: 400
    }
  }, name);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
/**
 * Material Symbols Sharp glyph wrapper. Square-cornered icon font substituted
 * for the (undefined) brand icon set — see readme.md ICONOGRAPHY.
 * Names are Material Symbols identifiers, e.g. "folder_open", "search", "bolt".
 */
function Icon({
  name,
  size = 20,
  weight = 500,
  color = "currentColor",
  label,
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-sharp",
    role: label ? "img" : undefined,
    "aria-label": label,
    "aria-hidden": label ? undefined : "true",
    style: {
      fontFamily: "var(--font-icon)",
      fontVariationSettings: `'FILL' 0, 'wght' ${weight}, 'GRAD' 0, 'opsz' 24`,
      fontSize: size,
      lineHeight: 1,
      color,
      display: "inline-block",
      flex: "0 0 auto",
      userSelect: "none",
      ...style
    }
  }, name);
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Wordmark.jsx
try { (() => {
/**
 * Type-set wordmark. No logo files were supplied with the brand materials, so
 * the brand is set in plain heavy grotesk (creative-direction Route 1:
 * lowercase working wordmark). The period before `ai` takes the signal-orange
 * registration colour. Replace with a licensed vector mark when one exists.
 */
function Wordmark({
  size = 20,
  tone = "ink",
  showDot = true,
  style
}) {
  const color = tone === "bone" ? "var(--bone)" : tone === "orange" ? "var(--signal-orange)" : "var(--ink)";
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 900,
      fontSize: size,
      letterSpacing: "-0.035em",
      lineHeight: 1,
      color,
      whiteSpace: "nowrap",
      display: "inline-block",
      ...style
    }
  }, "dirtyworks", /*#__PURE__*/React.createElement("span", {
    style: {
      color: showDot ? "var(--signal-orange)" : color
    }
  }, "."), "ai");
}
Object.assign(__ds_scope, { Wordmark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Wordmark.jsx", error: String((e && e.message) || e) }); }

// components/editorial/ArticleRow.jsx
try { (() => {
/**
 * Article index row. NOTES is an editorial index, not a blog-card grid: each
 * note shows thesis, evidence type, date, and reading time.
 */
function ArticleRow({
  index,
  title,
  thesis,
  evidence,
  date,
  readingTime,
  href = "#",
  style
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
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
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-label)",
      color: "var(--blueprint)",
      paddingTop: "4px"
    }
  }, "[", String(index).padStart(2, "0"), "]"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontFamily: "var(--font-sans)",
      fontWeight: 700,
      fontSize: "clamp(20px, 1.9vw, 30px)",
      lineHeight: 1.12,
      letterSpacing: "var(--track-heading)",
      textDecoration: hover ? "underline" : "none",
      textDecorationThickness: "3px",
      textUnderlineOffset: "4px"
    }
  }, title)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--type-caption)",
      lineHeight: 1.5,
      color: "var(--text-muted)",
      textWrap: "pretty"
    }
  }, thesis), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "grid",
      gap: "4px",
      justifyItems: "end",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-label-sm)",
      letterSpacing: "var(--track-label)",
      textTransform: "uppercase",
      color: "var(--text-muted)",
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-body)"
    }
  }, evidence), /*#__PURE__*/React.createElement("span", null, date), /*#__PURE__*/React.createElement("span", null, readingTime)));
}
Object.assign(__ds_scope, { ArticleRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/ArticleRow.jsx", error: String((e && e.message) || e) }); }

// components/editorial/Declaration.jsx
try { (() => {
/**
 * Oversized declaration. One huge statement, one tiny evidence label, one
 * decisive rule. Optional single grid violation via `crop` and `offset`.
 */
function Declaration({
  children,
  label,
  descriptor,
  align = "left",
  tone = "ink",
  crop = false,
  rule = true,
  size = "display",
  style
}) {
  const fs = size === "h1" ? "var(--type-h1)" : size === "h2" ? "var(--type-h2)" : "var(--type-display)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-5)",
      textAlign: align,
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-label)",
      fontWeight: 600,
      letterSpacing: "var(--track-label-wide)",
      textTransform: "uppercase",
      color: "var(--signal-orange)"
    }
  }, label) : null, rule ? /*#__PURE__*/React.createElement("hr", {
    style: {
      border: 0,
      borderTop: "var(--border-editorial) solid var(--line-editorial)",
      margin: 0
    }
  }) : null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontWeight: 900,
      fontSize: fs,
      lineHeight: "var(--leading-display)",
      letterSpacing: "var(--track-display)",
      textTransform: "uppercase",
      color: tone === "bone" ? "var(--bone)" : tone === "orange" ? "var(--signal-orange)" : "var(--text-body)",
      marginLeft: crop ? "calc(var(--crop-max) * -0.5)" : 0,
      textWrap: "balance"
    }
  }, children), descriptor ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-label)",
      letterSpacing: "var(--track-label)",
      textTransform: "uppercase",
      color: "var(--text-muted)",
      maxWidth: "48ch",
      marginInline: align === "center" ? "auto" : 0,
      lineHeight: 1.5
    }
  }, descriptor) : null);
}
Object.assign(__ds_scope, { Declaration });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/Declaration.jsx", error: String((e && e.message) || e) }); }

// components/editorial/PullQuote.jsx
try { (() => {
/**
 * Pull quote in the editorial serif countervoice. Reserved for human
 * statements, questions, and counterpoints — never decorative luxury.
 */
function PullQuote({
  children,
  attribution,
  context,
  tone = "ink",
  size = "md",
  style
}) {
  const fs = size === "lg" ? "clamp(40px, 5vw, 84px)" : size === "sm" ? "clamp(24px, 2.4vw, 34px)" : "clamp(30px, 3.4vw, 56px)";
  return /*#__PURE__*/React.createElement("figure", {
    style: {
      margin: 0,
      display: "grid",
      gap: "var(--space-5)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 0,
      fontFamily: "var(--font-serif)",
      fontStyle: "italic",
      fontWeight: 400,
      fontSize: fs,
      lineHeight: 1.06,
      letterSpacing: "-0.015em",
      color: tone === "bone" ? "var(--bone)" : "var(--text-body)",
      maxWidth: "34ch",
      textWrap: "balance"
    }
  }, children), attribution || context ? /*#__PURE__*/React.createElement("figcaption", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: "12px",
      flexWrap: "wrap",
      borderTop: "var(--border-ordinary) solid var(--line-ordinary)",
      paddingTop: "10px",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-label-sm)",
      letterSpacing: "var(--track-label)",
      textTransform: "uppercase"
    }
  }, attribution ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600
    }
  }, attribution) : null, context ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)"
    }
  }, context) : null) : null);
}
Object.assign(__ds_scope, { PullQuote });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/PullQuote.jsx", error: String((e && e.message) || e) }); }

// components/evidence/CaseMetric.jsx
try { (() => {
/**
 * Case-study metric with its method and source attached. A metric without a
 * visible baseline, period and method is not publishable — the component makes
 * the attribution structurally required.
 */
function CaseMetric({
  value,
  unit,
  label,
  baseline,
  period,
  method,
  source,
  hypothesis = false,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "var(--border-editorial) solid var(--line-editorial)",
      paddingTop: "var(--space-4)",
      display: "grid",
      gap: "10px",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: "6px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 900,
      fontSize: "clamp(48px, 6vw, 96px)",
      lineHeight: 0.82,
      letterSpacing: "-0.04em"
    }
  }, value), unit ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-label)",
      letterSpacing: "var(--track-label)",
      textTransform: "uppercase",
      color: "var(--text-muted)",
      paddingBottom: "6px"
    }
  }, unit) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--type-body-sm)",
      fontWeight: 600,
      lineHeight: 1.3,
      maxWidth: "30ch"
    }
  }, label), /*#__PURE__*/React.createElement("dl", {
    style: {
      margin: 0,
      display: "grid",
      gap: "4px",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-label-sm)",
      letterSpacing: "0.04em",
      color: "var(--text-muted)",
      textTransform: "uppercase"
    }
  }, baseline ? /*#__PURE__*/React.createElement(Line, {
    k: "BASELINE",
    v: baseline
  }) : null, period ? /*#__PURE__*/React.createElement(Line, {
    k: "PERIOD",
    v: period
  }) : null, method ? /*#__PURE__*/React.createElement(Line, {
    k: "METHOD",
    v: method
  }) : null, source ? /*#__PURE__*/React.createElement(Line, {
    k: "SOURCE",
    v: source
  }) : null), hypothesis ? /*#__PURE__*/React.createElement("span", {
    style: {
      justifySelf: "start",
      background: "var(--signal-orange)",
      color: "var(--ink)",
      padding: "3px 7px",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-label-sm)",
      fontWeight: 600,
      letterSpacing: "var(--track-label)"
    }
  }, "HYPOTHESIS \u2014 NOT MEASURED") : null);
}
function Line({
  k,
  v
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "8px"
    }
  }, /*#__PURE__*/React.createElement("dt", {
    style: {
      minWidth: "72px",
      color: "var(--text-faint)"
    }
  }, k), /*#__PURE__*/React.createElement("dd", {
    style: {
      margin: 0,
      color: "var(--text-body)"
    }
  }, v));
}
Object.assign(__ds_scope, { CaseMetric });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/evidence/CaseMetric.jsx", error: String((e && e.message) || e) }); }

// components/evidence/ProofLabel.jsx
try { (() => {
/**
 * Proof label / status stamp. Square-cornered evidence chip, never a rounded
 * SaaS pill. Only ever apply a status that corresponds to real content.
 * Statuses: source | owner | permission | answer | gap | human | change | operated | neutral
 */
const SKINS = {
  source: {
    bg: "var(--blueprint)",
    fg: "#fff",
    bd: "var(--blueprint)"
  },
  owner: {
    bg: "transparent",
    fg: "var(--text-body)",
    bd: "var(--line-ordinary)"
  },
  permission: {
    bg: "transparent",
    fg: "var(--blueprint)",
    bd: "var(--blueprint)"
  },
  answer: {
    bg: "var(--verified-acid)",
    fg: "var(--ink)",
    bd: "var(--ink)"
  },
  gap: {
    bg: "var(--signal-orange)",
    fg: "var(--ink)",
    bd: "var(--ink)"
  },
  human: {
    bg: "transparent",
    fg: "var(--signal-orange)",
    bd: "var(--signal-orange)"
  },
  change: {
    bg: "var(--ink)",
    fg: "var(--bone)",
    bd: "var(--ink)"
  },
  operated: {
    bg: "var(--verified-acid)",
    fg: "var(--ink)",
    bd: "var(--ink)"
  },
  neutral: {
    bg: "transparent",
    fg: "var(--text-muted)",
    bd: "var(--line-hairline)"
  }
};
function ProofLabel({
  children,
  value,
  status = "neutral",
  size = "md",
  style
}) {
  const s = SKINS[status] || SKINS.neutral;
  return /*#__PURE__*/React.createElement("span", {
    style: {
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
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", null, children), value ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.5
    }
  }, "/"), /*#__PURE__*/React.createElement("span", null, value)) : null);
}
Object.assign(__ds_scope, { ProofLabel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/evidence/ProofLabel.jsx", error: String((e && e.message) || e) }); }

// components/evidence/ControlRegister.jsx
try { (() => {
/**
 * Trust / control register. A public-facing table of controls: what is
 * controlled, how, who holds it, and its state. Leads with limitations.
 */
function ControlRegister({
  rows = [],
  caption,
  note,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...style
    }
  }, caption ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      borderTop: "var(--border-editorial) solid var(--line-editorial)",
      paddingTop: "10px",
      marginBottom: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-label)",
      letterSpacing: "var(--track-label-wide)",
      textTransform: "uppercase",
      fontWeight: 600
    }
  }, caption), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-label-sm)",
      color: "var(--text-muted)",
      letterSpacing: "var(--track-label)"
    }
  }, "REGISTER / ", String(rows.length).padStart(2, "0"))) : null, /*#__PURE__*/React.createElement("div", {
    role: "table"
  }, /*#__PURE__*/React.createElement("div", {
    role: "row",
    style: {
      display: "grid",
      gridTemplateColumns: "40px minmax(0,1.1fr) minmax(0,1.6fr) minmax(0,0.9fr) auto",
      gap: "var(--space-4)",
      padding: "8px 0",
      borderBottom: "var(--border-ordinary) solid var(--line-ordinary)",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-label-sm)",
      letterSpacing: "var(--track-label)",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "REF"), /*#__PURE__*/React.createElement("span", null, "CONTROL"), /*#__PURE__*/React.createElement("span", null, "HOW IT WORKS"), /*#__PURE__*/React.createElement("span", null, "HELD BY"), /*#__PURE__*/React.createElement("span", null, "STATE")), rows.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    role: "row",
    style: {
      display: "grid",
      gridTemplateColumns: "40px minmax(0,1.1fr) minmax(0,1.6fr) minmax(0,0.9fr) auto",
      gap: "var(--space-4)",
      padding: "14px 0",
      borderBottom: "var(--border-hair) solid var(--line-hairline)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-label-sm)",
      color: "var(--blueprint)"
    }
  }, "C", String(i + 1).padStart(2, "0")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--type-body-sm)",
      fontWeight: 600,
      lineHeight: 1.35
    }
  }, r.control), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--type-caption)",
      lineHeight: 1.5,
      color: "var(--text-muted)",
      textWrap: "pretty"
    }
  }, r.mechanism), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-label-sm)",
      letterSpacing: "0.04em",
      textTransform: "uppercase"
    }
  }, r.holder), /*#__PURE__*/React.createElement(__ds_scope.ProofLabel, {
    status: r.status || "neutral",
    size: "sm"
  }, r.state)))), note ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-label-sm)",
      letterSpacing: "0.04em",
      color: "var(--text-muted)",
      marginTop: "var(--space-4)",
      maxWidth: "70ch",
      lineHeight: 1.6
    }
  }, note) : null);
}
Object.assign(__ds_scope, { ControlRegister });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/evidence/ControlRegister.jsx", error: String((e && e.message) || e) }); }

// components/evidence/EvidenceRail.jsx
try { (() => {
/**
 * Evidence rail / source fragment. A register of source sheets that begins
 * misaligned and can align on scroll. Each fragment carries a bracketed
 * reference number, a statement, and optional origin/status marks.
 */
function EvidenceRail({
  items = [],
  aligned = false,
  title,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-2)",
      ...style
    }
  }, title ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: "12px",
      borderBottom: "var(--border-ordinary) solid var(--line-ordinary)",
      paddingBottom: "8px",
      marginBottom: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-label)",
      letterSpacing: "var(--track-label-wide)",
      textTransform: "uppercase",
      fontWeight: 600
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-label-sm)",
      color: "var(--text-muted)"
    }
  }, String(items.length).padStart(2, "0"), " ITEMS")) : null, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "grid",
      gridTemplateColumns: "52px 1fr auto",
      alignItems: "start",
      gap: "var(--space-4)",
      background: "var(--surface-lift)",
      border: "var(--border-hair) solid var(--line-hairline)",
      borderLeft: "var(--border-emphasis) solid var(--ink)",
      padding: "12px 14px",
      transform: aligned ? "none" : `translateX(${i % 3 * 10}px) rotate(${i % 2 ? "-0.5" : "0.6"}deg)`,
      transition: "transform var(--dur-slow) var(--ease-mech)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-label)",
      fontWeight: 600,
      color: "var(--blueprint)",
      letterSpacing: "0.04em",
      paddingTop: "2px"
    }
  }, "[", String(i + 1).padStart(2, "0"), "]"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--type-body-sm)",
      lineHeight: 1.4,
      color: "var(--text-body)"
    }
  }, it.text, it.origin ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-label-sm)",
      letterSpacing: "var(--track-label)",
      textTransform: "uppercase",
      color: "var(--text-muted)",
      marginTop: "6px"
    }
  }, it.origin) : null), it.status ? /*#__PURE__*/React.createElement(__ds_scope.ProofLabel, {
    status: it.status,
    size: "sm"
  }, it.statusLabel || it.status) : /*#__PURE__*/React.createElement("span", null))));
}
Object.assign(__ds_scope, { EvidenceRail });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/evidence/EvidenceRail.jsx", error: String((e && e.message) || e) }); }

// components/evidence/OwnerRow.jsx
try { (() => {
/**
 * Owner / status row. The atomic accountability line: what it is, who owns it,
 * when it was last checked, what state it is in.
 */
function OwnerRow({
  item,
  owner,
  checked,
  status = "neutral",
  statusLabel,
  index,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "auto minmax(0, 2fr) minmax(0, 1.1fr) auto auto",
      alignItems: "center",
      gap: "var(--space-4)",
      padding: "12px 0",
      borderBottom: "var(--border-hair) solid var(--line-hairline)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-label-sm)",
      color: "var(--text-faint)",
      width: "24px"
    }
  }, index != null ? String(index).padStart(2, "0") : ""), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--type-body-sm)",
      fontWeight: 500,
      lineHeight: 1.3
    }
  }, item), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-label)",
      letterSpacing: "0.04em",
      color: owner ? "var(--text-body)" : "var(--signal-orange)"
    }
  }, owner || "UNOWNED"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-label-sm)",
      letterSpacing: "0.04em",
      color: "var(--text-muted)",
      whiteSpace: "nowrap"
    }
  }, checked || "—"), /*#__PURE__*/React.createElement(__ds_scope.ProofLabel, {
    status: status,
    size: "sm"
  }, statusLabel || status));
}
Object.assign(__ds_scope, { OwnerRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/evidence/OwnerRow.jsx", error: String((e && e.message) || e) }); }

// components/evidence/Redaction.jsx
try { (() => {
/**
 * Redaction / reveal. A heavy bar covers an imprecise statement; retracting it
 * exposes the precise one underneath. The brand's signature reveal motif.
 */
function Redaction({
  covered,
  revealed,
  open = false,
  onToggle,
  size = "md",
  tone = "ink",
  style
}) {
  const fs = size === "lg" ? "clamp(32px, 4vw, 64px)" : size === "sm" ? "18px" : "clamp(22px, 2.4vw, 36px)";
  /* The bar must contrast with its ground: ink bar on bone surfaces, bone bar on ink surfaces. */
  const bar = tone === "bone" ? "var(--bone)" : "var(--ink)";
  const coveredColor = tone === "bone" ? "var(--ink)" : "var(--text-body)";
  return /*#__PURE__*/React.createElement("span", {
    onClick: onToggle,
    style: {
      position: "relative",
      display: "inline-block",
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: fs,
      lineHeight: 1.05,
      letterSpacing: "var(--track-heading)",
      textTransform: "uppercase",
      cursor: onToggle ? "pointer" : "default",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      visibility: "hidden"
    },
    "aria-hidden": "true"
  }, (covered || "").length > (revealed || "").length ? covered : revealed), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      color: coveredColor,
      opacity: open ? 0 : 1,
      transition: "opacity var(--dur-fast) var(--ease-mech)"
    }
  }, covered), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      color: "var(--signal-orange)",
      opacity: open ? 1 : 0,
      transition: `opacity var(--dur-base) var(--ease-mech) ${open ? "var(--dur-fast)" : "0ms"}`
    }
  }, revealed), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      left: "-4px",
      right: "-4px",
      top: "-2px",
      bottom: "-2px",
      background: bar,
      clipPath: open ? "inset(0 0 0 100%)" : "inset(0 0 0 0)",
      transition: "clip-path var(--dur-slow) var(--ease-mech)"
    }
  }));
}
Object.assign(__ds_scope, { Redaction });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/evidence/Redaction.jsx", error: String((e && e.message) || e) }); }

// components/evidence/WorkOrder.jsx
try { (() => {
/**
 * Work-order lifecycle. A vertical work order with annotations and a loop
 * returning improvement to review — deliberately not four equal cards.
 */
function WorkOrder({
  steps = [],
  loopLabel = "IMPROVEMENT RETURNS TO REVIEW",
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      left: "27px",
      top: "14px",
      bottom: "52px",
      width: "var(--border-ordinary)",
      background: "var(--ink)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-2)"
    }
  }, steps.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "grid",
      gridTemplateColumns: "56px 1fr",
      gap: "var(--space-5)",
      alignItems: "start",
      position: "relative",
      paddingBottom: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
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
      zIndex: 1
    }
  }, String(i + 1).padStart(2, "0")), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "var(--border-ordinary) solid var(--line-ordinary)",
      paddingTop: "10px",
      marginLeft: i % 2 ? "var(--offset-hard)" : "0",
      transition: "margin var(--dur-base) var(--ease-mech)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: "var(--space-4)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: "clamp(24px, 2.4vw, 38px)",
      letterSpacing: "var(--track-heading)",
      textTransform: "uppercase",
      lineHeight: 1
    }
  }, s.name), s.duration ? /*#__PURE__*/React.createElement(__ds_scope.ProofLabel, {
    status: "neutral",
    size: "sm"
  }, s.duration) : null), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "10px 0 0",
      fontSize: "var(--type-body-sm)",
      lineHeight: 1.5,
      maxWidth: "56ch",
      color: "var(--text-body)",
      textWrap: "pretty"
    }
  }, s.detail), s.annotation ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "10px 0 0",
      fontFamily: "var(--font-serif)",
      fontStyle: "italic",
      fontSize: "20px",
      lineHeight: 1.2,
      color: "var(--signal-orange)",
      maxWidth: "40ch",
      transform: "rotate(-0.8deg)"
    }
  }, s.annotation) : null, s.marks?.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "8px",
      flexWrap: "wrap",
      marginTop: "12px"
    }
  }, s.marks.map((m, j) => /*#__PURE__*/React.createElement(__ds_scope.ProofLabel, {
    key: j,
    status: m.status,
    value: m.value,
    size: "sm"
  }, m.label))) : null)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginTop: "-8px",
      paddingLeft: "6px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: "44px",
      height: "44px",
      border: "var(--border-ordinary) solid var(--blueprint)",
      borderTop: "none",
      borderRight: "none"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-label-sm)",
      letterSpacing: "var(--track-label)",
      textTransform: "uppercase",
      color: "var(--blueprint)"
    }
  }, "\u2191 ", loopLabel)));
}
Object.assign(__ds_scope, { WorkOrder });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/evidence/WorkOrder.jsx", error: String((e && e.message) || e) }); }

// components/forms/DiagnosticForm.jsx
try { (() => {
/**
 * Diagnostic form. Asks about a real stuck event, not "how can we help".
 * Never requests customer documents or sensitive data.
 */
function DiagnosticForm({
  heading,
  note,
  onSubmit,
  style
}) {
  const [sent, setSent] = React.useState(false);
  const fields = [{
    id: "name",
    label: "NAME",
    type: "text",
    w: 1
  }, {
    id: "company",
    label: "COMPANY",
    type: "text",
    w: 1
  }, {
    id: "role",
    label: "ROLE",
    type: "text",
    w: 1
  }, {
    id: "email",
    label: "EMAIL",
    type: "email",
    w: 1
  }, {
    id: "doing",
    label: "WHAT WAS THE PERSON TRYING TO DO?",
    type: "textarea",
    w: 2
  }, {
    id: "looked",
    label: "WHERE DID THEY LOOK?",
    type: "text",
    w: 1
  }, {
    id: "asked",
    label: "WHO DID THEY FINALLY ASK?",
    type: "text",
    w: 1
  }, {
    id: "systems",
    label: "WHICH SYSTEMS WERE INVOLVED?",
    type: "text",
    w: 2
  }];
  if (sent) return /*#__PURE__*/React.createElement("div", {
    style: {
      border: "var(--border-ordinary) solid var(--ink)",
      padding: "var(--space-6)",
      background: "var(--verified-acid)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-label)",
      letterSpacing: "var(--track-label)",
      fontWeight: 600
    }
  }, "RECEIVED / LOGGED"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "12px 0 0",
      fontSize: "var(--type-body)",
      maxWidth: "42ch"
    }
  }, "We read every one of these. You'll hear back from a person, not a sequence."));
  return /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setSent(true);
      onSubmit?.();
    },
    style: {
      display: "grid",
      gap: "var(--space-5)",
      ...style
    }
  }, heading ? /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: "clamp(24px, 2.4vw, 38px)",
      lineHeight: 1,
      letterSpacing: "var(--track-heading)",
      textTransform: "uppercase"
    }
  }, heading) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--space-4)"
    }
  }, fields.map(f => /*#__PURE__*/React.createElement("label", {
    key: f.id,
    style: {
      display: "grid",
      gap: "6px",
      gridColumn: f.w === 2 ? "span 2" : "span 1"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-label-sm)",
      fontWeight: 600,
      letterSpacing: "var(--track-label)",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, f.label), f.type === "textarea" ? /*#__PURE__*/React.createElement("textarea", {
    rows: 3,
    style: inputStyle
  }) : /*#__PURE__*/React.createElement("input", {
    type: f.type,
    style: inputStyle
  })))), note ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-label-sm)",
      letterSpacing: "0.04em",
      color: "var(--text-muted)",
      lineHeight: 1.6,
      maxWidth: "60ch"
    }
  }, note) : null, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "lg",
    style: {
      justifySelf: "start"
    }
  }, "SEND THE EVENT"));
}
const inputStyle = {
  background: "var(--surface-field)",
  border: "var(--border-ordinary) solid var(--line-ordinary)",
  borderRadius: "var(--radius-1)",
  padding: "12px",
  minHeight: "var(--target-min)",
  fontFamily: "var(--font-sans)",
  fontSize: "var(--type-body-sm)",
  color: "var(--text-body)",
  boxSizing: "border-box",
  width: "100%",
  resize: "vertical"
};
Object.assign(__ds_scope, { DiagnosticForm });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/DiagnosticForm.jsx", error: String((e && e.message) || e) }); }

// components/layout/AnnotatedComparison.jsx
try { (() => {
/**
 * Annotated comparison. Two fields with one decisive contrast — the right
 * column carries the brand's position and is marked, not merely coloured.
 */
function AnnotatedComparison({
  leftTitle,
  rightTitle,
  rows = [],
  annotation,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "0",
      borderTop: "var(--border-editorial) solid var(--line-editorial)"
    }
  }, /*#__PURE__*/React.createElement(Head, null, leftTitle), /*#__PURE__*/React.createElement(Head, {
    accent: true
  }, rightTitle), rows.map((r, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 20px 16px 0",
      borderBottom: "var(--border-hair) solid var(--line-hairline)",
      fontSize: "var(--type-body-sm)",
      color: "var(--text-muted)",
      textDecoration: "line-through",
      textDecorationColor: "var(--steel-2)",
      textDecorationThickness: "1px"
    }
  }, r.left), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 0 16px 20px",
      borderBottom: "var(--border-hair) solid var(--line-hairline)",
      borderLeft: "var(--border-ordinary) solid var(--line-ordinary)",
      fontSize: "var(--type-body-sm)",
      fontWeight: 600,
      color: "var(--text-body)",
      background: r.decisive ? "var(--verified-acid)" : "transparent"
    }
  }, r.right)))), annotation ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-serif)",
      fontStyle: "italic",
      fontSize: "clamp(22px, 2vw, 32px)",
      lineHeight: 1.15,
      color: "var(--signal-orange)",
      maxWidth: "38ch",
      margin: "var(--space-5) 0 0",
      transform: "rotate(-1deg)",
      marginLeft: "var(--offset-hard)"
    }
  }, annotation) : null);
}
function Head({
  children,
  accent
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "10px 20px 10px 0",
      paddingLeft: accent ? "20px" : 0,
      borderBottom: "var(--border-ordinary) solid var(--line-ordinary)",
      borderLeft: accent ? "var(--border-ordinary) solid var(--line-ordinary)" : "none",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-label)",
      fontWeight: 600,
      letterSpacing: "var(--track-label-wide)",
      textTransform: "uppercase",
      color: accent ? "var(--signal-orange)" : "var(--text-muted)"
    }
  }, children);
}
Object.assign(__ds_scope, { AnnotatedComparison });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/AnnotatedComparison.jsx", error: String((e && e.message) || e) }); }

// components/layout/CTABand.jsx
try { (() => {
/**
 * Hard CTA band. Full-bleed ink or orange field, one specific primary action,
 * one optional secondary. Never a gradient, never a centred SaaS box.
 */
function CTABand({
  heading,
  support,
  primary,
  secondary,
  folio,
  tone = "ink",
  style
}) {
  const dark = tone === "ink";
  return /*#__PURE__*/React.createElement("section", {
    className: dark ? "dw-dark dw-tex-carbon" : undefined,
    style: {
      background: dark ? "var(--ink)" : "var(--signal-orange)",
      color: dark ? "var(--bone)" : "var(--ink)",
      padding: "var(--band-pad-y) var(--page-margin)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--grid-max)",
      margin: "0 auto",
      display: "grid",
      gap: "var(--space-6)"
    }
  }, folio ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-label-sm)",
      letterSpacing: "var(--track-label-wide)",
      textTransform: "uppercase",
      color: dark ? "var(--verified-acid)" : "var(--ink)",
      opacity: dark ? 1 : 0.6
    }
  }, folio) : null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontWeight: 900,
      fontSize: "clamp(36px, 5.2vw, 96px)",
      lineHeight: 0.9,
      letterSpacing: "var(--track-display)",
      textTransform: "uppercase",
      maxWidth: "22ch",
      textWrap: "balance"
    }
  }, heading), support ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--type-lead)",
      lineHeight: 1.35,
      maxWidth: "44ch",
      color: dark ? "var(--steel-2)" : "var(--ink)"
    }
  }, support) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-4)",
      flexWrap: "wrap",
      alignItems: "center"
    }
  }, primary ? /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: dark ? "primary" : "secondary",
    size: "lg",
    onClick: primary.onClick,
    href: primary.href
  }, primary.label) : null, secondary ? /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: dark ? "secondary" : "ghost",
    size: "lg",
    onClick: secondary.onClick,
    href: secondary.href
  }, secondary.label) : null)));
}
Object.assign(__ds_scope, { CTABand });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/CTABand.jsx", error: String((e && e.message) || e) }); }

// components/layout/FitField.jsx
try { (() => {
/**
 * Bounded fit / non-fit field. A large editorial spread per segment, with the
 * included scope and the explicitly excluded decisions side by side.
 */
function FitField({
  segment,
  label,
  summary,
  included = [],
  excluded = [],
  style
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      display: "grid",
      gap: "var(--space-5)",
      borderTop: "var(--border-editorial) solid var(--line-editorial)",
      paddingTop: "var(--space-5)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      gap: "16px"
    }
  }, label ? /*#__PURE__*/React.createElement(__ds_scope.ProofLabel, {
    status: "neutral",
    size: "sm"
  }, label) : /*#__PURE__*/React.createElement("span", null)), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: "clamp(30px, 3.2vw, 56px)",
      lineHeight: 0.98,
      letterSpacing: "var(--track-display)",
      textTransform: "uppercase"
    }
  }, segment), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--type-body)",
      lineHeight: 1.5,
      maxWidth: "48ch",
      textWrap: "pretty"
    }
  }, summary), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement(Col, {
    heading: "IN SCOPE",
    items: included,
    mark: "+",
    color: "var(--blueprint)"
  }), /*#__PURE__*/React.createElement(Col, {
    heading: "EXCLUDED INITIALLY",
    items: excluded,
    mark: "\u2014",
    color: "var(--signal-orange)"
  })));
}
function Col({
  heading,
  items,
  mark,
  color
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-label-sm)",
      fontWeight: 600,
      letterSpacing: "var(--track-label-wide)",
      textTransform: "uppercase",
      color,
      borderBottom: `var(--border-ordinary) solid ${color}`,
      paddingBottom: "6px",
      marginBottom: "10px"
    }
  }, heading), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      padding: 0,
      listStyle: "none",
      display: "grid",
      gap: "8px"
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: "grid",
      gridTemplateColumns: "16px 1fr",
      gap: "8px",
      fontSize: "var(--type-caption)",
      lineHeight: 1.45,
      color: "var(--text-body)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      color
    }
  }, mark), /*#__PURE__*/React.createElement("span", null, it)))));
}
Object.assign(__ds_scope, { FitField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/FitField.jsx", error: String((e && e.message) || e) }); }

// components/layout/SiteFooter.jsx
try { (() => {
/**
 * Site footer. Index-sheet layout with an operating location line and a
 * document/version marker used as a visual device, not a legal claim.
 */
function SiteFooter({
  columns = [],
  location,
  version,
  onNavigate,
  style
}) {
  return /*#__PURE__*/React.createElement("footer", {
    className: "dw-dark",
    style: {
      background: "var(--ink)",
      color: "var(--bone)",
      padding: "var(--space-9) var(--page-margin) var(--space-6)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--grid-max)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
      gap: "var(--space-6)",
      borderTop: "var(--border-ordinary) solid var(--steel)",
      paddingTop: "var(--space-5)"
    }
  }, columns.map((col, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "grid",
      gap: "10px",
      alignContent: "start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-label-sm)",
      letterSpacing: "var(--track-label-wide)",
      textTransform: "uppercase",
      color: "var(--steel-2)"
    }
  }, col.title), col.links.map((l, j) => /*#__PURE__*/React.createElement("a", {
    key: j,
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNavigate?.(l.id);
    },
    style: {
      color: "var(--bone)",
      textDecoration: "none",
      fontSize: "var(--type-body-sm)",
      lineHeight: 1.4
    }
  }, l.label))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      gap: "var(--space-6)",
      flexWrap: "wrap",
      marginTop: "var(--space-9)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Wordmark, {
    size: "clamp(40px, 8vw, 96px)",
    tone: "bone"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "4px",
      textAlign: "right",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-label-sm)",
      letterSpacing: "var(--track-label)",
      textTransform: "uppercase",
      color: "var(--steel-2)"
    }
  }, /*#__PURE__*/React.createElement("span", null, location), /*#__PURE__*/React.createElement("span", null, version)))));
}
Object.assign(__ds_scope, { SiteFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/SiteFooter.jsx", error: String((e && e.message) || e) }); }

// components/layout/SiteHeader.jsx
try { (() => {
/**
 * Site header. Compact nav with a persistent folio/version detail. Mobile
 * behaves like an index sheet rather than a rounded drawer.
 */
function SiteHeader({
  items = [],
  active,
  onNavigate,
  cta,
  version = "V0.1",
  tone = "bone",
  style
}) {
  const [open, setOpen] = React.useState(false);
  const dark = tone === "ink";
  return /*#__PURE__*/React.createElement("header", {
    className: dark ? "dw-dark" : undefined,
    style: {
      position: "sticky",
      top: 0,
      zIndex: 50,
      background: dark ? "var(--ink)" : "var(--bone)",
      borderBottom: "var(--border-ordinary) solid var(--line-ordinary)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--grid-max)",
      margin: "0 auto",
      padding: "0 var(--page-margin)",
      height: "72px",
      display: "flex",
      alignItems: "center",
      gap: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNavigate?.(items[0]?.id);
    },
    style: {
      textDecoration: "none",
      display: "flex",
      alignItems: "center",
      gap: "10px"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Wordmark, {
    size: 22,
    tone: dark ? "bone" : "ink"
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      gap: "var(--space-5)",
      marginLeft: "auto"
    },
    className: "dw-nav-desktop"
  }, items.map(it => /*#__PURE__*/React.createElement("button", {
    key: it.id,
    onClick: () => onNavigate?.(it.id),
    style: {
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
      borderBottom: active === it.id ? "var(--border-emphasis) solid var(--signal-orange)" : "var(--border-emphasis) solid transparent"
    }
  }, it.label))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-label-sm)",
      letterSpacing: "var(--track-label)",
      color: "var(--text-faint)",
      whiteSpace: "nowrap"
    }
  }, version), cta ? /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "sm",
    onClick: cta.onClick
  }, cta.label) : null));
}
Object.assign(__ds_scope, { SiteHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/SiteHeader.jsx", error: String((e && e.message) || e) }); }

// slides/slides-kit.jsx
try { (() => {
const {
  ProofLabel,
  PullQuote,
  Wordmark,
  AnnotatedComparison,
  WorkOrder,
  CaseMetric,
  Button
} = window.DirtyworksAiDesignSystem_9135ac;

/* 1280×720 slide frame. Folio and evidence margin instead of a repeated title template. */
function Slide({
  children,
  tone = "bone",
  folio,
  chapter,
  mark,
  wordmark = false,
  style
}) {
  const dark = tone === "ink";
  return /*#__PURE__*/React.createElement("div", {
    className: dark ? "dw-dark" : undefined,
    style: {
      width: 1280,
      height: 720,
      boxSizing: "border-box",
      background: tone === "ink" ? "var(--ink)" : tone === "sheet" ? "var(--bone-2)" : tone === "orange" ? "var(--signal-orange)" : "var(--bone)",
      color: dark ? "var(--bone)" : "var(--ink)",
      display: "grid",
      gridTemplateRows: "auto 1fr auto",
      padding: "44px 64px 32px",
      position: "relative",
      overflow: "hidden",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 13,
      fontWeight: 600,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: dark ? "var(--steel-2)" : "var(--steel)"
    }
  }, chapter), mark ? mark : null), /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: 0,
      alignSelf: "center"
    }
  }, children), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: dark ? "var(--steel)" : "var(--steel-2)"
    }
  }, folio), wordmark ? /*#__PURE__*/React.createElement(Wordmark, {
    size: 15,
    tone: dark ? "bone" : "ink"
  }) : /*#__PURE__*/React.createElement("span", null)));
}

/* 01 — Cover / interruption */
function CoverSlide() {
  return /*#__PURE__*/React.createElement(Slide, {
    tone: "bone",
    chapter: "Dirtyworks.ai / Managed knowledge + AI operations",
    folio: "01 / Cover",
    wordmark: true,
    mark: /*#__PURE__*/React.createElement(ProofLabel, {
      status: "neutral",
      size: "sm"
    }, "Founder deck \xB7 v0.1")
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontWeight: 900,
      fontSize: 128,
      lineHeight: 0.82,
      letterSpacing: "-0.04em",
      textTransform: "uppercase"
    }
  }, "Your company", /*#__PURE__*/React.createElement("br", null), "knows more than", /*#__PURE__*/React.createElement("br", null), "it can ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--signal-orange)"
    }
  }, "find"), "."), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      background: "var(--ink)",
      margin: "34px 0 18px",
      width: "62%"
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-mono)",
      fontSize: 15,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "var(--steel)"
    }
  }, "Managed knowledge and AI operations for Alberta businesses")));
}

/* 02 — Declaration */
function DeclarationSlide() {
  return /*#__PURE__*/React.createElement(Slide, {
    tone: "ink",
    chapter: "04 / Contrarian point",
    folio: "Declaration archetype",
    wordmark: true,
    mark: /*#__PURE__*/React.createElement(ProofLabel, {
      status: "gap",
      size: "sm"
    }, "Claim")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.2fr 1fr",
      gap: 56,
      alignItems: "end"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontWeight: 900,
      fontSize: 152,
      lineHeight: 0.82,
      letterSpacing: "-0.045em",
      textTransform: "uppercase"
    }
  }, "AI was the easy part."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 22,
      lineHeight: 1.5,
      color: "var(--steel-2)"
    }
  }, "A licence can expose an interface. It cannot decide which source is approved, assign an owner, or handle the Monday-morning failure.")));
}

/* 03 — Event path */
function EventPathSlide() {
  const steps = [["Searches the intranet", "4 min", "gap"], ["Opens two conflicting docs", "6 min", "gap"], ["Messages a colleague", "waiting", "human"], ["Colleague forwards a 2024 file", "1 day", "gap"], ["Asks the practice lead", "resolved", "answer"]];
  return /*#__PURE__*/React.createElement(Slide, {
    tone: "bone",
    chapter: "02 / The event",
    folio: "Event path archetype",
    wordmark: true,
    mark: /*#__PURE__*/React.createElement(ProofLabel, {
      status: "neutral",
      size: "sm"
    }, "Illustrative")
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "0 0 40px",
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: 62,
      lineHeight: 0.92,
      letterSpacing: "-0.03em",
      textTransform: "uppercase"
    }
  }, "The answer exists. The work still waits."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(5, 1fr)",
      gap: 0,
      borderTop: "1.5px solid var(--ink)"
    }
  }, steps.map(([t, d, s], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: "18px 18px 18px 0",
      borderRight: i < 4 ? "1.5px solid var(--rule)" : "none",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      letterSpacing: "0.14em",
      color: "var(--blueprint)"
    }
  }, "[", String(i + 1).padStart(2, "0"), "]"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "10px 0 14px",
      fontSize: 18,
      fontWeight: 600,
      lineHeight: 1.3
    }
  }, t), /*#__PURE__*/React.createElement(ProofLabel, {
    status: s,
    size: "sm"
  }, d)))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "34px 0 0",
      fontFamily: "var(--font-serif)",
      fontStyle: "italic",
      fontSize: 34,
      lineHeight: 1.1,
      color: "var(--signal-orange)",
      transform: "rotate(-0.8deg)"
    }
  }, "Elapsed: one day. The document never changed.")));
}

/* 04 — Mechanism diagram */
function MechanismSlide() {
  const nodes = [["Approved sources", "source", "Named owner per source"], ["Permission gate", "permission", "Tested per release"], ["Reliable answers", "answer", "Evidence attached"], ["Visible gaps", "gap", "Routed to the owner"], ["Managed improvement", "operated", "Evidence-qualified"]];
  return /*#__PURE__*/React.createElement(Slide, {
    tone: "sheet",
    chapter: "05 / The mechanism",
    folio: "Mechanism archetype",
    wordmark: true
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "0 0 44px",
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: 48,
      lineHeight: 0.96,
      letterSpacing: "-0.025em",
      textTransform: "uppercase"
    }
  }, "Approved sources \u2192 reliable answers \u2192 visible gaps \u2192 managed improvement"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "stretch",
      gap: 0
    }
  }, nodes.map(([n, s, sub], i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: n
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      border: "1.5px solid var(--ink)",
      background: s === "answer" ? "var(--verified-acid)" : "var(--bone-3)",
      padding: 16,
      display: "grid",
      gap: 10,
      alignContent: "start"
    }
  }, /*#__PURE__*/React.createElement(ProofLabel, {
    status: s,
    size: "sm"
  }, String(i + 1).padStart(2, "0")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 20,
      lineHeight: 1.05,
      textTransform: "uppercase",
      letterSpacing: "-0.01em"
    }
  }, n), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: "var(--steel)",
      lineHeight: 1.5
    }
  }, sub)), i < nodes.length - 1 ? /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      display: "grid",
      placeItems: "center",
      color: "var(--blueprint)",
      fontFamily: "var(--font-mono)",
      fontSize: 18
    }
  }, "\u2192") : null))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 32,
      marginTop: 26,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 1.5,
      background: "var(--signal-orange)"
    }
  }), /*#__PURE__*/React.createElement(ProofLabel, {
    status: "human"
  }, "Human decision point")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 1.5,
      background: "var(--blueprint)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "var(--blueprint)"
    }
  }, "Improvement loop returns to sources")))));
}

/* 05 — Comparison */
function ComparisonSlide() {
  return /*#__PURE__*/React.createElement(Slide, {
    tone: "bone",
    chapter: "07 / Managed launch and operations",
    folio: "Comparison archetype",
    wordmark: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "0.8fr 1.4fr",
      gap: 56,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontWeight: 900,
      fontSize: 62,
      lineHeight: 0.86,
      letterSpacing: "-0.035em",
      textTransform: "uppercase"
    }
  }, "Somebody owns Monday morning.")), /*#__PURE__*/React.createElement(AnnotatedComparison, {
    leftTitle: "A tool",
    rightTitle: "An operated capability",
    rows: [{
      left: "Connected",
      right: "Sources approved and owned"
    }, {
      left: "Answers",
      right: "Answer classes evaluated"
    }, {
      left: "User access",
      right: "Permissions tested"
    }, {
      left: "Usage count",
      right: "Quality, gaps, risk and value reviewed"
    }, {
      left: "Cancel button",
      right: "Portable offboarding package",
      decisive: true
    }]
  })));
}

/* 06 — Work order */
function WorkOrderSlide() {
  return /*#__PURE__*/React.createElement(Slide, {
    tone: "bone",
    chapter: "06 / The first offer",
    folio: "Work order archetype",
    wordmark: true,
    mark: /*#__PURE__*/React.createElement(ProofLabel, {
      status: "neutral",
      size: "sm"
    }, "Paid fixed scope")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.15fr 0.85fr",
      gap: 56,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "0 0 26px",
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: 54,
      lineHeight: 0.9,
      letterSpacing: "-0.03em",
      textTransform: "uppercase"
    }
  }, "Start with one question domain."), /*#__PURE__*/React.createElement(WorkOrder, {
    loopLabel: "Improvement returns to review",
    steps: [{
      name: "Review",
      duration: "7–10 days",
      detail: "One domain, up to three sources, 15–30 real evaluation questions.",
      marks: [{
        label: "SOURCE",
        value: "≤3",
        status: "source"
      }]
    }, {
      name: "Launch",
      duration: "Reference scope",
      detail: "Customer-owned platform, permission tests, bounded user group.",
      marks: [{
        label: "USERS",
        value: "≤40",
        status: "neutral"
      }]
    }, {
      name: "Operate",
      duration: "Monthly",
      detail: "Quality, freshness, support, cost, incidents and change.",
      marks: [{
        label: "STATUS",
        value: "OPERATED",
        status: "operated"
      }]
    }]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      border: "3px solid var(--ink)",
      padding: 24,
      display: "grid",
      gap: 14,
      background: "var(--bone-3)",
      marginTop: 70
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "var(--steel)"
    }
  }, "Valid conclusions"), ["Launch", "Repair first", "Capture knowledge", "Use a simpler tool", "Stop"].map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: c,
    style: {
      display: "flex",
      justifyContent: "space-between",
      borderBottom: "1px solid var(--rule)",
      paddingBottom: 7,
      fontSize: 16,
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement("span", null, c), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      color: "var(--steel)"
    }
  }, "0", i + 1))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-serif)",
      fontStyle: "italic",
      fontSize: 24,
      lineHeight: 1.1
    }
  }, "All five are successful outcomes."))));
}

/* 07 — Quote */
function QuoteSlide() {
  return /*#__PURE__*/React.createElement(Slide, {
    tone: "ink",
    chapter: "03 / The hidden system",
    folio: "Quote archetype",
    wordmark: true,
    mark: /*#__PURE__*/React.createElement(ProofLabel, {
      status: "human",
      size: "sm"
    }, "Illustrative")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.3fr 0.7fr",
      gap: 64,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(PullQuote, {
    size: "lg",
    tone: "bone",
    attribution: "Practice lead, professional services firm",
    context: "Illustrative"
  }, "I am the search engine. It is not in my job description."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 14,
      borderLeft: "1.5px solid var(--steel)",
      paddingLeft: 24
    }
  }, [["Interruptions / week", "11"], ["Onboarding to independence", "14 weeks"], ["People who can answer", "5"]].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 900,
      fontSize: 44,
      lineHeight: 0.9,
      letterSpacing: "-0.03em"
    }
  }, v), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "var(--steel-2)",
      marginTop: 4
    }
  }, k))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "var(--signal-orange)",
      marginTop: 6
    }
  }, "Hypothesis \u2014 not measured"))));
}

/* 08 — Decision */
function DecisionSlide() {
  return /*#__PURE__*/React.createElement(Slide, {
    tone: "orange",
    chapter: "15 / Decision",
    folio: "Decision archetype",
    wordmark: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 56,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontWeight: 900,
      fontSize: 88,
      lineHeight: 0.84,
      letterSpacing: "-0.04em",
      textTransform: "uppercase",
      color: "var(--ink)"
    }
  }, "The decision we are asking for."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "26px 0 0",
      fontSize: 21,
      lineHeight: 1.45,
      color: "var(--ink)",
      maxWidth: "40ch"
    }
  }, "Not \u201Cquestions?\u201D. One named commitment, with a date and an owner.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 0,
      border: "1.5px solid var(--ink)",
      background: "var(--bone)"
    }
  }, [["Option A", "Fund tranche 1 — $5K, three paid reviews", "Recommended"], ["Option B", "One MSP design pilot before capital", ""], ["Option C", "Defer until two launches are live", ""]].map(([k, v, rec], i) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: "grid",
      gridTemplateColumns: "110px 1fr auto",
      gap: 18,
      alignItems: "center",
      padding: "18px 20px",
      borderBottom: i < 2 ? "1px solid var(--rule)" : "none",
      background: rec ? "var(--verified-acid)" : "transparent"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "var(--steel)"
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 17,
      fontWeight: 600,
      lineHeight: 1.3
    }
  }, v), rec ? /*#__PURE__*/React.createElement(ProofLabel, {
    status: "answer",
    size: "sm"
  }, rec) : /*#__PURE__*/React.createElement("span", null))))));
}
Object.assign(window, {
  Slide,
  CoverSlide,
  DeclarationSlide,
  EventPathSlide,
  MechanismSlide,
  ComparisonSlide,
  WorkOrderSlide,
  QuoteSlide,
  DecisionSlide
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "slides/slides-kit.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/home-sections.jsx
try { (() => {
const {
  Declaration,
  PullQuote,
  EvidenceRail,
  ProofLabel,
  Button,
  Redaction
} = window.DirtyworksAiDesignSystem_9135ac;
function Band({
  children,
  tone = "bone",
  pad = "band",
  id,
  style
}) {
  const dark = tone === "ink";
  return /*#__PURE__*/React.createElement("section", {
    id: id,
    className: dark ? "dw-dark" : undefined,
    style: {
      background: tone === "ink" ? "var(--ink)" : tone === "sheet" ? "var(--bone-2)" : "var(--bone)",
      color: dark ? "var(--bone)" : "var(--ink)",
      padding: `${pad === "tight" ? "var(--band-pad-y-tight)" : "var(--band-pad-y)"} var(--page-margin)`,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--grid-max)",
      margin: "0 auto"
    }
  }, children));
}
function Folio({
  children,
  tone
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "14px",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-label-sm)",
      fontWeight: 600,
      letterSpacing: "var(--track-label-wide)",
      textTransform: "uppercase",
      color: tone === "bone" ? "var(--steel-2)" : "var(--steel)",
      marginBottom: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      height: "1.5px",
      width: "40px",
      background: "var(--signal-orange)"
    }
  }), children);
}

/* 01 — Hero: interruption. Oversized cropped statement, source strip, no product shot. */
function Hero({
  onCta
}) {
  const [aligned, setAligned] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setAligned(true), 900);
    return () => clearTimeout(t);
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--bone)",
      borderBottom: "var(--border-editorial) solid var(--ink)"
    },
    className: "dw-tex-paper"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--grid-max)",
      margin: "0 auto",
      padding: "clamp(48px, 7vw, 112px) var(--page-margin) var(--space-9)",
      display: "grid",
      gridTemplateColumns: "minmax(0, 1.55fr) minmax(280px, 1fr)",
      gap: "var(--space-8)",
      alignItems: "end"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Folio, null, "Dirtyworks.ai / Managed knowledge + AI operations"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontWeight: 900,
      fontSize: "clamp(56px, 8.6vw, 152px)",
      lineHeight: 0.84,
      letterSpacing: "-0.035em",
      textTransform: "uppercase"
    }
  }, "Your company", /*#__PURE__*/React.createElement("br", null), "knows more than", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-block"
    }
  }, "it can", " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--signal-orange)"
    }
  }, "find"), ".", /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      left: "0",
      right: "-6%",
      bottom: "0.1em",
      height: "0.06em",
      background: "var(--blueprint)",
      transform: aligned ? "scaleX(1)" : "scaleX(0)",
      transformOrigin: "left",
      transition: "transform var(--dur-reveal) var(--ease-mech)"
    }
  }))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "var(--space-6) 0 0",
      fontSize: "var(--type-lead)",
      lineHeight: 1.32,
      maxWidth: "50ch",
      textWrap: "pretty"
    }
  }, "Dirtyworks.ai gives your team reliable answers from approved company information \u2014 and operates the sources, permissions, quality, support, and improvements behind them."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-4)",
      flexWrap: "wrap",
      marginTop: "var(--space-7)"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    onClick: onCta
  }, "Show us where work gets stuck"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "secondary",
    onClick: () => document.getElementById("method-anchor")?.scrollTo?.()
  }, "See the work behind the answer"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-2)",
      marginBottom: "6px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-label-sm)",
      letterSpacing: "var(--track-label-wide)",
      textTransform: "uppercase",
      color: "var(--steel)",
      borderBottom: "var(--border-ordinary) solid var(--ink)",
      paddingBottom: "8px"
    }
  }, "Source strip / 04"), [{
    l: "SOURCE",
    v: "SharePoint / Ops",
    s: "source"
  }, {
    l: "OWNER",
    v: "Unassigned",
    s: "gap"
  }, {
    l: "PERMISSION",
    v: "Not tested",
    s: "gap"
  }, {
    l: "ANSWER",
    v: "No evidence",
    s: "neutral"
  }].map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "12px",
      background: "var(--bone-3)",
      border: "var(--border-hair) solid var(--rule)",
      borderLeft: "var(--border-emphasis) solid var(--ink)",
      padding: "10px 12px",
      transform: aligned ? "none" : `translateX(${(i + 1) * 8}px) rotate(${i % 2 ? -0.7 : 0.7}deg)`,
      transition: `transform var(--dur-slow) var(--ease-mech) ${i * 70}ms`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-label-sm)",
      letterSpacing: "var(--track-label)",
      color: "var(--steel)"
    }
  }, r.l), /*#__PURE__*/React.createElement(ProofLabel, {
    status: r.s,
    size: "sm"
  }, r.v))))));
}

/* 02 — Problem: the invisible answer desk */
function ProblemBand() {
  const [aligned, setAligned] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(e => e[0].isIntersecting && setAligned(true), {
      threshold: 0.3
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return /*#__PURE__*/React.createElement(Band, {
    tone: "sheet"
  }, /*#__PURE__*/React.createElement(Folio, null, "02 / The invisible answer desk"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(0,1fr) minmax(0,1.15fr)",
      gap: "var(--space-8)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: "clamp(30px, 3.6vw, 62px)",
      lineHeight: 0.94,
      letterSpacing: "-0.025em",
      textTransform: "uppercase"
    }
  }, "\u201CAsk the person who knows\u201D is not a knowledge system."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "var(--space-5) 0 0",
      fontSize: "var(--type-body)",
      lineHeight: 1.5,
      maxWidth: "52ch",
      textWrap: "pretty"
    }
  }, "The cost does not arrive as one invoice. It appears as searching, interruptions, waiting, rework, inconsistent answers, slow onboarding, and dependence on whoever remembers.")), /*#__PURE__*/React.createElement("div", {
    ref: ref
  }, /*#__PURE__*/React.createElement(EvidenceRail, {
    title: "Recent events / illustrative",
    aligned: aligned,
    items: [{
      text: "The current procedure is somewhere in SharePoint.",
      origin: "SharePoint / Ops-procedures",
      status: "gap",
      statusLabel: "Open gap"
    }, {
      text: "The last project solved this. Nobody can find it.",
      origin: "Project archive / 2024",
      status: "source",
      statusLabel: "Unindexed"
    }, {
      text: "New staff keep asking the same five people.",
      status: "human",
      statusLabel: "Person-dependent"
    }, {
      text: "Two teams are using different versions.",
      origin: "Shared drive / Templates",
      status: "gap",
      statusLabel: "Contradiction"
    }, {
      text: "A public AI tool is already in the workflow. Nobody owns it.",
      status: "gap",
      statusLabel: "Unowned"
    }]
  }))));
}

/* 03 — Contrarian frame with the redaction reveal */
function ContrarianBand() {
  const [open, setOpen] = React.useState(false);
  return /*#__PURE__*/React.createElement(Band, {
    tone: "ink",
    style: {
      borderTop: "var(--border-editorial) solid var(--signal-orange)"
    }
  }, /*#__PURE__*/React.createElement(Folio, {
    tone: "bone"
  }, "03 / Contrarian frame"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(0,1.1fr) minmax(0,1fr)",
      gap: "var(--space-8)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontWeight: 900,
      fontSize: "clamp(48px, 7vw, 128px)",
      lineHeight: 0.86,
      letterSpacing: "-0.035em",
      textTransform: "uppercase"
    }
  }, "AI was the", /*#__PURE__*/React.createElement("br", null), "easy part."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "var(--space-6) 0 0",
      fontSize: "var(--type-body)",
      lineHeight: 1.55,
      maxWidth: "52ch",
      color: "var(--steel-2)",
      textWrap: "pretty"
    }
  }, "A licence can expose an interface. It cannot decide which source is approved, fix contradictory instructions, assign an owner, test who can see what, train the team, or handle the Monday-morning failure.")), /*#__PURE__*/React.createElement("div", {
    style: {
      border: "var(--border-ordinary) solid var(--steel)",
      padding: "var(--space-6)",
      display: "grid",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-label-sm)",
      letterSpacing: "var(--track-label-wide)",
      textTransform: "uppercase",
      color: "var(--steel-2)"
    }
  }, "What you are actually buying"), /*#__PURE__*/React.createElement("div", {
    onClick: () => setOpen(!open),
    style: {
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(Redaction, {
    size: "lg",
    tone: "bone",
    covered: "THE AI",
    revealed: "THE OPERATION",
    open: open
  })), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      padding: 0,
      listStyle: "none",
      display: "grid",
      gap: "8px"
    }
  }, ["Approved sources", "Tested permissions", "Named owners", "Evaluated answer classes", "Trained users", "A designed failure path"].map((t, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: "grid",
      gridTemplateColumns: "28px 1fr",
      gap: "8px",
      fontSize: "var(--type-body-sm)",
      color: open ? "var(--bone)" : "var(--ink-3)",
      transition: `color var(--dur-base) var(--ease-mech) ${i * 60}ms`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-label-sm)",
      color: "var(--blueprint)"
    }
  }, "[", String(i + 1).padStart(2, "0"), "]"), t))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-label-sm)",
      letterSpacing: "var(--track-label)",
      color: "var(--signal-orange)"
    }
  }, open ? "◼ Redaction retracted" : "▶ Retract the redaction"))));
}
Object.assign(window, {
  Band,
  Folio,
  Hero,
  ProblemBand,
  ContrarianBand
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/home-sections.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/page-sections.jsx
try { (() => {
const {
  WorkOrder,
  AnnotatedComparison,
  ControlRegister,
  FitField,
  PullQuote,
  ProofLabel,
  CaseMetric,
  Button,
  CTABand,
  DiagnosticForm,
  ArticleRow,
  Declaration
} = window.DirtyworksAiDesignSystem_9135ac;

/* 04 — Method: annotated vertical work order */
function MethodBand() {
  return /*#__PURE__*/React.createElement(Band, {
    tone: "bone",
    id: "method-anchor"
  }, /*#__PURE__*/React.createElement(Folio, null, "04 / Review \xB7 Launch \xB7 Operate \xB7 Improve"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(0,1.4fr) minmax(260px,0.85fr)",
      gap: "var(--space-8)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement(WorkOrder, {
    steps: [{
      name: "Review",
      duration: "7–10 days",
      detail: "One question domain, real events, sources, owners, permissions, risk, and a measured baseline.",
      annotation: "A valid conclusion here is “stop”.",
      marks: [{
        label: "SOURCE",
        value: "≤3",
        status: "source"
      }, {
        label: "PAID",
        value: "FIXED SCOPE",
        status: "neutral"
      }]
    }, {
      name: "Launch",
      duration: "Reference scope",
      detail: "Configure the customer-owned platform, evaluate real questions, test access, train a bounded group.",
      marks: [{
        label: "PERMISSION",
        value: "TESTED",
        status: "permission"
      }, {
        label: "USERS",
        value: "≤40",
        status: "neutral"
      }]
    }, {
      name: "Operate",
      duration: "Monthly",
      detail: "Monitor quality, freshness, support, use, cost, incidents, and change.",
      annotation: "Somebody owns Monday morning.",
      marks: [{
        label: "CHANGE",
        value: "LOGGED",
        status: "change"
      }]
    }, {
      name: "Improve",
      detail: "Repair knowledge, structure data, assist work — or automate only when the evidence supports it.",
      marks: [{
        label: "STATUS",
        value: "OPERATED",
        status: "operated"
      }]
    }]
  }), /*#__PURE__*/React.createElement("aside", {
    style: {
      border: "var(--border-ordinary) solid var(--ink)",
      background: "var(--bone-3)",
      padding: "var(--space-5)",
      display: "grid",
      gap: "var(--space-4)",
      boxShadow: "var(--shadow-hard-sm)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-label-sm)",
      letterSpacing: "var(--track-label-wide)",
      textTransform: "uppercase",
      color: "var(--steel)"
    }
  }, "Review conclusions"), ["Launch", "Repair first", "Capture knowledge", "Use a simpler tool", "Stop"].map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "var(--border-hair) solid var(--rule)",
      paddingBottom: "8px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--type-body-sm)",
      fontWeight: 600
    }
  }, c), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-label-sm)",
      color: "var(--steel)"
    }
  }, String(i + 1).padStart(2, "0")))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-serif)",
      fontStyle: "italic",
      fontSize: "22px",
      lineHeight: 1.15,
      color: "var(--ink)"
    }
  }, "All five are successful outcomes."))));
}

/* 05 — What managed means */
function ManagedBand() {
  return /*#__PURE__*/React.createElement(Band, {
    tone: "sheet"
  }, /*#__PURE__*/React.createElement(Folio, null, "05 / What managed means"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(0,0.85fr) minmax(0,1.3fr)",
      gap: "var(--space-8)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontWeight: 900,
      fontSize: "clamp(34px, 4vw, 72px)",
      lineHeight: 0.88,
      letterSpacing: "-0.035em",
      textTransform: "uppercase"
    }
  }, "Somebody owns Monday morning."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "var(--space-5) 0 0",
      fontSize: "var(--type-body)",
      lineHeight: 1.55,
      maxWidth: "44ch"
    }
  }, "A system that works on launch day is a project. A system that keeps working is an operation.")), /*#__PURE__*/React.createElement(AnnotatedComparison, {
    leftTitle: "A tool",
    rightTitle: "An operated capability",
    rows: [{
      left: "Connected",
      right: "Sources approved and owned"
    }, {
      left: "Answers",
      right: "Answer classes evaluated"
    }, {
      left: "User access",
      right: "Permissions tested"
    }, {
      left: "Training link",
      right: "Role-specific rollout and support"
    }, {
      left: "Usage count",
      right: "Quality, gaps, risk and value reviewed"
    }, {
      left: "Vendor update",
      right: "Change assessed and regression tested"
    }, {
      left: "Cancel button",
      right: "Portable offboarding package",
      decisive: true
    }]
  })));
}

/* 06 — Trust */
function TrustBand() {
  return /*#__PURE__*/React.createElement(Band, {
    tone: "bone"
  }, /*#__PURE__*/React.createElement(Folio, null, "06 / Trust"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(0,0.8fr) minmax(0,1.5fr)",
      gap: "var(--space-8)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement(PullQuote, {
    size: "md"
  }, "\u201CI don\u2019t know\u201D is a feature."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--type-body-sm)",
      lineHeight: 1.55,
      maxWidth: "40ch",
      color: "var(--steel)"
    }
  }, "If the source is missing, the system should say so. We publish the limitations before the credentials."), /*#__PURE__*/React.createElement(Button, {
    variant: "evidence",
    size: "md"
  }, "Read the trust model")), /*#__PURE__*/React.createElement(ControlRegister, {
    caption: "Control register / public extract",
    rows: [{
      control: "Customer ownership",
      mechanism: "Technology and data sit in the customer tenant by default; we operate inside it.",
      holder: "Customer",
      state: "Default",
      status: "operated"
    }, {
      control: "Approved sources",
      mechanism: "A bounded, named source list with an accountable owner per source.",
      holder: "Customer + DW",
      state: "Named",
      status: "source"
    }, {
      control: "Least privilege",
      mechanism: "Permission groups mirrored from the source system and tested per release.",
      holder: "Dirtyworks.ai",
      state: "Tested",
      status: "permission"
    }, {
      control: "Honest abstention",
      mechanism: "Unsupported and contradictory questions follow an agreed failure path.",
      holder: "Dirtyworks.ai",
      state: "Designed",
      status: "answer"
    }, {
      control: "Human accountability",
      mechanism: "Consequential decisions stay with the accountable person. No autopilot.",
      holder: "Customer",
      state: "Required",
      status: "human"
    }, {
      control: "Incidents",
      mechanism: "Time-stamped disclosure, connector disablement, and written follow-up.",
      holder: "Dirtyworks.ai",
      state: "Documented",
      status: "change"
    }, {
      control: "Portability",
      mechanism: "Offboarding package: sources, configuration, evaluation set, records.",
      holder: "Customer",
      state: "Contracted",
      status: "operated"
    }],
    note: "This register describes controls. It is not a claim of perfect answers, complete security, or regulatory compliance."
  })));
}

/* 07 — Fit */
function FitBand() {
  return /*#__PURE__*/React.createElement(Band, {
    tone: "ink"
  }, /*#__PURE__*/React.createElement(Folio, {
    tone: "bone"
  }, "07 / Fit"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "0 0 var(--space-8)",
      fontFamily: "var(--font-display)",
      fontWeight: 900,
      fontSize: "clamp(34px, 4.4vw, 78px)",
      lineHeight: 0.9,
      letterSpacing: "-0.035em",
      textTransform: "uppercase"
    }
  }, "Start where the answer matters."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--space-8)"
    }
  }, /*#__PURE__*/React.createElement(FitField, {
    label: "Fit / 01",
    segment: "Professional services",
    summary: "Approved firm methods, templates, software procedures, engagement administration, and onboarding.",
    included: ["Firm methods and templates", "Software procedures", "Engagement administration", "New-staff onboarding"],
    excluded: ["Client records", "Professional judgement", "Employment decisions"]
  }), /*#__PURE__*/React.createElement(FitField, {
    label: "Fit / 02",
    segment: "Energy services",
    summary: "Commercial and project administration, client requirements, internal systems, and project closeout.",
    included: ["Commercial and project admin", "Client requirements", "Internal systems", "Project closeout"],
    excluded: ["Safety decisions", "Engineering judgement", "Field control", "Regulatory determinations"]
  })));
}

/* 08 — Offer */
function OfferBand() {
  return /*#__PURE__*/React.createElement(Band, {
    tone: "sheet"
  }, /*#__PURE__*/React.createElement(Folio, null, "08 / The first offer"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(0,1.1fr) minmax(0,1fr)",
      gap: "var(--space-8)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontWeight: 900,
      fontSize: "clamp(34px, 4.2vw, 76px)",
      lineHeight: 0.88,
      letterSpacing: "-0.035em",
      textTransform: "uppercase"
    }
  }, "One domain.", /*#__PURE__*/React.createElement("br", null), "One decision.", /*#__PURE__*/React.createElement("br", null), "Then build."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "var(--space-6) 0 0",
      fontSize: "var(--type-body)",
      lineHeight: 1.55,
      maxWidth: "54ch",
      textWrap: "pretty"
    }
  }, "The Knowledge Reliability Review is a paid 7\u201310 business-day assessment of one question domain and up to three candidate sources. It maps value, ownership, permissions, source quality, risk, real evaluation questions, and a recommended next move."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "8px",
      flexWrap: "wrap",
      marginTop: "var(--space-5)"
    }
  }, ["Launch", "Repair first", "Capture knowledge", "Use a simpler tool", "Stop"].map(c => /*#__PURE__*/React.createElement(ProofLabel, {
    key: c,
    status: c === "Stop" ? "gap" : "neutral",
    size: "sm"
  }, c)))), /*#__PURE__*/React.createElement("div", {
    style: {
      border: "var(--border-emphasis) solid var(--ink)",
      background: "var(--bone-3)",
      padding: "var(--space-6)",
      display: "grid",
      gap: "var(--space-4)",
      marginTop: "var(--offset-hard)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-label-sm)",
      letterSpacing: "var(--track-label-wide)",
      textTransform: "uppercase",
      color: "var(--steel)"
    }
  }, "Knowledge Reliability Review"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 900,
      fontSize: "clamp(40px,4vw,64px)",
      lineHeight: 0.9,
      letterSpacing: "-0.04em"
    }
  }, "Paid fixed-scope review"), /*#__PURE__*/React.createElement("dl", {
    style: {
      margin: 0,
      display: "grid",
      gap: "10px",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-label-sm)",
      letterSpacing: "0.04em",
      textTransform: "uppercase"
    }
  }, [["Duration", "7–10 business days"], ["Question domains", "One"], ["Candidate sources", "Up to three"], ["Sampled items", "Up to 25, with permission"], ["Evaluation questions", "15–30 real questions"], ["Output", "Written Knowledge Reliability Map"]].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: "flex",
      justifyContent: "space-between",
      gap: "12px",
      borderBottom: "var(--border-hair) solid var(--rule)",
      paddingBottom: "6px"
    }
  }, /*#__PURE__*/React.createElement("dt", {
    style: {
      color: "var(--steel)"
    }
  }, k), /*#__PURE__*/React.createElement("dd", {
    style: {
      margin: 0,
      fontWeight: 600,
      textAlign: "right"
    }
  }, v)))), /*#__PURE__*/React.createElement(Button, {
    fullWidth: true
  }, "Book a Knowledge Reliability Review"))));
}

/* 09 — MSP lane */
function MspBand({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement(Band, {
    tone: "bone"
  }, /*#__PURE__*/React.createElement(Folio, null, "09 / MSP partner lane"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
      gap: "var(--space-8)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontWeight: 900,
      fontSize: "clamp(32px, 3.8vw, 68px)",
      lineHeight: 0.9,
      letterSpacing: "-0.035em",
      textTransform: "uppercase"
    }
  }, "Keep the account. Add the practice."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "var(--space-5) 0 var(--space-6)",
      fontSize: "var(--type-body)",
      lineHeight: 1.55,
      maxWidth: "52ch",
      textWrap: "pretty"
    }
  }, "Referral, co-managed, and white-label structures are available when sales, customer access, support, data roles, margin, and liability are explicit."), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => onNavigate?.("msps")
  }, "Design a partner pilot")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-4)"
    }
  }, [["MSP owns", "Infrastructure, security, and the account relationship as agreed."], ["Dirtyworks.ai owns", "Knowledge method, answer quality, and ongoing operations."], ["Customer owns", "Sources, approvals, and consequential decisions."]].map(([k, v], i) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      borderTop: "var(--border-ordinary) solid var(--ink)",
      paddingTop: "10px",
      marginLeft: i === 1 ? "var(--offset-hard)" : 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-label)",
      fontWeight: 600,
      letterSpacing: "var(--track-label)",
      textTransform: "uppercase",
      color: i === 1 ? "var(--signal-orange)" : "var(--ink)"
    }
  }, k), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--type-body-sm)",
      lineHeight: 1.45,
      marginTop: "6px",
      maxWidth: "40ch"
    }
  }, v))))));
}

/* 10 — Manifesto */
function ManifestoBand() {
  return /*#__PURE__*/React.createElement(Band, {
    tone: "ink",
    style: {
      borderTop: "var(--border-editorial) solid var(--verified-acid)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
      gap: "var(--space-8)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontWeight: 900,
      fontSize: "clamp(44px, 6.4vw, 116px)",
      lineHeight: 0.84,
      letterSpacing: "-0.04em",
      textTransform: "uppercase"
    }
  }, "No theatre.", /*#__PURE__*/React.createElement("br", null), "No mystery.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--verified-acid)"
    }
  }, "Work that works.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--type-body)",
      lineHeight: 1.6,
      color: "var(--steel-2)",
      maxWidth: "50ch",
      textWrap: "pretty"
    }
  }, "Company information is scattered, duplicated, outdated, overexposed, under-owned, and carried around in people\u2019s heads. Turning that into a useful answer takes more than a model and a search box. It takes source decisions. Permission work. Evaluation. Training. Support. Repair. Judgment."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-serif)",
      fontStyle: "italic",
      fontSize: "clamp(28px,3vw,46px)",
      lineHeight: 1.08,
      color: "var(--bone)"
    }
  }, "That is the dirty work."))));
}

/* 11 — Conversion */
function ConversionBand() {
  return /*#__PURE__*/React.createElement(Band, {
    tone: "sheet"
  }, /*#__PURE__*/React.createElement(Folio, null, "11 / Conversion"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(0,0.9fr) minmax(0,1.2fr)",
      gap: "var(--space-8)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontWeight: 900,
      fontSize: "clamp(32px, 3.8vw, 68px)",
      lineHeight: 0.88,
      letterSpacing: "-0.035em",
      textTransform: "uppercase"
    }
  }, "Show us the last answer your team had to chase."), /*#__PURE__*/React.createElement(DiagnosticForm, {
    note: "Do not include customer documents, client names, or personal information in this form. One event is enough to start."
  })));
}

/* NOTES index */
function NotesBand() {
  return /*#__PURE__*/React.createElement(Band, {
    tone: "bone"
  }, /*#__PURE__*/React.createElement(Folio, null, "Notes / 01"), /*#__PURE__*/React.createElement("div", null, [["RAG is becoming a feature. Knowledge ownership is still work.", "Retrieval is commoditising. The source decisions behind it are not.", "Point of view", "2026-08-25", "6 min"], ["“Ask Sarah” is your most expensive undocumented system.", "Key-person dependence has a cost line; it just isn’t on the invoice.", "Point of view", "2026-08-18", "5 min"], ["Permission is part of the answer.", "An answer the reader should not have seen is a failure, not a hit.", "Method", "2026-08-11", "4 min"], ["Before you automate the repeated question, find out why it repeats.", "Repetition is a symptom. Automating it can preserve the cause.", "Method", "2026-08-04", "7 min"], ["A managed AI service needs a failure path.", "Designed failure is the difference between an operation and a demo.", "Method", "2026-07-28", "5 min"], ["What an MSP owns — and what a knowledge operator should.", "The responsibility seam, written down before the first launch.", "Partner", "2026-07-21", "6 min"]].map((n, i) => /*#__PURE__*/React.createElement(ArticleRow, {
    key: i,
    index: i + 1,
    title: n[0],
    thesis: n[1],
    evidence: n[2],
    date: n[3],
    readingTime: n[4]
  }))));
}
Object.assign(window, {
  MethodBand,
  ManagedBand,
  TrustBand,
  FitBand,
  OfferBand,
  MspBand,
  ManifestoBand,
  ConversionBand,
  NotesBand
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/page-sections.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.Wordmark = __ds_scope.Wordmark;

__ds_ns.ArticleRow = __ds_scope.ArticleRow;

__ds_ns.Declaration = __ds_scope.Declaration;

__ds_ns.PullQuote = __ds_scope.PullQuote;

__ds_ns.CaseMetric = __ds_scope.CaseMetric;

__ds_ns.ControlRegister = __ds_scope.ControlRegister;

__ds_ns.EvidenceRail = __ds_scope.EvidenceRail;

__ds_ns.OwnerRow = __ds_scope.OwnerRow;

__ds_ns.ProofLabel = __ds_scope.ProofLabel;

__ds_ns.Redaction = __ds_scope.Redaction;

__ds_ns.WorkOrder = __ds_scope.WorkOrder;

__ds_ns.DiagnosticForm = __ds_scope.DiagnosticForm;

__ds_ns.AnnotatedComparison = __ds_scope.AnnotatedComparison;

__ds_ns.CTABand = __ds_scope.CTABand;

__ds_ns.FitField = __ds_scope.FitField;

__ds_ns.SiteFooter = __ds_scope.SiteFooter;

__ds_ns.SiteHeader = __ds_scope.SiteHeader;

})();
