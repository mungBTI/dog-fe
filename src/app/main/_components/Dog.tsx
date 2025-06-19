import Image from "next/image";

export default function Dog() {
  return (
    <div>
      <Image
        src="/image/dog_illus/main_dog.png"
        alt="dog"
        width={300}
        height={300}
        priority
        loading="eager"
        className="w-[200px] h-[200px] md:w-[300px] md:h-[300px]"
      />
    </div>
  );
}
