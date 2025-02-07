import { fireEvent, render, screen } from "@testing-library/react";
import ProfileImageInput from "@/components/edit-profile/ProfileImageInput";
import "@testing-library/jest-dom";

const mockUseUploadImage = {
  image: null,
  previewUrl: null as string | null,
  handleImageUpload: jest.fn(),
  handleImageDelete: jest.fn(),
};

jest.mock("@/hooks/inputs/images/useUploadImage", () => ({
  useUploadImage: () => mockUseUploadImage,
}));

describe("ProfileImageInput", () => {
  const mockProfileImg = "https://test.com/profile.jpg";
  const mockOnImageSelect = jest.fn();

  const renderProfileImageInput = () => {
    render(
      <ProfileImageInput
        profileImg={mockProfileImg}
        onImageSelect={mockOnImageSelect}
      />,
    );
  };

  beforeEach(() => {
    mockUseUploadImage.previewUrl = null;
    mockOnImageSelect.mockClear();
  });

  describe("새 프로필 이미지를 선택하지 않은 상태", () => {
    it("기존의 프로필 이미지가 표시된다", () => {
      renderProfileImageInput();
      const image = screen.getByAltText("프로필 이미지");
      expect(image).toHaveAttribute(
        "src",
        expect.stringContaining(encodeURIComponent(mockProfileImg)),
      );
    });

    it("hover해도 삭제버튼이 표시되지 않는다", () => {
      renderProfileImageInput();
      const container = screen.getByAltText("프로필 이미지")
        .parentElement as HTMLElement;
      fireEvent.mouseEnter(container);
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("카메라 아이콘 클릭 시 input의 click 이벤트가 트리거된다", () => {
      renderProfileImageInput();

      const input = screen.getByTestId("profile-image-input");
      const label = screen.getByTestId("camera-label");

      const mockInputClick = jest.fn();
      input.click = mockInputClick;

      fireEvent.click(label);
      expect(mockInputClick).toHaveBeenCalled();
    });

    it("이미지 영역 클릭 시 input의 click 이벤트가 트리거된다", () => {
      renderProfileImageInput();

      const input = screen.getByTestId("profile-image-input");
      const imageContainer = screen.getByAltText("프로필 이미지")
        .parentElement as HTMLElement;

      const mockInputClick = jest.fn();
      input.click = mockInputClick;

      fireEvent.click(imageContainer);
      expect(mockInputClick).toHaveBeenCalled();
    });
  });

  describe("새 프로필 이미지를 선택한 상태", () => {
    it("선택한 새 이미지가 프리뷰로 표시된다", () => {});

    it("hover시 삭제 버튼이 표시된다", () => {});

    it("이미지 영역이나 카메라 아이콘 클릭 시 선택한 이미지가 해제된다", () => {});

    it("새 이미지 선택이 차단된다", () => {});
  });
});
