"use client";

import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import ShareMeetUpButton from "./ShareMeetUpButton";
import Bookmark from "@/assets/images/icons/bookmark.svg";
import BookmarkActive from "@/assets/images/icons/bookmark_active.svg";
import IconButton from "@/components/common/buttons/IconButton";
import SolidButton from "@/components/common/buttons/SolidButton";
import JoinToast from "@/components/toast/JoinToast";
import useChangeWishlist from "@/hooks/useChangeWishlist";
import { fetchJoinMeet, fetchLeaveMeet } from "@/lib/meetDetail/meetDetailApi";
import useUserStore from "@/store/auth/useUserStore";
import useUserWishlist from "@/store/wishlist/useUserWishlist";
import { type ClientInfo } from "@/types/meetDetail";
import { type UserProfile } from "@/types/user-page";

interface UserTag {
  id: number;
  tag: string;
}

interface MeetButtonAreaProps {
  clientInfo: ClientInfo;
  hostInfo: UserProfile;
}

export default function MeetButtonArea({
  clientInfo,
  hostInfo,
}: MeetButtonAreaProps) {
  //임시 유저 데이터 확인
  const { user } = useUserStore();
  const { userAllWishlist } = useUserWishlist();

  const router = useRouter();
  const { loggedInWishlist, nonLoggedInWishlist } = useChangeWishlist();

  const JoinToastOption = {
    containerId: "joinArea",
    closeButton: false,
    className: "join-toast",
    hideProgressBar: true,
  };

  const [wishlist, setWishlist] = useState<number[]>([]);
  const handleClickJoin = useCallback(() => {
    if (user === null) {
      router.push("/sign-in");
    } else {
      joinMutate.mutate(clientInfo.meetupId);
    }
  }, [user, clientInfo.meetupId]);

  const handleClickLeave = useCallback(() => {
    if (user === null) {
      router.push("/sign-in");
    } else {
      leaveMutate.mutate(clientInfo.meetupId);
    }
  }, [user, clientInfo.meetupId]);

  const handleClickDeleteMeetup = useCallback(() => {
    toast(
      (props) => <JoinToast {...props} toastType='deleteMeetup' />,
      JoinToastOption,
    );
  }, []);

  const joinButton = useMemo(() => {
    if (clientInfo.meetupStatus === "COMPLETED") {
      return (
        <SolidButton mode='special' disabled>
          종료된 모임이에요
        </SolidButton>
      );
    }
    if (clientInfo.meetupStatus === "IN_PROGRESS") {
      return (
        <SolidButton mode='special' disabled>
          진행중인 모임이에요
        </SolidButton>
      );
    }
    if (clientInfo.meetupStatus === "BEFORE_START") {
      return (
        <SolidButton mode='special' disabled>
          시작전인 모임이에요
        </SolidButton>
      );
    }

    if (!user) {
      return (
        <SolidButton mode='special' onClick={handleClickJoin}>
          모임 신청하기
        </SolidButton>
      );
    }

    if (clientInfo.hostId === user.userId) {
      if (clientInfo.participants.length >= clientInfo.minParticipants) {
        return (
          <SolidButton mode='special' disabled>
            개설확정된 모임이에요
          </SolidButton>
        );
      }
      return (
        <SolidButton mode='special' onClick={handleClickDeleteMeetup}>
          모임 취소하기
        </SolidButton>
      );
    }

    const isJoined = clientInfo.participants.some(
      (item) => item.userId === user.userId,
    );

    return isJoined ? (
      <SolidButton mode='special' onClick={handleClickLeave}>
        신청 취소하기
      </SolidButton>
    ) : (
      <SolidButton mode='special' onClick={handleClickJoin}>
        모임 신청하기
      </SolidButton>
    );
  }, [clientInfo, user]);

  const handleClickToggleWishlist = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (user != null) {
        loggedInWishlist(clientInfo.meetupId, clientInfo.meetupStatus);
      } else {
        nonLoggedInWishlist(
          clientInfo.meetupId,
          clientInfo.meetupStatus,
          setWishlist,
        );
      }
    },
    [clientInfo.meetupId, clientInfo.meetupStatus, user],
  );

  const joinMutate = useMutation({
    mutationFn: (id: number) => fetchJoinMeet(id),
    onSuccess: () => {
      toast(
        (props) => <JoinToast {...props} toastType='join' />,
        JoinToastOption,
      );
      router.refresh();
    },
  });

  const leaveMutate = useMutation({
    mutationFn: (id: number) => fetchLeaveMeet(id),
    onSuccess: () => {
      toast(
        (props) => <JoinToast {...props} toastType='leave' />,
        JoinToastOption,
      );
      router.refresh();
    },
  });

  const updateWishlist = useCallback(() => {
    if (user === null) {
      const myWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setWishlist(myWishlist);
    } else {
      setWishlist(userAllWishlist);
    }
  }, [user, userAllWishlist]);

  useEffect(() => {
    updateWishlist();
  }, [updateWishlist]);

  return (
    <section className='flex flex-1 flex-col'>
      <ShareMeetUpButton />
      <div className='meet-info-box-small fixed bottom-0 left-0 z-30 mt-8 flex w-full gap-2 bg-gray-950 p-5 desktop:static desktop:bg-[unset] desktop:p-0'>
        <IconButton
          mode='special'
          className='w-[72px]'
          onClick={handleClickToggleWishlist}
          aria-label='모임 찜하기'
        >
          {wishlist.includes(clientInfo.meetupId) ? (
            <BookmarkActive
              className='size-6 text-orange-200'
              aria-label='active'
            />
          ) : (
            <Bookmark className='size-6' aria-label='default' />
          )}
        </IconButton>
        {joinButton}
      </div>
      <div className='meet-info-box-small mt-6 flex flex-col gap-4'>
        <span className='text-title block text-left'>주최자 프로필</span>
        <Link
          href={`/user/${clientInfo.hostId}`}
          className='meet-info-box-inner-2 flex w-full flex-col gap-5'
          aria-label={`유저 ${clientInfo.hostId} 프로필 이동`}
        >
          <div className='flex gap-[14px]'>
            <div className='relative h-[46px] w-[46px] overflow-hidden rounded-[50%] bg-gray-700'>
              <Image
                src={hostInfo.profileImg}
                alt='유저 프로필'
                fill
                className='object-cover'
                sizes='60px'
              />
            </div>
            <div>
              <span className='flex items-center gap-[6px] text-body-2-normal font-medium text-gray-300'>
                {hostInfo.nickname}
                {hostInfo.qualificationStatus == "QUALIFIED" && (
                  <span className='rounded-5 text-gary-300 inline-block rounded-[20px] bg-gray-700 px-2 py-1 text-caption-normal font-medium'>
                    과외선생님
                  </span>
                )}
              </span>
              <p className='text-body mt-[6px] text-gray-400'>
                {hostInfo.bio.length === 0
                  ? "소개글이 없습니다."
                  : hostInfo.bio}
              </p>
            </div>
          </div>
          <ul className='flex gap-1'>
            {hostInfo.userTagList.map((item: UserTag, index: number) => (
              <li
                className='rounded-[6px] bg-gray-600 px-2 py-[3px] text-caption-normal font-medium text-gray-300'
                key={index}
              >
                {item.tag}
              </li>
            ))}
          </ul>
        </Link>
      </div>
    </section>
  );
}
