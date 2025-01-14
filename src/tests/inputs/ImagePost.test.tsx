import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useIndexedDB } from "@/hooks/inputs/images/useIndexedDB";
import { usePostImage } from "@/hooks/inputs/images/usePostImage";
import "@testing-library/jest-dom";

// fetch와 useIndexedDB를 모킹합니다.
global.fetch = jest.fn();
jest.mock("@/hooks/inputs/images/useIndexedDB", () => ({
  useIndexedDB: jest.fn(),
}));

describe("usePostImage", () => {
  const mockImageFile = new Blob(["image content"], { type: "image/png" });
  const mockEndpoint = "/upload-endpoint";

  beforeEach(() => {
    // useIndexedDB 모킹
    (useIndexedDB as jest.Mock).mockReturnValue({
      loadImage: jest.fn().mockResolvedValue(mockImageFile),
    });
  });

  it("postImage()가 호출되면 POST 요청이 제대로 보내져야 합니다.", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "이미지 포스트 완료!" }),
    });

    // 컴포넌트 테스트
    const TestComponent = () => {
      const { isUploading, uploadError, postImage } = usePostImage();

      return (
        <div>
          <button
            onClick={() => postImage(mockEndpoint)}
            disabled={isUploading}
          >
            POST Image
          </button>
          {isUploading && <p>Uploading...</p>}
          {uploadError && <p>Error: {uploadError}</p>}
        </div>
      );
    };

    render(<TestComponent />);

    // 업로드 버튼 클릭
    fireEvent.click(screen.getByText("POST Image"));
    // POST 요청이 제대로 호출됐는지 확인
    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(
        mockEndpoint,
        expect.objectContaining({
          method: "POST",
          body: expect.any(FormData), // FormData 객체가 포함되어야 함
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );

    // 업로드 완료 후 서버 응답 확인
    await waitFor(() =>
      expect(screen.queryByText("Uploading...")).not.toBeInTheDocument(),
    );
  });

  it("이미지 포스트 실패 후 에러를 일으킵니다.", async () => {
    (useIndexedDB as jest.Mock).mockReturnValue({
      loadImage: jest.fn().mockResolvedValue(null), // 이미지가 없는 경우
    });

    const TestComponent = () => {
      const { isUploading, uploadError, postImage } = usePostImage();

      return (
        <div>
          <button
            onClick={() => postImage(mockEndpoint)}
            disabled={isUploading}
          >
            POST Image
          </button>
          {isUploading && <p>Uploading...</p>}
          {uploadError && <p>Error: {uploadError}</p>}
        </div>
      );
    };

    render(<TestComponent />);

    // 업로드 버튼 클릭
    fireEvent.click(screen.getByText("POST Image"));

    // 에러 메시지가 나타나는지 확인
    await waitFor(() =>
      expect(
        screen.getByText("Error: 이미지가 존재하지 않습니다."),
      ).toBeInTheDocument(),
    );
  });
});
