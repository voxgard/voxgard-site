"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { roi } from "../data/roi";

/**
 * ROI / Value estimator.
 * Configuration lives in data/roi.json (admin-editable).
 */
export default function RoiSection() {
  const [missed, setMissed] = useState(roi.defaultMissed);

  const lowMV = useMotionValue(missed * roi.lowPerCall);
  const highMV = useMotionValue(missed * roi.highPerCall);

  const lowSpring = useSpring(lowMV, { stiffness: 80, damping: 18, mass: 1 });
  const highSpring = useSpring(highMV, { stiffness: 80, damping: 18, mass: 1 });

  useEffect(() => {
    lowMV.set(missed * roi.lowPerCall);
    highMV.set(missed * roi.highPerCall);
  }, [missed, lowMV, highMV]);

  const lowFmt = useTransform(lowSpring, (v) => formatMoney(v));
  const highFmt = useTransform(highSpring, (v) => formatMoney(v));

  return (
    <section
      id="roi"
      className="relative z-10 mx-auto w-full max-w-6xl px-6 py-32 md:px-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1] }}
        className="mb-12 flex flex-col items-center text-center"
      >
        <Eyebrow color="#1E3A8A">Value estimator</Eyebrow>
        <h2 className="mt-8 text-5xl font-semibold tracking-[-0.02em] text-[var(--ink)] md:text-7xl">
          Missing{" "}
          <motion.span
            key={missed}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="vox-shimmer-text inline-block"
          >
            {missed}
          </motion.span>{" "}
          calls a&nbsp;month?
        </h2>
        <p className="mt-5 max-w-md text-lg text-[var(--muted)]">
          {roi.subtitle}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
        className="vox-glass-strong relative overflow-hidden rounded-[28px] p-8 md:p-12 shadow-[0_40px_100px_-30px_rgba(31,60,122,0.2)]"
      >
        {/* Slider */}
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between text-xs">
            <span className="uppercase tracking-[0.25em] text-[var(--muted)]">
              Calls missed / month
            </span>
            <span className="font-mono text-sm text-[var(--ink-2)]">
              {missed}
            </span>
          </div>

          <input
            type="range"
            min={roi.minMissed}
            max={roi.maxMissed}
            step={1}
            value={missed}
            onChange={(e) => setMissed(parseInt(e.target.value, 10))}
            className="vox-roi-slider mt-3 w-full"
          />

          <div className="mt-1 flex justify-between text-[10px] text-[var(--subtle)]">
            <span>{roi.minMissed}</span>
            <span>{roi.defaultMissed}</span>
            <span>{Math.round((roi.minMissed + roi.maxMissed) / 2)}</span>
            <span>{roi.maxMissed}</span>
          </div>
        </div>

        {/* Result */}
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="text-center md:text-left">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--subtle)]">
              Recovered revenue
            </div>
            <div className="mt-3 flex items-baseline gap-2 md:gap-3">
              <motion.span className="vox-shimmer-text text-5xl font-bold tracking-tight md:text-7xl">
                {lowFmt}
              </motion.span>
              <span className="text-2xl text-[var(--subtle)] md:text-3xl">
                –
              </span>
              <motion.span className="vox-shimmer-text text-5xl font-bold tracking-tight md:text-7xl">
                {highFmt}
              </motion.span>
            </div>
            <div className="mt-3 text-sm text-[var(--muted)]">
              estimated / month
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
            {[
              { l: "Avg. job value", v: `$${roi.lowPerCall} – $${roi.highPerCall}` },
              { l: "Capture rate", v: roi.captureRate },
              { l: "Live in", v: roi.liveIn },
            ].map((kpi) => (
              <div
                key={kpi.l}
                className="rounded-2xl border border-[var(--border-soft)] bg-white/60 px-4 py-3 backdrop-blur-xl"
              >
                <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--subtle)]">
                  {kpi.l}
                </div>
                <div className="mt-1 text-base font-semibold text-[var(--ink)]">
                  {kpi.v}
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-[var(--subtle)]">
          {roi.footnote}
        </p>
      </motion.div>
    </section>
  );
}

function formatMoney(v: number): string {
  const rounded = Math.round(v / 100) * 100;
  if (rounded >= 1_000_000) {
    return `$${(rounded / 1_000_000).toFixed(2)}M`;
  }
  if (rounded >= 1_000) {
    return `$${(rounded / 1_000).toFixed(1)}K`;
  }
  return `$${rounded}`;
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
