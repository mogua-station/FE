"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import CardSkeleton from "../common/skeleton/CardSkeleton";
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

  const queryKey = ["meetup"];
  if (typeQuery) queryKey.push(typeQuery);
  if (stateQuery) queryKey.push(stateQuery);
  if (locationQuery) queryKey.push(locationQuery);
  if (startQuery) queryKey.push(startQuery);
  if (endQuery) queryKey.push(endQuery);

  // 무한 스크롤을 통한 데이터 불러오기
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
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
      <section className='relative grid w-full grow grid-cols-1 gap-y-6 desktop:grid-cols-2 desktop:gap-x-8 desktop:gap-y-10'>
        {data?.pages.map((page) =>
          page.data.map((item) => (
            <Card
              key={item.meetupId}
              card={{
                meetupId: item.meetupId,
                meetingType: item.meetingType,
                status: item.status as
                  | "RECRUITING"
                  | "BEFORE_START"
                  | "IN_PROGRESS"
                  | "COMPLETED",
                title: item.title,
                location: item.location as
                  | "CAPITAL"
                  | "DAEJEON"
                  | "JEONJU"
                  | "GWANGJU"
                  | "BUSAN"
                  | "DAEGU"
                  | "GANGNEUNG"
                  | undefined,
                participants: item.participants,
                thumbnail: item.thumbnail,
                online: item.online,
                recruitmentStartDate: new Date(item.recruitmentStartDate),
                minParticipants: item.minParticipants,
                recruitmentEndDate: new Date(item.recruitmentEndDate),
                meetingStartDate: new Date(item.meetingStartDate),
                meetingEndDate: new Date(item.meetingEndDate),
              }}
            />
          )),
        )}
      </section>

      <div
        ref={loadMoreRef}
        className='relative grid w-full grow grid-cols-1 gap-y-6 desktop:grid-cols-2 desktop:gap-x-8 desktop:gap-y-10'
      >
        {isFetchingNextPage &&
          Array.from({ length: 10 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
      </div>
    </>
  );
}
