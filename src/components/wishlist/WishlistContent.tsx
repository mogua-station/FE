"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import Card from "@/components/common/card/Card";
import CardSkeleton from "@/components/common/card/CardSkeleton";
import useIntersectionObserver from "@/hooks/useInterSectionObserve";
import {
  fetchUserWishlist,
  fetchLocalWishlist,
} from "@/lib/wishlist/wishlistApi";
import useUserStore from "@/store/auth/useUserStore";
import { type CardProps } from "@/types/card";

export default function WishlistNotLogged() {
  const ref = useRef<HTMLDivElement | null>(null);
  const pageRef = useIntersectionObserver(ref, { threshold: 0.5 });
  const isPageEnd = !!pageRef?.isIntersecting;
  const { user } = useUserStore();

  const {
    data: wishlist,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["wishlist"],
    queryFn: ({ pageParam }) => {
      if (user != null) {
        return fetchUserWishlist({
          pageParms: pageParam,
          userId: user.userId,
        });
      } else {
        return fetchLocalWishlist({ pageParms: pageParam });
      }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage instanceof Error || !lastPage.data) {
        return undefined; // 오류가 있을 경우 다음 페이지를 요청하지 않음
      }

      return lastPage.data.length > 0 ? lastPage.page + 1 : undefined;
    },
    select: (data) => data.pages.flatMap((ele) => ele.data || []), // useCallback 제거
    retry: 1,
  });

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
        {wishlist?.map((meet: CardProps, index: number) => {
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
                participants: meet.participants,
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
