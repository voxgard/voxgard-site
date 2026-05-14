"use client";

import { useEffect, useMemo, useRef } from "react";

/**
 * Persistent cinematic scene for vision-a.
 * Fixed full-viewport. One continuous AI environment behind the UI.
 *
 * Layers (back → front):
 *   1. Deep gradient base (radial vignette)
 *   2. Volumetric blobs — slow elegant drift, cursor parallax
 *   3. Horizon glow band
 *   4. Soft grid (vignette-masked)
 *   5. Ambient drift particles
 *   6. Cursor-following soft glow
 *   7. Top/bottom haze + outer vignette
 */
export default function CinematicBackground() {
  const ref = useRef<HTMLDivElement>(null);

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
        el.style.setProperty("--px", `${(x - 50) * 0.5}px`);
        el.style.setProperty("--py", `${(y - 50) * 0.5}px`);
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Deterministic particle layout — SSR-safe, no hydration mismatch.
  const particles = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        left: ((i * 73) % 97) + 1,
        top: ((i * 31) % 91) + 4,
        size: 2 + (i % 3),
        delay: -((i * 1.7) % 22),
        dur: 28 + (i % 6) * 4,
        color:
          i % 3 === 0 ? "#9B8FE0" : i % 3 === 1 ? "#6FA8E8" : "#7CC9DC",
      })),
    [],
  );

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={
        {
          "--mx": "50%",
          "--my": "50%",
          "--px": "0px",
          "--py": "0px",
        } as React.CSSProperties
      }
    >
      {/* 1. Cinematic gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 50% 0%, #FAFCFF 0%, #EEF3FA 38%, #E8EDF6 75%, #DFE6F0 100%)",
        }}
      />

      {/* 2. Volumetric blobs.
            Outer wrapper = cursor parallax (transform).
            Inner = ambient drift (transform). Two transform contexts compose. */}
      <div
        className="absolute -left-40 -top-40 h-[820px] w-[820px]"
        style={{
          transform: "translate(var(--px), var(--py))",
          transition: "transform 2s var(--vox-ease)",
          willChange: "transform",
        }}
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, #A8C9F0 0%, rgba(168,201,240,0.32) 50%, transparent 78%)",
            filter: "blur(160px)",
            opacity: 0.85,
            animation: "vox-drift-a 48s ease-in-out infinite",
          }}
        />
      </div>

      <div
        className="absolute -right-44 top-[14%] h-[760px] w-[760px]"
        style={{
          transform:
            "translate(calc(var(--px) * -0.55), calc(var(--py) * -0.55))",
          transition: "transform 2.1s var(--vox-ease)",
          willChange: "transform",
        }}
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, #C5BBED 0%, rgba(197,187,237,0.32) 50%, transparent 78%)",
            filter: "blur(170px)",
            opacity: 0.82,
            animation: "vox-drift-b 56s ease-in-out infinite",
            animationDelay: "-12s",
          }}
        />
      </div>

      <div
        className="absolute bottom-[-18%] left-[20%] h-[680px] w-[680px]"
        style={{
          transform:
            "translate(calc(var(--px) * 0.45), calc(var(--py) * -0.4))",
          transition: "transform 2.2s var(--vox-ease)",
          willChange: "transform",
        }}
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, #A8E0EA 0%, rgba(168,224,234,0.28) 50%, transparent 78%)",
            filter: "blur(180px)",
            opacity: 0.75,
            animation: "vox-drift-c 64s ease-in-out infinite",
            animationDelay: "-22s",
          }}
        />
      </div>

      {/* Central soft core */}
      <div
        className="absolute left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(155,143,224,0.40) 0%, transparent 70%)",
          filter: "blur(120px)",
          opacity: 0.6,
          animation: "vox-pulse-soft 14s ease-in-out infinite",
        }}
      />

      {/* 3. Horizon glow band */}
      <div
        className="absolute inset-x-0 top-[42%] h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(155,143,224,0.32) 30%, rgba(124,201,220,0.4) 50%, rgba(155,143,224,0.32) 70%, transparent 100%)",
          boxShadow:
            "0 0 80px rgba(155,143,224,0.22), 0 0 200px rgba(168,201,240,0.16)",
          opacity: 0.65,
        }}
      />

      {/* 4. Subtle grid (vignette-masked) */}
      <div
        className="vox-grid absolute inset-0 opacity-50"
        style={{
          maskImage:
            "radial-gradient(ellipse at center, black 25%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 25%, transparent 75%)",
        }}
      />

      {/* 5. Ambient drift particles */}
      <div className="absolute inset-0">
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              background: p.color,
              boxShadow: `0 0 10px ${p.color}aa`,
              opacity: 0,
              animation: `vox-drift-up ${p.dur}s linear infinite`,
              animationDelay: `${p.delay}s`,
              willChange: "transform, opacity",
            }}
          />
        ))}
      </div>

      {/* 6. Cursor glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(620px circle at var(--mx) var(--my), rgba(155,143,224,0.18), transparent 50%)",
          transition: "background 0.6s var(--vox-ease)",
        }}
      />

      {/* 7. Haze + outer vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(250,251,253,0.6) 0%, transparent 14%, transparent 86%, rgba(232,237,246,0.7) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 90% at 50% 50%, transparent 50%, rgba(15,23,42,0.06) 100%)",
        }}
      />
    </div>
  );
}
