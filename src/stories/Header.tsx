import React from "react";
import Image from "next/image";
import dudungMungImage from "../../public/image/dudungMung.png";

export default function Header() {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <Image src={dudungMungImage} alt="logo" width={300} height={300} />
      </div>
    </div>
  );
}
