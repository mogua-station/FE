"use client";

import { useRouter } from "next/navigation";
import useUserStore from "@/store/auth/useUserStore";

const useSignOut = () => {
  const router = useRouter();
  const clearUser = useUserStore((state) => state.clearUser);

  const handleSignOut = async () => {
    try {
      router.push("/");

      setTimeout(() => {
        clearUser();
      }, 100);
    } catch (error) {
      console.error("로그아웃 중 에러 발생:", error);
    }
  };

  return { handleSignOut };
};

export default useSignOut;
