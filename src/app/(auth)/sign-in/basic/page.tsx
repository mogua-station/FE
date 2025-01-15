"use client";

import Link from "next/link";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  CommonEmailInput,
  CommonPasswordInput,
} from "@/components/auth/AuthInputs";
import SolidButton from "@/components/common/buttons/SolidButton";
import useSignIn from "@/hooks/auths/useSignIn";
import { type FormData } from "@/types";

const SignInBasicPage = () => {
  const { signIn } = useSignIn();

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
    const result = await signIn(data);
    if (result?.error) {
      if (result.error.type === "email") {
        setError("email", { message: result.error.message });
        setError("password", { message: result.error.message });
      } else if (result.error.type === "password") {
        setError("password", { message: result.error.message });
      }
    }
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
