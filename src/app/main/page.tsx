"use client";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Dog from "./_components/Dog";
import TodayQuestion from "./_components/TodayQuestion";
import { getDogSimpleInfo, getUserSimpleInfo } from "@/api/info/getInfo";
import { useRouter } from "next/navigation";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";
import UserInfoBox from "./_components/UserInfo";
import { layout } from "@/styles/layout";
import { useEffect } from "react";
import GeneralLoading from "../components/GeneralLoading";

// 실제 컨텐츠를 보여줄 컴포넌트 분리
function MainContent() {
  const router = useRouter();

  const {
    data: userInfo,
    isLoading: userLoading,
    error: userError,
  } = useQuery({
    queryKey: ["userSimpleInfo"],
    queryFn: getUserSimpleInfo,
    select: (data) => data.user,
  });

  const { data: dogInfo, error: dogError } = useQuery({
    queryKey: ["dogSimpleInfo"],
    queryFn: getDogSimpleInfo,
    retry: false,
    select: (data) => data.dog,
  });

  useEffect(() => {
    if (dogError && userInfo) {
      if (
        axios.isAxiosError(dogError) &&
        dogError.response?.status === 404 &&
        dogError.response?.data?.error_code === 1007
      ) {
        const params = new URLSearchParams({
          nickName: userInfo.nickName,
          profileImage: userInfo.profileImage,
        });
        router.push(`/dog/register?${params.toString()}`);
      } else {
        console.error("강아지 정보 조회 중 에러 발생:", dogError);
      }
    }
    if (userError) {
      if (
        axios.isAxiosError(userError) &&
        userError.response?.status === 404 &&
        userError.response?.data?.error_code === 5003
      ) {
        router.push("/login");
      }
    }
  }, [dogError, userInfo, router, userError]);

  if (userLoading) return <GeneralLoading />;

  return (
    <div className={`${layout.flex.list.full} justify-between`}>
      <Header />
      <div className="flex flex-col justify-between h-full ">
        {userInfo && dogInfo && (
          <UserInfoBox userInfo={userInfo} dogInfo={dogInfo} />
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

// 메인 페이지 컴포넌트
export default function Page() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MainContent />
    </QueryClientProvider>
  );
}
