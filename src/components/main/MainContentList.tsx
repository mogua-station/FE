"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import MainNavigation from "./MainNavigation";
import Card from "@/components/common/card/Card";
import { mockCardData } from "@/data/mockCardData";
import { type CardProps } from "@/types/card";

// 목 데이터를 fetch를 통해 반환하는 가상 API
async function fetchMockData(url: string): Promise<{
  data: CardProps[];
  nextPage: number | null;
  isLast: boolean;
}> {
  const urlParams = new URLSearchParams(url.split("?")[1]);
  const offset = Number(urlParams.get("offset")) || 0;
  const ITEMS_PER_PAGE = 10;

  const start = offset * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;

  const slicedData = mockCardData.slice(start, end);
  const isLast = end >= mockCardData.length;

  console.log("client");

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: slicedData,
        nextPage: isLast ? null : offset + 1,
        isLast,
      });
    }, 500);
  });
}

export default function MainContentList() {
  const loadMoreRef = useRef<HTMLDivElement>(null); // 무한 스크롤 관찰자
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(
    null,
  );

  useEffect(() => {
    setSearchParams(new URLSearchParams(window.location.search));
  }, []);

  const stateQuery = searchParams?.get("state") ?? undefined;
  const cityQuery = searchParams?.get("city") ?? undefined;
  const startQuery = searchParams?.get("startDate") ?? undefined;
  const endQuery = searchParams?.get("endDate") ?? undefined;

  const getMeetupList = async ({
    offset = 0,
    state,
    city,
    startDate,
    endDate,
  }: {
    offset?: number;
    state?: string;
    city?: string;
    startDate?: string;
    endDate?: string;
  }) => {
    const parameters = new URLSearchParams({ offset: offset.toString() });

    if (state) parameters.append("state", state);
    if (city) parameters.append("city", city);
    if (startDate) parameters.append("startDate", startDate);
    if (endDate) parameters.append("endDate", endDate);

    return fetchMockData(`/api/meetup?${parameters.toString()}`);
  };

  // 무한 스크롤을 통한 데이터 불러오기
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["meetup"],
      queryFn: ({ pageParam = 0 }) =>
        getMeetupList({
          offset: pageParam,
          state: stateQuery,
          city: cityQuery,
          startDate: startQuery,
          endDate: endQuery,
        }),
      getNextPageParam: (lastPage) =>
        !lastPage.isLast ? lastPage.nextPage : undefined,
      initialPageParam: 0,
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
          page.data.map((item: CardProps) => (
            <Card key={item.id} card={item} />
          )),
        )}
      </section>

      <div ref={loadMoreRef} className='flex justify-center py-4 text-gray-200'>
        {isFetchingNextPage && <p>로딩 중...</p>}
      </div>
    </>
  );
}
