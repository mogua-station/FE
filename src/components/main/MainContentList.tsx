"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import MainNavigation from "./MainNavigation";
import Card from "@/components/common/card/Card";
import { getMeetupList } from "@/lib/main/meetup.api";
import {
  type LocationType,
  type MeetupType,
  type StateType,
} from "@/types/meetup.type";

export default function MainContentList() {
  const loadMoreRef = useRef<HTMLDivElement>(null); // 무한 스크롤 관찰자
  const searchParams = useSearchParams();

  const typeQuery = (searchParams.get("type") as MeetupType) ?? undefined;
  const stateQuery = (searchParams.get("state") as StateType) ?? undefined;
  const locationQuery =
    (searchParams.get("location") as LocationType) ?? undefined;
  const startQuery = searchParams.get("startDate") ?? undefined;
  const endQuery = searchParams.get("endDate") ?? undefined;

  // 무한 스크롤을 통한 데이터 불러오기
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [
        "meetup",
        typeQuery,
        stateQuery,
        locationQuery,
        startQuery,
        endQuery,
      ],
      queryFn: ({ pageParam = 0 }) =>
        getMeetupList({
          page: pageParam,
          limit: 10,
          type: typeQuery,
          state: stateQuery,
          location: locationQuery,
          startDate: startQuery,
          endDate: endQuery,
        }),
      getNextPageParam: (lastPage) =>
        !lastPage.isLast ? lastPage.nextPage : undefined,
      initialPageParam: 0,
      retry: 1,
    });

  // 무한 스크롤 관찰자 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 },
    );

    const currentRef = loadMoreRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      <MainNavigation />

      <section className='relative grid w-full grow grid-cols-1 gap-y-6 desktop:grid-cols-2 desktop:gap-x-8 desktop:gap-y-10'>
        {data?.pages.map((page) =>
          page.data.map((item, index) => (
            <Card
              key={index}
              card={{
                id: item.id,
                title: item.title,
                image: item.thumbnail,
                location: item.location,
                recruitmentPeriod: {
                  startDate: new Date(item.recruitmentStartDate),
                  endDate: new Date(item.recruitmentEndDate),
                },
                eventPeriod: {
                  startDate: new Date(item.meetingStartDate),
                  endDate: new Date(item.meetingEndDate),
                },
                participants: item.maxParticipants,
                status: item.meetingState,
                itemType: item.meetingType,
              }}
            />
          )),
        )}
      </section>

      <div ref={loadMoreRef} className='flex justify-center py-4 text-gray-200'>
        {isFetchingNextPage && <p>로딩 중...</p>}
      </div>
    </>
  );
}
