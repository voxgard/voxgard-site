import type { ReactNode } from "react";

export default function VisionBLayout({ children }: { children: ReactNode }) {
  return <div className="theme-b min-h-screen">{children}</div>;
}
