export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-4 py-2 mx-auto w-full max-w-sm min-h-screen sm:py-4 md:max-w-md lg:max-w-lg">
      {children}
    </div>
  );
}
