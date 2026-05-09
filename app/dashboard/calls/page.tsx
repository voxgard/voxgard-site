import TopNav from "../../components/TopNav";
import StatCard from "../../components/StatCard";
import CallLogCard from "../../components/CallLogCard";
import GlowButton from "../../components/GlowButton";
import { callStats, recentCalls } from "../../lib/mock";

const filters = ["All", "Completed", "Missed", "Failed", "In progress"];

export default function CallsPage() {
  return (
    <>
      <TopNav title="Calls" />

      <main className="flex-1 px-6 py-8 md:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Call <span className="vox-shimmer-text">Center</span>
            </h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Live and historical calls handled by your AI agents.
            </p>
          </div>
          <div className="flex gap-3">
            <GlowButton variant="ghost">Export CSV</GlowButton>
            <GlowButton>+ New Call</GlowButton>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {callStats.map((s) => (
            <StatCard key={s.label} stat={s} />
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {filters.map((f, i) => (
              <button
                key={f}
                className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.2em] transition ${
                  i === 0
                    ? "border-[var(--border-strong)] bg-white/80 text-[var(--ink)]"
                    : "border-[var(--border)] bg-white/60 text-[var(--muted)] hover:bg-white/80"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/60 px-4 py-2 text-sm text-[var(--muted)] backdrop-blur-xl md:w-72">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search calls..."
              className="w-full bg-transparent text-sm text-[var(--ink)] outline-none placeholder:text-[var(--subtle)]"
            />
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {recentCalls.map((c) => (
            <CallLogCard key={c.id} call={c} />
          ))}
        </div>
      </main>
    </>
  );
}
