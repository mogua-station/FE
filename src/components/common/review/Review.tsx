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

  //클릭 시 모임 상세로 이동
  const handleClickReview = useCallback(() => {
    if (reviewInfo.isMyReview) {
      //과외와 스터디가 다른 라우터를 사용하기 때문에 eventType으로 분기처리
      router.push(
        `/${reviewInfo.eventType?.toLowerCase()}/${reviewInfo.eventId}`,
      );
    }
    return;
  }, [reviewInfo]);

  const handleClickModify = () => {
    alert("리뷰 수정입니다.");
  };

  const handleClickDelete = () => {
    handleDeleteClick(reviewInfo.reviewId);
  };


const handleClickDetail = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setIsOpen((prev) => !prev);
    },
    [],
  );


  return (
    <div
      className='rounded-[12px] bg-gray-900 p-4'
      onClick={reviewInfo.isMyReview ? handleClickReview : undefined}
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
