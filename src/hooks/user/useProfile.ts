import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { patch } from "@/lib/user/fetcher";
import { getUserProfile } from "@/lib/user/getUserProfile";

export const useGetProfile = (userId: number) => {
  return useQuery({
    queryKey: ["userProfile", userId],
    queryFn: async () => getUserProfile(userId.toString()),
    enabled: userId > 0,
    staleTime: Infinity,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ formData }: { formData: FormData }) => {
      const res = await patch(`/user/profile/me`, formData);
      if (!res.ok) {
        const errorData = await res.text();
        throw new Error(`Failed to update profile: ${errorData}`);
      }
      const { data } = await res.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userProfile"],
      });
    },
  });
};
