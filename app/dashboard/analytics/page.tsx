import TopNav from "../../components/TopNav";
import StatCard from "../../components/StatCard";
import GlassCard from "../../components/GlassCard";
import GlowButton from "../../components/GlowButton";
import Sparkline from "../../components/Sparkline";
import { overviewStats, analyticsSeries, funnel } from "../../lib/mock";

const ranges = ["Today", "7 days", "30 days", "Quarter"];

export default function AnalyticsPage() {
  const maxFunnel = Math.max(...funnel.map((f) => f.value));

  return (
    <>
      <TopNav title="Analytics" />

      <main className="flex-1 px-6 py-8 md:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Performance <span className="vox-shimmer-text">Analytics</span>
            </h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Real-time metrics across voice, video and automation.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {ranges.map((r, i) => (
              <button
                key={r}
                className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.2em] transition ${
                  i === 2
                    ? "border-[var(--border-strong)] bg-white/80 text-[var(--ink)]"
                    : "border-[var(--border)] bg-white/60 text-[var(--muted)] hover:bg-white/80"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {overviewStats.map((s) => (
            <StatCard key={s.label} stat={s} />
          ))}
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <GlassCard className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
                  Calls volume
                </div>
                <div className="mt-2 text-3xl font-bold">
                  <span className="vox-shimmer-text">28,140</span>
                </div>
              </div>
              <span className="rounded-full border border-emerald-300/60 bg-emerald-50/80 px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-emerald-700">
                +18.2%
              </span>
            </div>
            <div className="mt-6">
              <Sparkline data={analyticsSeries.calls} color="#6FA8E8" width={520} height={180} />
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
                  Conversions
                </div>
                <div className="mt-2 text-3xl font-bold">
                  <span className="vox-shimmer-text">7,684</span>
                </div>
              </div>
              <span className="rounded-full border border-emerald-300/60 bg-emerald-50/80 px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-emerald-700">
                +24.1%
              </span>
            </div>
            <div className="mt-6">
              <Sparkline data={analyticsSeries.conversions} color="#1E3A8A" width={520} height={180} />
            </div>
          </GlassCard>
        </div>

        <GlassCard className="mt-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
                Conversion funnel
              </div>
              <div className="mt-2 text-lg font-semibold">From inbound to closed</div>
            </div>
            <GlowButton variant="ghost">Export report</GlowButton>
          </div>

          <div className="mt-6 space-y-4">
            {funnel.map((f) => {
              const pct = (f.value / maxFunnel) * 100;
              return (
                <div key={f.label}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: f.accent, boxShadow: `0 0 8px ${f.accent}` }}
                      />
                      <span className="text-[var(--text)]">{f.label}</span>
                    </div>
                    <span className="font-mono text-[var(--muted)]">{f.value.toLocaleString()}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/60">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${pct}%`,
                        background: `linear-gradient(90deg, ${f.accent}, ${f.accent}aa)`,
                        boxShadow: `0 0 12px ${f.accent}`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>
      </main>
    </>
  );
}
