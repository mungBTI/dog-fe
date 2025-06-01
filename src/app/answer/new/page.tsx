"use client";

import { layout } from "@/styles/layout";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import Mood from "../_components/Mood";

export default function New() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<EditAnswerForm>();

  const currentMood = watch("mood");

  const {
    data: todayData,
    isError: todayIsError,
    error: todayError,
    isLoading: todayIsLoading,
  } = useQuery<TodayAnswerResponse, unknown>({
    queryKey: ["today"],
    queryFn: () => getTodayAnswer(),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (todayData?.answer) {
      reset({
        answerText: todayData.answer.answerText,
        mood: todayData.answer.mood,
      });
    }
  }, [todayData, reset]);

  const [previewImage, setPreviewImage] = useState<string[] | null>(null);
  const [photoIds, setPhotoIds] = useState<string[]>([]);

  const today = new Date();
  const formattedToday = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      return;
    }
    const fileArray = Array.from(files);
    if (fileArray.length > 1) {
      alert("사진 선택은 1장만 가능합니다.");
      e.target.value = "";
      return;
    }
    const previewUrls = URL.createObjectURL(fileArray[0]);
    setPreviewImage([previewUrls]);
    const formData = new FormData();
    formData.append("file", fileArray[0]);
    uploadMutation.mutate(formData);
  };

  const handleMoodSelect = (mood: string) => {
    setValue("mood", mood);
  };

  const onSubmit = (data: EditAnswerForm) => {
    postMutation.mutate({
      answerText: data.answerText,
      photoIds: photoIds,
      mood: data.mood,
    });
  };

  const handleBack = () => {
    router.push(`/main`);
  };

  return (
    <div className="flex flex-col w-full h-full overflow-x-hidden overflow-y-auto scrollbar-gutter-stable p-2">
      <Mood mood={currentMood} onMoodSelect={handleMoodSelect} />
      <div className="flex flex-col items-start justify-start gap-1 w-full my-3">
        <Question text={todayData?.question.text} />
        <div className="flex justify-between w-full">
          <AnswerInfo
            count={todayData?.answer.order ?? 1}
            date={formattedToday}
          />
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
              onChange={handleFileChange}
            />
            <div className="flex flex-wrap gap-2">
              {!previewImage && todayData?.answer.photoUrls[0] && (
                <ImagePreview previewImage={todayData.answer.photoUrls[0]} />
              )}
              {previewImage && previewImage[0] && (
                <ImagePreview previewImage={previewImage[0]} />
              )}
            </div>
            <label
              htmlFor="picture"
              className={`${layout.flex.column.center} w-full bg-white/50 cursor-pointer py-2 mt-2`}
            >
              {previewImage && previewImage[0] ? (
                <Upload uploadType="사진 변경" />
              ) : (
                <Upload uploadType="사진 업로드" />
              )}
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}
