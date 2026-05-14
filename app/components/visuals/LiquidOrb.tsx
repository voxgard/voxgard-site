"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";
import type { Theme } from "../../themes";

/**
 * Reactive AI orb — themable.
 * Mouse tilt + specular highlight + waveform + orbiting dots.
 * Visual intensity scales with theme.orb.glow and palette.
 */
export default function LiquidOrb({
  theme,
  size = 480,
  showWaveform = true,
  showOrbits = true,
}: {
  theme: Theme;
  size?: number;
  showWaveform?: boolean;
  showOrbits?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const sx = useSpring(mx, { stiffness: 90, damping: 18, mass: 0.9 });
  const sy = useSpring(my, { stiffness: 90, damping: 18, mass: 0.9 });

  const tilt = 10 * theme.motion.parallaxStrength;
  const rotateX = useTransform(sy, [-1, 1], [tilt, -tilt]);
  const rotateY = useTransform(sx, [-1, 1], [-tilt - 2, tilt + 2]);

  const hx = useTransform(sx, [-1, 1], [25, 75]);
  const hy = useTransform(sy, [-1, 1], [20, 65]);

  const haloX = useTransform(sx, [-1, 1], [-18, 18]);
  const haloY = useTransform(sy, [-1, 1], [-14, 14]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / (window.innerWidth / 2);
      const dy = (e.clientY - cy) / (window.innerHeight / 2);
      mx.set(Math.max(-1, Math.min(1, dx)));
      my.set(Math.max(-1, Math.min(1, dy)));
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  const { palette, orb, isDark } = theme;
  const insetPct = `${orb.inset * 100}%`;

  // Halo & orb core color compositions vary by light/dark
  const haloGradient = isDark
    ? `radial-gradient(circle, ${palette.accent2}80, ${palette.accent3}55 40%, ${palette.accent1}30 65%, transparent 80%)`
    : `radial-gradient(circle, ${palette.accent1}73, ${palette.accent2}52 35%, ${palette.accent3}38 60%, transparent 78%)`;

  const coreGradient = isDark
    ? `radial-gradient(circle at 35% 30%, #FFFFFFCC, ${palette.accent3}AA 25%, ${palette.accent2}99 55%, ${palette.accent1}AA 80%, #0F1740 100%)`
    : `radial-gradient(circle at 35% 30%, #FFFFFFEE, #D6E4F7D9 30%, ${palette.accent1}B3 55%, ${palette.accent2}8C 78%, #6F80C48C 100%)`;

  const innerShadow = isDark
    ? "inset -40px -50px 80px rgba(0,0,0,0.55), inset 30px 40px 60px rgba(255,255,255,0.18), 0 30px 90px -10px rgba(129,140,248,0.45)"
    : "inset -40px -50px 80px rgba(31,60,122,0.18), inset 30px 40px 60px rgba(255,255,255,0.45), 0 30px 80px -20px rgba(31,60,122,0.32)";

  return (
    <div
      ref={ref}
      className="relative"
      style={{ width: size, height: size, perspective: 1400 }}
    >
      {/* Halo */}
      <motion.div
        className="pointer-events-none absolute inset-[-22%] rounded-full"
        style={{
          x: haloX,
          y: haloY,
          background: haloGradient,
          filter: "blur(60px)",
          opacity: orb.glow,
        }}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 3D-tilting sphere assembly */}
      <motion.div
        className="absolute inset-0"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {/* Outer ring 1 */}
        <motion.div
          className="absolute inset-[2%] rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{
            padding: 1,
            background: `conic-gradient(from 0deg, transparent 0deg, ${palette.accent1}A6 80deg, transparent 160deg, ${palette.accent2}A6 260deg, transparent 340deg)`,
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        {/* Outer ring 2 */}
        <motion.div
          className="absolute inset-[10%] rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
          style={{
            padding: 1,
            background: `conic-gradient(from 180deg, transparent 0deg, ${palette.accent3}A6 100deg, transparent 200deg, ${palette.accent2}A6 290deg, transparent 360deg)`,
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        {/* Inner glass orb */}
        <motion.div
          className="absolute rounded-full"
          style={{
            inset: insetPct,
            background: coreGradient,
            boxShadow: innerShadow,
            backdropFilter: "blur(8px)",
          }}
          animate={{ scale: [1, 1.025, 1] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Specular highlight */}
          <motion.div
            className="absolute h-[42%] w-[42%] rounded-full"
            style={{
              left: useTransform(hx, (v) => `${v - 21}%`),
              top: useTransform(hy, (v) => `${v - 21}%`),
              background:
                "radial-gradient(circle, rgba(255,255,255,0.95), rgba(255,255,255,0.5) 30%, transparent 65%)",
              filter: "blur(14px)",
              mixBlendMode: "screen",
            }}
          />
          <motion.div
            className="absolute h-3 w-3 rounded-full bg-white/90"
            style={{
              left: useTransform(hx, (v) => `${v - 1}%`),
              top: useTransform(hy, (v) => `${v - 1}%`),
              filter: "blur(2px)",
            }}
          />

          {showWaveform && <Waveform palette={palette} />}

          <div
            className="absolute rounded-full"
            style={{
              inset: "26%",
              border: "1px solid rgba(255,255,255,0.5)",
              boxShadow: `inset 0 0 30px ${palette.accent1}66`,
            }}
          />
        </motion.div>

        {showOrbits && <Orbits palette={palette} />}
      </motion.div>
    </div>
  );
}

function Waveform({ palette }: { palette: Theme["palette"] }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex h-1/3 items-center gap-1.5">
        {Array.from({ length: 11 }).map((_, i) => (
          <motion.span
            key={i}
            className="block w-1 rounded-full"
            style={{
              background: `linear-gradient(180deg, ${palette.navy} 0%, ${palette.accent1} 60%, ${palette.accent2} 100%)`,
            }}
            animate={{
              height: [
                "18%",
                `${30 + (i % 4) * 25}%`,
                "22%",
                `${40 + (i % 3) * 20}%`,
                "18%",
              ],
              opacity: [0.5, 0.95, 0.7, 0.95, 0.5],
            }}
            transition={{
              duration: 2.4 + (i % 5) * 0.35,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.08,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Orbits({ palette }: { palette: Theme["palette"] }) {
  const dots = [
    { color: palette.accent1, offset: 0,   speed: 28 },
    { color: palette.accent2, offset: 90,  speed: 32 },
    { color: palette.accent3, offset: 180, speed: 36 },
    { color: palette.navy,    offset: 270, speed: 40 },
  ];
  return (
    <>
      {dots.map((d, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          animate={{ rotate: [d.offset, d.offset + 360] }}
          transition={{ duration: d.speed, repeat: Infinity, ease: "linear" }}
        >
          <span
            className="absolute h-2.5 w-2.5 rounded-full"
            style={{
              top: 4,
              left: "50%",
              transform: "translateX(-50%)",
              background: d.color,
              boxShadow: `0 0 12px ${d.color}`,
            }}
          />
        </motion.div>
      ))}
    </>
  );
}
