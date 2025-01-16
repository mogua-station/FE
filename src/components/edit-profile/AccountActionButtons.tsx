"use client";

import { SYSTEM_ALERTS } from "@/constants/\balerts";

export default function AccountActionButtons() {
  return (
    <div className='flex *:text-label-normal *:font-regular *:text-gray-300'>
      <button type='button'>로그아웃</button> {/* TODO: 로그아웃 연결 필요 */}
      <div className='before:mx-3 before:inline-block before:h-2.5 before:w-px before:bg-gray-600'>
        <button type='button' onClick={() => alert(SYSTEM_ALERTS.IN_PROGRESS)}>
          탈퇴하기
        </button>
      </div>
    </div>
  );
}
