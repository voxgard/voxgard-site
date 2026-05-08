export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-950 opacity-90" />

      <header className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-white/10">
        <h1 className="text-2xl font-bold tracking-wide">
          Voxgard
        </h1>

        <nav className="hidden md:flex gap-8 text-sm text-gray-300">
          <a href="#">Solutions</a>
          <a href="#">Technology</a>
          <a href="#">Pricing</a>
          <a href="#">Contact</a>
        </nav>
      </header>

      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-32 pb-24">
        <div className="mb-6 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm text-gray-300">
          AI Powered Business Infrastructure
        </div>

        <h2 className="text-6xl md:text-8xl font-bold max-w-5xl leading-tight">
          The Future of
          <span className="block text-gray-400">
            AI Automation
          </span>
        </h2>

        <p className="mt-8 max-w-3xl text-xl text-gray-400 leading-relaxed">
          AI voice assistants, intelligent video analytics,
          automation systems and business infrastructure
          built for modern companies.
        </p>

        <div className="mt-12 flex flex-col md:flex-row gap-4">
          <button className="px-8 py-4 rounded-2xl bg-white text-black font-semibold hover:bg-gray-200 transition">
            Book Demo
          </button>

          <button className="px-8 py-4 rounded-2xl border border-white/20 hover:bg-white hover:text-black transition">
            Explore Platform
          </button>
        </div>
      </section>

      <section className="relative z-10 grid md:grid-cols-3 gap-6 px-6 pb-24 max-w-7xl mx-auto">
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
          <div className="text-sm text-gray-400 mb-4">
            01
          </div>

          <h3 className="text-2xl font-semibold mb-4">
            AI Call Center
          </h3>

          <p className="text-gray-400 leading-relaxed">
            Natural AI voice agents with multilingual support,
            CRM integration, appointment scheduling and
            real-time automation.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
          <div className="text-sm text-gray-400 mb-4">
            02
          </div>

          <h3 className="text-2xl font-semibold mb-4">
            Video Intelligence
          </h3>

          <p className="text-gray-400 leading-relaxed">
            AI video analytics for stores, warehouses,
            construction sites and enterprise monitoring.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
          <div className="text-sm text-gray-400 mb-4">
            03
          </div>

          <h3 className="text-2xl font-semibold mb-4">
            Automation Layer
          </h3>

          <p className="text-gray-400 leading-relaxed">
            Connect AI systems, workflows, notifications,
            databases and business logic into one platform.
          </p>
        </div>
      </section>
    </main>
  );
}