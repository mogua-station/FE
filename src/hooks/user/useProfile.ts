import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/lib/user/clientFetch";

interface UserProfile {
  email: string;
  nickname: string;
  profileImg: string;
  qualificationStatus: "QUALIFIED" | "UNQUALIFIED";
  bio: string;
  userTagList: Array<{ id: number; tag: string }>;
  ownId: boolean;
}

export const useGetProfile = (userId: number, token: string) => {
  return useQuery({
    queryKey: ["userProfile", userId],
    queryFn: async () => {
      const res = await fetcher(`/user/profile/${userId}`, token, {
        auth: true,
      });
      if (!res.ok) {
        const errorData = await res.text();
        throw new Error(`Failed to fetch user profile: ${errorData}`);
      }
      const { data } = await res.json();
      return data as UserProfile;
    },
    enabled: userId > 0 && !!token,
    staleTime: Infinity,
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
