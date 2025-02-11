import { cleanup, render, screen } from "@testing-library/react";
import UserProfile from "@/components/user-page/UserProfile";
import "@testing-library/jest-dom";

describe("UserProfile Component", () => {
  const mockUserInfo = {
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
    render(<UserProfile userInfo={mockUserInfo} />);
  });

  describe("기본 정보 렌더링", () => {
    it("닉네임을 렌더링 한다.", () => {
      expect(screen.getByText("테스트 유저")).toBeInTheDocument();
    });

    it("프로필 이미지를 올바르게 렌더링한다.", () => {
      const image = screen.getByRole("img");
      expect(image).toHaveAttribute(
        "src",
        expect.stringContaining("test-profile.jpg"),
      );
      expect(image).toHaveAttribute("alt", "테스트 유저님의 프로필 이미지");
    });
  });

  describe("자기소개 렌더링", () => {
    it("자기소개를 렌더링 한다.", () => {
      expect(screen.getByText("테스트 자기소개")).toBeInTheDocument();
    });
  });

  describe("사용자 태그 목록 렌더링", () => {
    it("사용자 태그 목록을 모두 표시한다.", () => {
      expect(screen.getByText("태그1")).toBeInTheDocument();
      expect(screen.getByText("태그2")).toBeInTheDocument();

      const tagList = screen.getByLabelText("자기소개 키워드");
      expect(tagList.children).toHaveLength(mockUserInfo.userTagList.length);
    });
  });

  describe("과외선생님 뱃지", () => {
    describe("자격이 있을 때", () => {
      it("뱃지를 표시한다.", () => {
        expect(screen.getByText("과외선생님")).toBeInTheDocument();
      });
    });

    describe("자격이 없을 때", () => {
      beforeEach(() => {
        cleanup();
        const unqualifiedUserInfo = {
          ...mockUserInfo,
          qualificationStatus: "UNQUALIFIED" as const,
        };
        render(<UserProfile userInfo={unqualifiedUserInfo} />);
      });
      it("뱃지를 표시하지 않는다.", () => {
        expect(screen.queryByText("과외선생님")).not.toBeInTheDocument();
      });
    });
  });
});
