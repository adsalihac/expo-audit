import { Injectable } from "@nestjs/common";
import { PrismaService } from "../shared/prisma.service.js";

@Injectable()
export class TeamsService {
  constructor(private readonly prisma: PrismaService) {}

  listTeams() {
    return this.prisma.client.team.findMany({
      include: {
        members: true,
        projects: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }
}
