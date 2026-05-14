import Link from "next/link";

const VISIONS = [
  {
    href: "/vision-a",
    name: "Vision A",
    tag: "Apple cinematic",
    desc: "Soft volumetric light. Sticky storytelling. Calm elegance.",
    accent: "linear-gradient(135deg, #6FA8E8, #9B8FE0, #7CC9DC)",
    selected: true,
  },
  {
    href: "/vision-b",
    name: "Vision B",
    tag: "Holographic AI OS",
    desc: "Floating glass layers. Dynamic AI viz. Iridescent depth.",
    accent: "linear-gradient(135deg, #5EEAD4, #818CF8, #F0ABFC)",
    selected: false,
  },
  {
    href: "/vision-c",
    name: "Vision C",
    tag: "Enterprise luxury",
    desc: "Massive whitespace. Bold typography. Sophisticated quiet.",
    accent: "linear-gradient(135deg, #1E3A8A, #0F172A)",
    selected: false,
  },
];

export default function Index() {
  return (
    <main className="relative min-h-screen bg-[#FAFBFD] text-[var(--ink)]">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-16 md:px-12">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-lg font-bold tracking-[0.28em] text-[var(--ink)]">
            <span
              className="inline-block h-2.5 w-2.5 rounded-sm"
              style={{
                background: "linear-gradient(135deg, #6FA8E8, #9B8FE0, #7CC9DC)",
                boxShadow: "0 0 18px rgba(155,143,224,0.55)",
              }}
            />
            VOXGARD
          </div>
          <span
            className="inline-flex items-center gap-2 rounded-full border border-emerald-300/60 bg-emerald-50/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-emerald-700"
          >
            <span
              className="h-1.5 w-1.5 rounded-full bg-emerald-500"
              style={{ boxShadow: "0 0 8px rgba(16,185,129,0.7)" }}
            />
            Selected direction: Vision A
          </span>
        </header>

        <section className="my-auto py-20">
          <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--subtle)]">
            Three directions
          </div>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.02em] text-[var(--ink)] md:text-7xl">
            Pick a future.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-[var(--muted)]">
            Same product. Same dashboard. Three completely different visual
            identities. Choose one to preview live.
          </p>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {VISIONS.map((v) => (
              <Link
                key={v.href}
                href={v.href}
                className={`group relative overflow-hidden rounded-3xl border bg-white/70 p-7 backdrop-blur-xl transition-all duration-700 [transition-timing-function:cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:shadow-[0_24px_60px_-20px_rgba(31,60,122,0.18)] ${
                  v.selected
                    ? "border-emerald-400/50 ring-2 ring-emerald-300/40"
                    : "border-[var(--border-soft)]"
                }`}
              >
                <div
                  className="absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-30 blur-2xl transition-opacity duration-700 group-hover:opacity-60"
                  style={{ background: v.accent }}
                />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--subtle)]">
                      {v.name}
                    </div>
                    {v.selected && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50/80 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-emerald-700 ring-1 ring-emerald-300/60">
                        <span className="h-1 w-1 rounded-full bg-emerald-500" />
                        Selected
                      </span>
                    )}
                  </div>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--ink)]">
                    {v.tag}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                    {v.desc}
                  </p>
                  <div className="mt-8 flex items-center gap-2 text-sm text-[var(--brand-navy)]">
                    Open preview
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="transition-transform duration-500 group-hover:translate-x-1"
                    >
                      <path
                        d="M3 7h8m0 0L7 3m4 4l-4 4"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border-soft)] pt-6 text-xs text-[var(--muted)]">
          <div>Shared backend · auth · CRM · pricing across all three</div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="hover:text-[var(--ink)]">
              Dashboard
            </Link>
            <Link href="/login" className="hover:text-[var(--ink)]">
              Sign in
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
