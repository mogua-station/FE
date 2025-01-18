import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useUserStore from "@/store/auth/useUserStore";

const useRedirectIfUnsigned = (token: string | null) => {
  const router = useRouter();
  const { clearUser } = useUserStore();

  useEffect(() => {
    if (!token) {
      clearUser();
      router.push("/sign-in");
    }
  }, [token, router, clearUser]);
};
export default useRedirectIfUnsigned;
