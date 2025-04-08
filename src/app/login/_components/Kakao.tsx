import Image from "next/image";
import Link from "next/link";

export default function Kakao() {
  return (
    <Link
      href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URL}`}
    >
      <Image
        src="/image/login/kakao_login_medium_wide.png"
        alt="Kakao Login"
        width={300}
        height={45}
        className="w-[300px] h-[45px] md:w-[400px] md:h-[60px]"
        quality={100}
      ></Image>
    </Link>
  );
}
