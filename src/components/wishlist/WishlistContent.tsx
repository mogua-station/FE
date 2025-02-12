"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Card from "@/components/common/card/Card";
import CardSkeleton from "@/components/common/card/CardSkeleton";
import useIntersectionObserver from "@/hooks/useInterSectionObserve";
import {
  fetchUserWishlist,
  fetchLocalWishlist,
} from "@/lib/wishlist/wishlistApi";
import useUserStore from "@/store/auth/useUserStore";
import { type CardProps } from "@/types/card";
import {
  type LocationType,
  type MeetupType,
  type OrderType,
  type FilterProps,
} from "@/types/meetup.type";

export default function WishlistContent() {
  const searchParams = useSearchParams();
  const ref = useRef<HTMLDivElement | null>(null);
  const pageRef = useIntersectionObserver(ref, { threshold: 0.5 });
  const isPageEnd = !!pageRef?.isIntersecting;
  const { user } = useUserStore();

  //여러개의 값을 한번에 가져오고 싶다면
  const [filter, setFilter] = useState<FilterProps>({
    limit: 10,
    meetupType: "STUDY",
    location: "ALL",
    orderBy: "latest",
  });

  const {
    data: wishlist,
    hasNextPage,
    isLoading,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: [
      "wishlist",
      filter.meetupType,
      filter.location,
      filter.orderBy,
      user?.userId ?? "guest",
    ],
    queryFn: ({ pageParam }) => {
      if (user != null) {
        const filterString = Object.entries(filter).reduce<
          Record<string, string>
        >((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {});

        return fetchUserWishlist({
          pageParams: pageParam,
          userId: user.userId,
          filter: new URLSearchParams(filterString).toString(),
        });
      } else {
        return fetchLocalWishlist({ pageParms: pageParam, filter: filter });
      }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.isNext !== -1 ? lastPage.page + 1 : undefined;
    },
    select: (data) => data.pages.flatMap((ele) => ele.data || []),
    retry: 1,
  });

  //페이지의 끝에 도달하면 fetchNextPage를 호출
  useEffect(() => {
    if (isPageEnd && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, isPageEnd, hasNextPage]);

  useEffect(() => {
    const type = searchParams.get("type") as MeetupType;
    const location = searchParams.get("location") as LocationType;
    const orderBy = searchParams.get("orderBy") as OrderType;

    const newParams: FilterProps = { ...filter }; // 상태 복사

    if (type === null) newParams.meetupType = "STUDY";
    if (type !== null) newParams.meetupType = type;
    if (location === null) newParams.location = "ALL";
    if (location !== null) newParams.location = location;
    if (orderBy === null) newParams.orderBy = "latest";
    if (orderBy !== null) newParams.orderBy = orderBy;

    setFilter(newParams);
  }, [searchParams]);

  useEffect(() => {
    refetch();
  }, [filter, refetch]);

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
      {wishlist != null && wishlist.length > 0 && (
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
                  recruitmentStartDate: new Date(meet.recruitmentStartDate),
                  recruitmentEndDate: new Date(meet.recruitmentEndDate),
                  meetingStartDate: new Date(meet.meetingStartDate),
                  meetingEndDate: new Date(meet.meetingEndDate),
                  thumbnail: meet.thumbnail,
                  online: meet.online,
                  participants: meet.participants,
                }}
              />
            );
          })}
        </section>
      )}
      {wishlist == undefined ||
        (wishlist?.length == 0 && (
          <div className='flex flex-col items-center gap-4 pt-[72px]'>
            <Image
              src='/icons/empty.svg'
              alt='리스트 없음 이미지'
              width='180'
              height='180'
            />
            <p className='body-1-reading text-center font-regular text-gray-500'>
              {searchParams.size > 0
                ? "조건에 맞는 모임이 없어요"
                : "찜한 모임이 없어요"}
            </p>
          </div>
        ))}

      <div className='mb-1 h-10 w-full touch-none' ref={ref} />
    </div>
  );
}
