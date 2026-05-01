import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visible Edge — CMMC Lead Operations Brief",
  description:
    "An automated daily lead engine that compounds against a hard November deadline.",
};

export default function BriefPage() {
  return (
    <div className="page">
      {/* DOC META */}
      <div className="doc-meta">
        <span><span className="label">DOC</span> <span className="val">OPS_BRIEF_001</span></span>
        <span><span className="label">DATE</span> <span className="val">APR 30 2026</span></span>
        <span><span className="label">STATUS</span> <span className="live">READY</span></span>
      </div>

      {/* TITLE BLOCK */}
      <div className="title-block">
        <div className="title-eyebrow">OPERATIONAL BRIEF / ONE PAGE</div>
        <h1 className="brief-title">
          A daily lead engine that <em>compounds</em>
          <br />
          against a hard November deadline.
        </h1>
        <p className="title-sub">
          An automated pipeline that turns 80,000 unprepared DoD contractors into a
          prioritized, dossier-attached daily call queue — refreshed every morning,
          sharpened every night, designed to push call-to-meeting conversion from
          baseline 1% to 4%+ before the Phase 2 enforcement window closes.
        </p>
      </div>

      {/* MARKET STRIP */}
      <div className="strip">
        <div className="strip-cell">
          <div className="strip-label">Total Universe</div>
          <div className="strip-val tab"><span className="accent">~80K</span></div>
          <div className="strip-sub">Sub-100 EMP DoD contractors</div>
        </div>
        <div className="strip-cell">
          <div className="strip-label">Currently Compliant</div>
          <div className="strip-val tab">~1%</div>
          <div className="strip-sub">~800 of ~80K · Redspin &apos;26</div>
        </div>
        <div className="strip-cell">
          <div className="strip-label">Phase 2 Deadline</div>
          <div className="strip-val tab"><span className="accent">NOV 10</span></div>
          <div className="strip-sub">194 days from today</div>
        </div>
        <div className="strip-cell">
          <div className="strip-label">Daily Throughput Target</div>
          <div className="strip-val tab">100–200</div>
          <div className="strip-sub">enriched leads / day</div>
        </div>
      </div>

      {/* SECTION 01 — SYSTEM ARCHITECTURE */}
      <section className="brief-section">
        <div className="section-h">
          <span className="num">/ 01</span>
          <span className="title-h">SYSTEM ARCHITECTURE</span>
          <span className="line" />
        </div>

        <div className="pipeline">
          <div className="stage">
            <div className="stage-num">STAGE A</div>
            <div className="stage-name">UNIVERSE BUILDER</div>
            <div className="stage-desc">
              Pulls federal data nightly. Filters by NAICS, employee count, DoD
              obligation history. Builds the qualified target pool.
            </div>
            <div className="stage-tools">
              <span className="tool-tag dim">SAM.gov</span>
              <span className="tool-tag dim">USAspending</span>
              <span className="tool-tag dim">SBA</span>
            </div>
          </div>
          <div className="stage">
            <div className="stage-num">STAGE B</div>
            <div className="stage-name">ENRICHMENT</div>
            <div className="stage-desc">
              Resolves 2–4 verified decision-makers per target. Email + phone +
              LinkedIn. Authority scoring.
            </div>
            <div className="stage-tools">
              <span className="tool-tag blue">Apollo</span>
              <span className="tool-tag blue">Clay</span>
              <span className="tool-tag blue">Seamless</span>
              <span className="tool-tag blue">Hunter</span>
            </div>
          </div>
          <div className="stage">
            <div className="stage-num">STAGE C</div>
            <div className="stage-name">DOSSIER ENGINE</div>
            <div className="stage-desc">
              Cloud orchestrator routes work to the right model: Haiku for parsing
              &amp; classification, Gemini for long-context summarization, Sonnet
              for opener &amp; talk track.
            </div>
            <div className="stage-tools">
              <span className="tool-tag">Haiku 4.5</span>
              <span className="tool-tag">Sonnet 4.7</span>
              <span className="tool-tag">Gemini Flash</span>
            </div>
          </div>
          <div className="stage">
            <div className="stage-num">STAGE D</div>
            <div className="stage-name">SALES SURFACE</div>
            <div className="stage-desc">
              Daily prioritized queue. Dossier viewer. One-tap outcome capture.
              Mobile-ready. Built on the rep&apos;s existing day.
            </div>
            <div className="stage-tools">
              <span className="tool-tag green">Next.js</span>
              <span className="tool-tag green">NeonDB</span>
            </div>
          </div>
          <div className="stage">
            <div className="stage-num">STAGE E</div>
            <div className="stage-name">FEEDBACK LOOP</div>
            <div className="stage-desc">
              Today&apos;s call outcomes train tomorrow&apos;s queue. Heuristic week 1,
              regression week 4, XGBoost from week 12.
            </div>
            <div className="stage-tools">
              <span className="tool-tag">XGBoost</span>
              <span className="tool-tag">Python</span>
            </div>
          </div>
        </div>

        <div className="loop-back">
          <div className="loop-icon">↺</div>
          <div className="loop-text">
            <strong>Closed feedback loop.</strong> Every disposition logged today
            (no-answer, voicemail, interested, booked, closed, lost) becomes a
            training signal tonight. Tomorrow&apos;s queue is reordered by predicted
            P(booked) and P(closed). Iteration cycle: <strong>24 hours.</strong>{" "}
            The longer it runs, the better it gets — without manual tuning.
          </div>
        </div>
      </section>

      {/* SECTION 02 + 03 — DAILY OPERATING LOOP + TECHNOLOGY STACK */}
      <section className="brief-section">
        <div className="two-col">
          <div>
            <div className="section-h">
              <span className="num">/ 02</span>
              <span className="title-h">DAILY OPERATING LOOP</span>
              <span className="line" />
            </div>
            <div className="timeline">
              <div className="tl-row hi">
                <div className="tl-time">06:00</div>
                <div className="tl-event">
                  Universe delta refresh — new SAM/USAspending entries flagged
                </div>
              </div>
              <div className="tl-row">
                <div className="tl-time">06:15</div>
                <div className="tl-event">
                  Enrichment pipeline runs on tomorrow&apos;s 200-lead queue
                </div>
              </div>
              <div className="tl-row">
                <div className="tl-time">06:45</div>
                <div className="tl-event">
                  Cloud orchestrator routes work and generates dossiers via API waterfall
                </div>
              </div>
              <div className="tl-row hi">
                <div className="tl-time">07:00</div>
                <div className="tl-event">
                  Sales rep opens dashboard — queue is loaded, sorted, ready to dial
                </div>
              </div>
              <div className="tl-row">
                <div className="tl-time">08:00–17:00</div>
                <div className="tl-event">
                  Calls run. One-tap outcome logging. Booked meetings drop into pipeline view
                </div>
              </div>
              <div className="tl-row">
                <div className="tl-time">18:00</div>
                <div className="tl-event">
                  Outcome ETL job — disposition data normalized into training set
                </div>
              </div>
              <div className="tl-row">
                <div className="tl-time">23:00</div>
                <div className="tl-event">
                  Model refit on new data — feature weights updated
                </div>
              </div>
              <div className="tl-row hi">
                <div className="tl-time">00:00</div>
                <div className="tl-event">
                  Tomorrow&apos;s queue scored, prioritized, locked. Ready by 7 AM.
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="section-h">
              <span className="num">/ 03</span>
              <span className="title-h">TECHNOLOGY STACK</span>
              <span className="line" />
            </div>
            <div className="stack">
              <div className="stack-row head">
                <div>Layer</div>
                <div>Tool</div>
                <div>Function</div>
              </div>
              <div className="stack-row">
                <div className="stack-layer">DATA</div>
                <div className="stack-tool">SAM · USAspending</div>
                <div className="stack-purpose">Federal contractor universe</div>
              </div>
              <div className="stack-row">
                <div className="stack-layer">ENRICH</div>
                <div className="stack-tool">Apollo + Clay</div>
                <div className="stack-purpose">Decision-maker resolution</div>
              </div>
              <div className="stack-row">
                <div className="stack-layer">VERIFY</div>
                <div className="stack-tool">Hunter · Seamless</div>
                <div className="stack-purpose">Email &amp; phone validation</div>
              </div>
              <div className="stack-row">
                <div className="stack-layer">ORCHESTRATOR</div>
                <div className="stack-tool">Haiku 4.5</div>
                <div className="stack-purpose">Routing · parsing · classification</div>
              </div>
              <div className="stack-row">
                <div className="stack-layer">REASONING</div>
                <div className="stack-tool">Sonnet 4.7 · Gemini</div>
                <div className="stack-purpose">Dossier · opener · talk track</div>
              </div>
              <div className="stack-row">
                <div className="stack-layer">DATABASE</div>
                <div className="stack-tool">NeonDB · Postgres</div>
                <div className="stack-purpose">Targets · contacts · outcomes</div>
              </div>
              <div className="stack-row">
                <div className="stack-layer">FRONTEND</div>
                <div className="stack-tool">Next.js</div>
                <div className="stack-purpose">Sales surface · admin</div>
              </div>
              <div className="stack-row">
                <div className="stack-layer">ML</div>
                <div className="stack-tool">XGBoost · Python</div>
                <div className="stack-purpose">Priority scoring · forecasting</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 04 — BUILD PHASES */}
      <section className="brief-section">
        <div className="section-h">
          <span className="num">/ 04</span>
          <span className="title-h">BUILD PHASES</span>
          <span className="line" />
        </div>
        <div className="weeks">
          <div className="week">
            <div className="week-num">PHASE 01</div>
            <div className="week-title">Universe &amp; Enrichment</div>
            <div className="week-deliv">
              <strong>Deliverable</strong>
              500 fully-enriched leads in CRM with verified decision-makers. Sales
              rep starts calling immediately.
            </div>
          </div>
          <div className="week">
            <div className="week-num">PHASE 02</div>
            <div className="week-title">Dossier Engine</div>
            <div className="week-deliv">
              <strong>Deliverable</strong>
              Per-lead one-pagers with AI opener, talk track, contract context, and
              objection handlers.
            </div>
          </div>
          <div className="week">
            <div className="week-num">PHASE 03</div>
            <div className="week-title">Sales Surface</div>
            <div className="week-deliv">
              <strong>Deliverable</strong>
              Visible Edge dashboard live. Spreadsheets retired. One-tap outcome
              capture in production.
            </div>
          </div>
          <div className="week">
            <div className="week-num">PHASE 04</div>
            <div className="week-title">Feedback Loop</div>
            <div className="week-deliv">
              <strong>Deliverable</strong>
              Closed ML loop running. Today&apos;s call outcomes measurably reorder
              tomorrow&apos;s queue.
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 05 — UI PREVIEW */}
      <section className="brief-section">
        <div className="section-h">
          <span className="num">/ 05</span>
          <span className="title-h">SALES SURFACE — DAILY QUEUE PREVIEW</span>
          <span className="line" />
        </div>
        <div className="ui-preview">
          <div className="ui-frame">
            <div className="ui-h">
              <div className="l">TODAY&apos;S QUEUE — APR 30</div>
              <div className="r">10 leads · ML scored · 6 high-priority</div>
            </div>
            {[
              { n: "01", name: "Apex Precision Aerospace", meta: " · Wichita KS · 47 EMP · $2.8M DoD", badge: "RECOMPETE Q3", badgeColor: "amber", score: "94" },
              { n: "02", name: "Ironhall Tactical Systems", meta: " · Manchester NH · 31 EMP · $1.6M DoD", badge: "CUI EXPOSURE", badgeColor: "red", score: "91" },
              { n: "03", name: "Helix Engineering Group", meta: " · Huntsville AL · 88 EMP · $5.2M DoD", badge: "RECOMPETE Q4", badgeColor: "amber", score: "89" },
              { n: "04", name: "Stellar Composites Inc", meta: " · San Diego CA · 62 EMP · $1.9M DoD", badge: "CUI EXPOSURE", badgeColor: "red", score: "86" },
              { n: "05", name: "Cipher Defense IT", meta: " · Reston VA · 54 EMP · $3.1M DoD", badge: "IRONIC", badgeColor: "amber", score: "83" },
              { n: "06", name: "Coastal Maritime Defense", meta: " · Norfolk VA · 76 EMP · $4.2M DoD", badge: "PRIME", badgeColor: "amber", score: "81" },
              { n: "07", name: "Granite State Machining", meta: " · Concord NH · 28 EMP · $920K DoD", badge: "STEADY", badgeColor: "blue", score: "79" },
            ].map((row) => (
              <div className="ui-row" key={row.n}>
                <div className="n">{row.n}</div>
                <div>
                  <span className="name">{row.name}</span>
                  <span className="meta">{row.meta}</span>
                </div>
                <div>
                  <span className={`badge ${row.badgeColor}`}>{row.badge}</span>
                </div>
                <div className="meta">{row.score}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 06 — SUCCESS METRICS */}
      <section className="brief-section">
        <div className="section-h">
          <span className="num">/ 06</span>
          <span className="title-h">SUCCESS METRICS BY MILESTONE</span>
          <span className="line" />
        </div>
        <div className="metrics">
          <div className="metric">
            <div className="metric-h">PHASE 01 LIVE</div>
            <ul className="metric-list">
              <li>Qualified universe <span className="v">≥ 5,000</span></li>
              <li>Enriched leads delivered <span className="v">500</span></li>
              <li>Calls made by rep <span className="v">≥ 250</span></li>
              <li>Booked meeting rate <span className="v">≥ 1%</span></li>
            </ul>
          </div>
          <div className="metric">
            <div className="metric-h">FULL SYSTEM LIVE</div>
            <ul className="metric-list">
              <li>Daily throughput <span className="v">100–200</span></li>
              <li>Booked meeting rate <span className="v">≥ 2%</span></li>
              <li>First closes attributable <span className="v">≥ 1</span></li>
              <li>Loop iteration time <span className="v">24 hr</span></li>
            </ul>
          </div>
          <div className="metric">
            <div className="metric-h">STEADY STATE</div>
            <ul className="metric-list">
              <li>Booked meeting rate <span className="v">≥ 4%</span></li>
              <li>Close rate on bookings <span className="v">≥ 25%</span></li>
              <li>ML model AUC <span className="v">≥ 0.78</span></li>
              <li>Targets contacted <span className="v">~7,500</span></li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="brief-footer">
        <div>VISIBLE EDGE / OPS BRIEF 001</div>
        <div className="right">CONFIDENTIAL · INTERNAL DRAFT</div>
      </footer>
    </div>
  );
}
