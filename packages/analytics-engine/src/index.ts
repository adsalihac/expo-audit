import type { AuditIssue, AuditPayload, AuditScoreBreakdown } from "@expo-audit/types";

const clamp = (value: number, min = 0, max = 100): number => Math.max(min, Math.min(max, value));

export function computeAuditScore(payload: AuditPayload): AuditScoreBreakdown {
  const bundlePenalty = payload.bundle.totalSizeKb > 3500 ? 25 : payload.bundle.totalSizeKb > 2500 ? 12 : 4;
  const duplicatePenalty = Math.min(payload.bundle.duplicateDeps.length * 2, 18);
  const startupPenalty = payload.startup.coldStartMs > 3500 ? 30 : payload.startup.coldStartMs > 2500 ? 16 : 6;
  const ttiPenalty = payload.startup.timeToInteractiveMs > 4200 ? 24 : payload.startup.timeToInteractiveMs > 3000 ? 12 : 4;

  const avgJsFps = payload.runtime.reduce((sum, m) => sum + m.jsFps, 0) / Math.max(payload.runtime.length, 1);
  const avgUiFps = payload.runtime.reduce((sum, m) => sum + m.uiFps, 0) / Math.max(payload.runtime.length, 1);
  const runtimePenalty = avgJsFps < 50 || avgUiFps < 50 ? 25 : avgJsFps < 55 || avgUiFps < 55 ? 14 : 5;

  const criticalIssues = payload.issues.filter((issue) => issue.severity === "critical").length;
  const highIssues = payload.issues.filter((issue) => issue.severity === "high").length;
  const expoPenalty = criticalIssues * 10 + highIssues * 4;

  const bundle = clamp(100 - bundlePenalty - duplicatePenalty);
  const startup = clamp(100 - startupPenalty - ttiPenalty);
  const runtime = clamp(100 - runtimePenalty);
  const expoHealth = clamp(100 - expoPenalty);

  return {
    bundle,
    startup,
    runtime,
    expoHealth,
    overall: clamp(Math.round(bundle * 0.25 + startup * 0.3 + runtime * 0.25 + expoHealth * 0.2)),
  };
}

export function detectRegressions(current: AuditScoreBreakdown, baseline: AuditScoreBreakdown): AuditIssue[] {
  const regressions: AuditIssue[] = [];

  if (current.overall < baseline.overall - 5) {
    regressions.push({
      id: "overall-regression",
      severity: "high",
      category: "architecture",
      title: "Overall performance regression detected",
      impact: `Score dropped from ${baseline.overall} to ${current.overall}`,
      recommendation: "Block release and inspect bundle/startup deltas before merge.",
    });
  }

  if (current.bundle < baseline.bundle - 8) {
    regressions.push({
      id: "bundle-regression",
      severity: "high",
      category: "bundle",
      title: "Bundle quality regressed",
      impact: `Bundle score dropped from ${baseline.bundle} to ${current.bundle}`,
      recommendation: "Investigate large package additions and duplicate dependencies.",
    });
  }

  if (current.startup < baseline.startup - 8) {
    regressions.push({
      id: "startup-regression",
      severity: "critical",
      category: "startup",
      title: "Startup performance regressed",
      impact: `Startup score dropped from ${baseline.startup} to ${current.startup}`,
      recommendation: "Profile app initialization and defer non-critical modules.",
    });
  }

  return regressions;
}
