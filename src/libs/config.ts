export const WS_BROKER_URL =
  process.env.NEXT_PUBLIC_WS_BROKER_URL || "ws://pretallez.xyz:8080/ws";
export const SUBSCRIBE_DESTINATION = (cid: number | string) =>
  process.env.NEXT_PUBLIC_SUBSCRIBE_DESTINATION || `/sub/chatrooms/${cid}`;

export const PUBLISH_DESTINATION =
  process.env.NEXT_PUBLIC_PUBLISH_DESTINATION || "/pub/v1/api/chats";
