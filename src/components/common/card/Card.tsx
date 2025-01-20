"use client";

import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Content from "./Content";
import StatusBadge from "./StatusBadge";
import Bookmark from "@/assets/images/icons/bookmark.svg";
import BookmarkActive from "@/assets/images/icons/bookmark_active.svg";
import SolidButton from "@/components/common/buttons/SolidButton";
import useToggleWishlist from "@/hooks/useToggleWishlist";
import {
  deleteUserWishList,
  addUserWishlist,
} from "@/lib/wishlist/wishlistApi";
import { type CardInfo, type CardProps, type CacheResult } from "@/types/card";

export default function Card({ card }: CardInfo) {
  const user = null;
  const router = useRouter();
  const queryClient = useQueryClient();

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

  // 찜 리스트 쿼리를 무효화하여 GET 요청 재실행
  const toggleWishlist = useToggleWishlist();
  const myWishlist =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("wishlist") || "[]")
      : [];
  const [wishlist, setWishlist] = useState<number[]>(myWishlist);

  const deleteMutation = useMutation({
    mutationFn: (meetupId: number) => deleteUserWishList(meetupId),
    onSuccess: () => {
      alert("찜하기가 취소되었습니다.");
      if (card.callback != null) {
        card.callback();
      }
    },
  });

  const addMutation = useMutation({
    mutationFn: (meetupId: number) => addUserWishlist(meetupId),
    onSuccess: () => {
      alert("찜하기가 완료되었습니다.");
      if (card.callback != null) {
        card.callback();
      }
    },
  });

  const hadleClickWhishlist = (e: React.MouseEvent) => {
    //부모로 이벤트 전달 막기
    e.stopPropagation();

    //유저 정보가 있을 때때
    if (user != null) {
      const cachedData: CacheResult | undefined = queryClient.getQueryData([
        "wishlist",
      ]);

      if (cachedData === undefined) return;

      const isIncludeArr = cachedData.pages.map((item) =>
        item.data.some((meet: CardProps) => meet.meetupId === card.meetupId),
      );

      //찜하기를 클릭했을 때 이미 찜하기에 등록 된 데이터
      if (isIncludeArr.includes(true)) {
        deleteMutation.mutate(card.meetupId);
      } else {
        addMutation.mutate(card.meetupId);
      }
    } else {
      //모집중일 때만 가능
      if (card.meetupStatus === "RECRUITING") {
        toggleWishlist(card.meetupId);

        //toggleWishlist는 로컬 스토리지에 아이디를 추가 또는 삭제
        const storage = JSON.parse(localStorage.getItem("wishlist") || "[]");

        if (myWishlist != storage) setWishlist(storage);

        if (card.callback != null) {
          card.callback();
        }
      }
    }
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
      className='flex h-[182px] flex-col rounded-[16px] bg-gray-950 p-3'
      onClick={() => handleClickDetail(card.meetingType, card.meetupId)}
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

        {!card.isMypage && (
          <button onClick={(e) => hadleClickWhishlist(e)}>
            {user != null ? (
              card.isWishlist ? (
                <BookmarkActive className='size-6 text-orange-200' />
              ) : (
                <Bookmark className='size-6' />
              )
            ) : wishlist.includes(card.meetupId) ? (
              <BookmarkActive className='size-6 text-orange-200' />
            ) : (
              <Bookmark className='size-6' />
            )}
          </button>
        )}
      </div>

      <Content content={contentData} />

      {/* 버튼 컴포넌트 머지 후 추가 작업필요 */}
      {card.isMypage && card.isReview && card.meetupStatus === "COMPLETED" && (
        <SolidButton
          className='mt-6'
          onClick={(e) => handleClickReview(e, card.meetupId as number)}
        >
          리뷰 작성
        </SolidButton>
      )}
    </div>
  );
}
