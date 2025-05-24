"use client";

import { layout } from "@/styles/layout";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Today from "../../_components/Today";
import Question from "../../_components/Question";
import AnswerInfo from "../../_components/AnswerInfo";
import Upload from "../../_components/Upload";
import ImagePreview from "../../_components/ImagePreview";
import { EditAnswerForm, getAnswerDetailResponse } from "@/types/answer";
import { useQuery } from "@tanstack/react-query";
import { getDetailAnswer } from "@/api/answer/getAnswer";
import { useState } from "react";
import GeneralLoading from "@/app/components/GeneralLoading";

export default function New() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditAnswerForm>();

  const [previewImage, setPreviewImage] = useState<string[] | null>();

  const {
    data: getDetailData,
    isError: getDetailIsError,
    error: getDetailError,
    isLoading: getDetailLoading,
  } = useQuery<getAnswerDetailResponse, unknown>({
    queryKey: ["getDetailAnswer"],
    queryFn: () => getDetailAnswer("68223327959b5412d9d21703"), // 여기에 실제 answerId를 넣어야 합니다.
  });

  if (getDetailIsError) {
    console.error(`오류: ${(getDetailError as Error).message}`);
  }

  if (getDetailLoading) {
    return (
      <div className={`${layout.flex.list.full} item-center justify-center`}>
        <GeneralLoading />
      </div>
    );
  }

  const name = "세희";

  const onSubmit = () => {
    console.log("수정");
  };

  const handleBack = () => {
    router.back();
  };

  const handleDelete = () => {
    console.log("삭제");
  };

  return (
    <div className="flex flex-col w-full h-full overflow-x-hidden overflow-y-auto scrollbar-gutter-stable p-2">
      <Today name={name} />
      <div className="flex flex-col items-start justify-start gap-1 w-full my-3">
        <Question text={getDetailData?.answer.questionText} />
        <div className="flex justify-between w-full">
          <AnswerInfo count={1} date={getDetailData?.answer.dateKey} />
          <div className="flex items-center gap-2">
            <button type="submit" form="answer-form">
              수정
            </button>
            <button onClick={handleBack}>취소</button>
            <button onClick={handleDelete}>삭제</button>
          </div>
        </div>
      </div>
      <div className="flex w-full h-full flex-wrap gap-1 items-start justify-center">
        <form
          id="answer-form"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-start gap-2 w-full min-h-[300px] py-2"
        >
          <textarea
            className="w-full bg-inherit resize-none overflow-hidden border-none outline-none"
            placeholder="답변 작성..."
            defaultValue={getDetailData?.answer.answerText}
            {...register("answerText", {
              required: {
                value: true,
                message: "답변을 작성해주세요.",
              },
            })}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "auto";
              target.style.height = `${target.scrollHeight}px`;
            }}
          />
          {errors.answerText && (
            <p className="text-main-yellow text-sm">
              {errors.answerText.message}
            </p>
          )}
          <div>
            <input
              id="picture"
              type="file"
              multiple={true}
              className="hidden"
              onChange={(e) => {
                const files = e.target.files;
                if (!files || files.length === 0) {
                  setPreviewImage(null);
                  return;
                }

                const fileArray = Array.from(files);
                const previewUrls = fileArray.map((file) =>
                  URL.createObjectURL(file)
                );
                setPreviewImage(previewUrls);

                const formData = new FormData();

                fileArray.forEach((file) => {
                  formData.append("file", file);
                });
              }}
            />
            {!previewImage && getDetailData?.answer?.photoUrls[0] && (
              <ImagePreview previewImage={getDetailData.answer.photoUrls[0]} />
            )}

            {previewImage?.[0] && (
              <ImagePreview previewImage={previewImage[0]} />
            )}
            <label
              htmlFor="picture"
              className={`${layout.flex.column.center} w-full bg-white/50 cursor-pointer py-2 mt-2`}
            >
              <Upload uploadType="사진 변경" />
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}
