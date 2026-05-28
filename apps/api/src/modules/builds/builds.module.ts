import { Module } from "@nestjs/common";
import { BuildsController } from "./builds.controller.js";
import { BuildsService } from "./builds.service.js";
import { PrismaService } from "../shared/prisma.service.js";

@Module({
  controllers: [BuildsController],
  providers: [BuildsService, PrismaService],
})
export class BuildsModule {}
