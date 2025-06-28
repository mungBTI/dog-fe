import { getTodayAnswer } from "@/api/answer/getAnswer";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function TodayQuestion({
  setIsDraft,
}: {
  setIsDraft: (isDraft: boolean) => void;
}) {
  const router = useRouter();
  const [linkText, setLinkText] = useState<string>("답변하러 가기");
  const [link, setLink] = useState<string>("");
  const { data: questionData } = useQuery({
    queryKey: ["question"],
    queryFn: async () => {
      const data = await getTodayAnswer();
      return data;
    },
  });

  const todayQuestion = useMemo(() => {
    const returnObj = {
      question: "",
      title: "",
      answerId: "",
    };
    if (questionData) {
      if (questionData.status === 0 && questionData.answer.isDraft) {
        returnObj.question = questionData.question.text;
        returnObj.title = "오늘의 질문이 찾아왔어요!";
        returnObj.answerId = questionData.answer.id;
      } else if (!questionData.answer.isDraft) {
        returnObj.title = "🐶 오늘의 사랑을 전했어요! ✨";
      }
    }
    return returnObj;
  }, [questionData]);

  useEffect(() => {
    if (questionData) {
      if (questionData.status === 0 && questionData.answer.isDraft) {
        setIsDraft(true);
        setLinkText("답변하러 가기");
        setLink("/answer/new");
      } else if (!questionData.answer.isDraft) {
        setIsDraft(false);
        setLinkText("답변 수정하러 가기");
        setLink(`/answer/${questionData.answer.id}/edit`);
      }
    }
  }, [questionData, setIsDraft]);

  const gotoEditPage = useCallback(() => {
    router.push(link);
  }, [link, router]);

  return (
    <div className="relative w-full p-4 mx-4">
      <div className="w-full p-4 mb-6 text-center bg-yellow-50 rounded-3xl">
        <h2
          className="mb-3 font-bold leading-relaxed"
          style={{ color: "#F5BC25" }}
        >
          {todayQuestion.title}
        </h2>
        {todayQuestion.question && (
          <p className="p-4 mb-3 font-medium leading-relaxed text-gray-800 bg-white/80 rounded-3xl">
            {todayQuestion.question}
          </p>
        )}
      </div>
      <div className="flex justify-center">
        <button
          className="flex items-center gap-2 px-4 py-2 text-lg font-extrabold text-white transition-all duration-300 transform w-fit bg-main-yellow rounded-2xl hover:bg-yellow-500 hover:scale-105 hover:shadow-lg active:scale-95 active:shadow-sm"
          onClick={() => {
            gotoEditPage();
          }}
        >
          <span className="relative z-10 tracking-wider transition-all duration-300">
            {linkText}
          </span>
          <Image
            src="/icons/dog_foot_white.png"
            alt="arrow-right"
            width={20}
            height={20}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </div>
    </div>
  );
}
