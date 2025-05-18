import { getAnswerToday } from "@/api/question/question";
import { layout } from "@/styles/layout";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export default function TodayQuestion() {
  const { data: questionData } = useQuery({
    queryKey: ["question"],
    queryFn: getAnswerToday,
  });
  const todayQuestion = useMemo(() => {
    const returnObj = {
      question: "",
      title: "",
    };
    if (questionData) {
      returnObj.question = questionData.question.text;
      returnObj.title = "오늘의 질문이 도착했어요!";
    }
    return returnObj;
  }, [questionData]);
  return (
    <div
      className={`${layout.flex.list.full} items-center justify-center gap-4`}
    >
      <span className="text-3xl font-bold">{todayQuestion.title}</span>
      <span className="text-2xl font-medium text-center">
        {todayQuestion.question}
      </span>
    </div>
  );
}
