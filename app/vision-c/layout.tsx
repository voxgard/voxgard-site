import type { ReactNode } from "react";

export default function VisionCLayout({ children }: { children: ReactNode }) {
  return <div className="theme-c min-h-screen">{children}</div>;
}
