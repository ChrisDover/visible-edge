export type UrgencyColor = "amber" | "red" | "blue" | "green";

export type Contract = {
  agency: string;
  value: number;
  date: string;
  desc: string;
};

export type Contact = {
  name: string;
  title: string;
  email: string;
  phone: string;
  authority: number;
  primary?: boolean;
};

export type Objection = {
  trigger: string;
  response: string;
};

export type Lead = {
  id: number;
  company: string;
  cage: string;
  uei: string;
  city: string;
  state: string;
  employees: number;
  naics: string;
  naicsLabel: string;
  dodObligation: number;
  contractCount: number;
  lastAward: string;
  priorityScore: number;
  urgencyTag: string;
  urgencyColor: UrgencyColor;
  cmmcGap: string;
  rationale: string;
  contracts: Contract[];
  contacts: Contact[];
  opener: string;
  objections: Objection[];
};

export const LEADS: Lead[] = [
  {
    id: 1,
    company: "Apex Precision Aerospace",
    cage: "8F2K1",
    uei: "PXVQR3KL2D78",
    city: "Wichita",
    state: "KS",
    employees: 47,
    naics: "336412",
    naicsLabel: "Aircraft Engine Parts Mfg",
    dodObligation: 2840000,
    contractCount: 14,
    lastAward: "Feb 2026",
    priorityScore: 94,
    urgencyTag: "RECOMPETE Q3",
    urgencyColor: "amber",
    cmmcGap: "Likely L2 — CUI flow-down via Lockheed sub-tier",
    rationale:
      "Multi-year Air Force contract recompetes Aug 2026. Active sub-tier on F-15 program. No CMMC affirmation in SPRS. Decision-maker is owner-operator (high authority).",
    contracts: [
      { agency: "AF / AFLCMC", value: 1240000, date: "02/2026", desc: "F-15 component machining" },
      { agency: "Navy / NAVAIR", value: 890000, date: "09/2025", desc: "P-8A subassembly" },
      { agency: "DLA Aviation", value: 410000, date: "03/2025", desc: "Spare parts pool" },
    ],
    contacts: [
      { name: "Daniel Mercer", title: "President & Owner", email: "d.mercer@apexprecision.com", phone: "+1 316-555-0142", authority: 95, primary: true },
      { name: "Linda Crow", title: "Director of Operations", email: "lcrow@apexprecision.com", phone: "+1 316-555-0143", authority: 70 },
    ],
    opener:
      "Daniel — noticed Apex was awarded the F-15 component contract through AFLCMC last month. With Phase 2 hitting November, the recompete on your multi-year is going to require third-party Level 2. Wanted to see if you'd already lined up your assessor.",
    objections: [
      { trigger: '"We\'re handling it internally"', response: "Most internal teams hit gap analysis but skip assessor scheduling. C3PAO wait times are now 18+ months for Q4 2026 slots." },
      { trigger: '"Send me info"', response: "Push for 15-min next week. Reference the Lockheed sub-tier CUI flow-down specifically." },
      { trigger: '"Already engaged"', response: "Ask who. If a non-C3PAO RPO, mention the post-Nov 2026 exposure for unaffirmed scores." },
    ],
  },
  {
    id: 2,
    company: "Ironhall Tactical Systems",
    cage: "92QFE",
    uei: "GHM7TK9P1Z42",
    city: "Manchester",
    state: "NH",
    employees: 31,
    naics: "332994",
    naicsLabel: "Small Arms Manufacturing",
    dodObligation: 1620000,
    contractCount: 9,
    lastAward: "Jan 2026",
    priorityScore: 91,
    urgencyTag: "CUI EXPOSURE",
    urgencyColor: "red",
    cmmcGap: "L2 confirmed — handles weapons system technical data (CTI)",
    rationale:
      "Direct prime to USSOCOM. Handles Controlled Technical Information. ITAR-adjacent. Currently self-attesting at SPRS 62. POA&Ms expiring Aug 2026.",
    contracts: [
      { agency: "USSOCOM / SOF AT&L", value: 980000, date: "01/2026", desc: "Suppressor R&D" },
      { agency: "Army / PEO Soldier", value: 440000, date: "11/2025", desc: "Component fabrication" },
      { agency: "DLA Land", value: 200000, date: "08/2025", desc: "Repair parts" },
    ],
    contacts: [
      { name: "Marcus Voss", title: "CEO", email: "mvoss@ironhall.us", phone: "+1 603-555-0177", authority: 95, primary: true },
      { name: "Rachel Kim", title: "Compliance & Security Officer", email: "rkim@ironhall.us", phone: "+1 603-555-0178", authority: 85 },
    ],
    opener:
      "Marcus — saw the USSOCOM suppressor R&D award. Given the CTI involved, your SPRS POA&Ms are going to need closure before the Phase 2 enforcement window. Are you on a C3PAO calendar yet?",
    objections: [
      { trigger: '"We have a 62 score, we\'re fine"', response: "62 self-attested gets you bid eligibility today. After Nov 10 it doesn't. POA&M closeout requires the same C3PAO assessment as fresh certification." },
      { trigger: '"What\'s your background?"', response: "Mention DFARS practice, recent assessments completed, no name-drop without permission." },
    ],
  },
  {
    id: 3,
    company: "Helix Engineering Group",
    cage: "7KQ4D",
    uei: "JXP2VR8KQM91",
    city: "Huntsville",
    state: "AL",
    employees: 88,
    naics: "541330",
    naicsLabel: "Engineering Services",
    dodObligation: 5210000,
    contractCount: 22,
    lastAward: "Mar 2026",
    priorityScore: 89,
    urgencyTag: "RECOMPETE Q4",
    urgencyColor: "amber",
    cmmcGap: "L2 — missile systems engineering data",
    rationale:
      "MDA prime sub. Strong contract velocity. Sub-100 employees. CISO already on staff (compliance-aware buyer).",
    contracts: [
      { agency: "MDA", value: 2400000, date: "03/2026", desc: "GMD systems engineering" },
      { agency: "Army / PEO Missiles", value: 1800000, date: "12/2025", desc: "PATRIOT mod support" },
      { agency: "AFRL", value: 620000, date: "07/2025", desc: "Hypersonics study" },
    ],
    contacts: [
      { name: "Dr. Anita Reyes", title: "CEO", email: "areyes@helixeng.com", phone: "+1 256-555-0211", authority: 95, primary: true },
      { name: "Chen Wu", title: "CISO", email: "cwu@helixeng.com", phone: "+1 256-555-0212", authority: 90 },
      { name: "Tom Briley", title: "VP Engineering", email: "tbriley@helixeng.com", phone: "+1 256-555-0213", authority: 60 },
    ],
    opener:
      "Chen — Helix's MDA work puts you squarely in the Phase 2 cohort that has to be third-party assessed. Most CISOs I speak with at your size are bottlenecked on assessor availability rather than control implementation. Wanted to compare notes.",
    objections: [
      { trigger: '"We\'re using [internal team / Big 4]"', response: "C3PAO assessment and remediation work cannot be done by the same firm under 32 CFR 170. Verify their structure." },
    ],
  },
  {
    id: 4,
    company: "Northwind Logistics LLC",
    cage: "5N3YT",
    uei: "WK4MR9DPLT22",
    city: "Tacoma",
    state: "WA",
    employees: 19,
    naics: "488510",
    naicsLabel: "Freight Transportation Arrangement",
    dodObligation: 480000,
    contractCount: 6,
    lastAward: "Nov 2025",
    priorityScore: 72,
    urgencyTag: "L1 ONLY",
    urgencyColor: "blue",
    cmmcGap: "L1 — FCI only, low scope",
    rationale:
      "Small but consistent DLA logistics work. FCI exposure means L1 self-assessment. Fast close, lower ticket.",
    contracts: [
      { agency: "DLA Distribution", value: 280000, date: "11/2025", desc: "CONUS freight" },
      { agency: "TRANSCOM", value: 200000, date: "06/2025", desc: "Short-haul DOD" },
    ],
    contacts: [
      { name: "Joel Sandberg", title: "Founder", email: "joel@nwlogistics.io", phone: "+1 253-555-0334", authority: 95, primary: true },
    ],
    opener:
      "Joel — quick one. Your DLA freight work means you handle FCI, which puts you in the Level 1 self-assessment bucket. We do those in 30 days for $5-7K. Easier to knock it out now than scramble in October.",
    objections: [
      { trigger: '"What\'s the minimum to stay eligible?"', response: "L1 self-assessment posted to SPRS. We do it for you, you sign the affirmation." },
    ],
  },
  {
    id: 5,
    company: "Stellar Composites Inc",
    cage: "4HRT2",
    uei: "YN8KQR3VPLM4",
    city: "San Diego",
    state: "CA",
    employees: 62,
    naics: "326199",
    naicsLabel: "Plastics Product Mfg",
    dodObligation: 1980000,
    contractCount: 11,
    lastAward: "Dec 2025",
    priorityScore: 86,
    urgencyTag: "CUI EXPOSURE",
    urgencyColor: "red",
    cmmcGap: "L2 — composite armor specs (CUI/EXPT)",
    rationale:
      "Navy direct prime. Export-controlled materials. No SPRS score posted. Owner is ex-military (relationship angle).",
    contracts: [
      { agency: "Navy / NAVSEA", value: 1100000, date: "12/2025", desc: "Hull composites" },
      { agency: "Marine Corps", value: 580000, date: "08/2025", desc: "Body armor program" },
    ],
    contacts: [
      { name: "Kevin O'Hara", title: "President", email: "kohara@stellarcomp.com", phone: "+1 619-555-0445", authority: 95, primary: true },
      { name: "Sarah Bell", title: "Controller", email: "sbell@stellarcomp.com", phone: "+1 619-555-0446", authority: 50 },
    ],
    opener:
      "Kevin — semper fi. Saw the NAVSEA hull composites award. With export-controlled material specs, you're Level 2 territory and there's no score posted. Phase 2 lands in seven months. Worth a 15-min call.",
    objections: [],
  },
  {
    id: 6,
    company: "Cipher Defense IT",
    cage: "6PX91",
    uei: "TR4LP9MKVN23",
    city: "Reston",
    state: "VA",
    employees: 54,
    naics: "541512",
    naicsLabel: "Computer Systems Design",
    dodObligation: 3120000,
    contractCount: 18,
    lastAward: "Mar 2026",
    priorityScore: 83,
    urgencyTag: "IRONIC",
    urgencyColor: "amber",
    cmmcGap: "L2 — they ARE the IT, but no cert",
    rationale:
      "IT services contractor to multiple DoD primes. SPRS 71 self-attested. Should know better — easy yes.",
    contracts: [
      { agency: "DISA", value: 1400000, date: "03/2026", desc: "Network ops support" },
      { agency: "Army / NETCOM", value: 920000, date: "10/2025", desc: "Endpoint security" },
      { agency: "DCSA", value: 800000, date: "06/2025", desc: "IA support" },
    ],
    contacts: [
      { name: "Priya Shankar", title: "CEO", email: "pshankar@cipherdef.com", phone: "+1 703-555-0512", authority: 95, primary: true },
      { name: "Greg Tomlin", title: "CTO", email: "gtomlin@cipherdef.com", phone: "+1 703-555-0513", authority: 90 },
    ],
    opener:
      "Priya — Cipher's an IT services prime with a 71 self-attested SPRS, which won't hold post-November. The optics of an IT firm bidding without third-party L2 are going to be tough. Where are you on assessor selection?",
    objections: [],
  },
  {
    id: 7,
    company: "Granite State Machining",
    cage: "8MT4Y",
    uei: "PV9KR2QLMTN8",
    city: "Concord",
    state: "NH",
    employees: 28,
    naics: "332710",
    naicsLabel: "Machine Shops",
    dodObligation: 920000,
    contractCount: 12,
    lastAward: "Feb 2026",
    priorityScore: 79,
    urgencyTag: "STEADY",
    urgencyColor: "blue",
    cmmcGap: "L2 likely — sub-tier on multiple primes",
    rationale:
      "Steady DLA machining work. Family-owned, second generation. Owner near retirement age — selling drama possible.",
    contracts: [
      { agency: "DLA Aviation", value: 410000, date: "02/2026", desc: "Bracket assemblies" },
      { agency: "Navy / NAVSUP", value: 280000, date: "11/2025", desc: "Hardware" },
    ],
    contacts: [
      { name: "Robert Granger", title: "Owner", email: "bob@granitemach.com", phone: "+1 603-555-0623", authority: 95, primary: true },
    ],
    opener:
      "Bob — straightforward one. Granite's DLA work means CUI is flowing your way through the primes. You need an L2 assessment lined up before October or you're out of bid eligibility on recompetes. Got 15 minutes this week?",
    objections: [],
  },
  {
    id: 8,
    company: "Vector R&D Solutions",
    cage: "3QNK7",
    uei: "BX5MR9KPTLM2",
    city: "Albuquerque",
    state: "NM",
    employees: 41,
    naics: "541715",
    naicsLabel: "Physical/Engineering R&D",
    dodObligation: 2240000,
    contractCount: 8,
    lastAward: "Jan 2026",
    priorityScore: 77,
    urgencyTag: "SBIR",
    urgencyColor: "blue",
    cmmcGap: "L2 — SBIR Phase II tech data",
    rationale:
      "Sandia-adjacent R&D. SBIR Phase II contracts. Likely thin on IT staff. Receptive to managed approach.",
    contracts: [
      { agency: "AFRL", value: 1100000, date: "01/2026", desc: "Directed energy SBIR II" },
      { agency: "DTRA", value: 600000, date: "07/2025", desc: "CWMD research" },
    ],
    contacts: [
      { name: "Dr. Henry Park", title: "Founder & CEO", email: "hpark@vectorrd.com", phone: "+1 505-555-0734", authority: 95, primary: true },
    ],
    opener:
      "Dr. Park — saw the AFRL directed energy Phase II award. SBIR II almost always pulls CTI flow-down. Most R&D shops your size don't have the IT depth for the 110 controls. We do this for AFRL contractors regularly.",
    objections: [],
  },
  {
    id: 9,
    company: "Patriot Training Services",
    cage: "5LRH9",
    uei: "KP3VQR8MLNT4",
    city: "Tampa",
    state: "FL",
    employees: 33,
    naics: "611699",
    naicsLabel: "Other Educational Services",
    dodObligation: 760000,
    contractCount: 14,
    lastAward: "Nov 2025",
    priorityScore: 68,
    urgencyTag: "L1 ONLY",
    urgencyColor: "blue",
    cmmcGap: "L1 — training delivery, no CUI",
    rationale:
      "Training contractor, mostly FCI. Low ticket but quick close. Good filler call.",
    contracts: [
      { agency: "CENTCOM", value: 380000, date: "11/2025", desc: "Cultural training" },
      { agency: "SOCOM", value: 220000, date: "04/2025", desc: "Language training" },
    ],
    contacts: [
      { name: "Marisol Ortega", title: "President", email: "mortega@patriottrain.com", phone: "+1 813-555-0823", authority: 95, primary: true },
    ],
    opener:
      "Marisol — quick one on CMMC. Your CENTCOM and SOCOM work puts you in the L1 bucket. 30-day turnaround, fixed fee. Worth a 10-min call?",
    objections: [],
  },
  {
    id: 10,
    company: "Coastal Maritime Defense",
    cage: "7TQK2",
    uei: "WN4MR9KPTLV3",
    city: "Norfolk",
    state: "VA",
    employees: 76,
    naics: "336611",
    naicsLabel: "Ship Building & Repair",
    dodObligation: 4180000,
    contractCount: 16,
    lastAward: "Feb 2026",
    priorityScore: 81,
    urgencyTag: "PRIME",
    urgencyColor: "amber",
    cmmcGap: "L2 — Navy ship technical data",
    rationale:
      "Direct Navy prime, ship repair. Existing IT spend ($800K/yr est). High recompete frequency. Decision is at CFO level.",
    contracts: [
      { agency: "Navy / NAVSEA", value: 2400000, date: "02/2026", desc: "DDG-class repair" },
      { agency: "MSC", value: 980000, date: "09/2025", desc: "Sealift maintenance" },
    ],
    contacts: [
      { name: "James McCallister", title: "CEO", email: "jm@coastalmd.com", phone: "+1 757-555-0921", authority: 95, primary: true },
      { name: "Dana Whitfield", title: "CFO", email: "dwhitfield@coastalmd.com", phone: "+1 757-555-0922", authority: 88 },
    ],
    opener:
      "Dana — Coastal's NAVSEA work puts CMMC L2 squarely in your 2026 budget cycle. Most CFOs I speak with at this size are deciding between $80K all-in with a managed firm or $200K piecing it together. Worth comparing.",
    objections: [],
  },
];
