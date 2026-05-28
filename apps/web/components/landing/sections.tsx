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
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="glass rounded-[24px] p-5"
          >
            <feature.icon size={18} className="text-indigo-300" />
            <h3 className="mt-3 font-heading text-lg font-semibold">{feature.title}</h3>
            <p className="mt-2 text-sm text-white/65">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 grid gap-4 lg:grid-cols-2">
        <div className="glass rounded-[24px] p-6">
          <h3 className="font-heading text-xl font-semibold">CLI Workflow</h3>
          <pre className="mt-4 overflow-auto rounded-2xl border border-white/10 bg-black/30 p-4 font-mono text-xs text-white/80">
{`npx expo-audit scan\nexpo-audit bundle --json\nexpo-audit profile --platform ios\nexpo-audit upload --token $AUDIT_TOKEN`}
          </pre>
        </div>
        <div className="glass rounded-[24px] p-6">
          <h3 className="font-heading text-xl font-semibold">AI Recommendations Preview</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li>FlashList renderItem is recreated on each render; memoize callback.</li>
            <li>Analytics module adds 280KB to bundle; lazy load after first screen paint.</li>
            <li>Splash duration exceeds target by 640ms due to eager font and asset loading.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
