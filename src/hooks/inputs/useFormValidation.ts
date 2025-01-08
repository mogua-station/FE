import { useState } from "react";

type ValidationiErrors = {
  [key: string]: string | undefined;
};

type ValidationRules = Record<
  string,
  (value: string, allValues: { [key: string]: string }) => string | undefined
>;

export const useFormValidation = (
  initialValues: { [key: string]: string },
  validationRules: ValidationRules,
  submitOnValidation: string[] = [],
) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<ValidationiErrors>({});

  // 단일 필드에 대한 유효성 체크
  // input값 변화 동적 체크
  const validateField = (
    name: string,
    value: string,
    currentValues = values,
  ) => {
    const error = validationRules[name]?.(value, currentValues);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
    return error;
  };

  const isValidField = (name: string) => !errors[name] && values[name] !== "";

  // 에러 분기 설정할 텍스트는 이하에 직접 작성하여 사용
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "nickname" && value.length > 8) {
      return;
    }

    if (
      (name === "password" || name === "confirmPassword") &&
      value.length > 20
    ) {
      return;
    }

    setValues((prev) => {
      const newValues = {
        ...prev,
        [name]: value,
      };

      // 비밀번호가 변경되면 confirmPassword도 다시 검증
      if (name === "password" && prev.confirmPassword) {
        validateField("confirmPassword", prev.confirmPassword, newValues);
      }

      return newValues;
    });

    if (submitOnValidation.includes(name)) {
      validateField(name, value);
    }
  };

  // 전체 필드에 대한 유효성 체크
  // 주로 submit 버튼 눌렀을 때 작동
  const validate = () => {
    const validationiErrors: ValidationiErrors = {};
    Object.keys(validationRules).forEach((key) => {
      const error = validationRules[key](values[key], values);
      if (error) {
        validationiErrors[key] = error;
      }
    });
    setErrors(validationiErrors);
    return Object.keys(validationiErrors).length === 0;
  };
  return { values, errors, handleChange, validate, isValidField };
};
