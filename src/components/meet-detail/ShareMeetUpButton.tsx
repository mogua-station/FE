"use client";

import ArrowRight from "@/assets/images/icons/arrow_right.svg";
import { copyToClipBoard } from "@/utils/copyToClipBorad";

export default function ShareMeetUpButton() {
  return (
    <button
      className='relative mx-auto flex w-full gap-[15px] rounded-[16px] bg-gray-800 p-3'
      onClick={() => copyToClipBoard(window.location.href)}
    >
      <div className='overflow-hidden rounded-[50%] bg-gray-600'>
        <img src='/images/share_character.png' alt='캐릭터 이미지' />
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
