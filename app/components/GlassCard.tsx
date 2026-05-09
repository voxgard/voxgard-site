import type { ReactNode } from "react";

export default function GlassCard({
  children,
  className = "",
  glow = false,
}: {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div
      className={`vox-glass relative overflow-hidden rounded-2xl ${
        glow ? "vox-gradient-border" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
