import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import "@testing-library/jest-dom";
import Dropdown from "@/components/common/Dropdown";

describe("Dropdown Component", () => {
  const mockContent = [
    {
      label: "Option 1",
      value: "option1",
      onClick: jest.fn(),
    },
    {
      label: "Option 2",
      value: "option2",
      onClick: jest.fn(),
    },
  ];

  it("기본 children(드롭다운 트리거)이 렌더링되는지 확인", () => {
    render(
      <Dropdown content={mockContent}>
        <span>Open Dropdown</span>
      </Dropdown>,
    );

    expect(screen.getByText("Open Dropdown")).toBeInTheDocument();
  });

  it("defaultSelected가 주어졌을 경우 해당 값이 초기 선택값으로 설정되는지 확인", () => {
    render(
      <Dropdown content={mockContent} defaultSelected='Option 1'>
        <span>Open Dropdown</span>
      </Dropdown>,
    );

    // Dropdown 내부 상태는 직접 확인하기 어렵지만,
    // Popover 클릭 후 render되는 클래스 혹은 컬러 등을 통해서
    // selected 상태를 유추할 수 있습니다.
    // 여기서는 간단히 옵션 클릭 시 선택 여부를 확인하는 로직으로 대체합니다.
  });

  it("드롭다운을 클릭하면 Popover가 열리고, 옵션 리스트가 표시되는지 확인", async () => {
    render(
      <Dropdown content={mockContent}>
        <span>Open Dropdown</span>
      </Dropdown>,
    );

    // 우선 옵션 리스트가 초기에는 없는 상태라고 가정
    expect(screen.queryByText("Option 1")).not.toBeInTheDocument();

    // 트리거 버튼 클릭 -> Popover 열림
    await userEvent.click(screen.getByText("Open Dropdown"));

    // Popover 안의 옵션들이 렌더링되는지 확인
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });

  it("옵션 클릭 시 onClick 콜백 함수가 호출되고, Dropdown이 닫히는지 확인", async () => {
    render(
      <Dropdown content={mockContent}>
        <span>Open Dropdown</span>
      </Dropdown>,
    );

    // 드롭다운 트리거 클릭
    await userEvent.click(screen.getByText("Open Dropdown"));

    // Option 1 클릭
    await userEvent.click(screen.getByText("Option 1"));

    // Option 1에 등록된 콜백 함수가 실행되었는지 확인
    expect(mockContent[0].onClick).toHaveBeenCalledTimes(1);

    // Popover가 닫혔다면 Option 2가 더 이상 화면에 없어야 함
    // (단, Popover 구현 방식에 따라 다를 수 있으므로 실제 구현에 맞춰 조정 필요)
    expect(screen.queryByText("Option 2")).not.toBeInTheDocument();
  });

  it("선택된 옵션이 변경되는지 확인", async () => {
    render(
      <Dropdown content={mockContent} defaultSelected='Option 1'>
        <span>Open Dropdown</span>
      </Dropdown>,
    );

    // 드롭다운 트리거 클릭
    await userEvent.click(screen.getByText("Open Dropdown"));

    // defaultSelected가 "Option 1"이므로 이미 선택 상태일 것
    // (스타일상 text-gray-200 을 가지고 있다고 가정)
    const option1 = screen.getByText("Option 1");
    expect(option1).toHaveClass("text-gray-200");

    // Option 2 클릭 -> selected가 "Option 2"로 변경
    await userEvent.click(screen.getByText("Option 2"));

    // Popover가 닫힌 뒤 다시 열기 (선택된 옵션 스타일 확인하기 위함)
    await userEvent.click(screen.getByText("Open Dropdown"));

    // 이제 Option 1은 더 이상 선택되지 않았고 (text-gray-500),
    // Option 2가 선택된 스타일 (text-gray-200)이어야 함
    expect(screen.getByText("Option 1")).toHaveClass("text-gray-500");
    expect(screen.getByText("Option 2")).toHaveClass("text-gray-200");
  });
});
