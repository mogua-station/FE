"use client";

import KakaoIcon from "@/assets/images/icons/kakao.svg";
import IconButton from "@/components/common/buttons/IconButton";

const KakaoLoginButton = () => {
  const handleKakaoLogin = () => {
    const kakaoAuthUrl = process.env.NEXT_PUBLIC_KAKAO_AUTH_URL;
    if (kakaoAuthUrl) {
      window.location.href = kakaoAuthUrl;
    }
  };

  return (
    <IconButton className='mt-2 w-full gap-[12px]' onClick={handleKakaoLogin}>
      <KakaoIcon className='mr-[12px] size-6 text-yellow-400' />
      <span className='text-body-2-normal font-medium text-gray-200'>
        카카오로 시작하기
      </span>
    </IconButton>
  );
};

export default KakaoLoginButton;
