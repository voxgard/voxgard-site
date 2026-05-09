"use client";

import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import MeshBackground from "../components/MeshBackground";
import GlassCard from "../components/GlassCard";
import StatCard from "../components/StatCard";
import CallLogCard from "../components/CallLogCard";
import CrmCard from "../components/CrmCard";
import Sparkline from "../components/Sparkline";
import StatusBadge from "../components/StatusBadge";
import VoiceOrb from "../components/VoiceOrb";
import {
  overviewStats,
  recentCalls,
  contacts,
  analyticsSeries,
} from "../lib/mock";

/* ============================================================
   Atomic UI helpers (light, premium, Apple-like)
   ============================================================ */

function TiltCard({
  children,
  className = "",
  intensity = 5,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.transform = `perspective(1200px) rotateX(${(-y * intensity).toFixed(2)}deg) rotateY(${(x * intensity).toFixed(2)}deg)`;
        el.style.setProperty("--gx", `${((x + 0.5) * 100).toFixed(1)}%`);
        el.style.setProperty("--gy", `${((y + 0.5) * 100).toFixed(1)}%`);
      }}
      onMouseLeave={() => {
        const el = ref.current;
        if (!el) return;
        el.style.transform =
          "perspective(1200px) rotateX(0deg) rotateY(0deg)";
      }}
      className={`vox-glow-card vox-gradient-border vox-ease will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}

function GlowCTA({
  children,
  href = "#",
}: {
  children: ReactNode;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className="vox-btn-soft group relative inline-flex items-center justify-center rounded-full px-8 py-4 font-semibold"
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className="vox-ease transition-transform group-hover:translate-x-0.5"
        >
          <path
            d="M3 7h8m0 0L7 3m4 4l-4 4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}

function GhostCTA({
  children,
  href = "#",
}: {
  children: ReactNode;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className="vox-ease group relative inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-white/70 px-8 py-4 font-medium text-[var(--ink-2)] backdrop-blur-xl transition hover:border-[var(--border-strong)] hover:bg-white/90 hover:shadow-[var(--shadow-soft)]"
    >
      <span className="relative z-10">{children}</span>
    </Link>
  );
}

function SectionLabel({
  color,
  children,
}: {
  color: string;
  children: ReactNode;
}) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-white/70 px-4 py-1.5 text-[11px] uppercase tracking-[0.3em] backdrop-blur-xl"
      style={{ color }}
    >
      <span
        className="h-1 w-1 rounded-full"
        style={{ background: color, boxShadow: `0 0 8px ${color}88` }}
      />
      {children}
    </div>
  );
}


/* ============================================================
   AI receptionist in action — animated pipeline
   ============================================================ */

function CallFlowSection() {
  const stages = [
    {
      n: "01",
      label: "Incoming",
      title: "Daniel Hayes",
      sub: "Northstar · 0:02",
      tag: "Ringing",
      tone: "info" as const,
      accent: "#6FA8E8",
      icon: (
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      ),
    },
    {
      n: "02",
      label: "AI answers",
      title: "Aurora · live",
      sub: "Detecting intent…",
      tag: "Live",
      tone: "info" as const,
      accent: "#9B8FE0",
      icon: (
        <>
          <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
          <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v3" />
        </>
      ),
    },
    {
      n: "03",
      label: "Booked",
      title: "Tue · 2:00 PM",
      sub: "Discovery call",
      tag: "Confirmed",
      tone: "success" as const,
      accent: "#7CC9DC",
      icon: (
        <>
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </>
      ),
    },
    {
      n: "04",
      label: "CRM synced",
      title: "HubSpot · contact",
      sub: "Tagged · auto-followup",
      tag: "Synced",
      tone: "success" as const,
      accent: "#1E3A8A",
      icon: (
        <>
          <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
        </>
      ),
    },
  ];

  return (
    <section
      id="flow"
      className="relative z-10 mx-auto w-full max-w-7xl px-6 py-28 md:px-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1] }}
        className="mb-16 flex flex-col items-center text-center"
      >
        <SectionLabel color="#1E3A8A">AI receptionist in action</SectionLabel>
        <h2 className="mt-8 text-5xl font-semibold tracking-[-0.02em] text-[var(--ink)] md:text-7xl">
          One call.{" "}
          <span className="vox-shimmer-text">Four moves.</span>
        </h2>
        <p className="mt-6 max-w-xl text-lg text-[var(--muted)]">
          Watch a live call become a booking and a CRM record — in seconds.
        </p>
      </motion.div>

      <div className="relative">
        {/* Connecting line — desktop */}
        <div className="pointer-events-none absolute left-0 right-0 top-1/2 hidden -translate-y-1/2 lg:block">
          <div className="relative mx-auto h-px max-w-[88%]">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--brand-violet)]/40 to-transparent" />
            {/* Traveling pulse */}
            <motion.div
              className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full"
              style={{
                background: "#9B8FE0",
                boxShadow: "0 0 18px #9B8FE0",
              }}
              animate={{ left: ["0%", "100%"] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {stages.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.8,
                delay: i * 0.18,
                ease: [0.32, 0.72, 0, 1],
              }}
              whileHover={{ y: -6 }}
              className="relative"
            >
              <div className="vox-glass-strong vox-glow-card relative overflow-hidden rounded-3xl p-6 shadow-[var(--shadow-glass)]">
                <div
                  className="pointer-events-none absolute inset-0 opacity-50"
                  style={{
                    background: `radial-gradient(circle at top, ${s.accent}1F, transparent 65%)`,
                  }}
                />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs tracking-[0.3em] text-[var(--subtle)]">
                      {s.n}
                    </span>
                    <StatusBadge label={s.tag} tone={s.tone} />
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    <motion.div
                      className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-[0_8px_22px_-8px_rgba(31,60,122,0.45)]"
                      style={{
                        background: `linear-gradient(135deg, ${s.accent}, ${s.accent}cc)`,
                      }}
                      animate={{
                        scale: [1, 1.06, 1],
                      }}
                      transition={{
                        duration: 2.6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.4,
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {s.icon}
                      </svg>
                    </motion.div>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--subtle)]">
                        {s.label}
                      </div>
                      <div className="mt-0.5 text-base font-semibold text-[var(--ink)]">
                        {s.title}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 rounded-xl border border-[var(--border-soft)] bg-white/55 p-3 text-xs text-[var(--text)]">
                    {s.sub}
                  </div>

                  {/* Mini animated detail per stage */}
                  {i === 1 && (
                    <div className="mt-3 flex h-7 items-end gap-0.5">
                      {Array.from({ length: 22 }).map((_, j) => (
                        <motion.span
                          key={j}
                          className="w-1 rounded-full"
                          style={{
                            background:
                              "linear-gradient(180deg, #9B8FE0, #6FA8E8)",
                          }}
                          animate={{
                            height: [`${20 + (j % 4) * 12}%`, `${50 + (j % 5) * 16}%`, `${20 + (j % 4) * 12}%`],
                            opacity: [0.5, 0.95, 0.5],
                          }}
                          transition={{
                            duration: 1.6 + (j % 4) * 0.3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: j * 0.05,
                          }}
                        />
                      ))}
                    </div>
                  )}
                  {i === 2 && (
                    <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[9px]">
                      {["S", "M", "T", "W", "T", "F", "S"].map((d, k) => (
                        <span
                          key={k}
                          className={`rounded-md py-1 ${
                            k === 2
                              ? "bg-[var(--brand-cyan)]/30 text-[var(--ink)] font-semibold"
                              : "text-[var(--subtle)]"
                          }`}
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  )}
                  {i === 3 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {["contact", "deal", "task", "note"].map((t) => (
                        <motion.span
                          key={t}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.6 + Math.random() * 0.4 }}
                          className="rounded-full border border-[var(--border-soft)] bg-white/65 px-2 py-0.5 text-[10px] text-[var(--text)]"
                        >
                          {t}
                        </motion.span>
                      ))}
                    </div>
                  )}
                  {i === 0 && (
                    <div className="mt-3 flex items-center gap-2">
                      <motion.span
                        className="h-2 w-2 rounded-full bg-emerald-500"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      <span className="text-[11px] text-[var(--muted)]">
                        Connected · 4G · 0.18s
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile connector */}
              {i < stages.length - 1 && (
                <div className="my-3 flex justify-center lg:hidden">
                  <span className="text-[var(--subtle)]">↓</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Mobile menu
   ============================================================ */

function MobileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="vox-ease flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-white/70 text-[var(--ink-2)]"
        aria-label="Toggle menu"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          {open ? (
            <>
              <path d="M18 6L6 18" />
              <path d="M6 6l12 12" />
            </>
          ) : (
            <>
              <path d="M3 6h18" />
              <path d="M3 12h18" />
              <path d="M3 18h18" />
            </>
          )}
        </svg>
      </button>
      {open && (
        <div className="vox-glass-strong absolute left-4 right-4 top-20 z-30 rounded-2xl p-5">
          <nav className="grid gap-3 text-sm">
            <a
              href="#preview"
              onClick={() => setOpen(false)}
              className="text-[var(--text)]"
            >
              Platform
            </a>
            <a
              href="#industries"
              onClick={() => setOpen(false)}
              className="text-[var(--text)]"
            >
              Industries
            </a>
            <a
              href="#features"
              onClick={() => setOpen(false)}
              className="text-[var(--text)]"
            >
              Features
            </a>
            <a
              href="#pricing"
              onClick={() => setOpen(false)}
              className="text-[var(--text)]"
            >
              Pricing
            </a>
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="text-[var(--text)]"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className="vox-btn-soft mt-2 rounded-full px-4 py-2 text-center font-semibold"
            >
              Start free
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   Static data
   ============================================================ */

const INDUSTRIES = [
  {
    name: "Dental",
    accent: "#7CC9DC",
    blurb:
      "After-hours new-patient calls, insurance triage, recall booking and emergency routing.",
    points: ["New patient intake", "Insurance verification", "Recall reminders"],
  },
  {
    name: "Med Spa",
    accent: "#9B8FE0",
    blurb:
      "Consult booking, treatment FAQs, no-show recovery and aftercare follow-ups.",
    points: ["Consult booking", "Treatment FAQs", "No-show recovery"],
  },
  {
    name: "HVAC",
    accent: "#6FA8E8",
    blurb:
      "Emergency dispatch, quote requests and appointment confirmation 24/7.",
    points: ["Emergency dispatch", "Quote requests", "Service confirms"],
  },
  {
    name: "Home Services",
    accent: "#B5A0E5",
    blurb:
      "Plumbing, electrical, roofing — qualify and route every lead in seconds.",
    points: ["Lead qualification", "Job dispatch", "ServiceTitan sync"],
  },
  {
    name: "Legal",
    accent: "#1E3A8A",
    blurb:
      "Intake screening, conflict checks and consultation booking with full transcripts.",
    points: ["Intake screening", "Conflict checks", "Consult booking"],
  },
  {
    name: "Real Estate",
    accent: "#A8E0EA",
    blurb:
      "Buyer/seller intake, listing inquiries and instant showing scheduling.",
    points: ["Listing inquiries", "Buyer intake", "Showing schedule"],
  },
];

const FEATURES = [
  {
    t: "24/7 answering",
    d: "Never miss after-hours, lunch-break or peak-hour calls again.",
    c: "#6FA8E8",
    icon: <path d="M12 6v6l4 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
  },
  {
    t: "Books appointments live",
    d: "Native sync with Google Calendar, Calendly, Acuity, Jobber and ServiceTitan.",
    c: "#9B8FE0",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </>
    ),
  },
  {
    t: "CRM sync",
    d: "Push contacts, calls and summaries to HubSpot, Salesforce, GHL and more.",
    c: "#7CC9DC",
    icon: (
      <>
        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
      </>
    ),
  },
  {
    t: "HIPAA-aligned",
    d: "Encryption, redaction and a signed BAA — built for healthcare and legal.",
    c: "#1E3A8A",
    icon: <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" />,
  },
  {
    t: "Sub-300ms voice",
    d: "Latency low enough to feel human. Natural turn-taking and barge-in.",
    c: "#B5A0E5",
    icon: <path d="M3 12h3l3-9 4 18 3-9h5" />,
  },
  {
    t: "Multilingual",
    d: "30+ languages including native English, Spanish, French and Mandarin.",
    c: "#9B8FE0",
    icon: (
      <>
        <path d="M3 5h12M9 3v2M11 5c-2 7-5 9-5 9M5 9c0 4 4 7 8 7M14 21l5-12 5 12M16 17h6" />
      </>
    ),
  },
  {
    t: "Custom voice & script",
    d: "Match your brand tone. Upload FAQs, scripts and knowledge base.",
    c: "#6FA8E8",
    icon: (
      <>
        <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
        <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v3" />
      </>
    ),
  },
  {
    t: "Real-time analytics",
    d: "Every call recorded, transcribed, summarized and searchable.",
    c: "#7CC9DC",
    icon: <path d="M3 3v18h18M7 14l4-4 4 4 5-7" />,
  },
];

const STEPS = [
  {
    n: "01",
    t: "Connect your number",
    d: "Forward your business line in minutes — keep your existing carrier.",
  },
  {
    n: "02",
    t: "Train your agent",
    d: "Upload FAQs, scripts and connect your calendar & CRM.",
  },
  {
    n: "03",
    t: "Go live",
    d: "Voxgard answers every call 24/7 in English & Spanish.",
  },
  {
    n: "04",
    t: "Track & scale",
    d: "Dashboard, transcripts and CRM-synced summaries on every call.",
  },
];

const PRICING = [
  {
    name: "Starter",
    price: "$299",
    per: "/ month",
    desc: "For solo offices and home-service teams just starting with AI.",
    features: [
      "1 AI receptionist (English)",
      "Up to 500 minutes / mo",
      "Appointment booking",
      "Email + calendar sync",
      "Email support",
    ],
    highlight: false,
    cta: "Start free trial",
  },
  {
    name: "Growth",
    price: "$799",
    per: "/ month",
    desc: "For multi-location practices and growing service teams.",
    features: [
      "Up to 3 AI agents · EN + ES",
      "2,500 minutes / mo",
      "HIPAA-aligned + SOC 2 controls",
      "Native CRM sync (HubSpot, Salesforce, GHL)",
      "Live call monitoring",
      "Priority support",
    ],
    highlight: true,
    cta: "Start free trial",
  },
  {
    name: "Scale",
    price: "Custom",
    per: "",
    desc: "For franchises, MSOs and enterprise call centers.",
    features: [
      "Unlimited agents & languages",
      "Custom voice cloning",
      "Dedicated cloud infrastructure",
      "24/7 SLA + dedicated CSM",
      "SSO + audit logs",
    ],
    highlight: false,
    cta: "Talk to sales",
  },
];

const TRUST_LOGOS = [
  "NORTHSTAR",
  "BRIGHTLINE",
  "HELIX",
  "STRATUS",
  "MERIDIAN",
  "ATLAS",
];

/* ============================================================
   Page
   ============================================================ */

export default function Home() {
  return (
    <main className="relative min-h-screen text-[var(--ink)]">
      <MeshBackground />

      {/* HEADER */}
      <header className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 md:px-12">
        <Link
          href="/"
          className="flex items-center gap-3 text-xl font-bold tracking-[0.28em] text-[var(--ink)]"
        >
          <span
            className="inline-block h-3 w-3 rounded-sm"
            style={{
              background: "linear-gradient(135deg, #6FA8E8, #9B8FE0, #7CC9DC)",
              boxShadow: "0 0 18px rgba(155,143,224,0.55)",
            }}
          />
          VOXGARD
        </Link>

        <nav className="hidden items-center gap-9 text-sm text-[var(--muted)] md:flex">
          <a
            href="#preview"
            className="vox-ease transition hover:text-[var(--ink)]"
          >
            Platform
          </a>
          <a
            href="#industries"
            className="vox-ease transition hover:text-[var(--ink)]"
          >
            Industries
          </a>
          <a
            href="#features"
            className="vox-ease transition hover:text-[var(--ink)]"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="vox-ease transition hover:text-[var(--ink)]"
          >
            Pricing
          </a>
          <Link
            href="/dashboard"
            className="vox-ease transition hover:text-[var(--ink)]"
          >
            Dashboard
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="vox-ease text-sm text-[var(--text)] transition hover:text-[var(--ink)]"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="vox-btn-soft inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold"
          >
            Start free
          </Link>
        </div>

        <MobileMenu />
      </header>

      {/* HERO — minimal copy, big reactive orb */}
      <section className="relative z-10 mx-auto flex min-h-[88vh] w-full max-w-7xl flex-col items-center justify-center px-6 pt-8 pb-24 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
          className="relative flex flex-col items-center text-center"
        >
          <SectionLabel color="#1E3A8A">AI call operations</SectionLabel>

          <h1 className="mt-10 text-6xl font-semibold leading-[0.98] tracking-[-0.03em] text-[var(--ink)] md:text-[7.5rem] lg:text-[9rem]">
            Never miss
            <br />
            <span className="vox-shimmer-text">a call.</span>
          </h1>

          <p className="mt-10 max-w-xl text-lg leading-relaxed text-[var(--muted)] md:text-xl">
            Your AI receptionist — answering, booking, syncing.
            <br className="hidden sm:block" />
            Built for service businesses.
          </p>

          {/* Big reactive orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="my-14 flex w-full justify-center"
          >
            <VoiceOrb size={520} />
          </motion.div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <GlowCTA href="/register">Start free trial</GlowCTA>
            <GhostCTA href="#flow">See it in action</GhostCTA>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-[var(--muted)]">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
              No credit card
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
              Live in 10 minutes
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
              HIPAA-aligned
            </span>
          </div>
        </motion.div>
      </section>

      {/* TRUST BAR */}
      <section className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-12 md:px-12">
        <div className="vox-glass rounded-2xl px-6 py-5">
          <div className="text-center text-[10px] uppercase tracking-[0.3em] text-[var(--subtle)]">
            Trusted by service teams across the US
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {TRUST_LOGOS.map((l) => (
              <span
                key={l}
                className="text-sm font-bold tracking-[0.3em] text-[var(--whisper)]"
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* AI IN ACTION — animated pipeline */}
      <CallFlowSection />

      {/* LIVE DASHBOARD PREVIEW */}
      <section
        id="preview"
        className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 md:px-12"
      >
        <motion.div initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-80px"}} transition={{duration:0.8,ease:[0.32,0.72,0,1]}} className="mb-12 flex flex-col items-center text-center">
          <SectionLabel color="#1E3A8A">Live dashboard</SectionLabel>
          <h2 className="mt-8 text-5xl font-semibold tracking-[-0.02em] text-[var(--ink)] md:text-7xl">
            Every call.{" "}
            <span className="vox-shimmer-text">Visible.</span>
          </h2>
          <p className="mt-5 max-w-md text-lg text-[var(--muted)]">
            Live transcripts. Instant summaries. Real-time CRM.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {overviewStats.map((s) => (
            <StatCard key={s.label} stat={s} />
          ))}
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          <GlassCard className="p-6 lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
                  Calls · 30 days
                </div>
                <div className="mt-2 text-3xl font-bold text-[var(--ink)]">
                  <span className="vox-shimmer-text">28,140</span>
                </div>
              </div>
              <div className="flex gap-2 text-xs">
                {["7d", "30d", "90d"].map((p, i) => (
                  <span
                    key={p}
                    className={`rounded-full border px-3 py-1.5 ${
                      i === 1
                        ? "border-[var(--border)] bg-white/85 text-[var(--ink)]"
                        : "border-[var(--border-soft)] bg-white/55 text-[var(--muted)]"
                    }`}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-6 overflow-hidden">
              <Sparkline
                data={analyticsSeries.calls}
                color="#9B8FE0"
                width={760}
                height={180}
              />
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
              Live activity
            </div>
            <ul className="mt-5 space-y-4">
              {[
                {
                  t: "Aurora booked appointment · Daniel Hayes",
                  c: "#6FA8E8",
                  time: "2m",
                },
                {
                  t: "Lyra escalated to human · Stratus Health",
                  c: "#9B8FE0",
                  time: "8m",
                },
                {
                  t: "New lead synced to HubSpot · Helix",
                  c: "#7CC9DC",
                  time: "12m",
                },
                {
                  t: "Vega closed renewal · $48k",
                  c: "#1E3A8A",
                  time: "1h",
                },
                {
                  t: "Nova confirmed appointment · Akira T.",
                  c: "#B5A0E5",
                  time: "2h",
                },
              ].map((a, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                    style={{
                      background: a.c,
                      boxShadow: `0 0 10px ${a.c}88`,
                    }}
                  />
                  <div className="flex-1">
                    <div className="text-[var(--text)]">{a.t}</div>
                    <div className="text-xs text-[var(--subtle)]">
                      {a.time} ago
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      </section>

      {/* CALL LOGS PREVIEW */}
      <section className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 md:px-12">
        <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-end">
          <div>
            <SectionLabel color="#9B8FE0">Call logs</SectionLabel>
            <h2 className="mt-8 text-5xl font-semibold tracking-[-0.02em] text-[var(--ink)] md:text-6xl">
              Searchable.
              <br />
              <span className="vox-shimmer-text">Replayable.</span>
            </h2>
          </div>
          <div className="hidden text-base text-[var(--muted)] lg:block">
            Sentiment, intent, language — captured on every call.
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {recentCalls.slice(0, 4).map((c) => (
            <CallLogCard key={c.id} call={c} />
          ))}
        </div>
      </section>

      {/* AI SUMMARIES PREVIEW */}
      <section className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 md:px-12">
        <motion.div initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-80px"}} transition={{duration:0.8,ease:[0.32,0.72,0,1]}} className="mb-12 flex flex-col items-center text-center">
          <SectionLabel color="#1E3A8A">AI summaries</SectionLabel>
          <h2 className="mt-8 text-5xl font-semibold tracking-[-0.02em] text-[var(--ink)] md:text-7xl">
            Structured.{" "}
            <span className="vox-shimmer-text">Auto-pushed.</span>
          </h2>
          <p className="mt-5 max-w-md text-lg text-[var(--muted)]">
            Intent, entities, next actions — extracted on every call.
          </p>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-3">
          <TiltCard className="vox-glass relative overflow-hidden rounded-3xl p-7 lg:col-span-2">
            <div
              className="absolute inset-0 rounded-3xl opacity-40"
              style={{
                background:
                  "radial-gradient(circle at top right, rgba(155,143,224,0.18), transparent 60%)",
              }}
            />
            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-white ring-1 ring-white/40"
                    style={{
                      background:
                        "linear-gradient(135deg, #9B8FE0, #6FA8E8)",
                      boxShadow:
                        "0 4px 12px -3px rgba(155,143,224,0.45)",
                    }}
                  >
                    <span className="text-sm font-bold">A</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[var(--ink)]">
                      Aurora · Inbound Sales
                    </div>
                    <div className="text-xs text-[var(--muted)]">
                      Call C-49281 · 4:12 · English
                    </div>
                  </div>
                </div>
                <StatusBadge label="Booked" tone="success" />
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {[
                  {
                    l: "Caller intent",
                    v: "Pricing & availability for voice + CRM bundle",
                  },
                  { l: "Sentiment", v: "Positive · high intent" },
                  {
                    l: "Booked",
                    v: "Discovery · Tue Mar 12 · 2:00 PM PT",
                  },
                  { l: "Next action", v: "Send proposal + calendar invite" },
                ].map((row) => (
                  <div key={row.l}>
                    <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--subtle)]">
                      {row.l}
                    </div>
                    <div className="mt-1 text-sm text-[var(--ink-2)]">
                      {row.v}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-[var(--border-soft)] bg-white/60 p-4 text-sm leading-relaxed text-[var(--text)]">
                <div className="mb-2 text-[10px] uppercase tracking-[0.25em] text-[var(--subtle)]">
                  Transcript · highlight
                </div>
                <p>
                  <span className="text-[var(--subtle)]">Caller:</span>{" "}
                  &ldquo;We&apos;re losing 30% of after-hours calls — what&apos;s
                  your fastest setup?&rdquo;
                  <br />
                  <span className="text-[var(--subtle)]">Aurora:</span>{" "}
                  &ldquo;Most teams are live in under 10 minutes. I&apos;ll
                  send your calendar invite for Tuesday at 2 — would that
                  work?&rdquo;
                </p>
              </div>
            </div>
          </TiltCard>

          <div className="grid gap-5">
            <GlassCard className="p-6">
              <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--subtle)]">
                Auto-tagged
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  "pricing",
                  "after-hours",
                  "demo-request",
                  "high-intent",
                  "english",
                  "logistics",
                ].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[var(--border-soft)] bg-white/65 px-2.5 py-1 text-[11px] text-[var(--text)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--subtle)]">
                Synced to
              </div>
              <ul className="mt-4 space-y-3 text-sm">
                {[
                  { name: "HubSpot · contact created", c: "#9B8FE0" },
                  { name: "Google Calendar · event added", c: "#6FA8E8" },
                  { name: "Slack #sales · alert posted", c: "#B5A0E5" },
                  { name: "Email · follow-up sent", c: "#7CC9DC" },
                ].map((i) => (
                  <li key={i.name} className="flex items-center gap-3">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{
                        background: i.c,
                        boxShadow: `0 0 10px ${i.c}88`,
                      }}
                    />
                    <span className="text-[var(--text)]">{i.name}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* CRM PREVIEW */}
      <section className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 md:px-12">
        <div className="mb-12 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <SectionLabel color="#7CC9DC">Built-in CRM</SectionLabel>
            <h2 className="mt-8 text-5xl font-semibold tracking-[-0.02em] text-[var(--ink)] md:text-6xl">
              Pipeline that{" "}
              <span className="vox-shimmer-text">writes itself.</span>
            </h2>
          </div>
          <div className="hidden flex-wrap justify-end gap-2 lg:flex">
            {[
              "HubSpot",
              "Salesforce",
              "GoHighLevel",
              "Pipedrive",
              "Jobber",
              "ServiceTitan",
            ].map((n) => (
              <span
                key={n}
                className="rounded-full border border-[var(--border-soft)] bg-white/60 px-3 py-1.5 text-xs text-[var(--text)]"
              >
                {n}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {contacts.slice(0, 3).map((c) => (
            <CrmCard key={c.id} contact={c} />
          ))}
        </div>
      </section>

      {/* INDUSTRIES */}
      <section
        id="industries"
        className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 md:px-12"
      >
        <motion.div initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-80px"}} transition={{duration:0.8,ease:[0.32,0.72,0,1]}} className="mb-14 flex flex-col items-center text-center">
          <SectionLabel color="#1E3A8A">Industries</SectionLabel>
          <h2 className="mt-8 text-5xl font-semibold tracking-[-0.02em] text-[var(--ink)] md:text-7xl">
            Tuned for{" "}
            <span className="vox-shimmer-text">your industry.</span>
          </h2>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((ind) => (
            <TiltCard
              key={ind.name}
              className="vox-glass relative overflow-hidden rounded-3xl p-7"
            >
              <div
                className="absolute inset-0 rounded-3xl opacity-50"
                style={{
                  background: `radial-gradient(circle at top, ${ind.accent}24, transparent 60%)`,
                }}
              />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-xl text-white ring-1 ring-white/40"
                    style={{
                      background: `linear-gradient(135deg, ${ind.accent}, ${ind.accent}cc)`,
                      boxShadow: `0 6px 16px -6px ${ind.accent}aa`,
                    }}
                  >
                    <span className="h-2 w-2 rounded-full bg-white" />
                  </span>
                  <h3 className="text-xl font-semibold text-[var(--ink)]">
                    {ind.name}
                  </h3>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-[var(--text)]">
                  {ind.blurb}
                </p>
                <ul className="mt-5 space-y-2 text-sm text-[var(--ink-2)]">
                  {ind.points.map((p) => (
                    <li key={p} className="flex items-center gap-3">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{
                          background: ind.accent,
                          boxShadow: `0 0 6px ${ind.accent}88`,
                        }}
                      />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 md:px-12"
      >
        <motion.div initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-80px"}} transition={{duration:0.8,ease:[0.32,0.72,0,1]}} className="mb-14 flex flex-col items-center text-center">
          <SectionLabel color="#9B8FE0">Features</SectionLabel>
          <h2 className="mt-8 text-5xl font-semibold tracking-[-0.02em] text-[var(--ink)] md:text-7xl">
            Everything you need.
            <br />
            <span className="vox-shimmer-text">Nothing you don&apos;t.</span>
          </h2>
        </motion.div>

        <div className="vox-glass grid gap-px overflow-hidden rounded-3xl md:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div
              key={f.t}
              className="vox-ease group relative bg-white/35 p-7 transition hover:bg-white/65"
            >
              <div
                className="flex h-11 w-11 items-center justify-center rounded-xl ring-1 ring-white/50 transition group-hover:ring-white/70"
                style={{
                  background: `linear-gradient(135deg, ${f.c}33, ${f.c}11)`,
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={f.c}
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {f.icon}
                </svg>
              </div>
              <h3 className="mt-5 text-base font-semibold text-[var(--ink)]">
                {f.t}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text)]">
                {f.d}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 md:px-12">
        <motion.div initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-80px"}} transition={{duration:0.8,ease:[0.32,0.72,0,1]}} className="mb-14 flex flex-col items-center text-center">
          <SectionLabel color="#B5A0E5">How it works</SectionLabel>
          <h2 className="mt-8 text-5xl font-semibold tracking-[-0.02em] text-[var(--ink)] md:text-7xl">
            Live in <span className="vox-shimmer-text">10 minutes.</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-4">
          {STEPS.map((s, i, arr) => (
            <TiltCard
              key={s.n}
              className="vox-glass relative rounded-2xl p-6"
            >
              <div className="vox-shimmer-text font-mono text-3xl font-bold">
                {s.n}
              </div>
              <h3 className="mt-3 text-lg font-semibold text-[var(--ink)]">
                {s.t}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text)]">
                {s.d}
              </p>
              {i < arr.length - 1 && (
                <div className="absolute right-[-12px] top-1/2 hidden h-px w-6 bg-gradient-to-r from-[var(--border-strong)] to-transparent md:block" />
              )}
            </TiltCard>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section
        id="pricing"
        className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 md:px-12"
      >
        <motion.div initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-80px"}} transition={{duration:0.8,ease:[0.32,0.72,0,1]}} className="mb-14 flex flex-col items-center text-center">
          <SectionLabel color="#9B8FE0">Pricing</SectionLabel>
          <h2 className="mt-8 text-5xl font-semibold tracking-[-0.02em] text-[var(--ink)] md:text-7xl">
            Simple{" "}
            <span className="vox-shimmer-text">pricing.</span>
          </h2>
          <p className="mt-5 text-lg text-[var(--muted)]">
            Start free. Cancel anytime.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {PRICING.map((p) => (
            <TiltCard
              key={p.name}
              className={`relative overflow-hidden rounded-3xl p-8 ${
                p.highlight
                  ? "vox-glass-strong border-transparent shadow-[var(--shadow-lift)]"
                  : "vox-glass"
              }`}
            >
              {p.highlight && (
                <>
                  <div
                    className="absolute inset-0 rounded-3xl"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(111,168,232,0.16), rgba(155,143,224,0.16), rgba(124,201,220,0.12))",
                    }}
                  />
                  <div
                    className="absolute inset-0 rounded-3xl"
                    style={{
                      padding: "1px",
                      background:
                        "linear-gradient(135deg, #6FA8E8, #9B8FE0, #7CC9DC)",
                      WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                    }}
                  />
                </>
              )}
              <div className="relative">
                {p.highlight && (
                  <div
                    className="absolute -top-2 right-0 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white"
                    style={{
                      background:
                        "linear-gradient(90deg, #6FA8E8, #9B8FE0, #7CC9DC)",
                      boxShadow: "0 6px 18px -6px rgba(155,143,224,0.6)",
                    }}
                  >
                    Most popular
                  </div>
                )}
                <div className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                  {p.name}
                </div>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-5xl font-bold tracking-tight text-[var(--ink)]">
                    {p.price}
                  </span>
                  <span className="text-sm text-[var(--subtle)]">
                    {p.per}
                  </span>
                </div>
                <p className="mt-3 text-sm text-[var(--text)]">{p.desc}</p>

                <ul className="mt-6 space-y-3 text-sm">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-3 text-[var(--text)]"
                    >
                      <span
                        className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(111,168,232,0.85), rgba(155,143,224,0.85))",
                          boxShadow:
                            "0 2px 6px -2px rgba(155,143,224,0.5)",
                        }}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={p.name === "Scale" ? "#contact" : "/register"}
                  className={`vox-ease mt-8 block rounded-full px-6 py-3 text-center text-sm font-semibold transition ${
                    p.highlight
                      ? "vox-btn-soft"
                      : "border border-[var(--border)] bg-white/70 text-[var(--ink-2)] hover:bg-white/90"
                  }`}
                >
                  {p.cta}
                </Link>
              </div>
            </TiltCard>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[var(--muted)]">
          <span>SOC 2 controls</span>
          <span>·</span>
          <span>HIPAA-aligned</span>
          <span>·</span>
          <span>BAA available</span>
          <span>·</span>
          <span>US data residency</span>
          <span>·</span>
          <span>30+ languages</span>
        </div>
      </section>

      {/* SUBTLE VIDEO HINT */}
      <section className="relative z-10 mx-auto w-full max-w-5xl px-6 py-12 md:px-12">
        <div className="vox-glass relative overflow-hidden rounded-2xl px-6 py-5 text-center">
          <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--subtle)]">
            Coming next
          </div>
          <div className="mt-2 text-sm text-[var(--text)]">
            <span className="font-medium text-[var(--ink)]">
              Video intelligence
            </span>{" "}
            — joining the platform soon, for retail, hospitality and security
            teams. Calls remain our core focus.
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        id="contact"
        className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24 md:px-12"
      >
        <div className="vox-glass-strong relative overflow-hidden rounded-[40px] p-10 shadow-[var(--shadow-lift)] md:p-16">
          <div
            className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full blur-3xl"
            style={{
              background: "#A8C9F0",
              opacity: 0.65,
              animation: "vox-pulse-soft 9s ease-in-out infinite",
            }}
          />
          <div
            className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full blur-3xl"
            style={{
              background: "#C5BBED",
              opacity: 0.6,
              animation: "vox-pulse-soft 11s ease-in-out infinite",
            }}
          />
          <div
            className="pointer-events-none absolute right-12 top-12 h-40 w-40 rounded-full blur-2xl"
            style={{
              background: "#A8E0EA",
              opacity: 0.5,
              animation: "vox-pulse-soft 7s ease-in-out infinite",
            }}
          />

          <div className="relative max-w-2xl">
            <SectionLabel color="#1E3A8A">Ready when you are</SectionLabel>
            <h2 className="mt-8 text-5xl font-semibold leading-[1] tracking-[-0.02em] text-[var(--ink)] md:text-7xl">
              Start{" "}
              <span className="vox-shimmer-text">booking jobs.</span>
            </h2>
            <p className="mt-5 max-w-md text-lg text-[var(--muted)]">
              Live in 10 minutes. 14-day free trial.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <GlowCTA href="/register">Start free trial</GlowCTA>
              <GhostCTA href="/login">Talk to sales</GhostCTA>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 mx-auto w-full max-w-7xl border-t border-[var(--border-soft)] px-6 py-14 md:px-12">
        <div className="grid gap-10 md:grid-cols-[1.2fr_repeat(4,1fr)]">
          <div>
            <div className="flex items-center gap-3 text-lg font-bold tracking-[0.28em] text-[var(--ink)]">
              <span
                className="inline-block h-3 w-3 rounded-sm"
                style={{
                  background:
                    "linear-gradient(135deg, #6FA8E8, #9B8FE0, #7CC9DC)",
                  boxShadow: "0 0 18px rgba(155,143,224,0.55)",
                }}
              />
              VOXGARD
            </div>
            <p className="mt-4 max-w-xs text-sm text-[var(--muted)]">
              AI call operations for US service businesses. Never miss a
              call. Book more jobs.
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs">
              <span
                className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                style={{ boxShadow: "0 0 8px rgba(16,185,129,0.7)" }}
              />
              <span className="text-emerald-700">All systems operational</span>
            </div>
          </div>

          {[
            {
              h: "Product",
              links: [
                ["Platform", "#preview"],
                ["Features", "#features"],
                ["Pricing", "#pricing"],
                ["Dashboard", "/dashboard"],
              ],
            },
            {
              h: "Industries",
              links: [
                ["Dental", "#industries"],
                ["Med Spa", "#industries"],
                ["HVAC", "#industries"],
                ["Home Services", "#industries"],
                ["Legal", "#industries"],
                ["Real Estate", "#industries"],
              ],
            },
            {
              h: "Company",
              links: [
                ["About", "#"],
                ["Customers", "#"],
                ["Careers", "#"],
                ["Contact", "#contact"],
              ],
            },
            {
              h: "Legal",
              links: [
                ["Privacy", "#"],
                ["Terms", "#"],
                ["Security", "#"],
                ["HIPAA / BAA", "#"],
              ],
            },
          ].map((col) => (
            <div key={col.h}>
              <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--subtle)]">
                {col.h}
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="vox-ease text-[var(--muted)] transition hover:text-[var(--ink)]"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[var(--border-soft)] pt-6 text-xs text-[var(--muted)] md:flex-row">
          <div>© 2026 Voxgard, Inc. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <span>SOC 2 · HIPAA-aligned · US-hosted</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
