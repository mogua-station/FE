"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import Spacecraft from "@/assets/images/icons/spacecraft.svg";
import SolidButton from "@/components/common/buttons/SolidButton";

const SignUPSuccessContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const username = searchParams?.get("username");

  // url에 페이지 도메인 작성해서 접근하는 것 방지
  if (!username) {
    router.push("/error");
    return null;
  }

  const handleConfirm = () => {
    router.push("/"); // 추후 마이페이지로 연결
  };

  return (
    <div className='relative flex h-[calc(100vh-52px)] flex-col overflow-hidden bg-gray-950'>
      {/* 배경 비디오 */}
      <video
        className='absolute inset-0 hidden h-full w-full object-cover tablet:block'
        src='/videos/background.mp4'
        loop
        autoPlay
        muted
        preload='auto'
        playsInline
      />

      <div className='flex h-full flex-col items-center justify-center'>
        {/* 컨텐츠 영역 */}
        <div className='z-10 mx-auto flex flex-col items-center justify-center gap-8 p-4 tablet:h-[70%] tablet:w-[90%] tablet:rounded-[2.5rem] tablet:bg-gray-950/[0.48] tablet:px-6 desktop:w-[60%]'>
          {/* 이미지 및 텍스트 */}
          <div className='flex flex-col items-center justify-center gap-4'>
            <div>
              <Spacecraft />
            </div>
            <p className='text-body-1-normal font-semibold text-orange-300'>
              가입 완료
            </p>
            <p className='text-heading-2 font-medium text-gray-100'>
              {username || "møgua"}님 환영해요!
            </p>
          </div>

          {/* 버튼 */}
          <div className='absolute bottom-0 left-0 right-0 p-4 tablet:relative tablet:w-[60%]'>
            <SolidButton
              variant='primary'
              state='activated'
              size='large'
              onClick={handleConfirm}
            >
              확인
            </SolidButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function SignUpSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUPSuccessContent />
    </Suspense>
  );
}
