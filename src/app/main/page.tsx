"use client";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Dog from "./_components/Dog";
import TodayQuestion from "./_components/TodayQuestion";
import { getDogSimpleInfo, getUserSimpleInfo } from "@/api/info/getInfo";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import UserInfoBox from "./_components/UserInfo";
import { layout } from "@/styles/layout";
import GeneralLoading from "../components/GeneralLoading";
import { useEffect } from "react";

export default function MainContent() {
  const router = useRouter();

  const {
    data: userInfo,
    error: userError,
    isLoading: userLoading,
  } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserSimpleInfo,
    retry: false,
  });

  const {
    data: dogInfo,
    error: dogError,
    isLoading: dogLoading,
  } = useQuery({
    queryKey: ["dogInfo"],
    queryFn: getDogSimpleInfo,
    retry: false,
  });

  useEffect(() => {
    console.log("useEffect");
    if (userLoading || dogLoading) return;

    if (userError || dogError) {
      if (axios.isAxiosError(userError) && userError.response?.status === 401) {
        router.push("/login");
        return;
      }
      if (axios.isAxiosError(dogError) && dogError.response?.status === 401) {
        router.push("/login");
        return;
      }

      if (
        userInfo &&
        axios.isAxiosError(dogError) &&
        dogError.response?.data?.error_code === 1006
      ) {
        const params = new URLSearchParams({
          nickName: userInfo.user.nickName,
          profilePhotoUrl: userInfo.user.profilePhotoUrl,
        });
        router.replace(`/dog/register?${params.toString()}`);
        return;
      }
    }
  }, [userError, dogError, userInfo, router, userLoading, dogLoading]);

  if (userLoading || dogLoading) return <GeneralLoading />;

  return (
    <div className={`${layout.flex.list.full} justify-between`}>
      <Header />
      <div className="flex flex-col justify-between h-full ">
        {userInfo && dogInfo && (
          <UserInfoBox userInfo={userInfo.user} dogInfo={dogInfo.dog} />
        )}
        <div
          className={`${layout.flex.list.full} items-center justify-center p-4 `}
        >
          <Dog />
          <TodayQuestion />
        </div>
      </div>
      <Footer />
    </div>
  );
}
