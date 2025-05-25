import { ImagePreviewControl } from "@/types/answer";
import Image from "next/image";
export default function ImagePreview({ previewImage }: ImagePreviewControl) {
  return (
    <div className="relative w-full">
      <Image
        src={previewImage ?? ""}
        alt="Preview"
        className="object-contain w-full h-auto"
      />
    </div>
  );
}
