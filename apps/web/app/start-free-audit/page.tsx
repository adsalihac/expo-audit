import Link from "next/link";

export default function StartFreeAuditPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-14">
      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Start Free Audit</p>
        <h1 className="mt-2 font-heading text-4xl font-semibold text-slate-900">Run your first Expo performance audit</h1>
        <p className="mt-4 text-slate-600">
          Connect your Expo project, run a baseline scan, and get actionable recommendations in minutes.
        </p>

        <ol className="mt-6 list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Install CLI: npx expo-audit scan</li>
          <li>Upload report to dashboard</li>
          <li>Review startup, bundle, and runtime recommendations</li>
        </ol>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/dashboard"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
          >
            Open Dashboard Demo
          </Link>
          <Link href="/docs" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:text-indigo-700">
            View Docs
          </Link>
        </div>
      </section>
    </main>
  );
}
