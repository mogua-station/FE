import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createReview, deleteReview } from "@/lib/review/reviewApi";
import useUserStore from "@/store/auth/useUserStore";

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

  const createReviewMutation = useMutation({
    mutationFn: (formData: FormData) => createReview(formData),
    onSuccess: () => {
      invalidateReviewQueries();
      if (user?.userId) {
        router.replace(`/user/${user.userId}`);
      }
    },
  });

  const deleteReviewMutation = useMutation({
    mutationFn: (reviewId: number) => deleteReview(reviewId),
    onSuccess: () => {
      invalidateReviewQueries();
    },
  });

  return {
    createReviewMutation,
    deleteReviewMutation,
  };
}
