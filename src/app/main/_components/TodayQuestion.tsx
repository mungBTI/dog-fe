import { getTodayAnswer } from "@/api/answer/getAnswer";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function TodayQuestion() {
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
      if (questionData.status === 0 && !questionData.answer.isDraft) {
        returnObj.question = questionData.question.text;
        returnObj.title = "오늘의 질문이 찾아왔어요!";

        setLinkText(() => {
          return "답변하러 가기";
        });
        setLink(() => {
          return `/answer/${questionData.answerId}/new`;
        });
        returnObj.answerId = questionData.answer.id;
      } else if (questionData.answer.isDraft) {
        returnObj.title = "🐶 오늘의 사랑을 전했어요! ✨";
        setLinkText("답변 수정하러 가기");

        setLink(() => {
          return `/answer/${questionData.answer.id}/edit`;
        });
      }
    }
    return returnObj;
  }, [questionData]);

  const gotoEditPage = useCallback(() => {
    router.push(link);
  }, [link]);

  return (
    <div className="relative p-6 mx-4">
      <div className="mb-6 text-center">
        <h2
          className="text-lg font-bold leading-relaxed"
          style={{ color: "#FFC940" }}
        >
          {todayQuestion.title}
        </h2>
      </div>

      <div
        className="relative p-8 bg-white shadow-xl rounded-3xl"
        style={{ borderColor: "#FFC940", borderWidth: "1px" }}
      >
        <div className="absolute transform -translate-x-1/2 -top-4 left-1/2">
          <Image
            src="/icons/dog_foot.svg"
            alt="강아지 발바닥"
            width={32}
            height={32}
            style={{ filter: "brightness(0) saturate(100%)", color: "#FFC940" }}
          />
        </div>

        <div className="text-center">
          <p className="mb-6 text-lg font-medium leading-relaxed text-gray-800">
            {todayQuestion.question}
          </p>

          <button
            className="relative px-8 py-2 overflow-hidden text-lg font-bold text-white transition-all duration-300 transform border-2 border-yellow-300 rounded-full shadow-lg group bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-400 hover:from-yellow-500 hover:via-yellow-600 hover:to-amber-500 hover:shadow-xl hover:scale-105 hover:border-yellow-400"
            style={{
              background:
                "linear-gradient(135deg, #FFC940 0%, #FFD700 50%, #FFA500 100%)",
            }}
            onClick={() => {
              gotoEditPage();
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>

            <div className="absolute transform -translate-y-1/2 left-3 top-1/2">
              <Image
                src="/icons/dog_foot.svg"
                alt=""
                width={20}
                height={20}
                className="opacity-60"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>

            <span className="relative z-10 tracking-wider">{linkText}</span>

            <div className="absolute transition-transform duration-300 transform -translate-y-1/2 right-3 top-1/2 group-hover:translate-x-1">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="absolute w-3/4 h-1 transform -translate-x-1/2 bg-yellow-400 rounded-full opacity-50 -bottom-1 left-1/2 blur-sm"></div>
          </button>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="font-medium text-m" style={{ color: "#FFC940" }}>
          오늘도 우리 강아지와 행복한 하루 보내세요! ⭐
        </p>
      </div>
    </div>
  );
}
