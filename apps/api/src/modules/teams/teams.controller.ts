import { Controller, Get } from "@nestjs/common";
import { TeamsService } from "./teams.service.js";

@Controller("teams")
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  getTeams() {
    return this.teamsService.listTeams();
  }
}
