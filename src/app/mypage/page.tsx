"use client";
import heart from "../../../public/icons/heart.png";
import emptyDogImage from "../../../public/icons/empty-dog.svg";
import fillUserImage from "../../../public/icons/fill-user.svg";
import dogFootIcon from "@/image/dog_foot.svg";
import { layout } from "@/styles/layout";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserInfo, getDogInfo } from "@/api/info/getInfo";
import Image from "next/image";
import { UserInfo, DogInfo } from "@/types/mainInfo";
import { useEffect, useCallback, useState } from "react";
import { mypageList } from "@/lib/static/mypage";
import { MenuItem, MenuItemWithFields } from "@/types/menu";
import { textInput } from "@/styles/input";
import { editUserInfo, editDogInfo } from "@/api/info/postInfo";
import GeneralLoading from "../components/GeneralLoading";
import { hostingImage } from "@/api/common/common";
import { useForm } from "react-hook-form";

interface ProfileForm {
  userInfo: UserInfo;
  dogInfo: DogInfo;
}

function MyPageContent() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting },
    watch,
  } = useForm<ProfileForm>({});

  const {
    data: userInfo,
    isLoading: userLoading,
    isError: userError,
  } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
    select: (data) => data.user,
    retry: false,
  });
  const {
    data: dogInfo,
    isLoading: dogLoading,
    isError: dogError,
  } = useQuery({
    queryKey: ["dogInfo"],
    queryFn: getDogInfo,
    select: (data) => data.dog,
    retry: false,
  });

  useEffect(() => {
    if (userInfo && dogInfo) {
      reset({
        userInfo: {
          ...userInfo,
          profilePhotoUrl: userInfo.profilePhotoUrl || fillUserImage.src,
        },
        dogInfo: {
          ...dogInfo,
          photo: dogInfo.profilePhotoUrl || emptyDogImage.src,
        },
      });
    }
  }, [userInfo, dogInfo, reset]);

  const editUser = useMutation({
    mutationFn: editUserInfo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["userInfo"] }),
  });

  const editDog = useMutation({
    mutationFn: editDogInfo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["dogInfo"] }),
  });

  const onSubmit = useCallback(
    async (data: ProfileForm) => {
      try {
        const formData = new FormData();
        formData.append("file", data.userInfo.profilePhotoUrl);
        const userHostedImage = await hostingImage(formData);
        const userHostedImageId = userHostedImage.profilePhotoId;

        const dogFormData = new FormData();
        dogFormData.append("file", data.dogInfo.profilePhotoUrl);
        const dogHostedImage = await hostingImage(dogFormData);
        const dogHostedImageId = dogHostedImage.profilePhotoId;

        // 유저 정보 업데이트
        await editUser.mutateAsync({
          nickName: data.userInfo.nickName,
          profilePhotoId: userHostedImageId,
        });

        // 강아지 정보 업데이트
        await editDog.mutateAsync({
          name: data.dogInfo.name,
          birthday: new Date(data.dogInfo.birthday),
          firstMetAt: new Date(data.dogInfo.firstMetAt),
          profilePhotoId: dogHostedImageId,
        });

        alert("저장되었습니다!");
      } catch (error) {
        console.error("Error updating info:", error);
        alert("저장 중 오류가 발생했습니다.");
      }
    },
    [editUser, editDog]
  );

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
    }
  };

  const dogPhoto = watch("dogInfo.profilePhotoUrl") as
    | File
    | string
    | undefined;
  const dogPhotoPreview =
    dogPhoto instanceof File
      ? URL.createObjectURL(dogPhoto)
      : dogPhoto || emptyDogImage.src;

  const userPhoto = watch("userInfo.profilePhotoUrl") as
    | File
    | string
    | undefined;
  const userPhotoPreview =
    userPhoto instanceof File
      ? URL.createObjectURL(userPhoto)
      : userPhoto || fillUserImage.src;

  if (userLoading || dogLoading) return <GeneralLoading />;
  if (userError || dogError) return <div>오류가 발생했습니다.</div>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-start w-full h-full overflow-hidden"
    >
      <div className={`${layout.flex.column.center} py-2 md:py-8`}>
        <div className={`${layout.flex.row.center} gap-6 py-2 md:gap-8`}>
          <div className="relative w-16 h-16 group md:w-24 md:h-24">
            <div className="w-16 h-16 overflow-hidden rounded-full md:w-24 md:h-24">
              <Image
                src={userPhotoPreview}
                alt="user"
                width={96}
                height={96}
                className="object-cover w-full h-full"
              />
            </div>
            <label
              htmlFor="userPhoto"
              className="absolute inset-0 flex items-center justify-center invisible transition-all bg-black rounded-full opacity-0 cursor-pointer bg-opacity-40 group-hover:visible group-hover:opacity-100"
            >
              <span className="text-sm text-white">사진 변경</span>
            </label>
            <input
              {...register("userInfo.profilePhotoUrl")}
              type="file"
              id="userPhoto"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setValue("userInfo.profilePhotoUrl", e.target.files[0]);
                }
              }}
            />
          </div>
          <Image src={heart} alt="heart" width={20} height={20} />
          <div className="relative w-16 h-16 group md:w-24 md:h-24">
            <div className="w-16 h-16 overflow-hidden rounded-full md:w-24 md:h-24">
              <Image
                src={dogPhotoPreview}
                alt="dog"
                width={96}
                height={96}
                className="object-cover w-full h-full"
              />
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
              {...register("dogInfo.profilePhotoUrl")}
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setValue("dogInfo.profilePhotoUrl", e.target.files[0]);
                }
              }}
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
      <button
        type="submit"
        className="relative mx-auto transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 w-fit"
        disabled={isSubmitting}
      >
        <Image
          src={dogFootIcon}
          alt="dog foot"
          width={56}
          height={56}
          className="text-black w-14 h-14 hover:text-main-yellow"
          aria-label="register dog"
        />
        <span className="absolute font-medium text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          {isSubmitting ? "저장 중..." : "저장"}
        </span>
      </button>
    </form>
  );
}

export default function MyPage() {
  return (
    <div className={`${layout.flex.list.full} justify-between`}>
      <Header />
      <MyPageContent />
      <Footer />
    </div>
  );
}
