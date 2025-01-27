import { create } from "zustand";

interface UserWishlist {
  userAllWishlist: number[];
  setUserAllWishlist: (updatedWishlist: number[]) => void;
}

const useUserWishlist = create<UserWishlist>((set) => ({
  userAllWishlist: [], // 초기 상태로 빈 배열 설정
  setUserAllWishlist: (updatedWishlist) => {
    set(() => ({
      userAllWishlist: updatedWishlist, // 상태를 새로운 배열로 업데이트
    }));
  },
}));

export default useUserWishlist;
