"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import DotLoader from "react-spinners/DotLoader";
import EmptyImage from "@/assets/images/icons/empty.svg";
import SolidButton from "@/components/common/buttons/SolidButton";
import Review from "@/components/common/review/Review";
import { fetchMeetupReview } from "@/lib/meetDetail/meetDetailApi";

export default function MeetDetailReview({
  meetupId,
  meetupStatus,
}: {
  meetupId: number;
  meetupStatus: "RECRUITING" | "IN_PROGRESS" | "COMPLETED" | "BEFORE_START";
}) {
  const {
    data: reviewData,
    isFetching,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["review", meetupId],
    queryFn: ({ pageParam }) =>
      fetchMeetupReview({ pageParams: pageParam, meetupId: meetupId }),
    retry: 1,
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.nextPage ? lastPage.page + 1 : undefined,
    select: (data) => data.pages.flatMap((ele) => ele.data),
    enabled: meetupStatus === "COMPLETED",
    staleTime: 5 * 60 * 1000, //5분
  });

  const handleClickNextComment = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const reviewCount = reviewData?.length ?? 0;

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex min-h-[318px] flex-col'>
        <h3 className='text-title mb-4'>
          리뷰 <span className='text-title text-blue-300'>{reviewCount}</span>
        </h3>
        <div
          className={`flex flex-1 flex-col gap-6 ${isFetching ? "justify-center" : ""}`}
        >
          {isError && (
            <div className='mt-[60px] flex flex-col items-center gap-4'>
              <EmptyImage />
              <p className='text-body-1-reading font-regular text-gray-500'>
                {error.message}
              </p>
              <div className='flex flex-col items-center gap-8'>
                <SolidButton
                  size='small'
                  onClick={() => {
                    refetch();
                  }}
                  aria-label='refetch wishlist'
                >
                  다시 시도하기
                </SolidButton>
              </div>
            </div>
          )}
          {!isFetching &&
            !isError &&
            (reviewData && reviewCount > 0 ? (
              reviewData.map((review, index) => (
                <Review key={`review${index}`} reviewInfo={review} />
              ))
            ) : (
              <div className='mt-[60px] flex flex-col items-center gap-4'>
                <EmptyImage />
                <p className='text-body-1-reading font-regular text-gray-500'>
                  아직 작성된 리뷰가 없어요
                </p>
              </div>
            ))}
          {isFetching && (
            <div className='flex justify-center'>
              <DotLoader size={24} color={"#FF9A42"} loading={isFetching} />
            </div>
          )}
        </div>
      </div>
      {hasNextPage && (
        <SolidButton
          mode='special'
          onClick={handleClickNextComment}
          aria-label={`${meetupId}모임 리뷰 더보기`}
        >
          더보기
        </SolidButton>
      )}
    </div>
  );
}
