"use client";

import Link from "next/link";
import { useForm, type SubmitHandler } from "react-hook-form";
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
    await signUp(data, setError);
  };

  return (
    <div className='relative flex h-[calc(100vh-52px)] flex-col overflow-hidden bg-gray-950 p-4'>
      <video
        className='absolute inset-0 hidden h-full w-full object-cover tablet:block'
        src='/videos/background.mp4'
        loop
        autoPlay
        muted
        preload='auto'
        playsInline
      />
      <div className='flex h-full flex-col tablet:items-center tablet:justify-center'>
        <div className='z-10 flex flex-col gap-[12px] bg-gray-950 tablet:w-[90%] tablet:rounded-[2.5rem] tablet:bg-gray-950/[0.48] tablet:px-[40px] tablet:py-[56px] desktop:w-[40%]'>
          <div className='flex flex-col justify-center gap-[10px]'>
            <p className='select-none text-title-1 font-medium text-gray-100'>
              반가워요!
            </p>
            <p className='select-none text-body-2-normal font-medium text-gray-400'>
              모과와 함께 나에게 맞는 행성을 찾아보세요!
            </p>
          </div>
          <div className='flex w-full flex-col justify-center'>
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
                  <p className='select-none text-label-normal font-regular text-gray-400'>
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
              <div className='absolute bottom-0 left-0 right-0 flex w-full items-center justify-center p-4 tablet:relative tablet:mt-4'>
                <div className='w-full'>
                  <SolidButton
                    type='submit'
                    state={isValid ? "activated" : "default"}
                  >
                    가입완료
                  </SolidButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
