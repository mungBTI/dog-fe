import { Text } from "@/types/answer";

export default function Question({ text }: Text) {
  return <p className="font-bold text-2xl">{text}</p>;
}
