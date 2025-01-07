import { useState, useEffect } from "react";

export const useUploadImage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // 페이지가 로드될 때 로컬 저장소에서 이미지 미리보기 URL을 가져오기
  useEffect(() => {
    const savedImage = localStorage.getItem("uploadedImage");
    if (savedImage) {
      setPreviewUrl(savedImage);
    }
  }, []);

  // 이미지 선택 처리
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 이미지 파일 형식 검사
      if (!file.type.startsWith("image/")) {
        alert("이미지 파일만 업로드 가능합니다.");
        setImage(null);
        setPreviewUrl(null);
        return;
      }

      // 이미지 미리보기 처리
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      setImage(file);

      localStorage.setItem("uploadedImage", objectUrl);
    }
  };

  // 이미지 삭제 처리
  const handleImageDelete = (event: React.MouseEvent) => {
    event.stopPropagation(); // 부모 클릭 방지 (input 파일 선택)
    setImage(null);
    setPreviewUrl(null);

    localStorage.removeItem("uploadedImage");
  };

  return {
    image,
    previewUrl,
    handleImageChange,
    handleImageDelete,
  };
};
