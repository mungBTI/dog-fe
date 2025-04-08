"use client";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const accessToke = localStorage.getItem("accessToke");
    if (accessToke) {
      redirect("/main");
    } else {
      redirect("/login");
    }
  }, []);
}
