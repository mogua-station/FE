"use client";

import CardSkeleton from "../common/skeleton/CardSkeleton";
import MainContentEmpty from "./MainContentEmpty";
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
    return <MainContentEmpty />;
  }

  return (
    <div className='flex size-full grow flex-col justify-between gap-8'>
      <section className='relative grid w-full grid-cols-1 gap-y-6 desktop:grid-cols-2 desktop:gap-x-8 desktop:gap-y-10'>
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
        className='relative grid w-full grid-cols-1 gap-y-6 desktop:grid-cols-2 desktop:gap-x-8 desktop:gap-y-10'
      >
        {isFetchingNextPage &&
          Array.from({ length: 10 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
      </div>
    </div>
  );
}
