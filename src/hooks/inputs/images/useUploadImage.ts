import { useState, useEffect } from "react";
import { useIndexedDB } from "./useIndexedDB";

export const useUploadImage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { storeImage, loadImage, deleteImage } = useIndexedDB();

  // 페이지가 로드될 때 IDB 이미지 미리보기 URL을 가져오기
  useEffect(() => {
    const loadImageFromIDB = async () => {
      const storedImage = await loadImage();
      if (storedImage) {
        const objUrl = URL.createObjectURL(storedImage);
        setPreviewUrl(objUrl);
      }
    };
    loadImageFromIDB();
  }, [loadImage]);

  // 이미지 선택 처리
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
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

      // 이미지 저장 (async/await 사용)
      try {
        await storeImage(file);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // 이미지 삭제 처리
  const handleImageDelete = async (event: React.MouseEvent) => {
    event.stopPropagation(); // 부모 클릭 방지 (input 파일 선택)
    try {
      await deleteImage();
      setImage(null);
      setPreviewUrl(null);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    image,
    previewUrl,
    handleImageUpload,
    handleImageDelete,
  };
};
