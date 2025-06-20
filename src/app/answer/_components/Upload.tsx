import Image from "next/image";

type UploadProps = {
  uploadType: string;
};

export default function Upload({ uploadType }: UploadProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <Image
        src={"/icons/upload.png"}
        alt="Upload"
        width={20}
        height={20}
        className="w-5 h-5 object-cover"
      />
      <p>{uploadType}</p>
    </div>
  );
}
