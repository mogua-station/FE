"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LogoIcon from "@/assets/images/icons/mogua.svg";
import PlusIcon from "@/assets/images/icons/plus-thin.svg";
import useUserStore from "@/store/auth/useUserStore";

const AUTH_PAGE_PATHS = [
  "/sign-in",
  "/sign-in/basic",
  "/sign-up",
  "/sign-up/success",
];

const CREATE_PAGE_PATHS = ["/create", /^\/create\/\d+$/];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUserStore();
  const [isClient, setIsClient] = useState(false);
  const isAuthPageHeader = AUTH_PAGE_PATHS.some((path) => pathname === path);
  const isCreatePageHeader = CREATE_PAGE_PATHS.some((path) =>
    typeof path === "string" ? pathname === path : path.test(pathname),
  );

  const authBgColor = isAuthPageHeader
    ? "bg-gray-950 tablet:bg-[#0E0E10]"
    : "bg-[#0E0E10]";
  const createBgColor = isCreatePageHeader ? "bg-gray-950" : "bg-[#0E0E10]";
  const landingBgColor = pathname === "/welcome" ? "bg-[#0E0E10]" : "";

  useEffect(() => setIsClient(true), []);

  if (pathname.startsWith("/user/")) {
    return null;
  }

  return (
    <>
      <div
        className={`h-14 ${isCreatePageHeader ? "hidden tablet:block" : ""}`}
      />

      <header
        className={`${authBgColor} ${createBgColor} ${landingBgColor} ${isCreatePageHeader ? "hidden tablet:flex" : "flex"} fixed left-0 top-0 z-50 w-full items-center justify-center`}
      >
        <div className='flex h-14 w-full max-w-[1240px] items-center justify-between px-5 py-2.5'>
          <div className='flex items-center gap-12'>
            <h1>
              <Link href='/'>
                <LogoIcon aria-label='mogua' />
              </Link>
            </h1>

            {!isAuthPageHeader && (
              <nav className='hidden desktop:block'>
                <ul className='flex gap-8'>
                  <li>
                    <Link
                      href='/'
                      className={`body-1-normal hover:text-gray-100 ${pathname === "/" ? "text-gray-100" : "text-gray-300"}`}
                    >
                      모임찾기
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/wishlist'
                      className={`body-1-normal hover:text-gray-100 ${pathname === "/wishlist" ? "text-gray-100" : "text-gray-300"}`}
                    >
                      북마크
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`${user != null ? `/user/${user.userId}` : "/sign-in"}`}
                      className={`body-1-normal hover:text-gray-100 ${pathname.includes("user") ? "text-gray-100" : "text-gray-300"}`}
                    >
                      마이페이지
                    </Link>
                  </li>
                </ul>
              </nav>
            )}
          </div>

          {!isAuthPageHeader && (
            <div className='flex gap-6 transition-all desktop:gap-9'>
              <button
                onClick={() => router.push("/create")}
                aria-label='Create Meetup'
              >
                <PlusIcon className='text-gray-200' />
              </button>

              {isClient && user !== null && (
                <Link href={`/user/${user.userId}`}>
                  <Image
                    src={
                      user.profileImg ?? "/images/default_user_profile.png.png"
                    }
                    alt='Profile'
                    className='size-6 cursor-pointer rounded-full'
                    width={24}
                    height={24}
                    sizes='(max-width: 640px) 24px, 32px'
                  />
                </Link>
              )}
            </div>
          )}
        </div>
      </header>
    </>
  );
}
