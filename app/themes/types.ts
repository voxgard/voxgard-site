/**
 * Theme contract — every visual primitive reads from this shape.
 * Add a new visual direction by exporting a new Theme object.
 */
export type Theme = {
  id: "a" | "b" | "c";
  name: string;

  /** CSS class scope applied to the route layout wrapper. */
  scope: string;

  isDark: boolean;

  palette: {
    bg: string;
    bgFrom: string;
    bgVia: string;
    bgTo: string;

    ink: string;
    body: string;
    muted: string;
    subtle: string;

    border: string;
    borderStrong: string;

    glass: string;
    glassStrong: string;

    /** 3 brand accents used in gradients and orbs. */
    accent1: string;
    accent2: string;
    accent3: string;
    /** Reserved emphasis color (text-link, badges). */
    navy: string;

    /** Status colors. */
    success: string;
  };

  motion: {
    /** Apple-ease cubic-bezier as CSS string. */
    ease: string;
    blobDurationS: number;
    parallaxStrength: number;
  };

  surfaces: {
    cardRadiusPx: number;
    glassBlurPx: number;
    glassSaturate: number;
  };

  particles: {
    count: number;
    minSize: number;
    maxSize: number;
    opacityMax: number;
  };

  orb: {
    /** size of inner orb relative to outer (0..1). */
    inset: number;
    /** 0..1 — overall glow intensity. */
    glow: number;
  };
};
