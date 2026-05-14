"use client";

import type { Theme } from "../../themes";
import MouseReactiveLayer from "./MouseReactiveLayer";

type Variant = "full" | "subtle";

/**
 * Universal background — themable liquid gradient field.
 * Reads palette + motion from theme; renders soft blobs + grid + cursor glow.
 */
export default function AnimatedBackground({
  theme,
  variant = "full",
}: {
  theme: Theme;
  variant?: Variant;
}) {
  const base = variant === "subtle" ? 0.55 : 0.85;
  const dark = theme.isDark;

  const gridStroke = dark
    ? "rgba(255, 255, 255, 0.05)"
    : "rgba(15, 23, 42, 0.04)";

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${theme.palette.bgFrom} 0%, ${theme.palette.bgVia} 45%, ${theme.palette.bgTo} 100%)`,
        }}
      />

      {/* Liquid orbs — cursor parallax via CSS vars set by MouseReactiveLayer */}
      <div
        className="absolute -left-32 -top-40 h-[700px] w-[700px] rounded-full blur-[140px]"
        style={{
          background: `radial-gradient(circle, ${theme.palette.accent1}, ${theme.palette.accent1}66 50%, transparent 75%)`,
          opacity: dark ? base * 0.55 : base,
          animation: `vox-blob ${theme.motion.blobDurationS}s ease-in-out infinite, vox-breathe 9s ease-in-out infinite`,
          transform: "translate(var(--px, 0), var(--py, 0))",
          willChange: "transform",
          transition: "transform 1.5s cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      />
      <div
        className="absolute -right-32 top-1/4 h-[640px] w-[640px] rounded-full blur-[140px]"
        style={{
          background: `radial-gradient(circle, ${theme.palette.accent2}, ${theme.palette.accent2}66 50%, transparent 75%)`,
          opacity: dark ? base * 0.55 : base * 0.95,
          animation: `vox-blob ${theme.motion.blobDurationS + 4}s ease-in-out infinite`,
          animationDelay: "-9s",
          transform: "translate(calc(var(--px, 0) * -0.6), calc(var(--py, 0) * -0.6))",
          willChange: "transform",
          transition: "transform 1.6s cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      />
      <div
        className="absolute bottom-[-10%] left-1/4 h-[560px] w-[560px] rounded-full blur-[150px]"
        style={{
          background: `radial-gradient(circle, ${theme.palette.accent3}, ${theme.palette.accent3}59 50%, transparent 75%)`,
          opacity: dark ? base * 0.5 : base * 0.85,
          animation: `vox-blob ${theme.motion.blobDurationS + 2}s ease-in-out infinite`,
          animationDelay: "-16s",
          transform: "translate(calc(var(--px, 0) * 0.5), calc(var(--py, 0) * -0.4))",
          willChange: "transform",
          transition: "transform 1.7s cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: `linear-gradient(${gridStroke} 1px, transparent 1px), linear-gradient(90deg, ${gridStroke} 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 78%)",
        }}
      />

      {/* Cursor glow */}
      <MouseReactiveLayer theme={theme} blendMode={dark ? "screen" : "normal"} />

      {/* Top + bottom haze fade */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${theme.palette.bgFrom}AA 0%, transparent 14%, transparent 86%, ${theme.palette.bgTo}B3 100%)`,
        }}
      />
    </div>
  );
}
