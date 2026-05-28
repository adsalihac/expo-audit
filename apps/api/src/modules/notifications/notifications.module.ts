import { Module } from "@nestjs/common";
import { NotificationsController } from "./notifications.controller.js";
import { NotificationsService } from "./notifications.service.js";
import { PrismaService } from "../shared/prisma.service.js";

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService, PrismaService],
})
export class NotificationsModule {}
