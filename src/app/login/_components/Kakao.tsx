import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

export default function Kakao() {
  const kakaoURL = useMemo(() => {
    return `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URL}`;
  }, []);
  return (
    <Link href={kakaoURL}>
      <div className="w-[300px] h-[45px] md:w-[400px] md:h-[60px] rounded-[12px] overflow-hidden">
        <Image
          src="/image/login/kakao_login.svg"
          alt="Kakao Login"
          width={300}
          height={45}
          className="w-full h-full"
          quality={100}
        />
      </div>
    </Link>
  );
}
