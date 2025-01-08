"use client";

import { useState } from "react";
import ReviewContent from "./ReviewContent";
import ArrowDown from "@/assets/images/icons/arrow_down.svg";
import { type ReviewInfoProps } from "@/types/review";

export default function Review({ reviewinfo }: ReviewInfoProps) {
  const [isOpen, setIsOpen] = useState(false);

  console.log(reviewinfo);

  return (
    <div className='rounded-[12px] bg-gray-900 p-4'>
      <div className='relative'>
        {/* 카드 디자인 수정을 위한 함수가 들어간다. */}
        <button
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
          className='absolute right-0 top-0'
        >
          <ArrowDown
            className={`size-6 text-gray-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
        {/* 댓글 정보가 들어갈 서버 컴포넌트트 */}
        <ReviewContent review={reviewinfo} isOpen={isOpen} />
      </div>
    </div>
  );
}
