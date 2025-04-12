"use client";
import { MouseEventHandler, useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { WSClient } from "@/ws/ws";

import Header from "@/components/header/header";
import ChatroomListItem from "@/components/chat/chatroom-list-item";

import { Button } from "@/components/ui/button";

import { Menu, Send, Smile, ChevronLeft } from "lucide-react";

import styles from "@/styles/chat.module.scss";
import ChatRoomMenu from "@/components/chat/chatroom-menu";
import ChatItem, { ChatItemProps } from "@/components/chat/chat-item";

type Params = {
  cid: string;
};

interface Chat {
  chatRoomList: any[];
  chatList: ChatItemProps[];
  menu: {
    isOpen: boolean;
  };
  responsive: string;
}

const CHAT_LIMIT = 5000;
const CHAT_COUNT = 3;
const TEXTAREA_HEIGHT = 42;

export default function Chat() {
  const params = useParams<Params>();
  const [msg, setMsg] = useState<string>("");
  const chatScrollRef = useRef<HTMLDivElement>(null);
  // textarea 자동 높이 조절을 위한 ref
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [chatList, setChatList] = useState<ChatItemProps[]>([]);
  const [chatRoomList, setChatRoomList] = useState<any[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [responsive, setResponsive] = useState<"left" | "right">("right");
  const [chatCount, setChatCount] = useState<number>(0);

  const wsClientRef = useRef<WSClient | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    wsClientRef.current = new WSClient({
      brokerUrl: "ws://localhost:3000/ws",
      subscriptionDestination: "/v1/api/chatrooms/1",
      onMessage: (msg) => {
        const parsed = JSON.parse(msg.body);
        setChatList((prev) => [
          ...prev,
          {
            isMyChat: true,
            id: parsed.createdAt,
            name: parsed.nickname,
            createdAt: parsed.createdAt,
            content: parsed.content,
            profileImgSrc: "https://picsum.photos/seed/qpo121/200/200",
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
    wsClientRef.current.activate();

    return () => {
      wsClientRef.current?.disconnect();
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const openMenu: MouseEventHandler<HTMLButtonElement> = () =>
    setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  const expandRight = () => setResponsive("right");
  const expandLeft = () => setResponsive("left");

  const handleChatRoomListItemClick: MouseEventHandler<HTMLLIElement> = () => {
    expandRight();
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      if (!textareaRef.current.value) {
        textareaRef.current.style.height = `${TEXTAREA_HEIGHT}px`;
        return;
      }
      textareaRef.current.style.height = `${TEXTAREA_HEIGHT}px`;
      const newHeight = Math.max(
        TEXTAREA_HEIGHT,
        textareaRef.current.scrollHeight
      );
      textareaRef.current.style.height = `${newHeight}px`;
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMsg(e.target.value);
    adjustTextareaHeight();
  };

  const sendMessage = () => {
    if (chatCount > CHAT_COUNT) {
      return;
    }

    if (wsClientRef.current && msg.trim()) {
      wsClientRef.current.publish("/v1/api/chats", {
        memberId: 1,
        chatroomId: 1,
        content: msg.trim(),
        messageType: "CHAT",
      });
      setMsg("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "40px";
      }
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
    <>
      <main className={`${styles["chat"]} flex`}>
        <div
          className={`${styles["left"]} ${
            responsive === "right" ? styles["shrink"] : styles["expanded"]
          }`}
        >
          <ul className="m-0 py-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <ChatroomListItem onClick={handleChatRoomListItemClick} key={i} />
            ))}
          </ul>
        </div>
        <div
          className={`${styles["right"]} ${
            responsive === "right" ? styles["expanded"] : styles["shrink"]
          } flex flex-col relative overflow-hidden`}
        >
          <div className={`${styles["chat-header"]} flex px-4 items-center`}>
            <div className="grow flex items-center gap-x-2">
              <Button
                className={`rounded-full ${styles["toggle-responsive-btn"]}`}
                variant="ghost"
                size="icon"
                onClick={expandLeft}
              >
                <ChevronLeft />
              </Button>
              <p className="text-xl font-bold">ChatRoom</p>
            </div>
            <div className="grow flex justify-end">
              <Button variant="ghost" size="icon" onClick={openMenu}>
                <Menu />
              </Button>
            </div>
          </div>
          <div
            ref={chatScrollRef}
            className={`${styles["chat-content"]} flex `}
          >
            <ul className="py-3 flex flex-col gap-y-3 box-border w-full">
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
    </>
  );
}
