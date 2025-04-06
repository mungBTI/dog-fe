"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";
import cameraIcon from "../../../public/icons/device-camera.png";
import saveIcon from "../../../public/icons/save-icon-white.png";
import userIcon from "../../../public/icons/person.png";
import dogIcon from "../../../public/icons/dogIcon.png";
import logoutIcon from "../../../public/icons/sign-out.png";
import trashIcon from "../../../public/icons/trash.png";
import expandDownIcon from "../../../public/icons/Expand_down_light.png";
import expandUpIcon from "../../../public/icons/Expand_up_light.png";
import Main from "../components/Main";
import FlexListFull, {
  FlexColumnCenter,
  FlexColumnFullWidth,
  FlexRowCenter,
  FlexRowFullWidth,
} from "../components/Flex";
import { useEffect, useState } from "react";
import { StaticImageData } from "next/image";
import { UserInfo, DogInfo } from "@/types/mainInfo";
import DecoratedInput from "../components/Input";
import DecoratedSelect from "../components/Select";
import DecoratedConfirm from "../components/Confirm";
import { useRouter } from "next/navigation";
type MenuItemType = {
  name: string;
  icon: StaticImageData;
  alt: string;
  open?: boolean;
  onClick: () => void;
};

export default function MyPage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);
  const [dogInfo, setDogInfo] = useState<DogInfo>({} as DogInfo);

  useEffect(() => {
    try {
      const savedUserInfo = JSON.parse(
        localStorage.getItem("userInfo") || "{}"
      );
      const savedDogInfo = JSON.parse(localStorage.getItem("dogInfo") || "{}");

      console.log("localStorage에서 불러온 데이터:", {
        savedUserInfo,
        savedDogInfo,
      });

      // Date 문자열을 Date 객체로 변환
      if (savedDogInfo.birthDate) {
        savedDogInfo.birthDate = new Date(savedDogInfo.birthDate);
      }
      if (savedDogInfo.togetherDate) {
        savedDogInfo.togetherDate = new Date(savedDogInfo.togetherDate);
      }

      setUserInfo(savedUserInfo);
      setDogInfo(savedDogInfo);

      console.log("상태 업데이트 시도 후");
    } catch (error) {
      console.error("localStorage 데이터 로드 중 에러:", error);
    }
  }, []);

  useEffect(() => {
    //이메일 형식인지 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userInfo.email)) {
      console.log("이메일 형식이 올바르지 않습니다.");
    }
  }, [userInfo.email]);
  // localStorage 저장
  useEffect(() => {
    if (Object.keys(userInfo).length > 0 || Object.keys(dogInfo).length > 0) {
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      localStorage.setItem("dogInfo", JSON.stringify(dogInfo));
    }
  }, [userInfo, dogInfo]);

  const [showConfirm, setShowConfirm] = useState<{
    show: boolean;
    type: "logout" | "withdraw" | null;
  }>({
    show: false,
    type: null,
  });

  const [editMenu, setEditMenu] = useState<MenuItemType[]>([
    {
      name: "보호자 정보",
      icon: userIcon,
      alt: "user-info",
      open: false,
      onClick: () => {
        setEditMenu((prev) =>
          prev.map((item) =>
            item.alt === "user-info" ? { ...item, open: !item.open } : item
          )
        );
      },
    },
    {
      name: "반려동물 정보",
      icon: dogIcon,
      alt: "dog-info",
      open: false,
      onClick: () => {
        setEditMenu((prev) =>
          prev.map((item) =>
            item.alt === "dog-info" ? { ...item, open: !item.open } : item
          )
        );
      },
    },
    {
      name: "로그아웃",
      icon: logoutIcon,
      alt: "logout",
      onClick: () => {
        setShowConfirm({ show: true, type: "logout" });
      },
    },
    {
      name: "회원 탈퇴",
      icon: trashIcon,
      alt: "withdraw",
      onClick: () => {
        setShowConfirm({ show: true, type: "withdraw" });
      },
    },
  ]);
  return (
    <Main>
      <Header />
      <FlexColumnCenter className="w-full p-8 h-fit" aria-label="profile">
        <FlexColumnCenter className="gap-4 " aria-label="profile-info">
          <FlexRowCenter className="relative" aria-label="profile image">
            <Image
              src={userInfo.profileImage || "/image/dog_illus/maru.png"}
              alt="mypage"
              width={120}
              height={120}
              className="rounded-full"
            />
            <button className="absolute bottom-0 right-0 flex items-center justify-center p-1 transition-all duration-200 bg-white rounded-full hover:bg-gray-50 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400">
              <Image
                src={cameraIcon}
                alt="camera"
                width={20}
                height={20}
                className="opacity-70"
              />
            </button>
          </FlexRowCenter>
          <FlexRowCenter className="gap-1 text-lg">
            <span>
              <span>{dogInfo.name}</span>와 함께한지
            </span>
            <span className="text-lg font-bold">
              {userInfo.togetherTime}일 째
            </span>
          </FlexRowCenter>
        </FlexColumnCenter>
      </FlexColumnCenter>
      <FlexListFull className="items-start justify-center ">
        <FlexListFull className="items-start justify-start gap-4 text-xl">
          {editMenu.map((menu) => (
            <div key={menu.name} className="w-full">
              <div
                className="flex items-center justify-between w-full"
                onClick={menu.onClick}
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={menu.icon}
                    alt={menu.alt}
                    width={20}
                    height={20}
                  />
                  <span
                    className={`${
                      (menu.alt === "logout" || menu.alt === "withdraw") &&
                      "text-gray-400 font-medium"
                    }`}
                  >
                    {menu.name}
                  </span>
                </div>
                {(menu.alt === "user-info" || menu.alt === "dog-info") && (
                  <button>
                    <Image
                      src={menu.open ? expandUpIcon : expandDownIcon}
                      alt="under-arrow"
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </button>
                )}
              </div>
              {menu.open && (
                <FlexColumnFullWidth>
                  {menu.alt === "user-info" ? (
                    <>
                      <FlexRowFullWidth className="justify-between p-2 text-base">
                        <span>닉네임</span>
                        <DecoratedInput
                          type="text"
                          value={userInfo.name}
                          onChange={(e) => {
                            setUserInfo({ ...userInfo, name: e.target.value });
                            setIsEditing(true);
                          }}
                          label="닉네임"
                        />
                      </FlexRowFullWidth>
                      <FlexRowFullWidth className="justify-between p-2 text-base">
                        <span>이메일</span>
                        <DecoratedInput
                          type="text"
                          value={userInfo.email}
                          onChange={(e) => {
                            setUserInfo({ ...userInfo, email: e.target.value });
                            setIsEditing(true);
                          }}
                          label="이메일"
                        />
                      </FlexRowFullWidth>
                    </>
                  ) : (
                    <>
                      <FlexRowFullWidth className="justify-between p-2 text-base">
                        <span>반려동물 이름</span>
                        <DecoratedInput
                          type="text"
                          value={dogInfo.name}
                          onChange={(e) => {
                            setDogInfo({ ...dogInfo, name: e.target.value });
                            setIsEditing(true);
                          }}
                          label="반려동물 이름"
                        />
                      </FlexRowFullWidth>
                      <FlexRowFullWidth className="justify-between p-2 text-base">
                        <span>성별</span>
                        <DecoratedSelect
                          options={["남자", "여자"]}
                          value={dogInfo.gender}
                          onChange={(e) => {
                            setDogInfo({ ...dogInfo, gender: e.target.value });
                            setIsEditing(true);
                          }}
                          label="성별"
                        ></DecoratedSelect>
                      </FlexRowFullWidth>
                      <FlexRowFullWidth className="justify-between p-2 text-base">
                        <span>생년월일</span>
                        <DecoratedInput
                          type="date"
                          value={
                            dogInfo.birthDate instanceof Date
                              ? dogInfo.birthDate.toISOString().split("T")[0]
                              : new Date().toISOString().split("T")[0]
                          }
                          onChange={(e) => {
                            try {
                              setDogInfo({
                                ...dogInfo,
                                birthDate: new Date(e.target.value),
                              });
                              setIsEditing(true);
                            } catch (error) {
                              alert("날짜 형식이 올바르지 않습니다.");
                              console.error("날짜 형식 오류:", error);
                            }
                          }}
                          label="생년월일"
                        />
                      </FlexRowFullWidth>
                      <FlexRowFullWidth className="justify-between p-2 text-base">
                        <span>처음 만난 날</span>
                        <DecoratedInput
                          type="date"
                          value={
                            dogInfo.togetherDate.toISOString().split("T")[0]
                          }
                          onChange={(e) => {
                            try {
                              setDogInfo({
                                ...dogInfo,
                                togetherDate: new Date(e.target.value),
                              });
                            } catch (error) {
                              alert("날짜 형식이 올바르지 않습니다.");
                              console.error("날짜 형식 오류:", error);
                            }
                          }}
                          label="처음 만난 날"
                        />
                      </FlexRowFullWidth>
                    </>
                  )}
                </FlexColumnFullWidth>
              )}
            </div>
          ))}
          {isEditing && (
            <button className="flex items-center gap-2 px-2 py-1 ml-auto text-white rounded-md w-fit bg-main-yellow">
              <Image src={saveIcon} alt="save" width={20} height={20} />
              저장
            </button>
          )}
        </FlexListFull>
      </FlexListFull>
      <Footer />
      {showConfirm.show && (
        <DecoratedConfirm
          className=" animate-[fadeIn_0.2s_ease-in-out]"
          title={showConfirm.type === "logout" ? "로그아웃" : "회원 탈퇴"}
          message={
            showConfirm.type === "logout"
              ? "정말 로그아웃 하시겠습니까?"
              : "탈퇴하면 정보가 모두 사라집니다.\n정말 탈퇴하시겠습니까?"
          }
          onConfirm={() => {
            if (showConfirm.type === "logout") {
              localStorage.removeItem("userInfo");
              localStorage.removeItem("dogInfo");
              router.push("/login");
              // 로그아웃 로직
            } else {
              localStorage.removeItem("userInfo");
              localStorage.removeItem("dogInfo");
              router.push("/login");
              // 회원탈퇴 로직
            }
            setShowConfirm({ show: false, type: null });
          }}
          onCancel={() => {
            setShowConfirm({ show: false, type: null });
          }}
        />
      )}
    </Main>
  );
}
