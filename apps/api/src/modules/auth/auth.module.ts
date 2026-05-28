import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service.js";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.AUTH_SECRET ?? "local-dev-secret",
      signOptions: { expiresIn: "1h" },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
