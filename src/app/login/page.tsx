"use client";
import { layout } from "@/styles/layout";
import Header from "../components/Header";
import Introduce from "./_components/Introduce";
import Kakao from "./_components/Kakao";

export default function Login() {
  return (
    <div
      className={`${layout.flex.list.full} items-center justify-center gap-80`}
    >
      <div className={`${layout.flex.column.fullWidth} gap-2 w-80 h-52`}>
        <Header />
        <Introduce />
      </div>
      <div>
        <Kakao />
      </div>
    </div>
  );
}
