"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * VoiceOrb — large 3D-feel AI call sphere that reacts to cursor.
 * Built with Framer Motion springs for smooth Apple-like motion.
 */
export default function VoiceOrb({ size = 520 }: { size?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  // Raw mouse position relative to orb center (-1..1)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // Spring smoothing
  const sx = useSpring(mx, { stiffness: 90, damping: 18, mass: 0.9 });
  const sy = useSpring(my, { stiffness: 90, damping: 18, mass: 0.9 });

  // Tilt ranges
  const rotateX = useTransform(sy, [-1, 1], [10, -10]);
  const rotateY = useTransform(sx, [-1, 1], [-12, 12]);

  // Specular highlight follows cursor
  const hx = useTransform(sx, [-1, 1], [25, 75]);
  const hy = useTransform(sy, [-1, 1], [20, 65]);

  // Halo offset (parallax)
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

  return (
    <div
      ref={ref}
      className="relative"
      style={{ width: size, height: size, perspective: 1400 }}
    >
      {/* Outer halo — softly drifts with cursor */}
      <motion.div
        className="pointer-events-none absolute inset-[-22%] rounded-full"
        style={{
          x: haloX,
          y: haloY,
          background:
            "radial-gradient(circle, rgba(168,201,240,0.45), rgba(197,187,237,0.32) 35%, rgba(168,224,234,0.22) 60%, transparent 78%)",
          filter: "blur(60px)",
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
            background:
              "conic-gradient(from 0deg, transparent 0deg, rgba(111,168,232,0.55) 80deg, transparent 160deg, rgba(155,143,224,0.55) 260deg, transparent 340deg)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        {/* Outer ring 2 (counter-rotating) */}
        <motion.div
          className="absolute inset-[10%] rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
          style={{
            padding: 1,
            background:
              "conic-gradient(from 180deg, transparent 0deg, rgba(124,201,220,0.5) 100deg, transparent 200deg, rgba(181,160,229,0.5) 290deg, transparent 360deg)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        {/* Inner glass orb */}
        <motion.div
          className="absolute inset-[18%] rounded-full"
          animate={{ scale: [1, 1.025, 1] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.95), rgba(214,228,247,0.85) 30%, rgba(168,201,240,0.7) 55%, rgba(155,143,224,0.55) 78%, rgba(111,128,196,0.55) 100%)",
            boxShadow:
              "inset -40px -50px 80px rgba(31,60,122,0.18), inset 30px 40px 60px rgba(255,255,255,0.45), 0 30px 80px -20px rgba(31,60,122,0.32)",
            backdropFilter: "blur(8px)",
          }}
        >
          {/* Specular highlight (cursor-reactive) */}
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

          {/* Secondary tiny highlight */}
          <motion.div
            className="absolute h-3 w-3 rounded-full bg-white/90"
            style={{
              left: useTransform(hx, (v) => `${v - 1}%`),
              top: useTransform(hy, (v) => `${v - 1}%`),
              filter: "blur(2px)",
            }}
          />

          {/* Voice waveform inside the orb */}
          <Waveform />

          {/* Subtle inner ring */}
          <div
            className="absolute inset-[24%] rounded-full"
            style={{
              border: "1px solid rgba(255,255,255,0.5)",
              boxShadow: "inset 0 0 30px rgba(168,201,240,0.4)",
            }}
          />
        </motion.div>

        {/* Orbiting dots */}
        <Orbiting />
      </motion.div>

      {/* Floating outer particles (decorative) */}
      <Particles />
    </div>
  );
}

/* ───────── Waveform ───────── */
function Waveform() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex h-1/3 items-center gap-1.5">
        {Array.from({ length: 11 }).map((_, i) => (
          <motion.span
            key={i}
            className="block w-1 rounded-full"
            style={{
              background:
                "linear-gradient(180deg, #1E3A8A 0%, #6FA8E8 60%, #9B8FE0 100%)",
            }}
            animate={{
              height: ["18%", `${30 + (i % 4) * 25}%`, "22%", `${40 + (i % 3) * 20}%`, "18%"],
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

/* ───────── Orbiting dots ───────── */
function Orbiting() {
  const dots = [
    { delay: 0,   color: "#6FA8E8", offset: 0 },
    { delay: -8,  color: "#9B8FE0", offset: 90 },
    { delay: -14, color: "#7CC9DC", offset: 180 },
    { delay: -22, color: "#B5A0E5", offset: 270 },
  ];
  return (
    <>
      {dots.map((d, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          animate={{ rotate: [d.offset, d.offset + 360] }}
          transition={{ duration: 28 + i * 4, repeat: Infinity, ease: "linear" }}
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
      {/* Single small dot orbiting inner ring */}
      <motion.div
        className="absolute inset-[14%]"
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        <span
          className="absolute h-1.5 w-1.5 rounded-full"
          style={{
            bottom: 4,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#1E3A8A",
            boxShadow: "0 0 10px rgba(30,58,138,0.7)",
          }}
        />
      </motion.div>
    </>
  );
}

/* ───────── Floating particles around orb ───────── */
function Particles() {
  const [pts, setPts] = useState<
    Array<{ left: number; top: number; size: number; delay: number; dur: number; color: string }>
  >([]);

  useEffect(() => {
    const colors = ["#6FA8E8", "#9B8FE0", "#7CC9DC", "#B5A0E5"];
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only randomness for deco particles
    setPts(
      Array.from({ length: 14 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 3,
        delay: Math.random() * 6,
        dur: 6 + Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
      })),
    );
  }, []);

  return (
    <div className="pointer-events-none absolute inset-[-10%]">
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
            boxShadow: `0 0 10px ${p.color}aa`,
          }}
          animate={{
            y: [0, -18, 0],
            opacity: [0, 0.7, 0],
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
