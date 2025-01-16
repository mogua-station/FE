"use client";

import { useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import CommonSelectBox from "@/components/common/inputs/SelectBox";
import CommonTextInput from "@/components/common/inputs/TextInput";
import withAuth from "@/hoc/withAuth";

interface FormData {
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  state: string;
  city: string;
  district: string;
}

const MyForm = () => {
  const { control, handleSubmit, watch, setValue } = useForm<FormData>({
    defaultValues: {
      nickname: "", // 초기값 설정
      email: "", // 초기값 설정
      password: "", // 초기값 설정
      confirmPassword: "", // 초기값 설정
      country: "", // 초기값 설정
      state: "", // 초기값 설정
      city: "", // 초기값 설정
      district: "", // 초기값 설정
    },
    mode: "onChange",
  });

  const nickname = watch("nickname");
  const email = watch("email");
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);

  useEffect(() => {
    if (nickname && nickname.length > 8) {
      setValue("nickname", nickname.slice(0, 8));
    }
    if (password && password.length > 20) {
      setValue("password", password.slice(0, 20));
    }
    if (confirmPassword && confirmPassword.length > 20) {
      setValue("confirmPassword", confirmPassword.slice(0, 20));
    }
  }, [nickname, password, confirmPassword, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <CommonTextInput
        required={true}
        name='nickname'
        label='Nickname'
        control={control}
        rules={{
          required: "닉네임은 필수 항목입니다.",
          maxLength: {
            value: 8,
            message: "닉네임은 8글자를 넘어갈 수 없습니다.",
          },
        }}
        hint='최대 8글자까지 입력 가능해요'
        layout='1button'
      />
      <CommonTextInput
        name='email'
        label='Email'
        control={control}
        rules={{
          required: "이메일은 필수 항목입니다",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "유효한 이메일 주소를 입력해주세요",
          },
        }}
        error={
          email &&
          !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
            ? "유효한 이메일 주소를 입력해주세요"
            : ""
        }
        hint={
          email &&
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
            ? "이메일 형식이 맞습니다"
            : ""
        }
      />
      <CommonTextInput
        name='password'
        label='Password'
        type='password'
        control={control}
        rules={{
          required: "비밀번호는 필수 항목입니다.",
          minLength: {
            value: 6,
            message: "비밀번호는 6 - 20자 사이로 입력해주세요",
          },
          maxLength: {
            value: 20,
            message: "Password cannot exceed 20 characters",
          },
          pattern: {
            value:
              /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z0-9!@#$%^&*(),.?":{}|<>]+$/,
            message: "비밀번호에는 특수문자가 하나 이상 포함되어야 합니다",
          },
        }}
        hint='특수문자 포함 8자 - 20자 사이로 입력해주세요.'
        layout='2buttons'
      />
      <CommonTextInput
        name='confirmPassword'
        label='Confirm Password'
        type='password'
        control={control}
        rules={{
          required: "비밀번호 확인은 필수 항목입니다.",
          validate: (value) => {
            if (!value) return true;
            if (!password) return "비밀번호를 먼저 입력하세요";
            return value === password || "비밀번호가 일치하지 않습니다!";
          },
          pattern: {
            value:
              /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z0-9!@#$%^&*(),.?":{}|<>]+$/,
            message: "비밀번호에는 특수문자가 하나 이상 포함되어야 합니다",
          },
        }}
        error={
          confirmPassword && confirmPassword !== password
            ? "비밀번호가 일치하지 않습니다"
            : ""
        }
        hint={
          confirmPassword
            ? confirmPassword === password
              ? "비밀번호가 일치합니다"
              : ""
            : "특수문자 포함 8자 - 20자 사이로 입력해주세요."
        }
      />
      <CommonSelectBox
        name='country'
        label='Country'
        layout='2cols'
        control={control}
        options={[
          { value: "usa", label: "USA" },
          { value: "canada", label: "Canada" },
          { value: "mexico", label: "Mexico" },
        ]}
        secondName='state'
        secondPlaceholder='Select State'
        secondOptions={[
          { value: "california", label: "California" },
          { value: "texas", label: "Texas" },
          { value: "newyork", label: "New York" },
        ]}
        rules={{ required: "국가는 필수 항목입니다." }}
        secondRules={{ required: "주/도는 필수 항목입니다." }}
      />
      <CommonSelectBox
        name='city'
        label='City'
        layout='1col'
        control={control}
        options={[
          { value: "losangeles", label: "Los Angeles" },
          { value: "houston", label: "Houston" },
          { value: "dallas", label: "Dallas" },
        ]}
        rules={{ required: "도시는 필수 항목입니다." }}
      />
      <CommonSelectBox
        name='district'
        label='District'
        layout='1col'
        control={control}
        options={[
          { value: "downtown", label: "Downtown" },
          { value: "uptown", label: "Uptown" },
          { value: "suburbs", label: "Suburbs" },
        ]}
        rules={{ required: "구역은 필수 항목입니다." }}
      />
      <button type='submit'>Submit</button>
    </form>
  );
};

export default withAuth(MyForm);
