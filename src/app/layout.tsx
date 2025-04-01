import type { Metadata } from "next";
import { Ownglyph_wiseelist } from "@/lib/config/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "두둥명",
  description: "반려동물과의 행복 저장소",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${Ownglyph_wiseelist.className} flex justify-center w-full min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
