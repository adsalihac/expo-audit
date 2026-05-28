import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "$0",
    details: "Single project local audits and bundle checks",
  },
  {
    name: "Team",
    price: "$49",
    details: "CI gates, release dashboards, and collaboration",
  },
  {
    name: "Scale",
    price: "$199",
    details: "Enterprise controls, SSO, and priority support",
  },
];

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <header className="text-center">
        <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Pricing</p>
        <h1 className="mt-2 font-heading text-4xl font-semibold text-slate-900">Simple pricing for Expo performance teams</h1>
      </header>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <article key={plan.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">{plan.name}</h2>
            <p className="mt-2 font-heading text-4xl font-semibold text-slate-900">{plan.price}</p>
            <p className="mt-1 text-xs text-slate-500">per month</p>
            <p className="mt-4 text-sm text-slate-600">{plan.details}</p>
            <Link
              href="/start-free-audit"
              className="mt-6 inline-flex rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
            >
              Choose {plan.name}
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
