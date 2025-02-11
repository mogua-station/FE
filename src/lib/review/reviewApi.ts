import { post } from "@/lib/user/fetcher";

export const createReview = async (formData: FormData) => {
  const res = await post("/reviews", formData);

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    console.error("서버 응답 에러:", errorData);
    throw new Error("리뷰 작성에 실패했습니다.");
  }

  return res.json();
};
