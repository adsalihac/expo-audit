import { Module } from "@nestjs/common";
import { RecommendationsController } from "./recommendations.controller.js";
import { RecommendationsService } from "./recommendations.service.js";
import { PrismaService } from "../shared/prisma.service.js";

@Module({
  controllers: [RecommendationsController],
  providers: [RecommendationsService, PrismaService],
})
export class RecommendationsModule {}
