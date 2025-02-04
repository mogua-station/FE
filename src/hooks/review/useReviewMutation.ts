import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { FailModal } from "@/components/create/modals/ResultInfoModal";
import { createReview } from "@/lib/review/reviewApi";
import useUserStore from "@/store/auth/useUserStore";
import modal from "@/utils/modalController";

export default function useReviewMutations() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { user } = useUserStore();

  const handleError = (error: unknown, title: string) => {
    const errorMessage =
      error instanceof Error ? error.message : "리뷰 작성에 실패했습니다.";
    modal.open(
      ({ close }) =>
        React.createElement(FailModal, {
          title,
          message: errorMessage,
          close: close,
        }),
      {
        hasCloseBtn: false,
        isBottom: false,
      },
    );
  };

  const createReviewMutation = useMutation({
    mutationFn: ({ formData, token }: { formData: FormData; token: string }) =>
      createReview(formData, token),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["meetings", "myReview", "study"],
      });
      queryClient.invalidateQueries({
        queryKey: ["meetings", "myReview", "tutoring"],
      });
      router.replace(`/user/${user?.userId}`);
    },
    onError: (error) => handleError(error, "리뷰 작성 실패"),
  });

  return {
    createReviewMutation,
  };
}
