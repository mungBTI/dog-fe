"use client";
import React from "react";
import Image from "next/image";
import DogFootIcon from "@/image/dog_foot.svg";
import calendarImage from "../../../public/icons/calendar.png";
import userImage from "../../../public/icons/person.png";
import { useRouter } from "next/navigation";

const footerArry = [
  {
    label: "홈화면",
    iconsrc: DogFootIcon,
    path: "/main",
  },
  {
    label: "과거 일기",
    iconsrc: calendarImage,
    path: "/calendar",
  },
  {
    label: "마이페이지",
    iconsrc: userImage,
    path: "/mypage",
  },
];
export default function Footer() {
  const router = useRouter();
  return (
    <div
      className="flex flex-row items-center justify-between w-full px-4 md:px-0"
      role="navigation"
      aria-label="footer navigation"
    >
      {footerArry.map((item) => {
        return (
          <button
            className="flex flex-col items-center justify-center w-fit"
            key={item.label}
            aria-label={`go to ${item.label}`}
            onClick={() => {
              router.push(item.path);
            }}
          >
            <Image
              src={item.iconsrc}
              alt={`${item.label} icon`}
              width={20}
              height={20}
            />
          </button>
        );
      })}
    </div>
  );
}
