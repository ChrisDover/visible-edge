import React, { useState, useEffect } from 'react';
import {
  Phone, Mail, Linkedin, Building2, MapPin, Users, DollarSign,
  Calendar, AlertTriangle, TrendingUp, Target, CheckCircle2, X,
  Voicemail, MessageSquare, ChevronRight, Flame, Shield, FileText,
  Zap, Activity, ArrowUpRight, Briefcase, Clock, ChevronUp, Search
} from 'lucide-react';

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Funnel+Display:wght@400;500;600;700;800&family=IBM+Plex+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

html, body, #root {
  background: #0a0d12 !important;
  color: #ffffff;
  margin: 0;
  padding: 0;
  min-height: 100vh;
}

.font-display { font-family: 'Funnel Display', system-ui, sans-serif; }
.font-body { font-family: 'IBM Plex Sans', system-ui, sans-serif; }
.font-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
.fade-in { animation: fadeIn 240ms ease-out; }

@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
.pulse-dot { animation: pulse-dot 1.8s ease-in-out infinite; }

.scrollbar-thin::-webkit-scrollbar { width: 6px; }
.scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
.scrollbar-thin::-webkit-scrollbar-thumb { background: #2a2f38; border-radius: 3px; }
.scrollbar-thin::-webkit-scrollbar-thumb:hover { background: #3a4048; }

.tabular { font-variant-numeric: tabular-nums; }
`;

const LEADS = [
  {
    id: 1,
    company: 'Apex Precision Aerospace',
    cage: '8F2K1',
    uei: 'PXVQR3KL2D78',
    city: 'Wichita',
    state: 'KS',
    employees: 47,
    naics: '336412',
    naicsLabel: 'Aircraft Engine Parts Mfg',
    dodObligation: 2840000,
    contractCount: 14,
    lastAward: 'Feb 2026',
    priorityScore: 94,
    urgencyTag: 'RECOMPETE Q3',
    urgencyColor: 'amber',
    cmmcGap: 'Likely L2 — CUI flow-down via Lockheed sub-tier',
    rationale: 'Multi-year Air Force contract recompetes Aug 2026. Active sub-tier on F-15 program. No CMMC affirmation in SPRS. Decision-maker is owner-operator (high authority).',
    contracts: [
      { agency: 'AF / AFLCMC', value: 1240000, date: '02/2026', desc: 'F-15 component machining' },
      { agency: 'Navy / NAVAIR', value: 890000, date: '09/2025', desc: 'P-8A subassembly' },
      { agency: 'DLA Aviation', value: 410000, date: '03/2025', desc: 'Spare parts pool' }
    ],
    contacts: [
      { name: 'Daniel Mercer', title: 'President & Owner', email: 'd.mercer@apexprecision.com', phone: '+1 316-555-0142', authority: 95, primary: true },
      { name: 'Linda Crow', title: 'Director of Operations', email: 'lcrow@apexprecision.com', phone: '+1 316-555-0143', authority: 70 }
    ],
    opener: 'Daniel — noticed Apex was awarded the F-15 component contract through AFLCMC last month. With Phase 2 hitting November, the recompete on your multi-year is going to require third-party Level 2. Wanted to see if you\'d already lined up your assessor.',
    objections: [
      { trigger: '"We\'re handling it internally"', response: 'Most internal teams hit gap analysis but skip assessor scheduling. C3PAO wait times are now 18+ months for Q4 2026 slots.' },
      { trigger: '"Send me info"', response: 'Push for 15-min next week. Reference the Lockheed sub-tier CUI flow-down specifically.' },
      { trigger: '"Already engaged"', response: 'Ask who. If a non-C3PAO RPO, mention the post-Nov 2026 exposure for unaffirmed scores.' }
    ]
  },
  {
    id: 2,
    company: 'Ironhall Tactical Systems',
    cage: '92QFE',
    uei: 'GHM7TK9P1Z42',
    city: 'Manchester',
    state: 'NH',
    employees: 31,
    naics: '332994',
    naicsLabel: 'Small Arms Manufacturing',
    dodObligation: 1620000,
    contractCount: 9,
    lastAward: 'Jan 2026',
    priorityScore: 91,
    urgencyTag: 'CUI EXPOSURE',
    urgencyColor: 'red',
    cmmcGap: 'L2 confirmed — handles weapons system technical data (CTI)',
    rationale: 'Direct prime to USSOCOM. Handles Controlled Technical Information. ITAR-adjacent. Currently self-attesting at SPRS 62. POA&Ms expiring Aug 2026.',
    contracts: [
      { agency: 'USSOCOM / SOF AT&L', value: 980000, date: '01/2026', desc: 'Suppressor R&D' },
      { agency: 'Army / PEO Soldier', value: 440000, date: '11/2025', desc: 'Component fabrication' },
      { agency: 'DLA Land', value: 200000, date: '08/2025', desc: 'Repair parts' }
    ],
    contacts: [
      { name: 'Marcus Voss', title: 'CEO', email: 'mvoss@ironhall.us', phone: '+1 603-555-0177', authority: 95, primary: true },
      { name: 'Rachel Kim', title: 'Compliance & Security Officer', email: 'rkim@ironhall.us', phone: '+1 603-555-0178', authority: 85 }
    ],
    opener: 'Marcus — saw the USSOCOM suppressor R&D award. Given the CTI involved, your SPRS POA&Ms are going to need closure before the Phase 2 enforcement window. Are you on a C3PAO calendar yet?',
    objections: [
      { trigger: '"We have a 62 score, we\'re fine"', response: '62 self-attested gets you bid eligibility today. After Nov 10 it doesn\'t. POA&M closeout requires the same C3PAO assessment as fresh certification.' },
      { trigger: '"What\'s your background?"', response: 'Mention DFARS practice, recent assessments completed, no name-drop without permission.' }
    ]
  },
  {
    id: 3,
    company: 'Helix Engineering Group',
    cage: '7KQ4D',
    uei: 'JXP2VR8KQM91',
    city: 'Huntsville',
    state: 'AL',
    employees: 88,
    naics: '541330',
    naicsLabel: 'Engineering Services',
    dodObligation: 5210000,
    contractCount: 22,
    lastAward: 'Mar 2026',
    priorityScore: 89,
    urgencyTag: 'RECOMPETE Q4',
    urgencyColor: 'amber',
    cmmcGap: 'L2 — missile systems engineering data',
    rationale: 'MDA prime sub. Strong contract velocity. Sub-100 employees. CISO already on staff (compliance-aware buyer).',
    contracts: [
      { agency: 'MDA', value: 2400000, date: '03/2026', desc: 'GMD systems engineering' },
      { agency: 'Army / PEO Missiles', value: 1800000, date: '12/2025', desc: 'PATRIOT mod support' },
      { agency: 'AFRL', value: 620000, date: '07/2025', desc: 'Hypersonics study' }
    ],
    contacts: [
      { name: 'Dr. Anita Reyes', title: 'CEO', email: 'areyes@helixeng.com', phone: '+1 256-555-0211', authority: 95, primary: true },
      { name: 'Chen Wu', title: 'CISO', email: 'cwu@helixeng.com', phone: '+1 256-555-0212', authority: 90 },
      { name: 'Tom Briley', title: 'VP Engineering', email: 'tbriley@helixeng.com', phone: '+1 256-555-0213', authority: 60 }
    ],
    opener: 'Chen — Helix\'s MDA work puts you squarely in the Phase 2 cohort that has to be third-party assessed. Most CISOs I speak with at your size are bottlenecked on assessor availability rather than control implementation. Wanted to compare notes.',
    objections: [
      { trigger: '"We\'re using [internal team / Big 4]"', response: 'C3PAO assessment and remediation work cannot be done by the same firm under 32 CFR 170. Verify their structure.' }
    ]
  },
  {
    id: 4,
    company: 'Northwind Logistics LLC',
    cage: '5N3YT',
    uei: 'WK4MR9DPLT22',
    city: 'Tacoma',
    state: 'WA',
    employees: 19,
    naics: '488510',
    naicsLabel: 'Freight Transportation Arrangement',
    dodObligation: 480000,
    contractCount: 6,
    lastAward: 'Nov 2025',
    priorityScore: 72,
    urgencyTag: 'L1 ONLY',
    urgencyColor: 'blue',
    cmmcGap: 'L1 — FCI only, low scope',
    rationale: 'Small but consistent DLA logistics work. FCI exposure means L1 self-assessment. Fast close, lower ticket.',
    contracts: [
      { agency: 'DLA Distribution', value: 280000, date: '11/2025', desc: 'CONUS freight' },
      { agency: 'TRANSCOM', value: 200000, date: '06/2025', desc: 'Short-haul DOD' }
    ],
    contacts: [
      { name: 'Joel Sandberg', title: 'Founder', email: 'joel@nwlogistics.io', phone: '+1 253-555-0334', authority: 95, primary: true }
    ],
    opener: 'Joel — quick one. Your DLA freight work means you handle FCI, which puts you in the Level 1 self-assessment bucket. We do those in 30 days for $5-7K. Easier to knock it out now than scramble in October.',
    objections: [
      { trigger: '"What\'s the minimum to stay eligible?"', response: 'L1 self-assessment posted to SPRS. We do it for you, you sign the affirmation.' }
    ]
  },
  {
    id: 5,
    company: 'Stellar Composites Inc',
    cage: '4HRT2',
    uei: 'YN8KQR3VPLM4',
    city: 'San Diego',
    state: 'CA',
    employees: 62,
    naics: '326199',
    naicsLabel: 'Plastics Product Mfg',
    dodObligation: 1980000,
    contractCount: 11,
    lastAward: 'Dec 2025',
    priorityScore: 86,
    urgencyTag: 'CUI EXPOSURE',
    urgencyColor: 'red',
    cmmcGap: 'L2 — composite armor specs (CUI/EXPT)',
    rationale: 'Navy direct prime. Export-controlled materials. No SPRS score posted. Owner is ex-military (relationship angle).',
    contracts: [
      { agency: 'Navy / NAVSEA', value: 1100000, date: '12/2025', desc: 'Hull composites' },
      { agency: 'Marine Corps', value: 580000, date: '08/2025', desc: 'Body armor program' }
    ],
    contacts: [
      { name: 'Kevin O\'Hara', title: 'President', email: 'kohara@stellarcomp.com', phone: '+1 619-555-0445', authority: 95, primary: true },
      { name: 'Sarah Bell', title: 'Controller', email: 'sbell@stellarcomp.com', phone: '+1 619-555-0446', authority: 50 }
    ],
    opener: 'Kevin — semper fi. Saw the NAVSEA hull composites award. With export-controlled material specs, you\'re Level 2 territory and there\'s no score posted. Phase 2 lands in seven months. Worth a 15-min call.',
    objections: []
  },
  {
    id: 6,
    company: 'Cipher Defense IT',
    cage: '6PX91',
    uei: 'TR4LP9MKVN23',
    city: 'Reston',
    state: 'VA',
    employees: 54,
    naics: '541512',
    naicsLabel: 'Computer Systems Design',
    dodObligation: 3120000,
    contractCount: 18,
    lastAward: 'Mar 2026',
    priorityScore: 83,
    urgencyTag: 'IRONIC',
    urgencyColor: 'amber',
    cmmcGap: 'L2 — they ARE the IT, but no cert',
    rationale: 'IT services contractor to multiple DoD primes. SPRS 71 self-attested. Should know better — easy yes.',
    contracts: [
      { agency: 'DISA', value: 1400000, date: '03/2026', desc: 'Network ops support' },
      { agency: 'Army / NETCOM', value: 920000, date: '10/2025', desc: 'Endpoint security' },
      { agency: 'DCSA', value: 800000, date: '06/2025', desc: 'IA support' }
    ],
    contacts: [
      { name: 'Priya Shankar', title: 'CEO', email: 'pshankar@cipherdef.com', phone: '+1 703-555-0512', authority: 95, primary: true },
      { name: 'Greg Tomlin', title: 'CTO', email: 'gtomlin@cipherdef.com', phone: '+1 703-555-0513', authority: 90 }
    ],
    opener: 'Priya — Cipher\'s an IT services prime with a 71 self-attested SPRS, which won\'t hold post-November. The optics of an IT firm bidding without third-party L2 are going to be tough. Where are you on assessor selection?',
    objections: []
  },
  {
    id: 7,
    company: 'Granite State Machining',
    cage: '8MT4Y',
    uei: 'PV9KR2QLMTN8',
    city: 'Concord',
    state: 'NH',
    employees: 28,
    naics: '332710',
    naicsLabel: 'Machine Shops',
    dodObligation: 920000,
    contractCount: 12,
    lastAward: 'Feb 2026',
    priorityScore: 79,
    urgencyTag: 'STEADY',
    urgencyColor: 'blue',
    cmmcGap: 'L2 likely — sub-tier on multiple primes',
    rationale: 'Steady DLA machining work. Family-owned, second generation. Owner near retirement age — selling drama possible.',
    contracts: [
      { agency: 'DLA Aviation', value: 410000, date: '02/2026', desc: 'Bracket assemblies' },
      { agency: 'Navy / NAVSUP', value: 280000, date: '11/2025', desc: 'Hardware' }
    ],
    contacts: [
      { name: 'Robert Granger', title: 'Owner', email: 'bob@granitemach.com', phone: '+1 603-555-0623', authority: 95, primary: true }
    ],
    opener: 'Bob — straightforward one. Granite\'s DLA work means CUI is flowing your way through the primes. You need an L2 assessment lined up before October or you\'re out of bid eligibility on recompetes. Got 15 minutes this week?',
    objections: []
  },
  {
    id: 8,
    company: 'Vector R&D Solutions',
    cage: '3QNK7',
    uei: 'BX5MR9KPTLM2',
    city: 'Albuquerque',
    state: 'NM',
    employees: 41,
    naics: '541715',
    naicsLabel: 'Physical/Engineering R&D',
    dodObligation: 2240000,
    contractCount: 8,
    lastAward: 'Jan 2026',
    priorityScore: 77,
    urgencyTag: 'SBIR',
    urgencyColor: 'blue',
    cmmcGap: 'L2 — SBIR Phase II tech data',
    rationale: 'Sandia-adjacent R&D. SBIR Phase II contracts. Likely thin on IT staff. Receptive to managed approach.',
    contracts: [
      { agency: 'AFRL', value: 1100000, date: '01/2026', desc: 'Directed energy SBIR II' },
      { agency: 'DTRA', value: 600000, date: '07/2025', desc: 'CWMD research' }
    ],
    contacts: [
      { name: 'Dr. Henry Park', title: 'Founder & CEO', email: 'hpark@vectorrd.com', phone: '+1 505-555-0734', authority: 95, primary: true }
    ],
    opener: 'Dr. Park — saw the AFRL directed energy Phase II award. SBIR II almost always pulls CTI flow-down. Most R&D shops your size don\'t have the IT depth for the 110 controls. We do this for AFRL contractors regularly.',
    objections: []
  },
  {
    id: 9,
    company: 'Patriot Training Services',
    cage: '5LRH9',
    uei: 'KP3VQR8MLNT4',
    city: 'Tampa',
    state: 'FL',
    employees: 33,
    naics: '611699',
    naicsLabel: 'Other Educational Services',
    dodObligation: 760000,
    contractCount: 14,
    lastAward: 'Nov 2025',
    priorityScore: 68,
    urgencyTag: 'L1 ONLY',
    urgencyColor: 'blue',
    cmmcGap: 'L1 — training delivery, no CUI',
    rationale: 'Training contractor, mostly FCI. Low ticket but quick close. Good filler call.',
    contracts: [
      { agency: 'CENTCOM', value: 380000, date: '11/2025', desc: 'Cultural training' },
      { agency: 'SOCOM', value: 220000, date: '04/2025', desc: 'Language training' }
    ],
    contacts: [
      { name: 'Marisol Ortega', title: 'President', email: 'mortega@patriottrain.com', phone: '+1 813-555-0823', authority: 95, primary: true }
    ],
    opener: 'Marisol — quick one on CMMC. Your CENTCOM and SOCOM work puts you in the L1 bucket. 30-day turnaround, fixed fee. Worth a 10-min call?',
    objections: []
  },
  {
    id: 10,
    company: 'Coastal Maritime Defense',
    cage: '7TQK2',
    uei: 'WN4MR9KPTLV3',
    city: 'Norfolk',
    state: 'VA',
    employees: 76,
    naics: '336611',
    naicsLabel: 'Ship Building & Repair',
    dodObligation: 4180000,
    contractCount: 16,
    lastAward: 'Feb 2026',
    priorityScore: 81,
    urgencyTag: 'PRIME',
    urgencyColor: 'amber',
    cmmcGap: 'L2 — Navy ship technical data',
    rationale: 'Direct Navy prime, ship repair. Existing IT spend ($800K/yr est). High recompete frequency. Decision is at CFO level.',
    contracts: [
      { agency: 'Navy / NAVSEA', value: 2400000, date: '02/2026', desc: 'DDG-class repair' },
      { agency: 'MSC', value: 980000, date: '09/2025', desc: 'Sealift maintenance' }
    ],
    contacts: [
      { name: 'James McCallister', title: 'CEO', email: 'jm@coastalmd.com', phone: '+1 757-555-0921', authority: 95, primary: true },
      { name: 'Dana Whitfield', title: 'CFO', email: 'dwhitfield@coastalmd.com', phone: '+1 757-555-0922', authority: 88 }
    ],
    opener: 'Dana — Coastal\'s NAVSEA work puts CMMC L2 squarely in your 2026 budget cycle. Most CFOs I speak with at this size are deciding between $80K all-in with a managed firm or $200K piecing it together. Worth comparing.',
    objections: []
  }
];

const fmtMoney = (n) => {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `$${(n / 1000).toFixed(0)}K`;
  return `$${n}`;
};

const PriorityBar = ({ score }) => {
  const color = score >= 90 ? 'bg-amber-400' : score >= 80 ? 'bg-amber-500/80' : score >= 70 ? 'bg-blue-500/70' : 'bg-slate-500/50';
  return (
    <div className="flex items-center gap-2">
      <div className="w-12 h-1 bg-slate-800 rounded-sm overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${score}%` }} />
      </div>
      <span className="font-mono text-[10px] tabular text-white">{score}</span>
    </div>
  );
};

const UrgencyBadge = ({ tag, color }) => {
  const colors = {
    amber: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
    red: 'border-red-500/40 bg-red-500/10 text-red-300',
    blue: 'border-blue-500/40 bg-blue-500/10 text-blue-300',
    green: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
  };
  return (
    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-wider border rounded-sm ${colors[color]}`}>
      {tag}
    </span>
  );
};

export default function SalesDashboard() {
  const [selectedId, setSelectedId] = useState(1);
  const [outcomes, setOutcomes] = useState({});
  const [filter, setFilter] = useState('all');
  const [now, setNow] = useState(new Date());
  const lead = LEADS.find(l => l.id === selectedId);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const handleOutcome = (outcome) => {
    setOutcomes(prev => ({ ...prev, [selectedId]: outcome }));
    const idx = LEADS.findIndex(l => l.id === selectedId);
    const next = LEADS.slice(idx + 1).find(l => !outcomes[l.id] && l.id !== selectedId);
    if (next) setTimeout(() => setSelectedId(next.id), 200);
  };

  const callsToday = Object.keys(outcomes).length;
  const booked = Object.values(outcomes).filter(o => o === 'booked').length;
  const interested = Object.values(outcomes).filter(o => o === 'interested').length;
  const target = 100;
  const progress = (callsToday / target) * 100;

  const visibleLeads = LEADS.filter(l => {
    if (filter === 'open') return !outcomes[l.id];
    if (filter === 'done') return outcomes[l.id];
    return true;
  });

  return (
    <>
      <style>{FONTS}</style>
      <div className="font-body min-h-screen bg-[#0a0d12] text-white antialiased">

        {/* HEADER BAR */}
        <header className="border-b border-slate-800/80 bg-[#0a0d12]/95 backdrop-blur sticky top-0 z-20">
          <div className="flex items-center justify-between px-5 py-3">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-8 h-8 border border-amber-400/60 rotate-45 flex items-center justify-center">
                    <div className="w-2 h-2 bg-amber-400 -rotate-45 pulse-dot" />
                  </div>
                </div>
                <div>
                  <div className="font-display font-bold text-base tracking-tight leading-none">VISIBLE EDGE</div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white mt-0.5">Lead Operations / CMMC</div>
                </div>
              </div>
              <div className="h-8 w-px bg-slate-800" />
              <div className="font-mono text-[11px] text-white tabular">
                <span className="text-white">DATE</span>{' '}
                <span className="text-white">{now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).toUpperCase()}</span>
                <span className="text-slate-700 mx-2">/</span>
                <span className="text-white">RUN</span>{' '}
                <span className="text-emerald-400">LIVE</span>
                <span className="inline-block ml-1.5 w-1.5 h-1.5 bg-emerald-400 rounded-full pulse-dot" />
              </div>
            </div>

            <div className="flex items-center gap-5">
              <StatPill label="CALLS" value={callsToday} target={target} />
              <StatPill label="INTEREST" value={interested} accent="blue" />
              <StatPill label="BOOKED" value={booked} accent="green" />
              <div className="h-8 w-px bg-slate-800" />
              <div className="flex items-center gap-2 px-2.5 py-1 border border-slate-800 rounded">
                <div className="w-6 h-6 bg-gradient-to-br from-amber-400 to-amber-600 rounded-sm flex items-center justify-center font-display text-xs font-bold text-slate-900">JD</div>
                <div className="text-[11px] leading-none">
                  <div className="font-medium">J. Doyle</div>
                  <div className="font-mono text-[9px] text-white mt-0.5">SALES_REP_01</div>
                </div>
              </div>
            </div>
          </div>

          {/* progress strip */}
          <div className="px-5 pb-2 flex items-center gap-3">
            <div className="font-mono text-[9px] uppercase tracking-wider text-white">DAILY PROGRESS</div>
            <div className="flex-1 h-1 bg-slate-800/80 rounded-sm overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-500"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <div className="font-mono text-[10px] text-white tabular">
              <span className="text-white">{callsToday}</span>
              <span className="text-white">/</span>
              <span>{target}</span>
            </div>
          </div>
        </header>

        {/* MAIN GRID */}
        <div className="flex h-[calc(100vh-92px)]">

          {/* LEFT: QUEUE */}
          <aside className="w-[360px] border-r border-slate-800/80 flex flex-col bg-[#0d1117]">
            <div className="px-4 py-3 border-b border-slate-800/80">
              <div className="flex items-center justify-between mb-2.5">
                <div>
                  <div className="font-display text-sm font-semibold tracking-tight">TODAY'S QUEUE</div>
                  <div className="font-mono text-[9px] uppercase tracking-wider text-white mt-0.5">
                    {LEADS.length} leads · ML scored · {LEADS.filter(l => l.priorityScore >= 85).length} high-priority
                  </div>
                </div>
                <button className="p-1.5 hover:bg-slate-800 rounded transition-colors">
                  <Search size={13} className="text-white" />
                </button>
              </div>
              <div className="flex gap-1">
                {[['all', 'All'], ['open', 'Open'], ['done', 'Done']].map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setFilter(key)}
                    className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-sm transition-colors ${
                      filter === key
                        ? 'bg-slate-700 text-white'
                        : 'text-white hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-thin">
              {visibleLeads.map((l, i) => {
                const isSelected = l.id === selectedId;
                const outcome = outcomes[l.id];
                return (
                  <button
                    key={l.id}
                    onClick={() => setSelectedId(l.id)}
                    className={`w-full text-left px-4 py-3 border-b border-slate-800/60 transition-colors block ${
                      isSelected
                        ? 'bg-amber-500/[0.06] border-l-2 border-l-amber-400'
                        : 'hover:bg-slate-800/30 border-l-2 border-l-transparent'
                    } ${outcome ? 'opacity-50' : ''}`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="font-mono text-[10px] tabular text-white">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <div className="flex items-center gap-1.5">
                        {outcome && <CheckCircle2 size={11} className="text-emerald-400" />}
                        <UrgencyBadge tag={l.urgencyTag} color={l.urgencyColor} />
                      </div>
                    </div>
                    <div className={`font-display text-[13px] font-semibold leading-tight mb-1 ${isSelected ? 'text-amber-200' : 'text-white'}`}>
                      {l.company}
                    </div>
                    <div className="font-mono text-[10px] text-white mb-2 tabular">
                      {l.city}, {l.state} · {l.employees} EMP · {fmtMoney(l.dodObligation)} DoD
                    </div>
                    <PriorityBar score={l.priorityScore} />
                  </button>
                );
              })}
            </div>

            <div className="border-t border-slate-800/80 px-4 py-2.5 bg-[#0a0d12]">
              <div className="flex items-center justify-between font-mono text-[10px] text-white">
                <span>QUEUE REFRESH</span>
                <span className="text-white tabular">06:47 AM MT</span>
              </div>
            </div>
          </aside>

          {/* CENTER: DOSSIER */}
          <main className="flex-1 overflow-y-auto scrollbar-thin">
            {lead && (
              <div key={lead.id} className="fade-in">

                {/* COMPANY HEADER */}
                <div className="px-7 pt-6 pb-5 border-b border-slate-800/80">
                  <div className="flex items-start justify-between gap-6 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <UrgencyBadge tag={lead.urgencyTag} color={lead.urgencyColor} />
                        <span className="font-mono text-[9px] uppercase tracking-wider text-white">PRIORITY</span>
                        <span className="font-mono text-[10px] tabular text-amber-300">{lead.priorityScore}/100</span>
                      </div>
                      <h1 className="font-display text-2xl font-bold tracking-tight text-white leading-tight mb-1.5">
                        {lead.company}
                      </h1>
                      <div className="flex items-center gap-4 font-mono text-[11px] text-white tabular">
                        <span className="flex items-center gap-1.5"><MapPin size={11} className="text-white"/>{lead.city}, {lead.state}</span>
                        <span className="flex items-center gap-1.5"><Users size={11} className="text-white"/>{lead.employees} employees</span>
                        <span className="flex items-center gap-1.5"><Briefcase size={11} className="text-white"/>NAICS {lead.naics}</span>
                        <span className="text-white">·</span>
                        <span className="text-white">{lead.naicsLabel}</span>
                      </div>
                      <div className="flex items-center gap-4 font-mono text-[10px] text-white tabular mt-1.5">
                        <span>CAGE {lead.cage}</span>
                        <span>UEI {lead.uei}</span>
                      </div>
                    </div>
                  </div>

                  {/* DoD strip */}
                  <div className="grid grid-cols-3 gap-0 border border-slate-800 rounded">
                    <Metric label="DoD OBLIGATION" value={fmtMoney(lead.dodObligation)} sub="36 mo total" emphasis />
                    <Metric label="CONTRACTS" value={lead.contractCount} sub="prime + sub" />
                    <Metric label="LAST AWARD" value={lead.lastAward} sub="active" />
                  </div>
                </div>

                {/* WHY THIS LEAD */}
                <Section icon={<Target size={13}/>} label="WHY THIS LEAD NOW" accent="amber">
                  <div className="text-white leading-relaxed text-[13.5px]">
                    {lead.rationale}
                  </div>
                  <div className="mt-3 flex items-start gap-2 px-3 py-2 bg-amber-500/[0.05] border border-amber-500/20 rounded">
                    <Shield size={13} className="text-amber-400 mt-0.5 shrink-0"/>
                    <div className="text-[12px]">
                      <span className="font-mono uppercase tracking-wider text-[9px] text-amber-400/80">CMMC GAP</span>
                      <div className="text-white mt-0.5">{lead.cmmcGap}</div>
                    </div>
                  </div>
                </Section>

                {/* CONTRACTS */}
                <Section icon={<FileText size={13}/>} label="DOD CONTRACT HISTORY" accent="slate">
                  <div className="border border-slate-800 rounded overflow-hidden">
                    <div className="grid grid-cols-12 px-3 py-1.5 bg-slate-800/40 font-mono text-[9px] uppercase tracking-wider text-white">
                      <div className="col-span-3">Agency</div>
                      <div className="col-span-5">Description</div>
                      <div className="col-span-2 text-right">Value</div>
                      <div className="col-span-2 text-right">Date</div>
                    </div>
                    {lead.contracts.map((c, i) => (
                      <div key={i} className="grid grid-cols-12 px-3 py-2 border-t border-slate-800/60 font-mono text-[11px] tabular hover:bg-slate-800/20 transition-colors">
                        <div className="col-span-3 text-white">{c.agency}</div>
                        <div className="col-span-5 text-white">{c.desc}</div>
                        <div className="col-span-2 text-right text-white">{fmtMoney(c.value)}</div>
                        <div className="col-span-2 text-right text-white">{c.date}</div>
                      </div>
                    ))}
                  </div>
                </Section>

                {/* DECISION MAKERS */}
                <Section icon={<Users size={13}/>} label="DECISION MAKERS" accent="slate">
                  <div className="space-y-2">
                    {lead.contacts.map((c, i) => (
                      <div key={i} className={`border rounded p-3 ${c.primary ? 'border-amber-500/30 bg-amber-500/[0.03]' : 'border-slate-800 bg-slate-900/40'}`}>
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-display font-semibold text-[14px] text-white">{c.name}</span>
                              {c.primary && <span className="font-mono text-[8px] uppercase tracking-wider px-1.5 py-0.5 bg-amber-500/20 text-amber-300 rounded-sm">PRIMARY</span>}
                            </div>
                            <div className="text-[11.5px] text-white mt-0.5">{c.title}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-mono text-[9px] uppercase tracking-wider text-white">AUTHORITY</div>
                            <div className="font-mono text-[13px] tabular text-amber-300 font-semibold">{c.authority}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 font-mono text-[11px] tabular">
                          <a href={`tel:${c.phone}`} className="flex items-center gap-1.5 text-white hover:text-amber-300 transition-colors">
                            <Phone size={11}/>{c.phone}
                          </a>
                          <span className="text-slate-700">·</span>
                          <a href={`mailto:${c.email}`} className="flex items-center gap-1.5 text-white hover:text-amber-300 transition-colors">
                            <Mail size={11}/>{c.email}
                          </a>
                          <span className="text-slate-700">·</span>
                          <a href="#" className="flex items-center gap-1.5 text-white hover:text-amber-300 transition-colors">
                            <Linkedin size={11}/>LinkedIn
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </Section>

                {/* OPENER */}
                <Section icon={<MessageSquare size={13}/>} label="SUGGESTED OPENER" accent="green">
                  <div className="border border-emerald-500/20 bg-emerald-500/[0.04] rounded p-4">
                    <div className="text-white leading-relaxed text-[13.5px] italic font-body">
                      "{lead.opener}"
                    </div>
                    <div className="mt-3 pt-3 border-t border-emerald-500/15 flex items-center justify-between">
                      <div className="font-mono text-[9px] uppercase tracking-wider text-emerald-400/70">
                        AI generated · Claude · {now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} 06:42
                      </div>
                      <button className="font-mono text-[10px] uppercase tracking-wider text-white hover:text-white flex items-center gap-1 transition-colors">
                        Regenerate <Zap size={10}/>
                      </button>
                    </div>
                  </div>
                </Section>

                {/* OBJECTIONS */}
                {lead.objections && lead.objections.length > 0 && (
                  <Section icon={<AlertTriangle size={13}/>} label="OBJECTION HANDLERS" accent="slate">
                    <div className="space-y-2">
                      {lead.objections.map((o, i) => (
                        <div key={i} className="border border-slate-800 bg-slate-900/30 rounded p-3">
                          <div className="font-mono text-[11px] text-white mb-1.5">{o.trigger}</div>
                          <div className="text-[12.5px] text-white leading-relaxed pl-3 border-l-2 border-slate-700">{o.response}</div>
                        </div>
                      ))}
                    </div>
                  </Section>
                )}

                {/* spacer for action bar */}
                <div className="h-24"/>
              </div>
            )}
          </main>
        </div>

        {/* OUTCOME ACTION BAR */}
        <div className="fixed bottom-0 left-[360px] right-0 border-t border-slate-800 bg-[#0a0d12]/95 backdrop-blur z-30">
          <div className="flex items-center justify-between px-7 py-3">
            <div className="font-mono text-[10px] uppercase tracking-wider text-white">
              LOG OUTCOME
              <span className="text-slate-700 mx-2">·</span>
              <span className="text-white">Press 1-7 or click</span>
            </div>
            <div className="flex items-center gap-1.5">
              <OutcomeBtn onClick={() => handleOutcome('no_answer')} kbd="1" label="No Answer" current={outcomes[selectedId] === 'no_answer'}/>
              <OutcomeBtn onClick={() => handleOutcome('voicemail')} kbd="2" label="Voicemail" current={outcomes[selectedId] === 'voicemail'} icon={<Voicemail size={11}/>}/>
              <OutcomeBtn onClick={() => handleOutcome('not_interested')} kbd="3" label="Not Interested" current={outcomes[selectedId] === 'not_interested'} variant="dim"/>
              <OutcomeBtn onClick={() => handleOutcome('interested')} kbd="4" label="Interested" current={outcomes[selectedId] === 'interested'} variant="info"/>
              <OutcomeBtn onClick={() => handleOutcome('booked')} kbd="5" label="BOOKED" current={outcomes[selectedId] === 'booked'} variant="primary"/>
              <OutcomeBtn onClick={() => handleOutcome('not_qualified')} kbd="6" label="DQ" current={outcomes[selectedId] === 'not_qualified'} variant="dim"/>
              <OutcomeBtn onClick={() => handleOutcome('closed')} kbd="7" label="CLOSED" current={outcomes[selectedId] === 'closed'} variant="success"/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const StatPill = ({ label, value, target, accent }) => {
  const colors = {
    blue: 'text-blue-300',
    green: 'text-emerald-300',
    default: 'text-white'
  };
  return (
    <div className="flex items-baseline gap-2">
      <div className="font-mono text-[9px] uppercase tracking-wider text-white">{label}</div>
      <div className={`font-display text-base font-bold tabular ${accent ? colors[accent] : colors.default}`}>
        {value}
        {target && <span className="text-white font-normal text-[11px]">/{target}</span>}
      </div>
    </div>
  );
};

const Section = ({ icon, label, accent, children }) => {
  const accents = {
    amber: 'text-amber-400',
    green: 'text-emerald-400',
    slate: 'text-white'
  };
  return (
    <section className="px-7 py-5 border-b border-slate-800/60">
      <div className="flex items-center gap-2 mb-3">
        <span className={accents[accent] || accents.slate}>{icon}</span>
        <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-white font-medium">{label}</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-slate-800 to-transparent ml-2"/>
      </div>
      {children}
    </section>
  );
};

const Metric = ({ label, value, sub, emphasis }) => (
  <div className={`px-4 py-3 border-r border-slate-800 last:border-r-0 ${emphasis ? 'bg-slate-900/40' : ''}`}>
    <div className="font-mono text-[9px] uppercase tracking-wider text-white mb-1">{label}</div>
    <div className={`font-display font-bold tabular ${emphasis ? 'text-amber-300 text-xl' : 'text-white text-lg'}`}>{value}</div>
    {sub && <div className="font-mono text-[9px] text-white mt-0.5">{sub}</div>}
  </div>
);

const OutcomeBtn = ({ onClick, kbd, label, current, variant = 'default', icon }) => {
  const variants = {
    default: current ? 'bg-slate-700 text-white border-slate-600' : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-white',
    dim: current ? 'bg-slate-800 text-white border-slate-700' : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-white',
    info: current ? 'bg-blue-500/30 text-blue-200 border-blue-500/50' : 'bg-slate-900 hover:bg-blue-500/10 border-slate-700 hover:border-blue-500/40 text-white hover:text-blue-300',
    primary: current ? 'bg-amber-500 text-slate-900 border-amber-400' : 'bg-amber-500/15 hover:bg-amber-500/25 border-amber-500/40 text-amber-200 hover:text-amber-100 font-semibold',
    success: current ? 'bg-emerald-500 text-slate-900 border-emerald-400 font-semibold' : 'bg-emerald-500/15 hover:bg-emerald-500/25 border-emerald-500/40 text-emerald-200 hover:text-emerald-100 font-semibold'
  };
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-2 border rounded text-[11px] font-mono uppercase tracking-wider transition-all ${variants[variant]}`}
    >
      <span className="font-mono text-[9px] opacity-60 tabular">{kbd}</span>
      {icon}
      <span>{label}</span>
    </button>
  );
};
