"use client";

import { DeleteConfirm } from "@/types/answer";

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
}: DeleteConfirm) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white p-6 w-[250px] text-center">
        <h2 className="text-lg font-semibold mb-4">답변을 삭제하시겠습니까?</h2>
        <div className="flex justify-center gap-3 mt-4">
          <button
            className="px-4 py-2  bg-gray-200 hover:bg-gray-300"
            onClick={onClose}
          >
            취소
          </button>
          <button
            className="px-4 py-2  bg-red-500 text-white hover:bg-red-600"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
