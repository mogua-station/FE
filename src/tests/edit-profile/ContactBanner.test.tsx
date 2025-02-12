import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import ContactBanner from "@/components/edit-profile/ContactBanner";
import { SYSTEM_ALERTS } from "@/constants/alerts";

describe("ContactBanner", () => {
  beforeEach(() => {
    render(<ContactBanner />);
  });

  it("텍스트가 올바르게 표시된다", () => {
    const paragraph = screen.getByText(/운영자 문의 후 과외 선생님으로/);
    expect(paragraph).toBeInTheDocument();
  });

  it("배너 클릭 시 준비 중 알림이 표시된다", () => {
    const banner = screen.getByRole("button");
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
    banner.click();
    expect(alertMock).toHaveBeenCalledWith(SYSTEM_ALERTS.IN_PROGRESS);
  });
});
