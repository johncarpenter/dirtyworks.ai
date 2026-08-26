const { ProofLabel, PullQuote, Wordmark, AnnotatedComparison, WorkOrder, CaseMetric, Button } = window.DirtyworksAiDesignSystem_9135ac;

/* 1280×720 slide frame. Folio and evidence margin instead of a repeated title template. */
function Slide({ children, tone = "bone", folio, chapter, mark, wordmark = false, style }) {
  const dark = tone === "ink";
  return (
    <div
      className={dark ? "dw-dark" : undefined}
      style={{
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
        ...style,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24 }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: dark ? "var(--steel-2)" : "var(--steel)",
          }}
        >
          {chapter}
        </span>
        {mark ? mark : null}
      </div>
      <div style={{ minHeight: 0, alignSelf: "center" }}>{children}</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24 }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: dark ? "var(--steel)" : "var(--steel-2)" }}>
          {folio}
        </span>
        {wordmark ? <Wordmark size={15} tone={dark ? "bone" : "ink"} /> : <span />}
      </div>
    </div>
  );
}

/* 01 — Cover / interruption */
function CoverSlide() {
  return (
    <Slide tone="bone" chapter="Dirtyworks.ai / Managed knowledge + AI operations" folio="01 / Cover" wordmark
      mark={<ProofLabel status="neutral" size="sm">Founder deck · v0.1</ProofLabel>}>
      <div>
        <h1 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 128, lineHeight: 0.82, letterSpacing: "-0.04em", textTransform: "uppercase" }}>
          Your company
          <br />
          knows more than
          <br />
          it can <span style={{ color: "var(--signal-orange)" }}>find</span>.
        </h1>
        <div style={{ height: 6, background: "var(--ink)", margin: "34px 0 18px", width: "62%" }} />
        <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: 15, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--steel)" }}>
          Managed knowledge and AI operations for Alberta businesses
        </p>
      </div>
    </Slide>
  );
}

/* 02 — Declaration */
function DeclarationSlide() {
  return (
    <Slide tone="ink" chapter="04 / Contrarian point" folio="Declaration archetype" wordmark
      mark={<ProofLabel status="gap" size="sm">Claim</ProofLabel>}>
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 56, alignItems: "end" }}>
        <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 152, lineHeight: 0.82, letterSpacing: "-0.045em", textTransform: "uppercase" }}>
          AI was the easy part.
        </h2>
        <p style={{ margin: 0, fontSize: 22, lineHeight: 1.5, color: "var(--steel-2)" }}>
          A licence can expose an interface. It cannot decide which source is approved, assign an
          owner, or handle the Monday-morning failure.
        </p>
      </div>
    </Slide>
  );
}

/* 03 — Event path */
function EventPathSlide() {
  const steps = [
    ["Searches the intranet", "4 min", "gap"],
    ["Opens two conflicting docs", "6 min", "gap"],
    ["Messages a colleague", "waiting", "human"],
    ["Colleague forwards a 2024 file", "1 day", "gap"],
    ["Asks the practice lead", "resolved", "answer"],
  ];
  return (
    <Slide tone="bone" chapter="02 / The event" folio="Event path archetype" wordmark
      mark={<ProofLabel status="neutral" size="sm">Illustrative</ProofLabel>}>
      <div>
        <h2 style={{ margin: "0 0 40px", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 62, lineHeight: 0.92, letterSpacing: "-0.03em", textTransform: "uppercase" }}>
          The answer exists. The work still waits.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 0, borderTop: "1.5px solid var(--ink)" }}>
          {steps.map(([t, d, s], i) => (
            <div key={i} style={{ padding: "18px 18px 18px 0", borderRight: i < 4 ? "1.5px solid var(--rule)" : "none", position: "relative" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.14em", color: "var(--blueprint)" }}>
                [{String(i + 1).padStart(2, "0")}]
              </span>
              <p style={{ margin: "10px 0 14px", fontSize: 18, fontWeight: 600, lineHeight: 1.3 }}>{t}</p>
              <ProofLabel status={s} size="sm">{d}</ProofLabel>
            </div>
          ))}
        </div>
        <p style={{ margin: "34px 0 0", fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 34, lineHeight: 1.1, color: "var(--signal-orange)", transform: "rotate(-0.8deg)" }}>
          Elapsed: one day. The document never changed.
        </p>
      </div>
    </Slide>
  );
}

/* 04 — Mechanism diagram */
function MechanismSlide() {
  const nodes = [
    ["Approved sources", "source", "Named owner per source"],
    ["Permission gate", "permission", "Tested per release"],
    ["Reliable answers", "answer", "Evidence attached"],
    ["Visible gaps", "gap", "Routed to the owner"],
    ["Managed improvement", "operated", "Evidence-qualified"],
  ];
  return (
    <Slide tone="sheet" chapter="05 / The mechanism" folio="Mechanism archetype" wordmark>
      <div>
        <h2 style={{ margin: "0 0 44px", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 48, lineHeight: 0.96, letterSpacing: "-0.025em", textTransform: "uppercase" }}>
          Approved sources → reliable answers → visible gaps → managed improvement
        </h2>
        <div style={{ display: "flex", alignItems: "stretch", gap: 0 }}>
          {nodes.map(([n, s, sub], i) => (
            <React.Fragment key={n}>
              <div style={{ flex: 1, border: "1.5px solid var(--ink)", background: s === "answer" ? "var(--verified-acid)" : "var(--bone-3)", padding: 16, display: "grid", gap: 10, alignContent: "start" }}>
                <ProofLabel status={s} size="sm">{String(i + 1).padStart(2, "0")}</ProofLabel>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, lineHeight: 1.05, textTransform: "uppercase", letterSpacing: "-0.01em" }}>{n}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--steel)", lineHeight: 1.5 }}>{sub}</span>
              </div>
              {i < nodes.length - 1 ? (
                <div style={{ width: 34, display: "grid", placeItems: "center", color: "var(--blueprint)", fontFamily: "var(--font-mono)", fontSize: 18 }}>→</div>
              ) : null}
            </React.Fragment>
          ))}
        </div>
        <div style={{ display: "flex", gap: 32, marginTop: 26, alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 44, height: 1.5, background: "var(--signal-orange)" }} />
            <ProofLabel status="human">Human decision point</ProofLabel>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 44, height: 1.5, background: "var(--blueprint)" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--blueprint)" }}>
              Improvement loop returns to sources
            </span>
          </div>
        </div>
      </div>
    </Slide>
  );
}

/* 05 — Comparison */
function ComparisonSlide() {
  return (
    <Slide tone="bone" chapter="07 / Managed launch and operations" folio="Comparison archetype" wordmark>
      <div style={{ display: "grid", gridTemplateColumns: "0.8fr 1.4fr", gap: 56, alignItems: "start" }}>
        <div>
          <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 62, lineHeight: 0.86, letterSpacing: "-0.035em", textTransform: "uppercase" }}>
            Somebody owns Monday morning.
          </h2>
        </div>
        <AnnotatedComparison
          leftTitle="A tool"
          rightTitle="An operated capability"
          rows={[
            { left: "Connected", right: "Sources approved and owned" },
            { left: "Answers", right: "Answer classes evaluated" },
            { left: "User access", right: "Permissions tested" },
            { left: "Usage count", right: "Quality, gaps, risk and value reviewed" },
            { left: "Cancel button", right: "Portable offboarding package", decisive: true },
          ]}
        />
      </div>
    </Slide>
  );
}

/* 06 — Work order */
function WorkOrderSlide() {
  return (
    <Slide tone="bone" chapter="06 / The first offer" folio="Work order archetype" wordmark
      mark={<ProofLabel status="neutral" size="sm">Paid fixed scope</ProofLabel>}>
      <div style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 56, alignItems: "start" }}>
        <div>
          <h2 style={{ margin: "0 0 26px", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 54, lineHeight: 0.9, letterSpacing: "-0.03em", textTransform: "uppercase" }}>
            Start with one question domain.
          </h2>
          <WorkOrder
            loopLabel="Improvement returns to review"
            steps={[
              { name: "Review", duration: "7–10 days", detail: "One domain, up to three sources, 15–30 real evaluation questions.", marks: [{ label: "SOURCE", value: "≤3", status: "source" }] },
              { name: "Launch", duration: "Reference scope", detail: "Customer-owned platform, permission tests, bounded user group.", marks: [{ label: "USERS", value: "≤40", status: "neutral" }] },
              { name: "Operate", duration: "Monthly", detail: "Quality, freshness, support, cost, incidents and change.", marks: [{ label: "STATUS", value: "OPERATED", status: "operated" }] },
            ]}
          />
        </div>
        <div style={{ border: "3px solid var(--ink)", padding: 24, display: "grid", gap: 14, background: "var(--bone-3)", marginTop: 70 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--steel)" }}>
            Valid conclusions
          </span>
          {["Launch", "Repair first", "Capture knowledge", "Use a simpler tool", "Stop"].map((c, i) => (
            <div key={c} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--rule)", paddingBottom: 7, fontSize: 16, fontWeight: 600 }}>
              <span>{c}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--steel)" }}>0{i + 1}</span>
            </div>
          ))}
          <p style={{ margin: 0, fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 24, lineHeight: 1.1 }}>
            All five are successful outcomes.
          </p>
        </div>
      </div>
    </Slide>
  );
}

/* 07 — Quote */
function QuoteSlide() {
  return (
    <Slide tone="ink" chapter="03 / The hidden system" folio="Quote archetype" wordmark
      mark={<ProofLabel status="human" size="sm">Illustrative</ProofLabel>}>
      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: 64, alignItems: "center" }}>
        <PullQuote size="lg" tone="bone" attribution="Practice lead, professional services firm" context="Illustrative">
          I am the search engine. It is not in my job description.
        </PullQuote>
        <div style={{ display: "grid", gap: 14, borderLeft: "1.5px solid var(--steel)", paddingLeft: 24 }}>
          {[["Interruptions / week", "11"], ["Onboarding to independence", "14 weeks"], ["People who can answer", "5"]].map(([k, v]) => (
            <div key={k}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 44, lineHeight: 0.9, letterSpacing: "-0.03em" }}>{v}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--steel-2)", marginTop: 4 }}>{k}</div>
            </div>
          ))}
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--signal-orange)", marginTop: 6 }}>
            Hypothesis — not measured
          </span>
        </div>
      </div>
    </Slide>
  );
}

/* 08 — Decision */
function DecisionSlide() {
  return (
    <Slide tone="orange" chapter="15 / Decision" folio="Decision archetype" wordmark>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
        <div>
          <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 88, lineHeight: 0.84, letterSpacing: "-0.04em", textTransform: "uppercase", color: "var(--ink)" }}>
            The decision we are asking for.
          </h2>
          <p style={{ margin: "26px 0 0", fontSize: 21, lineHeight: 1.45, color: "var(--ink)", maxWidth: "40ch" }}>
            Not “questions?”. One named commitment, with a date and an owner.
          </p>
        </div>
        <div style={{ display: "grid", gap: 0, border: "1.5px solid var(--ink)", background: "var(--bone)" }}>
          {[["Option A", "Fund tranche 1 — $5K, three paid reviews", "Recommended"],
            ["Option B", "One MSP design pilot before capital", ""],
            ["Option C", "Defer until two launches are live", ""]].map(([k, v, rec], i) => (
            <div key={k} style={{ display: "grid", gridTemplateColumns: "110px 1fr auto", gap: 18, alignItems: "center", padding: "18px 20px", borderBottom: i < 2 ? "1px solid var(--rule)" : "none", background: rec ? "var(--verified-acid)" : "transparent" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--steel)" }}>{k}</span>
              <span style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.3 }}>{v}</span>
              {rec ? <ProofLabel status="answer" size="sm">{rec}</ProofLabel> : <span />}
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

Object.assign(window, { Slide, CoverSlide, DeclarationSlide, EventPathSlide, MechanismSlide, ComparisonSlide, WorkOrderSlide, QuoteSlide, DecisionSlide });
