import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Error, { type ErrorProps } from "@/app/error";
import "@testing-library/jest-dom";

const mockReplace = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
}));

describe("error 컴포넌트", () => {
  const errorMessage = "요청하신 정보를 찾을 수 없습니다.";
  const mockError: ErrorProps["error"] = {
    name: "Error",
    message: "요청하신 정보를 찾을 수 없습니다.",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    render(<Error error={mockError} />);
  });

  it("에러 메세지를 표시한다", () => {
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("전달받은 에러 메세지가 없으면 기본 메세지를 표시한다", () => {
    const mockErrorWithoutMessage: ErrorProps["error"] = {
      name: "Error",
      message: "",
    } as const;

    render(<Error error={mockErrorWithoutMessage} />);
    expect(screen.getByText("오류가 발생했습니다.")).toBeInTheDocument();
  });

  it("홈으로 돌아가기 버튼 클릭시 홈으로 이동한다", async () => {
    const button = screen.getByText("홈으로 돌아가기");
    await userEvent.click(button);

    expect(mockReplace).toHaveBeenCalledWith("/");
  });
});
