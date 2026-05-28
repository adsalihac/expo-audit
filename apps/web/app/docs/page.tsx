import Link from "next/link";

export default function DocsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Documentation</p>
        <h1 className="mt-2 font-heading text-4xl font-semibold text-slate-900">Expo App Performance Auditor Docs</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Learn how to run audits, interpret scores, and set CI performance gates for Expo applications.
        </p>
      </header>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        {[
          ["Quick Start", "Install, run infrastructure, and execute first audit"],
          ["CLI Commands", "scan, bundle, profile, doctor, upload usage"],
          ["CI Gate Setup", "Fail pull requests on regressions"],
          ["Dashboard Guide", "Score trends, runtime charts, recommendations"],
        ].map(([title, desc]) => (
          <article key={title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-semibold text-slate-900">{title}</h2>
            <p className="mt-2 text-sm text-slate-600">{desc}</p>
          </article>
        ))}
      </section>

      <div className="mt-8">
        <Link href="/" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
          Back to home
        </Link>
      </div>
    </main>
  );
}
