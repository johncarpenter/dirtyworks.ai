import React from "react";
import { Button } from "../core/Button.jsx";

/**
 * Diagnostic form. Asks about a real stuck event, not "how can we help".
 * Never requests customer documents or sensitive data.
 */
export function DiagnosticForm({ heading, note, onSubmit, style }) {
  const [sent, setSent] = React.useState(false);
  const fields = [
    { id: "name", label: "NAME", type: "text", w: 1 },
    { id: "company", label: "COMPANY", type: "text", w: 1 },
    { id: "role", label: "ROLE", type: "text", w: 1 },
    { id: "email", label: "EMAIL", type: "email", w: 1 },
    { id: "doing", label: "WHAT WAS THE PERSON TRYING TO DO?", type: "textarea", w: 2 },
    { id: "looked", label: "WHERE DID THEY LOOK?", type: "text", w: 1 },
    { id: "asked", label: "WHO DID THEY FINALLY ASK?", type: "text", w: 1 },
    { id: "systems", label: "WHICH SYSTEMS WERE INVOLVED?", type: "text", w: 2 },
  ];

  if (sent)
    return (
      <div style={{ border: "var(--border-ordinary) solid var(--ink)", padding: "var(--space-6)", background: "var(--verified-acid)", ...style }}>
        <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: "var(--type-label)", letterSpacing: "var(--track-label)", fontWeight: 600 }}>
          RECEIVED / LOGGED
        </p>
        <p style={{ margin: "12px 0 0", fontSize: "var(--type-body)", maxWidth: "42ch" }}>
          We read every one of these. You'll hear back from a person, not a sequence.
        </p>
      </div>
    );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
        onSubmit?.();
      }}
      style={{ display: "grid", gap: "var(--space-5)", ...style }}
    >
      {heading ? (
        <h3
          style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(24px, 2.4vw, 38px)",
            lineHeight: 1,
            letterSpacing: "var(--track-heading)",
            textTransform: "uppercase",
          }}
        >
          {heading}
        </h3>
      ) : null}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
        {fields.map((f) => (
          <label key={f.id} style={{ display: "grid", gap: "6px", gridColumn: f.w === 2 ? "span 2" : "span 1" }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--type-label-sm)",
                fontWeight: 600,
                letterSpacing: "var(--track-label)",
                textTransform: "uppercase",
                color: "var(--text-muted)",
              }}
            >
              {f.label}
            </span>
            {f.type === "textarea" ? (
              <textarea rows={3} style={inputStyle} />
            ) : (
              <input type={f.type} style={inputStyle} />
            )}
          </label>
        ))}
      </div>
      {note ? (
        <p
          style={{
            margin: 0,
            fontFamily: "var(--font-mono)",
            fontSize: "var(--type-label-sm)",
            letterSpacing: "0.04em",
            color: "var(--text-muted)",
            lineHeight: 1.6,
            maxWidth: "60ch",
          }}
        >
          {note}
        </p>
      ) : null}
      <Button size="lg" style={{ justifySelf: "start" }}>
        SEND THE EVENT
      </Button>
    </form>
  );
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
  resize: "vertical",
};
