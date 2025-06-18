"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { textInput } from "@/styles/input";
import dogFootIcon from "../../../image/dog_foot.svg";
import fillUserImage from "../../../../public/icons/fill-user.svg";
import emptyDogImage from "../../../../public/icons/empty-dog.svg";
import { postDogInfo } from "@/api/info/postInfo";
import { DogInfo, PostDogInfo } from "@/types/mainInfo";
import { useRouter } from "next/navigation";
import { hostingImage } from "@/api/common/common";

export default function RegisterDogClient({
  nickName,
  profilePhotoUrl,
}: {
  nickName: string | null;
  profilePhotoUrl: string | null;
}) {
  const router = useRouter();
  const userName = nickName;
  const userPhoto = profilePhotoUrl;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<DogInfo>({
    defaultValues: {
      birthday: new Date(new Date().setMonth(new Date().getMonth() - 3, 1))
        .toISOString()
        .split("T")[0],
      profilePhotoUrl: emptyDogImage.src,
    },
    mode: "onChange",
  });

  const birthday = watch("birthday");
  const photo = watch("profilePhotoUrl") as File | string;
  const previewUrl =
    photo instanceof File ? URL.createObjectURL(photo) : photo || emptyDogImage;

  const onSubmit = async (data: DogInfo) => {
    try {
      let profilePhotoId = null;

      // 사진이 File로 업로드된 경우에만 이미지 호스팅 진행
      if (data.profilePhotoUrl && data.profilePhotoUrl instanceof File) {
        const formData = new FormData();
        formData.append("file", data.profilePhotoUrl);

        const hostedImage = await hostingImage(formData);
        if (!hostedImage || !hostedImage.profilePhotoId) {
          alert("사진 업로드에 실패했습니다.");
          return;
        }
        profilePhotoId = hostedImage.profilePhotoId;
      }

      console.log(data, "data");

      const postData: PostDogInfo = {
        ...data,
        birthday: new Date(data.birthday),
        firstMetAt: new Date(data.firstMetAt),
        ...(profilePhotoId && { profilePhotoId }), // profilePhotoId가 있을 때만 포함
      };

      await postDogInfo(postData);
      router.push("/main");
    } catch (error) {
      alert("등록에 실패했습니다. 다시 시도해주세요.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-center h-full">
      <div className="flex flex-row gap-2 justify-center items-center">
        <div className="overflow-hidden w-9 h-9 rounded-full">
          <Image
            src={userPhoto || fillUserImage}
            alt="user profile"
            width={70}
            height={70}
          />
        </div>
        <h2 className="text-2xl font-bold">{userName}</h2>
        <span className="text-lg font-bold">님의 강아지를 등록해주세요.</span>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 px-12 py-4 w-full"
      >
        <div className="flex flex-col gap-4 items-center">
          <div className="relative w-24 h-24 group">
            <div className="overflow-hidden w-24 h-24 rounded-full">
              <Image
                src={previewUrl || emptyDogImage}
                alt="dog profile"
                width={100}
                height={100}
                className="object-cover w-full h-full"
              />
            </div>
            <label
              htmlFor="photo"
              className="flex absolute inset-0 invisible justify-center items-center bg-black bg-opacity-40 rounded-full opacity-0 transition-all cursor-pointer group-hover:visible group-hover:opacity-100"
            >
              <span className="text-sm text-white">사진 변경</span>
            </label>
            <input
              {...register("profilePhotoUrl")}
              type="file"
              id="photo"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setValue("profilePhotoUrl", e.target.files[0]);
                }
              }}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="name">강아지 이름</label>
          <input
            {...register("name", {
              required: "강아지 이름을 입력해주세요",
              minLength: { value: 1, message: "1글자 이상 입력해주세요" },
            })}
            type="text"
            placeholder="ex) 뽀삐"
            className={`${textInput.base} `}
          />
          {errors.name && (
            <span className="text-sm text-red-500">{errors.name.message}</span>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="birthday">강아지 생년월일</label>
          <input
            {...register("birthday", {
              required: "생년월일을 입력해주세요",
            })}
            type="date"
            placeholder="강아지 생년월일"
            className={`${textInput.base} `}
          />
          {errors.birthday && (
            <span className="text-sm text-red-500">
              {errors.birthday.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="meetDate">강아지와 처음 만난 날</label>
          <input
            {...register("firstMetAt", {
              required: "처음 만난 날을 입력해주세요",
              validate: (value) => {
                if (new Date(value) < new Date(birthday)) {
                  return "만난 날짜는 생년월일 이후여야 합니다";
                }
                if (new Date(value) > new Date()) {
                  return "미래 날짜는 선택할 수 없습니다";
                }
                return true;
              },
            })}
            type="date"
            placeholder="강아지와 처음 만난 날"
            className={`${textInput.base} `}
          />
          {errors.firstMetAt && (
            <span className="text-sm text-red-500">
              {errors.firstMetAt.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex relative justify-center items-center m-auto w-fit"
        >
          <Image
            src={dogFootIcon}
            alt="dog foot"
            width={56}
            height={56}
            className="w-14 h-14 text-black hover:text-main-yellow"
            aria-label="register dog"
          />
          <span className="absolute pt-4 text-sm text-white pointer-events-none">
            등록
          </span>
        </button>
      </form>
    </div>
  );
}
