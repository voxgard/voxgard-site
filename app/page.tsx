export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-5xl font-bold mb-6 text-center">
        Voxgard
      </h1>

      <p className="text-xl text-gray-300 text-center max-w-2xl">
        AI Call Assistance & Video Analytics for Modern Businesses
      </p>

      <button className="mt-10 px-6 py-3 bg-white text-black rounded-xl text-lg font-semibold hover:bg-gray-200 transition">
        Get Started
      </button>
    </main>
  );
}