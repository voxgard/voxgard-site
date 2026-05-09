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

      {/* Soft pastel orbs — Apple Vision Pro style */}
      <div
        className="absolute -left-32 -top-40 h-[700px] w-[700px] rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, #A8C9F0 0%, rgba(168,201,240,0.4) 50%, transparent 75%)",
          opacity,
          animation: "vox-blob 28s ease-in-out infinite, vox-breathe 9s ease-in-out infinite",
          transform: "translate(var(--px), var(--py))",
          willChange: "transform",
          transition: "transform 1.5s cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      />
      <div
        className="absolute -right-32 top-1/4 h-[640px] w-[640px] rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, #C5BBED 0%, rgba(197,187,237,0.4) 50%, transparent 75%)",
          opacity: opacity * 0.95,
          animation: "vox-blob 32s ease-in-out infinite",
          animationDelay: "-9s",
          transform: "translate(calc(var(--px) * -0.6), calc(var(--py) * -0.6))",
          willChange: "transform",
          transition: "transform 1.6s cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      />
      <div
        className="absolute bottom-[-10%] left-1/4 h-[560px] w-[560px] rounded-full blur-[150px]"
        style={{
          background:
            "radial-gradient(circle, #A8E0EA 0%, rgba(168,224,234,0.35) 50%, transparent 75%)",
          opacity: opacity * 0.85,
          animation: "vox-blob 30s ease-in-out infinite",
          animationDelay: "-16s",
          transform: "translate(calc(var(--px) * 0.5), calc(var(--py) * -0.4))",
          willChange: "transform",
          transition: "transform 1.7s cubic-bezier(0.32, 0.72, 0, 1)",
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
