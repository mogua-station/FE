"use client";

import { usePathname } from "next/navigation";
import UserHeader from "../../user/UserHeader";
import Header from "../Header";

const userPageHeaderPaths = [
  "/user/edit_profile",
  "/user/create_review",
  { pattern: /^\/user\/\d+$/, description: "user detail page" },
];

export default function HeaderWrapper() {
  const pathname = usePathname();
  const userPageHeader = userPageHeaderPaths.some((path) => {
    if (typeof path === "object" && path.pattern instanceof RegExp) {
      return path.pattern.test(pathname || "");
    }

    return pathname === path;
  });

  if (userPageHeader) return <UserHeader />;

  return <Header />;
}
