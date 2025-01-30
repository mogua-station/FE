"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import EmptyImage from "@/assets/images/icons/empty.svg";
import SolidButton from "@/components/common/buttons/SolidButton";
import Review from "@/components/common/review/Review";
import { fetchMeetupReview } from "@/lib/meetDetail/meetDetailApi";

// interface RviewQuery {}

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
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["review", meetupId],
    queryFn: ({ pageParam }) =>
      fetchMeetupReview({ pageParams: pageParam, meetupId: meetupId }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const totalFetched = lastPage.page * 3;
      return totalFetched < lastPage.page * 3 ? lastPage.page + 1 : undefined;
    },
    select: (data) => data.pages.flatMap((ele) => ele.data),
    enabled: meetupStatus === "COMPLETED",
  });

  const handleClickNextComment = () => {
    fetchNextPage();
  };

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-col'>
        <span className='text-title mb-4'>
          리뷰{" "}
          <span className='text-title text-blue-300'>
            {reviewData != null ? reviewData.length : 0}
          </span>
        </span>
        <div className='flex flex-col gap-6'>
          {!isFetching &&
            (reviewData && reviewData.length > 0 ? (
              reviewData.map((review, index) => (
                <Review key={index} reviewInfo={review} />
              ))
            ) : (
              <div className='mt-[60px] flex flex-col items-center gap-4'>
                <EmptyImage />
                <p className='text-body-1-reading font-regular text-gray-500'>
                  아직 작성된 리뷰가 없어요
                </p>
              </div>
            ))}
        </div>
      </div>
      {isFetching && <p className='text-center text-white'>로딩중...</p>}
      {hasNextPage && (
        <SolidButton mode='special' onClick={handleClickNextComment}>
          더보기
        </SolidButton>
      )}
    </div>
  );
}
