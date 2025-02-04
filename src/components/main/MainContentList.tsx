"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SolidButton from "../common/buttons/SolidButton";
import CardSkeleton from "../common/skeleton/CardSkeleton";
import EmptyImage from "@/assets/images/icons/empty.svg";
import Card from "@/components/common/card/Card";
import { useMeetupList } from "@/hooks/meetup/useMeetupList";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

export default function MainContentList() {
  const { data, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMeetupList();
  const loadMoreRef = useInfiniteScroll(
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  );

  if (!data || data.pages[0].data.length === 0 || isError) {
    return (
      <MainContentEmpty
        isSearching={!!new URLSearchParams(window.location.search)}
      />
    );
  }

  useEffect(() => {
    console.log(Card);
  });

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
