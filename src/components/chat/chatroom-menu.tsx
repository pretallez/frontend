"use client";
import { FunctionComponent, useEffect, useRef } from "react";
import { Calendar, Vote } from "lucide-react";

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import styles from "@/styles/chatroom-menu.module.scss";

interface ChatRoomMenu {
  isOpen: boolean;
  onClose: () => void;
}

const ChatRoomMenu: FunctionComponent<ChatRoomMenu> = ({ isOpen, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const refElement = menuRef.current;
    const handleClickOutside = (event: MouseEvent) => {
      if (refElement && !refElement.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`${
        styles["chatroom-menu"]
      } bg-white border-r h-full shadow-lg z-10 p-4 ${
        isOpen ? styles["open"] : ""
      }`}
      ref={menuRef}
    >
      <Command className="h-full">
        <CommandList className="h-full flex flex-col">
          <CommandGroup heading="채팅방 이름">
            <CommandItem>
              <Calendar />
              <span>일정</span>
            </CommandItem>
            <CommandItem>
              <Vote />
              <span>투표</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="참여인원">
            <CommandItem className="flex items-center gap-x-3">
              <Avatar className="cursor-pointer w-8 h-8">
                <AvatarImage
                  src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/woman-wearing-fencing-mask-portrait-stasker.jpg"
                  alt="avatar"
                />
                <AvatarFallback>PR</AvatarFallback>
              </Avatar>
              <span>User1</span>
            </CommandItem>
            <CommandItem className="flex items-center gap-x-3">
              <Avatar className="cursor-pointer w-8 h-8">
                <AvatarImage
                  src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/woman-wearing-fencing-mask-portrait-stasker.jpg"
                  alt="avatar"
                />
                <AvatarFallback>PR</AvatarFallback>
              </Avatar>
              <span>User2</span>
            </CommandItem>
            <CommandItem className="flex items-center gap-x-3">
              <Avatar className="cursor-pointer w-8 h-8">
                <AvatarImage
                  src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/woman-wearing-fencing-mask-portrait-stasker.jpg"
                  alt="avatar"
                />
                <AvatarFallback>PR</AvatarFallback>
              </Avatar>
              <span>User3</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
};

export default ChatRoomMenu;
