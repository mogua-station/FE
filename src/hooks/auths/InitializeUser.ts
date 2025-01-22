"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchUserWishlist } from "@/lib/wishlist/wishlistApi";
import useUserStore from "@/store/auth/useUserStore";
import useUserWishlist from "@/store/wishlist/useUserWishlist";
import { type CardProps } from "@/types/card";

export default function InitializeUser() {
  const [userId, setUserId] = useState<number | null>(null);
  const { setUserWishlist } = useUserWishlist();

  const { data } = useQuery({
    queryKey: ["userWishlist"],
    queryFn: async () => fetchUserWishlist(userId as number),
    enabled: userId != null,
    retry: false,
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

          setUserId(JSON.parse(user).userId);
          console.log(123);
          localStorage.setItem("wishlist", JSON.stringify([]));
        }
      }
    }
  }, []);

  useEffect(() => {
    if (data != null) {
      const ids = data.data.map((item: CardProps) => item.meetupId);
      setUserWishlist(ids);
      localStorage.setItem("wishlist", JSON.stringify([]));
    }
  }, [data]);

  return null;
}
