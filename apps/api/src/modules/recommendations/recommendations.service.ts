import { Injectable } from "@nestjs/common";
import { PrismaService } from "../shared/prisma.service.js";

@Injectable()
export class RecommendationsService {
  constructor(private readonly prisma: PrismaService) {}

  list(auditReportId: string) {
    return this.prisma.client.recommendation.findMany({
      where: { auditReportId },
      orderBy: { createdAt: "desc" },
    });
  }
}
