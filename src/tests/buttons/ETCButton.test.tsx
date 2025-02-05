import { fireEvent, render, screen } from "@testing-library/react";
import ETCButton from "@/components/common/buttons/ETCButton";
import "@testing-library/jest-dom";

describe("ETCButton", () => {
  describe("기본 렌더링", () => {
    render(<ETCButton>버튼</ETCButton>);
    const button = screen.getByRole("button");

    it("버튼이 정상적으로 렌더링된다", () => {
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent("버튼");
    });

    it("default 상태의 스타일이 적용된다", () => {
      expect(button).toHaveClass("bg-gray-800", "border-gray-800");
    });
  });

  describe("스타일 변경", () => {
    it("state가 activated일 때 버튼 스타일이 변경된다", () => {
      render(<ETCButton state='activated'>버튼</ETCButton>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-gray-400", "border-gray-400");
    });

    it("className prop이 정상적으로 병합된다", () => {
      render(<ETCButton className='test-class'>버튼</ETCButton>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("test-class");
    });
  });

  describe("이벤트 핸들링", () => {
    it("클릭 이벤트가 정상적으로 동작한다", () => {
      const handleClick = jest.fn();
      render(<ETCButton onClick={handleClick}>버튼</ETCButton>);
      fireEvent.click(screen.getByRole("button"));

      expect(handleClick).toHaveBeenCalled();
    });
  });
});
