import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TagList from "@/components/edit-profile/TagList";
import "@testing-library/jest-dom";

describe("TagList", () => {
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    mockOnDelete.mockClear();
  });

  it("태그 목록이 올바르게 렌더링된다", () => {
    const tags = ["태그1", "태그2", "태그3"];
    render(<TagList tags={tags} onDelete={mockOnDelete} />);

    tags.forEach((tag) => {
      expect(screen.getByText(`# ${tag}`)).toBeInTheDocument();
    });
  });

  it("빈 태그 배열이 주어지면 아무것도 렌더링하지 않는다", () => {
    const { container } = render(<TagList tags={[]} onDelete={mockOnDelete} />);
    expect(container.querySelector("ul")?.children.length).toBe(0);
  });

  it("삭제 버튼 클릭 시 해당 태그의 인덱스와 함께 onDelete가 호출된다", async () => {
    const tags = ["태그1", "태그2", "태그3"];
    render(<TagList tags={tags} onDelete={mockOnDelete} />);

    const deleteButtons = screen.getAllByRole("button", { name: "삭제" });
    await userEvent.click(deleteButtons[0]);

    expect(mockOnDelete).toHaveBeenCalledWith(0);
  });
});
