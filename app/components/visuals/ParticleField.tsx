"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Theme } from "../../themes";

/**
 * Decorative floating particles. Themable.
 * Skips render if theme.particles.count === 0 (e.g. enterprise C).
 */
export default function ParticleField({
  theme,
  count,
  area = "full",
}: {
  theme: Theme;
  count?: number;
  area?: "full" | "container";
}) {
  const n = count ?? theme.particles.count;
  const [pts, setPts] = useState<
    Array<{
      left: number;
      top: number;
      size: number;
      delay: number;
      dur: number;
      color: string;
    }>
  >([]);

  useEffect(() => {
    if (n <= 0) return;
    const colors = [
      theme.palette.accent1,
      theme.palette.accent2,
      theme.palette.accent3,
    ];
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only randomness for particles
    setPts(
      Array.from({ length: n }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size:
          theme.particles.minSize +
          Math.random() * (theme.particles.maxSize - theme.particles.minSize),
        delay: Math.random() * 8,
        dur: 6 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
      })),
    );
  }, [n, theme.particles.minSize, theme.particles.maxSize, theme.palette.accent1, theme.palette.accent2, theme.palette.accent3]);

  if (n <= 0) return null;

  const wrapClass =
    area === "full"
      ? "pointer-events-none fixed inset-0 z-[1]"
      : "pointer-events-none absolute inset-0";

  return (
    <div className={wrapClass}>
      {pts.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 12px ${p.color}aa`,
          }}
          animate={{
            y: [0, -18, 0],
            opacity: [0, theme.particles.opacityMax, 0],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
