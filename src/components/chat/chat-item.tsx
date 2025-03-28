import { FunctionComponent } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import styles from "@/styles/chat-item.module.scss";

interface ChatItem {
  isMyChat?: boolean;
}

const ChatItem: FunctionComponent<ChatItem> = ({ isMyChat }) => {
  return (
    <li
      className={`flex w-full gap-x-3 px-2 py-3 ${styles["chat-item"]} ${
        isMyChat ? styles["my"] : ""
      }`}
    >
      <div className="">
        <Avatar className={`w-10 h-10`}>
          <AvatarImage
            src="https://picsum.photos/seed/test/200/300"
            alt="avatar"
          />
          <AvatarFallback>CR</AvatarFallback>
        </Avatar>
      </div>
      <div className="h-[100px] w-[350px] flex flex-col gap-y-3 pt-[4px]">
        <div
          className={`text-sm font-medium leading-none ${styles["nickname"]}`}
        >
          Name
        </div>
        <pre
          className={`text-sm font-medium leading-none w-full ${styles["msg"]} p-3 rounded-md`}
        >
          안녕하세요? 반갑습니다
        </pre>
      </div>
    </li>
  );
};

export default ChatItem;
