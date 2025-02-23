import { Metadata } from "next";

import styles from "@/styles/index.module.scss";

export const metadata: Metadata = {
  title: "pretallez",
  description: "frontend",
};

export default function Home() {
  return <main className={`${styles["index"]}`}>main</main>;
}
