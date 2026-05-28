import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AuditsService } from "./audits.service.js";
import { CreateAuditDto } from "./dto/create-audit.dto.js";

@Controller("audits")
export class AuditsController {
  constructor(private readonly auditsService: AuditsService) {}

  @Post()
  create(@Body() dto: CreateAuditDto) {
    return this.auditsService.createAudit(dto);
  }

  @Get("project/:projectId")
  list(@Param("projectId") projectId: string) {
    return this.auditsService.listAudits(projectId);
  }
}
