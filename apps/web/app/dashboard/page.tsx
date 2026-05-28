import { DashboardOverview } from "../../components/dashboard/overview";
import { Sidebar } from "../../components/dashboard/sidebar";

export default function DashboardPage() {
  return (
    <main className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 py-6 lg:grid-cols-[auto,1fr]">
      <Sidebar />
      <section className="min-w-0">
        <header className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/80 p-4 backdrop-blur">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Developer Dashboard</p>
            <h1 className="mt-1 font-heading text-3xl font-semibold text-slate-900">Project Performance Dashboard</h1>
            <p className="text-sm text-slate-600">Realtime audit intelligence, release health, and Expo-specific recommendations.</p>
          </div>
          <button className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 hover:border-indigo-300 hover:text-indigo-700">Run New Audit</button>
        </header>
        <DashboardOverview />
      </section>
    </main>
  );
}
