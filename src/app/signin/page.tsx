import React from "react";
import { Button } from "@/components/ui/button"; // 자신의 프로젝트 경로에 맞게 수정하세요.
import GoogleIcon from "@/components/svg/icons/google";

import styles from "@/styles/signin.module.scss";
import KakaoIcon from "@/components/svg/icons/kakao";
import NaverIcon from "@/components/svg/icons/naver";
import Link from "next/link";
import TextLogo from "@/components/svg/logos/text_logo";

export default function SignIn() {
  return (
    <main className={styles["signin"]}>
      <div className={styles["container"]}>
        <Link href={"/"}>
          <TextLogo height={36} />
        </Link>
        <div className={`${styles["btn-group"]} flex flex-col gap-y-3`}>
          <Button
            variant="default"
            className="w-full flex items-center justify-center gap-4 border bg-[#fff] text-black 
                       hover:bg-[#fff] hover:text-black transition-none"
          >
            <GoogleIcon width={24} height={24} />
            구글로 로그인
          </Button>
          <Button
            className="w-full flex items-center justify-center gap-2 bg-[#FEE500] text-black 
                       hover:!bg-[#FEE500] hover:!text-black transition-none"
          >
            <KakaoIcon width={24} height={24} />
            카카오로 로그인
          </Button>
          <Button
            className="w-full flex items-center justify-center gap-2 bg-[#03C75A] text-white 
                       hover:!bg-[#03C75A] hover:!text-white transition-none"
          >
            <NaverIcon width={24} height={24} fill="#fff" />
            네이버로 로그인
          </Button>
        </div>
      </div>
    </main>
  );
}
