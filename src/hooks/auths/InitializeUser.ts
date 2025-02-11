"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
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

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
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

          //로그인했으니 로컬스토리지 초기화
          localStorage.setItem("wishlist", JSON.stringify([]));
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

  return null;
}
