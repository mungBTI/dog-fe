import MobileLayout from "@/app/components/MobileLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <MobileLayout>{children}</MobileLayout>;
}
