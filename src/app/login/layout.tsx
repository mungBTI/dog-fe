"use client";

import MobileLayout from "../components/MobileLayout";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MobileLayout>{children}</MobileLayout>;
}
