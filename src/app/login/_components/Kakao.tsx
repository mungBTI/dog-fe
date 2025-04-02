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
        alt="kakao_login_buttom"
        width={340}
        height={60}
        quality={100}
      ></Image>
    </Link>
  );
}
