import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";
import { AuthModule } from "./auth/auth.module.js";
import { TeamsModule } from "./teams/teams.module.js";
import { ProjectsModule } from "./projects/projects.module.js";
import { AuditsModule } from "./audits/audits.module.js";
import { AnalyticsModule } from "./analytics/analytics.module.js";
import { RealtimeModule } from "./realtime/realtime.module.js";
import { BuildsModule } from "./builds/builds.module.js";
import { DevicesModule } from "./devices/devices.module.js";
import { ReportsModule } from "./reports/reports.module.js";
import { RecommendationsModule } from "./recommendations/recommendations.module.js";
import { NotificationsModule } from "./notifications/notifications.module.js";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 120 }]),
    AuthModule,
    TeamsModule,
    ProjectsModule,
    AuditsModule,
    AnalyticsModule,
    RealtimeModule,
    BuildsModule,
    DevicesModule,
    ReportsModule,
    RecommendationsModule,
    NotificationsModule,
  ],
})
export class AppModule {}
