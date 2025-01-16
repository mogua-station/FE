"use server";

import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
  try {
    // 실제 요청 데이터 확인
    console.log(
      "Server Action - FormData entries:",
      Array.from(formData.entries()),
    );

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/profile/me`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${process.env.USER_TOKEN}`, // TODO: 토큰 관리 전략 논의중
        },
        body: formData,
      },
    );

    if (!res.ok) {
      // 구체적인 에러 메시지 확인
      const errorData = await res.text();
      console.error("Server Action - Error response:", {
        status: res.status,
        statusText: res.statusText,
        data: errorData,
      });
      throw new Error(
        `HTTP error! status: ${res.status}, message: ${errorData}`,
      );
    }

    const data = await res.json();

    revalidatePath("/user/[id]");
    revalidatePath("/user/edit_profile");

    return { success: true, data };
  } catch (error) {
    // 구체적인 에러 로깅
    console.error("Server Action - 프로필 수정 실패:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "프로필 수정에 실패했습니다.",
    };
  }
}
