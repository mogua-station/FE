import { fireEvent, render, screen } from "@testing-library/react";
import ProfileImageInput from "@/components/edit-profile/ProfileImageInput";
import "@testing-library/jest-dom";

const mockUseUploadImage = {
  image: null as File | null,
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
    mockUseUploadImage.handleImageUpload.mockClear();
    mockUseUploadImage.handleImageDelete.mockClear();
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

  describe("이미지 업로드", () => {
    it("input이 클릭되고 이미지가 선택되면 handleImageUpload가 실행된다", () => {
      renderProfileImageInput();

      const input = screen.getByTestId("profile-image-input");
      const mockInputClick = jest.fn();
      input.click = mockInputClick;
      fireEvent.click(input);

      const mockImageFile = new File([""], "https://test.com/preview.jpg", {
        type: "image/png",
      });
      fireEvent.change(input, { target: { files: [mockImageFile] } });

      expect(mockUseUploadImage.handleImageUpload).toHaveBeenCalled();
    });

    it("선택한 이미지가 있으면 onImageSelect에 이미지가 전달된다", () => {
      mockUseUploadImage.image = new File(
        [""],
        "https://test.com/preview.jpg",
        {
          type: "image/png",
        },
      );

      renderProfileImageInput();

      expect(mockOnImageSelect).toHaveBeenCalledWith(mockUseUploadImage.image);
    });
  });

  describe("새 프로필 이미지를 선택한 상태", () => {
    beforeEach(() => {
      mockUseUploadImage.previewUrl = "https://test.com/preview.jpg";
    });

    it("선택한 이미지가 프리뷰로 표시된다", () => {
      renderProfileImageInput();
      const image = screen.getByAltText("프로필 이미지");
      expect(image).toHaveAttribute(
        "src",
        expect.stringContaining(
          encodeURIComponent(mockUseUploadImage.previewUrl!),
        ),
      );
    });

    it("hover시 삭제 버튼이 표시된다", () => {
      renderProfileImageInput();
      const container = screen.getByAltText("프로필 이미지")
        .parentElement as HTMLElement;
      fireEvent.mouseEnter(container);
      expect(screen.queryByRole("button")).toBeInTheDocument();
    });

    describe("이미지 해제", () => {
      it("이미지 영역 클릭 시 선택한 이미지가 해제된다", () => {
        renderProfileImageInput();
        const imageContainer = screen.getByAltText("프로필 이미지")
          .parentElement as HTMLElement;
        fireEvent.click(imageContainer);
        expect(mockUseUploadImage.handleImageDelete).toHaveBeenCalled();
        expect(mockOnImageSelect).toHaveBeenCalledWith(null);
      });

      it("카메라 아이콘 클릭 시 선택한 이미지가 해제된다", () => {
        renderProfileImageInput();
        const label = screen.getByTestId("camera-label");
        fireEvent.click(label);
        expect(mockUseUploadImage.handleImageDelete).toHaveBeenCalled();
        expect(mockOnImageSelect).toHaveBeenCalledWith(null);
      });
    });
  });
});
