"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { currentUser } from "../lib/mock";

type Item = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const items: Item[] = [
  {
    href: "/dashboard",
    label: "Overview",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="9" rx="1.5" />
        <rect x="14" y="3" width="7" height="5" rx="1.5" />
        <rect x="14" y="12" width="7" height="9" rx="1.5" />
        <rect x="3" y="16" width="7" height="5" rx="1.5" />
      </svg>
    ),
  },
  {
    href: "/dashboard/calls",
    label: "Calls",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
  },
  {
    href: "/dashboard/agents",
    label: "Agents",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <circle cx="9" cy="10" r="1.5" />
        <circle cx="15" cy="10" r="1.5" />
        <path d="M9 15c1 1 2 1.5 3 1.5s2-.5 3-1.5" />
        <path d="M12 1v3M12 20v3M1 12h3M20 12h3" />
      </svg>
    ),
  },
  {
    href: "/dashboard/crm",
    label: "CRM",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    href: "/dashboard/analytics",
    label: "Analytics",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M7 14l4-4 4 4 5-7" />
      </svg>
    ),
  },
  {
    href: "/dashboard/billing",
    label: "Billing",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="14" rx="2" />
        <path d="M2 11h20" />
        <path d="M6 16h4" />
      </svg>
    ),
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="vox-glass-strong sticky top-0 z-20 hidden h-screen w-64 shrink-0 border-r border-[var(--border-soft)] !rounded-none md:flex md:flex-col">
      <div className="px-6 py-6">
        <Link href="/dashboard">
          <Logo size="md" />
        </Link>
      </div>

      <nav className="flex-1 px-3">
        <div className="px-3 pb-2 text-[10px] uppercase tracking-[0.3em] text-[var(--subtle)]">
          Workspace
        </div>
        <ul className="space-y-1">
          {items.map((item) => {
            const active =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`vox-ease group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                    active
                      ? "text-[var(--ink)]"
                      : "text-[var(--muted)] hover:bg-white/60 hover:text-[var(--ink)]"
                  }`}
                >
                  {active && (
                    <>
                      <span
                        className="absolute inset-0 rounded-xl"
                        style={{
                          background:
                            "linear-gradient(90deg, rgba(111,168,232,0.18), rgba(155,143,224,0.16))",
                        }}
                      />
                      <span
                        className="absolute left-0 top-1/2 h-6 w-[2px] -translate-y-1/2 rounded-r"
                        style={{
                          background: "linear-gradient(180deg, #6FA8E8, #9B8FE0)",
                          boxShadow: "0 0 12px rgba(155,143,224,0.6)",
                        }}
                      />
                    </>
                  )}
                  <span className="relative">{item.icon}</span>
                  <span className="relative">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="m-3 vox-glass rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ring-1 ring-white/40"
            style={{
              background: "linear-gradient(135deg, #6FA8E8, #9B8FE0, #7CC9DC)",
              boxShadow: "0 6px 14px -4px rgba(155,143,224,0.55)",
            }}
          >
            {currentUser.initials}
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-medium text-[var(--ink)]">{currentUser.name}</div>
            <div className="truncate text-xs text-[var(--muted)]">{currentUser.role}</div>
          </div>
        </div>
        <Link
          href="/login"
          className="vox-ease mt-3 block rounded-lg border border-[var(--border-soft)] bg-white/60 px-3 py-2 text-center text-xs text-[var(--text)] transition hover:border-[var(--border)] hover:bg-white/85"
        >
          Sign out
        </Link>
      </div>
    </aside>
  );
}
