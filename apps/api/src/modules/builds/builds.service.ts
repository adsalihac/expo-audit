import { Injectable } from "@nestjs/common";
import { PrismaService } from "../shared/prisma.service.js";

@Injectable()
export class BuildsService {
  constructor(private readonly prisma: PrismaService) {}

  getProjectBuilds(projectId: string) {
    return this.prisma.client.build.findMany({
      where: { projectId },
      orderBy: { createdAt: "desc" },
      take: 30,
    });
  }
}
