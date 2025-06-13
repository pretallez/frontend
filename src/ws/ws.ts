import { Client, Message } from "@stomp/stompjs";
import {
  WS_BROKER_URL,
  SUBSCRIBE_DESTINATION,
  PUBLISH_DESTINATION,
} from "@/libs/config";

export interface WSClientOptions {
  brokerUrl?: string;
  subscribeDestination?: string;
  publishDestination?: string;
  chatRoomId: number | string;
  onMessage?: (message: Message) => void;
}

export class WSClient {
  private client: Client;
  private subscribeDestination: string;
  private publishDestination: string;

  constructor(options: WSClientOptions) {
    this.subscribeDestination =
      options.subscribeDestination ?? SUBSCRIBE_DESTINATION(options.chatRoomId);
    this.publishDestination = options.publishDestination ?? PUBLISH_DESTINATION;
    this.client = new Client({
      brokerURL: options.brokerUrl ?? WS_BROKER_URL,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        this.client.subscribe(this.subscribeDestination, (msg) => {
          options.onMessage?.(msg);
        });
      },
    });
  }

  connect() {
    this.client.activate();
  }

  disconnect() {
    if (this.client.active) {
      this.client.deactivate();
    }
  }

  publish(body: any) {
    if (!this.client.active) {
      console.warn("WebSocket not connected. Activating...");
      this.connect();
    }
    this.client.publish({
      destination: this.publishDestination,
      body: JSON.stringify(body),
    });
  }
}
