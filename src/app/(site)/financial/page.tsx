import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visible Edge — Financial Plan",
  description:
    "Monthly operating budget, cost breakdown, and pipeline scenarios for the Visible Edge lead engine.",
};

export default function FinancialPage() {
  return (
    <div className="page">
      {/* DOC META */}
      <div className="doc-meta">
        <span><span className="label">DOC</span> <span className="val">FIN_PLAN_001</span></span>
        <span><span className="label">PAGE</span> <span className="val">02 / 02</span></span>
        <span><span className="label">STATUS</span> <span className="live">READY</span></span>
      </div>

      {/* TITLE BLOCK */}
      <div className="title-block">
        <div className="title-eyebrow">FINANCIAL PLAN / MONTHLY BUDGET</div>
        <h1 className="brief-title">
          What it costs to run.
          <br />
          What it produces in return.
        </h1>
        <p className="title-sub">
          Three operating tempos, each with a clear cost envelope and expected
          output. The system is designed to scale sub-linearly — doubling lead
          volume from 100 to 200 per day adds tooling cost of roughly 75%, not
          100%, because most platforms price by capacity tier, not consumption.
          Cost-per-lead drops as throughput rises.
        </p>
      </div>

      {/* KEY NUMBERS STRIP */}
      <div className="strip">
        <div className="strip-cell">
          <div className="strip-label">Full Ramp Monthly</div>
          <div className="strip-val tab"><span className="accent">$2,581</span></div>
          <div className="strip-sub">200 leads/day target</div>
        </div>
        <div className="strip-cell">
          <div className="strip-label">Cost Per Lead</div>
          <div className="strip-val tab">$0.43</div>
          <div className="strip-sub">All-in, full ramp</div>
        </div>
        <div className="strip-cell">
          <div className="strip-label">Monthly Authorization</div>
          <div className="strip-val tab">$3,000</div>
          <div className="strip-sub">Includes 16% buffer</div>
        </div>
        <div className="strip-cell">
          <div className="strip-label">Expected Pipeline Value</div>
          <div className="strip-val tab"><span className="accent">$600K</span></div>
          <div className="strip-sub">Monthly · Mid-case · 232x ROI</div>
        </div>
      </div>

      {/* SECTION 01 — OPERATING TEMPOS */}
      <section className="brief-section">
        <div className="section-h">
          <span className="num">/ 01</span>
          <span className="title-h">OPERATING TEMPOS</span>
          <span className="line" />
        </div>

        <div className="tempos">
          <div className="tempo">
            <div className="tempo-tag"><span className="dot" /> PHASE 01 · VALIDATION</div>
            <div className="tempo-name">Lean MVP</div>
            <div className="tempo-when">Month 01 · Ramp &amp; Prove</div>
            <div className="tempo-cost tab">$670</div>
            <div className="tempo-cost-sub">/ month</div>
            <div className="tempo-stats">
              <div className="tempo-stat"><span className="lbl">Daily lead throughput</span><span className="val">50</span></div>
              <div className="tempo-stat"><span className="lbl">Monthly enriched leads</span><span className="val">~1,500</span></div>
              <div className="tempo-stat"><span className="lbl">Expected booked meetings</span><span className="val">~15</span></div>
              <div className="tempo-stat"><span className="lbl">Cost per lead</span><span className="val">$0.45</span></div>
            </div>
          </div>

          <div className="tempo">
            <div className="tempo-tag"><span className="dot" /> PHASE 02 · SCALING</div>
            <div className="tempo-name">Steady State</div>
            <div className="tempo-when">Months 02–03 · Tune &amp; Grow</div>
            <div className="tempo-cost tab">$1,455</div>
            <div className="tempo-cost-sub">/ month</div>
            <div className="tempo-stats">
              <div className="tempo-stat"><span className="lbl">Daily lead throughput</span><span className="val">100</span></div>
              <div className="tempo-stat"><span className="lbl">Monthly enriched leads</span><span className="val">~3,000</span></div>
              <div className="tempo-stat"><span className="lbl">Expected booked meetings</span><span className="val">~75</span></div>
              <div className="tempo-stat"><span className="lbl">Cost per lead</span><span className="val">$0.49</span></div>
            </div>
          </div>

          <div className="tempo full">
            <div className="tempo-tag"><span className="dot" /> PHASE 03 · TARGET</div>
            <div className="tempo-name">Full Ramp</div>
            <div className="tempo-when">Month 04+ · Loop Optimized</div>
            <div className="tempo-cost tab">$2,581</div>
            <div className="tempo-cost-sub">/ month</div>
            <div className="tempo-stats">
              <div className="tempo-stat"><span className="lbl">Daily lead throughput</span><span className="val">200</span></div>
              <div className="tempo-stat"><span className="lbl">Monthly enriched leads</span><span className="val">~6,000</span></div>
              <div className="tempo-stat"><span className="lbl">Expected booked meetings</span><span className="val">~240</span></div>
              <div className="tempo-stat"><span className="lbl">Cost per lead</span><span className="val">$0.43</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 02 — COST BREAKDOWN */}
      <section className="brief-section">
        <div className="section-h">
          <span className="num">/ 02</span>
          <span className="title-h">COST BREAKDOWN — FULL RAMP</span>
          <span className="line" />
        </div>

        <div className="breakdown">
          <div className="bd-cat">
            <div className="bd-cat-label">Infrastructure</div>
            <div className="bd-cat-bar"><div className="bd-cat-bar-fill" style={{ width: "7%" }} /></div>
            <div className="bd-cat-total">$169</div>
          </div>
          <div className="bd-row">
            <div className="tool">NeonDB Scale</div>
            <div className="why">Targets, contacts, outcomes, ML training data</div>
            <div className="price">$69</div>
          </div>
          <div className="bd-row">
            <div className="tool">DigitalOcean</div>
            <div className="why">Orchestrator + cron jobs + ML refit jobs</div>
            <div className="price">$80</div>
          </div>
          <div className="bd-row">
            <div className="tool">Vercel Pro</div>
            <div className="why">Sales dashboard hosting</div>
            <div className="price">$20</div>
          </div>

          <div className="bd-cat">
            <div className="bd-cat-label">Data &amp; Enrichment</div>
            <div className="bd-cat-bar"><div className="bd-cat-bar-fill" style={{ width: "50%" }} /></div>
            <div className="bd-cat-total">$1,299</div>
          </div>
          <div className="bd-row">
            <div className="tool">Clay Pro</div>
            <div className="why">Decision-maker resolution waterfall · 50K credits</div>
            <div className="price">$800</div>
          </div>
          <div className="bd-row">
            <div className="tool">Seamless.ai Pro</div>
            <div className="why">Phone number waterfall</div>
            <div className="price">$300</div>
          </div>
          <div className="bd-row">
            <div className="tool">Hunter.io Business</div>
            <div className="why">Email verification · 10K/mo</div>
            <div className="price">$199</div>
          </div>

          <div className="bd-cat">
            <div className="bd-cat-label">AI Intelligence</div>
            <div className="bd-cat-bar"><div className="bd-cat-bar-fill" style={{ width: "21%" }} /></div>
            <div className="bd-cat-total">$550</div>
          </div>
          <div className="bd-row">
            <div className="tool">Claude Sonnet 4.7</div>
            <div className="why">Dossier opener, talk track, objection handlers</div>
            <div className="price">$300</div>
          </div>
          <div className="bd-row">
            <div className="tool">Claude Haiku 4.5</div>
            <div className="why">Orchestration · routing · parsing · classification</div>
            <div className="price">$150</div>
          </div>
          <div className="bd-row">
            <div className="tool">Gemini Flash</div>
            <div className="why">Long-context contract history summarization</div>
            <div className="price">$100</div>
          </div>

          <div className="bd-cat">
            <div className="bd-cat-label">Outbound Tooling</div>
            <div className="bd-cat-bar"><div className="bd-cat-bar-fill" style={{ width: "22%" }} /></div>
            <div className="bd-cat-total">$563</div>
          </div>
          <div className="bd-row">
            <div className="tool">PhoneBurner</div>
            <div className="why">Power dialer for the rep</div>
            <div className="price">$149</div>
          </div>
          <div className="bd-row">
            <div className="tool">Smartlead Custom</div>
            <div className="why">Email follow-up sequencing</div>
            <div className="price">$174</div>
          </div>
          <div className="bd-row">
            <div className="tool">Domain &amp; inbox warming</div>
            <div className="why">5 sending domains · 8 warmed inboxes</div>
            <div className="price">$240</div>
          </div>

          <div className="bd-total">
            <div className="bd-total-l">Total Monthly Operating Cost · Full Ramp</div>
            <div className="bd-total-r tab">$2,581</div>
          </div>
        </div>
      </section>

      {/* SECTION 03 — PIPELINE SCENARIOS */}
      <section className="brief-section">
        <div className="section-h">
          <span className="num">/ 03</span>
          <span className="title-h">PIPELINE SCENARIOS — THE MATH AT FULL RAMP</span>
          <span className="line" />
        </div>

        <div className="scenarios">
          <div className="scenario">
            <div className="scen-tag">CONSERVATIVE / FLOOR</div>
            <div className="scen-pipeline tab">$202K</div>
            <div className="scen-pipeline-sub">monthly pipeline · <strong>78x ROI</strong> on tooling</div>
            <div className="scen-math">
              <div className="scen-math-h">Math</div>
              <div className="m-line input"><span className="ml">6,000 leads</span><span className="mr">input</span></div>
              <div className="m-line"><span className="ml">× 1.5% booked rate</span><span className="mr">90 mtgs</span></div>
              <div className="m-line"><span className="ml">× 15% close rate</span><span className="mr">14 closes</span></div>
              <div className="m-line total"><span className="ml">× $15K avg contract</span><span className="mr">$202K</span></div>
            </div>
          </div>

          <div className="scenario hi">
            <div className="scen-tag">EXPECTED / MID</div>
            <div className="scen-pipeline tab">$600K</div>
            <div className="scen-pipeline-sub">monthly pipeline · <strong>232x ROI</strong> on tooling</div>
            <div className="scen-math">
              <div className="scen-math-h">Math</div>
              <div className="m-line input"><span className="ml">6,000 leads</span><span className="mr">input</span></div>
              <div className="m-line"><span className="ml">× 2.5% booked rate</span><span className="mr">150 mtgs</span></div>
              <div className="m-line"><span className="ml">× 20% close rate</span><span className="mr">30 closes</span></div>
              <div className="m-line total"><span className="ml">× $20K avg contract</span><span className="mr">$600K</span></div>
            </div>
          </div>

          <div className="scenario">
            <div className="scen-tag">OPTIMISTIC / TARGET</div>
            <div className="scen-pipeline tab">$1.5M</div>
            <div className="scen-pipeline-sub">monthly pipeline · <strong>581x ROI</strong> on tooling</div>
            <div className="scen-math">
              <div className="scen-math-h">Math</div>
              <div className="m-line input"><span className="ml">6,000 leads</span><span className="mr">input</span></div>
              <div className="m-line"><span className="ml">× 4% booked rate</span><span className="mr">240 mtgs</span></div>
              <div className="m-line"><span className="ml">× 25% close rate</span><span className="mr">60 closes</span></div>
              <div className="m-line total"><span className="ml">× $25K avg contract</span><span className="mr">$1.5M</span></div>
            </div>
          </div>
        </div>

        <div className="scen-note">
          <strong>The economics survive being meaningfully wrong.</strong> Even in
          the Conservative case — half the booked-meeting rate of best-in-class
          outbound, 60% of typical close rates on warm meetings, and a smaller
          average ticket dominated by L1 quick-wins — the system produces a 78x
          return on monthly tooling cost. The Expected case is the realistic
          working assumption: the ML feedback loop converges toward it over
          months 3–6 as the model learns from outcomes. Conservative is what
          month 1–2 looks like before the loop has trained.
        </div>
      </section>

      {/* SECTION 04 — BUDGET ENVELOPE & EXPECTATIONS */}
      <section className="brief-section">
        <div className="section-h">
          <span className="num">/ 04</span>
          <span className="title-h">BUDGET ENVELOPE &amp; EXPECTATIONS</span>
          <span className="line" />
        </div>

        <div className="guards">
          <div className="guard-block amber">
            <div className="guard-h">RECOMMENDED AUTHORIZATION</div>
            <ul className="guard-list">
              <li><strong>$3,000/mo cap</strong> on the funding card — covers full ramp with a 16% buffer for credit overages.</li>
              <li><strong>Hard alert at $3,500/mo</strong> — automated notification before any surprise spend.</li>
              <li><strong>Card auto-pause</strong> — if billing fails, system gracefully pauses tomorrow&apos;s queue. No surprise debt.</li>
              <li><strong>Admin access shared</strong> — both parties see real-time tool spend in a single dashboard.</li>
            </ul>
          </div>

          <div className="guard-block">
            <div className="guard-h">WHAT&apos;S INCLUDED</div>
            <ul className="guard-list">
              <li><strong>All tooling</strong> — data, enrichment, AI, outbound, hosting, database.</li>
              <li><strong>Domain &amp; inbox warming</strong> — pre-warmed by month 2 to avoid spam filters.</li>
              <li><strong>System maintenance</strong> — orchestrator updates, model swaps, ETL fixes.</li>
              <li><strong>Spend transparency</strong> — monthly itemized report on every line.</li>
            </ul>
          </div>

          <div className="guard-block">
            <div className="guard-h">NOT INCLUDED</div>
            <ul className="guard-list">
              <li><strong>CRM seat fees</strong> — assumes existing HubSpot Free or Pipedrive ($0–50/seat/mo).</li>
              <li><strong>LinkedIn Sales Navigator</strong> — optional, $99/seat/mo, recommended at full ramp.</li>
              <li><strong>List augmentation buys</strong> — occasional one-off ZoomInfo/Cognism pulls if Clay hit-rate dips, $200–500 ad hoc.</li>
              <li><strong>TCPA compliance review</strong> — one-time $1,500 with defense-bar attorney for cold-call script.</li>
            </ul>
          </div>

          <div className="guard-block">
            <div className="guard-h">RISK &amp; MITIGATION</div>
            <ul className="guard-list">
              <li><strong>Provider rate limits</strong> — multi-vendor abstraction, automatic failover between Claude, Gemini, GPT.</li>
              <li><strong>Enrichment hit-rate dips</strong> — waterfall across 4 providers; reject leads with fewer than 2 verified contacts.</li>
              <li><strong>Salesperson capacity</strong> — system throttles to match what the rep can actually work.</li>
              <li><strong>Deadline drift</strong> — secondary verticals identified (NIST 800-171, HIPAA) for pipeline diversification.</li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="brief-footer">
        <div>VISIBLE EDGE / FIN PLAN 001</div>
        <div className="right">CONFIDENTIAL · INTERNAL DRAFT</div>
      </footer>
    </div>
  );
}
