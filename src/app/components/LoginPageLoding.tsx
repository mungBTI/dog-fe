"use client";

import Image from "next/image";
import { layout } from "@/styles/layout";
import { useEffect, useState } from "react";
import MobileLayout from "./MobileLayout";

export default function LoginPageLoading() {
  const loadingText = "너에게 하고 싶은 말";
  const [text, setText] = useState<string>("");

  useEffect(() => {
    if (text.length == loadingText.length) return;

    const typingInterval = setTimeout(() => {
      setText((prev) => prev + loadingText[prev.length]);
    }, 140);

    return () => clearTimeout(typingInterval);
  }, [text]);

  return (
    <MobileLayout>
      <div
        className={`${layout.flex.column.center} h-full w-[300px] md:w-[400px] gap-4 text-[#FFC940] text-2xl font-bold`}
      >
        <p className="text-center w-full h-3">{text}</p>
        <Image
          src="/image/dog_illus/main_dog.png"
          alt="loading"
          width={200}
          height={200}
        />
      </div>
    </MobileLayout>
  );
}
