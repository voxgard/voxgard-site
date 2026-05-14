"use client";

import Link from "next/link";
import { CONTENT_KEYS, CONTENT_LABELS, CONTENT_DESCRIPTIONS } from "../lib/admin/keys";

export const dynamic = "force-dynamic";

export default function AdminDashboard() {
  return (
    <div className="px-10 py-10">
      <div className="mb-8">
        <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">
          Dashboard
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Content
        </h1>
        <p className="mt-2 max-w-xl text-sm text-white/60">
          Edit any section of vision-a without touching code. Changes save to
          versioned JSON files. Live preview updates as you type.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {CONTENT_KEYS.map((k) => (
          <Link
            key={k}
            href={`/admin/content/${k}`}
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/20 hover:bg-white/[0.06]"
          >
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">{CONTENT_LABELS[k]}</div>
              <span className="text-white/30 transition group-hover:translate-x-0.5 group-hover:text-white/70">
                →
              </span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-white/50">
              {CONTENT_DESCRIPTIONS[k]}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
        <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">
          Quick links
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link
            href="/vision-a"
            target="_blank"
            className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/70 transition hover:border-white/30 hover:text-white"
          >
            Open vision-a ↗
          </Link>
          <Link
            href="/admin/content/theme"
            className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/70 transition hover:border-white/30 hover:text-white"
          >
            Theme tokens
          </Link>
          <Link
            href="/admin/content/plans"
            className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/70 transition hover:border-white/30 hover:text-white"
          >
            Pricing plans
          </Link>
        </div>
      </div>
    </div>
  );
}
