import { fetcher } from "./fetcher";
import { type UserProfile } from "@/types/user-page";

export async function getUserProfile(userId: string, options?: RequestInit) {
  const res = await fetcher(`/user/profile/${userId}`, "", {
    ...options,
  });

  const { data, message } = await res.json();

  if (!res.ok) {
    console.error("사용자 프로필 조회 실패:", {
      url: `/user/profile/${userId}`,
      status: res.status,
      statusText: res.statusText,
      errorMessage: message,
    });

    throw new Error(message);
  }

  return data as UserProfile;
}
