"use client";
import { MouseEventHandler, useState } from "react";
import { useParams } from "next/navigation";

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

const dChats: ChatItemProps[] = [
  {
    isMyChat: false,
    id: 1,
    createdAt: "Fri Mar 28 2025 15:40:22",
    name: "홍길동",
    content: "안녕하세요",
    profileImgSrc: "https://picsum.photos/seed/zxl21/200/200",
  },
  {
    isMyChat: false,
    id: 2,
    createdAt: "Fri Mar 28 2025 15:42:09",
    name: "이자성",
    content: "오랜만이에요 홍길동님",
    profileImgSrc: "https://picsum.photos/seed/2210azz/200/200",
  },
  {
    isMyChat: true,
    id: 3,
    createdAt: "Fri Mar 28 2025 15:43:12",
    name: "박연",
    content: "어서오세요",
    profileImgSrc: "https://picsum.photos/seed/qpo121/200/200",
  },
];

export default function Chat() {
  const params = useParams<Params>();

  const [state, setState] = useState<Chat>({
    chatList: [],
    chatRoomList: [],
    menu: {
      isOpen: false,
    },
    responsive: "right",
  });

  const openMenu: MouseEventHandler<HTMLButtonElement> = (event) => {
    setState((prev) => ({
      ...prev,
      menu: { ...prev.menu, isOpen: true },
    }));
  };

  const closeMenu = () => {
    setState((prev) => ({
      ...prev,
      menu: { ...prev.menu, isOpen: false },
    }));
  };

  const expandRight = () => {
    setState((prev) => ({
      ...prev,
      responsive: "right",
    }));
  };

  const expandLeft = () => {
    setState((prev) => ({
      ...prev,
      responsive: "left",
    }));
  };

  const handleChatRoomListItemClick: MouseEventHandler<HTMLLIElement> = (
    event
  ) => {
    expandRight();
  };

  return (
    <>
      <Header />
      <main className={`${styles["chat"]} flex`}>
        <div
          className={`${styles["left"]} ${
            state.responsive === "right" ? styles["shrink"] : styles["expanded"]
          }`}
        >
          <ul
            className={`m-0 py-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-500 dark:scrollbar-track-gray-700`}
          >
            {Array.from({ length: 15 }).map((_, i) => (
              <ChatroomListItem onClick={handleChatRoomListItemClick} key={i} />
            ))}
          </ul>
        </div>
        <div
          className={`${styles["right"]} ${
            state.responsive === "right" ? styles["expanded"] : styles["shrink"]
          } flex flex-col relative overflow-hidden`}
        >
          <div className={`${styles["chat-header"]} flex px-2 items-center`}>
            <div className={`grow flex items-center gap-x-2`}>
              <Button
                className={`rounded-full hover:bg-transparent ${styles["toggle-responsive-btn"]}`}
                variant="ghost"
                size="icon"
                onClick={expandLeft}
              >
                <ChevronLeft />
              </Button>
              <p className={`text-xl font-bold tracking-tight`}>ChatRoom</p>
            </div>
            <div className={`grow flex justify-end`}>
              <Button variant="ghost" size="icon" onClick={openMenu}>
                <Menu />
              </Button>
            </div>
          </div>
          <div className={`${styles["chat-content"]}`}>
            <ul className="py-3 m-0 h-full">
              {dChats.map((item) => (
                <ChatItem key={item.id} {...item} />
              ))}
            </ul>
          </div>
          <div className={`${styles["input-area"]} flex items-center px-2`}>
            <div className="flex items-center gap-x-1">
              <Button
                className="rounded-full hover:bg-transparent"
                variant="ghost"
                size="icon"
              >
                <Smile className={`${styles["emoji-icon"]}`} />
              </Button>
            </div>
            <textarea className="px-4 m-0 grow"></textarea>
            <div
              className={`${styles["submit-container"]} flex justify-center items-center`}
            >
              <Button
                className="rounded-full hover:bg-transparent"
                variant="ghost"
                size="icon"
              >
                <Send className={`${styles["send-icon"]}`} />
              </Button>
            </div>
          </div>
          <ChatRoomMenu isOpen={state.menu.isOpen} onClose={closeMenu} />
        </div>
      </main>
    </>
  );
}
