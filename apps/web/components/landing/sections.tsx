"use client";

import { motion } from "framer-motion";
import { BarChart3, BrainCircuit, Gauge, GitPullRequest, ShieldCheck, Smartphone } from "lucide-react";

const features = [
  { title: "Automated Audits", description: "Continuous Expo SDK and runtime health checks.", icon: Gauge },
  { title: "Bundle Intelligence", description: "Detect heavy packages and duplicate dependencies.", icon: BarChart3 },
  { title: "Runtime Profiler", description: "Track JS/UI FPS, memory, CPU, and frame drops.", icon: Smartphone },
  { title: "AI Assistant", description: "Actionable, architecture-aware optimization plans.", icon: BrainCircuit },
  { title: "CI Performance Gates", description: "Fail PRs on startup or bundle regressions.", icon: GitPullRequest },
  { title: "Secure Team Platform", description: "RBAC, signed uploads, and audit logs by default.", icon: ShieldCheck },
];

export function LandingSections() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-20">
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Platform Capabilities</p>
          <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-slate-900">Everything needed for Expo performance operations</h2>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="dev-panel rounded-[22px] p-5"
          >
            <feature.icon size={18} className="text-indigo-500" />
            <h3 className="mt-3 font-heading text-lg font-semibold text-slate-900">{feature.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 grid gap-4 lg:grid-cols-2">
        <div className="dev-panel rounded-[24px] p-6">
          <h3 className="font-heading text-xl font-semibold text-slate-900">CLI Workflow</h3>
          <pre className="mt-4 overflow-auto rounded-2xl border border-slate-200 bg-slate-950 p-4 font-mono text-xs text-slate-100">
{`npx expo-audit scan\nexpo-audit bundle --json\nexpo-audit profile --platform ios\nexpo-audit upload --token $AUDIT_TOKEN`}
          </pre>
        </div>
        <div className="dev-panel rounded-[24px] p-6">
          <h3 className="font-heading text-xl font-semibold text-slate-900">AI Recommendations Preview</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>FlashList renderItem is recreated on each render; memoize callback.</li>
            <li>Analytics module adds 280KB to bundle; lazy load after first screen paint.</li>
            <li>Splash duration exceeds target by 640ms due to eager font and asset loading.</li>
          </ul>
        </div>
      </div>

      <div className="mt-12 rounded-2xl border border-slate-200 bg-white/80 p-6 backdrop-blur">
        <div className="grid gap-6 lg:grid-cols-[1.3fr,1fr] lg:items-center">
          <div>
            <h3 className="font-heading text-2xl font-semibold text-slate-900">Designed for performance-driven mobile teams</h3>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Block regressions in CI, benchmark by device tier, and ship predictable Expo releases with a tighter developer loop.
            </p>
          </div>
          <div className="space-y-2 text-sm text-slate-600">
            <p>Works with Expo Router, Hermes, Metro, EAS Build, and Expo Updates.</p>
            <p>Runs locally first, then scales to team dashboards and PR gates.</p>
            <p>AI recommendations stay actionable, short, and architecture-aware.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
