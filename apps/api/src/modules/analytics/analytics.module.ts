import { Module } from "@nestjs/common";
import { AnalyticsController } from "./analytics.controller.js";
import { AnalyticsService } from "./analytics.service.js";
import { PrismaService } from "../shared/prisma.service.js";

@Module({
  controllers: [AnalyticsController],
  providers: [AnalyticsService, PrismaService],
})
export class AnalyticsModule {}
