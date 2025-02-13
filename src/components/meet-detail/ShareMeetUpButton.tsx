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

    toast(
      (props) => <JoinToast {...props} toastType='copy' />,
      JoinToastOption,
    );
  };

  return (
    <button
      className='mx-auto flex w-full items-center justify-between rounded-[16px] bg-gray-800 p-3 desktop:relative'
      onClick={() => handleClickShare()}
      aria-label='모임 공유하기'
    >
      <div className='flex gap-[15px]'>
        <div className='p-[3px]'>
          <div className='relative flex h-[46px] w-[46px] items-center justify-center overflow-hidden rounded-[50%] bg-gray-600'>
            <Image
              src='/images/share_character.png'
              alt='캐릭터 이미지'
              width={40}
              height={40}
            />
          </div>
        </div>
        <div className='flex flex-col justify-between'>
          <p className='text-body pt-[3px] text-gray-300'>
            친구와 함께 참여해보세요
          </p>
          <p className='pb-[3px] text-left text-body-2-normal font-bold text-gray-100'>
            모임 공유하기
          </p>
        </div>
      </div>
      <ArrowRight className='text-gray-400' />
    </button>
  );
}
