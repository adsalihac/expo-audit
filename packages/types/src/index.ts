export type PlatformTarget = "android" | "ios" | "expo-go" | "dev-build" | "prod-build";

export interface BundleMetric {
  totalSizeKb: number;
  duplicateDeps: string[];
  largestPackages: Array<{ name: string; sizeKb: number }>;
  assetWarnings: string[];
}

export interface StartupMetric {
  coldStartMs: number;
  timeToInteractiveMs: number;
  splashDurationMs: number;
  jsExecutionMs: number;
  navigationInitMs: number;
}

export interface RuntimeMetric {
  jsFps: number;
  uiFps: number;
  memoryMb: number;
  cpuPercent: number;
  droppedFrames: number;
  timestamp: string;
}

export interface AuditIssue {
  id: string;
  severity: "low" | "medium" | "high" | "critical";
  category: "bundle" | "startup" | "runtime" | "expo" | "architecture";
  title: string;
  impact: string;
  recommendation: string;
  docsUrl?: string;
}

export interface AuditScoreBreakdown {
  bundle: number;
  startup: number;
  runtime: number;
  expoHealth: number;
  overall: number;
}

export interface AuditPayload {
  projectSlug: string;
  expoSdkVersion: string;
  platform: PlatformTarget;
  bundle: BundleMetric;
  startup: StartupMetric;
  runtime: RuntimeMetric[];
  issues: AuditIssue[];
}
