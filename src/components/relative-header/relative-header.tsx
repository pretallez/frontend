"use client";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useAppDispatch } from "@/redux/hooks";
import { open } from "@/redux/slices/sheet-slice";

import HomeLink from "../link/homeLink";

import styles from "@/styles/relative-header.module.scss";

export default function RelativeHeader() {
  const dispatch = useAppDispatch();

  function onClickAvatar() {
    dispatch(open());
  }

  return (
    <header className={`${styles["relative-header"]} flex justify-center`}>
      <div className={`${styles["container"]} flex box-border`}>
        <div className="flex-1 flex items-center justify-start">
          <HomeLink href="/" />
        </div>
        <div className="flex-1 flex items-center justify-end"></div>
      </div>
    </header>
  );
}
