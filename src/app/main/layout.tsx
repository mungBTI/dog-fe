import MobileLayout from "../components/MobileLayout";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MobileLayout>{children}</MobileLayout>;
}
