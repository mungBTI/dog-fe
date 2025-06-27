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
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../components/AuthProvider";

export default function MainContent() {
  const [isDraft, setIsDraft] = useState<boolean>(false);

  const router = useRouter();
  const { logout } = useAuth();

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

  const isLoading = userLoading || dogLoading;

  const errorHandler = useMemo(() => {
    if (isLoading) return null;

    const isUnauthorized = (error: unknown) =>
      axios.isAxiosError(error) && error.response?.status === 401;

    if (isUnauthorized(userError) || isUnauthorized(dogError)) {
      return () => logout();
    }

    if (
      userInfo &&
      axios.isAxiosError(dogError) &&
      dogError.response?.data?.error_code === 1006
    ) {
      return () => {
        const params = new URLSearchParams({
          nickName: userInfo.user.nickName,
          profilePhotoUrl: userInfo.user.profilePhotoUrl,
        });
        router.replace(`/dog/register?${params.toString()}`);
      };
    }
    return null;
  }, [userError, dogError, userInfo, router, isLoading, logout]);

  useEffect(() => {
    errorHandler?.();
  }, [errorHandler]);

  if (isLoading) return <GeneralLoading />;

  return (
    <div className={`${layout.flex.list.full} justify-between`}>
      <Header />
      <div
        className="flex flex-col justify-between"
        style={{ height: "inherit" }}
      >
        {userInfo && dogInfo && (
          <UserInfoBox userInfo={userInfo.user} dogInfo={dogInfo.dog} />
        )}
        <div
          className={`${layout.flex.list.full} items-center justify-center p-4 `}
        >
          <Dog isDraft={isDraft} />
          <TodayQuestion setIsDraft={setIsDraft} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
