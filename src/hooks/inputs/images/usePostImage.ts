import { useState } from "react";
import { useIndexedDB } from "./useIndexedDB";

export const usePostImage = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const { loadImage } = useIndexedDB();
  const postImage = async (endpoint: string) => {
    const storedImageFile = await loadImage();
    if (!storedImageFile) {
      setUploadError("이미지가 존재하지 않습니다.");
      return;
    }
    setIsUploading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append("file", storedImageFile);
    // 이미지 포스트 요청
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("이미지 업로드 실패");
      }

      console.log("이미지 업로드 완료!");
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "서버 오류");
    } finally {
      setIsUploading(false);
    }
  };

  return {
    isUploading,
    uploadError,
    postImage,
  };
};
