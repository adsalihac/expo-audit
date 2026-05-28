import type { AuditIssue, AuditPayload } from "@expo-audit/types";

export interface AiOptimizationPlan {
  summary: string;
  priorityActions: string[];
  architectureRisks: string[];
}

export function synthesizeRecommendations(payload: AuditPayload): AiOptimizationPlan {
  const priorityActions: string[] = [];
  const architectureRisks: string[] = [];

  if (payload.bundle.totalSizeKb > 3000) {
    priorityActions.push("Reduce JS bundle size by replacing heavy dependencies and enabling chunk splitting.");
  }

  if (payload.startup.timeToInteractiveMs > 3000) {
    priorityActions.push("Defer non-critical app initialization to post-interactive phase.");
  }

  const lowFpsSamples = payload.runtime.filter((m) => m.jsFps < 50 || m.uiFps < 50).length;
  if (lowFpsSamples > 3) {
    priorityActions.push("Profile expensive screens and optimize heavy component trees using memoization.");
  }

  const expoIssues = payload.issues.filter((issue) => issue.category === "expo");
  if (expoIssues.length > 0) {
    architectureRisks.push("Expo configuration drift may impact OTA safety and release stability.");
  }

  const rerenderIssue = payload.issues.find((issue: AuditIssue) => issue.title.toLowerCase().includes("re-render"));
  if (rerenderIssue) {
    priorityActions.push("Stabilize render paths with React.memo, useCallback, and selector-based state reads.");
  }

  return {
    summary: "Optimization plan generated from bundle, startup, runtime, and Expo platform signals.",
    priorityActions,
    architectureRisks,
  };
}
