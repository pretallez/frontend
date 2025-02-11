import { Metadata } from "next";

import Header from "@/components/header";

export const metadata: Metadata = {
  title: "pretallez",
  description: "frontend",
};
export default function Home() {
  return (
    <>
      <Header />
      <div className="home">
        <h1>Test</h1>
      </div>
      <footer></footer>
    </>
  );
}
