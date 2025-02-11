import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AccountActionButtons from "@/components/edit-profile/AccountActionButtons";
import "@testing-library/jest-dom";
import { SYSTEM_ALERTS } from "@/constants/alerts";

const mockReplace = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
}));

const mockSignOut = jest.fn();
jest.mock("@/hooks/auths/useSignOut", () => () => ({
  handleSignOut: mockSignOut,
}));

describe("AccountActionButtons", () => {
  describe("로그아웃", () => {
    beforeEach(() => {
      render(<AccountActionButtons />);
    });

    it("로그아웃 버튼이 올바르게 렌더링된다", () => {
      const logoutButton = screen.getByRole("button", { name: "로그아웃" });
      expect(logoutButton).toBeInTheDocument();
    });

    it("버튼 클릭시 로그아웃 후 홈으로 이동한다 ", async () => {
      const logoutButton = screen.getByRole("button", { name: "로그아웃" });
      await userEvent.click(logoutButton);
      expect(mockSignOut).toHaveBeenCalled();
      expect(mockReplace).toHaveBeenCalledWith("/");
    });
  });

  // 탈퇴하기 버튼 렌더링
  // 클릭시 준비 중 알림
  describe("탈퇴하기", () => {
    beforeEach(() => {
      render(<AccountActionButtons />);
    });

    it("탈퇴하기 버튼이 올바르게 렌더링된다", () => {
      const deleteButton = screen.getByRole("button", { name: "탈퇴하기" });
      expect(deleteButton).toBeInTheDocument();
    });

    it("탈퇴하기 버튼 클릭시 준비 중 알림이 표시된다", () => {
      const deleteButton = screen.getByRole("button", { name: "탈퇴하기" });
      const alertMock = jest
        .spyOn(window, "alert")
        .mockImplementation(() => {});
      deleteButton.click();
      expect(alertMock).toHaveBeenCalledWith(SYSTEM_ALERTS.IN_PROGRESS);
    });
  });
});
