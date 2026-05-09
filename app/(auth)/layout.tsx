import type { ReactNode } from "react";
import MeshBackground from "../components/MeshBackground";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-6 py-12">
      <MeshBackground />
      <div className="relative z-10 w-full max-w-md">{children}</div>
    </div>
  );
}
