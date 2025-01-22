"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import SolidButton from "../common/buttons/SolidButton";
import CardSkeleton from "../common/skeleton/CardSkeleton";
import EmptyImage from "@/assets/images/icons/empty.svg";
import Card from "@/components/common/card/Card";
import { getMeetupList } from "@/lib/main/meetup.api";
import type {
  OrderType,
  LocationType,
  MeetupType,
  StateType,
} from "@/types/meetup.type";
import { generateQueryKey } from "@/utils/meetup.queryKey";

export default function MainContentList() {
  const loadMoreRef = useRef<HTMLDivElement>(null); // 무한 스크롤 관찰자
  const searchParams = useSearchParams();

  const typeQuery = (searchParams.get("type") as MeetupType) ?? undefined;
  const stateQuery = (searchParams.get("state") as StateType) ?? undefined;
  const locationQuery =
    (searchParams.get("location") as LocationType) ?? undefined;
  const startQuery = searchParams.get("startDate") ?? undefined;
  const endQuery = searchParams.get("endDate") ?? undefined;
  const orderByQuery = (searchParams.get("orderBy") as OrderType) ?? undefined;

  const queryKey = generateQueryKey({
    type: typeQuery,
    state: stateQuery,
    location: locationQuery,
    startDate: startQuery,
    endDate: endQuery,
    orderBy: orderByQuery,
  });

  // 무한 스크롤을 통한 데이터 불러오기
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam = 0 }) =>
        getMeetupList({
          page: pageParam,
          limit: 10,
          orderBy: orderByQuery,
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

  if (!data || data.pages[0].data.length === 0)
    return <MainContentEmpty isSearching={queryKey.length > 1} />;

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
                meetupStatus: item.meetupStatus as
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

function MainContentEmpty({ isSearching = false }: { isSearching?: boolean }) {
  const router = useRouter();

  return (
    <div className='flex h-[50vh] flex-col items-center justify-center gap-4'>
      <EmptyImage />
      <p className='text-center text-body-1-reading text-gray-500'>
        {isSearching
          ? "조건에 맞는 모임이 없어요"
          : "아직 개설된 모임이 없어요"}
      </p>
      {!isSearching && (
        <div className='flex flex-col items-center gap-8'>
          <SolidButton
            size='small'
            onClick={() => {
              router.push("/create");
            }}
          >
            모임 개설하기
          </SolidButton>
        </div>
      )}
    </div>
  );
}
