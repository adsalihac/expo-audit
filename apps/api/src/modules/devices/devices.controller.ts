import { Controller, Get, Param } from "@nestjs/common";
import { DevicesService } from "./devices.service.js";

@Controller("devices")
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Get("project/:projectId/benchmarks")
  list(@Param("projectId") projectId: string) {
    return this.devicesService.getBenchmarks(projectId);
  }
}
