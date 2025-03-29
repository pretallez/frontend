"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useAppDispatch } from "@/redux/hooks";
import { open } from "@/redux/slices/sheet-slice";

import styles from "@/styles/header.module.scss";
import HomeLink from "../link/homeLink";

export default function Header() {
  const dispatch = useAppDispatch();

  function onClickAvatar() {
    dispatch(open());
  }

  return (
    <header
      className={`${styles["header"]} border boder-b flex justify-center`}
    >
      <div className={`${styles["container"]} flex`}>
        <div className="flex-1 flex items-center justify-start">
          <HomeLink href="/" />
        </div>
        <div className="flex-1 flex items-center justify-end">
          <Avatar className="cursor-pointer" onClick={onClickAvatar}>
            <AvatarImage
              src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/woman-wearing-fencing-mask-portrait-stasker.jpg"
              alt="avatar"
            />
            <AvatarFallback>PR</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
