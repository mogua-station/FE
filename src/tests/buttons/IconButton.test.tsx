import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import IconButton from "@/components/common/buttons/IconButton";
import "@testing-library/jest-dom";

describe("IconButton", () => {
  describe("기본 렌더링", () => {
    render(<IconButton>아이콘</IconButton>);
    const button = screen.getByRole("button");

    it("버튼이 정상적으로 렌더링된다", () => {
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent("아이콘");
    });

    it("기본 스타일이 적용된다", () => {
      expect(button).toHaveClass(
        "bg-gray-900",
        "border-gray-900",
        "h-14",
        "rounded-[14px]",
      );
    });
  });

  describe("스타일 변경", () => {
    beforeEach(cleanup);

    it("size가 small일 때 스타일이 변경된다", () => {
      render(<IconButton size='small'>아이콘</IconButton>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("h-[38px]", "rounded-lg");
    });

    it("variant가 secondary일 때 스타일이 변경된다", () => {
      render(<IconButton variant='secondary'>아이콘</IconButton>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-gray-700", "border-gray-700");
    });

    it("mode가 special일 때 스타일이 변경된다", () => {
      render(<IconButton mode='special'>아이콘</IconButton>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-gray-800", "border-gray-800");
    });

    it("className prop이 정상적으로 병합된다", () => {
      render(<IconButton className='test-class'>아이콘</IconButton>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("test-class");
    });
  });

  describe("이벤트 핸들링", () => {
    beforeEach(cleanup);

    it("클릭 이벤트가 정상적으로 동작한다", () => {
      const handleClick = jest.fn();
      render(<IconButton onClick={handleClick}>아이콘</IconButton>);
      fireEvent.click(screen.getByRole("button"));

      expect(handleClick).toHaveBeenCalled();
    });
  });
});
