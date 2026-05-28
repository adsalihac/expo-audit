import { IsObject, IsString } from "class-validator";
import type { AuditPayload } from "@expo-audit/types";

export class CreateAuditDto {
  @IsString()
  projectId!: string;

  @IsObject()
  payload!: AuditPayload;
}
