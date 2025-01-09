"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Content from "./Content";
import StatusBadge from "./StatusBadge";
import Bookmark from "@/assets/images/icons/bookmark.svg";
import BookmarkActive from "@/assets/images/icons/bookmarkActive.svg";
import { type CardInfo } from "@/types/card";

export default function Card({ card }: CardInfo) {
  const router = useRouter();

  const contentData = {
    title: card.title,
    location: card.location,
    participants: card.participants,
    recruitmentPeriod: card.recruitmentPeriod,
    eventPeriod: card.eventPeriod,
    image: card.image,
  };

  const [whishlist, setWhishlist] = useState(false);

  //모의 기능입니다.
  const hadleClickWhishlist = (e: React.MouseEvent) => {
    //부모로 이벤트 전달 막기
    e.stopPropagation();
    setWhishlist((prev) => !prev);
  };

  const handleClickDetail = (type: string, id: number): void => {
    router.push(`/${type}/${id}`);
  };

  const handleClickReview = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert("리뷰 작성");
  };

  return (
    <div
      className='mb-6 flex flex-col gap-5 rounded-[16px] bg-gray-950 p-3'
      onClick={() => handleClickDetail(card.itemType, card.id)}
    >
      <div className='flex justify-between'>
        <div className='flex gap-1.5'>
          <StatusBadge
            status={card.status}
            recruitmentDate={
              card.status === "모집중"
                ? card.recruitmentPeriod.endDate
                : new Date()
            }
          />
        </div>

        <button onClick={hadleClickWhishlist}>
          {whishlist ? (
            <Bookmark className='size-6' />
          ) : (
            <BookmarkActive className='size-6' />
          )}
        </button>
      </div>

      <Content content={contentData} />

      {/* 버튼 컴포넌트 머지 후 추가 작업필요 */}
      {card.isReview && <button onClick={handleClickReview}>리뷰 작성</button>}
    </div>
  );
}
