"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import GeneralLoading from "./GeneralLoading";

interface AuthContextType {
  isAuthenticated: boolean | null;
  logout: () => void;
  setAuthStatus: (status: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const logout = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
    router.replace("/login");
  };

  const setAuthStatus = (status: boolean) => {
    setIsAuthenticated(status);
  };

  useEffect(() => {
    const checkAuth = () => {
      if (typeof window === "undefined") return;

      try {
        const token = localStorage.getItem("accessToken");
        console.log("token", token);
        const hasToken = !!token;

        setIsAuthenticated(hasToken);

        const isAuthPage = pathname === "/login";
        const isPublicPage = pathname === "/" || pathname === "/login";

        if (hasToken && isAuthPage) {
          router.replace("/main");
        } else if (!hasToken && !isPublicPage) {
          router.replace("/login");
        } else if (!hasToken && pathname === "/") {
          router.replace("/login");
        } else if (hasToken && pathname === "/") {
          router.replace("/main");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsAuthenticated(false);
        router.replace("/login");
      }
    };

    checkAuth();
  }, [pathname, router]);

  // 인증 상태 확인 중
  if (isAuthenticated === null) {
    return <GeneralLoading />;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout, setAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
}
