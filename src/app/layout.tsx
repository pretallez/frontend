import { Metadata } from "next";

import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

import "./globals.scss";
import StoreProvider from "./store-provider";

export const metadata: Metadata = {
  title: "pretallez",
  description: "frontend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Header />
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
