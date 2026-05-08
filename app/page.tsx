export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(120,120,120,0.18),transparent_42%)]" />
      <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />

      <header className="relative z-20 flex items-center justify-between border-b border-white/10 px-6 py-6 md:px-12">
        <div className="text-2xl font-bold tracking-[0.2em]">VOXGARD</div>

        <nav className="hidden items-center gap-8 text-sm text-gray-300 md:flex">
          <a href="#">Solutions</a>
          <a href="#">Technology</a>
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
          <span className="block text-gray-500">& VIDEO ANALYTICS</span>
        </h1>

        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-gray-400 md:text-xl">
          Intelligent voice automation, real-time monitoring, AI infrastructure
          and automation systems built for scalable businesses.
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
          {[
            ["01", "AI Voice Agents", "Human-like multilingual AI assistants with CRM integration, scheduling and real-time workflows."],
            ["02", "Video Intelligence", "AI-powered monitoring for warehouses, retail stores, construction sites and enterprise operations."],
            ["03", "Automation Systems", "Connect databases, notifications, AI decision making and workflows into one ecosystem."],
          ].map(([number, title, text]) => (
            <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-8 text-left backdrop-blur-xl">
              <div className="mb-4 text-sm text-gray-500">{number}</div>
              <h2 className="mb-4 text-2xl font-semibold">{title}</h2>
              <p className="leading-relaxed text-gray-400">{text}</p>
            </div>
          ))}
        </div>

        <section className="mt-28 grid w-full max-w-6xl gap-6 rounded-[40px] border border-white/10 bg-white/5 p-10 backdrop-blur-2xl md:grid-cols-4">
          {[
            ["24/7", "AI Availability"],
            ["99%", "Automation Accuracy"],
            ["50+", "Integrations"],
            ["AI", "Powered Infrastructure"],
          ].map(([value, label]) => (
            <div key={label}>
              <div className="text-5xl font-bold">{value}</div>
              <div className="mt-2 text-gray-400">{label}</div>
            </div>
          ))}
        </section>

        <section className="mt-28 w-full max-w-6xl text-left">
          <h2 className="text-center text-4xl font-bold md:text-6xl">
            Simple Plans for Growing Businesses
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              ["Starter", "$499/mo", "For small businesses starting with AI calls."],
              ["Growth", "$999/mo", "For companies that need CRM and automation."],
              ["Enterprise", "Custom", "For call center, video analytics and custom AI systems."],
            ].map(([plan, price, description]) => (
              <div key={plan} className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                <h3 className="text-2xl font-semibold">{plan}</h3>
                <div className="mt-6 text-4xl font-bold">{price}</div>
                <p className="mt-6 leading-relaxed text-gray-400">{description}</p>
                <button className="mt-8 w-full rounded-2xl bg-white px-6 py-4 font-semibold text-black transition hover:bg-gray-200">
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-28 w-full max-w-4xl rounded-[40px] border border-white/10 bg-white/5 p-10 text-center backdrop-blur-2xl">
          <h2 className="text-4xl font-bold md:text-5xl">
            Ready to automate your business?
          </h2>

          <p className="mt-6 text-gray-400">
            Build an AI call center, connect your CRM, monitor operations
            and automate customer communication.
          </p>

          <button className="mt-10 rounded-2xl bg-white px-8 py-4 font-semibold text-black transition hover:bg-gray-200">
            Contact Voxgard
          </button>
        </section>

        <footer className="mt-24 w-full border-t border-white/10 py-10 text-center text-sm text-gray-500">
          © 2026 Voxgard. AI Infrastructure & Automation Systems.
        </footer>
      </section>
    </main>
  );
}