import { instance } from "@/lib/api";
import { AuthResponse } from "@/types/signup";

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
