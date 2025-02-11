import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import Popover from "@/components/common/Popover";

describe("Popover 컴포넌트", () => {
  it("트리거 클릭 시 팝오버를 열고 닫을 수 있다", async () => {
    render(
      <Popover content={<div>팝오버 내용</div>}>
        <span role='button' aria-haspopup='true'>
          트리거
        </span>
      </Popover>,
    );

    const trigger = screen.getByText("트리거");

    // 초기 상태 확인 (비동기 대응)
    await waitFor(() =>
      expect(screen.queryByText("팝오버 내용")).not.toBeInTheDocument(),
    );

    // 트리거 클릭으로 열기
    fireEvent.click(trigger);
    expect(screen.getByText("팝오버 내용")).toBeInTheDocument();

    // 다시 클릭으로 닫기
    fireEvent.click(trigger);
    await waitFor(() =>
      expect(screen.queryByText("팝오버 내용")).not.toBeInTheDocument(),
    );
  });

  it("앵커와 컨텐츠 위치에 따라 스타일을 올바르게 계산한다", () => {
    render(
      <Popover
        content={<div>위치 테스트</div>}
        position={{
          anchor: { vertical: "bottom", horizontal: "center" },
          content: { vertical: "top", horizontal: "center" },
        }}
        gapX={10}
        gapY={5}
      >
        <div role='button' aria-haspopup='true'>
          트리거
        </div>
      </Popover>,
    );

    // 여러 개의 버튼 요소 중에서 정확한 트리거 선택
    const triggers = screen.getAllByRole("button");
    const trigger = triggers.find((el) => el.textContent === "트리거");

    // 요소가 존재하는지 확인
    expect(trigger).toBeDefined();
    fireEvent.click(trigger!);

    // 팝오버 요소 가져오기
    const popover = screen.getByText("위치 테스트").parentElement;

    // getComputedStyle을 사용한 스타일 검증
    const popoverStyle = window.getComputedStyle(popover!);
    expect(popoverStyle.top).toBe("5px");
    expect(popoverStyle.left).toBe("0px");
  });

  it("열기/닫기 시 콜백 함수를 호출한다", async () => {
    const handleOpen = jest.fn();
    const handleClose = jest.fn();

    render(
      <Popover
        content={<div>콜백 테스트</div>}
        onOpen={handleOpen}
        onClose={handleClose}
      >
        <span role='button' aria-haspopup='true'>
          콜백 트리거
        </span>
      </Popover>,
    );

    const trigger = screen.getByText("콜백 트리거");

    fireEvent.click(trigger);
    expect(handleOpen).toHaveBeenCalledTimes(1);
    expect(handleClose).not.toHaveBeenCalled();

    fireEvent.click(trigger);
    await waitFor(() => expect(handleClose).toHaveBeenCalledTimes(1));
  });

  it("함수형 컨텐츠에 closePopover 함수를 전달한다", () => {
    const contentMock = jest.fn(() => <div>함수형 컨텐츠</div>);

    render(
      <Popover content={contentMock}>
        <div role='button' aria-haspopup='true' data-testid='custom-trigger'>
          함수형 트리거
        </div>
      </Popover>,
    );

    // 여러 개의 버튼 요소 중에서 정확한 트리거 선택
    const trigger = screen.getByTestId("custom-trigger");

    // 요소가 존재하는지 확인
    expect(trigger).toBeDefined();
    fireEvent.click(trigger);

    // 함수형 콘텐츠가 closePopover 함수를 전달받았는지 검증
    expect(contentMock).toHaveBeenCalledWith(expect.any(Function));
  });
});
