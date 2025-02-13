import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import useUserStore from "@/store/auth/useUserStore";

interface KakaoLoginOptions {
  redirect?: boolean;
}

interface KakaoLoginResponse {
  success: boolean;
  error?: string;
}

export const useKakaoLogin = () => {
  const router = useRouter();
  const { setUser } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleKakaoLogin = useCallback(
    async (
      code: string,
      options?: KakaoLoginOptions,
    ): Promise<KakaoLoginResponse> => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user/kakao/callback`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ code }),
            credentials: "include",
          },
        );

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(
            responseData.message || "로그인 처리 중 오류가 발생했습니다.",
          );
        }

        if (options?.redirect !== false) {
          setUser(responseData.data.user);
          await router.push("/");
        }

        return { success: true };
      } catch (error: any) {
        const errorMessage =
          error.message || "로그인 처리 중 오류가 발생했습니다.";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    [router, setUser],
  );

  return {
    handleKakaoLogin,
    loading,
    error,
  };
};
