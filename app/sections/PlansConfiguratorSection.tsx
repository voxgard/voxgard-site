"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { plans } from "../data/plans";
import { addons } from "../data/addons";
import { copy } from "../data/copy";
import DepthLayer from "../components/visuals/DepthLayer";

/**
 * Premium pricing ecosystem — base plan + selectable add-ons.
 * Front-end interaction only; total updates live.
 */
export default function PlansConfiguratorSection() {
  const [planIdx, setPlanIdx] = useState(1); // default Growth
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const activePlan = plans[planIdx];

  const planBase = useMemo(() => {
    const m = activePlan.price.match(/\$([\d,]+)/);
    return m ? parseInt(m[1].replace(/,/g, ""), 10) : 0;
  }, [activePlan]);

  const addonsTotal = useMemo(() => {
    return addons.reduce((sum, a) => {
      if (selected[a.id] && !a.comingSoon) return sum + a.pricePerMonth;
      return sum;
    }, 0);
  }, [selected]);

  const total = planBase + addonsTotal;

  const isCustom = activePlan.price === "Custom";

  return (
    <section
      id="pricing"
      className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32 md:px-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1] }}
        className="mb-14 flex flex-col items-center text-center"
      >
        <Eyebrow color="#1E3A8A">{copy.pricing.eyebrow}</Eyebrow>
        <h2 className="mt-8 text-5xl font-semibold tracking-[-0.02em] text-[var(--ink)] md:text-7xl">
          Build your{" "}
          <span className="vox-shimmer-text">stack.</span>
        </h2>
        <p className="mt-5 text-lg text-[var(--muted)]">
          Pick a base plan. Toggle add-ons. See the total update live.
        </p>
      </motion.div>

      {/* Base plans — staggered 3D depth wave */}
      <div className="grid gap-6 md:grid-cols-3 md:items-stretch">
        {plans.map((p, i) => {
          const active = i === planIdx;
          return (
            <DepthLayer
              key={p.name}
              z={40}
              cursor
              intensity={0.5}
              className="relative h-full"
              innerClassName="rounded-3xl h-full"
            >
              <motion.button
                type="button"
                onClick={() => setPlanIdx(i)}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.08,
                  ease: [0.32, 0.72, 0, 1],
                }}
                whileHover={{ y: -4 }}
                className="vox-glass vox-glow-card group relative h-full w-full cursor-pointer overflow-hidden rounded-3xl text-left"
                style={{
                  paddingTop: "2.75rem",
                  paddingRight: "1.75rem",
                  paddingBottom: "1.75rem",
                  paddingLeft: "1.75rem",
                  boxShadow: active
                    ? p.highlight
                      ? "0 40px 90px -25px rgba(155,143,224,0.55), 0 18px 32px -12px rgba(111,168,232,0.35), inset 0 1px 0 rgba(255,255,255,0.7)"
                      : "0 28px 70px -22px rgba(31,60,122,0.35), 0 10px 22px -8px rgba(31,60,122,0.18), inset 0 1px 0 rgba(255,255,255,0.55)"
                    : p.highlight
                      ? "0 28px 70px -22px rgba(155,143,224,0.40), 0 10px 22px -8px rgba(111,168,232,0.20), inset 0 1px 0 rgba(255,255,255,0.55)"
                      : "0 12px 36px -14px rgba(31,60,122,0.18), 0 4px 10px -4px rgba(31,60,122,0.08), inset 0 1px 0 rgba(255,255,255,0.5)",
                  transition:
                    "box-shadow 0.7s cubic-bezier(0.32, 0.72, 0, 1)",
                }}
              >
                {/* Active gradient ring (replaces flat outline). */}
                {active && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-3xl"
                    style={{
                      padding: "1.5px",
                      background:
                        "linear-gradient(135deg, rgba(111,168,232,0.85), rgba(155,143,224,0.85), rgba(124,201,220,0.85))",
                      WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                    }}
                  />
                )}

                {/* Top accent gradient overlay — adds dimensionality. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-32 opacity-60"
                  style={{
                    background: p.highlight
                      ? "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(155,143,224,0.18), transparent 70%)"
                      : "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(168,201,240,0.10), transparent 70%)",
                  }}
                />

                {/* MOST POPULAR ribbon — flush to top, no clipping issues. */}
                {p.highlight && (
                  <div
                    className="absolute inset-x-0 top-0 flex items-center justify-center gap-1.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-white"
                    style={{
                      background:
                        "linear-gradient(90deg, #6FA8E8, #9B8FE0 50%, #7CC9DC)",
                      boxShadow:
                        "0 4px 14px -4px rgba(155,143,224,0.45), inset 0 -1px 0 rgba(255,255,255,0.25)",
                    }}
                  >
                    <span
                      className="h-1 w-1 rounded-full bg-white"
                      style={{ boxShadow: "0 0 6px rgba(255,255,255,0.9)" }}
                    />
                    Most popular
                  </div>
                )}

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                      {p.name}
                    </div>
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full border transition ${
                        active
                          ? "border-transparent"
                          : "border-[var(--border-strong)]"
                      }`}
                      style={{
                        background: active
                          ? "linear-gradient(135deg, #6FA8E8, #9B8FE0)"
                          : "transparent",
                        boxShadow: active
                          ? "0 4px 10px -2px rgba(155,143,224,0.5)"
                          : undefined,
                      }}
                    >
                      {active && (
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 14 14"
                          fill="none"
                          stroke="white"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 7l3 3 5-6" />
                        </svg>
                      )}
                    </span>
                  </div>

                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="text-4xl font-bold tracking-tight text-[var(--ink)]">
                      {p.price}
                    </span>
                    <span className="text-sm text-[var(--muted)]">{p.per}</span>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-[var(--text)]">
                    {p.desc}
                  </p>
                </div>
              </motion.button>
            </DepthLayer>
          );
        })}
      </div>

      {/* Add-ons */}
      <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-start">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
            Add-ons
          </h3>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {addons.map((a, i) => {
              const isOn = !!selected[a.id];
              const disabled = !!a.comingSoon;
              return (
                <motion.button
                  key={a.id}
                  type="button"
                  disabled={disabled}
                  onClick={() =>
                    setSelected((cur) => ({ ...cur, [a.id]: !cur[a.id] }))
                  }
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.04,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                  className="vox-glass relative w-full rounded-2xl p-4 text-left transition-all"
                  style={{
                    outline: isOn
                      ? "2px solid rgba(155,143,224,0.55)"
                      : "2px solid transparent",
                    outlineOffset: -2,
                    opacity: disabled ? 0.55 : 1,
                    cursor: disabled ? "not-allowed" : "pointer",
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-[var(--ink)]">
                          {a.name}
                        </span>
                        {disabled && (
                          <span className="rounded-full bg-[var(--brand-violet)]/10 px-1.5 py-0.5 text-[9px] uppercase tracking-[0.2em] text-[var(--brand-navy)]">
                            soon
                          </span>
                        )}
                      </div>
                      <div className="mt-0.5 text-[11px] text-[var(--subtle)]">
                        {a.unit}
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-[var(--muted)]">
                        {a.desc}
                      </p>
                    </div>

                    <div className="flex shrink-0 flex-col items-end gap-2">
                      <div className="text-right text-sm font-semibold text-[var(--ink)]">
                        {a.price}
                      </div>
                      <Toggle on={isOn} disabled={disabled} />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Sticky summary */}
        <div className="lg:sticky lg:top-8">
          <div className="vox-glass-strong relative overflow-hidden rounded-3xl p-6 shadow-[0_24px_60px_-20px_rgba(31,60,122,0.18)]">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--subtle)]">
              Your stack
            </div>

            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-base font-semibold text-[var(--ink)]">
                {activePlan.name}
              </span>
              <span className="text-base text-[var(--text)]">
                {isCustom ? "Custom" : `$${planBase}`}
              </span>
            </div>

            <ul className="mt-3 space-y-1 text-xs text-[var(--muted)]">
              <AnimatePresence initial={false}>
                {addons.map((a) =>
                  selected[a.id] && !a.comingSoon ? (
                    <motion.li
                      key={a.id}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -6 }}
                      transition={{ duration: 0.35 }}
                      className="flex items-baseline justify-between"
                    >
                      <span>+ {a.name}</span>
                      <span>${a.pricePerMonth}</span>
                    </motion.li>
                  ) : null,
                )}
              </AnimatePresence>
            </ul>

            <div className="mt-5 border-t border-[var(--border-soft)] pt-5">
              <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--subtle)]">
                Estimated monthly
              </div>
              <div className="mt-2 text-4xl font-bold tracking-tight text-[var(--ink)]">
                {isCustom ? (
                  "Custom"
                ) : (
                  <>
                    <motion.span
                      key={total}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="vox-shimmer-text inline-block"
                    >
                      ${total}
                    </motion.span>
                    <span className="ml-1 text-sm text-[var(--subtle)]">
                      / mo
                    </span>
                  </>
                )}
              </div>
            </div>

            <Link
              href={isCustom ? "#contact" : activePlan.ctaHref}
              className="vox-btn-soft mt-6 inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold"
            >
              {isCustom ? "Talk to sales" : "Start free trial"}
            </Link>

            <div className="mt-3 text-center text-[10px] uppercase tracking-[0.25em] text-[var(--subtle)]">
              No credit card · 14-day trial
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[var(--muted)]">
        {copy.pricing.trust.map((t, i) => (
          <span key={t} className="flex items-center gap-3">
            {i > 0 && <span className="text-[var(--subtle)]">·</span>}
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}

function Toggle({ on, disabled }: { on: boolean; disabled?: boolean }) {
  return (
    <span
      className="relative flex h-6 w-11 items-center rounded-full transition-all"
      style={{
        background: on
          ? "linear-gradient(135deg, #6FA8E8, #9B8FE0)"
          : "rgba(15,23,42,0.08)",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <motion.span
        className="block h-5 w-5 rounded-full bg-white shadow-md"
        animate={{ x: on ? 22 : 2 }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      />
    </span>
  );
}

function Eyebrow({ color, children }: { color: string; children: React.ReactNode }) {
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
