import { openDB } from "idb";

export const useIndexedDB = () => {
  const storeImage = async (file: File) => {
    try {
      const db = await openDB("image-store", 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains("images")) {
            // 'images' 객체 저장소가 없으면 새로 생성
            db.createObjectStore("images", {
              keyPath: "id",
              autoIncrement: true,
            });
          }
        },
      });
      const transaction = db.transaction("images", "readwrite");
      const store = transaction.objectStore("images");
      const imageData = {
        id: Date.now(),
        file,
      };

      await store.put(imageData);
      await transaction.oncomplete;
    } catch (error) {
      console.log("이미지 저장 오류:", error);
    }
  };

  // 이미지 불러오기
  const loadImage = async () => {
    try {
      const db = await openDB("image-store", 1);
      const transaction = db.transaction("images", "readonly");
      const store = transaction.objectStore("images");

      const allImages = await store.getAll();
      return allImages.length > 0 ? allImages[0].file : null;
    } catch (error) {
      console.error("IndexedDB 불러오기 오류:", error);
      return null;
    }
  };

  // 이미지 삭제
  const deleteImage = async () => {
    try {
      const db = await openDB("image-store", 1);
      const transaction = db.transaction("images", "readwrite");
      const store = transaction.objectStore("images");

      const images = await store.getAll();
      if (images.length > 0) {
        const imageId = images[0].id;
        await store.delete(imageId);
        await transaction.oncomplete;
      }
    } catch (error) {
      console.log("이미지 삭제 오류:", error);
    }
  };

  return { storeImage, loadImage, deleteImage };
};
