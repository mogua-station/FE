import { fireEvent, render, screen } from "@testing-library/react";
import SolidButton from "@/components/common/buttons/SolidButton";
import "@testing-library/jest-dom";

describe("SolidButton", () => {
  describe("기본 렌더링", () => {
    it("버튼이 정상적으로 렌더링된다", () => {
      render(<SolidButton>버튼</SolidButton>);
      const button = screen.getByRole("button");

      expect(button).toBeInTheDocument();
    });

    it("기본 스타일(primary + large + default)이 적용된다", () => {
      render(<SolidButton>버튼</SolidButton>);
      const button = screen.getByRole("button");

      expect(button).toHaveClass(
        "btn-base h-14 px-2.5 gap-2.5 font-semibold rounded-2xl bg-gray-800 border-gray-800 text-gray-200",
      );
    });
  });

  describe("스타일 변경", () => {
    describe("variant + size 스타일", () => {
      describe("primary variant", () => {
        it("small size", () => {
          render(<SolidButton size='small'>버튼</SolidButton>);
          expect(screen.getByRole("button")).toHaveClass(
            "btn-base",
            "h-10 rounded-[6px] px-2.5 py-2 gap-1  font-medium",
            "bg-gray-800 border-gray-800 text-gray-200",
          );
        });
      });

      describe("secondary variant", () => {
        it("large size", () => {
          render(
            <SolidButton variant='secondary' size='large'>
              버튼
            </SolidButton>,
          );
          expect(screen.getByRole("button")).toHaveClass(
            "btn-base",
            "h-[54px] px-4 gap-2.5 font-semibold rounded-2xl",
            "bg-gray-800 border-gray-800 text-gray-200",
          );
        });

        it("small size", () => {
          render(
            <SolidButton variant='secondary' size='small'>
              버튼
            </SolidButton>,
          );
          expect(screen.getByRole("button")).toHaveClass(
            "btn-base",
            "h-[38px] rounded-[6px] px-4 gap-1 font-semibold",
            "bg-gray-800 border-gray-800 text-gray-200",
          );
        });
      });
    });

    describe("state + mode 스타일", () => {
      it("default + special mode", () => {
        render(
          <SolidButton mode='special'>
            <span>버튼</span>
          </SolidButton>,
        );
        expect(screen.getByRole("button")).toHaveClass(
          "bg-gray-700 border-gray-700 text-gray-200",
        );
      });

      it("activated state", () => {
        render(<SolidButton state='activated'>버튼</SolidButton>);
        expect(screen.getByRole("button")).toHaveClass(
          "bg-orange-300 border-orange-300 text-gray-50",
        );
      });

      it("inactive state", () => {
        render(<SolidButton state='inactive'>버튼</SolidButton>);
        expect(screen.getByRole("button")).toHaveClass(
          "bg-gray-800 border-gray-800 text-gray-500 cursor-not-allowed",
        );
      });
    });
  });

  describe("props 전달", () => {
    it("className이 정상적으로 병합된다", () => {
      render(<SolidButton className='test-class'>버튼</SolidButton>);
      const button = screen.getByRole("button");

      expect(button).toHaveClass("test-class");
    });

    it("HTML 버튼 속성이 정상적으로 전달된다", () => {
      render(<SolidButton type='button'>버튼</SolidButton>);
      const button = screen.getByRole("button");

      expect(button).toHaveAttribute("type", "button");
    });
  });

  describe("이벤트 핸들링", () => {
    it("클릭 이벤트가 정상적으로 동작한다", () => {
      const handleClick = jest.fn();
      render(<SolidButton onClick={handleClick}>버튼</SolidButton>);
      fireEvent.click(screen.getByRole("button"));

      expect(handleClick).toHaveBeenCalled();
    });

    it("inactive 상태에서는 클릭 이벤트가 발생하지 않는다", () => {
      const handleClick = jest.fn();
      render(
        <SolidButton state='inactive' onClick={handleClick}>
          버튼
        </SolidButton>,
      );
      fireEvent.click(screen.getByRole("button"));

      expect(handleClick).not.toHaveBeenCalled();
    });
  });
});
