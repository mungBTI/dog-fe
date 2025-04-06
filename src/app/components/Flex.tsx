type FlexProps = {
  children: React.ReactNode;
  className?: string;
};

// default export
export default function FlexListFull({ children, className = "" }: FlexProps) {
  return (
    <div className={`flex flex-col w-full h-full ${className}`}>{children}</div>
  );
}

// 다른 컴포넌트들은 named export
export function FlexColumnCenter({ children, className = "" }: FlexProps) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {children}
    </div>
  );
}
export function FlexColumnFullWidth({ children, className = "" }: FlexProps) {
  return <div className={`flex flex-col w-full ${className}`}>{children}</div>;
}
export function FlexRowFullWidth({ children, className = "" }: FlexProps) {
  return <div className={`flex flex-row w-full ${className}`}>{children}</div>;
}

export function FlexRowCenter({ children, className = "" }: FlexProps) {
  return (
    <div className={`flex flex-row items-center justify-center ${className}`}>
      {children}
    </div>
  );
}

// ... 기타 컴포넌트들
