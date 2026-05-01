export type FunnelTone = "cool" | "amber" | "green";

export const FUNNEL: { name: string; count: number; sub: string; tone: FunnelTone }[] = [
  { name: "TARGETS UNIVERSE", count: 15247, sub: "Filtered DoD contractors", tone: "cool" },
  { name: "ENRICHED", count: 1847, sub: "Decision-makers verified", tone: "cool" },
  { name: "DELIVERED TO REP", count: 234, sub: "In daily call queues", tone: "amber" },
  { name: "CONTACTED", count: 189, sub: "Calls + voicemails sent", tone: "amber" },
  { name: "CONVERSATIONS", count: 47, sub: "Decision-maker reached", tone: "amber" },
  { name: "BOOKED MEETINGS", count: 12, sub: "Discovery scheduled", tone: "green" },
  { name: "CLOSED WON", count: 3, sub: "Contracts signed", tone: "green" },
];

export const PIPELINE: { d: number; v: number }[] = [
  { d: 1, v: 0 }, { d: 2, v: 25 }, { d: 3, v: 25 }, { d: 4, v: 65 },
  { d: 5, v: 80 }, { d: 6, v: 80 }, { d: 7, v: 95 }, { d: 8, v: 130 },
  { d: 9, v: 145 }, { d: 10, v: 145 }, { d: 11, v: 180 }, { d: 12, v: 195 },
  { d: 13, v: 220 }, { d: 14, v: 240 }, { d: 15, v: 240 }, { d: 16, v: 260 },
  { d: 17, v: 290 }, { d: 18, v: 310 }, { d: 19, v: 310 }, { d: 20, v: 340 },
  { d: 21, v: 365 }, { d: 22, v: 380 }, { d: 23, v: 395 }, { d: 24, v: 420 },
  { d: 25, v: 445 }, { d: 26, v: 460 }, { d: 27, v: 475 }, { d: 28, v: 487 },
  { d: 29, v: 487 }, { d: 30, v: 487 },
];

export type ActivityType = "win" | "call" | "sys";

export const ACTIVITY: { t: string; type: ActivityType; text: string; meta: string }[] = [
  { t: "10:47", type: "win", text: "Discovery booked: Apex Precision Aerospace", meta: "Aug 12 · 11:00 AM" },
  { t: "10:23", type: "sys", text: "47 dossiers generated for next queue", meta: "Sonnet 4.7 · cost $4.20" },
  { t: "09:58", type: "call", text: "Voicemail left: Helix Engineering Group", meta: "C. Wu, CISO" },
  { t: "09:34", type: "call", text: "Conversation: Cipher Defense IT", meta: "12 min · objection: timing" },
  { t: "09:12", type: "sys", text: "Universe refresh — 47 new entities added", meta: "SAM.gov delta" },
  { t: "08:47", type: "win", text: "Discovery booked: Ironhall Tactical Systems", meta: "Aug 11 · 2:00 PM" },
  { t: "07:00", type: "sys", text: "Daily queue scored & locked — 100 leads", meta: "ML model v2.4" },
  { t: "00:12", type: "sys", text: "Model refit complete — AUC 0.74", meta: "+247 new outcomes" },
];

export type SystemStatus = "green" | "amber" | "red" | "grey";

export const SYSTEMS: { name: string; status: SystemStatus; last: string; detail: string }[] = [
  { name: "Universe Builder", status: "green", last: "2h ago", detail: "Ran 04:00 MT" },
  { name: "Enrichment Pipeline", status: "green", last: "1h ago", detail: "847 verified" },
  { name: "Dossier Engine", status: "green", last: "3h ago", detail: "47 generated" },
  { name: "NeonDB", status: "green", last: "live", detail: "12% capacity" },
  { name: "Apollo / Clay", status: "green", last: "live", detail: "38K credits" },
  { name: "Claude API", status: "green", last: "live", detail: "No limits" },
  { name: "Smartlead", status: "amber", last: "live", detail: "Warmup 73%" },
  { name: "PhoneBurner", status: "green", last: "live", detail: "Rep online" },
];

export const COST_MTD = {
  spent: 1847,
  budget: 3000,
  perLead: 0.42,
  perMeeting: 154,
  perClose: 615,
} as const;

export const ML = {
  phase: "Heuristic + Logistic",
  samples: 3247,
  auc: 0.74,
  lastRefit: "12:00 AM",
  topFeatures: [
    { f: "DoD obligation × NAICS", w: 0.23 },
    { f: "Recompete proximity", w: 0.19 },
    { f: "Decision-maker authority", w: 0.16 },
    { f: "Contract velocity", w: 0.14 },
  ],
} as const;

export const REP = {
  callsToday: 67,
  callsTarget: 100,
  callsWeek: 312,
  conversionsWeek: 84,
  bookingsWeek: 8,
  bookingsMonth: 12,
  pipelineMonth: 487,
} as const;

export const NAICS_PERF: { code: string; label: string; meetings: number; rate: number }[] = [
  { code: "336412", label: "Aircraft Parts Mfg", meetings: 4, rate: 8.2 },
  { code: "541512", label: "Computer Systems", meetings: 3, rate: 6.8 },
  { code: "541330", label: "Engineering Svc", meetings: 2, rate: 5.4 },
  { code: "332710", label: "Machine Shops", meetings: 2, rate: 4.9 },
  { code: "336611", label: "Ship Building", meetings: 1, rate: 3.1 },
];
