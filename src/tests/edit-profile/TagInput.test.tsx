import { fireEvent, render, screen } from "@testing-library/react";
import TagInput from "@/components/edit-profile/TagInput";
import "@testing-library/jest-dom";

describe("TagInput", () => {
  const mockOnChange = jest.fn();
  const mockOnKeyDown = jest.fn();

  const renderTagInput = (props = {}) => {
    return render(
      <TagInput
        value=''
        onChange={mockOnChange}
        onKeyDown={mockOnKeyDown}
        {...props}
      />,
    );
  };

  const getInput = () => screen.getByPlaceholderText("# 태그추가");

  beforeEach(() => {
    mockOnChange.mockClear();
    mockOnKeyDown.mockClear();
  });

  describe("기본 UI", () => {
    it("태그 입력 필드가 올바르게 렌더링된다", () => {
      renderTagInput();
      expect(getInput()).toBeInTheDocument();
    });

    it("태그 입력 필드가 올바르게 렌더링된다", () => {
      renderTagInput();
      expect(getInput()).toHaveClass(
        "bg-transparent",
        "text-gray-100",
        "outline-none",
      );
    });
  });

  describe("props 전달 및 적용", () => {
    it("value prop이 input의 value로 설정된다", () => {
      renderTagInput({ value: "test" });
      expect(getInput()).toHaveValue("test");
    });

    it("className prop으로 추가 스타일을 적용할 수 있다", () => {
      renderTagInput({ className: "custom-class" });
      expect(getInput()).toHaveClass("custom-class");
    });

    describe("disabled prop", () => {
      it("disabled prop이 true일 때 input이 비활성화횐다", () => {
        renderTagInput({ disabled: true });
        expect(getInput()).toBeDisabled();
      });

      it("disabled prop이 false일 때 input이 활성화된다", () => {
        renderTagInput({ disabled: false });
        expect(getInput()).not.toBeDisabled();
      });
    });
  });

  describe("이벤트 위임", () => {
    it("input의 change 이벤트를 props의 onChange로 전달한다", () => {
      renderTagInput();

      const input = screen.getByPlaceholderText("# 태그추가");
      fireEvent.change(input, { target: { value: "test" } });
      expect(mockOnChange).toHaveBeenCalledWith("test");
    });

    it("input의 keydown 이벤트를 props의 onKeyDown으로 전달한다", () => {
      renderTagInput();

      const input = screen.getByPlaceholderText("# 태그추가");
      fireEvent.keyDown(input, { key: "Enter" });
      expect(mockOnKeyDown).toHaveBeenCalled();
    });
  });
});
