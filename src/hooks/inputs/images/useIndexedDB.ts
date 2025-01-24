import { openDB, type IDBPDatabase } from "idb";

const DB_NAME = "image-store";
const STORE_NAME = "images";
const DB_VERSION = 1;

let db: IDBPDatabase | null = null;

const initDB = async () => {
  if (db) return db;

  db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
  return db;
};

export const useIndexedDB = () => {
  const storeImage = async (file: File) => {
    try {
      const db = await initDB();
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const imageData = {
        id: Date.now(),
        file,
      };

      await store.put(imageData);
      await tx.done;
    } catch (error) {
      console.error("이미지 저장 오류:", error);
      throw error;
    }
  };

  const loadImage = async (): Promise<File | null> => {
    try {
      const db = await initDB();
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);

      const allImages = await store.getAll();
      await tx.done;
      return allImages.length > 0 ? allImages[0].file : null;
    } catch (error) {
      console.error("IndexedDB 불러오기 오류:", error);
      throw error;
    }
  };

  const deleteImage = async () => {
    try {
      const db = await initDB();
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);

      const images = await store.getAll();
      if (images.length > 0) {
        await store.delete(images[0].id);
      }
      await tx.done;
    } catch (error) {
      console.error("이미지 삭제 오류:", error);
      throw error;
    }
  };

  return { storeImage, loadImage, deleteImage };
};
