interface ValidationRules {
  [key: string]: (
    value: string,
    values: { [key: string]: string },
  ) => string | undefined;
}

export const validationRules: ValidationRules = {
  nickname: (value: string) => {
    if (value.length > 8) return "닉네임은 8자 이하로 입력해주세요.";
    return undefined;
  },
  email: (value: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) return "유효한 이메일 주소를 입력하세요.";
    return undefined;
  },
  password: (value: string) => {
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (value.length > 20) return "비밀번호는 20자 이하로 입력해주세요.";
    if (value.length < 6) return "비밀번호는 6자 이상이어야 합니다.";
    if (!specialCharRegex.test(value))
      return "비밀번호에 특수문자를 포함시켜야 합니다.";
    return undefined;
  },
  confirmPassword: (value: string, values) => {
    if (value.length > 20) return "비밀번호는 20자 이하로 입력해주세요.";
    if (value.length < 6) return "비밀번호는 6자 이상이어야 합니다.";
    if (values.password && value !== values.password)
      return "비밀번호가 일치하지 않습니다.";
    return undefined;
  },
};
