import { Controller, Get, Param } from "@nestjs/common";
import { ReportsService } from "./reports.service.js";

@Controller("reports")
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get("project/:projectId/weekly")
  weekly(@Param("projectId") projectId: string) {
    return this.reportsService.getWeeklySummary(projectId);
  }
}
