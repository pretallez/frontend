import * as StompJs from "@stomp/stompjs";

export interface WSClientOptions {
  brokerUrl?: string;
  subscriptionDestination?: string;
  onMessage?: (message: StompJs.Message) => void;
}

export class WSClient {
  private client: StompJs.Client;

  constructor(options: WSClientOptions) {
    this.client = new StompJs.Client({
      brokerURL: options.brokerUrl || "ws://192.168.1.2:3000/ws",
      reconnectDelay: 5000,
      onConnect: () => {
        if (options.subscriptionDestination && options.onMessage) {
          this.client.subscribe(
            options.subscriptionDestination,
            options.onMessage
          );
        }
      },
    });
  }

  public activate() {
    this.client.activate();
  }

  /**
   * 메시지를 전송한다.
   * @param destination - 메시지 발행 대상 주소 (예: "/v1/api/chats")
   * @param body - 메시지 내용 (문자열 또는 객체)
   */
  public publish(destination: string, body: any) {
    this.client.publish({
      destination,
      body: typeof body === "string" ? body : JSON.stringify(body),
    });
  }

  public disconnect() {
    this.client.deactivate();
  }
}
