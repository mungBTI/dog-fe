"use client";

import { layout } from "@/styles/layout";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Today from "../../_components/Today";
import Question from "../../_components/Question";
import AnswerInfo from "../../_components/AnswerInfo";
import Upload from "../../_components/Upload";
import ImagePreview from "../../_components/ImagePreview";
import { EditAnswerForm } from "@/types/answer";

export default function New() {
  const router = useRouter();

  const sampleAnswerPartial = {
    questionText: "우리가 처음 만났던 장소는?",
    answerText: "어디일까?",
    dateKey: "2025-05-13",
    photoUrls: ["임의URL1"],
    id: "임의id",
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EditAnswerForm>({
    defaultValues: {
      answer: sampleAnswerPartial.answerText,
      image: sampleAnswerPartial.photoUrls[0],
    },
  });

  const [previewImage, setPreviewImage] = useState<string | null>(
    sampleAnswerPartial.photoUrls[0]
  );
  const imageFileList = watch("image");

  const name = "세희";

  useEffect(() => {
    if (typeof imageFileList === "string" && imageFileList !== "") {
      setPreviewImage(imageFileList);
    } else if (imageFileList && imageFileList.length > 0) {
      const file = imageFileList[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  }, [imageFileList]);

  const onSubmit = (data: EditAnswerForm) => {
    console.log(data);
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
        <Question text={sampleAnswerPartial.questionText} />
        <div className="flex justify-between w-full">
          <AnswerInfo count={1} date={sampleAnswerPartial.dateKey} />
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
            {...register("answer", {
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
          {errors.answer && (
            <p className="text-main-yellow text-sm">{errors.answer.message}</p>
          )}
          <div>
            <input
              {...register("image")}
              id="picture"
              type="file"
              className="hidden"
            />
            {!previewImage && (
              <label
                htmlFor="picture"
                className={`${layout.flex.column.center} w-full bg-white/50 cursor-pointer py-2`}
              >
                <Upload />
              </label>
            )}
          </div>
          {previewImage && (
            <ImagePreview
              previewImage={previewImage}
              onRemove={() => {
                setValue("image", null);
                setPreviewImage(null);
              }}
            />
          )}
        </form>
      </div>
    </div>
  );
}
