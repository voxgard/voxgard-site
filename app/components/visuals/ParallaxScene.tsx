"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import type { Theme } from "../../themes";

/**
 * Wraps children in a 3D-tilting plate that reacts to cursor.
 * Tilt strength scales with theme.motion.parallaxStrength.
 */
export default function ParallaxScene({
  theme,
  children,
  className = "",
  intensity = 1,
}: {
  theme: Theme;
  children: ReactNode;
  className?: string;
  /** Multiplier on top of theme strength. */
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const sx = useSpring(mx, { stiffness: 100, damping: 22, mass: 0.9 });
  const sy = useSpring(my, { stiffness: 100, damping: 22, mass: 0.9 });

  const maxTilt = 12 * theme.motion.parallaxStrength * intensity;
  const rotateX = useTransform(sy, [-1, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(sx, [-1, 1], [-maxTilt, maxTilt]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      mx.set(Math.max(-1, Math.min(1, x * 2)));
      my.set(Math.max(-1, Math.min(1, y * 2)));
    };
    const onLeave = () => {
      mx.set(0);
      my.set(0);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [mx, my]);

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1400 }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
