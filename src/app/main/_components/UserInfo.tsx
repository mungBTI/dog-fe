import Image from "next/image";
import { SimpleUserInfo, SimpleDogInfo } from "@/types/mainInfo";
import { layout } from "@/styles/layout";
export default function UserInfoBox({
  userInfo,
  dogInfo,
}: {
  userInfo: SimpleUserInfo;
  dogInfo: SimpleDogInfo;
}) {
  if (!dogInfo.profilePhotoUrl) {
    dogInfo.profilePhotoUrl = "/icons/empty-dog.svg";
  }
  return (
    <div
      className={`${layout.flex.list.full} items-end  gap-2 px-4 py-4 md:py-12 md:px-0`}
    >
      <div className="flex flex-row items-center gap-3">
        <div className="w-[30px] h-[30px] rounded-full overflow-hidden">
          <Image
            src={userInfo.profilePhotoUrl}
            alt="user"
            width={30}
            height={30}
            className="object-cover w-full h-full"
          />
        </div>

        <span className="text-lg font-bold">{userInfo.nickName}</span>
        <Image src="/icons/heart.png" alt="heart" width={20} height={20} />
        <div className="w-[30px] h-[30px] rounded-full overflow-hidden">
          <Image
            src={dogInfo.profilePhotoUrl}
            alt="dog"
            width={30}
            height={30}
            className="object-cover w-full h-full"
          />
        </div>
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
