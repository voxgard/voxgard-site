import Link from "next/link";
import Logo from "../../components/Logo";
import GlowButton from "../../components/GlowButton";

export default function RegisterPage() {
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
            background: "#C5BBED",
            opacity: 0.55,
            animation: "vox-pulse-soft 7s ease-in-out infinite",
          }}
        />
        <div
          className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full blur-3xl"
          style={{
            background: "#A8E0EA",
            opacity: 0.5,
            animation: "vox-pulse-soft 9s ease-in-out infinite",
          }}
        />

        <div className="relative">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--ink)]">
            Create your <span className="vox-shimmer-text">workspace.</span>
          </h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Start building AI voice, video and automation in minutes.
          </p>

          <form className="mt-8 grid gap-4">
            <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
              Full name
              <input
                type="text"
                placeholder="Jane Doe"
                className="vox-input rounded-2xl px-4 py-3.5 text-sm tracking-normal normal-case"
              />
            </label>
            <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
              Work email
              <input
                type="email"
                placeholder="you@company.com"
                className="vox-input rounded-2xl px-4 py-3.5 text-sm tracking-normal normal-case"
              />
            </label>
            <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
              Company
              <input
                type="text"
                placeholder="Acme Inc."
                className="vox-input rounded-2xl px-4 py-3.5 text-sm tracking-normal normal-case"
              />
            </label>
            <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
              Password
              <input
                type="password"
                placeholder="At least 12 characters"
                className="vox-input rounded-2xl px-4 py-3.5 text-sm tracking-normal normal-case"
              />
            </label>

            <label className="flex cursor-pointer items-start gap-2 text-xs text-[var(--muted)]">
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 rounded border-[var(--border)] bg-white/60 accent-[#9B8FE0]"
              />
              I agree to the{" "}
              <Link href="#" className="text-[var(--brand-navy)] hover:underline">
                Terms
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-[var(--brand-navy)] hover:underline">
                Privacy Policy
              </Link>
              .
            </label>

            <Link href="/dashboard" className="mt-2">
              <GlowButton fullWidth>Create account</GlowButton>
            </Link>
          </form>

          <p className="mt-7 text-center text-xs text-[var(--muted)]">
            Already a member?{" "}
            <Link href="/login" className="text-[var(--brand-navy)] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
