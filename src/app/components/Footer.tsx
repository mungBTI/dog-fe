"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const footerArry = [
  {
    label: "홈화면",
    iconsrc: "/icons/home.png",
    path: "/main",
  },
  {
    label: "과거 일기",
    iconsrc: "/icons/calendar.png",
    path: "/calendar",
  },
  {
    label: "마이페이지",
    iconsrc: "/icons/mypage.png",
    path: "/mypage",
  },
];
export default function Footer() {
  const router = useRouter();
  return (
    <div
      className="flex flex-row items-center justify-between w-full px-4 py-6 md:px-0"
      role="navigation"
      aria-label="footer navigation"
    >
      {footerArry.map((item) => {
        return (
          <button
            className="flex flex-col items-center justify-center p-3 transition-all duration-200 w-fit rounded-xl hover:bg-yellow-50 hover:scale-110 active:scale-95 active:bg-yellow-100"
            key={item.label}
            aria-label={`go to ${item.label}`}
            onClick={() => {
              router.push(item.path);
            }}
          >
            <Image
              src={item.iconsrc}
              alt={`${item.label} icon`}
              width={28}
              height={28}
              className="transition-all duration-200 hover:brightness-110"
            />
          </button>
        );
      })}
    </div>
  );
}
