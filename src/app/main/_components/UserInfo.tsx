import Image from "next/image";
import heart from "../../../../public/icons/heart.png";
import { SimpleUserInfo, SimpleDogInfo } from "@/types/mainInfo";
import emptyDogImage from "../../../../public/icons/empty-dog.svg";
import { layout } from "@/styles/layout";
export default function UserInfoBox({
  userInfo,
  dogInfo,
}: {
  userInfo: SimpleUserInfo;
  dogInfo: SimpleDogInfo;
}) {
  if (!dogInfo.photo) {
    dogInfo.photo = emptyDogImage.src;
  }
  return (
    <div
      className={`${layout.flex.list.full} items-end  gap-2 px-4 py-4 md:py-12 md:px-0`}
    >
      <div className="flex flex-row items-center gap-3">
        <Image
          src={userInfo.profileImage}
          alt="user"
          width={30}
          height={30}
          className="rounded-full"
        />
        <span className="text-lg font-bold">{userInfo.nickName}</span>
        <Image src={heart} alt="heart" width={20} height={20} />
        <Image
          src={dogInfo.photo}
          alt="dog"
          width={30}
          height={30}
          className="rounded-full"
        />
        <span className="text-lg font-bold">{dogInfo.name}</span>
      </div>
      <div className="flex flex-row items-center gap-3">
        <span>{dogInfo.name}와</span>
        <span className="text-lg font-bold">{dogInfo.togetherFor}</span>
        <span>일 째</span>
      </div>
    </div>
  );
}
