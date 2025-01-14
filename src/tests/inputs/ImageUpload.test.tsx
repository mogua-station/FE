import { render, screen, fireEvent } from "@testing-library/react";
import CommonImageInput from "@/components/common/inputs/ImageUpload";
import { useUploadImage } from "@/hooks/inputs/images/useUploadImage";
import "@testing-library/jest-dom";

jest.mock("@/hooks/inputs/images/useUploadImage");

describe("CommonImageInput", () => {
  const mockHandleImageChange = jest.fn();
  const mockHandleImageDelete = jest.fn();
  const mockPreviewUrl = "https://example.com/preview.png";

  beforeEach(() => {
    (useUploadImage as jest.Mock).mockReturnValue({
      previewUrl: mockPreviewUrl,
      handleImageChange: mockHandleImageChange,
      handleImageDelete: mockHandleImageDelete,
    });
  });

  it("라벨을 렌더링해야 합니다.", () => {
    render(<CommonImageInput label='이미지 업로드' />);

    const labelElement = screen.getByText(/이미지 업로드/i);
    expect(labelElement).toBeInTheDocument();
  });

  it("업로드 영역이 클릭되면 파일 선택 창이 제대로 떠야 합니다.", () => {
    render(<CommonImageInput label='Upload Image' />);

    const uploadButton = screen.getByRole("button");
    const fileInput = screen.getByLabelText("Upload Image");

    fireEvent.click(uploadButton);

    // The file input should be opened
    expect(fileInput).toBeVisible();
  });

  it("이미지가 선택되면 이미지 미리보기가 동작해야 합니다.", () => {
    render(<CommonImageInput label='Upload Image' />);

    const previewImage = screen.getByRole("img");
    expect(previewImage).toHaveAttribute("src", mockPreviewUrl);
  });

  it("삭제 버튼이 눌리면 handleImageDelete가 작동해야 합니다.", () => {
    render(<CommonImageInput label='Upload Image' />);

    const deleteButton = screen.getByText("X");

    fireEvent.click(deleteButton);

    expect(mockHandleImageDelete).toHaveBeenCalledTimes(1);
  });
});
