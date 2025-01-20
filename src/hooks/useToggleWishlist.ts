import { useQueryClient } from "@tanstack/react-query";
export default function useToggleWishlist() {
  const queryClient = useQueryClient();
  const toggleWishlist = (id: number): boolean => {
    //캐싱 데이터로 현재 로그인 상태인지 확인
    const user = queryClient.getQueryData(["user"]);

    if (user) {
      //로그인이 되어있을 때
      return false;
    } else {
      //비로그인 시
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

      //이미 추가되었는지 확인
      if (!wishlist.includes(id)) {
        wishlist.push(id);

        localStorage.setItem("wishlist", JSON.stringify(wishlist));

        alert("찜하기가 완료되었습니다.");
        return true;
      } else {
        const idx = wishlist.indexOf(id);
        //해당 요소 삭제
        wishlist.splice(idx, 1);

        localStorage.setItem("wishlist", JSON.stringify(wishlist));

        alert("찜하기가 취소되었습니다.");
        return false;
      }
    }
  };
  return toggleWishlist;
}
