"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ReviewContent from "./ReviewContent";
import ArrowDown from "@/assets/images/icons/arrow_down.svg";
import { type ReviewInfoProps } from "@/types/review";

export default function Review({ reviewInfo }: ReviewInfoProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  //클릭 시 모임 상세로 이동
  const handleClickReview = () => {
    if (reviewInfo.isMyReview) {
      //과외와 스터디가 다른 라우터를 사용하기 때문에 eventType으로 분기처리
      router.push(`/${reviewInfo.eventType}/${reviewInfo.eventId}`);
    }
    return;
  };

  const handleClickDetail = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };
  return (
    <div className='rounded-[12px] bg-gray-900 p-4' onClick={handleClickReview}>
      <div className='relative'>
        <button onClick={handleClickDetail} className='absolute right-0 top-0'>
          <ArrowDown
            className={`size-6 text-gray-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
        <ReviewContent reviewContent={reviewInfo} isOpen={isOpen} />
      </div>
    </div>
  );
}
