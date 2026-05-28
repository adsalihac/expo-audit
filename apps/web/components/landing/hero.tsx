"use client";

import { motion } from "framer-motion";
import { Sparkles, Zap, TerminalSquare } from "lucide-react";

export function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-20 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/75"
      >
        <Sparkles size={14} />
        Expo performance intelligence for modern teams
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="mt-8 max-w-4xl font-heading text-5xl font-semibold leading-tight tracking-tight sm:text-6xl"
      >
        Ship faster Expo apps with
        <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent"> automated performance audits</span>
      </motion.h1>
      <p className="mt-6 max-w-2xl text-lg text-white/70">
        Analyze startup, runtime FPS, bundle shape, OTA impact, and release regressions in one premium platform built for Expo teams.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button className="rounded-2xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:scale-[1.02]">Start Free Audit</button>
        <button className="rounded-2xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white/90 transition hover:border-indigo-300/50 hover:text-indigo-200">
          View Dashboard Demo
        </button>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Startup Regression", value: "-18%", icon: Zap },
          { label: "Bundle Delta", value: "-420KB", icon: TerminalSquare },
          { label: "Release Score", value: "92/100", icon: Sparkles },
        ].map((stat) => (
          <div key={stat.label} className="glass rounded-3xl p-4">
            <div className="text-xs uppercase tracking-wide text-white/50">{stat.label}</div>
            <div className="mt-2 flex items-center gap-2 font-mono text-2xl font-semibold">
              <stat.icon size={18} className="text-indigo-300" />
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
