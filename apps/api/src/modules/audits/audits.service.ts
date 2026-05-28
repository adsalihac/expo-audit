import { Injectable } from "@nestjs/common";
import { computeAuditScore } from "@expo-audit/analytics-engine";
import { analyzeExpoProject } from "@expo-audit/expo-intelligence";
import { synthesizeRecommendations } from "@expo-audit/ai-recommendations";
import { PrismaService } from "../shared/prisma.service.js";
import { QueueService } from "../shared/queue.service.js";
import { CreateAuditDto } from "./dto/create-audit.dto.js";

@Injectable()
export class AuditsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly queueService: QueueService,
  ) {}

  async createAudit(dto: CreateAuditDto) {
    const expoIssues = analyzeExpoProject({
      sdkVersion: dto.payload.expoSdkVersion,
      usesHermes: true,
      hasExpoRouter: true,
      hasUpdates: true,
      configPlugins: [],
      dependencies: dto.payload.bundle.largestPackages.map((p) => p.name),
    });

    const payloadWithExpoIssues = {
      ...dto.payload,
      issues: [...dto.payload.issues, ...expoIssues],
    };

    const score = computeAuditScore(payloadWithExpoIssues);
    const optimizationPlan = synthesizeRecommendations(payloadWithExpoIssues);

    const payloadJson = payloadWithExpoIssues as unknown as object;
    const issuesJson = payloadWithExpoIssues.issues as unknown as object;

    const audit = await this.prisma.client.auditReport.create({
      data: {
        projectId: dto.projectId,
        status: "PENDING",
        score: score.overall,
        payload: payloadJson,
        issues: issuesJson,
        summary: optimizationPlan.summary,
      },
    });

    await this.queueService.enqueueAudit({ auditReportId: audit.id, projectId: dto.projectId });

    return { auditId: audit.id, score, optimizationPlan };
  }

  listAudits(projectId: string) {
    return this.prisma.client.auditReport.findMany({
      where: { projectId },
      orderBy: { createdAt: "desc" },
      take: 30,
    });
  }
}
