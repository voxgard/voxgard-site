import { currentUser } from "../lib/mock";

export default function TopNav({ title }: { title: string }) {
  return (
    <header className="vox-glass-strong sticky top-0 z-10 !rounded-none border-b border-[var(--border-soft)]">
      <div className="flex items-center justify-between gap-6 px-6 py-4 md:px-8">
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--subtle)]">
            {currentUser.org}
          </div>
          <h1 className="mt-1 text-lg font-semibold tracking-tight text-[var(--ink)] md:text-xl">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-[var(--border-soft)] bg-white/70 px-4 py-2 text-sm text-[var(--muted)] backdrop-blur-xl md:flex md:w-72">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search calls, contacts, agents..."
              className="w-full bg-transparent text-sm text-[var(--ink)] outline-none placeholder:text-[var(--subtle)]"
            />
            <kbd className="hidden rounded border border-[var(--border-soft)] bg-white/60 px-1.5 py-0.5 text-[10px] text-[var(--muted)] md:inline">
              ⌘K
            </kbd>
          </div>

          <button
            className="vox-ease flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-soft)] bg-white/70 text-[var(--text)] transition hover:border-[var(--border)] hover:bg-white/90"
            aria-label="Notifications"
          >
            <span className="relative">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span
                className="absolute -right-1 -top-1 h-2 w-2 rounded-full"
                style={{ background: "#9B8FE0", boxShadow: "0 0 8px #9B8FE0" }}
              />
            </span>
          </button>

          <div className="flex items-center gap-3 rounded-full border border-[var(--border-soft)] bg-white/70 py-1 pl-1 pr-4 backdrop-blur-xl">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-semibold text-white ring-1 ring-white/40"
              style={{
                background: "linear-gradient(135deg, #6FA8E8, #9B8FE0, #7CC9DC)",
                boxShadow: "0 4px 12px -4px rgba(155,143,224,0.55)",
              }}
            >
              {currentUser.initials}
            </div>
            <div className="hidden text-xs leading-tight md:block">
              <div className="font-medium text-[var(--ink)]">{currentUser.name.split(" ")[0]}</div>
              <div className="text-[var(--muted)]">{currentUser.email}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
