import { ImagePreviewControl } from "@/types/answer";
import Image from "next/image";
export default function ImagePreview({
  previewImage,
  previewSize,
}: ImagePreviewControl) {
  return (
    <div className="relative w-full">
      <Image
        src={previewImage ?? ""}
        alt="Preview"
        width={0}
        height={0}
        sizes="(max-width: 768px) 100vw, 384px"
        className="w-full h-auto"
      />
      {previewSize && (
        <div className="absolute top-1 right-1 bg-white text-black text-[15px] font-bold px-2 py-1">
          {previewSize}MB
        </div>
      )}
    </div>
  );
}
