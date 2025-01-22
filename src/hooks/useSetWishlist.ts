import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteUserWishList,
  addUserWishlist,
} from "@/lib/wishlist/wishlistApi";
import useUserWishlist from "@/store/wishlist/useUserWishlist";

interface WishlistProps {
  meetupId: number;
  callback?: () => void;
}

//찜하기, 찜 취소 hooks
export default function useSetWishlist() {
  const { userWishlist, setUserWishlist } = useUserWishlist();

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: ({ meetupId }: WishlistProps) => deleteUserWishList(meetupId),
    onSuccess: (variables) => {
      const { meetupId, callback } = variables;

      const updatedWishlist = userWishlist.filter(
        (item: number) => item !== meetupId,
      );
      setUserWishlist(updatedWishlist);
      queryClient.refetchQueries({ queryKey: ["userWishlist"] });
      if (callback != null) {
        callback();
      }
    },
  });

  const addMutation = useMutation({
    mutationFn: ({ meetupId }: WishlistProps) => addUserWishlist(meetupId),
    onSuccess: (variables) => {
      const { meetupId, callback } = variables;

      const updatedWishlist = [...userWishlist, meetupId];
      setUserWishlist(updatedWishlist);
      queryClient.refetchQueries({ queryKey: ["userWishlist"] });
      if (callback != null) {
        callback();
      }
    },
  });

  return { deleteMutation, addMutation };
}
