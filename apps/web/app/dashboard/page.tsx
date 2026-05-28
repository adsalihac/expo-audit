import { DashboardOverview } from "../../components/dashboard/overview";
import { Sidebar } from "../../components/dashboard/sidebar";

export default function DashboardPage() {
  return (
    <main className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 py-6 lg:grid-cols-[auto,1fr]">
      <Sidebar />
      <section className="min-w-0">
        <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-heading text-3xl font-semibold">Project Performance Dashboard</h1>
            <p className="text-sm text-white/65">Realtime audit intelligence, release health, and Expo-specific recommendations.</p>
          </div>
          <button className="rounded-xl border border-white/15 px-4 py-2 text-sm hover:border-indigo-300/60">Run New Audit</button>
        </header>
        <DashboardOverview />
      </section>
    </main>
  );
}
