import { fetcher } from "@/lib/user/fetcher";

export const createReview = async (formData: FormData, token: string) => {
  if (!token) throw new Error("로그인이 필요합니다.");

  const res = await fetcher("/reviews", token, {
    method: "POST",
    body: formData,
    auth: true,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    console.error("서버 응답 에러:", errorData);
    throw new Error("리뷰 작성에 실패했습니다.");
  }
  return res.json();
};
