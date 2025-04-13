"use client";
import heart from "../../../public/icons/heart.png";
import emptyDogImage from "../../../public/icons/empty-dog.svg";
import fillUserImage from "../../../public/icons/fill-user.svg";
import Camera from "../../../public/icons/device-camera.png";
import { layout } from "@/styles/layout";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { getUserInfo, getDogInfo } from "@/api/info/getInfo";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { UserInfo, DogInfo } from "@/types/mainInfo";
import { useEffect, useState } from "react";
import { mypageList } from "@/lib/static/mypage";
import { MenuItem, MenuItemWithFields } from "@/types/menu";
import { textInput } from "@/styles/input";
interface ProfileForm {
  userInfo: UserInfo;
  dogInfo: DogInfo;
}

function MyPageContent() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<ProfileForm>({
    defaultValues: {
      userInfo: {
        profileImage: fillUserImage.src,
      },
      dogInfo: {
        photo: emptyDogImage.src,
      },
    },
  });

  const { data: userInfo, isLoading: userLoading } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
  });

  const { data: dogInfo, isLoading: dogLoading } = useQuery({
    queryKey: ["dogInfo"],
    queryFn: getDogInfo,
    select: (data) => data.dog,
    retry: false,
  });

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    userInfo: false,
    dogInfo: false,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const hasFields = (
    item: MenuItem | MenuItemWithFields
  ): item is MenuItemWithFields => {
    return "fields" in item;
  };

  const handleMenuClick = (
    key: string,
    value: MenuItem | MenuItemWithFields
  ) => {
    if (hasFields(value)) {
      toggleSection(key);
    } else {
      // 각 메뉴별 동작 처리
      switch (key) {
        case "qa":
          // 문의하기 페이지로 이동
          break;
        case "logout":
          // 로그아웃 처리
          break;
        case "deleteAccount":
          // 회원탈퇴 처리
          break;
      }
    }
  };

  useEffect(() => {
    if (userInfo) setValue("userInfo.profileImage", userInfo.profileImage);
    if (dogInfo) setValue("dogInfo.photo", dogInfo.photo || emptyDogImage.src);
  }, [userInfo, dogInfo, setValue]);

  if (userLoading || dogLoading) return <div>로딩중...</div>;
  if (!userInfo || !dogInfo) return null;

  return (
    <form className="flex flex-col justify-start w-full h-full overflow-hidden">
      <div className={`${layout.flex.column.center} py-2 md:py-8`}>
        <div className={`${layout.flex.row.center} gap-6 py-2 md:gap-8`}>
          <div className="relative w-16 h-16 group md:w-24 md:h-24">
            <div className="w-16 h-16 overflow-hidden rounded-full md:w-24 md:h-24">
              <Image
                src={userInfo.profileImage}
                alt="user"
                width={96}
                height={96}
                className="object-cover w-full h-full"
              />
              <div className="absolute bottom-0 right-0 p-1 bg-white rounded-full">
                <Image src={Camera} alt="camera" width={20} height={20} />
              </div>
            </div>
            <label
              htmlFor="userPhoto"
              className="absolute inset-0 flex items-center justify-center invisible transition-all bg-black rounded-full opacity-0 cursor-pointer bg-opacity-40 group-hover:visible group-hover:opacity-100"
            >
              <span className="text-sm text-white">사진 변경</span>
            </label>
            <input
              type="file"
              id="userPhoto"
              accept="image/*"
              className="hidden"
              {...register("userInfo.profileImage")}
            />
          </div>
          <Image src={heart} alt="heart" width={20} height={20} />
          <div className="relative w-16 h-16 group md:w-24 md:h-24">
            <div className="w-16 h-16 overflow-hidden rounded-full md:w-24 md:h-24">
              <Image
                src={dogInfo.photo || emptyDogImage.src}
                alt="dog"
                width={96}
                height={96}
                className="object-cover w-full h-full"
              />
              <div className="absolute bottom-0 right-0 p-1 bg-white rounded-full">
                <Image src={Camera} alt="camera" width={20} height={20} />
              </div>
            </div>
            <label
              htmlFor="dogPhoto"
              className="absolute inset-0 flex items-center justify-center invisible transition-all bg-black rounded-full opacity-0 cursor-pointer bg-opacity-40 group-hover:visible group-hover:opacity-100"
            >
              <span className="text-sm text-white">사진 변경</span>
            </label>
            <input
              type="file"
              id="dogPhoto"
              accept="image/*"
              className="hidden"
              {...register("dogInfo.photo")}
            />
          </div>
        </div>
        <span className="text-lg font-medium">
          <span className="text-lg font-bold">{dogInfo.name}</span>과 함께한지{" "}
          <span className="text-lg font-bold">{dogInfo.togetherFor}일째</span>
        </span>
      </div>
      <div className="w-full px-4 overflow-y-auto">
        {Object.entries(mypageList).map(([key, value]) => (
          <div key={key}>
            <button
              type="button"
              onClick={() => handleMenuClick(key, value)}
              className="flex items-center justify-between w-full py-2"
            >
              <div className="flex items-center gap-3">
                <Image src={value.icon} alt={key} width={24} height={24} />
                <span className="text-lg font-medium">{value.label}</span>
              </div>
              {hasFields(value) && (
                <svg
                  className={`w-5 h-5 transition-transform duration-300 ease-in-out ${
                    openSections[key] ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}
            </button>

            {hasFields(value) && openSections[key] && (
              <div className="pb-4 space-y-3 pl-11">
                {value.fields.map((field, index) => (
                  <div
                    key={index}
                    className={`${layout.flex.row.between} items-center w-full`}
                  >
                    <span className="text-sm text-gray-500">{field.label}</span>
                    {key === "userInfo" && field.label === "이메일" && (
                      <input
                        {...register("userInfo.email")}
                        defaultValue={userInfo.email}
                        className={`${textInput.subInput} w-60`}
                      />
                    )}
                    {key === "userInfo" && field.label === "닉네임" && (
                      <input
                        {...register("userInfo.nickName")}
                        defaultValue={userInfo.nickName}
                        className={`${textInput.subInput}`}
                      />
                    )}
                    {key === "dogInfo" && field.label === "이름" && (
                      <input
                        {...register("dogInfo.name")}
                        defaultValue={dogInfo.name}
                        className={`${textInput.subInput}`}
                      />
                    )}
                    {key === "dogInfo" && field.label === "생년월일" && (
                      <input
                        type="date"
                        {...register("dogInfo.birthday")}
                        defaultValue={dogInfo.birthday}
                        className={`${textInput.subInput}`}
                      />
                    )}
                    {key === "dogInfo" && field.label === "첫 만남 날짜" && (
                      <input
                        type="date"
                        {...register("dogInfo.firstMetAt")}
                        defaultValue={dogInfo.firstMetAt}
                        className={`${textInput.subInput}`}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </form>
  );
}
export default function MyPage() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className={`${layout.flex.list.full} justify-between`}>
        <Header />
        <MyPageContent />
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
