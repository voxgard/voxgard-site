type Tier = {
  name: string;
  price: string;
  per: string;
  desc: string;
  features: string[];
  highlight: boolean;
};

export default function PricingCard({
  tier,
  current = false,
}: {
  tier: Tier;
  current?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl p-8 transition-all duration-700 [transition-timing-function:cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 ${
        tier.highlight
          ? "vox-glass-strong border-transparent shadow-[var(--shadow-lift)]"
          : "vox-glass"
      }`}
    >
      {tier.highlight && (
        <>
          <div
            className="absolute inset-0 rounded-3xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(111,168,232,0.16), rgba(155,143,224,0.16), rgba(124,201,220,0.12))",
            }}
          />
          <div
            className="absolute inset-0 rounded-3xl"
            style={{
              padding: "1px",
              background: "linear-gradient(135deg, #6FA8E8, #9B8FE0, #7CC9DC)",
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
        <div className="flex items-center justify-between">
          <div className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
            {tier.name}
          </div>
          {current && (
            <span className="rounded-full border border-emerald-300/60 bg-emerald-50/80 px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-emerald-700">
              Current
            </span>
          )}
          {tier.highlight && !current && (
            <span
              className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white"
              style={{
                background: "linear-gradient(90deg, #6FA8E8, #9B8FE0, #7CC9DC)",
                boxShadow: "0 6px 18px -6px rgba(155,143,224,0.6)",
              }}
            >
              Most popular
            </span>
          )}
        </div>

        <div className="mt-6 flex items-baseline gap-2">
          <span className="text-5xl font-bold tracking-tight text-[var(--ink)]">{tier.price}</span>
          <span className="text-sm text-[var(--subtle)]">{tier.per}</span>
        </div>
        <p className="mt-3 text-sm text-[var(--text)]">{tier.desc}</p>

        <ul className="mt-6 space-y-3 text-sm">
          {tier.features.map((f) => (
            <li key={f} className="flex items-center gap-3 text-[var(--text)]">
              <span
                className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(111,168,232,0.8), rgba(155,143,224,0.8))",
                  boxShadow: "0 2px 6px -2px rgba(155,143,224,0.5)",
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </span>
              {f}
            </li>
          ))}
        </ul>

        <button
          disabled={current}
          className={`vox-ease mt-8 block w-full rounded-full px-6 py-3 text-center text-sm font-semibold transition ${
            current
              ? "cursor-not-allowed border border-[var(--border-soft)] bg-white/40 text-[var(--subtle)]"
              : tier.highlight
                ? "vox-btn-soft"
                : "border border-[var(--border)] bg-white/70 text-[var(--ink-2)] hover:bg-white/90"
          }`}
        >
          {current
            ? "Current plan"
            : tier.name === "Enterprise"
              ? "Contact Sales"
              : "Upgrade"}
        </button>
      </div>
    </div>
  );
}
