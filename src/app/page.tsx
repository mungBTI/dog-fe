"use client";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    const dogInfo = localStorage.getItem("dogInfo");
    if (userInfo && dogInfo) {
      redirect("/main");
    } else {
      redirect("/login");
    }
  }, []);
}
