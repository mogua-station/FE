import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import { FailModal } from "@/components/create/modals/ResultInfoModal";
import useUserStore from "@/store/auth/useUserStore";
import { type MeetProps } from "@/types/meetDetail";
import modal from "@/utils/modalController";

export const useMeetupPermissions = (meetupData?: MeetProps) => {
  const router = useRouter();
  const userId = useUserStore(useShallow((state) => state.user?.userId));

  if (!meetupData) return { userId };

  useEffect(() => {
    if (meetupData?.hostId !== userId) {
      modal.open(
        ({ close }) => (
          <FailModal
            close={() => {
              close();
              router.replace("/");
            }}
            title='모임 수정 실패'
            message='본인이 개설한 모임만 수정할 수 있습니다.'
            btnText='돌아가기'
          />
        ),
        {
          hasCloseBtn: false,
          isBottom: false,
          disableOverlayClick: true,
        },
      );
    }
  }, [meetupData, userId, router]);

  return { userId };
};
