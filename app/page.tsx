export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="flex flex-col items-center justify-center text-center px-6 py-32">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
          Voxgard
        </h1>

        <p className="mt-6 text-xl md:text-2xl text-gray-300 max-w-3xl">
          AI Call Assistance & Intelligent Video Analytics
          for Modern Businesses
        </p>

        <div className="mt-10 flex gap-4">
          <button className="bg-white text-black px-6 py-3 rounded-2xl font-semibold hover:bg-gray-200 transition">
            Book Demo
          </button>

          <button className="border border-white px-6 py-3 rounded-2xl hover:bg-white hover:text-black transition">
            Learn More
          </button>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6 px-6 pb-24 max-w-7xl mx-auto">
        <div className="border border-gray-800 rounded-3xl p-8 bg-zinc-900">
          <h2 className="text-2xl font-semibold mb-4">
            AI Call Center
          </h2>

          <p className="text-gray-400">
            24/7 AI voice assistants for inbound and outbound calls,
            appointment booking, CRM integration and automation.
          </p>
        </div>

        <div className="border border-gray-800 rounded-3xl p-8 bg-zinc-900">
          <h2 className="text-2xl font-semibold mb-4">
            Video Analytics
          </h2>

          <p className="text-gray-400">
            Real-time AI monitoring for stores, offices, warehouses
            and construction sites with smart alerts and insights.
          </p>
        </div>

        <div className="border border-gray-800 rounded-3xl p-8 bg-zinc-900">
          <h2 className="text-2xl font-semibold mb-4">
            Automation
          </h2>

          <p className="text-gray-400">
            Integrate workflows, CRM systems, scheduling,
            notifications and AI decision making.
          </p>
        </div>
      </section>
    </main>
  );
}