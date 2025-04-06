"use client";

import FlexListFull from "../components/Flex";
import Header from "../components/Header";
import Introduce from "./_components/Introduce";
import Kakao from "./_components/Kakao";

export default function Login() {
  return (
    <FlexListFull className="items-center justify-center gap-80">
      <FlexListFull className="flex flex-col items-center justify-center gap-2 w-80 h-52">
        <Header />
        <Introduce />
      </FlexListFull>
      <div>
        <Kakao />
      </div>
    </FlexListFull>
  );
}
