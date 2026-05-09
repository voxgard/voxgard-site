import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost" | "danger";

type Props = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  fullWidth?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function GlowButton({
  children,
  variant = "primary",
  className = "",
  fullWidth = false,
  ...rest
}: Props) {
  const width = fullWidth ? "w-full" : "";

  if (variant === "ghost") {
    return (
      <button
        {...rest}
        className={`vox-ease rounded-full border border-[var(--border)] bg-white/70 px-6 py-3 text-sm font-medium text-[var(--ink-2)] backdrop-blur-xl transition hover:border-[var(--border-strong)] hover:bg-white/90 hover:shadow-[var(--shadow-soft)] ${width} ${className}`}
      >
        {children}
      </button>
    );
  }

  if (variant === "danger") {
    return (
      <button
        {...rest}
        className={`vox-ease rounded-full border border-rose-300/60 bg-rose-50/80 px-6 py-3 text-sm font-medium text-rose-700 transition hover:border-rose-400/80 hover:bg-rose-100/90 ${width} ${className}`}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      {...rest}
      className={`vox-btn-soft inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold ${width} ${className}`}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}
