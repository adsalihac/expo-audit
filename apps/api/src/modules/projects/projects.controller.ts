import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProjectsService } from "./projects.service.js";
import { CreateProjectDto } from "./dto/create-project.dto.js";

@Controller("projects")
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() dto: CreateProjectDto) {
    return this.projectsService.createProject(dto);
  }

  @Get()
  list() {
    return this.projectsService.listProjects();
  }
}
