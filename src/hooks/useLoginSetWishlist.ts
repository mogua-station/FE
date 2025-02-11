import { fetchUserAllWishlist } from "@/lib/wishlist/wishlistApi";
import useUserWishlist from "@/store/wishlist/useUserWishlist";
import { type CardProps } from "@/types/card";

export default function useLoginSetWishlist() {
  const { setUserAllWishlist } = useUserWishlist();

  const setLoginWishlist = async () => {
    const userInfo = localStorage.getItem("user");
    const userParse = userInfo ? JSON.parse(userInfo) : null;

    const wishlistResponse = await fetchUserAllWishlist(userParse.userId);

    const arr = wishlistResponse.data.map((item: CardProps) => item.meetupId);

    setUserAllWishlist(arr);
  };

  return setLoginWishlist;
}
