"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
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
import useUserStore from "@/store/auth/useUserStore";
import useUserWishlist from "@/store/wishlist/useUserWishlist";
import { type CardInfo } from "@/types/card";

export default function Card({ card }: CardInfo) {
  const { user } = useUserStore();
  const router = useRouter();
  const { userWishlist, setUserWishlist } = useUserWishlist();
  const queryClient = useQueryClient();
  // 찜 리스트 쿼리를 무효화하여 GET 요청 재실행
  const toggleWishlist = useToggleWishlist();
  const myWishlist =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("wishlist") || "[]")
      : [];
  const [wishlist, setWishlist] = useState<number[]>([]);

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

  const deleteMutation = useMutation({
    mutationFn: (meetupId: number) => deleteUserWishList(meetupId),
    onSuccess: (variables) => {
      alert("찜하기가 취소되었습니다.");
      const updatedArray = userWishlist.filter(
        (item: number) => item !== variables,
      );
      setUserWishlist(updatedArray);
      queryClient.refetchQueries({ queryKey: ["userWishlist"] });
      if (card.callback != null) {
        card.callback();
      }
    },
  });

  const addMutation = useMutation({
    mutationFn: (meetupId: number) => addUserWishlist(meetupId),
    onSuccess: (variables) => {
      alert("찜하기가 완료되었습니다.");
      const updatedArray = [...userWishlist, variables];
      setUserWishlist(updatedArray);
      queryClient.refetchQueries({ queryKey: ["userWishlist"] });
      if (card.callback != null) {
        card.callback();
      }
    },
  });

  const hadleClickWhishlist = (e: React.MouseEvent) => {
    //부모로 이벤트 전달 막기
    e.stopPropagation();

    //유저 정보가 있을 때
    if (user != null) {
      const isIncludeArr = userWishlist.includes(card.meetupId);

      //찜하기를 클릭했을 때 이미 찜하기에 등록 된 데이터
      if (isIncludeArr) {
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
          router.refresh();
        }
      } else {
        alert("모집중인 모임만 가능합니다");
      }
    }
  };

  const handleClickDetail = (type: string, id: number): void => {
    const lowerCase = type.toLowerCase();
    router.push(`/${lowerCase}/${id}`);
  };

  const handleClickReview = (e: React.MouseEvent, meetUpId: number) => {
    e.stopPropagation();

    router.push(`/user/create_review?meetupId=${meetUpId}`);
  };

  useEffect(() => {
    queryClient.refetchQueries({ queryKey: ["wishlist"] });
    setWishlist(myWishlist);
  }, []);

  useEffect(() => {
    if (user === null) {
      // user가 null일 경우, localStorage에서 wishlist를 가져와서 상태를 설정
      const myWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setWishlist(myWishlist);
    } else {
      // user가 있을 경우, userWishlist 상태를 그대로 사용
      setWishlist(userWishlist);
    }
  }, [user, userWishlist]);

  return (
    <div
      className='flex cursor-pointer flex-col rounded-[16px] bg-gray-950 p-3'
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
              userWishlist.includes(card.meetupId) ? (
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
