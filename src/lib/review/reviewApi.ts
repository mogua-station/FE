import { del, post, patch, get } from "@/lib/user/fetcher";

export const createReview = async (formData: FormData) => {
  const res = await post("/reviews", formData);

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    console.error("서버 응답 에러:", errorData);
    throw new Error("리뷰 작성에 실패했습니다.");
  }

  return res.json();
};

export const deleteReview = async (reviewId: number) => {
  const res = await del(`/reviews/${reviewId}`);

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    console.error("서버 응답 에러:", errorData);
    throw new Error("리뷰 삭제에 실패했습니다.");
  }
};

export const updateReview = async (reviewId: string, formData: FormData) => {
  const res = await patch(`/reviews/${reviewId}`, formData);

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    console.error("서버 응답 에러:", errorData);
    throw new Error("리뷰 수정에 실패했습니다.");
  }

  return res.json();
};

export const getReview = async (reviewId: string) => {
  const res = await get(`/reviews/${reviewId}`);

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    console.error("서버 응답 에러:", errorData);
    throw new Error("리뷰 조회에 실패했습니다.");
  }

  return res.json();
};
