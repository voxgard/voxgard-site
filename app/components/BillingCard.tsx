import type { ReactNode } from "react";

export default function BillingCard({
  title,
  subtitle,
  accent = "#9B8FE0",
  action,
  children,
}: {
  title: string;
  subtitle?: string;
  accent?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="vox-glass vox-glow-card relative overflow-hidden rounded-2xl p-6">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background: `radial-gradient(circle at top right, ${accent}26, transparent 60%)`,
        }}
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
              {title}
            </div>
            {subtitle && (
              <div className="mt-2 text-2xl font-bold tracking-tight text-[var(--ink)]">
                {subtitle}
              </div>
            )}
          </div>
          {action}
        </div>

        <div className="mt-5 text-[var(--text)]">{children}</div>
      </div>
    </div>
  );
}
