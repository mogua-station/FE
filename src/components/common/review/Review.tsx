"use client";

import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import ReviewContent from "./ReviewContent";
import ArrowDown from "@/assets/images/icons/arrow_down.svg";
import MenuCircle from "@/assets/images/icons/menu-circle.svg";
import Dropdown from "@/components/common/Dropdown";
import useReviewModals from "@/hooks/review/useReviewModals";
import { type ReviewInfoProps } from "@/types/review";
import { type RatingStyle } from "@/types/review";

export default function Review({ reviewInfo }: ReviewInfoProps) {
  const router = useRouter();
  const { handleDeleteClick } = useReviewModals();
  const [isOpen, setIsOpen] = useState(false);
  const reviewTextStyle: RatingStyle = {
    0: "text-purple-200",
    1: "text-blue-200",
    2: "text-orange-200",
  };

  const ratingArr = ["그냥그래요", "괜찮아요", "추천해요"];

  // '리뷰 삭제/수정' 도입으로 클릭 시 높낮이가 바뀌는 디자인으로 변경 (해당 모임 상세로 이동x)
  const handleClickReview = useCallback(() => {
    if (reviewInfo.isMyWritten) {
      setIsOpen((prev) => !prev);
    }
  }, [reviewInfo.isMyWritten]);

  const handleClickDetail = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setIsOpen((prev) => !prev);
    },
    [],
  );

  const handleClickModify = () => {
    router.push(`/user/edit_review?reviewId=${reviewInfo.reviewId}`);
  };

  const handleClickDelete = () => {
    handleDeleteClick(reviewInfo.reviewId);
  };

  const isMyWrittenStyle = reviewInfo.isMyWritten ? "cursor-pointer" : "";

  return (
    <div
      className={`rounded-[12px] bg-gray-900 p-4 ${isMyWrittenStyle}`}
      onClick={reviewInfo.isMyWritten ? handleClickReview : undefined}
    >
      <div className='relative'>
        <div className='flex justify-between'>
          <span
            className={`inline-block px-2 py-[3px] text-caption-normal ${reviewTextStyle[reviewInfo.rating]} rounded-[20px] bg-gray-700`}
          >
            {ratingArr[reviewInfo.rating]}
          </span>
          {reviewInfo.isMyWritten ? (
            <div className='relative' onClick={(e) => e.stopPropagation()}>
              <Dropdown
                content={[
                  {
                    label: "수정하기",
                    value: "modify",
                    onClick: () => handleClickModify(),
                  },
                  {
                    label: "삭제하기",
                    value: "delete",
                    onClick: () => handleClickDelete(),
                  },
                ]}
                isReview={true}
              >
                <div className='z-10 cursor-pointer'>
                  <MenuCircle />
                </div>
              </Dropdown>
            </div>
          ) : (
            <button
              onClick={handleClickDetail}
              className='absolute right-0 top-0'
            >
              <ArrowDown
                aria-label={"icon"}
                className={`size-6 text-gray-200 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
          )}
        </div>
        <ReviewContent reviewContent={reviewInfo} isOpen={isOpen} />
      </div>
    </div>
  );
}
