"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import toast from "react-hot-toast";
import AnswerHeader from "../_components/AnswerHearder";
import AnswerText from "../_components/AnswerText";
import AnswerPhoto from "../_components/AnswerPhoto";

export default function New() {
  const router = useRouter();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<EditAnswerForm>();

  const currentMood = watch("mood");
  const answerText = watch("answerText");
  const { ref: hookFormRef, ...rest } = register("answerText", {
    required: {
      value: true,
      message: "답변을 작성해주세요.",
    },
  });

  const {
    data: todayData,
    isError: todayIsError,
    error: todayError,
    isLoading: todayIsLoading,
  } = useQuery<TodayAnswerResponse, unknown>({
    queryKey: ["today"],
    queryFn: () => getTodayAnswer(),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 0,
  });

  useEffect(() => {
    if (todayData?.answer) {
      reset({
        answerText: todayData.answer.answerText,
        mood: todayData.answer.mood,
      });
    }
  }, [todayData, reset]);

  const today = new Date();
  const formattedToday = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const postMutation = useMutation({
    mutationFn: postTodayAnswer,
    onSuccess: (data) => {
      toast.success("답변이 저장되었습니다.");
      const answerId = data.answer.id;
      router.push(`${answerId}/edit`);
    },
    onError: (error: unknown) => {
      console.error(`오류: ${(error as Error).message}`);
    },
  });

  const uploadMutation = useMutation({
    mutationFn: uploadPhoto,
  });

  if (todayIsError) {
    console.error(`오류: ${(todayError as Error).message}`);
  }

  if (todayIsLoading) {
    return <GeneralLoading />;
  }

  const onFileSelect = (files: File[]) => {
    setSelectedFiles(files);
  };

  const handleMoodSelect = (mood: string) => {
    setValue("mood", mood);
  };

  const onSubmit = async (data: EditAnswerForm) => {
    let photoIds: string[] = [];

    if (selectedFiles.length > 0) {
      const formData = new FormData();
      formData.append("file", selectedFiles[0]);
      try {
        const uploadResult = await uploadMutation.mutateAsync(formData);
        photoIds = uploadResult.photos.map((photo: UploadedPhoto) => photo.id);
      } catch (error) {
        console.error(`사진 업로드 오류: ${(error as Error).message}`);
        return;
      }
    }

    const submitData = {
      answerText: data.answerText,
      ...(data.mood !== todayData?.answer?.mood && { mood: data.mood }),
      ...(photoIds.length > 0 && { photoIds }),
    };
    postMutation.mutate(submitData);
  };

  return (
    <div className="flex flex-col w-full h-full overflow-x-hidden overflow-y-auto scrollbar-gutter-stable p-2">
      <Mood mood={currentMood} onMoodSelect={handleMoodSelect} />
      <AnswerHeader
        questionText={todayData?.question.text ?? ""}
        order={todayData?.answer.order ?? 1}
        date={formattedToday}
        answerMode="new"
      />
      <div className="flex w-full h-full flex-wrap gap-1 items-start justify-center">
        <form
          id="answer-form"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-start gap-2 w-full min-h-[300px] py-2"
        >
          <AnswerText
            register={{ ref: hookFormRef, ...rest }}
            error={errors.answerText?.message}
            answerText={answerText}
          />
          <AnswerPhoto
            currentPhotoUrls={todayData?.answer.photoUrls}
            onFileSelect={onFileSelect}
          />
        </form>
      </div>
    </div>
  );
}
