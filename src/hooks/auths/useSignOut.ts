import useUserStore from "@/store/auth/useUserStore";

const useSignOut = () => {
  const clearUser = useUserStore((state) => state.clearUser);

  const handleSignOut = async () => {
    clearUser();
  };

  return { handleSignOut };
};

export default useSignOut;
