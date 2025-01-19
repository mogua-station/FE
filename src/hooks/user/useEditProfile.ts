import { useRouter } from "next/navigation";
import useCookie from "../auths/useTokenState";
import { useGetProfile, useUpdateProfile } from "./useProfile";
import useUserStore from "@/store/auth/useUserStore";

export function useEditProfile() {
  const token = useCookie("accessToken");
  const { user, setUser } = useUserStore();
  const router = useRouter();

  const {
    data: userInfo,
    isLoading,
    error,
  } = useGetProfile(user!.id, token || "");
  const updateProfileMutation = useUpdateProfile();

  const handleProfileUpdate = (formData: FormData) => {
    if (!token || !user) return;

    updateProfileMutation.mutate(
      { formData, token },
      {
        onSuccess: (res) => {
          setUser({
            ...user,
            name: res.nickname,
            imageUrl: res.profileImg || user.imageUrl,
          });
        },
        onSettled: () => {
          router.replace(`/user/${user.id}`);
        },
      },
    );
  };

  return {
    userInfo,
    isLoading,
    error,
    handleProfileUpdate,
    isUpdating: updateProfileMutation.isPending,
  };
}
