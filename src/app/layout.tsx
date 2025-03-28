import { Metadata } from "next";

import "./globals.scss";
import StoreProvider from "./store-provider";
import CommonSheet from "./common-sheet";

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
          {children}
          <CommonSheet />
        </StoreProvider>
      </body>
    </html>
  );
}
