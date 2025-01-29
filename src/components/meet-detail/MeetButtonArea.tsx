"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ShareMeetUpButton from "./ShareMeetUpButton";
import Bookmark from "@/assets/images/icons/bookmark.svg";
import BookmarkActive from "@/assets/images/icons/bookmark_active.svg";
import IconButton from "@/components/common/buttons/IconButton";
import SolidButton from "@/components/common/buttons/SolidButton";
import JoinToast from "@/components/toast/JoinToast";
import useChangeWishlist from "@/hooks/useChangeWishlist";
import {
  fetchHostData,
  fetchJoinMeet,
  fetchLeaveMeet,
} from "@/lib/meetDetail/meetDetailApi";
import useUserStore from "@/store/auth/useUserStore";
import useUserWishlist from "@/store/wishlist/useUserWishlist";
import { type ClientInfo } from "@/types/meetDetail";

interface UserTag {
  id: number;
  tag: string;
}

export default function MeetButtonArea({
  clientInfo,
}: {
  clientInfo: ClientInfo;
}) {
  //임시 유저 데이터 확인
  const { user } = useUserStore();
  const { userAllWishlist } = useUserWishlist();

  const router = useRouter();
  const { loggedInWishlist, nonLoggedInWishlist } = useChangeWishlist();

  const JoinToastOption = {
    containerId: "joinArea",
    autoClose: 2000,
    closeButton: false,
    className: "join-toast",
    hideProgressBar: true,
  };

  const [wishlist, setWishlist] = useState<number[]>([]);
  const [joinButton, setJoinButton] = useState<JSX.Element | null>(() => {
    if (clientInfo.meetupStatus === "COMPLETED") {
      return (
        <SolidButton mode='special' disabled>
          종료된 모임이에요
        </SolidButton>
      );
    }
    if (user === null) {
      return (
        <SolidButton mode='special' onClick={() => handleClickJoin()}>
          모임 신청하기
        </SolidButton>
      );
    } else {
      //내가 주최자 일 때
      if (clientInfo.hostId === user.userId) {
        //모집 중일 때때
        if (clientInfo.meetupStatus === "RECRUITING") {
          if (clientInfo.participants.length >= clientInfo.minParticipants) {
            return (
              <SolidButton mode='special' disabled>
                개설확정된 모임이에요
              </SolidButton>
            );
          } else {
            return (
              <SolidButton mode='special' onClick={() => {}}>
                모임 취소하기
              </SolidButton>
            );
          }
        }
      } else {
        //주최자가 아니면서 참여 여부에 따른 버튼 렌더링
        if (
          clientInfo.participants.some((item) => item.userId === user.userId) &&
          clientInfo.meetupStatus === "RECRUITING"
        ) {
          return (
            <SolidButton
              mode='special'
              onClick={() => leaveMutate.mutate(clientInfo.meetupId)}
            >
              신청 취소하기
            </SolidButton>
          );
        } else {
          return (
            <SolidButton mode='special' onClick={() => handleClickJoin()}>
              모임 신청하기
            </SolidButton>
          );
        }
      }
    }

    return null;
  });

  const { data: hostData, isLoading } = useQuery({
    queryKey: ["host", clientInfo.hostId],
    queryFn: async () => {
      const host = await fetchHostData(clientInfo.hostId);
      return host.data;
    },
  });

  const handleClickToggleWishlist = (e: React.MouseEvent) => {
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
  };

  const handleClickNavigateUser = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    router.push(`/user/${id}`);
  };

  const handleClickJoin = () => {
    if (user === null) {
      alert("로그인 해주세요");
    } else {
      joinMutate.mutate(clientInfo.meetupId);
    }
  };

  const joinMutate = useMutation({
    mutationFn: (id: number) => fetchJoinMeet(id),
    onSuccess: () => {
      toast((props) => <JoinToast {...props} type='join' />, JoinToastOption);
      router.refresh();
    },
  });

  const leaveMutate = useMutation({
    mutationFn: (id: number) => fetchLeaveMeet(id),
    onSuccess: () => {
      toast((props) => <JoinToast {...props} type='leave' />, JoinToastOption);
      router.refresh();
    },
  });

  //참여자가 변경될 때 마다
  useEffect(() => {
    if (clientInfo.meetupStatus === "COMPLETED") {
      setJoinButton(
        <SolidButton mode='special' disabled>
          종료된 모임이에요
        </SolidButton>,
      );
    } else if (clientInfo.meetupStatus === "RECRUITING") {
      if (user === null) {
        setJoinButton(
          <SolidButton mode='special' onClick={() => handleClickJoin()}>
            모임 신청하기
          </SolidButton>,
        );
      } else {
        //내가 주최자 일 때
        if (clientInfo.hostId === user.userId) {
          //모집 중일 때
          if (clientInfo.participants.length >= clientInfo.minParticipants) {
            setJoinButton(
              <SolidButton mode='special' disabled>
                개설확정된 모임이에요
              </SolidButton>,
            );
          } else {
            setJoinButton(
              <SolidButton mode='special' onClick={() => {}}>
                모임 취소하기
              </SolidButton>,
            );
          }
        } else {
          //주최자가 아니면서 참여 여부에 따른 버튼 렌더링
          if (
            clientInfo.participants.some((item) => item.userId === user.userId)
          ) {
            setJoinButton(
              <SolidButton
                mode='special'
                onClick={() => leaveMutate.mutate(clientInfo.meetupId)}
              >
                신청 취소하기
              </SolidButton>,
            );
          } else {
            setJoinButton(
              <SolidButton mode='special' onClick={() => handleClickJoin()}>
                모임 신청하기
              </SolidButton>,
            );
          }
        }
      }
    } else if (clientInfo.meetupStatus === "IN_PROGRESS") {
      setJoinButton(
        <SolidButton mode='special' disabled>
          진행중인 모임이에요
        </SolidButton>,
      );
    } else if (clientInfo.meetupStatus === "BEFORE_START") {
      setJoinButton(
        <SolidButton mode='special' disabled>
          시작전인 모임이에요
        </SolidButton>,
      );
    }
  }, [clientInfo.participants, user]);

  useEffect(() => {
    if (user === null) {
      // user가 null일 경우, localStorage에서 wishlist를 가져와서 상태를 설정
      const myWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setWishlist(myWishlist);
    } else {
      // user가 있을 경우, 전역 상태관리에 저장된 userWishlist 상태를 그대로 사용
      setWishlist(userAllWishlist);
    }
  }, [user, userAllWishlist]);

  if (isLoading) {
    <div>로딩중..</div>;
  }

  return (
    <div className='flex flex-1 flex-col'>
      <ShareMeetUpButton />
      <div className='meet-info-box-small fixed bottom-0 left-0 z-30 mt-8 flex w-full gap-2 bg-gray-950 p-5 desktop:static desktop:bg-[unset] desktop:p-0'>
        <IconButton
          mode='special'
          className='w-[72px]'
          onClick={handleClickToggleWishlist}
        >
          {clientInfo.meetupStatus === "RECRUITING" ? (
            user != null ? (
              userAllWishlist.includes(clientInfo.meetupId) ? (
                <BookmarkActive className='size-6 text-orange-200' />
              ) : (
                <Bookmark className='size-6' />
              )
            ) : wishlist.includes(clientInfo.meetupId) ? (
              <BookmarkActive className='size-6 text-orange-200' />
            ) : (
              <Bookmark className='size-6' />
            )
          ) : (
            <Bookmark className='size-6' />
          )}
        </IconButton>
        {joinButton}
      </div>
      <button
        className='meet-info-box-small mt-6 flex flex-col gap-4'
        onClick={(e) => handleClickNavigateUser(e, clientInfo.hostId)}
      >
        <span className='text-title block'>주최자 프로필</span>
        <div className='meet-info-box-inner-2 flex w-full flex-col gap-5'>
          <div className='flex gap-[14px]'>
            <div className='h-[46px] w-[46px] overflow-hidden rounded-[50%] bg-gray-700'>
              <img src={hostData?.profileImg} alt='유저 프로필' />
            </div>
            <div>
              <span className='flex items-center gap-[6px] text-body-2-normal font-medium text-gray-300'>
                {clientInfo.hostNickname}
                {hostData?.qualificationStatus == "QUALIFIED" && (
                  <span className='rounded-5 text-gary-300 inline-block rounded-[20px] bg-gray-700 px-2 py-1 text-caption-normal font-medium'>
                    과외선생님
                  </span>
                )}
              </span>
              {hostData?.bio.length === 0 && (
                <p className='text-body mt-[6px] text-gray-400'>
                  안녕하세요! 기획하는 모과입니다.
                </p>
              )}
            </div>
          </div>
          <ul className='flex gap-1'>
            {hostData?.userTagList.map((item: UserTag, index: number) => (
              <li
                className='rounded-[6px] bg-gray-600 px-2 py-[3px] text-caption-normal font-medium text-gray-300'
                key={index}
              >
                {item.tag}
              </li>
            ))}
            <li className='rounded-[6px] bg-gray-600 px-2 py-[3px] text-caption-normal font-medium text-gray-300'>
              태그
            </li>
          </ul>
        </div>
      </button>
    </div>
  );
}
