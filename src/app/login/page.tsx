"use client";

import Header from "../components/Header";
import Introduce from "./_components/Introduce";
import Kakao from "./_components/Kakao";

export default function Login() {
  return (
    <div className="flex flex-col gap-80 w-full h-full items-center justify-center">
      <div className="flex flex-col gap-2 w-80 h-52 items-center justify-center">
        <Header />
        <Introduce />
      </div>
      <div>
        <Kakao />
      </div>
    </div>
  );
}
