import Image from "next/image";
import Link from "next/link";

export default function Kakao() {
  return (
    <Link
      href={{
        pathname: "/main",
      }}
    >
      <Image
        src="/image/login/kakao_login_medium_wide.png"
        alt="Kakao Login"
        width={300}
        height={45}
        className="w-[300px] h-[45px] md:w-[400px] md:h-[60px]"
      ></Image>
    </Link>
  );
}
