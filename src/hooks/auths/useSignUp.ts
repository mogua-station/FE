import { useRouter } from "next/navigation";
import { type UseFormSetError } from "react-hook-form";
import useSignIn from "./useSignIn";
import { type FormData } from "@/types";

export const useSignUp = () => {
  const router = useRouter();
  const { signIn } = useSignIn();

  const signUp = async (
    data: FormData,
    setError: UseFormSetError<FormData>,
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/sign-up`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
            nickname: data.nickname,
          }),
        },
      );
      const responseData = await response.json();

      if (!response.ok) {
        if (responseData.message?.includes("Duplicate entry")) {
          setError("email", {
            message: "이미 등록된 이메일입니다. 다른 이메일을 사용해주세요.",
          });
          return;
        }
        throw new Error(responseData.message || "회원가입에 실패했습니다.");
      }

      await signIn(
        { email: data.email, password: data.password },
        { redirect: false },
      );
      await router.push(`/sign-up/success?username=${data.nickname}`);
    } catch (error) {
      console.error("Sign-up error:", error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  return { signUp };
};
