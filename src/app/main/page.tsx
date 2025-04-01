import Footer from "../components/Footer";
import Header from "../components/Header";
import Dog from "./_components/Dog";
import TodayQuestion from "./_components/TodayQuestion";
import UserInfo from "./_components/UserInfo";

export default function Page() {
  return (
    <div className="flex flex-col justify-between w-full h-full">
      <Header />
      <div className="flex flex-col justify-between h-full ">
        <UserInfo />
        <div className="flex flex-col items-center justify-center w-full h-full p-4">
          <Dog />
          <TodayQuestion />
        </div>
      </div>
      <Footer />
    </div>
  );
}
