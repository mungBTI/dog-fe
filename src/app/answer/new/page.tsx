"use client";

import { layout } from "@/styles/layout";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Today from "../_components/Today";
import Question from "../_components/Question";
import AnswerInfo from "../_components/AnswerInfo";
import Upload from "../_components/Upload";
import ImagePreview from "../_components/ImagePreview";
import { useRouter } from "next/navigation";
import {
  EditAnswerForm,
  TodayAnswerResponse,
  UploadedPhoto,
} from "@/types/answer";
import { getTodayAnswer } from "@/api/answer/getAnswer";
import { useMutation, useQuery } from "@tanstack/react-query";
import GeneralLoading from "@/app/components/GeneralLoading";
import { postTodayAnswer, uploadPhoto } from "@/api/answer/postAnswer";

export default function New() {
  const router = useRouter();

  const {
    data: todayData,
    isError: todayIsError,
    error: todayError,
    isLoading: todayIsLoading,
  } = useQuery<TodayAnswerResponse, unknown>({
    queryKey: ["today"],
    queryFn: () => getTodayAnswer(),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EditAnswerForm>();

  const [previewImage, setPreviewImage] = useState<string[] | null>();
  // const imageFileList = watch("photoIds");
  const [photoIds, setPhotoIds] = useState<string[]>([]);

  const today = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  // 이 부분의 임의 입니다.
  const name = "세희";

  const postMutation = useMutation({
    mutationFn: postTodayAnswer,
    onSuccess: () => {
      router.push(`/main`);
    },
    onError: (error: unknown) => {
      console.error(`오류: ${(error as Error).message}`);
    },
  });

  const uploadMutation = useMutation({
    mutationFn: uploadPhoto,
    onSuccess: (data) => {
      const getPhotoIds = data.photos.map((photo: UploadedPhoto) => photo.id);
      setPhotoIds(getPhotoIds);
      postMutation.mutate({
        answerText: watch("answerText"),
        photoIds: getPhotoIds,
      });
    },
    onError: (error: unknown) => {
      console.error(`오류: ${(error as Error).message}`);
    },
  });

  if (todayIsError) {
    console.error(`오류: ${(todayError as Error).message}`);
  }

  if (todayIsLoading) {
    return (
      <div className={`${layout.flex.list.full} item-center justify-center`}>
        <GeneralLoading />
      </div>
    );
  }

  const onSubmit = (data: EditAnswerForm) => {
    postMutation.mutate({
      answerText: data.answerText,
      photoIds: photoIds,
    });
  };

  const handleBack = () => {
    router.push(`/main`);
  };

  return (
    <div className="flex flex-col w-full h-full overflow-x-hidden overflow-y-auto scrollbar-gutter-stable p-2">
      <Today name={name} />
      <div className="flex flex-col items-start justify-start gap-1 w-full my-3">
        <Question text={todayData?.question.text} />
        <div className="flex justify-between w-full">
          <AnswerInfo count={1} date={today} />
          <div className="flex items-center gap-3">
            <button form="answer-form">저장</button>
            <button onClick={handleBack}>취소</button>
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
            defaultValue={todayData?.answer.answerText}
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
                console.log(files);
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

                uploadMutation.mutate(formData);
              }}
            />
            <div className="flex flex-wrap gap-2">
              {todayData?.answer?.photoUrls?.map((url, index) => (
                <ImagePreview key={index} previewImage={url} />
              ))}
              {previewImage?.map((img, index) => (
                <ImagePreview key={index} previewImage={img} />
              ))}
            </div>
            <label
              htmlFor="picture"
              className={`${layout.flex.column.center} w-full bg-white/50 cursor-pointer py-2 mt-2`}
            >
              <Upload />
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}
