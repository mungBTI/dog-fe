import Header from "./components/Header";

export default function Home() {
  return (
    <main className="flex justify-center w-full min-h-screen">
      <div className="w-full md:container md:mx-auto md:max-w-sm">
        <Header />
      </div>
    </main>
  );
}
