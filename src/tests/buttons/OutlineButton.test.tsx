import { fireEvent, render, screen } from "@testing-library/react";
import OutlineButton from "@/components/common/buttons/OutlineButton";
import "@testing-library/jest-dom";

describe("OutlineButton", () => {
  describe("기본 렌더링", () => {
    it("버튼이 정상적으로 렌더링된다", () => {
      render(<OutlineButton>버튼</OutlineButton>);
      const button = screen.getByRole("button");

      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent("버튼");
    });

    it("기본 스타일(primary + large + default)이 적용된다", () => {
      render(<OutlineButton>버튼</OutlineButton>);
      const button = screen.getByRole("button");

      expect(button).toHaveClass(
        "rounded-2xl px-4 gap-2.5 h-14 text-body-1-normal font-semibold",
      );
    });
  });

  describe("스타일 변경", () => {
    describe("primary variant", () => {
      describe("size 스타일", () => {
        it("small 스타일이 적용된다", () => {
          render(
            <OutlineButton variant='primary' size='small'>
              버튼
            </OutlineButton>,
          );
          expect(screen.getByRole("button")).toHaveClass(
            "rounded-[6px] px-4 gap-1 h-[38px] text-label-normal font-semibold",
          );
        });
      });

      describe("state 스타일", () => {
        it("activated 스타일이 적용된다", () => {
          render(
            <OutlineButton variant='primary' state='activated'>
              버튼
            </OutlineButton>,
          );
          expect(screen.getByRole("button")).toHaveClass(
            "border-orange-300 border-[0.5px] text-gray-300",
          );
        });

        it("inactive 스타일이 적용된다", () => {
          render(
            <OutlineButton variant='primary' state='inactive'>
              버튼
            </OutlineButton>,
          );
          expect(screen.getByRole("button")).toHaveClass(
            "border-gray-800 border-[0.5px] text-gray-500 cursor-not-allowed",
          );
        });
      });
    });

    describe("secondary variant", () => {
      describe("size 스타일", () => {
        it("large 스타일이 적용된다", () => {
          render(
            <OutlineButton variant='secondary' size='large'>
              버튼
            </OutlineButton>,
          );
          expect(screen.getByRole("button")).toHaveClass(
            "h-14 gap-2 text-body-1-normal font-semibold px-4 rounded-[14px]",
          );
        });

        it("small 스타일이 적용된다", () => {
          render(
            <OutlineButton variant='secondary' size='small'>
              버튼
            </OutlineButton>,
          );
          expect(screen.getByRole("button")).toHaveClass(
            "h-[38px] gap-1 text-body-2-normal font-semibold px-3.5 rounded-lg",
          );
        });
      });
    });
  });

  describe("props 전달", () => {
    it("className이 정상적으로 병합된다", () => {
      render(<OutlineButton className='test-class'>버튼</OutlineButton>);
      const button = screen.getByRole("button");

      expect(button).toHaveClass("test-class");
    });

    it("HTML 버튼 속성이 정상적으로 전달된다", () => {
      render(<OutlineButton type='button'>버튼</OutlineButton>);
      const button = screen.getByRole("button");

      expect(button).toHaveAttribute("type", "button");
    });
  });

  describe("이벤트 핸들링", () => {
    it("클릭 이벤트가 정상적으로 동작한다", () => {
      const handleClick = jest.fn();
      render(<OutlineButton onClick={handleClick}>버튼</OutlineButton>);
      fireEvent.click(screen.getByRole("button"));

      expect(handleClick).toHaveBeenCalled();
    });

    it("inactive 상태에서는 클릭 이벤트가 발생하지 않는다", () => {
      const handleClick = jest.fn();
      render(
        <OutlineButton state='inactive' onClick={handleClick}>
          버튼
        </OutlineButton>,
      );
      fireEvent.click(screen.getByRole("button"));

      expect(handleClick).not.toHaveBeenCalled();
    });
  });
});
