"use client";

import Image from "next/image";
import { toast } from "react-toastify";
import ArrowRight from "@/assets/images/icons/arrow_right.svg";
import JoinToast from "@/components/toast/JoinToast";
import { copyToClipBoard } from "@/utils/copyToClipBorad";

export default function ShareMeetUpButton() {
  const JoinToastOption = {
    containerId: "joinArea",
    autoClose: 2000,
    closeButton: false,
    className: "join-toast",
    hideProgressBar: true,
  };

  const handleClickShare = () => {
    copyToClipBoard(window.location.href);

    toast((props) => <JoinToast {...props} type='copy' />, JoinToastOption);
  };

  return (
    <button
      className='relative mx-auto flex w-full gap-[15px] rounded-[16px] bg-gray-800 p-3'
      onClick={() => handleClickShare()}
      aria-label='모임 공유하기'
    >
      <div className='relative h-[40px] w-[40px] overflow-hidden rounded-[50%] bg-gray-600'>
        <Image
          fill
          src='/images/share_character.png'
          alt='캐릭터 이미지'
          sizes='40px'
        />
      </div>
      <div className='flex flex-col justify-between'>
        <p className='text-body text-gray-300'>친구와 함께 참여해보세요</p>
        <p className='text-left text-body-2-normal font-bold text-gray-100'>
          모임 공유하기
        </p>
      </div>
      <ArrowRight className='absolute right-10 top-1/2 size-6 -translate-y-1/2 text-gray-400' />
    </button>
  );
}
