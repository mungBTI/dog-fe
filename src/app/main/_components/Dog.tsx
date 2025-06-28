import Image from "next/image";

export default function Dog({ isDraft }: { isDraft: boolean }) {
  return (
    <div>
      {isDraft ? (
        <Image
          src="/image/dog_illus/letter_dog.png"
          alt="dog"
          width={150}
          height={150}
          priority
          loading="eager"
          className="w-[150px] h-[150px] md:w-[200px] md:h-[200px]"
        />
      ) : (
        <Image
          src="/image/dog_illus/main_dog.png"
          alt="dog"
          width={150}
          height={150}
          priority
          loading="eager"
          className="w-[150px] h-[150px] md:w-[200px] md:h-[200px]"
        />
      )}
    </div>
  );
}
