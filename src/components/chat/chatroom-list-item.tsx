import { AvatarFallback } from "@radix-ui/react-avatar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { FunctionComponent, MouseEventHandler } from "react";

interface ChatroomListItem {
  onClick: MouseEventHandler<HTMLLIElement>;
}

const ChatroomListItem: FunctionComponent<ChatroomListItem> = ({ onClick }) => {
  return (
    <li
      className={`flex py-3 px-4 gap-x-3 select-none cursor-pointer`}
      onClick={onClick}
    >
      <div className={``}>
        <Avatar className={`w-12 h-12`}>
          <AvatarImage
            src="https://picsum.photos/seed/picsum/200/300"
            alt="avatar"
          />
          <AvatarFallback>CR</AvatarFallback>
        </Avatar>
      </div>
      <div className={`flex flex-col justify-center`}>
        <div className={`text-sm font-medium flex gap-x-1`}>
          <div className={`font-semibold`}>Name</div>⋅
          <div className={`text-muted-foreground`}>date</div>
        </div>
        <div className={`text-sm text-muted-foreground w-[75%] truncate`}>
          LastasdlkfjalskdjflaksdjflkChatasdfasd
        </div>
      </div>
    </li>
  );
};

export default ChatroomListItem;
