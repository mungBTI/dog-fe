import { AuthResponse } from "@/types/signup";
import { instance } from "../api";

export const kakaoAuth = (code: string) => {
  return instance.post<AuthResponse>(
    "/auth/kakao",
    { code },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
