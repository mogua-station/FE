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

  describe("렌더링", () => {
    it("유저 프로필 이미지가 올바르게 렌더링된다", () => {
      renderProfileImageInput();

      const image = screen.getByAltText("프로필 이미지");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute(
        "src",
        expect.stringContaining(encodeURIComponent(mockProfileImg)),
      );
    });
  });

  describe("이미지 업로드", () => {
    it("카메라 아이콘 클릭 시 파일 선택이 트리거된다", () => {});

    it("이미지 영역 클릭 시 파일 선택이 트리거된다", () => {});

    it("이미지 선택 시 미리보기가 표시된다", () => {});

    it("이미지 선택 시 onImageSelect가 호출된다", () => {});
  });

  describe("호버 상태", () => {
    beforeEach(() => {
      mockUseUploadImage.previewUrl = "https://test.com/preview.jpg";
    });

    it("미리보기 상태에서 호버 시 삭제 아이콘이 표시된다", () => {
      renderProfileImageInput();

      const container = screen.getByAltText("프로필 이미지").parentElement;
      fireEvent.mouseEnter(container!);

      const deleteButton = screen.getByRole("button");
      expect(deleteButton).toBeInTheDocument();
    });

    it("호버 해제 시 삭제 아이콘이 숨겨진다", () => {
      renderProfileImageInput();

      const container = screen.getByAltText("프로필 이미지").parentElement;
      fireEvent.mouseLeave(container!);

      const deleteButton = screen.queryByRole("button");
      expect(deleteButton).not.toBeInTheDocument();
    });
  });

  /*   describe("이미지 삭제", () => {
    it("미리보기 상태에서 이미지 영역 클릭 시 이미지가 삭제된다", () => {});

    it("이미지 삭제 시 onImageSelect(null)이 호출된다", () => {});
  }); */
});
