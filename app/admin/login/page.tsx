"use client";

import { useState, useTransition, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";

function LoginForm() {
  const [pw, setPw] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const params = useSearchParams();
  const from = params.get("from") || "/admin";

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const r = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });
      if (r.ok) {
        router.push(from);
        router.refresh();
      } else {
        setError("Invalid password");
      }
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(155,143,224,0.18), transparent 70%), #0B0F1A",
        }}
      />
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl"
      >
        <div className="mb-6 flex items-center gap-3 text-sm font-bold tracking-[0.28em]">
          <span
            className="inline-block h-2.5 w-2.5 rounded-sm"
            style={{
              background: "linear-gradient(135deg, #6FA8E8, #9B8FE0, #7CC9DC)",
              boxShadow: "0 0 18px rgba(155,143,224,0.55)",
            }}
          />
          VOXGARD · ADMIN
        </div>
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <p className="mt-1 text-sm text-white/60">
          Enter your admin password to continue.
        </p>

        <label className="mt-6 block text-xs uppercase tracking-[0.25em] text-white/50">
          Password
        </label>
        <input
          type="password"
          autoFocus
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-white outline-none transition focus:border-[#9B8FE0] focus:bg-white/10"
        />

        {error && (
          <div className="mt-3 rounded-lg border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={pending}
          className="mt-6 w-full rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-95 disabled:opacity-50"
          style={{
            background:
              "linear-gradient(135deg, #6FA8E8, #9B8FE0 55%, #7CC9DC)",
            boxShadow:
              "0 10px 24px -8px rgba(155,143,224,0.55), inset 0 1px 0 rgba(255,255,255,0.4)",
          }}
        >
          {pending ? "Signing in…" : "Sign in"}
        </button>

        <p className="mt-6 text-xs text-white/40">
          Set <code className="text-white/60">ADMIN_PASSWORD</code> in{" "}
          <code className="text-white/60">.env.local</code>. Default:{" "}
          <code className="text-white/60">voxgard</code>.
        </p>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
