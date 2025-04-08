"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { kakaoAuth } from "@/app/login/lib/kakaoAuth";

const KakaoCallback = () => {
  const router = useRouter();

  useEffect(() => {
    const handleKakaoLogin = async () => {
      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");
      if (!code) {
        alert("다시 로그인해주세요.");
        router.replace("/login");
        return;
      }
      try {
        const res = await kakaoAuth(code);
        const data = res.data;
        if (data.accessToken) {
          localStorage.setItem("accessToken", data.accessToken);
          router.push("/main");
        } else {
          alert("다시 로그인해주세요.");
          router.replace("/login");
        }
      } catch (err: unknown) {
        console.error("카카오 로그인 처리 중 에러:", err);
        alert("개발자에게 문의해주세요.");
        router.replace("/login");
      }
    };
    handleKakaoLogin();
  }, [router]);

  return <div>로딩 개발 예정</div>;
};

export default KakaoCallback;
