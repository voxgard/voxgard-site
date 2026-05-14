import type { ReactNode } from "react";

/**
 * Glass surface primitive for floating UI above the cinematic scene.
 * Combine with <DepthLayer/> for spatial Z-depth.
 *
 * Tones:
 *   - default — neutral glass
 *   - accent  — violet ring (call/AI primary)
 *   - deep    — navy ring (dashboard/CRM)
 */
export default function FloatingPanel({
  tone = "default",
  className = "",
  children,
}: {
  tone?: "default" | "accent" | "deep";
  className?: string;
  children: ReactNode;
}) {
  const ring =
    tone === "accent"
      ? "ring-1 ring-[rgba(155,143,224,0.32)]"
      : tone === "deep"
        ? "ring-1 ring-[rgba(31,60,122,0.18)]"
        : "ring-1 ring-white/55";

  return (
    <div
      className={`relative overflow-hidden rounded-2xl backdrop-blur-2xl ${ring} ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(140deg, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0.46) 60%, rgba(255,255,255,0.34) 100%)",
        WebkitBackdropFilter: "blur(28px) saturate(170%)",
        backdropFilter: "blur(28px) saturate(170%)",
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent"
      />
      {children}
    </div>
  );
}
