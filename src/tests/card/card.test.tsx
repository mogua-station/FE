import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import Card from "@/components/common/card/Card";
import CardReview from "@/components/common/card/CardReview";
import CardWishlist from "@/components/common/card/CardWishlist";
import Content from "@/components/common/card/Content";
import StatusBadge from "@/components/common/card/StatusBadge";
import {
  type CardProps,
  type CardContentProps,
  type BadgeProps,
} from "@/types/card";
import "@testing-library/jest-dom";

//useRouter mocking
jest.mock("next/navigation", () => ({
  __esModule: true,
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
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
    //getItem이 호출되면 [1, 2, 3, 5, 6, 7] 이 값이 자동 설정되어 반환된다
    jest.spyOn(Storage.prototype, "getItem").mockImplementation((key) => {
      if (key === "wishlist") {
        return JSON.stringify([1, 2, 3, 5, 6, 7]);
      }

      //wishlist 이외에는 null을 반환
      return null;
    });
  });

  it("Card 컴포넌트가 정상적으로 렌더링되는지", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Card card={mockCard} />
      </QueryClientProvider>,
    );

    //useEffect가 들어간 컴포넌트는 useEffect가 실행이 되기까지 기다렸다가 테스트를 실행해야한다
    await waitFor(() => {
      //title이 제대로 출력되는지 확인
      expect(screen.getByText(mockCard.title)).toBeInTheDocument();
    });
  });

  it("버튼 클릭 시 페이지 이동", () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock }); // push를 모킹

    render(
      <QueryClientProvider client={queryClient}>
        <Card card={mockCard} />
      </QueryClientProvider>,
    );

    const cardRouter = screen.getByLabelText(`모임${mockCard.meetupId} 이동`);
    fireEvent.click(cardRouter);

    expect(pushMock).toHaveBeenCalledWith(
      `/${mockCard.meetingType.toLowerCase()}/${mockCard.meetupId}`,
    ); // 특정 경로로 이동했는지 확인
  });

  describe("하위 컴포넌트 렌더링 테스트", () => {
    it("StatusBadge 렌더링 테스트", () => {
      const badgeMock: BadgeProps = {
        meetupStatus: "RECRUITING",
        recruitmentEndDate: new Date("25-02-25"),
        confirm: false,
        isMypage: false,
      };
      render(<StatusBadge badge={badgeMock} />);

      expect(screen.getByText("모집 중")).toBeInTheDocument();
    });

    it("StatusBadge 렌더링 테스트", async () => {
      const wishlistMock: Pick<
        CardProps,
        "meetupId" | "meetupStatus" | "isMypage"
      > = {
        meetupId: 15,
        meetupStatus: "RECRUITING",
        isMypage: false,
      };

      render(
        <QueryClientProvider client={queryClient}>
          <CardWishlist wishlistInfo={wishlistMock} />
        </QueryClientProvider>,
      );

      await waitFor(() =>
        expect(screen.getByRole("button")).toBeInTheDocument(),
      );
    });

    it("StatusBadge 렌더링 테스트", () => {
      const contentMock: CardContentProps = {
        content: {
          title: "코딩 모임",
          location: "CAPITAL",
          participants: [],
          recruitmentStartDate: new Date("25-01-31"),
          recruitmentEndDate: new Date("25-02-10"),
          meetingStartDate: new Date("25-02-28"),
          meetingEndDate: new Date("25-03-10"),
        },
      };

      render(<Content content={contentMock.content} />);

      expect(screen.getByText("코딩 모임")).toBeInTheDocument();
      expect(screen.getByText("수도권")).toBeInTheDocument();
      expect(screen.getByText("0명 참여")).toBeInTheDocument();
      // expect(screen.getByText("2025.01.31.")).toBeInTheDocument();
      // expect(screen.getByText("2025.02.10.")).toBeInTheDocument();
    });

    it("StatusBadge 렌더링 테스트", () => {
      render(<CardReview meetupId={mockCard.meetupId} />);

      expect(
        screen.getByRole("button", { name: "리뷰 작성" }),
      ).toBeInTheDocument();
    });
  });
});
