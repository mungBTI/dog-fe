import MobileLayout from "../components/MobileLayout";

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MobileLayout>{children}</MobileLayout>;
}
