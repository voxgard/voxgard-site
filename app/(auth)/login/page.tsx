import Link from "next/link";
import Logo from "../../components/Logo";
import GlowButton from "../../components/GlowButton";

export default function LoginPage() {
  return (
    <div className="vox-rise">
      <div className="flex justify-center">
        <Link href="/">
          <Logo size="md" />
        </Link>
      </div>

      <div className="vox-glass-strong relative mt-8 overflow-hidden rounded-3xl p-8 md:p-10">
        <div
          className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full blur-3xl"
          style={{
            background: "#A8C9F0",
            opacity: 0.55,
            animation: "vox-pulse-soft 7s ease-in-out infinite",
          }}
        />
        <div
          className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full blur-3xl"
          style={{
            background: "#C5BBED",
            opacity: 0.5,
            animation: "vox-pulse-soft 9s ease-in-out infinite",
          }}
        />

        <div className="relative">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--ink)]">
            Welcome back to <span className="vox-shimmer-text">Voxgard.</span>
          </h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Sign in to access your AI infrastructure workspace.
          </p>

          <form className="mt-8 grid gap-4">
            <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
              Work email
              <input
                type="email"
                placeholder="you@company.com"
                className="vox-input rounded-2xl px-4 py-3.5 text-sm tracking-normal normal-case"
              />
            </label>
            <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
              <span className="flex items-center justify-between">
                Password
                <Link
                  href="#"
                  className="text-[10px] font-normal normal-case tracking-normal text-[var(--brand-navy)] hover:underline"
                >
                  Forgot?
                </Link>
              </span>
              <input
                type="password"
                placeholder="••••••••"
                className="vox-input rounded-2xl px-4 py-3.5 text-sm tracking-normal normal-case"
              />
            </label>

            <label className="flex cursor-pointer items-center gap-2 text-xs text-[var(--muted)]">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-[var(--border)] bg-white/60 accent-[#9B8FE0]"
              />
              Keep me signed in for 30 days
            </label>

            <Link href="/dashboard" className="mt-2">
              <GlowButton fullWidth>Sign in</GlowButton>
            </Link>
          </form>

          <div className="my-7 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[var(--subtle)]">
            <span className="h-px flex-1 bg-[var(--border-soft)]" />
            or continue with
            <span className="h-px flex-1 bg-[var(--border-soft)]" />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <button className="vox-ease flex items-center justify-center gap-2 rounded-2xl border border-[var(--border-soft)] bg-white/70 py-3 text-sm text-[var(--ink-2)] transition hover:border-[var(--border)] hover:bg-white/95">
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path fill="#0F172A" d="M21.35 11.1H12v2.84h5.4c-.24 1.5-1.7 4.4-5.4 4.4-3.25 0-5.9-2.7-5.9-6s2.65-6 5.9-6c1.85 0 3.1.78 3.8 1.45l2.6-2.5C16.7 3.7 14.55 2.7 12 2.7 6.9 2.7 2.7 6.9 2.7 12s4.2 9.3 9.3 9.3c5.36 0 8.92-3.76 8.92-9.05 0-.6-.07-1.1-.17-1.6z"/>
              </svg>
              Google
            </button>
            <button className="vox-ease flex items-center justify-center gap-2 rounded-2xl border border-[var(--border-soft)] bg-white/70 py-3 text-sm text-[var(--ink-2)] transition hover:border-[var(--border)] hover:bg-white/95">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#0F172A">
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.25 3.35.95.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18.92-.26 1.9-.39 2.88-.4.98.01 1.96.14 2.88.4 2.18-1.49 3.14-1.18 3.14-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.06.78 2.13v3.16c0 .31.21.67.8.55C20.21 21.39 23.5 17.07 23.5 12 23.5 5.65 18.35.5 12 .5z"/>
              </svg>
              GitHub
            </button>
          </div>

          <p className="mt-7 text-center text-xs text-[var(--muted)]">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-[var(--brand-navy)] hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>

      <p className="mt-6 text-center text-[11px] text-[var(--subtle)]">
        Protected by enterprise-grade encryption.
      </p>
    </div>
  );
}
