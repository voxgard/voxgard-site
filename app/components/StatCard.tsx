"use client";

import { useRef } from "react";
import type { Stat } from "../lib/mock";
import Sparkline from "./Sparkline";

export default function StatCard({ stat }: { stat: Stat }) {
  const trendUp = stat.trend === "up";
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(1100px) rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 4).toFixed(2)}deg)`;
        el.style.setProperty("--gx", `${((x + 0.5) * 100).toFixed(1)}%`);
        el.style.setProperty("--gy", `${((y + 0.5) * 100).toFixed(1)}%`);
      }}
      onMouseLeave={() => {
        const el = ref.current;
        if (!el) return;
        el.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg)";
      }}
      className="vox-glass vox-glow-card vox-gradient-border relative overflow-hidden rounded-2xl p-6 will-change-transform"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background: `radial-gradient(circle at top right, ${stat.accent}26, transparent 60%)`,
        }}
      />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
            {stat.label}
          </div>
          <div className="mt-3 text-3xl font-bold tracking-tight text-[var(--ink)]">
            {stat.value}
          </div>
          <div
            className="mt-2 inline-flex items-center gap-1 text-xs font-medium"
            style={{ color: trendUp ? "#047857" : "#BE123C" }}
          >
            <span>{trendUp ? "↑" : "↓"}</span>
            {stat.change}
            <span className="text-[var(--subtle)]">vs. last period</span>
          </div>
        </div>
        <div className="shrink-0">
          <Sparkline data={stat.spark} color={stat.accent} />
        </div>
      </div>
    </div>
  );
}
