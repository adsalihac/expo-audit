import { Controller, Get, Param } from "@nestjs/common";
import { RecommendationsService } from "./recommendations.service.js";

@Controller("recommendations")
export class RecommendationsController {
  constructor(private readonly recommendationsService: RecommendationsService) {}

  @Get("audit/:auditReportId")
  list(@Param("auditReportId") auditReportId: string) {
    return this.recommendationsService.list(auditReportId);
  }
}
