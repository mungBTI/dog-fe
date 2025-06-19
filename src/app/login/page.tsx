"use client";
import { layout } from "@/styles/layout";
import Header from "../components/Header";
import Introduce from "./_components/Introduce";
import Kakao from "./_components/Kakao";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function Login() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("error") === "true") {
      toast.error("다시 로그인 해주세요.", {
        icon: "\u{1F512}",
      });
    }

    const clearUrl = window.location.pathname;
    router.replace(clearUrl);
  }, [searchParams, router]);

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
