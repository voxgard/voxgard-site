import type { Theme } from "./types";

/**
 * Vision A — Apple cinematic light.
 * Soft pearl, pastel orbs, calm motion.
 */
export const themeA: Theme = {
  id: "a",
  name: "Apple cinematic",
  scope: "theme-a",
  isDark: false,

  palette: {
    bg: "#FAFBFD",
    bgFrom: "#FAFBFD",
    bgVia: "#EEF3FA",
    bgTo: "#F4F6FB",

    ink: "#0F172A",
    body: "#334155",
    muted: "#64748B",
    subtle: "#94A3B8",

    border: "rgba(15, 23, 42, 0.08)",
    borderStrong: "rgba(15, 23, 42, 0.14)",

    glass: "rgba(255, 255, 255, 0.62)",
    glassStrong: "rgba(255, 255, 255, 0.82)",

    accent1: "#6FA8E8",
    accent2: "#9B8FE0",
    accent3: "#7CC9DC",
    navy: "#1E3A8A",

    success: "#10B981",
  },

  motion: {
    ease: "cubic-bezier(0.32, 0.72, 0, 1)",
    blobDurationS: 28,
    parallaxStrength: 0.4,
  },

  surfaces: {
    cardRadiusPx: 24,
    glassBlurPx: 28,
    glassSaturate: 160,
  },

  particles: {
    count: 14,
    minSize: 2,
    maxSize: 5,
    opacityMax: 0.7,
  },

  orb: {
    inset: 0.18,
    glow: 0.85,
  },
};
