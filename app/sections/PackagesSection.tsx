"use client";

import { motion } from "framer-motion";
import type { Theme } from "../themes";
import { packages } from "../data/packages";
import { copy } from "../data/copy";

export default function PackagesSection({ theme }: { theme: Theme }) {
  const { palette, surfaces } = theme;

  return (
    <section
      id="packages"
      className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 md:px-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        className="mb-14 flex flex-col items-center text-center"
      >
        <Eyebrow color={palette.accent1}>{copy.packages.eyebrow}</Eyebrow>
        <h2
          className="mt-8 text-5xl font-semibold tracking-[-0.02em] md:text-7xl"
          style={{ color: palette.ink }}
        >
          {copy.packages.headline}{" "}
          <span
            style={{
              backgroundImage: `linear-gradient(90deg, ${palette.accent1}, ${palette.accent2}, ${palette.accent3})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            {copy.packages.headlineAccent}
          </span>
        </h2>
        <p className="mt-5 max-w-xl text-lg" style={{ color: palette.muted }}>
          {copy.packages.sub}
        </p>
      </motion.div>

      <div className="grid gap-5 md:grid-cols-2">
        {packages.map((pkg, i) => (
          <motion.div
            key={pkg.id}
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
            }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-50"
              style={{
                background: `radial-gradient(circle at top right, ${pkg.accent}1F, transparent 60%)`,
                borderRadius: surfaces.cardRadiusPx,
              }}
            />
            <div className="relative">
              <div className="flex items-center justify-between">
                <div
                  className="text-[10px] uppercase tracking-[0.3em]"
                  style={{ color: palette.subtle }}
                >
                  {pkg.tagline}
                </div>
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    background: pkg.accent,
                    boxShadow: `0 0 10px ${pkg.accent}aa`,
                  }}
                />
              </div>
              <h3
                className="mt-4 text-2xl font-semibold tracking-tight"
                style={{ color: palette.ink }}
              >
                {pkg.name}
              </h3>
              <p
                className="mt-3 text-sm leading-relaxed"
                style={{ color: palette.body }}
              >
                {pkg.blurb}
              </p>
              <ul className="mt-5 space-y-2 text-sm">
                {pkg.includes.map((inc) => (
                  <li
                    key={inc}
                    className="flex items-center gap-3"
                    style={{ color: palette.body }}
                  >
                    <span
                      className="h-1 w-1 rounded-full"
                      style={{ background: pkg.accent }}
                    />
                    {inc}
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
