import type { ReactNode } from "react";

export type Feature = {
  title: string;
  description: string;
  accent: string;
  icon: ReactNode;
};

/* SVG fragments — imported as React nodes inside an <svg> consumer. */
const I = {
  clock: <path d="M12 6v6l4 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </>
  ),
  globe: (
    <>
      <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
    </>
  ),
  shield: <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" />,
  pulse: <path d="M3 12h3l3-9 4 18 3-9h5" />,
  translate: (
    <>
      <path d="M3 5h12M9 3v2M11 5c-2 7-5 9-5 9M5 9c0 4 4 7 8 7M14 21l5-12 5 12M16 17h6" />
    </>
  ),
  mic: (
    <>
      <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
      <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v3" />
    </>
  ),
  chart: <path d="M3 3v18h18M7 14l4-4 4 4 5-7" />,
};

export const features: Feature[] = [
  {
    title: "24/7 answering",
    description: "Never miss after-hours, lunch-break or peak-hour calls again.",
    accent: "#6FA8E8",
    icon: I.clock,
  },
  {
    title: "Books appointments live",
    description:
      "Native sync with Google Calendar, Calendly, Acuity, Jobber and ServiceTitan.",
    accent: "#9B8FE0",
    icon: I.calendar,
  },
  {
    title: "CRM sync",
    description:
      "Push contacts, calls and summaries to HubSpot, Salesforce, GHL and more.",
    accent: "#7CC9DC",
    icon: I.globe,
  },
  {
    title: "HIPAA-aligned",
    description:
      "Encryption, redaction and a signed BAA — built for healthcare and legal.",
    accent: "#1E3A8A",
    icon: I.shield,
  },
  {
    title: "Sub-300ms voice",
    description:
      "Latency low enough to feel human. Natural turn-taking and barge-in.",
    accent: "#B5A0E5",
    icon: I.pulse,
  },
  {
    title: "Multilingual",
    description:
      "30+ languages including native English, Spanish, French and Mandarin.",
    accent: "#9B8FE0",
    icon: I.translate,
  },
  {
    title: "Custom voice & script",
    description: "Match your brand tone. Upload FAQs, scripts and knowledge base.",
    accent: "#6FA8E8",
    icon: I.mic,
  },
  {
    title: "Real-time analytics",
    description: "Every call recorded, transcribed, summarized and searchable.",
    accent: "#7CC9DC",
    icon: I.chart,
  },
];
