import { Controller, Get, Param } from "@nestjs/common";
import { AnalyticsService } from "./analytics.service.js";

@Controller("analytics")
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get("project/:projectId/overview")
  overview(@Param("projectId") projectId: string) {
    return this.analyticsService.getProjectOverview(projectId);
  }
}
