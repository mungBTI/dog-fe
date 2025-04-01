"use client";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="animate-[fadeIn_0.5s_ease-in-out] opacity-0"
      style={{
        animationFillMode: "forwards",
        animationDelay: "100ms", // 약간의 지연을 주어 리소스 로딩 시간 확보
      }}
    >
      {children}
    </div>
  );
}
