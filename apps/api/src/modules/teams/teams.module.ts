import { Module } from "@nestjs/common";
import { TeamsController } from "./teams.controller.js";
import { TeamsService } from "./teams.service.js";
import { PrismaService } from "../shared/prisma.service.js";

@Module({
  controllers: [TeamsController],
  providers: [TeamsService, PrismaService],
  exports: [TeamsService],
})
export class TeamsModule {}
