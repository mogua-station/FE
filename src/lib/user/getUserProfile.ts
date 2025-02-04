import { fetcher } from "./fetcher";
import { type UserProfile } from "@/types/user-page";

export async function getUserProfile(userId: string, options?: RequestInit) {
  const res = await fetcher(`/user/profile/${userId}`, {
    ...options,
  });

  if (!res.ok) {
    const errorData = await res.text();
    console.error("Profile API Error:", {
      status: res.status,
      statusText: res.statusText,
      errorMessage: errorData,
    });

    throw new Error("사용자 프로필을 가져오지 못했습니다.");
  }

  const { data } = await res.json();
  return data as UserProfile;
}
