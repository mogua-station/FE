import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/lib/user/fetcher";
import { getUserProfile } from "@/lib/user/getUserProfile";
import useUserStore from "@/store/auth/useUserStore";

export const useGetProfile = (userId: number) => {
  const storeUser = useUserStore((state) => state.user);

  return useQuery({
    queryKey: ["userProfile", userId],
    queryFn: async () => getUserProfile(userId.toString()),
    enabled: userId > 0 && !!storeUser,
    staleTime: Infinity,
    retry: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      formData,
      token,
    }: {
      formData: FormData;
      token: string;
    }) => {
      const res = await fetcher(`/user/profile/me`, token, {
        method: "PATCH",
        body: formData,
        auth: true,
      });
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
