"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  EditAnswerForm,
  getAnswerDetailResponse,
  getAnswerId,
  UploadedPhoto,
} from "@/types/answer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getDetailAnswer } from "@/api/answer/getAnswer";
import { use, useEffect, useState } from "react";
import GeneralLoading from "@/app/components/GeneralLoading";
import Mood from "../../_components/Mood";
import { uploadPhoto } from "@/api/answer/postAnswer";
import { patchAnswer } from "@/api/answer/patchAnswer";
import { deleteAnswer } from "@/api/answer/deleteAnswer";
import toast from "react-hot-toast";
import DeleteConfirmModal from "../../_components/DeleteConfirmModal";
import AnswerHeader from "../../_components/AnswerHearder";
import AnswerText from "../../_components/AnswerText";
import AnswerPhoto from "../../_components/AnswerPhoto";

export default function Edit({ params }: getAnswerId) {
  const answerId = use(params).id;
  const router = useRouter();
  const queryClient = useQueryClient();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
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
    if (getDetailData?.answer) {
      reset({
        answerText: getDetailData.answer.answerText,
        mood: getDetailData.answer.mood,
      });
    }
  }, [getDetailData, reset]);

  const uploadMutation = useMutation({
    mutationFn: uploadPhoto,
  });

  const patchMutation = useMutation({
    mutationFn: patchAnswer,
    onSuccess: () => {
      toast.success("답변이 수정되었습니다.");
      queryClient.invalidateQueries({
        queryKey: ["getDetailAnswer", answerId],
      });
      setSelectedFiles([]);
    },
    onError: (error: unknown) => {
      console.error(`오류: ${(error as Error).message}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAnswer,
    onSuccess: () => {
      toast.success("답변이 삭제되었습니다.");
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

    if (
      getDetailData?.answer.answerText === data.answerText &&
      getDetailData?.answer.mood === data.mood &&
      photoIds.length === 0
    ) {
      toast.error("변경된 내용이 없습니다.", {
        icon: "⚠️",
      });
      return;
    }

    const submitData = {
      answerId: answerId,
      formData: {
        answerText: data.answerText,
        ...(data.mood !== getDetailData?.answer?.mood && { mood: data.mood }),
        ...(photoIds.length > 0 && { photoIds }),
      },
    };
    patchMutation.mutate(submitData);
  };

  const handleDelete = () => {
    deleteMutation.mutate({ answerId: answerId });
  };

  return (
    <div className="flex flex-col w-full h-full overflow-x-hidden overflow-y-auto scrollbar-gutter-stable p-2">
      <Mood mood={currentMood} onMoodSelect={handleMoodSelect} />
      <AnswerHeader
        questionText={getDetailData?.answer.questionText ?? ""}
        order={getDetailData?.answer.order ?? 1}
        date={getDetailData?.answer.dateKey ?? ""}
        answerMode="edit"
        onOpen={() => setIsDeleteModalOpen(true)}
      />
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
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
            currentPhotoUrls={getDetailData?.answer.photoUrls}
            onFileSelect={onFileSelect}
          />
        </form>
      </div>
    </div>
  );
}
