import Image from "next/image";
import Link from "next/link";

export default function Kakao() {
  return (
    <Link
      href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URL}`}
    >
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
