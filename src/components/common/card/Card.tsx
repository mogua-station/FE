"use client";

import { useRouter } from "next/navigation";
import CardWishlist from "./CardWishlist";
import Content from "./Content";
import StatusBadge from "./StatusBadge";
import CardReview from "@/components/common/card/CardReview";
import { type CardInfo } from "@/types/card";

const Card = ({ card }: CardInfo) => {
  const router = useRouter();

  const handleClickDetail = (type: string, id: number): void => {
    const lowerCase = type.toLowerCase();
    router.push(`/${lowerCase}/${id}`);
  };

  return (
    <div
      className='flex cursor-pointer flex-col rounded-[16px] bg-gray-950 p-3'
      onClick={() => handleClickDetail(card.meetingType, card.meetupId)}
      aria-label={`모임${card.meetupId} 이동`}
    >
      <div className='flex justify-between'>
        <div className='flex gap-1.5'>
          <StatusBadge
            badge={{
              meetupStatus: card.meetupStatus,
              recruitmentEndDate: card.recruitmentEndDate,
              confirm: card.minParticipants <= card.participants.length,
              isMypage: card.isMypage,
            }}
          />
        </div>

        <CardWishlist
          wishlistInfo={{
            meetupId: card.meetupId,
            meetupStatus: card.meetupStatus,
            isMypage: card.isMypage,
          }}
        />
      </div>

      <Content
        content={{
          title: card.title,
          location: card.location,
          participants: card.participants,
          recruitmentStartDate: card.recruitmentStartDate,
          recruitmentEndDate: card.recruitmentEndDate,
          meetingStartDate: card.meetingStartDate,
          meetingEndDate: card.meetingEndDate,
          thumbnail: card.thumbnail,
          online: card.online,
        }}
      />

      {/* 버튼 컴포넌트 머지 후 추가 작업필요 */}
      {card.isMypage && card.isReview && card.meetupStatus === "COMPLETED" && (
        <CardReview meetupId={card.meetupId} />
      )}
    </div>
  );
};

export default Card;
