import { layout } from "@/styles/layout";

const question = "나랑 처음 만났을 때 기억은 어때?";
export default function TodayQuestion() {
  return (
    <div
      className={`${layout.flex.list.full} items-center justify-center gap-4`}
    >
      <span className="text-3xl font-bold">멍멍!</span>
      <span className="text-2xl font-medium text-center">{question}</span>
    </div>
  );
}
