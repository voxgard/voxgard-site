"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { themeB as theme } from "../themes";
import { copy } from "../data/copy";
import AnimatedBackground from "../components/visuals/AnimatedBackground";
import LiquidOrb from "../components/visuals/LiquidOrb";
import ParticleField from "../components/visuals/ParticleField";
import IndustriesSection from "../sections/IndustriesSection";
import FeaturesSection from "../sections/FeaturesSection";
import PackagesSection from "../sections/PackagesSection";
import PricingSection from "../sections/PricingSection";
import AddonsSection from "../sections/AddonsSection";

export default function VisionB() {
  const { palette } = theme;

  return (
    <main
      className="relative min-h-screen overflow-hidden"
      style={{ background: palette.bg, color: palette.ink }}
    >
      <AnimatedBackground theme={theme} />
      <ParticleField theme={theme} />

      {/* HEADER */}
      <Header />

      {/* HERO — holographic */}
      <section className="relative z-10 mx-auto flex min-h-[92vh] w-full max-w-7xl flex-col items-center justify-center px-6 pt-12 pb-24 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col items-center text-center"
        >
          <Eyebrow color={palette.accent1}>{copy.hero.eyebrow}</Eyebrow>

          <h1
            className="mt-10 text-6xl font-semibold leading-[0.96] tracking-[-0.035em] md:text-[7.5rem] lg:text-[9rem]"
            style={{ color: palette.ink }}
          >
            {copy.hero.headline}
            <br />
            <span
              style={{
                backgroundImage: `linear-gradient(120deg, ${palette.accent1}, ${palette.accent2} 45%, ${palette.accent3})`,
                backgroundSize: "200% 100%",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                animation: "vox-shimmer 8s ease-in-out infinite",
              }}
            >
              {copy.hero.headlineAccent}
            </span>
          </h1>

          <p
            className="mt-10 max-w-xl text-lg leading-relaxed md:text-xl"
            style={{ color: palette.body }}
          >
            {copy.hero.sub}
            <br className="hidden sm:block" />
            {copy.hero.subSecond}
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="my-14 flex w-full justify-center"
          >
            <LiquidOrb theme={theme} size={520} />
          </motion.div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Cta href={copy.hero.primaryCta.href} primary>
              {copy.hero.primaryCta.label}
            </Cta>
            <Cta href={copy.hero.secondaryCta.href}>
              {copy.hero.secondaryCta.label}
            </Cta>
          </div>

          <div
            className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs"
            style={{ color: palette.muted }}
          >
            {copy.hero.trustPills.map((pill) => (
              <span key={pill} className="flex items-center gap-2">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    background: palette.success,
                    boxShadow: `0 0 8px ${palette.success}`,
                  }}
                />
                {pill}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      <IndustriesSection theme={theme} />
      <FeaturesSection theme={theme} />
      <PackagesSection theme={theme} />
      <PricingSection theme={theme} />
      <AddonsSection theme={theme} />

      <Footer />
    </main>
  );
}

function Header() {
  const { palette } = theme;
  return (
    <header className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 md:px-12">
      <Link
        href="/"
        className="flex items-center gap-3 text-xl font-bold tracking-[0.28em]"
        style={{ color: palette.ink }}
      >
        <span
          className="inline-block h-3 w-3 rounded-sm"
          style={{
            background: `linear-gradient(135deg, ${palette.accent1}, ${palette.accent2}, ${palette.accent3})`,
            boxShadow: `0 0 18px ${palette.accent2}aa`,
          }}
        />
        {copy.brand}
      </Link>

      <nav
        className="hidden items-center gap-9 text-sm md:flex"
        style={{ color: palette.muted }}
      >
        <a href="#industries" className="transition hover:opacity-100" style={{ opacity: 0.8 }}>
          Industries
        </a>
        <a href="#features" className="transition hover:opacity-100" style={{ opacity: 0.8 }}>
          Features
        </a>
        <a href="#packages" className="transition hover:opacity-100" style={{ opacity: 0.8 }}>
          Packages
        </a>
        <a href="#pricing" className="transition hover:opacity-100" style={{ opacity: 0.8 }}>
          Pricing
        </a>
        <Link href="/dashboard" className="transition hover:opacity-100" style={{ opacity: 0.8 }}>
          Dashboard
        </Link>
      </nav>

      <div className="hidden items-center gap-3 md:flex">
        <Link href="/" className="text-xs uppercase tracking-[0.3em]" style={{ color: palette.subtle }}>
          ← Back
        </Link>
        <Link
          href="/register"
          className="inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold text-white"
          style={{
            background: `linear-gradient(135deg, ${palette.accent1}, ${palette.accent2}, ${palette.accent3})`,
            boxShadow: `0 6px 18px -6px ${palette.accent2}aa`,
          }}
        >
          Start free
        </Link>
      </div>
    </header>
  );
}

function Footer() {
  const { palette } = theme;
  return (
    <footer
      className="relative z-10 mx-auto w-full max-w-7xl px-6 py-14 md:px-12"
      style={{ borderTop: `1px solid ${palette.border}` }}
    >
      <div className="flex flex-col items-center justify-between gap-3 text-xs md:flex-row" style={{ color: palette.muted }}>
        <div>© 2026 Voxgard, Inc. · Vision B preview</div>
        <Link href="/" className="hover:opacity-100" style={{ opacity: 0.8 }}>
          ← All visions
        </Link>
      </div>
    </footer>
  );
}

function Cta({
  children,
  href,
  primary = false,
}: {
  children: React.ReactNode;
  href: string;
  primary?: boolean;
}) {
  const { palette } = theme;
  if (primary) {
    return (
      <Link
        href={href}
        className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold text-white"
        style={{
          background: `linear-gradient(135deg, ${palette.accent1}, ${palette.accent2} 55%, ${palette.accent3})`,
          boxShadow: `0 8px 24px -6px ${palette.accent2}aa`,
        }}
      >
        {children}
      </Link>
    );
  }
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-full border px-8 py-4 text-base font-medium backdrop-blur-xl transition"
      style={{
        color: palette.ink,
        background: palette.glass,
        borderColor: palette.borderStrong,
      }}
    >
      {children}
    </Link>
  );
}

function Eyebrow({ color, children }: { color: string; children: React.ReactNode }) {
  const { palette } = theme;
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] uppercase tracking-[0.3em] backdrop-blur-xl"
      style={{
        color,
        borderColor: palette.border,
        background: palette.glass,
      }}
    >
      <span
        className="h-1 w-1 rounded-full"
        style={{ background: color, boxShadow: `0 0 8px ${color}` }}
      />
      {children}
    </div>
  );
}
