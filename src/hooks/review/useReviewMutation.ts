import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createReview } from "@/lib/review/reviewApi";
import useUserStore from "@/store/auth/useUserStore";

export const useReviewMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { user } = useUserStore();

  return useMutation({
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
  });
};
