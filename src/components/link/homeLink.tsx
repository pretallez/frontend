import Link from "next/link";
import { FunctionComponent } from "react";
import TextLogo from "../svg/logos/text_logo";

interface HomeLinkProps {
  href?: string;
}

const HomeLink: FunctionComponent<HomeLinkProps> = ({ href }) => {
  return (
    <Link href={href || "/"}>
      <TextLogo width={100} height={29} />
    </Link>
  );
};

export default HomeLink;
