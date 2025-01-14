"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  CommonEmailInput,
  CommonPasswordInput,
} from "@/components/auth/AuthInputs";
import SolidButton from "@/components/common/buttons/SolidButton";

interface FormData {
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignInBasicPage = () => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { isValid },
  } = useForm<FormData>({
    defaultValues: {
      email: "", // 초기값 설정
      password: "", // 초기값 설정
    },
    mode: "onChange",
  });

  const email = watch("email");
  const password = watch("password");

  useEffect(() => {
    if (password && password.length > 20) {
      setValue("password", password.slice(0, 20));
    }
  }, [password, setValue]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    fetch(`${process.env.NEXT_BASE_URL}/user/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  return (
    <div className='flex h-full flex-col gap-[24px] bg-gray-950'>
      <div>
        <p className='heading-2 font-medium text-gray-100'>로그인</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <CommonEmailInput control={control} email={email} />
        <CommonPasswordInput control={control} />
        <div>
          <div className='flex flex-row items-center justify-center gap-[12px]'>
            <Link
              href='/sign-up'
              className='text-label-normal font-regular text-gray-300'
            >
              회원가입 하기
            </Link>
            <p className='text-label-normal font-regular text-gray-600'>|</p>
            <Link
              href='#'
              className='text-label-normal font-regular text-gray-300'
            >
              비밀번호 찾기
            </Link>
          </div>
          <div>
            <SolidButton
              type='submit'
              state={isValid ? "activated" : "default"}
            >
              로그인
            </SolidButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignInBasicPage;
