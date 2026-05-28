import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService) {}

  verifyApiToken(token?: string): { sub: string; teamIds: string[] } {
    if (!token) {
      throw new UnauthorizedException("Missing API token");
    }
    return this.jwt.verify(token.replace("Bearer ", "")) as { sub: string; teamIds: string[] };
  }
}
