"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import ImagePreview from "./ImagePreview";
import Upload from "./Upload";
import { layout } from "@/styles/layout";

type AnswerPhotoProps = {
  currentPhotoUrls?: string[];
  onFileSelect: (files: File[]) => void;
};

export default function AnswerPhoto({
  currentPhotoUrls,
  onFileSelect,
}: AnswerPhotoProps) {
  const [previewImage, setPreviewImage] = useState<string[] | null>();
  const [previewSize, setPreviewSize] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      return;
    }
    const fileArray = Array.from(files);
    if (fileArray.length > 1) {
      toast.error("사진 선택은 1장만 가능합니다.", {
        icon: "⚠️",
      });
      e.target.value = "";
      return;
    }

    const file = fileArray[0];

    const maxSizeInMB = 10;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    const currentSizeInMB = (file.size / (1024 * 1024)).toFixed(2);

    if (file.size > maxSizeInBytes) {
      toast.error(
        `현재 사진 크기는 ${currentSizeInMB}MB입니다. ${maxSizeInMB}MB 이하로 선택해주세요.`,
        {
          icon: "⚠️",
        }
      );
      e.target.value = "";
      return;
    }

    const previewUrls = URL.createObjectURL(file);
    setPreviewImage([previewUrls]);
    setPreviewSize(currentSizeInMB);
    onFileSelect(fileArray);
  };

  return (
    <div>
      <input
        id="picture"
        type="file"
        multiple={true}
        className="hidden"
        onChange={handleFileChange}
      />
      {!previewImage && currentPhotoUrls?.[0] && (
        <ImagePreview previewImage={currentPhotoUrls[0]} />
      )}

      {previewImage?.[0] && (
        <ImagePreview
          previewImage={previewImage[0]}
          previewSize={previewSize}
        />
      )}
      <label
        htmlFor="picture"
        className={`${layout.flex.column.center} w-full bg-white/50 cursor-pointer py-2 mt-2`}
      >
        {previewImage?.[0] || currentPhotoUrls?.[0] ? (
          <Upload uploadType="사진 변경" />
        ) : (
          <Upload uploadType="사진 업로드" />
        )}
      </label>
    </div>
  );
}
