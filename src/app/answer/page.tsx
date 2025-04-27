"use client";

import { CalendarDay, DayPicker, Modifiers } from "react-day-picker";
import { layout } from "@/styles/layout";
import { ko } from "date-fns/locale";
import Header from "../components/Header";
import { useState } from "react";
import Footer from "../components/Footer";

export default function Answer() {
  const [selected, setSelected] = useState<Date>();
  const answeredDays = [
    new Date("2025-04-08"),
    new Date("2025-04-09"),
    new Date("2025-04-11"),
  ];

  return (
    <div className={`${layout.flex.list.full} justify-between`}>
      <Header />
      <div
        className={`${layout.flex.column.fullWidth} w-[300px] md:w-[400px] items-center justify-start my-4 gap-5`}
      >
        <DayPicker
          hideNavigation
          captionLayout="dropdown"
          mode="single"
          selected={selected}
          onSelect={setSelected}
          locale={ko}
          formatters={{
            formatYearDropdown: (year) => `${year.getFullYear()}년`,
          }}
          modifiers={{ answered: answeredDays }}
          components={{
            DayButton: (
              props: {
                day: CalendarDay;
                modifiers: Modifiers;
              } & React.HTMLAttributes<HTMLButtonElement>
            ) => {
              const { day, modifiers, className, ...rest } = props;
              const todayClass = modifiers.today
                ? `border-2 border-main-yellow`
                : "";

              return (
                <button
                  className={`${className} ${todayClass} w-full h-full text-center flex flex-col items-center justify-start p-2`}
                  {...rest}
                >
                  <div>{day.date.getDate()}</div>
                  {modifiers.answered && (
                    <div className="w-1.5 h-1.5 bg-main-yellow rounded-full mt-1" />
                  )}
                </button>
              );
            },
          }}
          classNames={{
            selected: `bg-main-yellow text-white`,
            root: ` w-[300px] md:w-[400px] h-[400px] shadow-lg p-6 bg-white rounded-lg`,
            day: `text-center md:w-[50px] md:h-[50px]`,
            caption_label: `hidden`,
            dropdowns: `flex flex-row-reverse gap-2 h-8 font-semibold`,
            years_dropdown: `text-center`,
            months_dropdown: `text-center`,
          }}
        />
        <div className="w-[300px] md:w-[400px] h-5 text-left mt-4 text-lg font-semibold">
          {selected?.toLocaleDateString()}
        </div>
        <div className="w-[300px] md:w-[400px] h-12 text-left m-4 text-lg font-semibold">
          {answeredDays.some(
            (day) => selected?.toDateString() === day.toDateString()
          ) && <p>질문이 들어갈 자리입니다.</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
}
