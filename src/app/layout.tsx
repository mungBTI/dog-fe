import type { Metadata } from "next";
import { Ownglyph_wiseelist } from "@/lib/config/fonts";
import "./globals.css";
import Providers from "./Providers";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "두둥멍",
  description: "반려동물과의 행복 저장소",
  verification: {
    google: "NZafkVmeiqnVqn-btqNK6Eyt7XwNpNGz6OKMO1RAM2o",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${Ownglyph_wiseelist.className} flex justify-center w-full min-h-screen`}
      >
        <Providers>{children}</Providers>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              minWidth: "300px",
            },
          }}
        />
      </body>
    </html>
  );
}
