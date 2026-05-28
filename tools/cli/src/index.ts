#!/usr/bin/env node
import fs from "node:fs";
import { Command } from "commander";
import path from "node:path";
import {
  analyzeBundle,
  printHeading,
  profileRuntime,
  runDoctor,
  scanExpoProject,
  uploadReport,
} from "@expo-audit/cli-core";

function resolveProjectPath(inputPath: string): string {
  const candidateFromCwd = path.resolve(process.cwd(), inputPath);
  if (fs.existsSync(candidateFromCwd)) {
    return candidateFromCwd;
  }

  const candidateFromInitCwd = process.env.INIT_CWD
    ? path.resolve(process.env.INIT_CWD, inputPath)
    : undefined;

  if (candidateFromInitCwd && fs.existsSync(candidateFromInitCwd)) {
    return candidateFromInitCwd;
  }

  const repoRootCandidate = path.resolve(process.cwd(), "..", "..", inputPath);
  if (fs.existsSync(repoRootCandidate)) {
    return repoRootCandidate;
  }

  return candidateFromCwd;
}

const program = new Command();

program.name("expo-audit").description("Expo app performance auditing CLI").version("0.1.0");

program
  .command("scan")
  .description("Scan Expo project metadata and dependencies")
  .option("-p, --path <path>", "Project path", process.cwd())
  .action(async (options: { path: string }) => {
    printHeading("Expo Project Scan");
    const projectPath = resolveProjectPath(options.path);
    const result = await scanExpoProject(projectPath);
    console.log(JSON.stringify(result, null, 2));
  });

program
  .command("bundle")
  .description("Analyze bundle characteristics and optimization opportunities")
  .option("-p, --path <path>", "Project path", process.cwd())
  .action(async (options: { path: string }) => {
    printHeading("Bundle Analysis");
    const projectPath = resolveProjectPath(options.path);
    const result = await analyzeBundle(projectPath);
    console.log(JSON.stringify(result, null, 2));
  });

program
  .command("profile")
  .description("Generate startup and runtime performance profile")
  .action(async () => {
    printHeading("Runtime Profile");
    const profile = await profileRuntime();
    console.log(JSON.stringify(profile, null, 2));
  });

program
  .command("doctor")
  .description("Run Expo-specific diagnostics and recommendations")
  .option("-p, --path <path>", "Project path", process.cwd())
  .action(async (options: { path: string }) => {
    printHeading("Expo Doctor");
    const projectPath = resolveProjectPath(options.path);
    const scan = await scanExpoProject(projectPath);
    const doctor = await runDoctor(scan);
    console.log(JSON.stringify(doctor, null, 2));
  });

program
  .command("upload")
  .description("Upload generated audit payload to cloud dashboard")
  .requiredOption("--project-id <projectId>", "Project id in cloud dashboard")
  .requiredOption("--token <token>", "API auth token")
  .requiredOption("--api-url <url>", "API base URL")
  .option("-p, --path <path>", "Project path", process.cwd())
  .action(
    async (options: { path: string; projectId: string; token: string; apiUrl: string }) => {
      printHeading("Upload Audit Report");
      const projectPath = resolveProjectPath(options.path);
      const scan = await scanExpoProject(projectPath);
      const bundle = await analyzeBundle(projectPath);
      const profile = await profileRuntime();

      const payload = {
        projectId: options.projectId,
        payload: {
          projectSlug: scan.projectRoot.split("/").at(-1),
          expoSdkVersion: scan.sdkVersion,
          platform: "prod-build",
          bundle,
          startup: {
            coldStartMs: profile.coldStartMs,
            timeToInteractiveMs: profile.timeToInteractiveMs,
            splashDurationMs: profile.splashDurationMs,
            jsExecutionMs: profile.jsExecutionMs,
            navigationInitMs: profile.navigationInitMs,
          },
          runtime: profile.runtime,
          issues: [],
        },
      };

      const response = await uploadReport(options.apiUrl, options.token, payload);
      console.log(JSON.stringify(response, null, 2));
    },
  );

program.parseAsync(process.argv);
