import { Injectable } from "@nestjs/common";
import { PrismaService } from "../shared/prisma.service.js";

@Injectable()
export class DevicesService {
  constructor(private readonly prisma: PrismaService) {}

  getBenchmarks(projectId: string) {
    return this.prisma.client.deviceBenchmark.findMany({
      where: { projectId },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
  }
}
