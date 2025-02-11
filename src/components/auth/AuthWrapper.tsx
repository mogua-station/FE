"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

export default function AuthWrapper({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/sign-in") return;

    const checkAuth = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user/verify`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (!res.ok) {
          router.replace("/sign-in");
        }
      } catch (error) {
        console.error("인증 확인 중 오류 발생:", error);
        router.replace("/sign-in");
      }
    };

    checkAuth();
  }, [router, pathname]);

  return <>{children}</>;
}
