"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { themeC as theme } from "../themes";
import { copy } from "../data/copy";
import IndustriesSection from "../sections/IndustriesSection";
import FeaturesSection from "../sections/FeaturesSection";
import PackagesSection from "../sections/PackagesSection";
import PricingSection from "../sections/PricingSection";
import AddonsSection from "../sections/AddonsSection";

/**
 * Vision C — Enterprise luxury.
 * No background motion. All air, type and a single deep navy.
 */
export default function VisionC() {
  const { palette } = theme;

  return (
    <main
      className="relative min-h-screen"
      style={{ background: palette.bg, color: palette.ink }}
    >
      <Header />

      {/* HERO — type-driven, no orb */}
      <section className="relative mx-auto w-full max-w-6xl px-6 pt-32 pb-40 md:px-12 md:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1] }}
        >
          <div
            className="text-[10px] uppercase tracking-[0.4em]"
            style={{ color: palette.subtle }}
          >
            {copy.hero.eyebrow}
          </div>

          <h1
            className="mt-12 text-[clamp(3rem,9vw,9rem)] font-light leading-[0.95] tracking-[-0.04em]"
            style={{ color: palette.ink, fontFeatureSettings: '"ss01"' }}
          >
            {copy.hero.headline}
            <br />
            <span style={{ fontWeight: 500 }}>{copy.hero.headlineAccent}</span>
          </h1>

          <p
            className="mt-12 max-w-md text-lg leading-relaxed"
            style={{ color: palette.muted }}
          >
            {copy.hero.sub}
          </p>

          <div className="mt-14 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={copy.hero.primaryCta.href}
              className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-medium text-white transition-all duration-500"
              style={{
                background: palette.ink,
                borderRadius: 2,
              }}
            >
              {copy.hero.primaryCta.label} →
            </Link>
            <Link
              href={copy.hero.secondaryCta.href}
              className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-medium transition-all duration-500"
              style={{
                color: palette.ink,
                borderBottom: `1px solid ${palette.borderStrong}`,
                borderRadius: 0,
              }}
            >
              {copy.hero.secondaryCta.label}
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Hairline */}
      <Hr />

      {/* Stat band — quiet enterprise stats */}
      <section className="relative mx-auto w-full max-w-6xl px-6 py-24 md:px-12">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
          {[
            { v: "99.9%", l: "Uptime SLA" },
            { v: "<300ms", l: "Voice latency" },
            { v: "30+", l: "Languages" },
            { v: "SOC 2", l: "Compliance" },
          ].map((s) => (
            <div key={s.l}>
              <div
                className="text-5xl font-light tracking-tight md:text-6xl"
                style={{ color: palette.ink }}
              >
                {s.v}
              </div>
              <div
                className="mt-3 text-[10px] uppercase tracking-[0.3em]"
                style={{ color: palette.subtle }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Hr />

      <IndustriesSection theme={theme} />
      <Hr />
      <FeaturesSection theme={theme} />
      <Hr />
      <PackagesSection theme={theme} />
      <Hr />
      <PricingSection theme={theme} />
      <Hr />
      <AddonsSection theme={theme} />

      {/* Final CTA */}
      <section className="relative mx-auto w-full max-w-6xl px-6 py-32 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
        >
          <div
            className="text-[10px] uppercase tracking-[0.4em]"
            style={{ color: palette.subtle }}
          >
            {copy.cta.eyebrow}
          </div>
          <h2
            className="mt-12 text-[clamp(2.5rem,7vw,7rem)] font-light leading-[0.95] tracking-[-0.04em]"
            style={{ color: palette.ink }}
          >
            {copy.cta.headline}{" "}
            <span style={{ fontWeight: 500 }}>{copy.cta.headlineAccent}</span>
          </h2>
          <p
            className="mt-12 max-w-md text-lg leading-relaxed"
            style={{ color: palette.muted }}
          >
            {copy.cta.sub}
          </p>
          <div className="mt-14 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={copy.cta.primaryCta.href}
              className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-medium text-white"
              style={{ background: palette.ink, borderRadius: 2 }}
            >
              {copy.cta.primaryCta.label} →
            </Link>
            <Link
              href={copy.cta.secondaryCta.href}
              className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-medium"
              style={{
                color: palette.ink,
                borderBottom: `1px solid ${palette.borderStrong}`,
                borderRadius: 0,
              }}
            >
              {copy.cta.secondaryCta.label}
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}

function Header() {
  const { palette } = theme;
  return (
    <header
      className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-7 md:px-12"
      style={{ borderBottom: `1px solid ${palette.border}` }}
    >
      <Link
        href="/"
        className="text-sm font-bold tracking-[0.32em]"
        style={{ color: palette.ink }}
      >
        {copy.brand}
      </Link>

      <nav
        className="hidden items-center gap-10 text-xs uppercase tracking-[0.25em] md:flex"
        style={{ color: palette.muted }}
      >
        <a href="#industries">Industries</a>
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
        <Link href="/dashboard">Dashboard</Link>
      </nav>

      <div className="hidden items-center gap-6 md:flex text-xs uppercase tracking-[0.25em]">
        <Link href="/" style={{ color: palette.subtle }}>
          ←&nbsp;Index
        </Link>
        <Link
          href="/register"
          className="text-white px-5 py-2.5"
          style={{ background: palette.ink, borderRadius: 2 }}
        >
          Get Started
        </Link>
      </div>
    </header>
  );
}

function Hr() {
  const { palette } = theme;
  return (
    <div
      className="mx-auto w-full max-w-6xl px-6 md:px-12"
    >
      <div style={{ height: 1, background: palette.border }} />
    </div>
  );
}

function Footer() {
  const { palette } = theme;
  return (
    <footer
      className="relative mx-auto w-full max-w-6xl px-6 py-12 md:px-12"
      style={{ borderTop: `1px solid ${palette.border}` }}
    >
      <div
        className="flex flex-col items-start justify-between gap-3 text-xs uppercase tracking-[0.25em] md:flex-row"
        style={{ color: palette.muted }}
      >
        <div>© 2026 Voxgard, Inc. · Vision C preview</div>
        <Link href="/" style={{ color: palette.subtle }}>
          ←&nbsp;All visions
        </Link>
      </div>
    </footer>
  );
}
