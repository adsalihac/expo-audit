"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, TerminalSquare, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-20 pt-10">
      <header className="mb-10 flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-xs text-white/65 backdrop-blur">
        <div className="font-medium tracking-wide text-white/85">Expo App Performance Auditor</div>
        <div className="hidden items-center gap-5 sm:flex">
          <span>Docs</span>
          <span>Pricing</span>
          <span>Changelog</span>
          <span className="rounded-full border border-white/15 px-3 py-1">Status: Online</span>
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr] lg:items-start">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs text-white/80"
          >
            <Sparkles size={14} />
            Performance Intelligence Built for Expo Teams
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-8 max-w-4xl font-heading text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl"
          >
            Developer-grade audits with
            <span className="bg-gradient-to-r from-indigo-300 via-blue-300 to-cyan-200 bg-clip-text text-transparent"> release-safe performance gates</span>
          </motion.h1>

          <p className="mt-6 max-w-2xl text-lg text-white/70">
            Track startup cost, JS/UI FPS, bundle drift, and Expo upgrade risk in one interface that feels like your favorite engineering tools.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <button className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:translate-y-[-1px]">
              Start Free Audit
              <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
            </button>
            <button className="rounded-xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white/90 transition hover:border-indigo-300/50 hover:text-indigo-200">
              Open Dashboard Demo
            </button>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {[
              { label: "Startup Regression", value: "-18%", icon: Zap },
              { label: "Bundle Delta", value: "-420KB", icon: TerminalSquare },
              { label: "Release Score", value: "92/100", icon: Sparkles },
            ].map((stat) => (
              <div key={stat.label} className="metric-chip rounded-2xl p-4">
                <div className="text-[11px] uppercase tracking-[0.14em] text-white/50">{stat.label}</div>
                <div className="mt-2 flex items-center gap-2 font-mono text-2xl font-semibold">
                  <stat.icon size={18} className="text-indigo-200" />
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="dev-panel rounded-3xl p-5"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm font-medium text-white/85">CI Performance Gate</div>
            <span className="rounded-full border border-emerald-300/40 bg-emerald-300/10 px-2 py-0.5 text-[11px] text-emerald-200">PASS</span>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#07080f] p-4 font-mono text-xs text-white/80">
            <div className="mb-2 text-white/50">github-actions / performance-gate</div>
            <div className="space-y-1">
              <div>bundle_delta_kb = -420</div>
              <div>cold_start_delta_ms = -180</div>
              <div>fps_regressions = 0</div>
              <div>audit_score = 92</div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
              <div className="text-white/55">Android Low-end</div>
              <div className="mt-1 font-mono text-lg text-white">56 FPS</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
              <div className="text-white/55">iOS Mid-tier</div>
              <div className="mt-1 font-mono text-lg text-white">60 FPS</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
