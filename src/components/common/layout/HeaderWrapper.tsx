"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/common/Header";
import UserHeader from "@/components/user/UserHeader";

const USER_PAGE_HEADER_PATHS = [
  "/user/edit_profile",
  "/user/create_review",
  { pattern: /^\/user\/\d+$/, description: "user detail page" },
];

const HIDE_HEADER_PATHS = [""];

export default function HeaderWrapper() {
  const pathname = usePathname();
  const userPageHeader = USER_PAGE_HEADER_PATHS.some((path) => {
    if (typeof path === "object" && path.pattern instanceof RegExp) {
      return path.pattern.test(pathname || "");
    }

    return pathname === path;
  });
  const isHideHeader = HIDE_HEADER_PATHS.some((path) => pathname === path);

  if (userPageHeader) return <UserHeader />;

  if (isHideHeader) return null;

  return <Header />;
}
