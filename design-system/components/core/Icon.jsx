import React from "react";

/**
 * Dirtyworks.ai icon. Names are SEMANTIC (what the mark means in this brand),
 * not vendor filenames — see assets/icons/registry.json.
 *
 * Two render modes:
 *   'glyph' — Material Symbols Sharp fallback (works with no asset files)
 *   'svg'   — masked line SVG from assets/icons/ (the real IconScout set)
 *
 * Flip ICON_MODE to 'svg' once the SVG files are in assets/icons/.
 * Pages nested deeper than the project root set window.DS_ICON_BASE
 * (e.g. '../assets/icons/') before rendering.
 */
export const ICON_MODE = "glyph";

export const ICONS = {
  verified: { file: "verified.svg", glyph: "task_alt" },
  "work-order": { file: "work-order.svg", glyph: "assignment_turned_in" },
  register: { file: "register.svg", glyph: "list_alt" },
  diagnostic: { file: "diagnostic.svg", glyph: "plagiarism" },
  controlled: { file: "controlled.svg", glyph: "lock" },
  "sla-clock": { file: "sla-clock.svg", glyph: "schedule" },
  gap: { file: "gap.svg", glyph: "cancel" },
  annotate: { file: "annotate.svg", glyph: "edit_document" },
  owner: { file: "owner.svg", glyph: "assignment_ind" },
  measured: { file: "measured.svg", glyph: "monitoring" },
  "verified-date": { file: "verified-date.svg", glyph: "event_available" },
  handoff: { file: "handoff.svg", glyph: "share" },
  process: { file: "process.svg", glyph: "account_tree" },
  improvement: { file: "improvement.svg", glyph: "published_with_changes" },
  "quality-control": { file: "quality-control.svg", glyph: "verified" },
  monitoring: { file: "monitoring.svg", glyph: "visibility" },
  decision: { file: "decision.svg", glyph: "alt_route" },
  operations: { file: "operations.svg", glyph: "manage_accounts" },
  requirements: { file: "requirements.svg", glyph: "rule" },
  calendar: { file: "calendar.svg", glyph: "calendar_month" },
};

export function Icon({ name, size = 20, weight = 500, color = "currentColor", label, base, style }) {
  const entry = ICONS[name];
  const a11y = { role: label ? "img" : undefined, "aria-label": label, "aria-hidden": label ? undefined : "true" };
  const box = { fontSize: size, lineHeight: 1, color, display: "inline-block", flex: "0 0 auto", userSelect: "none" };

  if (ICON_MODE === "svg" && entry) {
    const root = base || (typeof window !== "undefined" && window.DS_ICON_BASE) || "assets/icons/";
    const url = `url("${root}${entry.file}")`;
    return (
      <span
        {...a11y}
        style={{
          ...box,
          width: size,
          height: size,
          background: color,
          WebkitMask: `${url} center / contain no-repeat`,
          mask: `${url} center / contain no-repeat`,
          ...style,
        }}
      />
    );
  }

  return (
    <span
      {...a11y}
      className="material-symbols-sharp"
      style={{
        ...box,
        fontFamily: "var(--font-icon)",
        fontVariationSettings: `'FILL' 0, 'wght' ${weight}, 'GRAD' 0, 'opsz' 24`,
        ...style,
      }}
    >
      {entry ? entry.glyph : name}
    </span>
  );
}
