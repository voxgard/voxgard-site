import type { Theme } from "./types";

/**
 * Vision B — Holographic AI OS.
 * Deep midnight base with iridescent floating glass.
 */
export const themeB: Theme = {
  id: "b",
  name: "Holographic AI OS",
  scope: "theme-b",
  isDark: true,

  palette: {
    bg: "#070A1A",
    bgFrom: "#070A1A",
    bgVia: "#0E1330",
    bgTo: "#0A0F25",

    ink: "#F8FAFC",
    body: "#CBD5E1",
    muted: "#94A3B8",
    subtle: "#64748B",

    border: "rgba(255, 255, 255, 0.08)",
    borderStrong: "rgba(255, 255, 255, 0.16)",

    glass: "rgba(255, 255, 255, 0.04)",
    glassStrong: "rgba(255, 255, 255, 0.08)",

    accent1: "#5EEAD4",
    accent2: "#818CF8",
    accent3: "#F0ABFC",
    navy: "#A5B4FC",

    success: "#34D399",
  },

  motion: {
    ease: "cubic-bezier(0.16, 1, 0.3, 1)",
    blobDurationS: 22,
    parallaxStrength: 0.65,
  },

  surfaces: {
    cardRadiusPx: 22,
    glassBlurPx: 36,
    glassSaturate: 180,
  },

  particles: {
    count: 26,
    minSize: 1.5,
    maxSize: 3.5,
    opacityMax: 0.85,
  },

  orb: {
    inset: 0.14,
    glow: 1,
  },
};
