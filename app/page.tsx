export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(120,120,120,0.15),transparent_40%)]" />

      <div className="absolute top-0 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />

      <header className="relative z-20 flex items-center justify-between border-b border-white/10 px-6 py-6 md:px-12">
        <div className="text-2xl font-bold tracking-[0.2em]">
          VOXGARD
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          <a href="#">Solutions</a>
          <a href="#">Technology</a>
          <a href="#">Analytics</a>
          <a href="#">Pricing</a>
          <a href="#">Contact</a>
        </nav>
      </header>

      <section className="relative z-10 flex flex-col items-center px-6 pt-28 text-center md:px-12">
        <div className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-gray-300 backdrop-blur-xl">
          AI Infrastructure for Modern Business
        </div>

        <h1 className="mt-10 max-w-6xl text-6xl font-bold leading-tight md:text-8xl">
          AI CALL CENTER
          <span className="block text-gray-500">
            & VIDEO ANALYTICS
          </span>
        </h1>

        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-gray-400 md:text-xl">
          Intelligent voice automation, real-time monitoring,
          AI infrastructure and enterprise automation systems
          built for scalable businesses.
        </p>

        <div className="mt-12 flex flex-col gap-4 md:flex-row">
          <button className="rounded-2xl bg-white px-8 py-4 font-semibold text-black transition hover:bg-gray-200">
            Schedule Demo
          </button>

          <button className="rounded-2xl border border-white/15 bg-white/5 px-8 py-4 backdrop-blur-xl transition hover:bg-white hover:text-black">
            Explore Platform
          </button>
        </div>

        <div className="mt-24 grid w-full max-w-6xl gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <div className="mb-4 text-sm text-gray-500">
              01
            </div>

            <h2 className="mb-4 text-2xl font-semibold">
              AI Voice Agents
            </h2>

            <p className="leading-relaxed text-gray-400">
              Human-like multilingual AI assistants with CRM integration,
              scheduling, automation and real-time workflows.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <div className="mb-4 text-sm text-gray-500">
              02
            </div>

            <h2 className="mb-4 text-2xl font-semibold">
              Smart Analytics
            </h2>

            <p className="leading-relaxed text-gray-400">
              AI-powered monitoring for warehouses, retail stores,
              construction sites and enterprise infrastructure.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <div className="mb-4 text-sm text-gray-500">
              03
            </div>

            <h2 className="mb-4 text-2xl font-semibold">
              Automation Systems
            </h2>

            <p className="leading-relaxed text-gray-400">
              Connect databases, notifications, AI decision making
              and operational workflows into one ecosystem.
            </p>
          </div>
        </div>

        <section className="mt-28 grid w-full max-w-6xl gap-6 rounded-[40px] border border-white/10 bg-white/5 p-10 backdrop-blur-2xl md:grid-cols-4">
          <div>
            <div className="text-5xl font-bold">
              24/7
            </div>

            <div className="mt-2 text-gray-400">
              AI Availability
            </div>
          </div>

          <div>
            <div className="text-5xl font-bold">
              99%
            </div>

            <div className="mt-2 text-gray-400">
              Automation Accuracy
            </div>
          </div>

          <div>
            <div className="text-5xl font-bold">
              50+
            </div>

            <div className="mt-2 text-gray-400">
              Integrations
            </div>
          </div>

          <div>
            <div className="text-5xl font-bold">
              AI
            </div>

            <div className="mt-2 text-gray-400">
              Powered Infrastructure
            </div>
          </div>
        </section>

        <footer className="mt-24 w-full border-t border-white/10 py-10 text-center text-sm text-gray-500">
          © 2026 Voxgard. AI Infrastructure & Automation Systems.
        </footer>
      </section>
    </main>
  );
}