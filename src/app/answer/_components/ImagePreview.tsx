import { ImagePreviewControl } from "@/types/answer";

export default function ImagePreview({ previewImage }: ImagePreviewControl) {
  return (
    <div className="relative w-full">
      <img
        src={previewImage}
        alt="Preview"
        className="w-full h-auto object-contain"
      />
    </div>
  );
}
