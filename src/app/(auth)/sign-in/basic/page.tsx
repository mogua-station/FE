"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import DotLoader from "react-spinners/DotLoader";
import {
  CommonEmailInput,
  CommonPasswordInput,
} from "@/components/auth/AuthInputs";
import SolidButton from "@/components/common/buttons/SolidButton";
import useSignIn from "@/hooks/auths/useSignIn";
import useLoginSetWishlist from "@/hooks/useLoginSetWishlist";
import { type FormData } from "@/types";

const SignInBasicPage = () => {
  const { signIn } = useSignIn();
  const [isLoading, setIsLoading] = useState(false);
  const setLoginWishlist = useLoginSetWishlist();

  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: { isValid },
  } = useForm<FormData>({
    defaultValues: {
      email: "", // 초기값 설정
      password: "", // 초기값 설정
    },
    mode: "onChange",
  });

  const email = watch("email");

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    const result = await signIn(data);

    if (result?.error) {
      if (result.error.type === "email") {
        setError("email", { message: result.error.message });
        setError("password", { message: result.error.message });
      } else if (result.error.type === "password") {
        setError("password", { message: result.error.message });
      }
      setIsLoading(false);
    }

    //로그인이 성공했을 때 찜하기를 가져와서 젼역 상태관리에 추가
    if (result.success) {
      setLoginWishlist();
    }
  };

  return (
    <div className='relative flex grow flex-col bg-gray-950'>
      <video
        className='absolute inset-0 hidden h-full w-full object-cover tablet:block'
        src='/videos/background.mp4'
        loop
        autoPlay
        muted
        preload='auto'
        playsInline
      />
      <div className='flex h-screen flex-col items-center justify-center'>
        <div className='z-10 flex h-[50%] w-full flex-col items-center justify-center gap-[24px] bg-gray-950/[0.48] p-4 tablet:m-20 tablet:w-[90%] tablet:rounded-[40px] tablet:px-[40px] tablet:py-[56px] desktop:w-[40%]'>
          <div className='flex w-full flex-col gap-[24px]'>
            <div className='ml-2 flex flex-row'>
              <p className='heading-2 select-none font-medium text-gray-100'>
                로그인
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className='flex flex-col gap-[80px]'>
                <div className='flex flex-col gap-[24px]'>
                  <CommonEmailInput control={control} email={email} />
                  <CommonPasswordInput control={control} />
                </div>
                <div className='flex flex-col gap-[28px]'>
                  <div className='flex flex-row items-center justify-center gap-[12px]'>
                    <Link
                      href='/sign-up'
                      className='text-label-normal font-regular text-gray-300'
                    >
                      회원가입 하기
                    </Link>
                    <p className='text-label-normal font-regular text-gray-600'>
                      |
                    </p>
                    <Link
                      href='#'
                      className='text-label-normal font-regular text-gray-300'
                    >
                      비밀번호 찾기
                    </Link>
                  </div>
                  <div className='flex flex-col items-center gap-[12px]'>
                    {/* 로딩중일 때는 버튼 비활성화 */}
                    {!isLoading && (
                      <SolidButton
                        type='submit'
                        state={isValid ? "activated" : "default"}
                      >
                        로그인
                      </SolidButton>
                    )}
                    <DotLoader
                      size={24}
                      color={"#FF9A42"}
                      loading={isLoading}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInBasicPage;
