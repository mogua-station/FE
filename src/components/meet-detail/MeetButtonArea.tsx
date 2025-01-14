"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ArrowRight from "@/assets/images/icons/arrow_right.svg";
import Bookmark from "@/assets/images/icons/bookmark.svg";
import BookmarkActive from "@/assets/images/icons/bookmark_active.svg";
import IconButton from "@/components/common/buttons/IconButton";
import SolidButton from "@/components/common/buttons/SolidButton";
import useAddWishlist from "@/hooks/useToggleWishlist";
import { type HostInfo } from "@/types/meetDetail";

export default function MeetButtonArea({
  meetId,
  host,
}: {
  meetId: number;
  host: HostInfo;
}) {
  //임시 유저 데이터 확인
  const user = null;

  //지금 페이지가 북마크가 되어있느지 확인
  const [bookmark, setBookmark] = useState<boolean | null>(null);

  //븍마크 확인
  useEffect(() => {
    if (!user) {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      if (wishlist.includes(meetId)) {
        setBookmark(true);
      }
    }
  }, [user, setBookmark]);

  const toggleWishlist = useAddWishlist();
  const router = useRouter();

  const handleClickAreaButton = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();

    const isBookmarked = toggleWishlist(id);
    setBookmark(isBookmarked);
  };

  const handleClickNavigateUser = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    router.push(`/user/${id}`);
  };

  return (
    <div className='flex flex-1 flex-col'>
      <button className='relative hidden gap-[15px] rounded-[16px] bg-gray-800 p-3 desktop:flex'>
        <div className='overflow-hidden rounded-[50%] bg-gray-600'>
          <img src='/images/share_character.png' alt='캐릭터 이미지' />
        </div>
        <div className='flex flex-col justify-between'>
          <p className='text-body text-gray-300'>친구와 함께 참여해보세요</p>
          <p className='text-left text-body-2-normal font-bold text-gray-100'>
            모임 공유하기
          </p>
        </div>
        <ArrowRight className='absolute right-10 top-1/2 size-6 -translate-y-1/2 text-gray-400' />
      </button>
      <div className='meet-info-box-small fixed bottom-0 left-0 z-50 mt-8 flex w-full gap-2 bg-gray-950 p-5 desktop:static desktop:bg-[unset] desktop:p-0'>
        <IconButton
          mode='special'
          className='w-[72px]'
          onClick={(e) => handleClickAreaButton(e, meetId)}
        >
          {bookmark ? (
            <BookmarkActive className='size-6 text-orange-200' />
          ) : (
            <Bookmark className='size-6' />
          )}
        </IconButton>
        <SolidButton mode='special'>모임 신청하기</SolidButton>
      </div>
      <button
        className='meet-info-box-small mt-6 flex flex-col gap-4'
        onClick={(e) => handleClickNavigateUser(e, host.userId)}
      >
        <span className='text-title block'>주최자 프로필</span>
        <div className='meet-info-box-inner-2 w-full'>
          <div className='flex gap-[14px]'>
            <div className='h-[46px] w-[46px] overflow-hidden rounded-[50%] bg-gray-700'>
              <img src={host.userProfile} alt='유저 프로필' />
            </div>
            <div>
              <span className='flex items-center gap-[6px] text-body-2-normal font-medium text-gray-300'>
                {host.userName}
                <span className='rounded-5 text-gary-300 inline-block rounded-[20px] bg-gray-700 px-2 py-1 text-caption-normal font-medium'>
                  과외선생님
                </span>
              </span>
              <p className='text-body mt-[6px] text-gray-400'>
                안녕하세요! 기획하는 모과입니다.
              </p>
            </div>
          </div>
          <div></div>
        </div>
      </button>
    </div>
  );
}
