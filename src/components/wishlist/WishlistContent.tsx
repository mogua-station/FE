"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import Card from "@/components/common/card/Card";
import CardSkeleton from "@/components/common/card/CardSkeleton";
import useIntersectionObserver from "@/hooks/useInterSectionObserve";
import { fetchWishlist } from "@/lib/wishlist/wishlistApi";
import useUserStore from "@/store/auth/useUserStore";
import { type CardProps } from "@/types/card";

export default function WishlistNotLogged() {
  const [list, setList] = useState<CardProps[] | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);
  const pageRef = useIntersectionObserver(ref, { threshold: 0.5 });
  const isPageEnd = !!pageRef?.isIntersecting;

  const { user } = useUserStore();

  const {
    data: meetupList,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["wishlist"],
    queryFn: ({ pageParam }) =>
      fetchWishlist({
        pageParms: pageParam,
        userId: user != null ? user.userId : null,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage instanceof Error || !lastPage.data) {
        return undefined; // 오류가 있을 경우 다음 페이지를 요청하지 않음
      }

      return lastPage.data.length > 0 ? lastPage.page + 1 : undefined;
    },
    retry: false,
  });

  useEffect(() => {
    setList(meetupList?.pages.flatMap((ele) => ele.data) || []);
  }, [meetupList]);

  //페이지의 끝에 도달하면 fetchNextPage를 호출
  useEffect(() => {
    if (isPageEnd && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, isPageEnd, hasNextPage]);

  if (isLoading) {
    return (
      <div className='w-full'>
        <section className='relative grid w-full grow grid-cols-1 gap-y-6 desktop:grid-cols-2 desktop:gap-x-8 desktop:gap-y-10'>
          {Array.from({ length: 8 }).map((_, index) => {
            return <CardSkeleton key={index} />;
          })}
        </section>
      </div>
    );
  }

  return (
    <div className='w-full'>
      <section className='relative grid w-full grow grid-cols-1 gap-y-6 desktop:grid-cols-2 desktop:gap-x-8 desktop:gap-y-10'>
        {list?.map((meet: CardProps, index: number) => {
          return (
            <Card
              key={index}
              card={{
                meetupId: meet.meetupId,
                meetingType: meet.meetingType,
                meetupStatus: meet.meetupStatus,
                location: meet.location,
                title: meet.title,
                minParticipants: 20,
                recruitmentStartDate: meet.recruitmentStartDate,
                recruitmentEndDate: meet.recruitmentEndDate,
                meetingStartDate: meet.meetingStartDate,
                meetingEndDate: meet.meetingEndDate,
                thumbnail: meet.thumbnail,
                online: meet.online,
                participants: [
                  {
                    userId: 1,
                    profileImageUrl: "기로록",
                  },
                ],
                callback: refetch,
                ...(user ? { isWishlist: true } : {}),
              }}
            />
          );
        })}
      </section>
      {isFetchingNextPage && hasNextPage && (
        <p className='text-center text-white'>로딩중...</p>
      )}
      <div className='mb-1 h-10 w-full touch-none' ref={ref} />
    </div>
  );
}
