# CMMC Lead Generation System — Build Plan

**Project:** Performance-based lead-gen engine for James's CMMC compliance firm
**Owner:** Chris Dover / Enfocado Capital
**Customer:** James (design partner, exclusive vertical license)
**Status:** Pre-call planning, April 29, 2026

---

## 1. Frame This Correctly Before The Call

You are not James's vendor. You are building an asset.

The CMMC market has roughly 80,000 small DoD contractors who need certification by the November 2026 Phase 2 deadline. Roughly 1% are ready today. James is one of perhaps 200-400 small CMMC consulting firms competing for the same flat-footed customer base, and every one of them has the same lead-gen problem he does. The system you build for James — universe builder, enrichment pipeline, AI dossier engine, ML scoring loop, daily sales queue — is repeatable across that entire competitive set.

**The deal that protects you has three parts:**

1. **You own the IP.** James gets exclusive license in his geography or vertical for 12 months. After that, you can license it to non-competing firms.
2. **You get paid per outcome, not per hour.** Per qualified lead delivered, plus per booked meeting, plus per closed deal. Three layers, not one.
3. **He covers all infrastructure.** Tools, APIs, enrichment credits, hosting — on his card, in accounts you can audit.

The reason this matters: James pitched 20% commission on close. That structure pays you only if his sales process works, and his sales process is currently 50% of target call volume with one rep. You'd be subsidizing his pipeline build with your time. Push for the three-layer structure. If he refuses, walk — there are other CMMC firms who will say yes.

**Walk-away math:** Build effort is roughly 4-6 weeks at maybe 25 hours/week of focused work, plus ongoing maintenance. That's $40-60K of your time at fair-market rates. You need contractual visibility into earning at least that back within 90 days, or equity that could 3-5x that within 24 months. Do not build on hope.

---

## 2. Deal Structure To Propose

**Tier 1 — Per qualified lead delivered: $25/lead**
Fully enriched, dossier-attached, in CRM, marked as in-target. You commit to volume bands (e.g., 100-200/day). He commits to working them.

**Tier 2 — Per booked meeting: $250/meeting**
Triggered when his rep books a discovery call from a lead in your pipeline.

**Tier 3 — Closing bonus: 10% of contract value, capped at $10K per deal**
Triggered on first invoice paid by the end customer.

**Plus:**
- He covers 100% of tool/API spend on his card. Estimated $1,500-2,500/month at scale.
- 12-month exclusive license in his vertical (defense industrial base, US-based, sub-100 employee firms). After 12 months, you can license to other firms with non-overlapping ICP.
- Mutual 30-day kill clause if either side decides it's not working.
- All system code, models, and aggregated training data are your property.

**At full ramp, what this looks like for you:**
- 150 leads/day × $25 = $3,750/day in lead fees → ~$110K/month
- 6 booked meetings/day × $250 = $1,500/day → ~$45K/month
- 1 close/day average × $10K cap = $10K/day → ~$300K/month at peak

That last number is fantasy until proven. Realistic Q3 2026 run rate is probably $40-80K/month combined across tiers. Still a meaningful business line.

---

## 3. System Architecture

The architecture is a four-stage pipeline with a closed feedback loop. Local model on your Mac Mini orchestrates; remote APIs do the expensive work.

### Stage A — Universe Builder (nightly)

Pulls public federal data, builds and refreshes the qualified target universe.

**Inputs:** SAM.gov Entity API (registered contractors), USAspending.gov API (actual DoD award history, prime + sub), SBA size-standard tables, NAICS targeting list.

**Filter logic:**
- Active SAM.gov registration
- ≥ 1 DoD prime or first-tier sub award in last 36 months
- Self-reported employees < 100 OR average annual receipts under SBA threshold
- NAICS in target set: 33xxxx (manufacturing), 5413xx, 5415xx, 5417xx, 5419, 541330, 541512, 541519, 541611, 541618, 541690, 541715, 561612, plus aerospace/defense-specific codes
- Place of performance in continental US
- No active CMMC certification visible (negative signal — most won't have one)

**Output:** NeonDB table `targets_universe` with ~10,000-20,000 rows. Each row carries UEI, CAGE, legal name, address, DoD obligation total, contract count, last award date, primary NAICS, employee band, raw entity JSON.

**Tooling:** Python on your DigitalOcean droplet. Cron job runs at 2 AM Mountain. Refreshes weekly. New entries flagged for fast-track processing.

### Stage B — Enrichment & Decision-Maker Resolution

For each target in the daily queue, find 2-4 humans worth calling.

**Inputs:** Apollo.io API or Clay (preferred — better waterfall), Seamless.ai for phone numbers, Hunter.io for email verification, LinkedIn via Sales Navigator scrape (PhantomBuster or Clay).

**Logic:**
- Pull all current employees with titles matching: CEO, President, Owner, Founder, COO, CFO, CIO, CTO, CISO, VP Operations, VP Compliance, IT Director, IT Manager, Director of Security, Compliance Manager, Facility Security Officer
- Score by buying authority for compliance services (CEO at 80-employee shop = high; IT Manager = medium; VP Sales = low)
- Verify email deliverability before delivering to sales
- Never deliver a lead with fewer than two verified contacts

**Output:** `targets_enriched` table joined to universe. Each row has decision-maker name, title, verified email, phone, LinkedIn, authority score.

**Cost note:** Apollo + Clay waterfall typically lands at $0.20-0.40 per verified contact. At 200 leads/day × 3 contacts = 600 enrichments × $0.30 = $180/day. James needs to budget for this.

### Stage C — AI Dossier Engine (the core IP)

This is where the local model orchestration matters. For each enriched target, generate a one-page sales dossier.

**Local orchestrator (Gemma 4 on M1 Mac Mini):**
- Receives target + enriched contact data
- Decides task routing: "Does this lead need contract-doc summarization? → Gemini long-context. Does it need the actual sales script? → Claude. Does it need quick fact extraction? → local model."
- Manages cost budget — capped at $0.05/dossier in API spend

**Claude API (high-judgment work):**
- Writes the personalized opener (1-2 sentences naming a specific contract or capability)
- Generates the suggested talk track for the rep
- Drafts the follow-up email if the call goes to voicemail
- Writes the LinkedIn message variant

**Gemini Flash / 2.5 Pro (cheap bulk + long context):**
- Summarizes the contractor's USAspending history into a 3-bullet summary
- Pulls public capability statements from SAM.gov and reduces to one paragraph
- Reads recent solicitations the contractor bid on (FBO/SAM.gov opportunities) for recompete intel

**GPT (specific tasks):**
- Reasoning verification on classification edge cases
- Backup when Claude is rate-limited
- Pull structured JSON from messy capability statements

**Output:** `dossiers` table. Each row has the rendered HTML/markdown dossier, suggested call opener, suggested objection handlers, recompete signal score, urgency score, and confidence rating from the local model.

**Cost target:** ~$0.05-0.15 per dossier in API spend. At 200/day = $10-30/day.

### Stage D — Sales Surface & Outcome Capture

Where the salesperson lives. Daily queue, dossier viewer, one-tap outcome logging. (Mockup follows in section 7.)

**Outputs to capture:**
- Disposition: No Answer / Voicemail / Not Interested / Interested / Booked / Not Qualified / Closed / Lost
- Objection categories (multi-select, structured)
- Timestamp of call, call duration if integrated with dialer
- Next-step date if applicable

This data is the training fuel for Stage E.

### Stage E — Feedback Loop & ML Scoring

This is the moat. Without this, you're just a glorified list builder.

**Daily feedback ingestion:**
- All Stage D outcomes flow back to NeonDB
- Aggregated by all available features: NAICS, agency, DoD obligation size, contract recency, employee count, decision-maker title, time of day, day of week, dossier urgency score, geographic region, recompete proximity, capability statement keywords, FCI vs CUI exposure level, etc.

**Models:**
- **Week 1-30:** Heuristic scoring. Hand-tuned weights based on what James's rep tells you converts. This is honest about the lack of training data early on.
- **Week 30-90:** Logistic regression baseline. Predicts P(booked meeting | features). Refit weekly on accumulated outcomes.
- **Week 90+:** XGBoost or LightGBM (you've used these for Pollinate). Predicts P(closed deal | features). Same nightly refit cadence as your trading regime classifier — you have the muscle memory for this.

**Output:** Each lead in tomorrow's queue gets a `priority_score` (0-100) plus a `confidence` rating. Queue is sorted by priority, with diversity injection (10% of queue is exploratory leads in feature regions where the model has low confidence — keeps the model from collapsing into a narrow band).

**Closed-loop time:** Day N outcomes captured by 6 PM → ETL job at 11 PM → model refit at midnight → tomorrow's queue scored and delivered to sales rep by 7 AM.

---

## 4. Tech Stack & Monthly Cost

You already have most of this running. New additions are bolded.

| Layer | Tool | Cost (monthly) | Who pays |
|---|---|---|---|
| Database | NeonDB (existing) | ~$30 | James |
| Hosting | DigitalOcean droplet (existing) | ~$50 | James |
| Local model | Gemma 4 on M1 Mac Mini (existing) | $0 | — |
| Frontend | Next.js (you build it) | $0 | — |
| **Universe data** | SAM.gov + USAspending.gov APIs | $0 | — |
| **Enrichment** | Apollo.io + Clay waterfall | $800-1,500 | James |
| **Phone numbers** | Seamless.ai | $200-400 | James |
| **Email verify** | Hunter.io | $100 | James |
| **LinkedIn data** | PhantomBuster or Clay native | $100-200 | James |
| Claude API | Sonnet 4.7 + Haiku 4.5 mix | $300-500 | James |
| Gemini API | Flash + Pro mix | $50-100 | James |
| OpenAI API | GPT-5 fallback | $50-100 | James |
| **Outreach automation** | Smartlead or Instantly | $100-200 | James |
| Monitoring/logs | Existing Pollinate stack | $0 | — |

**Total James-funded burn:** ~$1,800-3,200/month at full scale. He puts it on a card. You hold admin access. If a card fails, the system pauses gracefully — no surprise cliff.

**Per-lead all-in cost:** Roughly $1.50-3.00. At your $25 lead price, gross margin is 88-94%. That's the math that makes performance-only acceptable.

---

## 5. Build Timeline

You finished Operation Visible Edge yesterday (April 28). Bandwidth opens up now.

### Pre-Build (this week — Apr 29 to May 5)

- **Today:** Discovery call with James. Pitch the three-tier structure. Get yes or walk.
- **Day +1:** If yes, send a 2-page MOU with deal terms, exclusivity, IP ownership, kill clause. Use a lightweight contract — Common Paper or DocuSign.
- **Day +2-3:** Provision shared infrastructure. He sets up the credit card on Apollo, Clay, Seamless, etc., and adds you as admin. You set up the NeonDB schema and DigitalOcean droplet capacity.
- **Day +4-5:** Joint working session with James and his salesperson. Document their current 20-30 minute manual process step by step. This is your spec.

### Phase 1 — Universe & Enrichment (Week 1, May 6-12)

- SAM.gov + USAspending pullers. Schema for `targets_universe`.
- NAICS target list locked.
- First universe build — produces ~10K-20K filtered targets.
- Apollo/Clay enrichment pipeline. Schema for `targets_enriched`.
- Validation: spot-check 50 enriched leads with James's rep. Are these the right companies? Right people?

**Deliverable end of Week 1:** A list of 500 fully-enriched targets in spreadsheet form. Sales rep can call from this immediately, even before the UI is built. *First revenue possible by end of Week 1.*

### Phase 2 — Dossier Engine (Week 2, May 13-19)

- Local Gemma orchestrator skeleton.
- Claude integration for opener + talk track generation.
- Gemini for contract history summarization.
- Dossier rendering template.
- Quality gates: human review of first 100 dossiers before automation goes live.

**Deliverable end of Week 2:** Salesperson is calling from leads that come with one-page dossiers. Conversion rate measurable.

### Phase 3 — Sales UI (Week 3, May 20-26)

- Next.js app with auth.
- Daily queue view.
- Dossier viewer.
- One-tap outcome capture.
- Mobile-responsive (rep is sometimes on phone between calls).

**Deliverable end of Week 3:** Salesperson uses the UI exclusively. Manual spreadsheet retired.

### Phase 4 — Feedback Loop (Week 4, May 27-Jun 2)

- Outcome capture → DB schema for `outcomes`.
- Nightly aggregation job.
- Heuristic scoring engine v1 (hand-weighted).
- Priority-sorted queue delivery to sales rep at 7 AM.

**Deliverable end of Week 4:** Closed feedback loop. Today's calls measurably influence tomorrow's leads.

### Phase 5 — ML Layer (Weeks 5-12)

- Logistic regression on accumulated outcomes (need ~1,000 outcomes minimum).
- Feature engineering iteration with rep input.
- A/B testing: 90% ML-scored queue vs 10% heuristic baseline.
- Move to XGBoost when sample size supports it (~5,000 outcomes, probably Week 10-12).

**Deliverable end of Week 12:** ML-scored queue running, 30-50% higher booked-meeting rate than baseline (target).

### Phase 6 — Scale & Productize (Months 4-6)

- Multi-rep support if James adds salespeople.
- License-ready packaging for second customer.
- Hardening, observability, runbooks.

---

## 6. Daily Operating Loop (steady state)

This is what every weekday looks like once Phase 4 is live.

| Time (MT) | Event |
|---|---|
| 6:00 AM | Universe refresh (delta only — new entities) |
| 6:15 AM | Enrichment pipeline runs on tomorrow's queue (200 leads) |
| 6:45 AM | Dossier engine generates dossiers |
| 7:00 AM | Sales rep gets daily queue email + UI is loaded |
| 8:00 AM-12:00 PM | Rep makes calls, logs outcomes |
| 12:00-1:00 PM | Lunch / inbound followups |
| 1:00 PM-5:00 PM | Calls continue |
| 5:00 PM | Rep wraps, all outcomes logged |
| 6:00 PM | Outcome ETL runs |
| 11:00 PM | Model refit |
| 12:00 AM | Tomorrow's queue scored & locked |

---

## 7. UI/Product Surface

The salesperson sees three views. Mockup of view 1 follows in the artifact alongside this plan.

**View 1 — Daily Queue (the most important screen).** Left rail: prioritized list of today's leads with company name, key signal, urgency badge. Main panel: selected lead's full dossier. Bottom action bar: outcome capture. Header: today's progress, this week's stats.

**View 2 — Pipeline.** All booked meetings, organized by stage. Standard CRM stuff. (Or integrate with whatever James uses — HubSpot Free, Pipedrive, Close.)

**View 3 — Performance.** Personal stats: calls today, conversations, bookings, closes, conversion rate trend. Plus a leaderboard if James adds reps.

**Admin view (you and James see it, salesperson does not):**
- Universe size, daily run health, last successful run timestamp
- Cost-per-lead, cost-per-booked-meeting, cost-per-close
- Funnel: targets → enriched → delivered → contacted → booked → closed
- Tool spend tracking (so James sees his card burn in real time)
- ML model performance: AUC, calibration, top features

---

## 8. Success Metrics & Killswitches

Define these before you build. Otherwise you'll build forever and never declare victory or defeat.

**Week 1:**
- Universe contains ≥ 5,000 qualified targets ✓
- 500 enriched leads with verified contacts delivered ✓
- Sales rep makes ≥ 50 calls from the list ✓
- Conversion to booked meeting ≥ 1% ✓

**Week 4:**
- Daily queue running, 100-200 leads/day ✓
- Booked meeting rate ≥ 2% ✓
- First close attributable to your pipeline ✓

**Week 12:**
- Booked meeting rate ≥ 4% (vs 2% baseline) ✓
- Close rate on booked meetings ≥ 25% ✓
- Cumulative revenue to you ≥ $30K ✓

**Killswitches (you walk if):**
- Week 4: rep won't or can't work the leads (this is on James, not you)
- Week 8: revenue to you under $10K (deal economics broken)
- Week 12: James can't keep tools funded (he's not a viable partner)

---

## 9. What You Need From James On The Call

Five questions, then a decision.

1. Walk me through your current 20-30 minute manual lead process, screen by screen.
2. What's your CRM? What's your dialer? Where do leads currently land?
3. What's your close rate on booked meetings today? What's your average L2 contract size that *closes*, not the published range?
4. Are you comfortable with a three-tier performance structure ($25/lead + $250/booked + 10% close bonus, capped) plus you covering tool spend?
5. Are you comfortable with me retaining IP ownership and licensing rights outside your vertical/geography after the 12-month exclusivity?

If yes to 4 and 5, you have a deal. If he balks at either, the deal isn't worth doing on his terms.

---

## 10. Risks & Mitigations

**Risk: SAM.gov / USAspending data has gaps or staleness.**
Mitigation: Cross-reference both sources. Flag low-confidence rows. Manual spot-checks weekly for first month.

**Risk: Apollo/Clay enrichment quality is mediocre for sub-100-employee defense firms (these are often LinkedIn-light).**
Mitigation: Use waterfall — try Apollo first, fall back to Clay, fall back to Seamless, fall back to Hunter pattern-match. Track enrichment success rate and reject leads below 2 verified contacts.

**Risk: James's rep doesn't follow the process — calls leads out of order, doesn't log outcomes, etc.**
Mitigation: Make the UI the easiest path. One-tap logging. Don't deliver tomorrow's queue if today's outcomes aren't logged. Hard incentive.

**Risk: CMMC deadline shifts again (it's been delayed before).**
Mitigation: This is the macro risk. If Phase 2 slides 6 months, urgency drops and so does conversion. Monitor regulatory news monthly. Have a Plan B vertical ready (NIST 800-171 compliance is required for non-DoD federal contractors too — same playbook, different filter).

**Risk: One of the LLM providers tightens rate limits or kills your API access.**
Mitigation: Multi-provider abstraction layer in the local orchestrator. Already in your design.

**Risk: You burn out trying to run this alongside Pollinate, Centinela, JARVIS, and a job search.**
Mitigation: Honest one. Define the hours/week budget for this project (suggest: 15-20 hrs/week post-build) and protect it. If James's deal economics don't justify that time, walk.

---

## 11. The Bigger Play

If this works for James, here's the sequel.

CMMC is one of three or four parallel compliance gold rushes. The same pipeline architecture serves:

- **NIST 800-171 consultants** (broader federal, not just DoD)
- **HIPAA/HITRUST consultants** (healthcare — different filter, same engine)
- **SOC 2 / ISO 27001 consultants** (commercial — different filter, same engine)
- **CIRCIA consultants** (critical infrastructure — emerging in 2026)

Your IP is the orchestration layer + the ML loop, not the CMMC-specific filters. Filters are configuration. Once the engine is proven for James, packaging it as a horizontal product (Enfocado-built, branded as something separate) is roughly 4 weeks of additional work and could carry $5-15K MRR per customer.

This is the version where Centinela's MTP — *turn invisible threats into visible edges* — quietly applies to a new domain. Compliance threats, not security threats, but the structure is identical: someone needs to see something they can't see, before a deadline they can't move.

That's the longer arc. James is the design partner who funds discovery.

---

*End of plan. Mockup follows.*
