"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import type { Theme } from "../../themes";

/**
 * Cursor-following soft glow + parallax CSS variables.
 * Other layers can read --mx, --my, --px, --py from this element's parent.
 *
 * Drop this anywhere — it sets variables on the closest positioned ancestor
 * via document.documentElement so any descendant can use them.
 */
export default function MouseReactiveLayer({
  theme,
  glowSize = 560,
  blendMode = "normal",
}: {
  theme: Theme;
  glowSize?: number;
  blendMode?: "normal" | "screen" | "soft-light";
}) {
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
        const root = document.documentElement;
        root.style.setProperty("--mx", `${x}%`);
        root.style.setProperty("--my", `${y}%`);
        root.style.setProperty(
          "--px",
          `${(x - 50) * theme.motion.parallaxStrength}px`,
        );
        root.style.setProperty(
          "--py",
          `${(y - 50) * theme.motion.parallaxStrength}px`,
        );
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [theme.motion.parallaxStrength]);

  const glowColor = theme.isDark
    ? `${theme.palette.accent2}55`
    : `${theme.palette.accent2}28`;

  const style: CSSProperties = {
    background: `radial-gradient(${glowSize}px circle at var(--mx, 50%) var(--my, 50%), ${glowColor}, transparent 50%)`,
    transition: "background 0.6s cubic-bezier(0.32, 0.72, 0, 1)",
    mixBlendMode: blendMode,
  };

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0"
      style={style}
    />
  );
}
