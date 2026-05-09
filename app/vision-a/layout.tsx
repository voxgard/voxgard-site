import type { ReactNode } from "react";

/**
 * Vision A — Apple cinematic light.
 * Uses the global :root tokens (already pearl/pastel).
 */
export default function VisionALayout({ children }: { children: ReactNode }) {
  return <div className="theme-a">{children}</div>;
}
