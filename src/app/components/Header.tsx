import React from "react";
import Image from "next/image";
import dudungMungImage from "../../../public/image/dudungMung.png";

export default function Header() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center">
        <Image
          src={dudungMungImage}
          alt="logo"
          height={30}
          className="object-contain size-fit"
        />
      </div>
    </div>
  );
}
