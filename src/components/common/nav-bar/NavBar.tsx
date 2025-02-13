"use client";

import { useEffect, useState } from "react";
import NavMenuItem from "./NavMenuItem";
import BookmarkFillIcon from "@/assets/images/icons/bookmark_fill.svg";
import PlanetIcon from "@/assets/images/icons/planet.svg";
import UserIcon from "@/assets/images/icons/user.svg";

import useUserStore from "@/store/auth/useUserStore";

export default function NavBar() {
  const { user } = useUserStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const NAV_ITEMS = [
    { href: "/", icon: <PlanetIcon />, label: "모임 찾기" },
    { href: "/wishlist", icon: <BookmarkFillIcon />, label: "북마크" },
    {
      href: mounted ? (user ? `/user/${user.userId}` : "/sign-in") : "/sign-in",
      icon: <UserIcon />,
      label: "마이 페이지",
    },
  ];

  return (
    <>
      <nav className='fixed bottom-0 left-0 right-0 z-10 h-[62px] bg-normal px-6 py-[9px] tablet:px-20 desktop:hidden'>
        <ul className='flex w-full justify-between'>
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <NavMenuItem {...item} />
            </li>
          ))}
        </ul>
      </nav>

      <div className='h-[62px] desktop:hidden' />
    </>
  );
}
