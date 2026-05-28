import semver from "semver";
import type { AuditIssue } from "@expo-audit/types";

interface ExpoProjectContext {
  sdkVersion: string;
  usesHermes: boolean;
  hasExpoRouter: boolean;
  hasUpdates: boolean;
  configPlugins: string[];
  dependencies: string[];
}

const knownHeavyPackages = ["moment", "lodash", "react-native-maps"];

export function analyzeExpoProject(context: ExpoProjectContext): AuditIssue[] {
  const issues: AuditIssue[] = [];

  if (semver.lt(semver.coerce(context.sdkVersion) ?? "0.0.0", "53.0.0")) {
    issues.push({
      id: "sdk-upgrade-warning",
      severity: "high",
      category: "expo",
      title: "Expo SDK is behind recommended version",
      impact: "You may miss Hermes, Metro and bundler performance improvements.",
      recommendation: "Plan upgrade to latest Expo SDK and validate plugin compatibility.",
    });
  }

  if (!context.usesHermes) {
    issues.push({
      id: "hermes-disabled",
      severity: "medium",
      category: "startup",
      title: "Hermes is not enabled",
      impact: "Startup and memory performance can degrade on low-end Android devices.",
      recommendation: "Enable Hermes in Expo app config for production builds.",
    });
  }

  if (!context.hasExpoRouter) {
    issues.push({
      id: "router-visibility",
      severity: "low",
      category: "expo",
      title: "Expo Router telemetry not detected",
      impact: "Navigation-level performance traces are less granular.",
      recommendation: "Integrate Expo Router instrumentation hooks for route-level metrics.",
    });
  }

  if (!context.hasUpdates) {
    issues.push({
      id: "updates-risk",
      severity: "medium",
      category: "expo",
      title: "Expo Updates configuration not detected",
      impact: "OTA release quality and payload controls may be limited.",
      recommendation: "Configure Expo Updates and enforce OTA bundle size thresholds.",
    });
  }

  if (context.configPlugins.length > 12) {
    issues.push({
      id: "plugin-overload",
      severity: "medium",
      category: "expo",
      title: "High config plugin count",
      impact: "Large native surface area increases build and maintenance risk.",
      recommendation: "Audit config plugins and remove non-essential native integrations.",
    });
  }

  for (const dep of context.dependencies) {
    if (knownHeavyPackages.includes(dep)) {
      issues.push({
        id: `heavy-${dep}`,
        severity: "medium",
        category: "bundle",
        title: `${dep} is a heavy dependency`,
        impact: `${dep} can significantly increase JS bundle size and startup cost.`,
        recommendation: "Evaluate lighter alternatives or isolate usage behind dynamic imports.",
      });
    }
  }

  return issues;
}
