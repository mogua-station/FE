import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import Card from "@/components/common/card/Card";
import useUserStore from "@/store/auth/useUserStore";
import useUserWishlist from "@/store/wishlist/useUserWishlist";
import { type CardProps } from "@/types/card";
import "@testing-library/jest-dom";

//mocking이 필요한 기준

/*
- 테스트 환경에서 실제 동작이 불가능한 경우 
  useRouter처럼 브라우저 환경에서 동작하는 함수들은 jest 환경에서 동작이 불가하므로 mocking해야한다


- 외부 상태나 API 호출이 포함된 경우
  상태관리 또는 API 요청 같은 동작들을 mocking이 필요하다


- 의존성이 강한 외부 라이브러릴나 시스템 리소스를 사용하는 경우
  로컬스토리지 같은 외부 의존성이 강한 기능을 테스트할려면 mocking이 필요하다


- 테스트할 필요가 없는 내부 구현을 단순화하려는 경우
  테스트에서는 기능 결과만 필요할 때 mocking한다(예를들어 useRouter.push는 nextjs에서 보장이 되므로 테스트할 필요가 없다)

*/

//useRouter mocking
jest.mock("next/navigation", () => ({
  __esModule: true,
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
}));

//Prop에 따른 렌더링 변화는 테스트할 필요가 없기 때문에 mocking
jest.mock("../components/common/card/StatusBadge", () => ({
  __esModule: true,
  default: () => <span>Mocked StatusBadge</span>,
}));

//zustand 유저 store mocking
jest.mock("../store/auth/useUserStore", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    user: null,
    setUser: jest.fn(),
    clearUser: jest.fn(),
  })),
}));

//zustand 유저 찜한모임 mocking
jest.mock("../store/wishlist/useUserWishlist", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    userAllwishlist: [],
    setUserAllWishlist: jest.fn(),
  })),
}));

//찜하기 기능 hook mocking
jest.mock("../hooks/useChangeWishlist", () => ({
  __esModule: true,
  default: () => ({
    loggedInWishlist: jest.fn(),
    nonLoggedInWishlist: jest.fn(),
  }),
}));
const queryClient = new QueryClient();

describe("Card 컴포넌트 테스트", () => {
  const mockCard: CardProps = {
    meetupId: 1,
    meetupStatus: "RECRUITING",
    meetingType: "STUDY",
    title: "React 스터디 모집",
    location: "CAPITAL",
    participants: [],
    recruitmentStartDate: new Date("2024-02-01"),
    recruitmentEndDate: new Date("2024-02-10"),
    meetingStartDate: new Date("2024-02-15"),
    meetingEndDate: new Date("2024-03-01"),
    thumbnail: "/test-image.jpg",
    minParticipants: 5,
    online: false,
    isMypage: false,
    isReview: false,
  };

  //테스트 코드 실행 전 설정
  beforeEach(() => {
    //테스트 시작전 로컬스토리지 설정
    //getItem이 호출되면 [1, 2, 3, 5, 6, 7] 이 값이 자동 설정되어 반환된다.
    jest.spyOn(Storage.prototype, "getItem").mockImplementation((key) => {
      if (key === "wishlist") {
        return JSON.stringify([1, 2, 3, 5, 6, 7]);
      }

      //wishlist 이외에는 null을 반환
      return null;
    });
  });

  it("Card 컴포넌트가 정상적으로 렌더링되는지", () => {
    // useRouter의 push 함수 Mock
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
    (useUserStore as jest.MockedFunction<typeof useUserStore>).mockReturnValue({
      user: null,
      setUser: jest.fn(),
      clearUser: jest.fn(),
    });

    (
      useUserWishlist as jest.MockedFunction<typeof useUserWishlist>
    ).mockReturnValue({
      userAllwishlist: [],
      setUserAllWishlist: jest.fn(),
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Card card={mockCard} />
      </QueryClientProvider>,
    );

    //title이 제대로 출력되는지 확인
    expect(screen.getByText(mockCard.title)).toBeInTheDocument();
  });

  describe("북마크 아이콘 표시 테스트", () => {
    it("유저 정보가 없고, 로컬스토리지에 값이 없다면 active가 안된 북마크 아이콘이 출력된다", () => {
      //유저정보를 비운다
      (
        useUserStore as jest.MockedFunction<typeof useUserStore>
      ).mockReturnValue({
        user: null,
        setUser: jest.fn(),
        clearUser: jest.fn(),
      });

      //컴포넌트 렌더링
      render(
        <QueryClientProvider client={queryClient}>
          <Card card={mockCard} />
        </QueryClientProvider>,
      );

      const bookmark = screen.getByLabelText(
        JSON.parse(localStorage.getItem("wishlist") || "[]").includes(
          mockCard.meetupId,
        )
          ? "active"
          : "default",
      );

      expect(bookmark).toBeInTheDocument();
    });
  });
});
