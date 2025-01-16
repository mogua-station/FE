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
};
