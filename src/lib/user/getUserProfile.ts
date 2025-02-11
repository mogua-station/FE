import { get } from "./fetcher";
import { type UserProfile } from "@/types/user-page";

export async function getUserProfile(userId: string, options?: RequestInit) {
  const res = await get(`/user/profile/${userId}`, {
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

    throw new Error(message || "유저 프로필을 불러오는데 실패했습니다.");
  }

  return data as UserProfile;
}
