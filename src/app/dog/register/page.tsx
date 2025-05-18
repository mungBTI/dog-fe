import { Suspense } from "react";
import RegisterDogClient from "./RegisterDogClient";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ nickName: string; profilePhotoUrl: string }>;
}) {
  const { nickName, profilePhotoUrl } = await searchParams;

  return (
    <Suspense>
      <RegisterDogClient
        nickName={nickName}
        profilePhotoUrl={profilePhotoUrl}
      />
    </Suspense>
  );
}
