"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import SolidButton from "@/components/common/buttons/SolidButton";
import Review from "@/components/common/review/Review";
import { fetchMeetupReview } from "@/lib/meetDetail/meetDetailApi";
import { type ReviewInfo } from "@/types/review";

export default function MeetDetailReview({
  meetupId,
  reviews,
}: {
  meetupId: number;
  reviews: ReviewInfo[];
}) {
  const [comment, setComment] = useState<ReviewInfo[]>([]);

  const { data, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["review", meetupId],
    queryFn: ({ pageParam }) =>
      fetchMeetupReview({ pageParams: pageParam, meetupId: meetupId }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPage) => {
      const totalFetched = lastPage.page * 3;
      console.log(allPage);
      return totalFetched < reviews.length ? lastPage.page + 1 : undefined;
    },
  });

  const handleClickNextComment = () => {
    fetchNextPage();
  };

  useEffect(() => {
    if (data?.pages.flatMap((ele) => ele.data) == null) return;

    setComment(data?.pages.flatMap((ele) => ele.data));
  }, [data]);

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-col gap-4'>
        <span className='text-title'>
          리뷰{" "}
          <span className='text-title text-blue-300'>{reviews.length}</span>
        </span>
        <div className='flex flex-col gap-6'>
          {comment.map((review, index) => {
            return <Review key={index} reviewInfo={review} />;
          })}
        </div>
      </div>
      {isFetching && <div>로딩중...</div>}
      {hasNextPage && (
        <SolidButton mode='special' onClick={handleClickNextComment}>
          더보기
        </SolidButton>
      )}
    </div>
  );
}
