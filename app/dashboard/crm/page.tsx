import TopNav from "../../components/TopNav";
import CrmCard from "../../components/CrmCard";
import GlowButton from "../../components/GlowButton";
import StatCard from "../../components/StatCard";
import { contacts } from "../../lib/mock";
import type { Stat } from "../../lib/mock";

const filters = ["All", "Hot", "Warm", "Cold", "Closed"];

const crmStats: Stat[] = [
  { label: "Total Contacts", value: "1,284", change: "+58", trend: "up", accent: "#6FA8E8", spark: [800, 850, 900, 950, 980, 1020, 1080, 1120, 1180, 1220, 1260, 1284] },
  { label: "Hot Leads", value: "184", change: "+12", trend: "up", accent: "#1E3A8A", spark: [120, 130, 142, 148, 152, 158, 160, 168, 172, 175, 180, 184] },
  { label: "Pipeline Value", value: "$1.84M", change: "+22%", trend: "up", accent: "#B5A0E5", spark: [800, 900, 1000, 1100, 1200, 1280, 1340, 1480, 1560, 1680, 1780, 1840] },
  { label: "Won This Month", value: "$284K", change: "+18%", trend: "up", accent: "#7CC9DC", spark: [120, 140, 160, 180, 200, 220, 230, 250, 260, 270, 280, 284] },
];

export default function CrmPage() {
  return (
    <>
      <TopNav title="CRM" />

      <main className="flex-1 px-6 py-8 md:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              <span className="vox-shimmer-text">Pipeline</span> & Contacts
            </h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Auto-synced from voice calls, forms and integrations.
            </p>
          </div>
          <div className="flex gap-3">
            <GlowButton variant="ghost">Import</GlowButton>
            <GlowButton>+ Add contact</GlowButton>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {crmStats.map((s) => (
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
              placeholder="Search contacts..."
              className="w-full bg-transparent text-sm text-[var(--ink)] outline-none placeholder:text-[var(--subtle)]"
            />
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {contacts.map((c) => (
            <CrmCard key={c.id} contact={c} />
          ))}
        </div>
      </main>
    </>
  );
}
