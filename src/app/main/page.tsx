"use client";
import { useEffect, useState } from "react";
import FlexListFull from "../components/Flex";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Main from "../components/Main";
import Dog from "./_components/Dog";
import TodayQuestion from "./_components/TodayQuestion";
import UserInfoBox from "./_components/UserInfo";
import {
  UserInfo as UserInfoType,
  DogInfo as DogInfoType,
} from "@/types/mainInfo";

export default function Page() {
  const [userInfo, setUserInfo] = useState<UserInfoType>({
    name: "홍길동",
    email: "hong@gmail.com",
    profileImage: "/image/dog_illus/maru.png",
    togetherTime: 0,
  });
  const [dogInfo, setDogInfo] = useState<DogInfoType>({
    name: "마루",
    profileImage: "/image/dog_illus/maru.png",
    togetherDate: new Date(),
    birthDate: new Date(),
    gender: "남자",
  });

  useEffect(() => {
    const calculatedTime =
      Math.floor(
        (new Date().getTime() - dogInfo.togetherDate.getTime()) /
          (1000 * 60 * 60 * 24)
      ) + 1;

    setUserInfo((prev) => ({ ...prev, togetherTime: calculatedTime }));
  }, [dogInfo.togetherDate]);

  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  }, [userInfo]);

  useEffect(() => {
    localStorage.setItem("dogInfo", JSON.stringify(dogInfo));
  }, [dogInfo]);

  return (
    <Main>
      <Header />
      <div className="flex flex-col justify-between h-full ">
        <UserInfoBox userInfo={userInfo} dogInfo={dogInfo} />
        <FlexListFull className="items-center justify-center p-4 ">
          <Dog />
          <TodayQuestion />
        </FlexListFull>
      </div>
      <Footer />
    </Main>
  );
}
