import Link from "next/link";

const entries = [
  {
    version: "v0.4.0",
    date: "2026-05-29",
    notes: [
      "Added runtime FPS comparison panel and build activity timeline",
      "Improved Expo SDK diagnostics and doctor command output",
      "Added sample Expo app for CLI testing",
    ],
  },
  {
    version: "v0.3.0",
    date: "2026-05-27",
    notes: [
      "Added worker-based regression detection",
      "Added recommendation persistence and notification module",
      "Added CI performance gate workflow",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <header>
        <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Changelog</p>
        <h1 className="mt-2 font-heading text-4xl font-semibold text-slate-900">Product updates</h1>
      </header>

      <section className="mt-8 space-y-4">
        {entries.map((entry) => (
          <article key={entry.version} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-slate-900">{entry.version}</h2>
              <span className="text-xs text-slate-500">{entry.date}</span>
            </div>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-600">
              {entry.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <div className="mt-8">
        <Link href="/docs" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
          Read docs
        </Link>
      </div>
    </main>
  );
}
