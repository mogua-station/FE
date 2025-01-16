"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Content from "./Content";
import StatusBadge from "./StatusBadge";
import Bookmark from "@/assets/images/icons/bookmark.svg";
import BookmarkActive from "@/assets/images/icons/bookmark_active.svg";
import SolidButton from "@/components/common/buttons/SolidButton";
import { type CardInfo } from "@/types/card";

export default function Card({ card }: CardInfo) {
  const router = useRouter();

  const contentData = {
    title: card.title,
    location: card.location,
    participants: card.participants,
    recruitmentStartDate: card.recruitmentStartDate,
    recruitmentEndDate: card.recruitmentEndDate,
    meetingStartDate: card.meetingStartDate,
    meetingEndDate: card.meetingEndDate,
    thumbnail: card.thumbnail,
  };

  const [whishlist, setWhishlist] = useState(false);

  //모의 기능입니다.
  const hadleClickWhishlist = (e: React.MouseEvent) => {
    //부모로 이벤트 전달 막기
    e.stopPropagation();
    setWhishlist((prev) => !prev);
  };

  const handleClickDetail = (type: string, id: number): void => {
    const lowerCase = type.toLowerCase();
    router.push(`/${lowerCase}/${id}`);
  };

  const handleClickReview = (e: React.MouseEvent, meetUpId: number) => {
    e.stopPropagation();

    alert(`${meetUpId} 리뷰 작성`);
  };

  return (
    <div
      className='flex flex-col rounded-[16px] bg-gray-950 p-3'
      onClick={() => handleClickDetail(card.meetingType, card.meetupId)}
    >
      <div className='flex justify-between'>
        <div className='flex gap-1.5'>
          <StatusBadge
            badge={{
              status: card.status,
              recruitmentEndDate: card.recruitmentEndDate,
              confirm: card.minParticipants < card.participants.length,
              isMypage: card.isMypage,
            }}
          />
        </div>

        {!card.isMypage && (
          <button onClick={hadleClickWhishlist}>
            {whishlist ? (
              <BookmarkActive className='size-6 text-orange-200' />
            ) : (
              <Bookmark className='size-6' />
            )}
          </button>
        )}
      </div>

      <Content content={contentData} />

      {/* 버튼 컴포넌트 머지 후 추가 작업필요 */}
      {card.isMypage &&
        card.reviewId != null &&
        card.status === "COMPLETED" && (
          <SolidButton
            className='mt-6'
            onClick={(e) => handleClickReview(e, card.reviewId as number)}
          >
            리뷰 작성
          </SolidButton>
        )}
    </div>
  );
}
