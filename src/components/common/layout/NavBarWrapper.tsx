"use client";

import { usePathname } from "next/navigation";
import NavBar from "@/components/common/nav-bar/NavBar";

const HIDE_NAV_PATHS = [
  "/sign-in",
  "/sign-in/basic",
  "/sign-up",
  "/sign-up/success",
  "/create",
  "/user/edit_profile",
  "/user/create_review",
  "/user/edit_review",
  "/welcome",
  /^\/create\/\d+$/,
  /^\/study\/\d+$/,
  /^\/tutoring\/\d+$/,
];

export default function NavBarWrapper() {
  const pathname = usePathname();

  const shouldHideNavBar = HIDE_NAV_PATHS.some((path) =>
    typeof path === "string" ? pathname === path : path.test(pathname),
  );

  if (shouldHideNavBar) return null;

  return <NavBar />;
}
