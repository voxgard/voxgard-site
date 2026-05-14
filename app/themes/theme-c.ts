import type { Theme } from "./types";

/**
 * Vision C — Enterprise luxury.
 * Pure white, single navy accent, massive whitespace.
 */
export const themeC: Theme = {
  id: "c",
  name: "Enterprise luxury",
  scope: "theme-c",
  isDark: false,

  palette: {
    bg: "#FFFFFF",
    bgFrom: "#FFFFFF",
    bgVia: "#FAFAFA",
    bgTo: "#FFFFFF",

    ink: "#0A0A0A",
    body: "#1F1F1F",
    muted: "#525252",
    subtle: "#A3A3A3",

    border: "rgba(10, 10, 10, 0.07)",
    borderStrong: "rgba(10, 10, 10, 0.12)",

    glass: "rgba(255, 255, 255, 0.85)",
    glassStrong: "rgba(255, 255, 255, 0.96)",

    accent1: "#1E3A8A",
    accent2: "#1E3A8A",
    accent3: "#1E3A8A",
    navy: "#1E3A8A",

    success: "#0F766E",
  },

  motion: {
    ease: "cubic-bezier(0.32, 0.72, 0, 1)",
    blobDurationS: 40,
    parallaxStrength: 0.18,
  },

  surfaces: {
    cardRadiusPx: 4,
    glassBlurPx: 8,
    glassSaturate: 120,
  },

  particles: {
    count: 0,
    minSize: 0,
    maxSize: 0,
    opacityMax: 0,
  },

  orb: {
    inset: 0.22,
    glow: 0.45,
  },
};
