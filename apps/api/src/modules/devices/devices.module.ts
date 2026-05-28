import { Module } from "@nestjs/common";
import { DevicesController } from "./devices.controller.js";
import { DevicesService } from "./devices.service.js";
import { PrismaService } from "../shared/prisma.service.js";

@Module({
  controllers: [DevicesController],
  providers: [DevicesService, PrismaService],
})
export class DevicesModule {}
