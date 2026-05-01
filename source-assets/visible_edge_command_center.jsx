import React, { useState, useEffect } from 'react';
import {
  ArrowUp, ArrowDown, Phone, Calendar, Sparkles, TrendingUp,
  DollarSign, Activity, Target
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
.tabular { font-variant-numeric: tabular-nums; }

@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
.pulse-dot { animation: pulse-dot 1.8s ease-in-out infinite; }

@keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
.fade-in { animation: fadeIn 240ms ease-out; }

.scrollbar-thin::-webkit-scrollbar { width: 6px; }
.scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
.scrollbar-thin::-webkit-scrollbar-thumb { background: #2a2f38; border-radius: 3px; }
.scrollbar-thin::-webkit-scrollbar-thumb:hover { background: #3a4048; }
`;

const FUNNEL = [
  { name: 'TARGETS UNIVERSE', count: 15247, sub: 'Filtered DoD contractors', tone: 'cool' },
  { name: 'ENRICHED', count: 1847, sub: 'Decision-makers verified', tone: 'cool' },
  { name: 'DELIVERED TO REP', count: 234, sub: 'In daily call queues', tone: 'amber' },
  { name: 'CONTACTED', count: 189, sub: 'Calls + voicemails sent', tone: 'amber' },
  { name: 'CONVERSATIONS', count: 47, sub: 'Decision-maker reached', tone: 'amber' },
  { name: 'BOOKED MEETINGS', count: 12, sub: 'Discovery scheduled', tone: 'green' },
  { name: 'CLOSED WON', count: 3, sub: 'Contracts signed', tone: 'green' }
];

const PIPELINE = [
  { d: 1, v: 0 }, { d: 2, v: 25 }, { d: 3, v: 25 }, { d: 4, v: 65 },
  { d: 5, v: 80 }, { d: 6, v: 80 }, { d: 7, v: 95 }, { d: 8, v: 130 },
  { d: 9, v: 145 }, { d: 10, v: 145 }, { d: 11, v: 180 }, { d: 12, v: 195 },
  { d: 13, v: 220 }, { d: 14, v: 240 }, { d: 15, v: 240 }, { d: 16, v: 260 },
  { d: 17, v: 290 }, { d: 18, v: 310 }, { d: 19, v: 310 }, { d: 20, v: 340 },
  { d: 21, v: 365 }, { d: 22, v: 380 }, { d: 23, v: 395 }, { d: 24, v: 420 },
  { d: 25, v: 445 }, { d: 26, v: 460 }, { d: 27, v: 475 }, { d: 28, v: 487 },
  { d: 29, v: 487 }, { d: 30, v: 487 }
];

const ACTIVITY = [
  { t: '10:47', type: 'win', text: "Discovery booked: Apex Precision Aerospace", meta: 'Aug 12 · 11:00 AM' },
  { t: '10:23', type: 'sys', text: "47 dossiers generated for next queue", meta: 'Sonnet 4.7 · cost $4.20' },
  { t: '09:58', type: 'call', text: "Voicemail left: Helix Engineering Group", meta: 'C. Wu, CISO' },
  { t: '09:34', type: 'call', text: "Conversation: Cipher Defense IT", meta: '12 min · objection: timing' },
  { t: '09:12', type: 'sys', text: "Universe refresh — 47 new entities added", meta: 'SAM.gov delta' },
  { t: '08:47', type: 'win', text: "Discovery booked: Ironhall Tactical Systems", meta: 'Aug 11 · 2:00 PM' },
  { t: '07:00', type: 'sys', text: "Daily queue scored & locked — 100 leads", meta: 'ML model v2.4' },
  { t: '00:12', type: 'sys', text: "Model refit complete — AUC 0.74", meta: '+247 new outcomes' }
];

const SYSTEMS = [
  { name: 'Universe Builder', status: 'green', last: '2h ago', detail: 'Ran 04:00 MT' },
  { name: 'Enrichment Pipeline', status: 'green', last: '1h ago', detail: '847 verified' },
  { name: 'Dossier Engine', status: 'green', last: '3h ago', detail: '47 generated' },
  { name: 'NeonDB', status: 'green', last: 'live', detail: '12% capacity' },
  { name: 'Apollo / Clay', status: 'green', last: 'live', detail: '38K credits' },
  { name: 'Claude API', status: 'green', last: 'live', detail: 'No limits' },
  { name: 'Smartlead', status: 'amber', last: 'live', detail: 'Warmup 73%' },
  { name: 'PhoneBurner', status: 'green', last: 'live', detail: 'Rep online' }
];

const COST_MTD = { spent: 1847, budget: 3000, perLead: 0.42, perMeeting: 154, perClose: 615 };

const ML = {
  phase: 'Heuristic + Logistic',
  samples: 3247,
  auc: 0.74,
  lastRefit: '12:00 AM',
  topFeatures: [
    { f: 'DoD obligation × NAICS', w: 0.23 },
    { f: 'Recompete proximity', w: 0.19 },
    { f: 'Decision-maker authority', w: 0.16 },
    { f: 'Contract velocity', w: 0.14 }
  ]
};

const REP = {
  callsToday: 67, callsTarget: 100,
  callsWeek: 312, conversionsWeek: 84,
  bookingsWeek: 8, bookingsMonth: 12,
  pipelineMonth: 487
};

const NAICS_PERF = [
  { code: '336412', label: 'Aircraft Parts Mfg', meetings: 4, rate: 8.2 },
  { code: '541512', label: 'Computer Systems', meetings: 3, rate: 6.8 },
  { code: '541330', label: 'Engineering Svc', meetings: 2, rate: 5.4 },
  { code: '332710', label: 'Machine Shops', meetings: 2, rate: 4.9 },
  { code: '336611', label: 'Ship Building', meetings: 1, rate: 3.1 }
];

// ===== COMPONENTS =====

const Dot = ({ status }) => {
  const colors = {
    green: 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]',
    amber: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]',
    red: 'bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.6)]',
    grey: 'bg-slate-500'
  };
  return <span className={`inline-block w-2 h-2 rounded-full ${colors[status]} pulse-dot`} />;
};

const KPICard = ({ label, value, sub, delta, deltaUp, accent, icon }) => (
  <div className="bg-[#0d1117] border border-slate-800 rounded p-4">
    <div className="flex items-center justify-between mb-3">
      <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white font-bold">{label}</div>
      {icon && <span className="text-amber-400/70">{icon}</span>}
    </div>
    <div className="font-display font-bold text-2xl tabular leading-none mb-2" style={{ color: accent || '#fff' }}>{value}</div>
    <div className="flex items-center justify-between">
      <span className="font-mono text-[10px] uppercase tracking-wider text-white">{sub}</span>
      {delta && (
        <span className={`font-mono text-[10px] tabular flex items-center gap-1 font-bold ${deltaUp ? 'text-emerald-400' : 'text-red-400'}`}>
          {deltaUp ? <ArrowUp size={9}/> : <ArrowDown size={9}/>} {delta}
        </span>
      )}
    </div>
  </div>
);

const FunnelStage = ({ stage, idx, max, nextPct }) => {
  const widthPct = (Math.log(stage.count + 1) / Math.log(max + 1)) * 100;
  const styles = {
    cool: { bar: 'bg-slate-600/30 border-slate-500/40', text: 'text-white' },
    amber: { bar: 'bg-amber-500/25 border-amber-500/50', text: 'text-amber-300' },
    green: { bar: 'bg-emerald-500/30 border-emerald-500/55', text: 'text-emerald-300' }
  };
  const s = styles[stage.tone];

  return (
    <div>
      <div className="grid grid-cols-12 gap-3 items-center py-2">
        <div className="col-span-3">
          <div className="font-mono text-[10px] uppercase tracking-wider text-white font-bold">{stage.name}</div>
          <div className="text-[10px] text-white mt-0.5">{stage.sub}</div>
        </div>
        <div className="col-span-7 relative h-7">
          <div className="absolute inset-y-0 left-0 right-0 bg-slate-900/50 rounded-sm" />
          <div className={`absolute inset-y-0 left-0 ${s.bar} border rounded-sm`} style={{ width: `${widthPct}%` }} />
        </div>
        <div className="col-span-2 text-right">
          <div className={`font-display font-bold text-base tabular ${s.text}`}>{stage.count.toLocaleString()}</div>
        </div>
      </div>
      {idx < FUNNEL.length - 1 && (
        <div className="grid grid-cols-12 gap-3 -mt-1 mb-1">
          <div className="col-span-3" />
          <div className="col-span-7 flex items-center gap-2">
            <ArrowDown size={9} className="text-amber-400/70" />
            <span className="font-mono text-[9px] tabular text-amber-300 font-bold">{nextPct.toFixed(1)}% conversion</span>
          </div>
          <div className="col-span-2" />
        </div>
      )}
    </div>
  );
};

const PipelineTrend = () => {
  const w = 600, h = 140, pad = 20;
  const max = Math.max(...PIPELINE.map(p => p.v));
  const points = PIPELINE.map((p, i) => {
    const x = pad + (i / (PIPELINE.length - 1)) * (w - 2 * pad);
    const y = h - pad - (p.v / max) * (h - 2 * pad);
    return [x, y];
  });
  const pathStr = points.map((p, i) => i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`).join(' ');
  const lastPt = points[points.length - 1];
  const areaPath = pathStr + ` L${lastPt[0]},${h - pad} L${points[0][0]},${h - pad} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="w-full h-32">
      <defs>
        <linearGradient id="pipeGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.45"/>
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0"/>
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((g, i) => (
        <line key={i} x1={pad} y1={h - pad - g * (h - 2*pad)} x2={w - pad} y2={h - pad - g * (h - 2*pad)} stroke="#1e2530" strokeDasharray="2,3"/>
      ))}
      <path d={areaPath} fill="url(#pipeGrad)" />
      <path d={pathStr} stroke="#fbbf24" strokeWidth="2" fill="none" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={lastPt[0]} cy={lastPt[1]} r="8" fill="#fbbf24" fillOpacity="0.25" />
      <circle cx={lastPt[0]} cy={lastPt[1]} r="4" fill="#fbbf24" />
    </svg>
  );
};

const ActivityRow = ({ item }) => {
  const types = {
    win: { color: 'text-emerald-300', bg: 'bg-emerald-500/15 border-emerald-500/40' },
    call: { color: 'text-blue-300', bg: 'bg-blue-500/15 border-blue-500/40' },
    sys: { color: 'text-amber-300', bg: 'bg-amber-500/10 border-amber-500/30' }
  };
  const t = types[item.type];
  return (
    <div className="flex items-start gap-3 py-2 border-b border-slate-800/60 last:border-0">
      <div className={`mt-0.5 px-2 py-0.5 ${t.bg} border rounded font-mono text-[9px] tabular ${t.color} font-bold whitespace-nowrap`}>
        {item.t}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[12px] text-white leading-snug font-medium">{item.text}</div>
        <div className="font-mono text-[9.5px] text-white mt-0.5">{item.meta}</div>
      </div>
    </div>
  );
};

// ===== MAIN =====

export default function CommandCenter() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const maxCount = Math.max(...FUNNEL.map(s => s.count));

  return (
    <>
      <style>{FONTS}</style>
      <div className="font-body min-h-screen bg-[#0a0d12] text-white antialiased">

        {/* HEADER */}
        <header className="border-b border-slate-800 bg-[#0a0d12]/95 backdrop-blur sticky top-0 z-20">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-9 h-9 border border-amber-400/60 rotate-45 flex items-center justify-center">
                    <div className="w-2 h-2 bg-amber-400 -rotate-45 pulse-dot" />
                  </div>
                </div>
                <div>
                  <div className="font-display font-bold text-base tracking-tight leading-none">VISIBLE EDGE</div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-amber-400 mt-0.5 font-bold">Command Center / Owner View</div>
                </div>
              </div>
              <div className="h-8 w-px bg-slate-800" />
              <div className="font-mono text-[11px] tabular">
                <span className="text-white font-bold">DATE</span>{' '}
                <span className="font-bold">{now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).toUpperCase()}</span>
                <span className="text-slate-700 mx-2">/</span>
                <span className="text-white font-bold">TIME</span>{' '}
                <span className="font-bold">{now.toLocaleTimeString('en-US', { hour12: false }).slice(0,5)} MT</span>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-[11px] font-bold">
                <Dot status="green"/> ALL SYSTEMS LIVE
              </div>
              <div className="h-8 w-px bg-slate-800" />
              <div className="flex items-center gap-2 px-2.5 py-1 border border-slate-800 rounded">
                <div className="w-7 h-7 bg-gradient-to-br from-amber-400 to-amber-600 rounded-sm flex items-center justify-center font-display text-xs font-bold text-slate-900">JR</div>
                <div className="text-[11px] leading-none">
                  <div className="font-bold">James R.</div>
                  <div className="font-mono text-[9px] text-amber-400 mt-0.5 font-bold">OWNER</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* KPI STRIP */}
        <div className="grid grid-cols-5 gap-3 px-6 py-4">
          <KPICard label="Calls Today" value={`${REP.callsToday}/${REP.callsTarget}`} sub="67% of target" delta="+12" deltaUp icon={<Phone size={13}/>} />
          <KPICard label="Booked Today" value="3" sub="vs avg 2.1" delta="+43%" deltaUp accent="#34d399" icon={<Calendar size={13}/>} />
          <KPICard label="Interest Rate" value="18%" sub="last 7 days" delta="+2.4%" deltaUp icon={<Sparkles size={13}/>} />
          <KPICard label="Pipeline MTD" value="$487K" sub="12 booked mtgs" delta="+$42K" deltaUp accent="#fbbf24" icon={<TrendingUp size={13}/>} />
          <KPICard label="Closed MTD" value="$87K" sub="3 contracts" delta="+$45K" deltaUp accent="#34d399" icon={<DollarSign size={13}/>} />
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-12 gap-4 px-6 pb-6">

          {/* LEFT */}
          <div className="col-span-8 space-y-4">

            {/* FUNNEL */}
            <div className="bg-[#0d1117] border border-slate-800 rounded">
              <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800">
                <div>
                  <div className="font-display font-bold text-sm">CONVERSION FUNNEL</div>
                  <div className="font-mono text-[9px] uppercase tracking-wider text-amber-400 mt-0.5 font-bold">Month to Date · Apr 2026</div>
                </div>
                <div className="flex items-center gap-1">
                  <button className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-sm bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold">MTD</button>
                  <button className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-sm text-white hover:bg-slate-800 font-bold">7D</button>
                  <button className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-sm text-white hover:bg-slate-800 font-bold">QTD</button>
                </div>
              </div>
              <div className="p-5">
                {FUNNEL.map((stage, i) => (
                  <FunnelStage
                    key={i}
                    stage={stage}
                    idx={i}
                    max={maxCount}
                    nextPct={i < FUNNEL.length - 1 ? (FUNNEL[i+1].count / stage.count) * 100 : 0}
                  />
                ))}
              </div>
            </div>

            {/* PIPELINE TREND */}
            <div className="bg-[#0d1117] border border-slate-800 rounded">
              <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800">
                <div>
                  <div className="font-display font-bold text-sm">PIPELINE ACCUMULATION</div>
                  <div className="font-mono text-[9px] uppercase tracking-wider text-amber-400 mt-0.5 font-bold">Daily · 30-Day Window</div>
                </div>
                <div className="text-right">
                  <div className="font-display font-bold text-xl tabular text-amber-400">$487K</div>
                  <div className="font-mono text-[9px] uppercase tracking-wider text-emerald-400 font-bold mt-0.5">+$42K vs Prev 30D</div>
                </div>
              </div>
              <div className="p-4">
                <PipelineTrend/>
                <div className="grid grid-cols-4 gap-2 mt-3 pt-3 border-t border-slate-800/80">
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-wider text-white font-bold">Best Day</div>
                    <div className="font-display font-bold text-sm tabular mt-0.5">$45K</div>
                  </div>
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-wider text-white font-bold">Avg / Day</div>
                    <div className="font-display font-bold text-sm tabular mt-0.5">$16K</div>
                  </div>
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-wider text-white font-bold">Run Rate</div>
                    <div className="font-display font-bold text-sm tabular mt-0.5">$487K</div>
                  </div>
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-wider text-white font-bold">vs Goal</div>
                    <div className="font-display font-bold text-sm tabular text-emerald-400 mt-0.5">+38%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* SALES REP CARD */}
            <div className="bg-[#0d1117] border border-slate-800 rounded">
              <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800">
                <div>
                  <div className="font-display font-bold text-sm">SALES REP / J. DOYLE</div>
                  <div className="font-mono text-[9px] uppercase tracking-wider text-amber-400 mt-0.5 font-bold">Performance · Last 7 Days</div>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 font-bold">
                  <Dot status="green"/> ON TARGET
                </span>
              </div>
              <div className="grid grid-cols-2 gap-0">
                <div className="p-5 border-r border-slate-800 space-y-4">
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-wider text-white font-bold mb-1">Calls / 7 Days</div>
                    <div className="flex items-baseline gap-2">
                      <div className="font-display font-bold text-2xl tabular">{REP.callsWeek}</div>
                      <div className="font-mono text-[10px] tabular text-emerald-400 font-bold">+18%</div>
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-wider text-white font-bold mb-1">Conversations</div>
                    <div className="flex items-baseline gap-2">
                      <div className="font-display font-bold text-2xl tabular">{REP.conversionsWeek}</div>
                      <div className="font-mono text-[10px] tabular text-white font-bold">26.9% of calls</div>
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-wider text-white font-bold mb-1">Meetings Booked</div>
                    <div className="flex items-baseline gap-2">
                      <div className="font-display font-bold text-2xl tabular text-amber-400">{REP.bookingsWeek}</div>
                      <div className="font-mono text-[10px] tabular text-emerald-400 font-bold">+33%</div>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="font-mono text-[9px] uppercase tracking-wider text-white font-bold mb-3">Top Converting NAICS</div>
                  <div className="space-y-2.5">
                    {NAICS_PERF.map((n, i) => (
                      <div key={i} className="flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="font-mono text-[9px] tabular text-amber-400 font-bold">{n.code}</span>
                          <span className="text-white truncate">{n.label}</span>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="font-mono text-[10px] tabular text-amber-300 font-bold">{n.meetings} mtg</span>
                          <span className="font-mono text-[10px] tabular text-white font-bold">{n.rate}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT */}
          <div className="col-span-4 space-y-4">

            {/* SYSTEM HEALTH */}
            <div className="bg-[#0d1117] border border-slate-800 rounded">
              <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                <div className="font-display font-bold text-sm">SYSTEM HEALTH</div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-400 font-bold">8/8 OK</span>
              </div>
              <div className="p-1">
                {SYSTEMS.map((s, i) => (
                  <div key={i} className="flex items-center justify-between px-3 py-2 hover:bg-slate-800/30 rounded-sm">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Dot status={s.status}/>
                      <div className="min-w-0">
                        <div className="text-[12px] font-bold truncate">{s.name}</div>
                        <div className="font-mono text-[9px] text-white mt-0.5">{s.detail}</div>
                      </div>
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-white shrink-0 font-bold">{s.last}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* COST TRACKER */}
            <div className="bg-[#0d1117] border border-slate-800 rounded">
              <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                <div className="font-display font-bold text-sm">COST TRACKER</div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-amber-400 font-bold">MTD</span>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-white font-bold">Burn / Budget</span>
                    <div>
                      <span className="font-display font-bold text-base tabular">${COST_MTD.spent.toLocaleString()}</span>
                      <span className="font-mono text-[10px] text-white ml-1 font-bold">/ ${COST_MTD.budget.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-sm overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-500 to-amber-400" style={{ width: `${(COST_MTD.spent / COST_MTD.budget) * 100}%` }}/>
                  </div>
                  <div className="font-mono text-[9px] tabular text-white mt-1.5 font-bold">{((COST_MTD.spent / COST_MTD.budget) * 100).toFixed(0)}% USED · 2 DAYS LEFT IN MONTH</div>
                </div>
                <div className="pt-3 border-t border-slate-800/80 grid grid-cols-3 gap-3">
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-wider text-white font-bold mb-1">/ Lead</div>
                    <div className="font-display font-bold text-base tabular">${COST_MTD.perLead}</div>
                  </div>
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-wider text-white font-bold mb-1">/ Mtg</div>
                    <div className="font-display font-bold text-base tabular">${COST_MTD.perMeeting}</div>
                  </div>
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-wider text-white font-bold mb-1">/ Close</div>
                    <div className="font-display font-bold text-base tabular text-emerald-400">${COST_MTD.perClose}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* ML MODEL */}
            <div className="bg-[#0d1117] border border-slate-800 rounded">
              <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                <div className="font-display font-bold text-sm">ML MODEL</div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-amber-400 font-bold">v2.4</span>
              </div>
              <div className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-wider text-white font-bold mb-1">Phase</div>
                    <div className="text-[11px] font-bold">{ML.phase}</div>
                  </div>
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-wider text-white font-bold mb-1">Samples</div>
                    <div className="font-display font-bold text-sm tabular">{ML.samples.toLocaleString()}</div>
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-wider text-white font-bold mb-2">Top Features</div>
                  <div className="space-y-1.5">
                    {ML.topFeatures.map((f, i) => (
                      <div key={i} className="flex items-center justify-between text-[11px] gap-2">
                        <span className="text-white truncate">{f.f}</span>
                        <div className="flex items-center gap-2 shrink-0">
                          <div className="w-12 h-1 bg-slate-800 rounded-sm overflow-hidden">
                            <div className="h-full bg-amber-400" style={{ width: `${f.w * 100 * 4}%`, maxWidth: '100%' }}/>
                          </div>
                          <span className="font-mono text-[9px] tabular text-white font-bold w-9 text-right">{f.w.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="font-mono text-[9px] uppercase tracking-wider text-white font-bold">AUC: <span className="text-amber-400">{ML.auc}</span></div>
                  <div className="font-mono text-[9px] uppercase tracking-wider text-white font-bold">Refit: {ML.lastRefit}</div>
                </div>
              </div>
            </div>

            {/* ACTIVITY FEED */}
            <div className="bg-[#0d1117] border border-slate-800 rounded">
              <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                <div className="font-display font-bold text-sm">RECENT ACTIVITY</div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 font-bold">
                  <Dot status="green"/> LIVE
                </span>
              </div>
              <div className="p-3 max-h-80 overflow-y-auto scrollbar-thin">
                {ACTIVITY.map((a, i) => <ActivityRow key={i} item={a}/>)}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
