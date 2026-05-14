"use client";

import { motion } from "framer-motion";
import type { Theme } from "../themes";
import { industries } from "../data/industries";
import { copy } from "../data/copy";

export default function IndustriesSection({ theme }: { theme: Theme }) {
  const { palette, surfaces, motion: m, isDark } = theme;

  return (
    <section
      id="industries"
      className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 md:px-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        className="mb-14 flex flex-col items-center text-center"
      >
        <Eyebrow color={palette.navy}>{copy.industries.eyebrow}</Eyebrow>
        <h2
          className="mt-8 text-5xl font-semibold tracking-[-0.02em] md:text-7xl"
          style={{ color: palette.ink }}
        >
          {copy.industries.headline}{" "}
          <span
            style={{
              backgroundImage: `linear-gradient(90deg, ${palette.accent1}, ${palette.accent2}, ${palette.accent3})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            {copy.industries.headlineAccent}
          </span>
        </h2>
      </motion.div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {industries.map((ind, i) => (
          <motion.div
            key={ind.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.7,
              delay: i * 0.06,
              ease: [0.32, 0.72, 0, 1],
            }}
            whileHover={{ y: -4 }}
            className="relative overflow-hidden p-7"
            style={{
              borderRadius: surfaces.cardRadiusPx,
              background: palette.glass,
              backdropFilter: `blur(${surfaces.glassBlurPx}px) saturate(${surfaces.glassSaturate}%)`,
              WebkitBackdropFilter: `blur(${surfaces.glassBlurPx}px) saturate(${surfaces.glassSaturate}%)`,
              border: `1px solid ${palette.border}`,
              transition: `transform 0.7s ${m.ease}, box-shadow 0.7s ${m.ease}`,
            }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-50"
              style={{
                background: `radial-gradient(circle at top, ${ind.accent}24, transparent 60%)`,
                borderRadius: surfaces.cardRadiusPx,
              }}
            />
            <div className="relative">
              <div className="flex items-center gap-3">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl text-white"
                  style={{
                    background: `linear-gradient(135deg, ${ind.accent}, ${ind.accent}cc)`,
                    boxShadow: `0 6px 16px -6px ${ind.accent}aa`,
                    border: `1px solid ${isDark ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.5)"}`,
                  }}
                >
                  <span className="h-2 w-2 rounded-full bg-white" />
                </span>
                <h3
                  className="text-xl font-semibold"
                  style={{ color: palette.ink }}
                >
                  {ind.name}
                </h3>
              </div>
              <p
                className="mt-5 text-sm leading-relaxed"
                style={{ color: palette.body }}
              >
                {ind.blurb}
              </p>
              <ul className="mt-5 space-y-2 text-sm">
                {ind.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-3"
                    style={{ color: palette.body }}
                  >
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
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Eyebrow({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] uppercase tracking-[0.3em] backdrop-blur-xl"
      style={{
        color,
        borderColor: "rgba(15,23,42,0.08)",
        background: "rgba(255,255,255,0.4)",
      }}
    >
      <span
        className="h-1 w-1 rounded-full"
        style={{ background: color, boxShadow: `0 0 8px ${color}88` }}
      />
      {children}
    </div>
  );
}
