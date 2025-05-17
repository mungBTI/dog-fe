import MobileLayout from "@/app/components/MobileLayout";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { layout } from "@/styles/layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <MobileLayout>
      <div className={`${layout.flex.list.full} justify-between`}>
        <Header />
        {children}
      </div>
      <Footer />
    </MobileLayout>
  );
}
