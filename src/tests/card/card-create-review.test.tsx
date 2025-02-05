import { render, screen, fireEvent } from "@testing-library/react";
import CardReview from "@/components/common/card/CardReview";

describe("리뷰 작성버튼 함수 호출 테스트", () => {
  it("리뷰 작성 함수가 호출되는지 테스트", () => {
    const handleClickReviewMock = jest.fn();

    render(<CardReview meetupId={1} />);

    //컴포넌트 버튼에 handleClickReviewMock 함수를 전달
    screen.getByRole("button").onclick = (e) => handleClickReviewMock(e, 1);

    //클릭 실행
    fireEvent.click(screen.getByRole("button"));

    //함수가 1번 이상 호출 되었는지 확인
    expect(handleClickReviewMock).toHaveBeenCalled();
  });
});
