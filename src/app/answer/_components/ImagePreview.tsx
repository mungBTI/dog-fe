import { ImagePreviewControl } from "@/types/answer";

export default function ImagePreview({
  previewImage,
  onRemove,
}: ImagePreviewControl) {
  return (
    <div className="relative w-full">
      <img
        src={previewImage}
        alt="Preview"
        className="w-full h-auto object-contain"
      />
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-1 right-2 text-white font-bold text-3xl p-3"
      >
        x
      </button>
    </div>
  );
}
