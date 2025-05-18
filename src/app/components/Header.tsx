import React from "react";
import Image from "next/image";
import dudungMungImage from "@/../public/image/dudungMung.png";
import { layout } from "@/styles/layout";

export default function Header() {
  return (
    <div className={`${layout.flex.row.center}`}>
      <div className="flex items-center">
        <Image
          src={dudungMungImage}
          alt="logo"
          width={200}
          className="object-contain"
        />
      </div>
    </div>
  );
}
