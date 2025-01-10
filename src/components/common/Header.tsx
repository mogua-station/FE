"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Edit from "@/assets/images/icons/edit.svg";
import PlusIcon from "@/assets/images/icons/plus-thin.svg";
import SearchIcon from "@/assets/images/icons/search-thin.svg";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className='fixed left-0 top-0 z-[1000] flex w-full items-center justify-center bg-[#0E0E10]'>
      <div className='flex h-[56px] w-full max-w-[1240px] items-center justify-between px-5 py-2.5'>
        <div className='flex items-center gap-12'>
          <h1>
            <Link href='/'>
              <img src='/icons/mogua.svg' alt='모과 로고' />
            </Link>
          </h1>
          <nav className='hidden desktop:block'>
            <ul className='flex gap-8'>
              <li>
                <Link
                  href='/'
                  className='body-1-normal text-gray-300 hover:text-gray-100'
                >
                  모임찾기
                </Link>
              </li>
              <li>
                <Link
                  href='/wishlist'
                  className='body-1-normal text-gray-300 hover:text-gray-100'
                >
                  북마크
                </Link>
              </li>
              <li>
                <Link
                  href={`/user/${""}`}
                  className='body-1-normal text-gray-300 hover:text-gray-100'
                >
                  마이페이지
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div>
          {pathname.includes("user") ? (
            <button>
              <Edit className='text-gray-200' />
            </button>
          ) : (
            <div className='flex gap-6'>
              <button>
                <SearchIcon className='text-gray-200' />
              </button>
              <button>
                <PlusIcon className='text-gray-200' />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
