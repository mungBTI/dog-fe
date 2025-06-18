"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem(
      "accessToken",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODI3ZmI2MDk1OWI1NDEyZDlkMjE3ZDkiLCJpYXQiOjE3NDk5NjI4ODEsImV4cCI6MTc1MDU2NzY4MX0.xrJYIhgO5OPpq5AnL3fyU3gqzu-g1oPq4Vb7eVufQYk"
    );
    const accessToken = localStorage.getItem("accessToken");

    router.replace(accessToken ? "/main" : "/login");
  }, [router]);

  return null;
}
