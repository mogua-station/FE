import { Fragment, useState, useEffect } from "react";
import Bookmark from "@/assets/images/icons/bookmark.svg";
import BookmarkActive from "@/assets/images/icons/bookmark_active.svg";
import useChangeWishlist from "@/hooks/useChangeWishlist";
import useUserStore from "@/store/auth/useUserStore";
import useUserWishlist from "@/store/wishlist/useUserWishlist";
import { type CardProps } from "@/types/card";

export default function CardWishlist({
  wishlistInfo,
}: {
  wishlistInfo: Pick<CardProps, "meetupId" | "meetupStatus" | "isMypage">;
}) {
  const { user } = useUserStore();
  const { userAllWishlist } = useUserWishlist();
  const [wishlist, setWishlist] = useState<number[]>([]);
  const { loggedInWishlist, nonLoggedInWishlist } = useChangeWishlist();
  const [isComplete, setIsComplete] = useState(true);

  const handleClickWishlist = (e: React.MouseEvent) => {
    // 부모로 이벤트 전달 막기
    e.stopPropagation();

    // 이미 요청 중이라면 함수 종료
    if (!isComplete) return;

    // 로딩 상태로 전환
    setIsComplete(false);

    if (user != null) {
      // 로그인 상태 처리
      loggedInWishlist(wishlistInfo.meetupId, wishlistInfo.meetupStatus);
    } else {
      // 비로그인 상태 처리
      nonLoggedInWishlist(
        wishlistInfo.meetupId,
        wishlistInfo.meetupStatus,
        setWishlist,
      );
    }

    setIsComplete(true);
  };

  useEffect(() => {
    if (user === null) {
      // user가 null일 경우, localStorage에서 wishlist를 가져와서 상태를 설정
      const myWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setWishlist(myWishlist);
    } else {
      // user가 있을 경우, 전역 상태관리에 저장된 userWishlist 상태를 그대로 사용
      setWishlist(userAllWishlist);
    }
  }, [user, userAllWishlist]);

  return (
    <Fragment>
      {!wishlistInfo.isMypage && (
        <button onClick={(e) => handleClickWishlist(e)}>
          {wishlist.includes(wishlistInfo.meetupId) ? (
            <BookmarkActive
              className='size-6 text-orange-200'
              aria-label='active'
            />
          ) : (
            <Bookmark className='size-6' aria-label='default' />
          )}
        </button>
      )}
    </Fragment>
  );
}
