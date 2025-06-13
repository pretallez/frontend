"use client";
import { MouseEventHandler, useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { WSClient } from "@/ws/ws";

import Header from "@/components/header/header";
import ChatroomListItem from "@/components/chat/chatroom-list-item";
import ChatRoomMenu from "@/components/chat/chatroom-menu";
import ChatItem, { ChatItemProps } from "@/components/chat/chat-item";
import { Button } from "@/components/ui/button";
import { Menu, Send, Smile, ChevronLeft } from "lucide-react";
import styles from "@/styles/chat.module.scss";

type Params = { cid: string };

const CHAT_LIMIT = 5000;
const CHAT_COUNT = 3;
const TEXTAREA_HEIGHT = 42;

export default function Chat() {
  const { cid } = useParams<Params>();
  const [msg, setMsg] = useState<string>("");
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [chatList, setChatList] = useState<ChatItemProps[]>([]);
  const [chatRoomList] = useState<any[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [responsive, setResponsive] = useState<"left" | "right">("right");
  const [chatCount, setChatCount] = useState<number>(0);
  const wsClientRef = useRef<WSClient | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 웹소켓 구독 및 발행 설정
  useEffect(() => {
    if (!cid) return;

    // 이전 클라이언트 연결 해제
    wsClientRef.current?.disconnect();

    console.log(`[Chat] Connecting to room ${cid}`);
    const wsClient = new WSClient({
      brokerUrl: "ws://pretallez.xyz:8080/ws",
      subscriptionDestination: `/sub/chatrooms/${1}`,
      onMessage: (message) => {
        console.log("[Chat] Received message:", message.body);
        const parsed = JSON.parse(message.body);
        setChatList((prev) => [
          ...prev,
          {
            isMyChat: parsed.senderId === 1,
            id: parsed.createdAt,
            name: parsed.nickname,
            createdAt: parsed.createdAt,
            content: parsed.content,
            profileImgSrc:
              parsed.profileImgSrc ||
              "https://picsum.photos/seed/qpo121/200/200",
          },
        ]);
        setTimeout(() => {
          if (chatScrollRef.current) {
            chatScrollRef.current.scrollTop =
              chatScrollRef.current.scrollHeight;
          }
        }, 10);
      },
    });

    wsClient.activate();
    wsClientRef.current = wsClient;

    return () => {
      console.log(`[Chat] Disconnecting from room ${cid}`);
      wsClientRef.current?.disconnect();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [cid]);

  const openMenu: MouseEventHandler<HTMLButtonElement> = () =>
    setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);
  const expandRight = () => setResponsive("right");
  const expandLeft = () => setResponsive("left");

  const adjustTextareaHeight = () => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = `${TEXTAREA_HEIGHT}px`;
    const newHeight = Math.max(
      TEXTAREA_HEIGHT,
      textareaRef.current.scrollHeight
    );
    textareaRef.current.style.height = `${newHeight}px`;
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMsg(e.target.value);
    adjustTextareaHeight();
  };

  // 메시지 발행 (pub)
  const sendMessage = () => {
    if (chatCount > CHAT_COUNT) return;
    if (wsClientRef.current && msg.trim()) {
      console.log("[Chat] Sending message:", msg.trim());
      console.log(wsClientRef.current);
      wsClientRef.current.publish("/pub/v1/api/chats", {
        senderId: 2,
        chatRoomId: 1,
        content: msg.trim(),
        messageType: "CHAT",
      });
      setMsg("");
      if (textareaRef.current)
        textareaRef.current.style.height = `${TEXTAREA_HEIGHT}px`;
    } else {
      console.warn(
        "[Chat] Cannot send message, wsClient not ready or empty msg"
      );
    }

    if (chatCount === 0 && !timerRef.current) {
      timerRef.current = setTimeout(() => {
        setChatCount(0);
        timerRef.current = null;
      }, CHAT_LIMIT);
    }
    setChatCount((prev) => prev + 1);
  };

  return (
    <main className={`${styles.chat} flex`}>
      <div
        className={`${styles.left} ${
          responsive === "right" ? styles.shrink : styles.expanded
        }`}
      >
        ...
        {/* Chatroom list unchanged */}
        <ul className="m-0 py-2">
          {chatRoomList.map((_, i) => (
            <ChatroomListItem onClick={expandRight} key={i} />
          ))}
        </ul>
      </div>
      <div
        className={`${styles.right} ${
          responsive === "right" ? styles.expanded : styles.shrink
        } flex flex-col relative overflow-hidden`}
      >
        {/* 채팅 헤더 */}
        <div className={`${styles["chat-header"]} flex px-4 items-center`}>
          <Button
            className={`rounded-full ${styles["toggle-responsive-btn"]}`}
            variant="ghost"
            size="icon"
            onClick={expandLeft}
          >
            <ChevronLeft />
          </Button>
          <p className="text-xl font-bold">ChatRoom {cid}</p>
          <Button variant="ghost" size="icon" onClick={openMenu}>
            <Menu />
          </Button>
        </div>
        {/* 채팅 목록 */}
        <div ref={chatScrollRef} className={`${styles["chat-content"]} flex`}>
          <ul className="py-3 flex flex-col gap-y-3 box-border w-full">
            {chatList.map((item) => (
              <ChatItem key={`${item.id}_${item.content}`} {...item} />
            ))}
          </ul>
        </div>
        {/* 입력창 */}
        <div className={`${styles["input-area"]} flex`}>
          <div className="flex w-full items-end px-3">
            <div className={`${styles["input-area-left"]}`}>
              <Button variant="ghost" size="icon">
                <Smile className={styles["emoji-icon"]} />
              </Button>
            </div>
            <textarea
              ref={textareaRef}
              className="px-4 m-0 grow resize-none overflow-hidden"
              value={msg}
              onChange={handleTextareaChange}
              onKeyUp={(e) => {
                if (e.key === "Enter" && !e.shiftKey) sendMessage();
              }}
            />
            <div className={styles["submit-container"]}>
              <Button variant="ghost" size="icon" onClick={sendMessage}>
                <Send className={styles["send-icon"]} />
              </Button>
            </div>
          </div>
        </div>
        <ChatRoomMenu isOpen={isMenuOpen} onClose={closeMenu} />
      </div>
    </main>
  );
}
