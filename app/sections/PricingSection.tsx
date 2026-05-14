"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Theme } from "../themes";
import { plans as pricing } from "../data/plans";
import { copy } from "../data/copy";

export default function PricingSection({ theme }: { theme: Theme }) {
  const { palette, surfaces, motion: m } = theme;

  return (
    <section
      id="pricing"
      className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 md:px-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        className="mb-14 flex flex-col items-center text-center"
      >
        <Eyebrow color={palette.accent2}>{copy.pricing.eyebrow}</Eyebrow>
        <h2
          className="mt-8 text-5xl font-semibold tracking-[-0.02em] md:text-7xl"
          style={{ color: palette.ink }}
        >
          {copy.pricing.headline}{" "}
          <span
            style={{
              backgroundImage: `linear-gradient(90deg, ${palette.accent1}, ${palette.accent2}, ${palette.accent3})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            {copy.pricing.headlineAccent}
          </span>
        </h2>
        <p className="mt-5 text-lg" style={{ color: palette.muted }}>
          {copy.pricing.sub}
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        {pricing.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.7,
              delay: i * 0.08,
              ease: [0.32, 0.72, 0, 1],
            }}
            whileHover={{ y: -6 }}
            className="relative overflow-hidden p-8"
            style={{
              borderRadius: surfaces.cardRadiusPx + 8,
              background: p.highlight ? palette.glassStrong : palette.glass,
              backdropFilter: `blur(${surfaces.glassBlurPx}px) saturate(${surfaces.glassSaturate}%)`,
              WebkitBackdropFilter: `blur(${surfaces.glassBlurPx}px) saturate(${surfaces.glassSaturate}%)`,
              border: `1px solid ${palette.border}`,
              boxShadow: p.highlight
                ? `0 24px 60px -20px ${palette.accent2}55`
                : "none",
              transition: `transform 0.7s ${m.ease}, box-shadow 0.7s ${m.ease}`,
            }}
          >
            {p.highlight && (
              <>
                <div
                  className="absolute inset-0"
                  style={{
                    borderRadius: surfaces.cardRadiusPx + 8,
                    background: `linear-gradient(135deg, ${palette.accent1}29, ${palette.accent2}29, ${palette.accent3}1F)`,
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    borderRadius: surfaces.cardRadiusPx + 8,
                    padding: 1,
                    background: `linear-gradient(135deg, ${palette.accent1}, ${palette.accent2}, ${palette.accent3})`,
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
                    background: `linear-gradient(90deg, ${palette.accent1}, ${palette.accent2}, ${palette.accent3})`,
                    boxShadow: `0 6px 18px -6px ${palette.accent2}99`,
                  }}
                >
                  Most popular
                </div>
              )}
              <div
                className="text-xs uppercase tracking-[0.3em]"
                style={{ color: palette.muted }}
              >
                {p.name}
              </div>
              <div className="mt-6 flex items-baseline gap-2">
                <span
                  className="text-5xl font-bold tracking-tight"
                  style={{ color: palette.ink }}
                >
                  {p.price}
                </span>
                <span className="text-sm" style={{ color: palette.subtle }}>
                  {p.per}
                </span>
              </div>
              <p className="mt-3 text-sm" style={{ color: palette.body }}>
                {p.desc}
              </p>

              <ul className="mt-6 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-3"
                    style={{ color: palette.body }}
                  >
                    <span
                      className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                      style={{
                        background: `linear-gradient(135deg, ${palette.accent1}D9, ${palette.accent2}D9)`,
                        boxShadow: `0 2px 6px -2px ${palette.accent2}80`,
                      }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={p.ctaHref}
                className="mt-8 block rounded-full px-6 py-3 text-center text-sm font-semibold transition-all"
                style={
                  p.highlight
                    ? {
                        color: "white",
                        background: `linear-gradient(135deg, ${palette.accent1}, ${palette.accent2} 55%, ${palette.accent3})`,
                        boxShadow: `0 6px 18px -6px ${palette.accent2}99`,
                      }
                    : {
                        color: palette.ink,
                        background: palette.glassStrong,
                        border: `1px solid ${palette.border}`,
                      }
                }
              >
                {p.cta}
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      <div
        className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs"
        style={{ color: palette.muted }}
      >
        {copy.pricing.trust.map((t, i) => (
          <span key={t} className="flex items-center gap-3">
            {i > 0 && <span style={{ color: palette.subtle }}>·</span>}
            {t}
          </span>
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
