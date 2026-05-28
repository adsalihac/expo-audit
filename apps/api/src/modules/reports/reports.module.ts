import { Module } from "@nestjs/common";
import { ReportsController } from "./reports.controller.js";
import { ReportsService } from "./reports.service.js";
import { PrismaService } from "../shared/prisma.service.js";

@Module({
  controllers: [ReportsController],
  providers: [ReportsService, PrismaService],
})
export class ReportsModule {}
