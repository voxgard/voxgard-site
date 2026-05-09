import type { Call } from "../lib/mock";
import StatusBadge from "./StatusBadge";

const statusTone: Record<Call["status"], "success" | "warn" | "danger" | "info"> = {
  Completed: "success",
  Missed: "warn",
  Failed: "danger",
  "In progress": "info",
};

const sentimentTone: Record<Call["sentiment"], "success" | "neutral" | "danger"> = {
  Positive: "success",
  Neutral: "neutral",
  Negative: "danger",
};

export default function CallLogCard({ call }: { call: Call }) {
  return (
    <div className="vox-glass vox-glow-card group relative overflow-hidden rounded-2xl p-5 transition-all duration-700 [transition-timing-function:cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 ring-[var(--border)]"
            style={{
              background:
                "linear-gradient(135deg, rgba(111,168,232,0.18), rgba(155,143,224,0.18))",
              color: "#1E3A8A",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-[var(--ink)]">{call.contact}</span>
              <span className="text-xs text-[var(--subtle)]">·</span>
              <span className="text-sm text-[var(--muted)]">{call.company}</span>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-[var(--subtle)]">
              <span>Agent: <span className="text-[var(--text)]">{call.agent}</span></span>
              <span>·</span>
              <span>{call.language}</span>
              <span>·</span>
              <span>{call.startedAt}</span>
            </div>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2">
          <div className="font-mono text-sm text-[var(--text)]">{call.duration}</div>
          <StatusBadge label={call.status} tone={statusTone[call.status]} />
        </div>
      </div>

      <p className="mt-4 line-clamp-2 text-sm text-[var(--text)]">{call.summary}</p>

      <div className="mt-4 flex items-center justify-between border-t border-[var(--border-soft)] pt-3 text-xs">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[var(--subtle)]">{call.id}</span>
          <StatusBadge label={call.sentiment} tone={sentimentTone[call.sentiment]} />
        </div>
        <button className="text-[var(--brand-navy)] transition hover:underline">
          View transcript →
        </button>
      </div>
    </div>
  );
}
