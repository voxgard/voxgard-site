"use client";

import { motion } from "framer-motion";
import type { Theme } from "../themes";
import { features } from "../data/features";
import { copy } from "../data/copy";

export default function FeaturesSection({ theme }: { theme: Theme }) {
  const { palette, surfaces } = theme;

  return (
    <section
      id="features"
      className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 md:px-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        className="mb-14 flex flex-col items-center text-center"
      >
        <Eyebrow color={palette.accent2}>{copy.features.eyebrow}</Eyebrow>
        <h2
          className="mt-8 text-5xl font-semibold tracking-[-0.02em] md:text-7xl"
          style={{ color: palette.ink }}
        >
          {copy.features.headline}
          <br />
          <span
            style={{
              backgroundImage: `linear-gradient(90deg, ${palette.accent1}, ${palette.accent2}, ${palette.accent3})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            {copy.features.headlineAccent}
          </span>
        </h2>
      </motion.div>

      <div
        className="grid gap-px overflow-hidden md:grid-cols-2 lg:grid-cols-4"
        style={{
          borderRadius: surfaces.cardRadiusPx,
          background: palette.border,
        }}
      >
        {features.map((f) => (
          <div
            key={f.title}
            className="group relative p-7 transition-all duration-700"
            style={{
              background: palette.glass,
              backdropFilter: `blur(${surfaces.glassBlurPx}px) saturate(${surfaces.glassSaturate}%)`,
              WebkitBackdropFilter: `blur(${surfaces.glassBlurPx}px) saturate(${surfaces.glassSaturate}%)`,
            }}
          >
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl"
              style={{
                background: `linear-gradient(135deg, ${f.accent}33, ${f.accent}11)`,
                border: `1px solid ${palette.border}`,
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke={f.accent}
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {f.icon}
              </svg>
            </div>
            <h3
              className="mt-5 text-base font-semibold"
              style={{ color: palette.ink }}
            >
              {f.title}
            </h3>
            <p
              className="mt-2 text-sm leading-relaxed"
              style={{ color: palette.body }}
            >
              {f.description}
            </p>
          </div>
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
