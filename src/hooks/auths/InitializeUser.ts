"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { addUserWishlist } from "@/lib/wishlist/wishlistApi";
import { fetchUserAllWishlist } from "@/lib/wishlist/wishlistApi";
import useUserStore from "@/store/auth/useUserStore";
import useUserWishlist from "@/store/wishlist/useUserWishlist";
import { type CardProps } from "@/types/card";

export default function InitializeUser() {
  const { setUserAllWishlist } = useUserWishlist();
  const userInfo =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null;
  const userId = userInfo?.userId;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ["userAllWishlist", userId],
      queryFn: ({ pageParam }) =>
        fetchUserAllWishlist({
          userId,
          pageParams: pageParam,
        }),
      getNextPageParam: (lastPage) => {
        return lastPage.isNext !== -1 ? lastPage.page + 1 : undefined;
      },
      initialPageParam: 0,
      enabled: !!userId,
      select: (data) => data.pages.flatMap((ele) => ele.data.data || []),
    });

  useEffect(() => {
    const performanceEntries =
      window.performance.getEntriesByType("navigation");
    if (performanceEntries.length > 0) {
      const navigation = performanceEntries[0] as PerformanceNavigationTiming;

      if (navigation.type === "reload") {
        const user = localStorage.getItem("user");
        if (user) {
          useUserStore.getState().setUser(JSON.parse(user));
        }
      }
    }
  }, []);

  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (data) {
      const arr = data.map((item: CardProps) => item.meetupId);
      setUserAllWishlist(arr);
    }
  }, [data, setUserAllWishlist]);

  //로그인했을 때 비회원 찜했 던 모임 추가
  useEffect(() => {
    const localWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

    //로컬스토리지에 있던 비회원 찜하기들을 다시 동기화
    Promise.all(
      localWishlist.map((item: number) => {
        addUserWishlist(item);
      }),
    )
      .then(() => {
        //모두 추가하고나서는 다시 refetch
        refetch();
      })
      .catch((error) => {
        throw error;
      });

    //왼료되었으면 로컬스토리지 초기화
    localStorage.setItem("wishlist", JSON.stringify([]));
  }, [userInfo]);

  return null;
}
