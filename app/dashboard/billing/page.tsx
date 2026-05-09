import TopNav from "../../components/TopNav";
import BillingCard from "../../components/BillingCard";
import PricingCard from "../../components/PricingCard";
import GlowButton from "../../components/GlowButton";
import DataTable, { type Column } from "../../components/DataTable";
import StatusBadge from "../../components/StatusBadge";
import { invoices, pricingTiers, currentPlan, type Invoice } from "../../lib/mock";

const invoiceColumns: Column<Invoice>[] = [
  { key: "id", label: "Invoice", render: (r) => <span className="font-mono text-[var(--text)]">{r.id}</span> },
  { key: "date", label: "Date" },
  { key: "plan", label: "Plan" },
  {
    key: "amount",
    label: "Amount",
    align: "right",
    render: (r) => <span className="font-mono">{r.amount}</span>,
  },
  {
    key: "status",
    label: "Status",
    align: "right",
    render: (r) => (
      <StatusBadge
        label={r.status}
        tone={r.status === "Paid" ? "success" : r.status === "Pending" ? "warn" : "danger"}
      />
    ),
  },
  {
    key: "action",
    label: "",
    align: "right",
    render: () => (
      <button className="text-xs text-[var(--brand-navy)] hover:underline">Download →</button>
    ),
  },
];

export default function BillingPage() {
  return (
    <>
      <TopNav title="Billing" />

      <main className="flex-1 px-6 py-8 md:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Plans & <span className="vox-shimmer-text">Billing</span>
            </h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Manage your subscription, usage and payment methods.
            </p>
          </div>
          <GlowButton variant="ghost">Billing portal</GlowButton>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <BillingCard
            title="Current plan"
            subtitle={currentPlan.name}
            accent="#9B8FE0"
            action={
              <span
                className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[var(--ink)]"
                style={{
                  background: "linear-gradient(90deg, #6FA8E8, #9B8FE0, #1E3A8A)",
                  boxShadow: "0 0 18px rgba(139,92,246,0.5)",
                }}
              >
                Active
              </span>
            }
          >
            <div className="text-sm text-[var(--muted)]">{currentPlan.price}</div>
            <div className="mt-1 text-xs text-[var(--subtle)]">
              Renews on {currentPlan.renewsOn}
            </div>
            <div className="mt-5 flex gap-2">
              <GlowButton variant="ghost" className="!px-4 !py-2 !text-xs">
                Change plan
              </GlowButton>
              <GlowButton variant="danger" className="!px-4 !py-2 !text-xs">
                Cancel
              </GlowButton>
            </div>
          </BillingCard>

          <BillingCard
            title="Payment method"
            subtitle="•••• 4242"
            accent="#6FA8E8"
            action={<button className="text-xs text-[var(--brand-navy)] hover:underline">Update</button>}
          >
            <div className="text-sm text-[var(--muted)]">Visa · Expires 08/27</div>
            <div className="mt-1 text-xs text-[var(--subtle)]">Billing email: vahagn@voxgard.ai</div>
            <div className="mt-5 rounded-xl border border-[var(--border)] bg-white/60 p-3 text-xs text-[var(--muted)]">
              Next charge: <span className="text-[var(--ink)]">$4,900.00</span> on{" "}
              {currentPlan.renewsOn}
            </div>
          </BillingCard>

          <BillingCard title="Need a custom plan?" subtitle="Enterprise" accent="#1E3A8A">
            <p className="text-sm text-[var(--muted)]">
              Get dedicated infrastructure, SLA support and custom terms for your
              organization.
            </p>
            <div className="mt-5">
              <GlowButton>Talk to sales</GlowButton>
            </div>
          </BillingCard>
        </div>

        <h3 className="mt-10 text-lg font-semibold">Usage this period</h3>
        <div className="mt-4 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {currentPlan.usage.map((u) => {
            const pct = Math.min(100, Math.round((u.used / u.total) * 100));
            return (
              <div
                key={u.label}
                className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-white/60 p-5 backdrop-blur-xl"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-25"
                  style={{
                    background: `radial-gradient(circle at top right, ${u.accent}30, transparent 60%)`,
                  }}
                />
                <div className="relative">
                  <div className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
                    {u.label}
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-2xl font-bold">{u.used.toLocaleString()}</span>
                    <span className="text-sm text-[var(--subtle)]">/ {u.total.toLocaleString()}</span>
                  </div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/60">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${pct}%`,
                        background: `linear-gradient(90deg, ${u.accent}, ${u.accent}aa)`,
                        boxShadow: `0 0 10px ${u.accent}`,
                      }}
                    />
                  </div>
                  <div className="mt-2 text-xs text-[var(--subtle)]">{pct}% used</div>
                </div>
              </div>
            );
          })}
        </div>

        <h3 className="mt-10 text-lg font-semibold">Available plans</h3>
        <div className="mt-4 grid gap-5 md:grid-cols-3">
          {pricingTiers.map((t) => (
            <PricingCard key={t.name} tier={t} current={t.name === currentPlan.name} />
          ))}
        </div>

        <h3 className="mt-10 text-lg font-semibold">Invoice history</h3>
        <div className="mt-4">
          <DataTable<Invoice>
            columns={invoiceColumns}
            rows={invoices}
            getRowKey={(r) => r.id}
          />
        </div>
      </main>
    </>
  );
}
