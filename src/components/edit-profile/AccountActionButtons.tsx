"use client";

import { useRouter } from "next/navigation";
import { SYSTEM_ALERTS } from "@/constants/alerts";
import useSignOut from "@/hooks/auths/useSignOut";

export default function AccountActionButtons() {
  const router = useRouter();
  const { handleSignOut } = useSignOut();

  const handleSignOutAndRedirect = () => {
    handleSignOut();
    router.replace("/");
  };

  return (
    <div className='flex *:text-label-normal *:font-regular *:text-gray-300'>
      <button type='button' onClick={handleSignOutAndRedirect}>
        로그아웃
      </button>
      <div className='before:mx-3 before:inline-block before:h-2.5 before:w-px before:bg-gray-600'>
        <button type='button' onClick={() => alert(SYSTEM_ALERTS.IN_PROGRESS)}>
          탈퇴하기
        </button>
      </div>
    </div>
  );
}
