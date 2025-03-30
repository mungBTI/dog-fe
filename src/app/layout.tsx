import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const myFont = localFont({
  src: "../../public/fonts/Ownglyph_wiseelist.ttf",
});

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
      <body className={`${myFont.className}`}>{children}</body>
    </html>
  );
}
