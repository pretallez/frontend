import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import styles from "@/styles/header.module.scss";

export default function Header() {
  return (
    <header className={`${styles["header"]} flex justify-center`}>
      <div className={`${styles["container"]} flex`}>
        <div className="flex-1 border justify-start"></div>
        <div className="flex-1 flex items-center border justify-end pr-4">
          <Avatar className="cursor-pointer">
            <AvatarImage
              src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/woman-wearing-fencing-mask-portrait-stasker.jpg"
              alt="@shadcn"
            />
            <AvatarFallback>PR</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
