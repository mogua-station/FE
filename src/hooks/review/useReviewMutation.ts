import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { FailModal } from "@/components/create/modals/ResultInfoModal";
import UserSuccessModal from "@/components/user/ReviewSuccessModal";
import { createReview, deleteReview } from "@/lib/review/reviewApi";
import useUserStore from "@/store/auth/useUserStore";
import modal from "@/utils/modalController";

export default function useReviewMutations() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { user } = useUserStore();

  const invalidateReviewQueries = () => {
    queryClient.invalidateQueries({
      queryKey: ["meetings", "myReview", "study"],
    });
    queryClient.invalidateQueries({
      queryKey: ["meetings", "myReview", "tutoring"],
    });
  };

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
    // 디버깅을 위한 상세 에러 로깅
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

  const createReviewMutation = useMutation({
    mutationFn: (formData: FormData) => createReview(formData),
    onSuccess: () => {
      invalidateReviewQueries();
      handleSuccess("작성 완료", "리뷰가 작성되었어요.", true);
    },
    onError: (error) =>
      handleError(error, "작성 실패", "리뷰 작성에 실패했어요."),
  });

  const deleteReviewMutation = useMutation({
    mutationFn: (reviewId: number) => deleteReview(reviewId),
    onSuccess: () => {
      invalidateReviewQueries();
      handleSuccess("삭제 완료", "리뷰가 삭제되었어요.");
    },
    onError: (error) =>
      handleError(error, "삭제 실패", "리뷰 삭제에 실패했어요."),
  });

  return {
    createReviewMutation,
    deleteReviewMutation,
  };
}
