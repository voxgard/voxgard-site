"use client";

import { useEffect, useRef } from "react";

type Variant = "full" | "subtle";

export default function MeshBackground({ variant = "full" }: { variant?: Variant }) {
  const ref = useRef<HTMLDivElement>(null);
  const opacity = variant === "subtle" ? 0.55 : 0.85;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--mx", `${x}%`);
        el.style.setProperty("--my", `${y}%`);
        el.style.setProperty("--px", `${(x - 50) * 0.4}px`);
        el.style.setProperty("--py", `${(y - 50) * 0.4}px`);
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ "--mx": "50%", "--my": "50%", "--px": "0px", "--py": "0px" } as React.CSSProperties}
    >
      {/* Pearl base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #FAFBFD 0%, #EEF3FA 45%, #F4F6FB 100%)",
        }}
      />

      {/* Soft pastel orbs — static cinematic.
          No drift; only ultra-slow ambient breath + cursor parallax. */}
      <div
        className="absolute -left-32 -top-40 h-[760px] w-[760px] rounded-full blur-[160px]"
        style={{
          background:
            "radial-gradient(circle, #A8C9F0 0%, rgba(168,201,240,0.35) 50%, transparent 78%)",
          opacity: opacity * 0.95,
          animation: "vox-pulse-soft 22s ease-in-out infinite",
          transform: "translate(var(--px), var(--py))",
          willChange: "transform",
          transition: "transform 2s cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      />
      <div
        className="absolute -right-40 top-[18%] h-[700px] w-[700px] rounded-full blur-[160px]"
        style={{
          background:
            "radial-gradient(circle, #C5BBED 0%, rgba(197,187,237,0.35) 50%, transparent 78%)",
          opacity: opacity * 0.9,
          animation: "vox-pulse-soft 26s ease-in-out infinite",
          animationDelay: "-9s",
          transform: "translate(calc(var(--px) * -0.5), calc(var(--py) * -0.5))",
          willChange: "transform",
          transition: "transform 2.1s cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      />
      <div
        className="absolute bottom-[-12%] left-1/4 h-[620px] w-[620px] rounded-full blur-[170px]"
        style={{
          background:
            "radial-gradient(circle, #A8E0EA 0%, rgba(168,224,234,0.3) 50%, transparent 78%)",
          opacity: opacity * 0.8,
          animation: "vox-pulse-soft 30s ease-in-out infinite",
          animationDelay: "-14s",
          transform: "translate(calc(var(--px) * 0.4), calc(var(--py) * -0.35))",
          willChange: "transform",
          transition: "transform 2.2s cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(155,143,224,0.4) 0%, transparent 70%)",
          opacity: opacity * 0.7,
          animation: "vox-pulse-soft 11s ease-in-out infinite",
        }}
      />

      {/* Subtle grid */}
      <div
        className="vox-grid absolute inset-0 opacity-60"
        style={{
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 78%)",
        }}
      />

      {/* Cursor-following soft glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(560px circle at var(--mx) var(--my), rgba(155, 143, 224, 0.16), transparent 50%)",
          transition: "background 0.6s cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      />

      {/* Top haze fade */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(250,251,253,0.6) 0%, transparent 14%, transparent 86%, rgba(244,246,251,0.7) 100%)",
        }}
      />
    </div>
  );
}
