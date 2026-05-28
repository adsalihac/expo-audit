import { Injectable } from "@nestjs/common";
import { PrismaService } from "../shared/prisma.service.js";

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  inbox(userId: string) {
    return this.prisma.client.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
  }
}
