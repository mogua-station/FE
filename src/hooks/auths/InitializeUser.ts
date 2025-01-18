"use client";

import { useEffect } from "react";
import useUserStore from "@/store/auth/useUserStore";

export default function InitializeUser() {
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

  return null;
}
