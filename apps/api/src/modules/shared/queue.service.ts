import { Injectable } from "@nestjs/common";
import { Queue } from "bullmq";
import { QueueNames, type AuditIngestJob } from "@expo-audit/queue";

@Injectable()
export class QueueService {
  private readonly redisUrl = new URL(process.env.REDIS_URL ?? "redis://localhost:6379");
  private readonly connection = {
    host: this.redisUrl.hostname,
    port: Number(this.redisUrl.port || 6379),
  };

  private readonly auditQueue = new Queue(QueueNames.auditIngest, {
    connection: this.connection,
    defaultJobOptions: {
      removeOnComplete: 100,
      removeOnFail: 1000,
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 1500,
      },
    },
  });

  async enqueueAudit(job: AuditIngestJob): Promise<void> {
    await this.auditQueue.add("audit-ingest", job);
  }
}
