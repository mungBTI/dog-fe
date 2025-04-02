"use client";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen py-8 md:container md:mx-auto md:max-w-sm">
      {children}
    </div>
  );
}
