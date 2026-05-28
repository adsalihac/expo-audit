import { Injectable } from "@nestjs/common";
import { PrismaService } from "../shared/prisma.service.js";

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async getWeeklySummary(projectId: string) {
    const audits = await this.prisma.client.auditReport.findMany({
      where: { projectId },
      orderBy: { createdAt: "desc" },
      take: 7,
    });

    const typedAudits = audits as Array<{
      score: number | null;
      issues: Array<{ id?: string }> | null;
    }>;

    return {
      totalAudits: typedAudits.length,
      averageScore: typedAudits.length
        ? Math.round(typedAudits.reduce((sum, audit) => sum + (audit.score ?? 0), 0) / typedAudits.length)
        : 0,
      regressions: typedAudits.filter((audit) =>
        (audit.issues ?? []).some((issue) => issue.id?.includes("regression")),
      ).length,
    };
  }
}
