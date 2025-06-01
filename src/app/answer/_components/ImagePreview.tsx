import { ImagePreviewControl } from "@/types/answer";
import Image from "next/image";
export default function ImagePreview({ previewImage }: ImagePreviewControl) {
  return (
    <div className="w-full">
      <Image
        src={previewImage ?? ""}
        alt="Preview"
        width={0}
        height={0}
        sizes="(max-width: 768px) 100vw, 384px"
        className="w-full h-auto"
      />
    </div>
  );
}
