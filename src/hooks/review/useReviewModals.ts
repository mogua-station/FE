"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { FailModal } from "@/components/create/modals/ResultInfoModal";
import ConfirmModal from "@/components/user/ConfirmModal";
import UserSuccessModal from "@/components/user/ReviewSuccessModal";
import useReviewMutations from "@/hooks/review/useReviewMutation";
import useUserStore from "@/store/auth/useUserStore";
import modal from "@/utils/modalController";

export default function useReviewModals() {
  const { deleteReviewMutation, createReviewMutation } = useReviewMutations();
  const router = useRouter();
  const { user } = useUserStore();

  const handleSuccess = (
    title: string,
    message: string,
    shouldRedirect = false,
  ) => {
    modal.open(
      ({ close }) =>
        React.createElement(UserSuccessModal, {
          title,
          message,
          close: () => {
            close();
            if (shouldRedirect && user?.userId) {
              router.replace(`/user/${user.userId}`);
            }
          },
        }),
      {
        hasCloseBtn: false,
        isBottom: false,
      },
    );
  };

  const handleError = (error: unknown, title: string, message: string) => {
    console.error("Error details:", error);
    modal.open(
      ({ close }) =>
        React.createElement(FailModal, {
          title,
          message,
          close,
        }),
      {
        hasCloseBtn: false,
        isBottom: false,
      },
    );
  };

  const handleCreateReview = async (formData: FormData) => {
    try {
      await createReviewMutation.mutateAsync(formData);
      handleSuccess("작성 완료", "리뷰가 작성되었어요.", true);
    } catch (error) {
      handleError(error, "작성 실패", "리뷰 작성에 실패했어요.");
    }
  };

  const handleDeleteClick = (reviewId: number) => {
    modal.open(
      ({ close }) =>
        React.createElement(ConfirmModal, {
          title: "정말 삭제할까요?",
          leftButton: {
            text: "취소",
            onClick: close,
            isActivated: false,
          },
          rightButton: {
            text: "확인",
            onClick: async () => {
              try {
                close();
                await deleteReviewMutation.mutateAsync(reviewId);
              } catch (error) {
                handleError(error, "삭제 실패", "리뷰 삭제에 실패했어요.");
              }
            },
            isActivated: true,
          },
        }),
      {
        hasCloseBtn: false,
        isBottom: false,
      },
    );
  };

  return {
    handleSuccess,
    handleError,
    handleCreateReview,
    handleDeleteClick,
  };
}
