import type { Contact } from "../lib/mock";
import StatusBadge from "./StatusBadge";

const tone: Record<Contact["status"], "danger" | "warn" | "info" | "success"> = {
  Hot: "danger",
  Warm: "warn",
  Cold: "info",
  Closed: "success",
};

export default function CrmCard({ contact }: { contact: Contact }) {
  return (
    <div className="vox-glass vox-glow-card vox-gradient-border group relative overflow-hidden rounded-2xl p-6 transition-all duration-700 [transition-timing-function:cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background: `radial-gradient(circle at top right, ${contact.accent}22, transparent 60%)`,
        }}
      />
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-semibold text-white ring-1 ring-white/40"
              style={{
                background: `linear-gradient(135deg, ${contact.accent}, ${contact.accent}aa)`,
                boxShadow: `0 6px 18px -6px ${contact.accent}88`,
              }}
            >
              {contact.initials}
            </div>
            <div>
              <div className="font-semibold text-[var(--ink)]">{contact.name}</div>
              <div className="text-xs text-[var(--muted)]">{contact.title}</div>
            </div>
          </div>
          <StatusBadge label={contact.status} tone={tone[contact.status]} />
        </div>

        <div className="mt-5 space-y-2 text-sm">
          <div className="flex items-center gap-2 text-[var(--muted)]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <rect x="3" y="6" width="18" height="14" rx="2" />
              <path d="M3 8l9 6 9-6" />
            </svg>
            <span className="truncate">{contact.email}</span>
          </div>
          <div className="flex items-center gap-2 text-[var(--muted)]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <span>{contact.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-[var(--muted)]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M3 21h18M5 21V8l7-5 7 5v13M9 12h.01M15 12h.01M9 16h.01M15 16h.01" />
            </svg>
            <span>{contact.company}</span>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-[var(--border-soft)] pt-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--subtle)]">Deal value</div>
            <div className="vox-shimmer-text mt-1 text-lg font-bold">{contact.dealValue}</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--subtle)]">Last activity</div>
            <div className="mt-1 text-xs text-[var(--text)]">{contact.lastActivity}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
