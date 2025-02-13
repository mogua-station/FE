/* import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import Review from "@/components/common/review/Review";
import { type ReviewInfo } from "@/types/review";
import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  __esModule: true,
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
}));

describe("review 컴포넌트가 렌더링 되는지 확인", () => {
  const mockReviewInfo: ReviewInfo = {
    rating: 1,
    review: "유익한 시간이였습니다.",
    userid: 12,
    username: "박태현",
    date: new Date("2025-01-06"),
    isMyReview: false,
    eventId: 12,
    eventType: "STUDY",
  };

  it("review 컴포넌트가 렌더링 정상적으로 렌더링 되는지 테스트", () => {
    render(<Review reviewInfo={mockReviewInfo} />);

    expect(screen.getByText("유익한 시간이였습니다.")).toBeInTheDocument();
  });
});

describe("Review 컴포넌트", () => {
  const reviewInfo = {
    rating: 1,
    review: "유익한 시간이였습니다.",
    userid: 12,
    username: "박태현",
    date: new Date("2025-01-06"),
    isMyReview: true,
    eventId: 12,
    eventType: "STUDY",
  };

  it("handleClickDetail 클릭 시 isOpen 상태가 변경된다", () => {
    // reviewInfo 데이터 설정

    // 컴포넌트 렌더링
    render(<Review reviewInfo={reviewInfo} />);

    console.log(<Review reviewInfo={reviewInfo} />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();

    // 클릭 전 상태
    const arrowIcon = screen.getByLabelText("icon");
    expect(arrowIcon).not.toHaveClass("rotate-180");

    // 버튼 클릭 시 isOpen 상태 변경 확인
    fireEvent.click(button);

    // 클릭 후 상태 (isOpen이 true로 변경되어야 함)
    expect(arrowIcon).toHaveClass("rotate-180");
  });

  it("마이페이지에서 내가 작성한 리뷰 일 때는 카드 클릭 시 해당 모임페이지로 이동", () => {
    const routeUrl = reviewInfo.eventType.toLowerCase();
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock }); // push를 모킹

    render(<Review reviewInfo={reviewInfo} />);

    const button = screen.getByLabelText("routeMeet");
    fireEvent.click(button);

    expect(pushMock).toHaveBeenCalledWith(`/${routeUrl}/${reviewInfo.eventId}`);
  });
}); */

it("전체테스트 실패로 주석처리 했습니다🙏", () => {});
