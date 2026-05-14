"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import DepthLayer from "../components/visuals/DepthLayer";
import FloatingPanel from "../components/visuals/FloatingPanel";
import StatusBadge from "../components/StatusBadge";
import VoiceOrb from "../components/VoiceOrb";
import { industries as INDUSTRIES } from "../data/industries";
import { copy } from "../data/copy";
import VoiceDemoSection from "../sections/VoiceDemoSection";
import RoiSection from "../sections/RoiSection";
import PlansConfiguratorSection from "../sections/PlansConfiguratorSection";

/* ============================================================
   Atomic UI helpers
   ============================================================ */

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
      className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-white/80 px-4 py-1.5 text-[11px] uppercase tracking-[0.3em] backdrop-blur-xl"
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
  const [activeIdx, setActiveIdx] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIdx((i) => (i + 1) % 4);
    }, 2200);
    return () => window.clearInterval(id);
  }, []);

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
      className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 md:px-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1] }}
        className="mb-12 flex flex-col items-center text-center"
      >
        <SectionLabel color="#1E3A8A">{copy.flow.eyebrow}</SectionLabel>
        <h2 className="mt-6 text-5xl font-semibold tracking-[-0.02em] text-[var(--ink)] md:text-6xl">
          {copy.flow.headline}{" "}
          <span className="vox-shimmer-text">{copy.flow.headlineAccent}</span>
        </h2>
      </motion.div>

      <div className="relative">
        {/* Connecting line — desktop */}
        <div className="pointer-events-none absolute left-0 right-0 top-1/2 hidden -translate-y-1/2 lg:block">
          <div className="relative mx-auto h-px max-w-[88%]">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--brand-violet)]/40 to-transparent" />
            <motion.div
              className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full"
              style={{
                background: "#9B8FE0",
                boxShadow: "0 0 18px #9B8FE0",
              }}
              animate={{ left: ["0%", "100%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {stages.map((s, i) => {
            const isActive = i === activeIdx;
            const zMap = [20, 80, 50, 20] as const;
            return (
              <DepthLayer
                key={s.n}
                z={zMap[i]}
                cursor
                intensity={0.7}
                className="relative"
                innerClassName="rounded-3xl"
              >
                <motion.div
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.18,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                  whileHover={{ y: -6 }}
                  animate={{
                    y: isActive ? -6 : 0,
                    scale: isActive ? 1.025 : 1,
                  }}
                  style={{
                    transition:
                      "transform 0.7s cubic-bezier(0.32, 0.72, 0, 1)",
                  }}
                >
                  <div
                    className="vox-glass-strong vox-glow-card relative overflow-hidden rounded-3xl p-6"
                    style={{
                      boxShadow: isActive
                        ? `0 30px 80px -20px ${s.accent}66, 0 12px 24px -10px ${s.accent}40`
                        : "0 8px 30px -6px rgba(31,60,122,0.10), 0 2px 6px rgba(31,60,122,0.04)",
                      transition: "box-shadow 0.7s cubic-bezier(0.32, 0.72, 0, 1)",
                    }}
                  >
                    <div
                      className="pointer-events-none absolute inset-0 opacity-50"
                      style={{
                        background: `radial-gradient(circle at top, ${s.accent}1F, transparent 65%)`,
                      }}
                    />
                    <div className="relative">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs tracking-[0.3em] text-[var(--muted)]">
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
                          animate={{ scale: [1, 1.06, 1] }}
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
                          <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--muted)]">
                            {s.label}
                          </div>
                          <div className="mt-0.5 text-base font-semibold text-[var(--ink)]">
                            {s.title}
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 rounded-xl border border-[var(--border-soft)] bg-white/70 p-3 text-xs text-[var(--text)]">
                        {s.sub}
                      </div>

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
                                height: [
                                  `${20 + (j % 4) * 12}%`,
                                  `${50 + (j % 5) * 16}%`,
                                  `${20 + (j % 4) * 12}%`,
                                ],
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
                                  : "text-[var(--muted)]"
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
                              className="rounded-full border border-[var(--border-soft)] bg-white/80 px-2 py-0.5 text-[10px] text-[var(--text)]"
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

                  {i < stages.length - 1 && (
                    <div className="my-3 flex justify-center lg:hidden">
                      <span className="text-[var(--muted)]">↓</span>
                    </div>
                  )}
                </motion.div>
              </DepthLayer>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Industries — compact chip strip
   ============================================================ */

function IndustriesStrip() {
  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-12 md:px-12">
      <div className="flex flex-col items-center gap-5">
        <div className="text-[10px] uppercase tracking-[0.4em] text-[var(--muted)]">
          Tuned for your industry
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {INDUSTRIES.map((ind) => (
            <span
              key={ind.name}
              className="vox-glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[12px] text-[var(--ink-2)]"
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  background: ind.accent,
                  boxShadow: `0 0 8px ${ind.accent}aa`,
                }}
              />
              {ind.name}
            </span>
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
            <a href="#pricing" onClick={() => setOpen(false)} className="text-[var(--text)]">
              Pricing
            </a>
            <a href="#flow" onClick={() => setOpen(false)} className="text-[var(--text)]">
              How it works
            </a>
            <a href="#voice" onClick={() => setOpen(false)} className="text-[var(--text)]">
              Voice demo
            </a>
            <Link href="/login" onClick={() => setOpen(false)} className="text-[var(--text)]">
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
   Page
   ============================================================ */

export default function Home() {
  return (
    <main className="relative min-h-screen text-[var(--ink)]">
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
          {copy.brand}
        </Link>

        <nav className="hidden items-center gap-9 text-sm text-[var(--text)] md:flex">
          <a href="#pricing" className="vox-ease transition hover:text-[var(--ink)]">
            Pricing
          </a>
          <a href="#flow" className="vox-ease transition hover:text-[var(--ink)]">
            How it works
          </a>
          <a href="#voice" className="vox-ease transition hover:text-[var(--ink)]">
            Voice
          </a>
          <Link href="/dashboard" className="vox-ease transition hover:text-[var(--ink)]">
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

      {/* HERO — minimal, big reactive orb */}
      <section className="relative z-10 mx-auto flex min-h-[82vh] w-full max-w-7xl flex-col items-center justify-center px-6 pt-6 pb-16 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
          className="relative flex flex-col items-center text-center"
        >
          <SectionLabel color="#1E3A8A">{copy.hero.eyebrow}</SectionLabel>

          <h1 className="mt-8 text-6xl font-semibold leading-[0.98] tracking-[-0.03em] text-[var(--ink)] md:text-[7.5rem] lg:text-[8.5rem]">
            {copy.hero.headline}
            <br />
            <span className="vox-shimmer-text">{copy.hero.headlineAccent}</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--text)] md:text-xl">
            {copy.hero.sub}
          </p>

          {/* Big reactive orb with floating depth-layered indicators */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="relative my-12 flex w-full justify-center"
          >
            {/* top-left — mid depth */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.9, ease: [0.32, 0.72, 0, 1] }}
              className="absolute left-[6%] top-[8%] z-10 hidden md:block"
            >
              <DepthLayer z={70} float cursor intensity={1.1}>
                <FloatingPanel className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                    style={{
                      boxShadow: "0 0 10px rgba(16,185,129,0.7)",
                      animation: "vox-pulse 1.6s ease-in-out infinite",
                    }}
                  />
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--ink-2)]">
                    Live · 04 calls
                  </span>
                </FloatingPanel>
              </DepthLayer>
            </motion.div>

            {/* left-middle — Aurora listening, deeper */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.0, ease: [0.32, 0.72, 0, 1] }}
              className="absolute left-[2%] top-[44%] z-10 hidden lg:block"
            >
              <DepthLayer z={45} float cursor intensity={0.9}>
                <FloatingPanel
                  tone="accent"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-2xl"
                >
                  <div
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-[10px] font-bold text-white"
                    style={{
                      background: "linear-gradient(135deg, #9B8FE0, #6FA8E8)",
                      boxShadow: "0 6px 14px -4px rgba(155,143,224,0.55)",
                    }}
                  >
                    A
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-[0.25em] text-[var(--muted)]">
                      Aurora · listening
                    </span>
                    <div className="mt-1 flex h-3 items-end gap-[2px]">
                      {Array.from({ length: 14 }).map((_, j) => (
                        <motion.span
                          key={j}
                          className="w-[2px] rounded-full"
                          style={{
                            background:
                              "linear-gradient(180deg, #9B8FE0, #6FA8E8)",
                          }}
                          animate={{
                            height: [
                              `${30 + (j % 4) * 14}%`,
                              `${60 + (j % 5) * 12}%`,
                              `${30 + (j % 4) * 14}%`,
                            ],
                            opacity: [0.5, 0.95, 0.5],
                          }}
                          transition={{
                            duration: 1.4 + (j % 3) * 0.25,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: j * 0.06,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </FloatingPanel>
              </DepthLayer>
            </motion.div>

            {/* bottom-right — closest, booked */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.1, ease: [0.32, 0.72, 0, 1] }}
              className="absolute bottom-[10%] right-[4%] z-10 hidden md:block"
            >
              <DepthLayer z={95} float cursor intensity={1.2}>
                <FloatingPanel
                  tone="deep"
                  className="flex max-w-[220px] flex-col px-4 py-3 rounded-2xl"
                >
                  <span className="text-[9px] uppercase tracking-[0.3em] text-[var(--muted)]">
                    Booked just now
                  </span>
                  <span className="mt-1 text-sm font-semibold text-[var(--ink)]">
                    Tue · 2:00 PM
                  </span>
                  <span className="text-[11px] text-[var(--text)]">
                    Synced to HubSpot
                  </span>
                </FloatingPanel>
              </DepthLayer>
            </motion.div>

            <VoiceOrb size={520} />
          </motion.div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <GlowCTA href={copy.hero.primaryCta.href}>
              {copy.hero.primaryCta.label}
            </GlowCTA>
            <GhostCTA href={copy.hero.secondaryCta.href}>
              {copy.hero.secondaryCta.label}
            </GhostCTA>
          </div>
        </motion.div>
      </section>

      {/* PRICING — moved up, right after Hero */}
      <PlansConfiguratorSection />

      {/* AI IN ACTION — animated pipeline */}
      <CallFlowSection />

      {/* INDUSTRIES — compact chip strip */}
      <IndustriesStrip />

      {/* ROI calculator */}
      <RoiSection />

      {/* VOICE DEMO */}
      <VoiceDemoSection />

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

          <div className="relative max-w-2xl">
            <SectionLabel color="#1E3A8A">{copy.cta.eyebrow}</SectionLabel>
            <h2 className="mt-8 text-5xl font-semibold leading-[1] tracking-[-0.02em] text-[var(--ink)] md:text-7xl">
              {copy.cta.headline}
              <br />
              <span className="vox-shimmer-text">{copy.cta.headlineAccent}</span>
            </h2>
            <p className="mt-6 max-w-lg text-lg text-[var(--text)]">
              {copy.cta.sub}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <GlowCTA href={copy.cta.primaryCta.href}>
                {copy.cta.primaryCta.label}
              </GlowCTA>
              <GhostCTA href={copy.cta.secondaryCta.href}>
                {copy.cta.secondaryCta.label}
              </GhostCTA>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER — compact */}
      <footer className="relative z-10 mx-auto w-full max-w-7xl border-t border-[var(--border-soft)] px-6 py-10 md:px-12">
        <div className="flex flex-col items-center justify-between gap-4 text-xs text-[var(--text)] md:flex-row">
          <div className="flex items-center gap-3">
            <span
              className="inline-block h-2.5 w-2.5 rounded-sm"
              style={{
                background:
                  "linear-gradient(135deg, #6FA8E8, #9B8FE0, #7CC9DC)",
                boxShadow: "0 0 12px rgba(155,143,224,0.55)",
              }}
            />
            <span className="font-bold tracking-[0.28em] text-[var(--ink)]">
              {copy.brand}
            </span>
            <span className="text-[var(--muted)]">© 2026</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[var(--muted)]">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
              All systems operational
            </span>
            <span>SOC 2 · HIPAA-aligned · US-hosted</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
