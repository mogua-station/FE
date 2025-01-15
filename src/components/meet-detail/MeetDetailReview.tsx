"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState, useCallback } from "react";
import SolidButton from "@/components/common/buttons/SolidButton";
import Review from "@/components/common/review/Review";
import { type ReviewInfo } from "@/types/review";

export default function MeetDetailReview({
  reviews,
}: {
  reviews: ReviewInfo[];
}) {
  const [comment, setComment] = useState<ReviewInfo[]>([]);

  const { data, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["comment"],
    queryFn: ({ pageParam }) => fetchComment({ pageParams: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const totalFetched = lastPage.page * 3;
      return totalFetched < reviews.length ? lastPage.page + 1 : undefined;
    },
  });

  // fetchComment를 useCallback으로 감싸기
  const fetchComment = useCallback(
    async ({ pageParams = 1 }: { pageParams: number }) => {
      const pageSize = 3;
      const start = (pageParams - 1) * pageSize;
      const end = start + pageSize;
      const data: ReviewInfo[] = reviews.slice(start, end);

      return {
        data: data,
        page: pageParams,
      };
    },
    [reviews], // 의존성 배열: comments가 변경될 때만 새 함수 생성
  );

  const handleClickNextComment = () => {
    fetchNextPage();
  };

  useEffect(() => {
    if (data?.pages.flatMap((ele) => ele.data) == null) return;

    console.log(hasNextPage);

    setComment(data?.pages.flatMap((ele) => ele.data));
  }, [data]);

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-col gap-4'>
        <span className='text-title'>
          리뷰 <span className='text-title text-blue-300'>16</span>
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
