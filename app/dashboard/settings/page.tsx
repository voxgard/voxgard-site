import TopNav from "../../components/TopNav";
import GlassCard from "../../components/GlassCard";
import GlowButton from "../../components/GlowButton";
import { currentUser } from "../../lib/mock";

const sections = ["Profile", "Organization", "Security", "Integrations", "Notifications"];

const integrations = [
  { name: "Salesforce", status: "Connected", accent: "#7CC9DC" },
  { name: "HubSpot", status: "Connected", accent: "#1E3A8A" },
  { name: "Twilio", status: "Connected", accent: "#6FA8E8" },
  { name: "Slack", status: "Disconnected", accent: "#B5A0E5" },
  { name: "Google Calendar", status: "Connected", accent: "#9B8FE0" },
  { name: "Stripe", status: "Connected", accent: "#7CC9DC" },
];

export default function SettingsPage() {
  return (
    <>
      <TopNav title="Settings" />

      <main className="flex-1 px-6 py-8 md:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Workspace <span className="vox-shimmer-text">Settings</span>
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Manage your profile, organization and integrations.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2 border-b border-[var(--border-soft)] pb-3">
          {sections.map((s, i) => (
            <button
              key={s}
              className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.2em] transition ${
                i === 0
                  ? "border-[var(--border-strong)] bg-white/80 text-[var(--ink)]"
                  : "border-transparent text-[var(--muted)] hover:bg-white/60 hover:text-[var(--ink)]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <GlassCard className="p-6 md:p-8">
              <div className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">Profile</div>
              <h3 className="mt-2 text-lg font-semibold">Personal information</h3>

              <div className="mt-6 flex items-center gap-5">
                <div
                  className="flex h-20 w-20 items-center justify-center rounded-2xl text-2xl font-bold ring-1 ring-white/40"
                  style={{
                    background: "linear-gradient(135deg, #6FA8E8, #9B8FE0, #1E3A8A)",
                    boxShadow: "0 0 32px rgba(139,92,246,0.5)",
                  }}
                >
                  {currentUser.initials}
                </div>
                <div>
                  <div className="text-lg font-semibold">{currentUser.name}</div>
                  <div className="text-sm text-[var(--muted)]">{currentUser.role}</div>
                  <div className="mt-3 flex gap-2">
                    <button className="rounded-lg border border-[var(--border)] bg-white/60 px-3 py-1.5 text-xs transition hover:bg-white/80">
                      Upload avatar
                    </button>
                    <button className="rounded-lg border border-[var(--border)] bg-white/60 px-3 py-1.5 text-xs text-[var(--muted)] transition hover:bg-white/80">
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                  Full name
                  <input
                    defaultValue={currentUser.name}
                    className="rounded-2xl border border-[var(--border)] bg-white/70 px-4 py-3 text-sm tracking-normal text-[var(--ink)] normal-case outline-none transition focus:border-[#9B8FE0]/70 focus:ring-2 focus:ring-[#9B8FE0]/30"
                  />
                </label>
                <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                  Email
                  <input
                    type="email"
                    defaultValue={currentUser.email}
                    className="rounded-2xl border border-[var(--border)] bg-white/70 px-4 py-3 text-sm tracking-normal text-[var(--ink)] normal-case outline-none transition focus:border-[#9B8FE0]/70 focus:ring-2 focus:ring-[#9B8FE0]/30"
                  />
                </label>
                <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                  Role
                  <input
                    defaultValue={currentUser.role}
                    className="rounded-2xl border border-[var(--border)] bg-white/70 px-4 py-3 text-sm tracking-normal text-[var(--ink)] normal-case outline-none transition focus:border-[#9B8FE0]/70 focus:ring-2 focus:ring-[#9B8FE0]/30"
                  />
                </label>
                <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                  Timezone
                  <select
                    defaultValue="UTC-08:00"
                    className="rounded-2xl border border-[var(--border)] bg-white/70 px-4 py-3 text-sm tracking-normal text-[var(--ink)] normal-case outline-none transition focus:border-[#9B8FE0]/70 focus:ring-2 focus:ring-[#9B8FE0]/30"
                  >
                    <option>UTC-08:00 · Pacific</option>
                    <option>UTC-05:00 · Eastern</option>
                    <option>UTC+00:00 · UTC</option>
                    <option>UTC+01:00 · Central European</option>
                    <option>UTC+04:00 · Yerevan</option>
                  </select>
                </label>
              </div>

              <div className="mt-8 flex justify-end gap-3 border-t border-[var(--border-soft)] pt-6">
                <GlowButton variant="ghost">Cancel</GlowButton>
                <GlowButton>Save changes</GlowButton>
              </div>
            </GlassCard>

            <GlassCard className="mt-6 p-6 md:p-8">
              <div className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">Security</div>
              <h3 className="mt-2 text-lg font-semibold">Authentication & sessions</h3>

              <div className="mt-6 space-y-4">
                {[
                  { t: "Password", d: "Last changed 3 months ago", a: "Update" },
                  { t: "Two-factor auth", d: "Disabled", a: "Enable" },
                  { t: "API keys", d: "2 keys active", a: "Manage" },
                ].map((s) => (
                  <div
                    key={s.t}
                    className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-white/45 p-4"
                  >
                    <div>
                      <div className="text-sm font-medium">{s.t}</div>
                      <div className="text-xs text-[var(--muted)]">{s.d}</div>
                    </div>
                    <button className="rounded-lg border border-[var(--border)] bg-white/60 px-3 py-1.5 text-xs transition hover:bg-white/80">
                      {s.a}
                    </button>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          <div>
            <GlassCard className="p-6">
              <div className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
                Organization
              </div>
              <h3 className="mt-2 text-lg font-semibold">{currentUser.org}</h3>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between text-[var(--muted)]">
                  <span>Plan</span>
                  <span className="text-[var(--ink)]">Business</span>
                </div>
                <div className="flex justify-between text-[var(--muted)]">
                  <span>Members</span>
                  <span className="text-[var(--ink)]">12</span>
                </div>
                <div className="flex justify-between text-[var(--muted)]">
                  <span>Created</span>
                  <span className="text-[var(--ink)]">Jan 2026</span>
                </div>
              </div>
              <button className="mt-5 w-full rounded-xl border border-[var(--border)] bg-white/60 py-2 text-sm transition hover:bg-white/80">
                Manage members
              </button>
            </GlassCard>

            <GlassCard className="mt-6 p-6">
              <div className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
                Integrations
              </div>
              <h3 className="mt-2 text-lg font-semibold">Connected apps</h3>
              <div className="mt-5 space-y-3">
                {integrations.map((i) => (
                  <div
                    key={i.name}
                    className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-white/45 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="h-8 w-8 rounded-lg ring-1 ring-white/40"
                        style={{
                          background: `linear-gradient(135deg, ${i.accent}55, ${i.accent}22)`,
                          boxShadow: `0 0 14px ${i.accent}40`,
                        }}
                      />
                      <span className="text-sm">{i.name}</span>
                    </div>
                    <span
                      className={`text-[10px] uppercase tracking-[0.2em] ${
                        i.status === "Connected" ? "text-emerald-700" : "text-[var(--subtle)]"
                      }`}
                    >
                      {i.status}
                    </span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </main>
    </>
  );
}
