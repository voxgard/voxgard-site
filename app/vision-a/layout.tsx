import type { ReactNode } from "react";
import CinematicBackground from "../components/visuals/CinematicBackground";
import { theme } from "../data/theme";

// Force dynamic SSR so content edits in JSON files appear without rebuild.
export const dynamic = "force-dynamic";

/**
 * Vision A — Apple cinematic light.
 *
 * Two-layer architecture:
 *   1. CinematicBackground — single fixed scene
 *   2. .vox-stage — perspective container for foreground UI
 *
 * Theme tokens from data/theme.json injected as CSS variables — admin can
 * recolor brand without code edits.
 */
export default function VisionALayout({ children }: { children: ReactNode }) {
  const themeCss = `
    .theme-a {
      --brand-blue: ${theme.brandBlue};
      --brand-violet: ${theme.brandViolet};
      --brand-cyan: ${theme.brandCyan};
      --brand-pale-blue: ${theme.brandPaleBlue};
      --brand-soft-violet: ${theme.brandSoftViolet};
      --brand-sky-cyan: ${theme.brandSkyCyan};
      --brand-navy: ${theme.brandNavy};
    }
  `;
  return (
    <div className="theme-a relative">
      <style dangerouslySetInnerHTML={{ __html: themeCss }} />
      <CinematicBackground />
      <div className="vox-stage relative z-10">{children}</div>
    </div>
  );
}
