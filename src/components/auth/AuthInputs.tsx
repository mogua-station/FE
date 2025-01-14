import type { Control } from "react-hook-form";
import CommonTextInput from "@/components/common/inputs/TextInput";

export const CommonEmailInput = ({
  control,
  email,
}: {
  control: Control<any>;
  email: string;
}) => (
  <CommonTextInput
    name='email'
    label='Email'
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
    label='Password'
    placeholder='*****'
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
