export type Stat = {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  accent: string;
  spark: number[];
};

export type Call = {
  id: string;
  agent: string;
  contact: string;
  company: string;
  duration: string;
  status: "Completed" | "Missed" | "Failed" | "In progress";
  sentiment: "Positive" | "Neutral" | "Negative";
  language: string;
  startedAt: string;
  summary: string;
};

export type Agent = {
  id: string;
  name: string;
  role: string;
  voice: string;
  language: string;
  callsHandled: number;
  successRate: number;
  status: "Active" | "Paused" | "Training";
  accent: string;
};

export type Contact = {
  id: string;
  name: string;
  company: string;
  title: string;
  email: string;
  phone: string;
  status: "Hot" | "Warm" | "Cold" | "Closed";
  dealValue: string;
  lastActivity: string;
  initials: string;
  accent: string;
};

export type Invoice = {
  id: string;
  date: string;
  amount: string;
  plan: string;
  status: "Paid" | "Pending" | "Failed";
};

export const overviewStats: Stat[] = [
  {
    label: "Total Calls",
    value: "12,847",
    change: "+18.2%",
    trend: "up",
    accent: "#6FA8E8",
    spark: [12, 18, 15, 22, 19, 26, 24, 32, 30, 38, 35, 42],
  },
  {
    label: "Active Agents",
    value: "24",
    change: "+3",
    trend: "up",
    accent: "#9B8FE0",
    spark: [10, 12, 14, 14, 16, 18, 20, 21, 22, 22, 23, 24],
  },
  {
    label: "Avg. Conversion",
    value: "34.6%",
    change: "+4.1%",
    trend: "up",
    accent: "#7CC9DC",
    spark: [22, 24, 25, 23, 28, 30, 29, 32, 33, 34, 33, 35],
  },
  {
    label: "Monthly Revenue",
    value: "$184.3K",
    change: "+22.4%",
    trend: "up",
    accent: "#1E3A8A",
    spark: [80, 95, 110, 120, 125, 135, 140, 150, 160, 170, 178, 184],
  },
];

export const callStats: Stat[] = [
  {
    label: "Calls Today",
    value: "1,284",
    change: "+12%",
    trend: "up",
    accent: "#6FA8E8",
    spark: [40, 50, 60, 70, 65, 80, 90, 100, 110, 120, 124, 128],
  },
  {
    label: "Avg. Duration",
    value: "3:42",
    change: "-0:18",
    trend: "down",
    accent: "#9B8FE0",
    spark: [60, 58, 55, 52, 50, 48, 45, 44, 43, 42, 41, 42],
  },
  {
    label: "Success Rate",
    value: "92.4%",
    change: "+2.1%",
    trend: "up",
    accent: "#7CC9DC",
    spark: [85, 86, 87, 88, 89, 89, 90, 91, 91, 92, 92, 92],
  },
  {
    label: "Languages Used",
    value: "18",
    change: "+2",
    trend: "up",
    accent: "#B5A0E5",
    spark: [12, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18],
  },
];

export const recentCalls: Call[] = [
  {
    id: "C-49281",
    agent: "Aurora",
    contact: "Daniel Hayes",
    company: "Northstar Logistics",
    duration: "4:12",
    status: "Completed",
    sentiment: "Positive",
    language: "English",
    startedAt: "2m ago",
    summary: "Booked a discovery call for next Tuesday. Interested in voice + CRM bundle.",
  },
  {
    id: "C-49280",
    agent: "Lyra",
    contact: "Sofia Martinez",
    company: "Brightline Retail",
    duration: "2:48",
    status: "Completed",
    sentiment: "Neutral",
    language: "Spanish",
    startedAt: "8m ago",
    summary: "Answered pricing questions, requested follow-up by email.",
  },
  {
    id: "C-49279",
    agent: "Nova",
    contact: "Akira Tanaka",
    company: "Helix Robotics",
    duration: "5:34",
    status: "Completed",
    sentiment: "Positive",
    language: "Japanese",
    startedAt: "21m ago",
    summary: "Demo scheduled. Strong interest in video analytics deployment.",
  },
  {
    id: "C-49278",
    agent: "Aurora",
    contact: "Mira Patel",
    company: "Stratus Health",
    duration: "0:38",
    status: "Missed",
    sentiment: "Neutral",
    language: "English",
    startedAt: "34m ago",
    summary: "Voicemail left, will retry tomorrow morning.",
  },
  {
    id: "C-49277",
    agent: "Vega",
    contact: "Lukas Müller",
    company: "Berlin Energie",
    duration: "6:51",
    status: "Completed",
    sentiment: "Positive",
    language: "German",
    startedAt: "1h ago",
    summary: "Closed renewal for €48k. Sent contract for signature.",
  },
  {
    id: "C-49276",
    agent: "Lyra",
    contact: "Emma Laurent",
    company: "Atlas Capital",
    duration: "3:09",
    status: "Completed",
    sentiment: "Positive",
    language: "French",
    startedAt: "1h ago",
    summary: "Forwarded to senior account manager. Pre-qualified lead.",
  },
  {
    id: "C-49275",
    agent: "Nova",
    contact: "Wei Chen",
    company: "Pacific Imports",
    duration: "1:22",
    status: "Failed",
    sentiment: "Negative",
    language: "Mandarin",
    startedAt: "2h ago",
    summary: "Customer requested human escalation. Routed to support.",
  },
  {
    id: "C-49274",
    agent: "Aurora",
    contact: "Olivia Brooks",
    company: "Meridian Studios",
    duration: "4:47",
    status: "Completed",
    sentiment: "Positive",
    language: "English",
    startedAt: "3h ago",
    summary: "Onboarding call completed. Sent welcome packet.",
  },
];

export const agents: Agent[] = [
  {
    id: "A-01",
    name: "Aurora",
    role: "Inbound Sales",
    voice: "Voxgard Neural v3",
    language: "English",
    callsHandled: 4218,
    successRate: 94,
    status: "Active",
    accent: "#6FA8E8",
  },
  {
    id: "A-02",
    name: "Lyra",
    role: "Customer Support",
    voice: "Voxgard Neural v3",
    language: "Spanish, French",
    callsHandled: 3104,
    successRate: 91,
    status: "Active",
    accent: "#9B8FE0",
  },
  {
    id: "A-03",
    name: "Nova",
    role: "Outbound Qualifier",
    voice: "Voxgard Neural v3",
    language: "Mandarin, Japanese",
    callsHandled: 2387,
    successRate: 88,
    status: "Active",
    accent: "#7CC9DC",
  },
  {
    id: "A-04",
    name: "Vega",
    role: "Renewals",
    voice: "Voxgard Neural v3",
    language: "German",
    callsHandled: 1842,
    successRate: 96,
    status: "Active",
    accent: "#1E3A8A",
  },
  {
    id: "A-05",
    name: "Atlas",
    role: "Lead Triage",
    voice: "Voxgard Neural v2",
    language: "English",
    callsHandled: 920,
    successRate: 82,
    status: "Paused",
    accent: "#B5A0E5",
  },
  {
    id: "A-06",
    name: "Orion",
    role: "Onboarding",
    voice: "Voxgard Neural v3",
    language: "English, Portuguese",
    callsHandled: 0,
    successRate: 0,
    status: "Training",
    accent: "#7CC9DC",
  },
];

export const contacts: Contact[] = [
  {
    id: "K-1001",
    name: "Daniel Hayes",
    company: "Northstar Logistics",
    title: "VP of Operations",
    email: "d.hayes@northstar.io",
    phone: "+1 (415) 555-2104",
    status: "Hot",
    dealValue: "$48,000",
    lastActivity: "Voice call · 2m ago",
    initials: "DH",
    accent: "#1E3A8A",
  },
  {
    id: "K-1002",
    name: "Sofia Martinez",
    company: "Brightline Retail",
    title: "Head of CX",
    email: "sofia@brightline.com",
    phone: "+34 91 555 0188",
    status: "Warm",
    dealValue: "$22,500",
    lastActivity: "Email · 1h ago",
    initials: "SM",
    accent: "#9B8FE0",
  },
  {
    id: "K-1003",
    name: "Akira Tanaka",
    company: "Helix Robotics",
    title: "CTO",
    email: "akira@helixrobotics.jp",
    phone: "+81 3 5555 8112",
    status: "Hot",
    dealValue: "$120,000",
    lastActivity: "Demo · 21m ago",
    initials: "AT",
    accent: "#6FA8E8",
  },
  {
    id: "K-1004",
    name: "Mira Patel",
    company: "Stratus Health",
    title: "Director of Innovation",
    email: "m.patel@stratushealth.com",
    phone: "+1 (212) 555-7842",
    status: "Cold",
    dealValue: "$15,000",
    lastActivity: "Missed call · 34m ago",
    initials: "MP",
    accent: "#7CC9DC",
  },
  {
    id: "K-1005",
    name: "Lukas Müller",
    company: "Berlin Energie",
    title: "Procurement Lead",
    email: "lukas@berlinenergie.de",
    phone: "+49 30 5555 4421",
    status: "Closed",
    dealValue: "$48,000",
    lastActivity: "Contract sent · 1h ago",
    initials: "LM",
    accent: "#B5A0E5",
  },
  {
    id: "K-1006",
    name: "Emma Laurent",
    company: "Atlas Capital",
    title: "Investment Analyst",
    email: "emma.l@atlascapital.fr",
    phone: "+33 1 5555 0277",
    status: "Warm",
    dealValue: "$32,000",
    lastActivity: "Voice call · 1h ago",
    initials: "EL",
    accent: "#7CC9DC",
  },
  {
    id: "K-1007",
    name: "Wei Chen",
    company: "Pacific Imports",
    title: "Operations Manager",
    email: "wei@pacificimports.cn",
    phone: "+86 10 5555 9012",
    status: "Cold",
    dealValue: "$8,400",
    lastActivity: "Voicemail · 2h ago",
    initials: "WC",
    accent: "#93BCEC",
  },
  {
    id: "K-1008",
    name: "Olivia Brooks",
    company: "Meridian Studios",
    title: "Founder",
    email: "olivia@meridianstudios.co",
    phone: "+44 20 5555 3344",
    status: "Hot",
    dealValue: "$76,000",
    lastActivity: "Onboarding · 3h ago",
    initials: "OB",
    accent: "#B5A0E5",
  },
];

export const invoices: Invoice[] = [
  { id: "INV-2026-0042", date: "May 1, 2026", amount: "$4,900.00", plan: "Business", status: "Paid" },
  { id: "INV-2026-0036", date: "Apr 1, 2026", amount: "$4,900.00", plan: "Business", status: "Paid" },
  { id: "INV-2026-0029", date: "Mar 1, 2026", amount: "$4,900.00", plan: "Business", status: "Paid" },
  { id: "INV-2026-0021", date: "Feb 1, 2026", amount: "$1,500.00", plan: "Starter", status: "Paid" },
  { id: "INV-2026-0014", date: "Jan 1, 2026", amount: "$1,500.00", plan: "Starter", status: "Paid" },
];

export const pricingTiers = [
  {
    name: "Starter",
    price: "$1,500",
    per: "/ month",
    desc: "For small teams launching their first AI workflow.",
    features: ["1 AI voice agent", "Up to 2,000 calls / mo", "Standard integrations", "Email support"],
    highlight: false,
  },
  {
    name: "Business",
    price: "$4,900",
    per: "/ month",
    desc: "For growing companies running production workloads.",
    features: ["Up to 5 AI agents", "Video analytics included", "Custom integrations", "Priority support"],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    per: "",
    desc: "For organizations with advanced security and scale needs.",
    features: ["Unlimited AI agents", "Dedicated infrastructure", "On-prem & private cloud", "24/7 SLA support"],
    highlight: false,
  },
];

export const analyticsSeries = {
  calls: [240, 320, 280, 360, 410, 380, 460, 520, 490, 580, 620, 690, 740, 720, 810, 880, 920, 1024, 1100, 1184, 1240, 1320, 1280, 1410, 1480, 1520, 1610, 1684, 1742, 1820],
  conversions: [62, 78, 70, 92, 110, 102, 124, 138, 132, 156, 168, 184, 198, 192, 218, 236, 248, 274, 296, 318, 332, 354, 344, 378, 396, 408, 432, 452, 468, 488],
};

export const funnel = [
  { label: "Inbound", value: 12480, accent: "#6FA8E8" },
  { label: "Qualified", value: 7820, accent: "#9B8FE0" },
  { label: "Demo Booked", value: 3140, accent: "#B5A0E5" },
  { label: "Proposal", value: 1640, accent: "#1E3A8A" },
  { label: "Closed Won", value: 920, accent: "#7CC9DC" },
];

export const currentUser = {
  name: "Vahagn Petrosyan",
  email: "vahagn@voxgard.ai",
  initials: "VP",
  role: "Workspace Owner",
  org: "Voxgard HQ",
};

export const currentPlan = {
  name: "Business",
  price: "$4,900 / month",
  renewsOn: "June 1, 2026",
  usage: [
    { label: "AI Voice Agents", used: 4, total: 5, accent: "#6FA8E8" },
    { label: "Calls This Month", used: 6840, total: 12000, accent: "#9B8FE0" },
    { label: "Video Hours", used: 312, total: 500, accent: "#7CC9DC" },
    { label: "Integrations", used: 7, total: 12, accent: "#1E3A8A" },
  ],
};
