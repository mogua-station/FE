"use client";

import ArrowIcon from "@/assets/images/icons/arrow_down.svg";
import InfoIcon from "@/assets/images/icons/info.svg";
import { SYSTEM_ALERTS } from "@/constants/alerts";

export default function ContactBanner() {
  return (
    <button
      className='flex w-full cursor-pointer items-center justify-between rounded-2xl bg-gray-800 px-4 py-3'
      type='button'
      onClick={() => alert(SYSTEM_ALERTS.IN_PROGRESS)}
    >
      <div className='flex items-center gap-2.5'>
        <InfoIcon className='size-6 text-gray-400' aria-hidden='true' />
        <p className='max-w-[160px] text-start text-label-reading font-regular text-gray-300 tablet:max-w-full'>
          운영자 문의 후 과외 선생님으로 활동해보세요
        </p>
      </div>
      <ArrowIcon
        className='size-6 -rotate-90 text-gray-300'
        aria-hidden='true'
      />
    </button>
  );
}
