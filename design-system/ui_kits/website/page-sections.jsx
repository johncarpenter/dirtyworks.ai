const { WorkOrder, AnnotatedComparison, ControlRegister, FitField, PullQuote, ProofLabel, CaseMetric, Button, CTABand, DiagnosticForm, ArticleRow, Declaration } = window.DirtyworksAiDesignSystem_9135ac;

/* 04 — Method: annotated vertical work order */
function MethodBand() {
  return (
    <Band tone="bone" id="method-anchor">
      <Folio>04 / Review · Launch · Operate · Improve</Folio>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.4fr) minmax(260px,0.85fr)", gap: "var(--space-8)", alignItems: "start" }}>
        <WorkOrder
          steps={[
            {
              name: "Review",
              duration: "7–10 days",
              detail: "One question domain, real events, sources, owners, permissions, risk, and a measured baseline.",
              annotation: "A valid conclusion here is “stop”.",
              marks: [{ label: "SOURCE", value: "≤3", status: "source" }, { label: "PAID", value: "FIXED SCOPE", status: "neutral" }],
            },
            {
              name: "Launch",
              duration: "Reference scope",
              detail: "Configure the customer-owned platform, evaluate real questions, test access, train a bounded group.",
              marks: [{ label: "PERMISSION", value: "TESTED", status: "permission" }, { label: "USERS", value: "≤40", status: "neutral" }],
            },
            {
              name: "Operate",
              duration: "Monthly",
              detail: "Monitor quality, freshness, support, use, cost, incidents, and change.",
              annotation: "Somebody owns Monday morning.",
              marks: [{ label: "CHANGE", value: "LOGGED", status: "change" }],
            },
            {
              name: "Improve",
              detail: "Repair knowledge, structure data, assist work — or automate only when the evidence supports it.",
              marks: [{ label: "STATUS", value: "OPERATED", status: "operated" }],
            },
          ]}
        />
        <aside
          style={{
            border: "var(--border-ordinary) solid var(--ink)",
            background: "var(--bone-3)",
            padding: "var(--space-5)",
            display: "grid",
            gap: "var(--space-4)",
            boxShadow: "var(--shadow-hard-sm)",
          }}
        >
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--type-label-sm)", letterSpacing: "var(--track-label-wide)", textTransform: "uppercase", color: "var(--steel)" }}>
            Review conclusions
          </span>
          {["Launch", "Repair first", "Capture knowledge", "Use a simpler tool", "Stop"].map((c, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "var(--border-hair) solid var(--rule)", paddingBottom: "8px" }}>
              <span style={{ fontSize: "var(--type-body-sm)", fontWeight: 600 }}>{c}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--type-label-sm)", color: "var(--steel)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
          <p style={{ margin: 0, fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "22px", lineHeight: 1.15, color: "var(--ink)" }}>
            All five are successful outcomes.
          </p>
        </aside>
      </div>
    </Band>
  );
}

/* 05 — What managed means */
function ManagedBand() {
  return (
    <Band tone="sheet">
      <Folio>05 / What managed means</Folio>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,0.85fr) minmax(0,1.3fr)", gap: "var(--space-8)", alignItems: "start" }}>
        <div>
          <h2
            style={{
              margin: 0,
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(34px, 4vw, 72px)",
              lineHeight: 0.88,
              letterSpacing: "-0.035em",
              textTransform: "uppercase",
            }}
          >
            Somebody owns Monday morning.
          </h2>
          <p style={{ margin: "var(--space-5) 0 0", fontSize: "var(--type-body)", lineHeight: 1.55, maxWidth: "44ch" }}>
            A system that works on launch day is a project. A system that keeps working is an
            operation.
          </p>
        </div>
        <AnnotatedComparison
          leftTitle="A tool"
          rightTitle="An operated capability"
          rows={[
            { left: "Connected", right: "Sources approved and owned" },
            { left: "Answers", right: "Answer classes evaluated" },
            { left: "User access", right: "Permissions tested" },
            { left: "Training link", right: "Role-specific rollout and support" },
            { left: "Usage count", right: "Quality, gaps, risk and value reviewed" },
            { left: "Vendor update", right: "Change assessed and regression tested" },
            { left: "Cancel button", right: "Portable offboarding package", decisive: true },
          ]}
        />
      </div>
    </Band>
  );
}

/* 06 — Trust */
function TrustBand() {
  return (
    <Band tone="bone">
      <Folio>06 / Trust</Folio>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,0.8fr) minmax(0,1.5fr)", gap: "var(--space-8)", alignItems: "start" }}>
        <div style={{ display: "grid", gap: "var(--space-5)" }}>
          <PullQuote size="md">“I don’t know” is a feature.</PullQuote>
          <p style={{ margin: 0, fontSize: "var(--type-body-sm)", lineHeight: 1.55, maxWidth: "40ch", color: "var(--steel)" }}>
            If the source is missing, the system should say so. We publish the limitations before the
            credentials.
          </p>
          <Button variant="evidence" size="md">
            Read the trust model
          </Button>
        </div>
        <ControlRegister
          caption="Control register / public extract"
          rows={[
            { control: "Customer ownership", mechanism: "Technology and data sit in the customer tenant by default; we operate inside it.", holder: "Customer", state: "Default", status: "operated" },
            { control: "Approved sources", mechanism: "A bounded, named source list with an accountable owner per source.", holder: "Customer + DW", state: "Named", status: "source" },
            { control: "Least privilege", mechanism: "Permission groups mirrored from the source system and tested per release.", holder: "Dirtyworks.ai", state: "Tested", status: "permission" },
            { control: "Honest abstention", mechanism: "Unsupported and contradictory questions follow an agreed failure path.", holder: "Dirtyworks.ai", state: "Designed", status: "answer" },
            { control: "Human accountability", mechanism: "Consequential decisions stay with the accountable person. No autopilot.", holder: "Customer", state: "Required", status: "human" },
            { control: "Incidents", mechanism: "Time-stamped disclosure, connector disablement, and written follow-up.", holder: "Dirtyworks.ai", state: "Documented", status: "change" },
            { control: "Portability", mechanism: "Offboarding package: sources, configuration, evaluation set, records.", holder: "Customer", state: "Contracted", status: "operated" },
          ]}
          note="This register describes controls. It is not a claim of perfect answers, complete security, or regulatory compliance."
        />
      </div>
    </Band>
  );
}

/* 07 — Fit */
function FitBand() {
  return (
    <Band tone="ink">
      <Folio tone="bone">07 / Fit</Folio>
      <h2
        style={{
          margin: "0 0 var(--space-8)",
          fontFamily: "var(--font-display)",
          fontWeight: 900,
          fontSize: "clamp(34px, 4.4vw, 78px)",
          lineHeight: 0.9,
          letterSpacing: "-0.035em",
          textTransform: "uppercase",
        }}
      >
        Start where the answer matters.
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-8)" }}>
        <FitField
          label="Fit / 01"
          segment="Professional services"
          summary="Approved firm methods, templates, software procedures, engagement administration, and onboarding."
          included={["Firm methods and templates", "Software procedures", "Engagement administration", "New-staff onboarding"]}
          excluded={["Client records", "Professional judgement", "Employment decisions"]}
        />
        <FitField
          label="Fit / 02"
          segment="Energy services"
          summary="Commercial and project administration, client requirements, internal systems, and project closeout."
          included={["Commercial and project admin", "Client requirements", "Internal systems", "Project closeout"]}
          excluded={["Safety decisions", "Engineering judgement", "Field control", "Regulatory determinations"]}
        />
      </div>
    </Band>
  );
}

/* 08 — Offer */
function OfferBand() {
  return (
    <Band tone="sheet">
      <Folio>08 / The first offer</Folio>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.1fr) minmax(0,1fr)", gap: "var(--space-8)", alignItems: "start" }}>
        <div>
          <h2
            style={{
              margin: 0,
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(34px, 4.2vw, 76px)",
              lineHeight: 0.88,
              letterSpacing: "-0.035em",
              textTransform: "uppercase",
            }}
          >
            One domain.
            <br />
            One decision.
            <br />
            Then build.
          </h2>
          <p style={{ margin: "var(--space-6) 0 0", fontSize: "var(--type-body)", lineHeight: 1.55, maxWidth: "54ch", textWrap: "pretty" }}>
            The Knowledge Reliability Review is a paid 7–10 business-day assessment of one question
            domain and up to three candidate sources. It maps value, ownership, permissions, source
            quality, risk, real evaluation questions, and a recommended next move.
          </p>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "var(--space-5)" }}>
            {["Launch", "Repair first", "Capture knowledge", "Use a simpler tool", "Stop"].map((c) => (
              <ProofLabel key={c} status={c === "Stop" ? "gap" : "neutral"} size="sm">
                {c}
              </ProofLabel>
            ))}
          </div>
        </div>
        <div
          style={{
            border: "var(--border-emphasis) solid var(--ink)",
            background: "var(--bone-3)",
            padding: "var(--space-6)",
            display: "grid",
            gap: "var(--space-4)",
            marginTop: "var(--offset-hard)",
          }}
        >
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--type-label-sm)", letterSpacing: "var(--track-label-wide)", textTransform: "uppercase", color: "var(--steel)" }}>
            Knowledge Reliability Review
          </span>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(40px,4vw,64px)", lineHeight: 0.9, letterSpacing: "-0.04em" }}>
            Paid fixed-scope review
          </div>
          <dl style={{ margin: 0, display: "grid", gap: "10px", fontFamily: "var(--font-mono)", fontSize: "var(--type-label-sm)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
            {[
              ["Duration", "7–10 business days"],
              ["Question domains", "One"],
              ["Candidate sources", "Up to three"],
              ["Sampled items", "Up to 25, with permission"],
              ["Evaluation questions", "15–30 real questions"],
              ["Output", "Written Knowledge Reliability Map"],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: "12px", borderBottom: "var(--border-hair) solid var(--rule)", paddingBottom: "6px" }}>
                <dt style={{ color: "var(--steel)" }}>{k}</dt>
                <dd style={{ margin: 0, fontWeight: 600, textAlign: "right" }}>{v}</dd>
              </div>
            ))}
          </dl>
          <Button fullWidth>Book a Knowledge Reliability Review</Button>
        </div>
      </div>
    </Band>
  );
}

/* 09 — MSP lane */
function MspBand({ onNavigate }) {
  return (
    <Band tone="bone">
      <Folio>09 / MSP partner lane</Folio>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "var(--space-8)", alignItems: "center" }}>
        <div>
          <h2
            style={{
              margin: 0,
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(32px, 3.8vw, 68px)",
              lineHeight: 0.9,
              letterSpacing: "-0.035em",
              textTransform: "uppercase",
            }}
          >
            Keep the account. Add the practice.
          </h2>
          <p style={{ margin: "var(--space-5) 0 var(--space-6)", fontSize: "var(--type-body)", lineHeight: 1.55, maxWidth: "52ch", textWrap: "pretty" }}>
            Referral, co-managed, and white-label structures are available when sales, customer
            access, support, data roles, margin, and liability are explicit.
          </p>
          <Button variant="secondary" onClick={() => onNavigate?.("msps")}>
            Design a partner pilot
          </Button>
        </div>
        <div style={{ display: "grid", gap: "var(--space-4)" }}>
          {[
            ["MSP owns", "Infrastructure, security, and the account relationship as agreed."],
            ["Dirtyworks.ai owns", "Knowledge method, answer quality, and ongoing operations."],
            ["Customer owns", "Sources, approvals, and consequential decisions."],
          ].map(([k, v], i) => (
            <div key={k} style={{ borderTop: "var(--border-ordinary) solid var(--ink)", paddingTop: "10px", marginLeft: i === 1 ? "var(--offset-hard)" : 0 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--type-label)", fontWeight: 600, letterSpacing: "var(--track-label)", textTransform: "uppercase", color: i === 1 ? "var(--signal-orange)" : "var(--ink)" }}>
                {k}
              </div>
              <div style={{ fontSize: "var(--type-body-sm)", lineHeight: 1.45, marginTop: "6px", maxWidth: "40ch" }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </Band>
  );
}

/* 10 — Manifesto */
function ManifestoBand() {
  return (
    <Band tone="ink" style={{ borderTop: "var(--border-editorial) solid var(--verified-acid)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "var(--space-8)", alignItems: "center" }}>
        <h2
          style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(44px, 6.4vw, 116px)",
            lineHeight: 0.84,
            letterSpacing: "-0.04em",
            textTransform: "uppercase",
          }}
        >
          No theatre.
          <br />
          No mystery.
          <br />
          <span style={{ color: "var(--verified-acid)" }}>Work that works.</span>
        </h2>
        <div style={{ display: "grid", gap: "var(--space-5)" }}>
          <p style={{ margin: 0, fontSize: "var(--type-body)", lineHeight: 1.6, color: "var(--steel-2)", maxWidth: "50ch", textWrap: "pretty" }}>
            Company information is scattered, duplicated, outdated, overexposed, under-owned, and
            carried around in people’s heads. Turning that into a useful answer takes more than a
            model and a search box. It takes source decisions. Permission work. Evaluation. Training.
            Support. Repair. Judgment.
          </p>
          <p style={{ margin: 0, fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(28px,3vw,46px)", lineHeight: 1.08, color: "var(--bone)" }}>
            That is the dirty work.
          </p>
        </div>
      </div>
    </Band>
  );
}

/* 11 — Conversion */
function ConversionBand() {
  return (
    <Band tone="sheet">
      <Folio>11 / Conversion</Folio>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,0.9fr) minmax(0,1.2fr)", gap: "var(--space-8)", alignItems: "start" }}>
        <h2
          style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(32px, 3.8vw, 68px)",
            lineHeight: 0.88,
            letterSpacing: "-0.035em",
            textTransform: "uppercase",
          }}
        >
          Show us the last answer your team had to chase.
        </h2>
        <DiagnosticForm note="Do not include customer documents, client names, or personal information in this form. One event is enough to start." />
      </div>
    </Band>
  );
}

/* NOTES index */
function NotesBand() {
  return (
    <Band tone="bone">
      <Folio>Notes / 01</Folio>
      <div>
        {[
          ["RAG is becoming a feature. Knowledge ownership is still work.", "Retrieval is commoditising. The source decisions behind it are not.", "Point of view", "2026-08-25", "6 min"],
          ["“Ask Sarah” is your most expensive undocumented system.", "Key-person dependence has a cost line; it just isn’t on the invoice.", "Point of view", "2026-08-18", "5 min"],
          ["Permission is part of the answer.", "An answer the reader should not have seen is a failure, not a hit.", "Method", "2026-08-11", "4 min"],
          ["Before you automate the repeated question, find out why it repeats.", "Repetition is a symptom. Automating it can preserve the cause.", "Method", "2026-08-04", "7 min"],
          ["A managed AI service needs a failure path.", "Designed failure is the difference between an operation and a demo.", "Method", "2026-07-28", "5 min"],
          ["What an MSP owns — and what a knowledge operator should.", "The responsibility seam, written down before the first launch.", "Partner", "2026-07-21", "6 min"],
        ].map((n, i) => (
          <ArticleRow key={i} index={i + 1} title={n[0]} thesis={n[1]} evidence={n[2]} date={n[3]} readingTime={n[4]} />
        ))}
      </div>
    </Band>
  );
}

Object.assign(window, { MethodBand, ManagedBand, TrustBand, FitBand, OfferBand, MspBand, ManifestoBand, ConversionBand, NotesBand });
