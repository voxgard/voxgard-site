import TopNav from "../components/TopNav";
import StatCard from "../components/StatCard";
import CallLogCard from "../components/CallLogCard";
import GlassCard from "../components/GlassCard";
import GlowButton from "../components/GlowButton";
import Sparkline from "../components/Sparkline";
import { overviewStats, recentCalls, currentUser, analyticsSeries } from "../lib/mock";

export default function DashboardOverview() {
  return (
    <>
      <TopNav title={`Welcome back, ${currentUser.name.split(" ")[0]}`} />

      <main className="flex-1 px-6 py-8 md:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Workspace <span className="vox-shimmer-text">Overview</span>
            </h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Your AI infrastructure at a glance — last 30 days.
            </p>
          </div>
          <div className="flex gap-3">
            <GlowButton variant="ghost">Export</GlowButton>
            <GlowButton>+ New Agent</GlowButton>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {overviewStats.map((s) => (
            <StatCard key={s.label} stat={s} />
          ))}
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          <GlassCard className="p-6 lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
                  Calls · 30 days
                </div>
                <div className="mt-2 text-3xl font-bold">
                  <span className="vox-shimmer-text">28,140</span>
                </div>
              </div>
              <div className="flex gap-2 text-xs">
                {["7d", "30d", "90d"].map((p, i) => (
                  <button
                    key={p}
                    className={`rounded-full border px-3 py-1.5 transition ${
                      i === 1
                        ? "border-[var(--border-strong)] bg-white/80 text-[var(--ink)]"
                        : "border-[var(--border)] bg-white/60 text-[var(--muted)] hover:bg-white/80"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-6">
              <Sparkline data={analyticsSeries.calls} color="#9B8FE0" width={760} height={180} />
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
              Live activity
            </div>
            <ul className="mt-5 space-y-4">
              {[
                { t: "Aurora completed call with Daniel Hayes", c: "#6FA8E8", time: "2m" },
                { t: "Lyra started outbound campaign", c: "#9B8FE0", time: "8m" },
                { t: "Vega closed renewal · €48k", c: "#1E3A8A", time: "1h" },
                { t: "New contact added · Helix Robotics", c: "#7CC9DC", time: "1h" },
                { t: "Nova demo booked · Akira Tanaka", c: "#B5A0E5", time: "2h" },
              ].map((a, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                    style={{ background: a.c, boxShadow: `0 0 10px ${a.c}` }}
                  />
                  <div className="flex-1">
                    <div className="text-[var(--text)]">{a.t}</div>
                    <div className="text-xs text-[var(--subtle)]">{a.time} ago</div>
                  </div>
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>

        <div className="mt-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Recent calls</h3>
            <a href="/dashboard/calls" className="text-sm text-[var(--brand-navy)] hover:underline">
              View all →
            </a>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {recentCalls.slice(0, 4).map((c) => (
              <CallLogCard key={c.id} call={c} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
