import { render, screen } from "@testing-library/react";
import Tag from "@/components/edit-profile/Tag";
import "@testing-library/jest-dom";

describe("Tag", () => {
  it("태그 텍스트가 #과 함께 표시된다", () => {
    render(<Tag tag='태그' />);
    expect(screen.getByText("# 태그")).toBeInTheDocument();
  });

  it("children이 있으면 함께 표시된다", () => {
    render(
      <Tag tag='태그'>
        <button type='button'>x</button>
      </Tag>,
    );
    expect(screen.getByText("# 태그")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
