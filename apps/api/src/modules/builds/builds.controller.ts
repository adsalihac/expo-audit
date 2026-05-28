import { Controller, Get, Param } from "@nestjs/common";
import { BuildsService } from "./builds.service.js";

@Controller("builds")
export class BuildsController {
  constructor(private readonly buildsService: BuildsService) {}

  @Get("project/:projectId")
  list(@Param("projectId") projectId: string) {
    return this.buildsService.getProjectBuilds(projectId);
  }
}
