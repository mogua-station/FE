import type { Control } from "react-hook-form";
import CommonTextInput from "@/components/common/inputs/TextInput";

export const CommonNicknameInput = ({
  control,
  isRequired,
  className,
}: {
  control: Control<any>;
  isRequired: boolean;
  className?: string;
}) => (
  <CommonTextInput
    className={className}
    required={isRequired}
    name='nickname'
    label='닉네임'
    control={control}
    maxLength={8}
    rules={{
      ...(isRequired && { required: "닉네임은 필수 항목입니다." }),
      minLength: {
        value: 2,
        message: "닉네임은 2글자 이상이어야 합니다.",
      },
      maxLength: {
        value: 8,
        message: "닉네임은 8글자를 넘어갈 수 없습니다.",
      },
    }}
    hint='최대 8글자까지 입력 가능해요'
  />
);

export const CommonEmailInput = ({
  control,
  email,
}: {
  control: Control<any>;
  email: string;
}) => (
  <CommonTextInput
    name='email'
    label='이메일'
    placeholder='이메일을 입력해주세요'
    control={control}
    rules={{
      required: "이메일은 필수 항목입니다",
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "유효한 이메일 주소를 입력해주세요",
      },
    }}
    error={
      email && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
        ? "유효한 이메일 주소를 입력해주세요"
        : ""
    }
    hint={
      email && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
        ? "이메일 형식이 맞습니다"
        : ""
    }
  />
);

export const CommonPasswordInput = ({ control }: { control: Control<any> }) => (
  <CommonTextInput
    name='password'
    label='비밀번호'
    placeholder='*****'
    type='password'
    minLength={6}
    maxLength={20}
    control={control}
    rules={{
      required: "비밀번호는 필수 항목입니다.",
      minLength: {
        value: 6,
        message: "비밀번호는 6 - 20자 사이로 입력해주세요",
      },
      maxLength: {
        value: 20,
        message: "비밀번호는 6 - 20자 사이로 입력해세요",
      },
      pattern: {
        value: /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z0-9!@#$%^&*(),.?":{}|<>]+$/,
        message: "비밀번호에는 특수문자가 하나 이상 포함되어야 합니다",
      },
    }}
    hint='특수문자 포함 8자 - 20자 사이로 입력해주세요.'
    onPaste={(e) => e.preventDefault()}
    onCopy={(e) => e.preventDefault()}
    onCut={(e) => e.preventDefault()}
  />
);

export const CommonConfirmPasswordInput = ({
  control,
  password,
  confirmPassword,
}: {
  control: Control<any>;
  password: string;
  confirmPassword: string;
}) => (
  <CommonTextInput
    name='confirmPassword'
    label='비밀번호 확인'
    type='password'
    control={control}
    minLength={6}
    maxLength={20}
    rules={{
      required: "비밀번호 확인은 필수 항목입니다.",
      validate: (value) => {
        if (!value) return true;
        if (!password) return "비밀번호를 먼저 입력하세요";
        return value === password || "비밀번호가 일치하지 않습니다!";
      },
      pattern: {
        value: /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z0-9!@#$%^&*(),.?":{}|<>]+$/,
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
);
