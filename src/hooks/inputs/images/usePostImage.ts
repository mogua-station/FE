import { useEffect, useState } from "react";

export const usePostImage = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // 로컬 스토리지에 저장된 이미지 URL 가져오기
  // 클라이언트 사이드에서만 localStorage 접근하도록 설정
  useEffect(() => {
    if (typeof window !== "undefined") {
      setImageUrl(localStorage.getItem("uploadedImage"));
    }
  }, []);

  const postImage = async (endpoint: string) => {
    if (!imageUrl) {
      return;
    }
    setIsUploading(true);
    setUploadError(null);
    // 이미지 포스트 요청
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify({ imageUrl }),
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
