import { Injectable } from "@nestjs/common";
import { PrismaService } from "../shared/prisma.service.js";
import { CreateProjectDto } from "./dto/create-project.dto.js";

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async createProject(input: CreateProjectDto) {
    return this.prisma.client.project.create({
      data: {
        teamId: input.teamId,
        name: input.name,
        slug: input.slug,
        expoSdkVersion: input.expoSdkVersion,
        repoUrl: input.repoUrl ?? null,
        hermesEnabled: input.hermesEnabled ?? true,
      },
    });
  }

  async listProjects() {
    return this.prisma.client.project.findMany({
      include: {
        auditReports: { take: 10, orderBy: { createdAt: "desc" } },
        builds: { take: 20, orderBy: { createdAt: "desc" } },
      },
      orderBy: { updatedAt: "desc" },
    });
  }
}
