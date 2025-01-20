import { type InputHTMLAttributes, type ReactNode } from "react";
import { type RegisterOptions, type FieldValues } from "react-hook-form";

// 공통 InputProps 정의
export interface InputProps<T extends FieldValues = FieldValues> {
  name: keyof T;
  control: any;
  rules?: RegisterOptions<T>;
  label: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  isValid?: boolean;
  children?: ReactNode;
}

export interface SelectBoxProps<T extends FieldValues = FieldValues>
  extends InputProps<T>,
    Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  secondName?: keyof T;
  options: Option[];
  secondOptions?: Option[];
  status?: "default" | "filled" | "error";
  layout: "1col" | "2cols";
  secondPlaceholder?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  secondOnChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string | undefined;
  secondValue?: string | undefined;
}

export interface Option {
  label: string;
  value: string;
}

export interface TextInputProps<T extends FieldValues = FieldValues>
  extends InputProps<T>,
    Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange" | "value"> {
  hint?: string;
  layout?: "1button" | "2buttons";
  // react-hook-form 관련 속성 추가
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// FormData 타입 정의
export interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
}
