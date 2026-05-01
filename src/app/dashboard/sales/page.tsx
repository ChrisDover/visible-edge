"use client";

import { useState, useEffect, type ReactNode } from "react";
import Link from "next/link";
import {
  Phone, Mail, MapPin, Users, AlertTriangle, Target,
  CheckCircle2, Voicemail, MessageSquare, Shield, FileText, Zap, Briefcase,
  Search, ArrowLeft,
} from "lucide-react";
import { LEADS, type UrgencyColor } from "@/components/data/leads";
import { fmtMoney } from "@/lib/format";

type Filter = "all" | "open" | "done";
type Outcome =
  | "no_answer"
  | "voicemail"
  | "not_interested"
  | "interested"
  | "booked"
  | "not_qualified"
  | "closed";

const PriorityBar = ({ score }: { score: number }) => {
  const color =
    score >= 90
      ? "bg-amber-400"
      : score >= 80
      ? "bg-amber-500/80"
      : score >= 70
      ? "bg-blue-500/70"
      : "bg-slate-500/50";
  return (
    <div className="flex items-center gap-2">
      <div className="w-12 h-1 bg-slate-800 rounded-sm overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${score}%` }} />
      </div>
      <span className="font-mono text-[10px] tabular text-white">{score}</span>
    </div>
  );
};

const UrgencyBadge = ({ tag, color }: { tag: string; color: UrgencyColor }) => {
  const colors: Record<UrgencyColor, string> = {
    amber: "border-amber-500/40 bg-amber-500/10 text-amber-300",
    red: "border-red-500/40 bg-red-500/10 text-red-300",
    blue: "border-blue-500/40 bg-blue-500/10 text-blue-300",
    green: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-wider border rounded-sm ${colors[color]}`}
    >
      {tag}
    </span>
  );
};

const StatPill = ({
  label,
  value,
  target,
  accent,
}: {
  label: string;
  value: number;
  target?: number;
  accent?: "blue" | "green";
}) => {
  const colors = {
    blue: "text-blue-300",
    green: "text-emerald-300",
    default: "text-white",
  };
  return (
    <div className="flex items-baseline gap-2">
      <div className="font-mono text-[9px] uppercase tracking-wider text-white">{label}</div>
      <div
        className={`font-display text-base font-bold tabular ${
          accent ? colors[accent] : colors.default
        }`}
      >
        {value}
        {target && (
          <span className="text-white font-normal text-[11px]">/{target}</span>
        )}
      </div>
    </div>
  );
};

const Section = ({
  icon,
  label,
  accent,
  children,
}: {
  icon: ReactNode;
  label: string;
  accent: "amber" | "green" | "slate";
  children: ReactNode;
}) => {
  const accents = {
    amber: "text-amber-400",
    green: "text-emerald-400",
    slate: "text-white",
  };
  return (
    <section className="px-7 py-5 border-b border-slate-800/60">
      <div className="flex items-center gap-2 mb-3">
        <span className={accents[accent]}>{icon}</span>
        <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-white font-medium">
          {label}
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-slate-800 to-transparent ml-2" />
      </div>
      {children}
    </section>
  );
};

const Metric = ({
  label,
  value,
  sub,
  emphasis,
}: {
  label: string;
  value: string | number;
  sub?: string;
  emphasis?: boolean;
}) => (
  <div
    className={`px-4 py-3 border-r border-slate-800 last:border-r-0 ${
      emphasis ? "bg-slate-900/40" : ""
    }`}
  >
    <div className="font-mono text-[9px] uppercase tracking-wider text-white mb-1">{label}</div>
    <div
      className={`font-display font-bold tabular ${
        emphasis ? "text-amber-300 text-xl" : "text-white text-lg"
      }`}
    >
      {value}
    </div>
    {sub && <div className="font-mono text-[9px] text-white mt-0.5">{sub}</div>}
  </div>
);

const OutcomeBtn = ({
  onClick,
  kbd,
  label,
  current,
  variant = "default",
  icon,
}: {
  onClick: () => void;
  kbd: string;
  label: string;
  current: boolean;
  variant?: "default" | "dim" | "info" | "primary" | "success";
  icon?: ReactNode;
}) => {
  const variants = {
    default: current
      ? "bg-slate-700 text-white border-slate-600"
      : "bg-slate-900 hover:bg-slate-800 border-slate-700 text-white",
    dim: current
      ? "bg-slate-800 text-white border-slate-700"
      : "bg-slate-900 hover:bg-slate-800 border-slate-800 text-white",
    info: current
      ? "bg-blue-500/30 text-blue-200 border-blue-500/50"
      : "bg-slate-900 hover:bg-blue-500/10 border-slate-700 hover:border-blue-500/40 text-white hover:text-blue-300",
    primary: current
      ? "bg-amber-500 text-slate-900 border-amber-400"
      : "bg-amber-500/15 hover:bg-amber-500/25 border-amber-500/40 text-amber-200 hover:text-amber-100 font-semibold",
    success: current
      ? "bg-emerald-500 text-slate-900 border-emerald-400 font-semibold"
      : "bg-emerald-500/15 hover:bg-emerald-500/25 border-emerald-500/40 text-emerald-200 hover:text-emerald-100 font-semibold",
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

export default function SalesDashboard() {
  const [selectedId, setSelectedId] = useState<number>(1);
  const [outcomes, setOutcomes] = useState<Record<number, Outcome>>({});
  const [filter, setFilter] = useState<Filter>("all");
  const [now, setNow] = useState(new Date());
  const lead = LEADS.find((l) => l.id === selectedId);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const handleOutcome = (outcome: Outcome) => {
    setOutcomes((prev) => ({ ...prev, [selectedId]: outcome }));
    const idx = LEADS.findIndex((l) => l.id === selectedId);
    const next = LEADS.slice(idx + 1).find(
      (l) => !outcomes[l.id] && l.id !== selectedId
    );
    if (next) setTimeout(() => setSelectedId(next.id), 200);
  };

  const callsToday = Object.keys(outcomes).length;
  const booked = Object.values(outcomes).filter((o) => o === "booked").length;
  const interested = Object.values(outcomes).filter((o) => o === "interested").length;
  const target = 100;
  const progress = (callsToday / target) * 100;

  const visibleLeads = LEADS.filter((l) => {
    if (filter === "open") return !outcomes[l.id];
    if (filter === "done") return outcomes[l.id];
    return true;
  });

  return (
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
                <div className="font-display font-bold text-base tracking-tight leading-none">
                  VISIBLE EDGE
                </div>
                <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white mt-0.5">
                  Lead Operations / CMMC
                </div>
              </div>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div className="font-mono text-[11px] text-white tabular">
              <span className="text-white">DATE</span>{" "}
              <span className="text-white">
                {now
                  .toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
                  .toUpperCase()}
              </span>
              <span className="text-slate-700 mx-2">/</span>
              <span className="text-white">RUN</span>{" "}
              <span className="text-emerald-400">LIVE</span>
              <span className="inline-block ml-1.5 w-1.5 h-1.5 bg-emerald-400 rounded-full pulse-dot" />
            </div>
          </div>

          <div className="flex items-center gap-5">
            <Link
              href="/"
              className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-white/60 hover:text-amber-300 transition-colors"
            >
              <ArrowLeft size={11} />
              Back to Brief
            </Link>
            <div className="h-8 w-px bg-slate-800" />
            <StatPill label="CALLS" value={callsToday} target={target} />
            <StatPill label="INTEREST" value={interested} accent="blue" />
            <StatPill label="BOOKED" value={booked} accent="green" />
            <div className="h-8 w-px bg-slate-800" />
            <div className="flex items-center gap-2 px-2.5 py-1 border border-slate-800 rounded">
              <div className="w-6 h-6 bg-gradient-to-br from-amber-400 to-amber-600 rounded-sm flex items-center justify-center font-display text-xs font-bold text-slate-900">
                JD
              </div>
              <div className="text-[11px] leading-none">
                <div className="font-medium">J. Doyle</div>
                <div className="font-mono text-[9px] text-white mt-0.5">SALES_REP_01</div>
              </div>
            </div>
          </div>
        </div>

        {/* progress strip */}
        <div className="px-5 pb-2 flex items-center gap-3">
          <div className="font-mono text-[9px] uppercase tracking-wider text-white">
            DAILY PROGRESS
          </div>
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
                <div className="font-display text-sm font-semibold tracking-tight">
                  TODAY&apos;S QUEUE
                </div>
                <div className="font-mono text-[9px] uppercase tracking-wider text-white mt-0.5">
                  {LEADS.length} leads · ML scored ·{" "}
                  {LEADS.filter((l) => l.priorityScore >= 85).length} high-priority
                </div>
              </div>
              <button className="p-1.5 hover:bg-slate-800 rounded transition-colors">
                <Search size={13} className="text-white" />
              </button>
            </div>
            <div className="flex gap-1">
              {(
                [
                  ["all", "All"],
                  ["open", "Open"],
                  ["done", "Done"],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-sm transition-colors ${
                    filter === key
                      ? "bg-slate-700 text-white"
                      : "text-white hover:text-white hover:bg-slate-800/50"
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
                      ? "bg-amber-500/[0.06] border-l-2 border-l-amber-400"
                      : "hover:bg-slate-800/30 border-l-2 border-l-transparent"
                  } ${outcome ? "opacity-50" : ""}`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="font-mono text-[10px] tabular text-white">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="flex items-center gap-1.5">
                      {outcome && <CheckCircle2 size={11} className="text-emerald-400" />}
                      <UrgencyBadge tag={l.urgencyTag} color={l.urgencyColor} />
                    </div>
                  </div>
                  <div
                    className={`font-display text-[13px] font-semibold leading-tight mb-1 ${
                      isSelected ? "text-amber-200" : "text-white"
                    }`}
                  >
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
                      <span className="font-mono text-[9px] uppercase tracking-wider text-white">
                        PRIORITY
                      </span>
                      <span className="font-mono text-[10px] tabular text-amber-300">
                        {lead.priorityScore}/100
                      </span>
                    </div>
                    <h1 className="font-display text-2xl font-bold tracking-tight text-white leading-tight mb-1.5">
                      {lead.company}
                    </h1>
                    <div className="flex items-center gap-4 font-mono text-[11px] text-white tabular">
                      <span className="flex items-center gap-1.5">
                        <MapPin size={11} className="text-white" />
                        {lead.city}, {lead.state}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users size={11} className="text-white" />
                        {lead.employees} employees
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Briefcase size={11} className="text-white" />
                        NAICS {lead.naics}
                      </span>
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
              <Section icon={<Target size={13} />} label="WHY THIS LEAD NOW" accent="amber">
                <div className="text-white leading-relaxed text-[13.5px]">{lead.rationale}</div>
                <div className="mt-3 flex items-start gap-2 px-3 py-2 bg-amber-500/[0.05] border border-amber-500/20 rounded">
                  <Shield size={13} className="text-amber-400 mt-0.5 shrink-0" />
                  <div className="text-[12px]">
                    <span className="font-mono uppercase tracking-wider text-[9px] text-amber-400/80">
                      CMMC GAP
                    </span>
                    <div className="text-white mt-0.5">{lead.cmmcGap}</div>
                  </div>
                </div>
              </Section>

              {/* CONTRACTS */}
              <Section icon={<FileText size={13} />} label="DOD CONTRACT HISTORY" accent="slate">
                <div className="border border-slate-800 rounded overflow-hidden">
                  <div className="grid grid-cols-12 px-3 py-1.5 bg-slate-800/40 font-mono text-[9px] uppercase tracking-wider text-white">
                    <div className="col-span-3">Agency</div>
                    <div className="col-span-5">Description</div>
                    <div className="col-span-2 text-right">Value</div>
                    <div className="col-span-2 text-right">Date</div>
                  </div>
                  {lead.contracts.map((c, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-12 px-3 py-2 border-t border-slate-800/60 font-mono text-[11px] tabular hover:bg-slate-800/20 transition-colors"
                    >
                      <div className="col-span-3 text-white">{c.agency}</div>
                      <div className="col-span-5 text-white">{c.desc}</div>
                      <div className="col-span-2 text-right text-white">{fmtMoney(c.value)}</div>
                      <div className="col-span-2 text-right text-white">{c.date}</div>
                    </div>
                  ))}
                </div>
              </Section>

              {/* DECISION MAKERS */}
              <Section icon={<Users size={13} />} label="DECISION MAKERS" accent="slate">
                <div className="space-y-2">
                  {lead.contacts.map((c, i) => (
                    <div
                      key={i}
                      className={`border rounded p-3 ${
                        c.primary
                          ? "border-amber-500/30 bg-amber-500/[0.03]"
                          : "border-slate-800 bg-slate-900/40"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-display font-semibold text-[14px] text-white">
                              {c.name}
                            </span>
                            {c.primary && (
                              <span className="font-mono text-[8px] uppercase tracking-wider px-1.5 py-0.5 bg-amber-500/20 text-amber-300 rounded-sm">
                                PRIMARY
                              </span>
                            )}
                          </div>
                          <div className="text-[11.5px] text-white mt-0.5">{c.title}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono text-[9px] uppercase tracking-wider text-white">
                            AUTHORITY
                          </div>
                          <div className="font-mono text-[13px] tabular text-amber-300 font-semibold">
                            {c.authority}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 font-mono text-[11px] tabular">
                        <a
                          href={`tel:${c.phone}`}
                          className="flex items-center gap-1.5 text-white hover:text-amber-300 transition-colors"
                        >
                          <Phone size={11} />
                          {c.phone}
                        </a>
                        <span className="text-slate-700">·</span>
                        <a
                          href={`mailto:${c.email}`}
                          className="flex items-center gap-1.5 text-white hover:text-amber-300 transition-colors"
                        >
                          <Mail size={11} />
                          {c.email}
                        </a>
                        <span className="text-slate-700">·</span>
                        <a
                          href="#"
                          className="flex items-center gap-1.5 text-white hover:text-amber-300 transition-colors"
                        >
                          <span className="font-mono text-[9px] font-bold tracking-tight border border-white/40 rounded-sm px-1 leading-tight">in</span>
                          LinkedIn
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>

              {/* OPENER */}
              <Section icon={<MessageSquare size={13} />} label="SUGGESTED OPENER" accent="green">
                <div className="border border-emerald-500/20 bg-emerald-500/[0.04] rounded p-4">
                  <div className="text-white leading-relaxed text-[13.5px] italic font-body">
                    &ldquo;{lead.opener}&rdquo;
                  </div>
                  <div className="mt-3 pt-3 border-t border-emerald-500/15 flex items-center justify-between">
                    <div className="font-mono text-[9px] uppercase tracking-wider text-emerald-400/70">
                      AI generated · Claude ·{" "}
                      {now.toLocaleDateString("en-US", { month: "short", day: "numeric" })} 06:42
                    </div>
                    <button className="font-mono text-[10px] uppercase tracking-wider text-white hover:text-white flex items-center gap-1 transition-colors">
                      Regenerate <Zap size={10} />
                    </button>
                  </div>
                </div>
              </Section>

              {/* OBJECTIONS */}
              {lead.objections && lead.objections.length > 0 && (
                <Section
                  icon={<AlertTriangle size={13} />}
                  label="OBJECTION HANDLERS"
                  accent="slate"
                >
                  <div className="space-y-2">
                    {lead.objections.map((o, i) => (
                      <div
                        key={i}
                        className="border border-slate-800 bg-slate-900/30 rounded p-3"
                      >
                        <div className="font-mono text-[11px] text-white mb-1.5">{o.trigger}</div>
                        <div className="text-[12.5px] text-white leading-relaxed pl-3 border-l-2 border-slate-700">
                          {o.response}
                        </div>
                      </div>
                    ))}
                  </div>
                </Section>
              )}

              {/* spacer for action bar */}
              <div className="h-24" />
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
            <OutcomeBtn
              onClick={() => handleOutcome("no_answer")}
              kbd="1"
              label="No Answer"
              current={outcomes[selectedId] === "no_answer"}
            />
            <OutcomeBtn
              onClick={() => handleOutcome("voicemail")}
              kbd="2"
              label="Voicemail"
              current={outcomes[selectedId] === "voicemail"}
              icon={<Voicemail size={11} />}
            />
            <OutcomeBtn
              onClick={() => handleOutcome("not_interested")}
              kbd="3"
              label="Not Interested"
              current={outcomes[selectedId] === "not_interested"}
              variant="dim"
            />
            <OutcomeBtn
              onClick={() => handleOutcome("interested")}
              kbd="4"
              label="Interested"
              current={outcomes[selectedId] === "interested"}
              variant="info"
            />
            <OutcomeBtn
              onClick={() => handleOutcome("booked")}
              kbd="5"
              label="BOOKED"
              current={outcomes[selectedId] === "booked"}
              variant="primary"
            />
            <OutcomeBtn
              onClick={() => handleOutcome("not_qualified")}
              kbd="6"
              label="DQ"
              current={outcomes[selectedId] === "not_qualified"}
              variant="dim"
            />
            <OutcomeBtn
              onClick={() => handleOutcome("closed")}
              kbd="7"
              label="CLOSED"
              current={outcomes[selectedId] === "closed"}
              variant="success"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
