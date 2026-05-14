"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";

/**
 * Reusable spatial-depth wrapper.
 *
 * Renders an outer perspective host + inner 3D plate.
 * Self-contained: works regardless of ancestor `transform-style`.
 *
 * Provides:
 *   - translateZ (depth tier — bigger = closer to viewer)
 *   - layered shadow scaled to depth
 *   - optional continuous float (subtle Y drift)
 *   - optional cursor-reactive perspective tilt
 *
 * Lightweight: CSS transforms + Framer Motion. No WebGL.
 */
export default function DepthLayer({
  z = 0,
  float = false,
  cursor = false,
  intensity = 1,
  perspective = 1600,
  className = "",
  innerClassName = "",
  style,
  children,
}: {
  /** translateZ in px. Range typically -60..120. */
  z?: number;
  /** Subtle continuous Y float. */
  float?: boolean;
  /** Cursor-reactive tilt. */
  cursor?: boolean;
  /** Tilt strength multiplier (cursor only). */
  intensity?: number;
  /** Perspective (px) on host. */
  perspective?: number;
  /** Class on outer host (positioning, layout). */
  className?: string;
  /** Class on inner 3D plate (visual). */
  innerClassName?: string;
  /** Inline style on inner 3D plate. */
  style?: CSSProperties;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 20, mass: 0.8 });
  const sy = useSpring(my, { stiffness: 80, damping: 20, mass: 0.8 });

  const max = 6 * intensity;
  const rotateX = useTransform(sy, [-1, 1], [max, -max]);
  const rotateY = useTransform(sx, [-1, 1], [-max, max]);

  useEffect(() => {
    if (!cursor) return;
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
  }, [cursor, mx, my]);

  const shadow = depthShadow(z);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        perspective: `${perspective}px`,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        className={`vox-depth-layer ${innerClassName}`}
        style={{
          z,
          rotateX: cursor ? rotateX : 0,
          rotateY: cursor ? rotateY : 0,
          transformStyle: "preserve-3d",
          boxShadow: shadow,
          willChange: "transform",
          ...style,
        }}
        animate={float ? { y: [0, -7, 0, 5, 0] } : undefined}
        transition={
          float
            ? {
                duration: 9 + Math.abs(z) * 0.04,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : undefined
        }
      >
        {children}
      </motion.div>
    </div>
  );
}

function depthShadow(z: number): string {
  if (z <= 0) {
    return "0 6px 18px -8px rgba(31,60,122,0.10), 0 2px 6px rgba(31,60,122,0.04)";
  }
  const k = Math.min(1.4, z / 60);
  return [
    `0 ${(8 + k * 24).toFixed(0)}px ${(28 + k * 60).toFixed(0)}px -${(10 + k * 6).toFixed(0)}px rgba(31,60,122,${(0.10 + k * 0.16).toFixed(2)})`,
    `0 ${(2 + k * 8).toFixed(0)}px ${(6 + k * 14).toFixed(0)}px rgba(31,60,122,${(0.04 + k * 0.06).toFixed(2)})`,
    `inset 0 1px 0 rgba(255,255,255,${(0.45 + k * 0.2).toFixed(2)})`,
  ].join(", ");
}
