import { Worker } from "bullmq";
import { QueueNames, type AuditIngestJob } from "@expo-audit/queue";
import { prisma } from "@expo-audit/database";
import { computeAuditScore, detectRegressions } from "@expo-audit/analytics-engine";
import { synthesizeRecommendations } from "@expo-audit/ai-recommendations";

const redisUrl = new URL(process.env.REDIS_URL ?? "redis://localhost:6379");
const connection = {
  host: redisUrl.hostname,
  port: Number(redisUrl.port || 6379),
};

const worker = new Worker<AuditIngestJob>(
  QueueNames.auditIngest,
  async (job) => {
    const audit = await prisma.auditReport.findUniqueOrThrow({
      where: { id: job.data.auditReportId },
      include: {
        project: true,
      },
    });

    const payload = audit.payload as any;
    const score = computeAuditScore(payload);

    const previous = await prisma.auditReport.findFirst({
      where: {
        projectId: audit.projectId,
        id: { not: audit.id },
      },
      orderBy: { createdAt: "desc" },
    });

    const regressions = previous
      ? detectRegressions(score, {
          bundle: Number((previous.payload as any)?.score?.bundle ?? score.bundle),
          startup: Number((previous.payload as any)?.score?.startup ?? score.startup),
          runtime: Number((previous.payload as any)?.score?.runtime ?? score.runtime),
          expoHealth: Number((previous.payload as any)?.score?.expoHealth ?? score.expoHealth),
          overall: Number(previous.score ?? score.overall),
        })
      : [];

    const plan = synthesizeRecommendations(payload);
    const mergedIssues = [...((payload.issues as unknown[]) ?? []), ...regressions] as unknown as object;
    const enrichedPayload = {
      ...payload,
      score,
      optimizationPlan: plan,
    } as unknown as object;

    await prisma.$transaction([
      prisma.auditReport.update({
        where: { id: audit.id },
        data: {
          status: "READY",
          score: score.overall,
          issues: mergedIssues,
          summary: plan.summary,
          payload: enrichedPayload,
        },
      }),
      prisma.recommendation.createMany({
        data: plan.priorityActions.map((action) => ({
          auditReportId: audit.id,
          severity: "medium",
          title: "AI Optimization Recommendation",
          rationale: action,
          actionItems: [action],
        })),
      }),
    ]);

    await prisma.notification.create({
      data: {
        auditReportId: audit.id,
        channel: "IN_APP",
        title: "Audit processing completed",
        message: `Audit ${audit.id} is ready with score ${score.overall}`,
      },
    });
  },
  { connection, concurrency: 10 },
);

worker.on("completed", (job) => {
  console.log(`[worker] completed job ${job.id}`);
});

worker.on("failed", (job, err) => {
  console.error(`[worker] failed job ${job?.id}`, err);
});

console.log("Expo Audit worker started");
