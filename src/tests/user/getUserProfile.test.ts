import { fetcher } from "@/lib/user/fetcher";
import { getUserProfile } from "@/lib/user/getUserProfile";

jest.mock("@/lib/user/fetcher");

describe("getUserProfile", () => {
  const mockUserProfile = {
    userId: 1,
    email: "test@email.com",
    nickname: "테스트 유저",
    profileImg: "https://test.com/test-profile.jpg",
    qualificationStatus: "QUALIFIED" as const,
    bio: "테스트 자기소개",
    userTagList: [
      { id: 1, tag: "태그1" },
      { id: 2, tag: "태그2" },
    ],
    ownId: true,
  };

  beforeEach(() => {
    jest.resetAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  describe("프로필 조회 성공", () => {
    it("유저 프로필을 성공적으로 가져온다", async () => {
      (fetcher as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ data: mockUserProfile }),
      });

      const userId = "1";
      const data = await getUserProfile(userId);

      expect(fetcher).toHaveBeenCalledWith(`/user/profile/${userId}`, "", {});
      expect(data).toEqual(mockUserProfile);
    });

    it("추가 옵션을 전달할 수 있다", async () => {
      (fetcher as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ data: mockUserProfile }),
      });

      const options = { headers: { "Cache-Control": "no-cache" } };
      await getUserProfile("1", options);

      expect(fetcher).toHaveBeenCalledWith(`/user/profile/1`, "", {
        ...options,
      });
    });
  });

  describe("프로필 조회 실패", () => {
    it("API 요청이 실패하면 에러를 던진다", async () => {
      const errorResponse = {
        status: "error",
        data: null,
        message: "해당 유저는 존재하지 않습니다.",
        additionalData: null,
      };

      (fetcher as jest.Mock).mockResolvedValue({
        ok: false,
        status: 400,
        json: () => Promise.resolve(errorResponse),
      });

      await expect(getUserProfile("999")).rejects.toThrow(
        "해당 유저는 존재하지 않습니다.",
      );
    });
  });
});
