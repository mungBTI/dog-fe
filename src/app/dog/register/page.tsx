import { Suspense } from "react";
import RegisterDogClient from "./RegisterDogClient";

export default function Page() {
  return (
    <Suspense>
      <RegisterDogClient />
    </Suspense>
  );
}
