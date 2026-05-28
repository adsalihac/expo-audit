import { Module } from "@nestjs/common";
import { AuditsController } from "./audits.controller.js";
import { AuditsService } from "./audits.service.js";
import { PrismaService } from "../shared/prisma.service.js";
import { QueueService } from "../shared/queue.service.js";

@Module({
  controllers: [AuditsController],
  providers: [AuditsService, PrismaService, QueueService],
  exports: [AuditsService],
})
export class AuditsModule {}
