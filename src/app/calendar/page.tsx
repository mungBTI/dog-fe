"use client";

import { CalendarDay, DayPicker, Modifiers } from "react-day-picker";
import { layout } from "@/styles/layout";
import { ko } from "date-fns/locale";
import Header from "../components/Header";
import { useEffect, useMemo, useState } from "react";
import Footer from "../components/Footer";
import { useQuery } from "@tanstack/react-query";
import { getMonthAnswer, getQuestion } from "@/api/calendar/getAnswer";
import {
  AnswerResponse,
  Answers,
  Question,
  QuestionResponse,
} from "@/types/calendar";
import GeneralLoading from "../components/GeneralLoading";
import { useRouter } from "next/navigation";

export default function Calendar() {
  const router = useRouter();
  const today = new Date();

  const [month, setMonth] = useState(today);
  const [selected, setSelected] = useState<Date | undefined>(new Date());
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);

  const {
    data: listData,
    isError: listIsError,
    error: listError,
    isLoading: listIsLoading,
  } = useQuery<AnswerResponse, unknown, Answers[]>({
    queryKey: [
      "answer",
      { year: month.getFullYear(), month: month.getMonth() + 1 },
    ],
    queryFn: () => getMonthAnswer(month.getFullYear(), month.getMonth() + 1),
    select: (data) => data.answers.filter((answer) => !answer.isDraft),
  });

  if (listIsError) {
    console.error(`오류: ${(listError as Error).message}`);
  }

  const answeredDates = useMemo(() => {
    return (
      (listData
        ?.map(
          ({ date }) => new Date(month.getFullYear(), month.getMonth(), date)
        )
        .filter(Boolean) as Date[]) || []
    );
  }, [listData, month]);

  useEffect(() => {
    if (selected && listData) {
      const selectedDayAnswer = listData.find(
        ({ date }) => date === selected.getDate()
      );
      setSelectedAnswerId(selectedDayAnswer?.id || null);
    } else {
      setSelectedAnswerId(null);
    }
  }, [selected, listData]);

  const {
    data: questionData,
    isError: questionIsError,
    error: questionError,
    isLoading: questionIsLoading,
  } = useQuery<QuestionResponse, unknown, Question>({
    queryKey: ["question", selectedAnswerId],
    queryFn: () => {
      if (!selectedAnswerId) return Promise.reject("ID가 없습니다");
      return getQuestion(selectedAnswerId);
    },
    select: (data) => data.answer,
    enabled: !!selectedAnswerId,
  });

  if (questionIsError) {
    console.error(`오류: ${(questionError as Error).message}`);
  }

  if (listIsLoading || questionIsLoading) {
    return <GeneralLoading />;
  }

  const onClick = (answerId: string) => {
    router.push(`/answer/${answerId}/edit`);
  };

  return (
    <div className={`${layout.flex.list.full} justify-between`}>
      <Header />
      <div
        className={`${layout.flex.list.full} items-center justify-start pt-6 `}
      >
        <DayPicker
          hideNavigation
          captionLayout="dropdown"
          mode="single"
          selected={selected}
          onSelect={setSelected}
          locale={ko}
          month={month}
          onMonthChange={setMonth}
          formatters={{
            formatYearDropdown: (year) => `${year.getFullYear()}년`,
          }}
          modifiers={{ answered: answeredDates }}
          components={{
            DayButton: (
              props: {
                day: CalendarDay;
                modifiers: Modifiers;
              } & React.HTMLAttributes<HTMLButtonElement>
            ) => {
              const { day, modifiers, className, ...rest } = props;

              const isToday = modifiers.today;
              const isSelected = modifiers.selected;

              let todayClass = "";

              if (isToday && !isSelected) {
                todayClass = "font-bold text-red-500";
              }

              return (
                <button
                  className={`${className} ${todayClass} w-full min-h-[50px] flex flex-col items-center justify-start p-2`}
                  {...rest}
                >
                  <div
                    className={
                      isSelected
                        ? "w-5 h-5 rounded-full bg-main-yellow text-white flex items-center justify-center"
                        : "w-5 h-5 flex items-center justify-center"
                    }
                  >
                    {day.date.getDate()}
                  </div>

                  {modifiers.answered && (
                    <div className="w-1.5 h-1.5 bg-main-yellow rounded-full mt-1" />
                  )}
                </button>
              );
            },
          }}
          classNames={{
            root: `w-full p-0 mb-4 rounded-lg`,
            months: `w-full h-full flex items-center `,
            month: `w-full h-full flex flex-col p-4`,
            caption_label: `hidden`,
            dropdowns: `flex flex-row-reverse justify-start gap-2 h-8 font-semibold mb-3`,
            years_dropdown: `text-center`,
            months_dropdown: `text-center`,
            month_caption: `flex items-center justify-start`,
          }}
          style={{
            height: "fit-content",
            boxShadow: "0px 1px 8px #d9d9d9",
          }}
        />
        <div>
          <div>
            <div className="flex justify-end w-[300px] md:w-[400px] mt-1 text-main-yellow font-semibold">
              <button
                onClick={() => {
                  setMonth(today);
                  setSelected(today);
                }}
              >
                오늘로 돌아가기
              </button>
            </div>
          </div>
          <div className="flex w-[300px] md:w-[400px] h-3 md:h-4 text-left mt-3 text-[16px] md:text-lg font-semibold">
            <div>{selected?.toLocaleDateString()}</div>
          </div>
          <div className="w-[300px] md:w-[400px] min-h-12 md:min-h-14 text-left mt-3 text-[16px] md:text-lg font-semibold">
            {questionData?.questionText ? (
              <p>{questionData?.questionText}</p>
            ) : (
              <p>기록하지 않은 날입니다.</p>
            )}
          </div>
          {questionData && (
            <div className="flex justify-center">
              <button
                type="button"
                title="수정"
                className="flex items-center gap-2 px-4 py-2 text-lg font-extrabold text-white transition-all duration-300 transform w-fit bg-main-yellow rounded-2xl hover:bg-yellow-500 hover:scale-105 hover:shadow-lg active:scale-95 active:shadow-sm"
                onClick={() => onClick(questionData.id)}
              >
                <span className="relative z-10 tracking-wider">수정</span>
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
