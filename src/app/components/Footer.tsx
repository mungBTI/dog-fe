import React from "react";
import Image from "next/image";
import dogFootImage from "../../../public/icons/dog_foot.png";
import calendarImage from "../../../public/icons/calendar.png";
import diaryImage from "../../../public/icons/diary.png";
import albumImage from "../../../public/icons/album.png";

const footerArry = [
  {
    label: "홈화면",
    iconsrc: dogFootImage,
  },
  {
    label: "달력",
    iconsrc: calendarImage,
  },
  {
    label: "다이어리",
    iconsrc: diaryImage,
  },
  {
    label: "엘범",
    iconsrc: albumImage,
  },
];
export default function Footer() {
  return (
    <div className="flex flex-row items-center justify-between w-full">
      {footerArry.map((item) => {
        return (
          <div
            className="flex flex-col items-center justify-center w-fit"
            key={item.label}
          >
            <Image src={item.iconsrc} alt={item.label} width={20} height={20} />
            <span>{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}
