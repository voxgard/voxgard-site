import type { ReactNode } from "react";
import Sidebar from "../components/Sidebar";
import MeshBackground from "../components/MeshBackground";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen text-[var(--ink)]">
      <MeshBackground variant="subtle" />
      <div className="relative z-10 flex">
        <Sidebar />
        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          {children}
        </div>
      </div>
    </div>
  );
}
