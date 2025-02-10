"use client";

import { usePathname } from "next/navigation";
import NavBar from "../nav-bar/NavBar";

const hideNavBarPaths = ["/user/edit_profile", "/user/create_review"];

export default function NavBarWrapper() {
  const pathname = usePathname();

  const shouldHideNavBar = hideNavBarPaths.some((path) => pathname === path);

  if (shouldHideNavBar) return null;

  return <NavBar />;
}
