"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

export default function AuthWrapper({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    // 인증 상태 확인
    const checkAuth = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/verify`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      // 인증되지 않은 경우 리다이렉트
      if (!res.ok) {
        router.push("/sign-in");
      }
    };
    checkAuth();
  }, [router]);

  // 인증 완료 시 자식 컴포넌트 렌더링
  return <>{children}</>;
}
