"use client";

import { layout } from "@/styles/layout";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Question from "../../_components/Question";
import AnswerInfo from "../../_components/AnswerInfo";
import Upload from "../../_components/Upload";
import ImagePreview from "../../_components/ImagePreview";
import {
  EditAnswerForm,
  getAnswerDetailResponse,
  getAnswerId,
  UploadedPhoto,
} from "@/types/answer";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getDetailAnswer } from "@/api/answer/getAnswer";
import { use, useEffect, useState } from "react";
import GeneralLoading from "@/app/components/GeneralLoading";
import Feelings from "../../_components/Feelings";
import { uploadPhoto } from "@/api/answer/postAnswer";
import { patchAnswer } from "@/api/answer/patchAnswer";
import { deleteAnswer } from "@/api/answer/deleteAnswer";

export default function Edit({ params }: getAnswerId) {
  const answerId = use(params).id;
  const router = useRouter();

  const [previewImage, setPreviewImage] = useState<string[] | null>();
  const [photoIds, setPhotoIds] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditAnswerForm>();

  const {
    data: getDetailData,
    isError: getDetailIsError,
    error: getDetailError,
    isLoading: getDetailLoading,
  } = useQuery<getAnswerDetailResponse, unknown>({
    queryKey: ["getDetailAnswer", answerId],
    queryFn: () => getDetailAnswer(answerId),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (getDetailData?.answer.answerText) {
      reset({
        answerText: getDetailData.answer.answerText,
      });
    }
  }, [getDetailData, reset]);

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

  const patchMutation = useMutation({
    mutationFn: patchAnswer,
    onSuccess: () => {
      router.back();
    },
    onError: (error: unknown) => {
      console.error(`오류: ${(error as Error).message}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAnswer,
    onSuccess: () => {
      router.back();
    },
    onError: (error: unknown) => {
      console.error(`오류: ${(error as Error).message}`);
    },
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

  const onSubmit = (data: EditAnswerForm) => {
    patchMutation.mutate({
      answerId: answerId,
      formData: {
        answerText: data.answerText,
        photoIds: photoIds,
      },
    });
  };

  const handleBack = () => {
    router.back();
  };

  const handleDelete = () => {
    if (confirm("정말로 답변을 삭제하시겠습니까?")) {
      deleteMutation.mutate({ answerId: answerId });
    }
  };

  const today = new Date();
  const formattedToday = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const isToday = getDetailData?.answer.dateKey === formattedToday;

  return (
    <div className="flex flex-col w-full h-full overflow-x-hidden overflow-y-auto scrollbar-gutter-stable p-2">
      <Feelings />
      <div className="flex flex-col items-start justify-start gap-1 w-full my-3">
        <Question text={getDetailData?.answer.questionText} />
        <div className="flex justify-between w-full">
          <AnswerInfo count={1} date={getDetailData?.answer.dateKey} />
          <div className="flex items-center gap-2">
            <button type="submit" form="answer-form">
              수정
            </button>
            <button onClick={handleBack}>취소</button>
            {!isToday && <button onClick={handleDelete}>삭제</button>}
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
              onChange={handleFileChange}
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
              {(previewImage && previewImage[0]) ||
              getDetailData?.answer.photoUrls[0] ? (
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
