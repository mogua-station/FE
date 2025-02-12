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

import { type FormData } from "@/types";

const SignInBasicPage = () => {
  const { signIn } = useSignIn();
  const [isLoading, setIsLoading] = useState(false);

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

    if (result.success) {
    }
  };

  return (
    <div className='relative flex grow flex-col bg-gray-950 tablet:bg-transparent tablet:px-10 tablet:pb-4 tablet:pt-[calc(20dvh-56px)] desktop:mx-auto desktop:w-full desktop:max-w-[668px] desktop:justify-center desktop:p-4'>
      <div className='z-10 flex w-full flex-grow flex-col items-center px-4 pb-4 pt-[52px] tablet:flex-grow-0 tablet:rounded-[40px] tablet:bg-gray-950-48 tablet:px-[40px] tablet:py-[56px]'>
        <div className='flex w-full flex-grow flex-col gap-6'>
          <div className='ml-2 flex flex-row'>
            <p className='select-none text-heading-2 font-medium text-gray-100'>
              로그인
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className='flex flex-grow flex-col justify-between tablet:justify-center tablet:gap-20'
          >
            <div className='flex flex-col gap-6'>
              <CommonEmailInput control={control} email={email} />
              <CommonPasswordInput control={control} />
            </div>

            <div className='flex flex-col gap-6'>
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
                <DotLoader size={24} color={"#FF9A42"} loading={isLoading} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInBasicPage;
