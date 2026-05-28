export const QueueNames = {
  auditIngest: "audit-ingest",
  reportGeneration: "report-generation",
  notifications: "notifications",
} as const;

export type QueueName = (typeof QueueNames)[keyof typeof QueueNames];

export interface AuditIngestJob {
  auditReportId: string;
  projectId: string;
}

export interface ReportGenerationJob {
  auditReportId: string;
  format: "pdf" | "summary";
}
