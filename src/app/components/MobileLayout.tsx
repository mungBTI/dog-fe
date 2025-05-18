export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen py-4 md:container md:mx-auto md:max-w-sm md:py-8">
      {children}
    </div>
  );
}
