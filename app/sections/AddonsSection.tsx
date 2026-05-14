"use client";

import { motion } from "framer-motion";
import type { Theme } from "../themes";
import { addons } from "../data/addons";
import { copy } from "../data/copy";

export default function AddonsSection({ theme }: { theme: Theme }) {
  const { palette, surfaces } = theme;

  return (
    <section
      id="addons"
      className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 md:px-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        className="mb-14 flex flex-col items-center text-center"
      >
        <Eyebrow color={palette.accent3}>{copy.addons.eyebrow}</Eyebrow>
        <h2
          className="mt-8 text-5xl font-semibold tracking-[-0.02em] md:text-7xl"
          style={{ color: palette.ink }}
        >
          {copy.addons.headline}{" "}
          <span
            style={{
              backgroundImage: `linear-gradient(90deg, ${palette.accent1}, ${palette.accent2}, ${palette.accent3})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            {copy.addons.headlineAccent}
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
        {addons.map((a) => (
          <div
            key={a.id}
            className="group p-6 transition-all duration-700"
            style={{
              background: palette.glass,
              backdropFilter: `blur(${surfaces.glassBlurPx}px) saturate(${surfaces.glassSaturate}%)`,
              WebkitBackdropFilter: `blur(${surfaces.glassBlurPx}px) saturate(${surfaces.glassSaturate}%)`,
            }}
          >
            <div className="flex items-baseline justify-between gap-3">
              <h3
                className="text-base font-semibold"
                style={{ color: palette.ink }}
              >
                {a.name}
              </h3>
              <div
                className="text-right text-sm font-medium tracking-tight"
                style={{ color: palette.navy }}
              >
                {a.price}
              </div>
            </div>
            <div
              className="text-[10px] uppercase tracking-[0.2em]"
              style={{ color: palette.subtle }}
            >
              {a.unit}
            </div>
            <p
              className="mt-3 text-sm leading-relaxed"
              style={{ color: palette.body }}
            >
              {a.desc}
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
