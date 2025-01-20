import useUserStore from "../../store/auth/useUserStore";
import { deleteCookie } from "./useTokenState";

const useSignOut = () => {
  const clearUser = useUserStore((state) => state.clearUser);

  const handleSignOut = async () => {
    clearUser();
    deleteCookie("accessToken");
    // deleteCookie("refreshToken");
  };

  return { handleSignOut };
};

export default useSignOut;
