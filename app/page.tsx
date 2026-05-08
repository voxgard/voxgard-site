"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

type Particle = {
  left: string;
  size: number;
  delay: string;
  duration: string;
  opacity: number;
  color: string;
};

const PARTICLE_COLORS = [
  "#3B82F6",
  "#8B5CF6",
  "#06B6D4",
  "#A855F7",
  "#EC4899",
];

function MeshBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050816] via-[#0B1023] to-[#050816]" />

      <div
        className="absolute -left-40 -top-40 h-[620px] w-[620px] rounded-full opacity-40 blur-[120px]"
        style={{
          background: "#3B82F6",
          animation: "vox-blob 18s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -right-40 top-1/3 h-[540px] w-[540px] rounded-full opacity-40 blur-[120px]"
        style={{
          background: "#8B5CF6",
          animation: "vox-blob 22s ease-in-out infinite",
          animationDelay: "-7s",
        }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[480px] w-[480px] rounded-full opacity-30 blur-[120px]"
        style={{
          background: "#A855F7",
          animation: "vox-blob 20s ease-in-out infinite",
          animationDelay: "-14s",
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[120px]"
        style={{
          background: "#06B6D4",
          animation: "vox-pulse-soft 9s ease-in-out infinite",
        }}
      />

      <div
        className="vox-grid absolute inset-0 opacity-50"
        style={{
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, #050816 95%)",
        }}
      />
    </div>
  );
}

function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      el.style.setProperty("--mx", `${e.clientX}px`);
      el.style.setProperty("--my", `${e.clientY}px`);
      el.style.opacity = "1";
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-[1] opacity-0 transition-opacity duration-500"
      style={{
        background:
          "radial-gradient(640px circle at var(--mx, 50%) var(--my, 50%), rgba(139, 92, 246, 0.14), transparent 45%)",
      }}
    />
  );
}

function Particles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 36 }, () => ({
        left: `${Math.random() * 100}%`,
        size: 1 + Math.random() * 2.5,
        delay: `-${Math.random() * 25}s`,
        duration: `${18 + Math.random() * 22}s`,
        opacity: 0.3 + Math.random() * 0.55,
        color:
          PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      })),
    );
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute -bottom-4 block rounded-full"
          style={
            {
              left: p.left,
              width: p.size,
              height: p.size,
              background: p.color,
              boxShadow: `0 0 8px ${p.color}`,
              animation: `vox-float ${p.duration} linear infinite`,
              animationDelay: p.delay,
              "--p-opacity": p.opacity,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

function HolographicOrb() {
  return (
    <div className="relative h-[360px] w-[360px] md:h-[480px] md:w-[480px]">
      <div
        className="absolute inset-[-70px] rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.5), rgba(59,130,246,0.3) 40%, transparent 72%)",
          animation: "vox-pulse 5.5s ease-in-out infinite",
        }}
      />

      <div
        className="absolute inset-0"
        style={{ animation: "vox-spin 30s linear infinite" }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            padding: "1px",
            background:
              "conic-gradient(from 0deg, transparent 0deg, #3B82F6 80deg, transparent 160deg, #8B5CF6 260deg, transparent 340deg)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
      </div>

      <div
        className="absolute inset-[40px]"
        style={{ animation: "vox-spin-rev 22s linear infinite" }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            padding: "1px",
            background:
              "conic-gradient(from 180deg, transparent 0deg, #06B6D4 100deg, transparent 200deg, #A855F7 290deg, transparent 360deg)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
      </div>

      <div
        className="absolute inset-[80px] rounded-full border border-white/10"
        style={{ animation: "vox-spin 40s linear infinite" }}
      />

      <div
        className="absolute inset-[110px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, #06B6D4 0%, #3B82F6 28%, #8B5CF6 60%, #1E1B4B 95%)",
          boxShadow:
            "inset -30px -30px 80px rgba(0,0,0,0.7), 0 0 90px rgba(139,92,246,0.55)",
          animation: "vox-pulse 6s ease-in-out infinite",
        }}
      >
        <div className="absolute left-[18%] top-[18%] h-14 w-14 rounded-full bg-white/35 blur-2xl" />
        <div className="absolute left-[28%] top-[26%] h-3 w-3 rounded-full bg-white/80 blur-sm" />
      </div>

      <div
        className="absolute inset-0"
        style={{ animation: "vox-spin 18s linear infinite" }}
      >
        <div
          className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full"
          style={{ background: "#EC4899", boxShadow: "0 0 22px #EC4899" }}
        />
      </div>
      <div
        className="absolute inset-[40px]"
        style={{ animation: "vox-spin-rev 14s linear infinite" }}
      >
        <div
          className="absolute left-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full"
          style={{ background: "#06B6D4", boxShadow: "0 0 18px #06B6D4" }}
        />
      </div>
      <div
        className="absolute inset-[80px]"
        style={{ animation: "vox-spin 24s linear infinite" }}
      >
        <div
          className="absolute right-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full"
          style={{ background: "#A855F7", boxShadow: "0 0 18px #A855F7" }}
        />
      </div>
    </div>
  );
}

function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.transform = `perspective(1100px) rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 7).toFixed(2)}deg)`;
        el.style.setProperty("--gx", `${((x + 0.5) * 100).toFixed(1)}%`);
        el.style.setProperty("--gy", `${((y + 0.5) * 100).toFixed(1)}%`);
      }}
      onMouseLeave={() => {
        const el = ref.current;
        if (!el) return;
        el.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg)";
      }}
      className={`vox-glow-card vox-gradient-border transition-transform duration-300 ease-out will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}

function GlowCTA({
  children,
  href = "#",
}: {
  children: ReactNode;
  href?: string;
}) {
  return (
    <a
      href={href}
      className="group relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-4 font-semibold text-white"
    >
      <span
        className="absolute inset-0 rounded-full"
        style={{
          background: "linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899)",
          backgroundSize: "200% 100%",
          animation: "vox-shimmer 6s ease-in-out infinite",
        }}
      />
      <span
        className="absolute inset-0 rounded-full opacity-60 blur-xl transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: "linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899)",
        }}
      />
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className="transition-transform duration-300 group-hover:translate-x-0.5"
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
    </a>
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
    <a
      href={href}
      className="group relative inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-4 font-medium backdrop-blur-xl transition hover:border-white/30 hover:bg-white/10"
    >
      <span className="relative z-10">{children}</span>
    </a>
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
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] uppercase tracking-[0.3em] backdrop-blur-xl"
      style={{ color }}
    >
      <span
        className="h-1 w-1 rounded-full"
        style={{ background: color, boxShadow: `0 0 8px ${color}` }}
      />
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen text-white">
      <MeshBackground />
      <Particles />
      <Spotlight />

      <header className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 md:px-12">
        <a
          href="#"
          className="flex items-center gap-3 text-xl font-bold tracking-[0.28em]"
        >
          <span
            className="inline-block h-3 w-3 rounded-sm"
            style={{
              background: "linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899)",
              boxShadow: "0 0 22px rgba(139,92,246,0.9)",
            }}
          />
          VOXGARD
        </a>

        <nav className="hidden items-center gap-9 text-sm text-gray-400 md:flex">
          <a href="#solutions" className="transition hover:text-white">
            Solutions
          </a>
          <a href="#process" className="transition hover:text-white">
            Process
          </a>
          <a href="#benefits" className="transition hover:text-white">
            Benefits
          </a>
          <a href="#pricing" className="transition hover:text-white">
            Pricing
          </a>
          <a href="#contact" className="transition hover:text-white">
            Contact
          </a>
        </nav>

        <a
          href="#contact"
          className="hidden rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm backdrop-blur-xl transition hover:border-white/30 hover:bg-white/10 md:inline-block"
        >
          Book a Demo
        </a>
      </header>

      <section className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-20 pb-32 md:px-12">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="vox-rise">
            <SectionLabel color="#A78BFA">
              AI Infrastructure for Modern Business
            </SectionLabel>

            <h1 className="mt-8 text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl lg:text-[5.5rem]">
              Voice. Vision.
              <br />
              <span className="vox-shimmer-text">Autonomous AI.</span>
            </h1>

            <p className="mt-8 max-w-xl text-base leading-relaxed text-gray-400 md:text-lg">
              Voxgard builds enterprise-grade AI infrastructure — intelligent
              call centers, real-time video analytics and autonomous automation
              systems engineered for global scale.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <GlowCTA href="#contact">Schedule a Demo</GlowCTA>
              <GhostCTA href="#solutions">Explore Platform</GhostCTA>
            </div>

            <div className="mt-14 grid max-w-xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl md:grid-cols-4">
              {[
                { v: "99.9%", l: "Uptime" },
                { v: "<200ms", l: "Latency" },
                { v: "24/7", l: "Online" },
                { v: "30+", l: "Languages" },
              ].map((s) => (
                <div key={s.l} className="bg-[#050816]/60 p-5 text-center">
                  <div className="vox-shimmer-text text-2xl font-bold">
                    {s.v}
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-gray-500">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <HolographicOrb />
          </div>
        </div>
      </section>

      <section
        id="solutions"
        className="relative z-10 mx-auto w-full max-w-7xl px-6 py-28 md:px-12"
      >
        <div className="mb-16 text-center">
          <SectionLabel color="#60A5FA">Solutions</SectionLabel>
          <h2 className="mt-6 text-4xl font-bold md:text-6xl">
            One platform.
            <br />
            <span className="vox-shimmer-text">Three core engines.</span>
          </h2>
          <p className="mt-5 text-gray-400">
            Built on shared infrastructure. Deployed independently.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              tag: "01",
              title: "AI Call Center",
              desc: "Human-like voice agents handling inbound and outbound calls 24/7. Multilingual, integrated with your CRM, calendar and ticketing.",
              features: [
                "Natural voice synthesis",
                "CRM & calendar sync",
                "Real-time analytics",
              ],
              accent: "#3B82F6",
            },
            {
              tag: "02",
              title: "Video Intelligence",
              desc: "Real-time analytics for security, retail, logistics and manufacturing. Detect anomalies, monitor operations, trigger workflows.",
              features: [
                "Object & event detection",
                "Live alerts",
                "Edge & cloud deploy",
              ],
              accent: "#8B5CF6",
            },
            {
              tag: "03",
              title: "Business Automation",
              desc: "Connect data, models and tools into reliable workflows. Replace manual operations with autonomous systems that scale.",
              features: [
                "Workflow orchestration",
                "AI agent pipelines",
                "API & webhook hub",
              ],
              accent: "#EC4899",
            },
          ].map((c) => (
            <TiltCard
              key={c.title}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl"
            >
              <div
                className="absolute inset-0 rounded-3xl opacity-30"
                style={{
                  background: `radial-gradient(circle at top, ${c.accent}25, transparent 60%)`,
                }}
              />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-[0.3em] text-gray-500">
                    {c.tag}
                  </span>
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{
                      background: c.accent,
                      boxShadow: `0 0 16px ${c.accent}`,
                    }}
                  />
                </div>
                <h3 className="mt-6 text-2xl font-semibold">{c.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-gray-400">
                  {c.desc}
                </p>
                <ul className="mt-6 space-y-2 text-sm text-gray-300">
                  {c.features.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{
                          background: c.accent,
                          boxShadow: `0 0 6px ${c.accent}`,
                        }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      <section
        id="process"
        className="relative z-10 mx-auto w-full max-w-7xl px-6 py-28 md:px-12"
      >
        <div className="mb-16 text-center">
          <SectionLabel color="#C084FC">How it works</SectionLabel>
          <h2 className="mt-6 text-4xl font-bold md:text-6xl">
            From discovery to
            <br />
            <span className="vox-shimmer-text">production in weeks.</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {[
            {
              n: "01",
              t: "Discovery",
              d: "We map your processes, data and KPIs to identify where AI delivers measurable ROI.",
            },
            {
              n: "02",
              t: "Design",
              d: "We architect the solution — voice flows, video pipelines or automation logic — tailored to your stack.",
            },
            {
              n: "03",
              t: "Deploy",
              d: "Secure rollout with full integrations to your CRM, telephony, cameras and internal tools.",
            },
            {
              n: "04",
              t: "Scale",
              d: "Continuous monitoring, model tuning and 24/7 support as you scale across teams and regions.",
            },
          ].map((s, i, arr) => (
            <TiltCard
              key={s.n}
              className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
            >
              <div className="vox-shimmer-text font-mono text-3xl font-bold">
                {s.n}
              </div>
              <h3 className="mt-3 text-lg font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">
                {s.d}
              </p>
              {i < arr.length - 1 && (
                <div className="absolute right-[-12px] top-1/2 hidden h-px w-6 bg-gradient-to-r from-white/30 to-transparent md:block" />
              )}
            </TiltCard>
          ))}
        </div>
      </section>

      <section
        id="benefits"
        className="relative z-10 mx-auto w-full max-w-7xl px-6 py-28 md:px-12"
      >
        <div className="mb-16 text-center">
          <SectionLabel color="#22D3EE">Benefits</SectionLabel>
          <h2 className="mt-6 text-4xl font-bold md:text-6xl">
            Why teams choose
            <br />
            <span className="vox-shimmer-text">Voxgard.</span>
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl md:grid-cols-3">
          {[
            {
              t: "Enterprise-grade security",
              d: "SOC 2 aligned, encryption in transit and at rest, RBAC and audit logs.",
              c: "#3B82F6",
            },
            {
              t: "Reduce operational cost",
              d: "Replace repetitive support and monitoring with AI agents that operate 24/7.",
              c: "#8B5CF6",
            },
            {
              t: "Faster than human teams",
              d: "Sub-second response times across voice, video and automation pipelines at scale.",
              c: "#EC4899",
            },
            {
              t: "Native integrations",
              d: "Salesforce, HubSpot, Twilio, AWS, GCP, Azure and your data warehouse.",
              c: "#06B6D4",
            },
            {
              t: "Multilingual by default",
              d: "30+ languages with native-level prosody and domain vocabulary.",
              c: "#A855F7",
            },
            {
              t: "Built for compliance",
              d: "GDPR, HIPAA-ready. EU and US data residency. Full PII redaction.",
              c: "#60A5FA",
            },
          ].map((b) => (
            <div
              key={b.t}
              className="group relative bg-[#050816]/70 p-8 transition hover:bg-[#0B1023]/80"
            >
              <div className="flex items-start gap-4">
                <div
                  className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ring-1 ring-white/10 transition group-hover:ring-white/30"
                  style={{
                    background: `linear-gradient(135deg, ${b.c}33, ${b.c}11)`,
                  }}
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{
                      background: b.c,
                      boxShadow: `0 0 12px ${b.c}`,
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{b.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-400">
                    {b.d}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        id="pricing"
        className="relative z-10 mx-auto w-full max-w-7xl px-6 py-28 md:px-12"
      >
        <div className="mb-16 text-center">
          <SectionLabel color="#F472B6">Pricing</SectionLabel>
          <h2 className="mt-6 text-4xl font-bold md:text-6xl">
            Simple, scalable
            <br />
            <span className="vox-shimmer-text">plans.</span>
          </h2>
          <p className="mt-5 text-gray-400">
            Transparent pricing. No hidden fees. Cancel anytime.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              name: "Starter",
              price: "$1,500",
              per: "/ month",
              desc: "For small teams launching their first AI workflow.",
              features: [
                "1 AI voice agent",
                "Up to 2,000 calls / mo",
                "Standard integrations",
                "Email support",
              ],
              highlight: false,
            },
            {
              name: "Business",
              price: "$4,900",
              per: "/ month",
              desc: "For growing companies running production workloads.",
              features: [
                "Up to 5 AI agents",
                "Video analytics included",
                "Custom integrations",
                "Priority support",
              ],
              highlight: true,
            },
            {
              name: "Enterprise",
              price: "Custom",
              per: "",
              desc: "For organizations with advanced security and scale needs.",
              features: [
                "Unlimited AI agents",
                "Dedicated infrastructure",
                "On-prem & private cloud",
                "24/7 SLA support",
              ],
              highlight: false,
            },
          ].map((p) => (
            <TiltCard
              key={p.name}
              className={`relative overflow-hidden rounded-3xl p-8 backdrop-blur-xl ${
                p.highlight
                  ? "border-transparent"
                  : "border border-white/10 bg-white/[0.03]"
              }`}
            >
              {p.highlight && (
                <>
                  <div
                    className="absolute inset-0 rounded-3xl"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(59,130,246,0.18), rgba(139,92,246,0.18), rgba(236,72,153,0.12))",
                    }}
                  />
                  <div
                    className="absolute inset-0 rounded-3xl"
                    style={{
                      padding: "1px",
                      background:
                        "linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899)",
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
                    className="absolute -top-2 right-0 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest"
                    style={{
                      background:
                        "linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899)",
                      boxShadow: "0 0 24px rgba(139,92,246,0.5)",
                    }}
                  >
                    Most popular
                  </div>
                )}
                <div className="text-xs uppercase tracking-[0.3em] text-gray-400">
                  {p.name}
                </div>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-5xl font-bold">{p.price}</span>
                  <span className="text-sm text-gray-500">{p.per}</span>
                </div>
                <p className="mt-3 text-sm text-gray-400">{p.desc}</p>

                <ul className="mt-6 space-y-3 text-sm">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <span
                        className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(59,130,246,0.5), rgba(139,92,246,0.5))",
                        }}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`mt-8 block rounded-full px-6 py-3 text-center text-sm font-semibold transition ${
                    p.highlight
                      ? "text-white"
                      : "border border-white/15 bg-white/5 hover:bg-white/10"
                  }`}
                  style={
                    p.highlight
                      ? {
                          background:
                            "linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899)",
                          boxShadow: "0 0 30px rgba(139,92,246,0.45)",
                        }
                      : undefined
                  }
                >
                  {p.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                </a>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="relative z-10 mx-auto w-full max-w-4xl px-6 py-28 md:px-12"
      >
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-2xl md:p-14">
          <div
            className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full blur-3xl"
            style={{
              background: "#3B82F6",
              opacity: 0.25,
              animation: "vox-pulse-soft 7s ease-in-out infinite",
            }}
          />
          <div
            className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full blur-3xl"
            style={{
              background: "#A855F7",
              opacity: 0.25,
              animation: "vox-pulse-soft 9s ease-in-out infinite",
            }}
          />

          <div className="relative">
            <SectionLabel color="#60A5FA">Contact</SectionLabel>
            <h2 className="mt-6 text-4xl font-bold md:text-5xl">
              Talk to <span className="vox-shimmer-text">our team.</span>
            </h2>
            <p className="mt-4 text-gray-400">
              Tell us about your business and we&apos;ll get back to you within
              one business day.
            </p>

            <form className="mt-10 grid gap-5">
              <div className="grid gap-5 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="Your name"
                  className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-sm outline-none transition focus:border-[#8B5CF6]/60 focus:ring-2 focus:ring-[#8B5CF6]/30"
                />
                <input
                  type="text"
                  placeholder="Company"
                  className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-sm outline-none transition focus:border-[#8B5CF6]/60 focus:ring-2 focus:ring-[#8B5CF6]/30"
                />
              </div>
              <input
                type="email"
                placeholder="Work email"
                className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-sm outline-none transition focus:border-[#8B5CF6]/60 focus:ring-2 focus:ring-[#8B5CF6]/30"
              />
              <textarea
                placeholder="Tell us about your project..."
                rows={5}
                className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-sm outline-none transition focus:border-[#8B5CF6]/60 focus:ring-2 focus:ring-[#8B5CF6]/30"
              />
              <button
                type="submit"
                className="group relative mt-2 overflow-hidden rounded-full px-8 py-4 font-semibold text-white"
              >
                <span
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899)",
                    backgroundSize: "200% 100%",
                    animation: "vox-shimmer 6s ease-in-out infinite",
                  }}
                />
                <span
                  className="absolute inset-0 rounded-full opacity-60 blur-xl transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899)",
                  }}
                />
                <span className="relative">Send Request</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="relative z-10 mx-auto w-full max-w-7xl border-t border-white/5 px-6 py-10 text-sm text-gray-500 md:px-12">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2 tracking-[0.28em]">
            <span
              className="inline-block h-2.5 w-2.5 rounded-sm"
              style={{
                background:
                  "linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899)",
                boxShadow: "0 0 14px rgba(139,92,246,0.7)",
              }}
            />
            VOXGARD
          </div>
          <div>© 2026 Voxgard. AI Infrastructure & Automation Systems.</div>
        </div>
      </footer>
    </main>
  );
}
