const { Declaration, PullQuote, EvidenceRail, ProofLabel, Button, Redaction } = window.DirtyworksAiDesignSystem_9135ac;

function Band({ children, tone = "bone", pad = "band", id, style }) {
  const dark = tone === "ink";
  return (
    <section
      id={id}
      className={dark ? "dw-dark" : undefined}
      style={{
        background: tone === "ink" ? "var(--ink)" : tone === "sheet" ? "var(--bone-2)" : "var(--bone)",
        color: dark ? "var(--bone)" : "var(--ink)",
        padding: `${pad === "tight" ? "var(--band-pad-y-tight)" : "var(--band-pad-y)"} var(--page-margin)`,
        ...style,
      }}
    >
      <div style={{ maxWidth: "var(--grid-max)", margin: "0 auto" }}>{children}</div>
    </section>
  );
}

function Folio({ children, tone }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--type-label-sm)",
        fontWeight: 600,
        letterSpacing: "var(--track-label-wide)",
        textTransform: "uppercase",
        color: tone === "bone" ? "var(--steel-2)" : "var(--steel)",
        marginBottom: "var(--space-6)",
      }}
    >
      <span style={{ height: "1.5px", width: "40px", background: "var(--signal-orange)" }} />
      {children}
    </div>
  );
}

/* 01 — Hero: interruption. Oversized cropped statement, source strip, no product shot. */
function Hero({ onCta }) {
  const [aligned, setAligned] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setAligned(true), 900);
    return () => clearTimeout(t);
  }, []);
  return (
    <section style={{ background: "var(--bone)", borderBottom: "var(--border-editorial) solid var(--ink)" }} className="dw-tex-paper">
      <div
        style={{
          maxWidth: "var(--grid-max)",
          margin: "0 auto",
          padding: "clamp(48px, 7vw, 112px) var(--page-margin) var(--space-9)",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.55fr) minmax(280px, 1fr)",
          gap: "var(--space-8)",
          alignItems: "end",
        }}
      >
        <div>
          <Folio>Dirtyworks.ai / Managed knowledge + AI operations</Folio>
          <h1
            style={{
              margin: 0,
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(56px, 8.6vw, 152px)",
              lineHeight: 0.84,
              letterSpacing: "-0.035em",
              textTransform: "uppercase",
            }}
          >
            Your company
            <br />
            knows more than
            <br />
            <span style={{ position: "relative", display: "inline-block" }}>
              it can{" "}
              <span style={{ color: "var(--signal-orange)" }}>find</span>.
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "0",
                  right: "-6%",
                  bottom: "0.1em",
                  height: "0.06em",
                  background: "var(--blueprint)",
                  transform: aligned ? "scaleX(1)" : "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform var(--dur-reveal) var(--ease-mech)",
                }}
              />
            </span>
          </h1>
          <p
            style={{
              margin: "var(--space-6) 0 0",
              fontSize: "var(--type-lead)",
              lineHeight: 1.32,
              maxWidth: "50ch",
              textWrap: "pretty",
            }}
          >
            Dirtyworks.ai gives your team reliable answers from approved company information — and
            operates the sources, permissions, quality, support, and improvements behind them.
          </p>
          <div style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap", marginTop: "var(--space-7)" }}>
            <Button size="lg" onClick={onCta}>
              Show us where work gets stuck
            </Button>
            <Button size="lg" variant="secondary" onClick={() => document.getElementById("method-anchor")?.scrollTo?.()}>
              See the work behind the answer
            </Button>
          </div>
        </div>
        <div style={{ display: "grid", gap: "var(--space-2)", marginBottom: "6px" }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--type-label-sm)",
              letterSpacing: "var(--track-label-wide)",
              textTransform: "uppercase",
              color: "var(--steel)",
              borderBottom: "var(--border-ordinary) solid var(--ink)",
              paddingBottom: "8px",
            }}
          >
            Source strip / 04
          </div>
          {[
            { l: "SOURCE", v: "SharePoint / Ops", s: "source" },
            { l: "OWNER", v: "Unassigned", s: "gap" },
            { l: "PERMISSION", v: "Not tested", s: "gap" },
            { l: "ANSWER", v: "No evidence", s: "neutral" },
          ].map((r, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "12px",
                background: "var(--bone-3)",
                border: "var(--border-hair) solid var(--rule)",
                borderLeft: "var(--border-emphasis) solid var(--ink)",
                padding: "10px 12px",
                transform: aligned ? "none" : `translateX(${(i + 1) * 8}px) rotate(${i % 2 ? -0.7 : 0.7}deg)`,
                transition: `transform var(--dur-slow) var(--ease-mech) ${i * 70}ms`,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--type-label-sm)",
                  letterSpacing: "var(--track-label)",
                  color: "var(--steel)",
                }}
              >
                {r.l}
              </span>
              <ProofLabel status={r.s} size="sm">
                {r.v}
              </ProofLabel>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 02 — Problem: the invisible answer desk */
function ProblemBand() {
  const [aligned, setAligned] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((e) => e[0].isIntersecting && setAligned(true), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Band tone="sheet">
      <Folio>02 / The invisible answer desk</Folio>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.15fr)", gap: "var(--space-8)", alignItems: "start" }}>
        <div>
          <h2
            style={{
              margin: 0,
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(30px, 3.6vw, 62px)",
              lineHeight: 0.94,
              letterSpacing: "-0.025em",
              textTransform: "uppercase",
            }}
          >
            “Ask the person who knows” is not a knowledge system.
          </h2>
          <p style={{ margin: "var(--space-5) 0 0", fontSize: "var(--type-body)", lineHeight: 1.5, maxWidth: "52ch", textWrap: "pretty" }}>
            The cost does not arrive as one invoice. It appears as searching, interruptions, waiting,
            rework, inconsistent answers, slow onboarding, and dependence on whoever remembers.
          </p>
        </div>
        <div ref={ref}>
          <EvidenceRail
            title="Recent events / illustrative"
            aligned={aligned}
            items={[
              { text: "The current procedure is somewhere in SharePoint.", origin: "SharePoint / Ops-procedures", status: "gap", statusLabel: "Open gap" },
              { text: "The last project solved this. Nobody can find it.", origin: "Project archive / 2024", status: "source", statusLabel: "Unindexed" },
              { text: "New staff keep asking the same five people.", status: "human", statusLabel: "Person-dependent" },
              { text: "Two teams are using different versions.", origin: "Shared drive / Templates", status: "gap", statusLabel: "Contradiction" },
              { text: "A public AI tool is already in the workflow. Nobody owns it.", status: "gap", statusLabel: "Unowned" },
            ]}
          />
        </div>
      </div>
    </Band>
  );
}

/* 03 — Contrarian frame with the redaction reveal */
function ContrarianBand() {
  const [open, setOpen] = React.useState(false);
  return (
    <Band tone="ink" style={{ borderTop: "var(--border-editorial) solid var(--signal-orange)" }}>
      <Folio tone="bone">03 / Contrarian frame</Folio>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.1fr) minmax(0,1fr)", gap: "var(--space-8)", alignItems: "start" }}>
        <div>
          <h2
            style={{
              margin: 0,
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(48px, 7vw, 128px)",
              lineHeight: 0.86,
              letterSpacing: "-0.035em",
              textTransform: "uppercase",
            }}
          >
            AI was the
            <br />
            easy part.
          </h2>
          <p style={{ margin: "var(--space-6) 0 0", fontSize: "var(--type-body)", lineHeight: 1.55, maxWidth: "52ch", color: "var(--steel-2)", textWrap: "pretty" }}>
            A licence can expose an interface. It cannot decide which source is approved, fix
            contradictory instructions, assign an owner, test who can see what, train the team, or
            handle the Monday-morning failure.
          </p>
        </div>
        <div
          style={{
            border: "var(--border-ordinary) solid var(--steel)",
            padding: "var(--space-6)",
            display: "grid",
            gap: "var(--space-4)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--type-label-sm)",
              letterSpacing: "var(--track-label-wide)",
              textTransform: "uppercase",
              color: "var(--steel-2)",
            }}
          >
            What you are actually buying
          </span>
          <div onClick={() => setOpen(!open)} style={{ cursor: "pointer" }}>
            <Redaction size="lg" tone="bone" covered="THE AI" revealed="THE OPERATION" open={open} />
          </div>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: "8px" }}>
            {["Approved sources", "Tested permissions", "Named owners", "Evaluated answer classes", "Trained users", "A designed failure path"].map((t, i) => (
              <li
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "28px 1fr",
                  gap: "8px",
                  fontSize: "var(--type-body-sm)",
                  color: open ? "var(--bone)" : "var(--ink-3)",
                  transition: `color var(--dur-base) var(--ease-mech) ${i * 60}ms`,
                }}
              >
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--type-label-sm)", color: "var(--blueprint)" }}>
                  [{String(i + 1).padStart(2, "0")}]
                </span>
                {t}
              </li>
            ))}
          </ul>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--type-label-sm)", letterSpacing: "var(--track-label)", color: "var(--signal-orange)" }}>
            {open ? "◼ Redaction retracted" : "▶ Retract the redaction"}
          </span>
        </div>
      </div>
    </Band>
  );
}

Object.assign(window, { Band, Folio, Hero, ProblemBand, ContrarianBand });
