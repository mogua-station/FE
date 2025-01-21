import { create } from "zustand";

interface UserWishlist {
  userWishlist: number[];
  setUserWishlist: (updatedWishlist: number[]) => void;
}

const useUserStore = create<UserWishlist>((set) => ({
  userWishlist: [], // 초기 상태로 빈 배열 설정
  setUserWishlist: (updatedWishlist) => {
    set(() => ({
      userWishlist: updatedWishlist, // 상태를 새로운 배열로 업데이트
    }));
  },
}));

export default useUserStore;
