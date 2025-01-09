import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import NavMenuItem from "@/components/common/nav-bar/NavMenuItem";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("NavMenuItem", () => {
  it("icon, label 렌더링 테스트", () => {
    render(
      <NavMenuItem
        href='/test'
        icon={<span data-testid='icon'>Icon</span>}
        label='Test Label'
      />,
    );

    expect(screen.getByTestId("icon")).toBeTruthy(); // 아이콘 렌더링 확인
    expect(screen.getByText("Test Label")).toBeTruthy(); // 라벨 렌더링 확인
  });

  it("pathname===href일 때 버튼 스타일 테스트(활성화 상태)", () => {
    (usePathname as jest.Mock).mockReturnValue("/test");

    render(
      <NavMenuItem href='/test' icon={<span>Icon</span>} label='Active Item' />,
    );

    const link = screen.getByRole("link", { name: /active item/i });
    expect(link.className).toContain("text-gray-200"); // active style 확인
  });

  it("pathname!=href일 때 버튼 스타일 테스트(비활성화 상태)", () => {
    (usePathname as jest.Mock).mockReturnValue("/different");

    render(
      <NavMenuItem
        href='/test'
        icon={<span>Icon</span>}
        label='Inactive Item'
      />,
    );

    const link = screen.getByRole("link", { name: /inactive item/i });
    expect(link.className).toContain("text-gray-500"); // inactive style 확인
  });
});
