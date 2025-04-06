import Image from "next/image";
// import maru from "../../../../public/image/dog_illus/maru.png";
import heart from "../../../../public/icons/heart.png";
import {
  UserInfo as UserInfoType,
  DogInfo as DogInfoType,
} from "@/types/mainInfo";

export default function UserInfoBox({
  userInfo,
  dogInfo,
}: {
  userInfo: UserInfoType;
  dogInfo: DogInfoType;
}) {
  return (
    <div className="flex flex-col items-end w-full gap-2 px-4 py-4 md:py-12 md:px-0">
      <div className="flex flex-row items-center gap-3">
        <Image
          src={userInfo.profileImage}
          alt="user"
          width={30}
          height={30}
          className="rounded-full"
        />
        <Image src={heart} alt="heart" width={20} height={20} />
        <span className="text-lg font-bold">{userInfo.name}</span>
      </div>
      <div className="flex flex-row items-center gap-3">
        <span>{dogInfo.name}와</span>
        <span className="text-lg font-bold">{userInfo.togetherTime}</span>
        <span>일 째</span>
      </div>
    </div>
  );
}
