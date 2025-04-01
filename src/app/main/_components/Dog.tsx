import Image from "next/image";
import dog from "../../../../public/image/dog_illus/main_dog.png";

export default function Dog() {
  return (
    <div>
      <Image
        src={dog}
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
