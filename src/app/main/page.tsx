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

// 실제 컨텐츠를 보여줄 컴포넌트 분리
function MainContent() {
  const router = useRouter();

  const { data: userInfo, isLoading: userLoading } = useQuery({
    queryKey: ["userSimpleInfo"],
    queryFn: getUserSimpleInfo,
  });

  const { data: dogInfo, error: dogError } = useQuery({
    queryKey: ["dogSimpleInfo"],
    queryFn: getDogSimpleInfo,
    retry: false,
  });

  useEffect(() => {
    if (dogError && userInfo) {
      if (
        axios.isAxiosError(dogError) &&
        dogError.response?.status === 404 &&
        dogError.response?.data?.message === "등록된 강아지가 없습니다."
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
  }, [dogError, userInfo, router]);

  if (userLoading) return <div>로딩중...</div>;

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
