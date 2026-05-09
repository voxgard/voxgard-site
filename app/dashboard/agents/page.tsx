import TopNav from "../../components/TopNav";
import GlassCard from "../../components/GlassCard";
import GlowButton from "../../components/GlowButton";
import StatusBadge from "../../components/StatusBadge";
import { agents } from "../../lib/mock";

const statusTone: Record<(typeof agents)[number]["status"], "success" | "warn" | "info"> = {
  Active: "success",
  Paused: "warn",
  Training: "info",
};

export default function AgentsPage() {
  return (
    <>
      <TopNav title="Agents" />

      <main className="flex-1 px-6 py-8 md:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              AI <span className="vox-shimmer-text">Agents</span>
            </h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Autonomous voice agents handling your call center 24/7.
            </p>
          </div>
          <div className="flex gap-3">
            <GlowButton variant="ghost">Voice library</GlowButton>
            <GlowButton>+ Create agent</GlowButton>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {agents.map((a) => (
            <GlassCard
              key={a.id}
              glow
              className="vox-glow-card p-6 transition hover:bg-white/70"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-25"
                style={{
                  background: `radial-gradient(circle at top right, ${a.accent}30, transparent 60%)`,
                }}
              />

              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div
                        className="flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-bold ring-1 ring-white/40"
                        style={{
                          background: `linear-gradient(135deg, ${a.accent}55, ${a.accent}22)`,
                          boxShadow: `0 0 28px ${a.accent}55`,
                        }}
                      >
                        {a.name[0]}
                      </div>
                      {a.status === "Active" && (
                        <span
                          className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white"
                          style={{ background: "#10B981", boxShadow: "0 0 10px rgba(16,185,129,0.7)" }}
                        />
                      )}
                    </div>
                    <div>
                      <div className="text-lg font-semibold">{a.name}</div>
                      <div className="text-xs text-[var(--muted)]">{a.role}</div>
                    </div>
                  </div>
                  <StatusBadge label={a.status} tone={statusTone[a.status]} />
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-xl border border-[var(--border)] bg-white/60 px-3 py-2.5">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-[var(--subtle)]">Voice</div>
                    <div className="mt-1 text-[var(--text)]">{a.voice}</div>
                  </div>
                  <div className="rounded-xl border border-[var(--border)] bg-white/60 px-3 py-2.5">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-[var(--subtle)]">Language</div>
                    <div className="mt-1 truncate text-[var(--text)]">{a.language}</div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--subtle)]">Calls handled</div>
                    <div className="mt-1 text-xl font-bold">{a.callsHandled.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--subtle)]">Success rate</div>
                    <div className="mt-1 text-xl font-bold">{a.successRate}%</div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/60">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${a.successRate}%`,
                        background: `linear-gradient(90deg, ${a.accent}, ${a.accent}aa)`,
                        boxShadow: `0 0 10px ${a.accent}`,
                      }}
                    />
                  </div>
                </div>

                <div className="mt-5 flex gap-2 border-t border-[var(--border-soft)] pt-4">
                  <button className="flex-1 rounded-xl border border-[var(--border)] bg-white/60 py-2 text-xs transition hover:bg-white/80">
                    Configure
                  </button>
                  <button className="flex-1 rounded-xl border border-[var(--border)] bg-white/60 py-2 text-xs transition hover:bg-white/80">
                    Test call
                  </button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </main>
    </>
  );
}
