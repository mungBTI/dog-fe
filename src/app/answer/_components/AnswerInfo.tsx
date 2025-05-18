import { Info } from "@/types/answer";
import Image from "next/image";

export default function AnswerInfo({ count, date }: Info) {
  return (
    <div className="flex items-center justify-start gap-2">
      <div className="flex items-center justify-start gap-1">
        <Image
          src={"/icons/dog_foot.png"}
          alt="Dog"
          width={15}
          height={15}
          className="w-3 h-3 object-cover"
        />
        <span>{count}번째 발바닥</span>
      </div>
      <div>{date}</div>
    </div>
  );
}
