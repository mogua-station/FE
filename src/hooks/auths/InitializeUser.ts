"use client";

import { useQuery } from "@tanstack/react-query";
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

  const { data } = useQuery({
    queryKey: ["userAllWishlist"],
    queryFn: async () => fetchUserAllWishlist(userInfo?.userId as number),
    enabled: !!userInfo && !!userInfo.userId,
    retry: 1,
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
    if (data != null && data.data != null) {
      const ids = data.data.map((item: CardProps) => item.meetupId) || [];
      setUserAllWishlist(ids);
      localStorage.setItem("wishlist", JSON.stringify([]));
    }
  }, [data]);

  return null;
}
