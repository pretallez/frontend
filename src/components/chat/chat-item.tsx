import dayjs from "dayjs";
import "dayjs/locale/ko";

import { FunctionComponent } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import styles from "@/styles/chat-item.module.scss";

export interface ChatItemProps {
  isMyChat: boolean;
  chatroomId?: number;
  memberId?: number;
  content?: string;
  messaeType?: string;
  createdAt: string;
  id: string | number;
  name: string;
  profileImgSrc: string;
}

const formatTime = (timestamp: string | Date) => {
  const now = dayjs();
  const target = dayjs(timestamp);
  if (now.isSame(target, "day")) {
    return target.format("A h:mm").replaceAll("AM", "오전");
  } else {
    return target.format("YYYY.M.D");
  }
};

const ChatItem: FunctionComponent<ChatItemProps> = ({
  isMyChat,
  createdAt,
  name,
  content,
  profileImgSrc,
}) => {
  return (
    <li
      className={`flex w-full gap-x-3 px-3 ${styles["chat-item"]} ${
        isMyChat ? styles["my"] : ""
      }`}
    >
      <div className="">
        <Avatar className={`w-10 h-10`}>
          <AvatarImage src={profileImgSrc} alt="avatar" />
          <AvatarFallback>CR</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col pt-[4px]">
        <div
          className={`text-sm font-medium leading-none ${styles["nickname"]}`}
        >
          {name}
        </div>
        <div className={styles["msg-box"]}>
          <span>
            <pre
              className={`text-sm font-medium leading-3 whitespace-pre-wrap my-2 ${styles["msg"]} px-3 pt-3 pb-3`}
            >
              {content}
            </pre>
          </span>
          <span className={`text-xs text-muted-foreground ${styles["time"]}`}>
            {formatTime(createdAt)}
          </span>
        </div>
      </div>
    </li>
  );
};

export default ChatItem;
