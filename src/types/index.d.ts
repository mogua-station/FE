export type TextInputProps = {
  label: string;
  type: "text" | "password" | "email"; // input 타입
  name: string;
  value: string;
  placeholder: string;
  layout?: "default" | "1button" | "2buttons"; // 1버튼, 2버튼 레이아웃
  hint?: string; // 입력 힌트
  error?: string; // 에러 메시지
  disabled?: boolean;
  isValid?: boolean;
  required?: boolean;
  children?: React.ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onButtonClick?: () => void;
};
