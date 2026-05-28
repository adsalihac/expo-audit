import { IsBoolean, IsOptional, IsString, Matches } from "class-validator";

export class CreateProjectDto {
  @IsString()
  name!: string;

  @IsString()
  @Matches(/^[a-z0-9-]+$/)
  slug!: string;

  @IsString()
  teamId!: string;

  @IsString()
  expoSdkVersion!: string;

  @IsBoolean()
  @IsOptional()
  hermesEnabled?: boolean;

  @IsOptional()
  @IsString()
  repoUrl?: string;
}
