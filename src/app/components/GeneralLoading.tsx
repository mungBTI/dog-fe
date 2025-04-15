import Image from "next/image";
import { layout } from "@/styles/layout";
import MobileLayout from "./MobileLayout";

export default function GeneralLoading() {
  return (
    <MobileLayout>
      <div
        className={`${layout.flex.column.center} h-full w-[300px] md:w-[400px] `}
      >
        <Image
          src="/image/foot_loading.gif"
          alt="발바닥"
          width={200}
          height={200}
          unoptimized={true}
        />
      </div>
    </MobileLayout>
  );
}
