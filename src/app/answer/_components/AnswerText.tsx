"use client";

import { AnswerTextProps } from "@/types/answer";
import { useEffect, useRef } from "react";

export default function AnswerText({
  register,
  error,
  answerText,
}: AnswerTextProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [answerText]);

  const { ref: hookFormRef, ...rest } = register;

  return (
    <>
      <textarea
        {...rest}
        ref={(e) => {
          hookFormRef(e);
          textareaRef.current = e;
        }}
        className="w-full bg-inherit resize-none overflow-hidden border-none outline-none"
        placeholder="답변 작성..."
        onInput={adjustHeight}
      />
      {error && <p className="text-main-yellow text-sm">{error}</p>}
    </>
  );
}
