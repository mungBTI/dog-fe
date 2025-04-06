import React from "react";
import Image from "next/image";
import dudungMungImage from "../../../public/image/dudungMung.png";
import { FlexRowCenter } from "./Flex";

export default function Header() {
  return (
    <FlexRowCenter>
      <div className="flex items-center">
        <Image
          src={dudungMungImage}
          alt="logo"
          height={30}
          className="object-contain size-fit"
        />
      </div>
    </FlexRowCenter>
  );
}
