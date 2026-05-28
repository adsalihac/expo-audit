import { Controller, Get, Param } from "@nestjs/common";
import { NotificationsService } from "./notifications.service.js";

@Controller("notifications")
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get("user/:userId")
  inbox(@Param("userId") userId: string) {
    return this.notificationsService.inbox(userId);
  }
}
