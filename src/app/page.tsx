"use client";

import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";

import styles from "@/styles/index.module.scss";

export default function Home() {
  return (
    <>
      <Header />
      <main className={`${styles["index"]} text-white`}>main</main>
      <Footer />
    </>
  );
}
