"use client";

import { MouseEventHandler, useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { WSClient } from "@/ws/ws";

import ChatroomListItem from "@/components/chat/chatroom-list-item";
import ChatRoomMenu from "@/components/chat/chatroom-menu";
import ChatItem, { ChatItemProps } from "@/components/chat/chat-item";
import { Button } from "@/components/ui/button";
import { Menu, Send, Smile, ChevronLeft } from "lucide-react";

import RelativeHeader from "@/components/relative-header/relative-header";

import styles from "@/styles/chat.module.scss";

const CHAT_LIMIT = 5000;
const CHAT_COUNT = 3;
const TEXTAREA_HEIGHT = 42;

export default function Chat() {
  const { cid } = useParams();
  const [msg, setMsg] = useState("");
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const [chatList, setChatList] = useState<ChatItemProps[]>([]);
  const [chatRoomList] = useState<any[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [responsive, setResponsive] = useState<"left" | "right">("right");
  const [chatCount, setChatCount] = useState(0);

  const wsClientRef = useRef<WSClient | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const wsClient = new WSClient({
      chatRoomId: Number(cid),
      onMessage: (msg) => {
        const parsed = JSON.parse(msg.body);
        setChatList((prev) => [
          ...prev,
          {
            isMyChat: parsed.senderId === 1,
            id: parsed.createdAt,
            name: parsed.nickname,
            createdAt: parsed.createdAt,
            content: parsed.content,
            profileImgSrc: parsed.profileImgSrc || "",
          },
        ]);

        timerRef.current = setTimeout(() => {
          chatScrollRef.current!.scrollTop =
            chatScrollRef.current!.scrollHeight;
        }, 10);
      },
    });

    wsClient.connect();
    wsClientRef.current = wsClient;

    return () => {
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

  const sendMessage = () => {
    if (chatCount > CHAT_COUNT) return;
    if (wsClientRef.current && msg.trim()) {
      wsClientRef.current.publish({
        senderId: 1,
        chatRoomId: Number(cid),
        content: msg.trim(),
        messageType: "CHAT",
      });
      setMsg("");
      textareaRef.current!.style.height = `${TEXTAREA_HEIGHT}px`;

      if (chatCount === 0 && !timerRef.current) {
        timerRef.current = setTimeout(() => {
          setChatCount(0);
          timerRef.current = null;
        }, CHAT_LIMIT);
      }
      setChatCount((prev) => prev + 1);
    }
  };

  return (
    <>
      <div className="flex flex-col w-full items-center">
        <RelativeHeader />
        <main className={`${styles["chat"]} flex border-t box-border`}>
          <div
            className={`${styles["left"]} ${
              responsive === "right" ? styles["shrink"] : styles["expanded"]
            } border-l border-r box-border`}
          >
            <div
              className={`${styles["chat-room-header"]} p-4 text-md border-b box-border`}
            >
              전체
            </div>
            <ul className="m-0 py-2">
              {Array.from({ length: 2 }).map((_, i) => (
                <ChatroomListItem
                  onClick={() => {
                    router.push(`/chat/${i + 1}`);
                  }}
                  key={i}
                />
              ))}
            </ul>
          </div>
          <div
            className={`${styles["right"]} ${
              responsive === "right" ? styles["expanded"] : styles["shrink"]
            } flex flex-col relative overflow-hidden border-r box-border`}
          >
            <div
              className={`${styles["chat-header"]} flex px-4 items-center box-border border-b`}
            >
              <div className="grow flex items-center gap-x-2">
                <Button
                  className={`rounded-full ${styles["toggle-responsive-btn"]}`}
                  variant="ghost"
                  size="icon"
                  onClick={expandLeft}
                >
                  <ChevronLeft />
                </Button>
                <p className="text-xl font-bold">{`Chatroom : ${cid}`}</p>
              </div>
              <div className="grow flex justify-end">
                <Button variant="ghost" size="icon" onClick={openMenu}>
                  <Menu />
                </Button>
              </div>
            </div>
            <div
              ref={chatScrollRef}
              className={`${styles["chat-content"]} flex`}
            >
              <ul className="py-3 flex flex-col gap-y-1 box-border w-full">
                {chatList.map((item) => (
                  <ChatItem key={`${item.id}_${item.content}`} {...item} />
                ))}
              </ul>
            </div>
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
                    if (e.key === "Enter" && !e.shiftKey) {
                      sendMessage();
                    }
                  }}
                ></textarea>
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
      </div>
    </>
  );
}
