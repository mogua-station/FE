import { createElement, useEffect } from "react";
import useCookie from "../auths/useTokenState";
import { useGetProfile, useUpdateProfile } from "./useProfile";
import EditProfileSuccessModal from "@/components/edit-profile/EditProfileSuccessModal";
import useUserStore from "@/store/auth/useUserStore";
import modal from "@/utils/modalController";

export function useEditProfile() {
  const token = useCookie("accessToken");

  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const {
    data: userInfo,
    error,
    refetch,
  } = useGetProfile(user ? user.userId : 0);

  // user 정보가 업데이트되면 프로필 정보 다시 가져오기
  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user, refetch]);

  const updateProfileMutation = useUpdateProfile();

  const handleProfileUpdate = async (formData: FormData) => {
    if (!token || !user) return;

    const request = formData.get("request");
    if (!(request instanceof Blob)) return;

    const requestData = JSON.parse(await request.text());

    updateProfileMutation.mutate(
      { formData, token },
      {
        onSuccess: () => {
          if (requestData) {
            setUser({
              ...user,
              name: requestData.nickname || user.name,
              profileImg: requestData.profileImg || user.profileImg,
            });
          }
          modal.open(
            ({ close }) =>
              createElement(EditProfileSuccessModal, {
                userId: user.userId,
                close,
              }),
            {
              hasCloseBtn: false,
              disableOverlayClick: true,
              isBottom: false,
              isDark: false,
            },
          );
        },
        onError: (error) => {
          console.error("[프로필 수정 실패] 에러:", error);
        },
      },
    );
  };

  return {
    userInfo,
    isLoading: !userInfo,
    error,
    handleProfileUpdate,
    isUpdating: updateProfileMutation.isPending,
  };
}
