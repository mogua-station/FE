import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { FailModal } from "@/components/create/modals/ResultInfoModal";
import { createReview, deleteReview } from "@/lib/review/reviewApi";
import useUserStore from "@/store/auth/useUserStore";
import modal from "@/utils/modalController";

export default function useReviewMutations() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { user } = useUserStore();

  const handleError = (error: unknown, message: string) => {
    // 디버깅을 위한 상세 에러 로깅
    console.error("Error details:", error);

    modal.open(
      ({ close }) =>
        React.createElement(FailModal, {
          title: "실패",
          message,
          close: close,
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
      queryClient.invalidateQueries({
        queryKey: ["meetings", "myReview", "study"],
      });
      queryClient.invalidateQueries({
        queryKey: ["meetings", "myReview", "tutoring"],
      });
      router.replace(`/user/${user?.userId}`);
    },
    onError: (error) => handleError(error, "리뷰 작성에 실패했습니다."),
  });

  const deleteReviewMutation = useMutation({
    mutationFn: (reviewId: number) => deleteReview(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["meetings", "myReview", "study"],
      });
      queryClient.invalidateQueries({
        queryKey: ["meetings", "myReview", "tutoring"],
      });
      router.replace(`/user/${user?.userId}`);
    },
    onError: (error) => handleError(error, "리뷰 삭제에 실패했습니다."),
  });

  return {
    createReviewMutation,
    deleteReviewMutation,
  };
}
