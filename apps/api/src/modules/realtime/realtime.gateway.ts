import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import type { Server, Socket } from "socket.io";

@WebSocketGateway({ cors: true, namespace: "realtime" })
export class RealtimeGateway implements OnGatewayConnection {
  @WebSocketServer()
  server!: Server;

  handleConnection(client: Socket): void {
    client.emit("connected", { ok: true, timestamp: new Date().toISOString() });
  }

  @SubscribeMessage("join-project")
  joinProject(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { projectId: string },
  ): void {
    client.join(payload.projectId);
    client.emit("joined", payload);
  }

  publishProjectMetric(projectId: string, metric: unknown): void {
    this.server.to(projectId).emit("metric", metric);
  }
}
