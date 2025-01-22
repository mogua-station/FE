"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ShareMeetUpButton from "./ShareMeetUpButton";
import Bookmark from "@/assets/images/icons/bookmark.svg";
import BookmarkActive from "@/assets/images/icons/bookmark_active.svg";
import IconButton from "@/components/common/buttons/IconButton";
import SolidButton from "@/components/common/buttons/SolidButton";
import useToggleWishlist from "@/hooks/useToggleWishlist";
import {
  fetchHostData,
  fetchJoinMeet,
  fetchLeaveMeet,
} from "@/lib/meetDetail/meetDetailApi";
import {
  deleteUserWishList,
  addUserWishlist,
} from "@/lib/wishlist/wishlistApi";
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
  const { userWishlist, setUserWishlist } = useUserWishlist();

  const router = useRouter();
  const toggleWishlist = useToggleWishlist();
  const queryClient = useQueryClient();

  //지금 페이지가 북마크가 되어있느지 확인
  const [isBookmark, setIsBookmark] = useState<boolean | null>(null);
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

  const deleteMutation = useMutation({
    mutationFn: (meetupId: number) => deleteUserWishList(meetupId),
    onSuccess: (variables) => {
      alert("찜하기가 취소되었습니다.");
      const updatedArray = userWishlist.filter(
        (item: number) => item !== variables,
      );
      setUserWishlist(updatedArray);
      queryClient.refetchQueries({ queryKey: ["userWishlist"] });
      router.refresh();
    },
  });

  const addMutation = useMutation({
    mutationFn: (meetupId: number) => addUserWishlist(meetupId),
    onSuccess: (variables) => {
      alert("찜하기가 완료되었습니다.");
      const updatedArray = [...userWishlist, variables];
      setUserWishlist(updatedArray);
      queryClient.refetchQueries({ queryKey: ["userWishlist"] });
      router.refresh();
    },
  });

  const handleClickToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (user != null) {
      const isIncludeArr = userWishlist.includes(clientInfo.meetupId);

      //찜하기를 클릭했을 때 이미 찜하기에 등록 된 데이터
      if (isIncludeArr) {
        deleteMutation.mutate(clientInfo.meetupId);
        setIsBookmark(false);
      } else {
        addMutation.mutate(clientInfo.meetupId);
        setIsBookmark(true);
      }
    } else {
      if (clientInfo.meetupStatus === "RECRUITING") {
        const isBookmarked = toggleWishlist(clientInfo.meetupId);
        if (isBookmarked) {
          setIsBookmark(true);
        } else {
          setIsBookmark(false);
        }

        router.refresh();
      } else {
        alert("모집중인 모임만 가능합니다");
      }
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
      alert("모임 신청이 완료되었습니다.");
      router.refresh();
    },
  });

  const leaveMutate = useMutation({
    mutationFn: (id: number) => fetchLeaveMeet(id),
    onSuccess: () => {
      alert("신청 취소가 완료되었습니다.");
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
    } else {
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
          if (clientInfo.meetupStatus === "RECRUITING") {
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
          }
        } else {
          //주최자가 아니면서 참여 여부에 따른 버튼 렌더링
          if (
            clientInfo.participants.some(
              (item) => item.userId === user.userId,
            ) &&
            clientInfo.meetupStatus === "RECRUITING"
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
    }
  }, [clientInfo.participants, user]);

  //븍마크 확인
  useEffect(() => {
    if (!user) {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      if (wishlist.includes(clientInfo.meetupId)) {
        setIsBookmark(true);
      }
    } else {
      if (userWishlist.includes(clientInfo.meetupId)) {
        setIsBookmark(true);
      }
    }
  }, [user, setIsBookmark]);

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
          {isBookmark ? (
            <BookmarkActive className='size-6 text-orange-200' />
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
