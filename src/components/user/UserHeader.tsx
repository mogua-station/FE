"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import BackButton from "./BackButton";
import Edit from "@/assets/images/icons/edit.svg";
import LogoIcon from "@/assets/images/icons/mogua.svg";
import PlusIcon from "@/assets/images/icons/plus-thin.svg";
import SearchIcon from "@/assets/images/icons/search-thin.svg";
import useUserStore, { type User } from "@/store/auth/useUserStore";

function MoguaLogo({ className = "" }: { className?: string }) {
  return (
    <Link className={className} href='/'>
      <LogoIcon aria-label='mogua' />
    </Link>
  );
}

function NavigationLinks({ user }: { user: User | null }) {
  const NAV_ITEMS = [
    { href: "/", label: "모임찾기" },
    { href: "/wishlist", label: "북마크" },
    {
      href: `${user != null ? `/user/${user.userId}` : "/sign-in"}`,
      label: "마이페이지",
    },
  ];

  return (
    <nav className='hidden desktop:block'>
      <ul className='flex gap-8'>
        {NAV_ITEMS.map(({ href, label }) => (
          <li key={label}>
            <Link
              href={href}
              className='body-1-normal text-gray-300 hover:text-gray-100'
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function UserHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUserStore();

  const isUserPage =
    pathname.startsWith("/user/") &&
    pathname !== "/user/edit_profile" &&
    pathname !== "/user/create_review" &&
    pathname.split("/").length === 3;
  const isEditProfile = pathname === "/user/edit_profile";
  const isCreateReview = pathname === "/user/create_review";

  const currentUserId = isUserPage ? Number(pathname.split("/")[2]) : null;
  const isMyPage = currentUserId === user?.userId;

  const headerBgColor = isEditProfile
    ? "bg-gray-900 desktop:bg-gray-950"
    : "bg-[#0E0E10]";
  const headerBorderColor = isCreateReview
    ? "border-b border-gray-900 tablet:border-none"
    : "";

  // 버튼 렌더링 로직
  const renderRightButtons = () => {
    // 리뷰 작성 페이지
    if (isCreateReview) {
      return (
        <>
          <span className='mobile:block text-gray-200 tablet:hidden'>
            <BackButton />
          </span>
          <div className='hidden gap-6 desktop:flex'>
            <button>
              <SearchIcon className='text-gray-200' aria-label='Search' />
            </button>
            <button onClick={() => router.push("/create")}>
              <PlusIcon className='text-gray-200' aria-label='Create Meetup' />
            </button>
          </div>
        </>
      );
    }

    // 프로필 수정 페이지
    if (isEditProfile) {
      return (
        <>
          <span className='text-gray-200 desktop:hidden'>
            <BackButton />
          </span>
          <div className='hidden gap-6 desktop:flex'>
            <button>
              <SearchIcon className='text-gray-200' aria-label='Search' />
            </button>
            <button onClick={() => router.push("/create")}>
              <PlusIcon className='text-gray-200' aria-label='Create Meetup' />
            </button>
          </div>
        </>
      );
    }

    // 유저 프로필 페이지
    if (isUserPage) {
      if (isMyPage) {
        return (
          <button
            onClick={() => router.push("/user/edit_profile")}
            aria-label='Edit Profile'
          >
            <Edit className='text-gray-200' />
          </button>
        );
      }
      // 다른 유저의 프로필 페이지
      return (
        <div className='flex gap-6'>
          <button>
            <SearchIcon className='text-gray-200' aria-label='Search' />
          </button>
          <button onClick={() => router.push("/create")}>
            <PlusIcon className='text-gray-200' aria-label='Create Meetup' />
          </button>
        </div>
      );
    }
  };

  return (
    <header
      className={`fixed left-0 top-0 z-50 flex w-full items-center justify-center ${headerBgColor} ${headerBorderColor}`}
    >
      <div className='flex h-14 w-full max-w-[1240px] items-center justify-between px-5 py-2.5'>
        <div className='flex items-center gap-12'>
          <h1>
            {isCreateReview ? (
              <>
                <span className='mobile:block text-gray-200 tablet:hidden'>
                  리뷰 작성하기
                </span>
                <MoguaLogo className='hidden tablet:block' />
              </>
            ) : (
              <MoguaLogo />
            )}
          </h1>
          <NavigationLinks user={user} />
        </div>

        <div>
          <div className='flex gap-6'>{renderRightButtons()}</div>
        </div>
      </div>
    </header>
  );
}
