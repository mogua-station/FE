import { createElement, useEffect } from "react";
import { useGetProfile, useUpdateProfile } from "./useProfile";
import EditProfileSuccessModal from "@/components/edit-profile/EditProfileSuccessModal";
import useUserStore from "@/store/auth/useUserStore";
import modal from "@/utils/modalController";

export function useEditProfile() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const {
    data: userInfo,
    error,
    refetch,
    isLoading,
  } = useGetProfile(user ? user.userId : 0);

  // user 정보가 업데이트되면 프로필 정보 다시 가져오기
  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user, refetch]);

  const updateProfileMutation = useUpdateProfile();

  const handleProfileUpdate = async (formData: FormData) => {
    if (!user) return;

    const request = formData.get("request");
    if (!(request instanceof Blob)) return;

    const requestData = JSON.parse(await request.text());
    const hasImageFile = formData.get("image") instanceof File;

    updateProfileMutation.mutate(
      { formData },
      {
        onSuccess: () => {
          // 닉네임만 스토어에 업데이트
          if (requestData?.nickname) {
            setUser({
              ...user,
              name: requestData.nickname,
            });
          }

          // 이미지가 변경된 경우 sessionStorage에 표시
          if (hasImageFile) {
            sessionStorage.setItem("profileImageChanged", "true");
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
    error,
    handleProfileUpdate,
    isUpdating: updateProfileMutation.isPending,
    isLoading,
  };
}
