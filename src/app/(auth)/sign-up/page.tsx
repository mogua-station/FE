"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import DotLoader from "react-spinners/Dotloader";

import {
  CommonEmailInput,
  CommonPasswordInput,
  CommonConfirmPasswordInput,
  CommonNicknameInput,
} from "@/components/auth/AuthInputs";
import SolidButton from "@/components/common/buttons/SolidButton";
import { useSignUp } from "@/hooks/auths/useSignUp";
import { type FormData } from "@/types";

const SignUpPage = () => {
  const { signUp } = useSignUp();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: { isValid },
  } = useForm<FormData>({
    defaultValues: {
      nickname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const email = watch("email");
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    await signUp(data, setError);
    setIsLoading(false);
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
      <div className='flex h-screen flex-col items-center tablet:justify-center'>
        <div className='z-10 flex h-auto w-[100%] flex-col gap-[24px] bg-gray-950 p-4 tablet:m-20 tablet:w-[90%] tablet:rounded-[40px] tablet:px-[40px] tablet:py-[56px] desktop:w-[40%]'>
          <div>
            <p className='text-title-1 font-medium text-gray-100'>반가워요!</p>
            <p className='text-body-2-normal font-medium text-gray-400'>
              모과와 함께 나에게 맞는 행성을 찾아보세요!
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className='flex flex-col gap-[16px]'>
              <CommonNicknameInput control={control} isRequired={false} />
              <CommonEmailInput control={control} email={email} />
              <CommonPasswordInput control={control} />
              <CommonConfirmPasswordInput
                control={control}
                password={password}
                confirmPassword={confirmPassword ?? ""}
              />
            </div>

            <div className='mt-[30px] flex flex-col'>
              <div className='flex flex-row justify-center gap-[4px]'>
                <p className='text-label-normal font-regular text-gray-400'>
                  이미 계정이 있으신가요?
                </p>
                <Link
                  href='/sign-in/basic'
                  className='text-label-normal font-medium text-orange-200 underline'
                >
                  로그인하기
                </Link>
              </div>
            </div>
            <div className='mt-[30px] flex flex-col items-center'>
              {/* 로딩중일 때는 버튼 비활성화 */}
              {!isLoading && (
                <SolidButton
                  type='submit'
                  state={isValid ? "activated" : "default"}
                >
                  가입완료
                </SolidButton>
              )}
              <DotLoader size={24} color={"#FF9A42"} loading={isLoading} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
