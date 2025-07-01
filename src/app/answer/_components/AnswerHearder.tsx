"use client";

import { AnswerHeaderProps } from "@/types/answer";
import AnswerInfo from "./AnswerInfo";
import Question from "./Question";

export default function AnswerHeader({
  questionText,
  order,
  date,
  answerMode,
  onOpen,
}: AnswerHeaderProps) {
  const today = new Date();
  const formattedToday = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const isToday = date === formattedToday;

  return (
    <div className="flex flex-col items-start justify-start gap-1 w-full my-3">
      <Question text={questionText} />
      <div className="flex justify-between w-full">
        <AnswerInfo count={order ?? 1} date={date} />
        <div className="flex items-center gap-3">
          {answerMode === "edit" ? (
            <>
              <button type="submit" form="answer-form">
                수정
              </button>
              {!isToday && <button onClick={onOpen}>삭제</button>}
            </>
          ) : (
            <button type="submit" form="answer-form">
              저장
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
