"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useTransition } from "react";
import { CONTENT_KEYS, CONTENT_LABELS } from "../lib/admin/keys";

/**
 * Admin shell — sidebar + content area.
 * Login page (/admin/login) opts out of the sidebar for a clean lock screen.
 */
export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const isLogin = pathname === "/admin/login";

  if (isLogin) {
    return <main className="min-h-screen bg-[#0B0F1A] text-white">{children}</main>;
  }

  function logout() {
    startTransition(async () => {
      await fetch("/api/admin/auth", { method: "DELETE" });
      router.push("/admin/login");
    });
  }

  return (
    <div className="grid min-h-screen grid-cols-[260px_1fr] bg-[#0B0F1A] text-white">
      <aside className="flex flex-col border-r border-white/10 bg-[#0F1424] p-6">
        <Link
          href="/admin"
          className="mb-8 flex items-center gap-3 text-sm font-bold tracking-[0.28em]"
        >
          <span
            className="inline-block h-2.5 w-2.5 rounded-sm"
            style={{
              background: "linear-gradient(135deg, #6FA8E8, #9B8FE0, #7CC9DC)",
              boxShadow: "0 0 18px rgba(155,143,224,0.55)",
            }}
          />
          VOXGARD · ADMIN
        </Link>

        <div className="mb-2 text-[10px] uppercase tracking-[0.3em] text-white/40">
          Content
        </div>
        <nav className="flex flex-col gap-0.5">
          {CONTENT_KEYS.map((k) => {
            const href = `/admin/content/${k}`;
            const active = pathname === href;
            return (
              <Link
                key={k}
                href={href}
                className={`rounded-lg px-3 py-2 text-sm transition ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                {CONTENT_LABELS[k]}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-6">
          <Link
            href="/vision-a"
            target="_blank"
            className="mb-2 block rounded-lg border border-white/10 px-3 py-2 text-center text-xs text-white/70 transition hover:border-white/20 hover:text-white"
          >
            Open site ↗
          </Link>
          <button
            type="button"
            onClick={logout}
            disabled={pending}
            className="block w-full rounded-lg border border-white/10 px-3 py-2 text-xs text-white/60 transition hover:border-white/20 hover:text-white disabled:opacity-50"
          >
            {pending ? "Signing out…" : "Sign out"}
          </button>
        </div>
      </aside>

      <main className="overflow-x-hidden">{children}</main>
    </div>
  );
}
