import { Injectable } from "@nestjs/common";
import { PrismaService } from "../shared/prisma.service.js";

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async getProjectOverview(projectId: string) {
    const [audits, metrics, builds] = await Promise.all([
      this.prisma.client.auditReport.findMany({
        where: { projectId },
        orderBy: { createdAt: "desc" },
        take: 12,
      }),
      this.prisma.client.performanceMetric.findMany({
        where: { projectId },
        orderBy: { timestamp: "desc" },
        take: 120,
      }),
      this.prisma.client.build.findMany({
        where: { projectId },
        orderBy: { createdAt: "desc" },
        take: 20,
      }),
    ]);

    const typedAudits = audits as Array<{ score: number | null }>;

    return {
      audits,
      metrics,
      builds,
      healthIndex:
        typedAudits.length > 0
          ? Math.round(
              typedAudits.reduce((sum, audit) => sum + (audit.score ?? 0), 0) / typedAudits.length,
            )
          : 0,
    };
  }
}
