import localFont from "next/font/local";

export const Ownglyph_wiseelist = localFont({
  src: "../../utils/fonts/Ownglyph_wiseelist.ttf",
  preload: true, // 폰트 프리로딩 활성화
  display: "block", // 'swap' 대신 'block' 사용하여 FOUT 방지
  fallback: ["system-ui", "arial"], // 폴백 폰트 지정
  variable: "--font-Ownglyph_wiseelist",
});
