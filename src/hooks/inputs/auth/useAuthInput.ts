import { useState } from "react";

interface UseAuthInputProps {
  type?: string;
  name?: string;
  onButtonClick?: () => void;
}

const useAuthInput = ({
  type = "text",
  name,
  onButtonClick,
}: UseAuthInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // 비밀번호 입력 타입 관리
  const inputType =
    name === "password" || name === "confirmPassword"
      ? isPasswordVisible
        ? "text"
        : "password"
      : type;

  // 비밀번호 가시성 토글
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
    if (onButtonClick) onButtonClick();
  };

  return {
    inputType,
    isPasswordVisible,
    togglePasswordVisibility,
  };
};

export default useAuthInput;
