import { useRouter } from "next/navigation";
import useUserStore from "@/store/auth/useUserStore";

type SignInResult = {
  success?: boolean;
  error?: {
    type: "email" | "password" | "general";
    message: string;
  };
};

const useSignIn = () => {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const signIn = async (
    data: {
      email: string;
      password: string;
    },
    options?: { redirect?: boolean },
  ): Promise<SignInResult> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/sign-in`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        },
      );

      const responseData = await response.json();

      if (!response.ok) {
        // 메시지 기반으로 에러 타입 결정
        // 추후 백엔드와 협의 후 status에 따라 핸들링
        if (responseData.message.includes("비밀번호")) {
          return { error: { type: "password", message: responseData.message } };
        } else if (responseData.message.includes("이메일")) {
          return { error: { type: "email", message: responseData.message } };
        }
        return {
          error: {
            type: "general",
            message: responseData.message || "로그인에 실패했습니다.",
          },
        };
      }

      const token = response.headers.get("Authorization")?.split(" ")[1];
      if (token) {
        document.cookie = `accessToken=${token}; path=/; Secure; SameSite=None; max-age=${process.env.TOKEN_EXPIRY};`; // 추후 수정

        // Zustand store에 유저 정보 저장
        setUser(responseData.data.user);
      } else {
        throw new Error("토큰이 없습니다.");
      }

      if (options?.redirect !== false) {
        await router.push("/");
      }
      return { success: true };
    } catch (error: unknown) {
      // error 타입 가드
      if (error instanceof Error) {
        console.error("Login error:", error.message);
        return {
          error: { type: "general", message: error.message },
        };
      }
      console.error("Unknown error:", error);
      return {
        error: { type: "general", message: "로그인 중 오류가 발생했습니다." },
      };
    }
  };

  return { signIn };
};

export default useSignIn;
