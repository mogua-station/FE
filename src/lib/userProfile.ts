export const userProfileApi = {
  getUserInfo: async (userId: number) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/profile/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_USER_TOKEN}`, // TODO: 토큰 관리 전략 논의중
        },
      },
    );
    if (!res.ok) {
      throw new Error("유저 정보를 불러오는데 실패했습니다.");
    }
    const { data } = await res.json();
    return data;
  },

  updateProfile: async (formData: FormData) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/profile/me`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_USER_TOKEN}`, // TODO: 토큰 관리 전략 논의중
        },
        body: formData,
      },
    );

    if (!res.ok) {
      const errorData = await res.text();
      throw new Error(
        `HTTP error! status: ${res.status}, message: ${errorData}`,
      );
    }

    const { data } = await res.json();
    return data;
  },
};
